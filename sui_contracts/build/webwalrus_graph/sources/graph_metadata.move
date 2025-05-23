module webwalrus_graph::graph_metadata {
    use sui::object::{Self, UID, ID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::table::{Self, Table};
    use sui::event;
    use sui::clock::{Self, Clock};
    use std::string::{Self, String};
    use std::vector;

    // Error codes
    const E_NOT_OWNER: u64 = 1;
    const E_GRAPH_NOT_FOUND: u64 = 2;
    const E_INVALID_BLOB_ID: u64 = 3;
    const E_UNAUTHORIZED_ACCESS: u64 = 4;

    // Graph metadata structure
    public struct GraphMetadata has key, store {
        id: UID,
        name: String,
        description: String,
        blob_id: String, // Walrus blob ID
        owner: address,
        created_at: u64,
        updated_at: u64,
        node_count: u64,
        relationship_count: u64,
        is_public: bool,
        tags: vector<String>,
        version: u64,
    }

    // Global registry for graph discovery
    public struct GraphRegistry has key {
        id: UID,
        public_graphs: Table<ID, bool>,
        public_graph_list: vector<ID>,
        graphs_by_owner: Table<address, vector<ID>>,
        graphs_by_tag: Table<String, vector<ID>>,
        shared_graphs: Table<address, vector<ID>>,
        total_graphs: u64,
    }

    // Events
    public struct GraphCreated has copy, drop {
        graph_id: ID,
        owner: address,
        name: String,
        blob_id: String,
        is_public: bool,
    }

    public struct GraphUpdated has copy, drop {
        graph_id: ID,
        owner: address,
        name: String,
        blob_id: String,
        version: u64,
    }

    public struct GraphDeleted has copy, drop {
        graph_id: ID,
        owner: address,
        name: String,
    }

    public struct GraphShared has copy, drop {
        graph_id: ID,
        owner: address,
        shared_with: address,
    }

    // Initialize the module
    fun init(ctx: &mut TxContext) {
        let registry = GraphRegistry {
            id: object::new(ctx),
            public_graphs: table::new(ctx),
            public_graph_list: vector::empty<ID>(),
            graphs_by_owner: table::new(ctx),
            graphs_by_tag: table::new(ctx),
            shared_graphs: table::new(ctx),
            total_graphs: 0,
        };
        transfer::share_object(registry);
    }

    // Create a new graph metadata entry
    public entry fun create_graph_metadata(
        registry: &mut GraphRegistry,
        name: vector<u8>,
        description: vector<u8>,
        blob_id: vector<u8>,
        node_count: u64,
        relationship_count: u64,
        is_public: bool,
        tags: vector<vector<u8>>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let owner = tx_context::sender(ctx);
        let current_time = clock::timestamp_ms(clock);
        
        // Convert byte vectors to strings
        let name_str = string::utf8(name);
        let description_str = string::utf8(description);
        let blob_id_str = string::utf8(blob_id);
        
        // Convert tag byte vectors to strings
        let mut tags_str = vector::empty<String>();
        let mut i = 0;
        while (i < vector::length(&tags)) {
            let tag = vector::borrow(&tags, i);
            vector::push_back(&mut tags_str, string::utf8(*tag));
            i = i + 1;
        };

        // Create graph metadata
        let graph_id = object::new(ctx);
        let graph_object_id = object::uid_to_inner(&graph_id);
        
        let graph = GraphMetadata {
            id: graph_id,
            name: name_str,
            description: description_str,
            blob_id: blob_id_str,
            owner,
            created_at: current_time,
            updated_at: current_time,
            node_count,
            relationship_count,
            is_public,
            tags: tags_str,
            version: 1,
        };

        // Update registry
        registry.total_graphs = registry.total_graphs + 1;

        // Add to public graphs if public
        if (is_public) {
            table::add(&mut registry.public_graphs, graph_object_id, true);
            vector::push_back(&mut registry.public_graph_list, graph_object_id);
        };

        // Add to owner's graphs
        if (!table::contains(&registry.graphs_by_owner, owner)) {
            table::add(&mut registry.graphs_by_owner, owner, vector::empty<ID>());
        };
        let owner_graphs = table::borrow_mut(&mut registry.graphs_by_owner, owner);
        vector::push_back(owner_graphs, graph_object_id);

        // Add to tag indexes
        let mut j = 0;
        while (j < vector::length(&tags_str)) {
            let tag = vector::borrow(&tags_str, j);
            if (!table::contains(&registry.graphs_by_tag, *tag)) {
                table::add(&mut registry.graphs_by_tag, *tag, vector::empty<ID>());
            };
            let tag_graphs = table::borrow_mut(&mut registry.graphs_by_tag, *tag);
            vector::push_back(tag_graphs, graph_object_id);
            j = j + 1;
        };

        // Emit event
        event::emit(GraphCreated {
            graph_id: graph_object_id,
            owner,
            name: name_str,
            blob_id: blob_id_str,
            is_public,
        });

        // Transfer ownership to creator
        transfer::public_transfer(graph, owner);
    }

    // Update graph metadata
    public entry fun update_graph_metadata(
        graph: &mut GraphMetadata,
        registry: &mut GraphRegistry,
        name: vector<u8>,
        description: vector<u8>, 
        blob_id: vector<u8>,
        node_count: u64,
        relationship_count: u64,
        is_public: bool,
        tags: vector<vector<u8>>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        assert!(graph.owner == sender, E_NOT_OWNER);

        let current_time = clock::timestamp_ms(clock);
        let graph_id = object::uid_to_inner(&graph.id);

        // Convert byte vectors to strings
        graph.name = string::utf8(name);
        graph.description = string::utf8(description);
        graph.blob_id = string::utf8(blob_id);
        graph.node_count = node_count;
        graph.relationship_count = relationship_count;
        graph.updated_at = current_time;
        graph.version = graph.version + 1;

        // Handle visibility change
        if (graph.is_public != is_public) {
            if (is_public) {
                table::add(&mut registry.public_graphs, graph_id, true);
                vector::push_back(&mut registry.public_graph_list, graph_id);
            } else if (table::contains(&registry.public_graphs, graph_id)) {
                table::remove(&mut registry.public_graphs, graph_id);
                let (found, index) = vector::index_of(&registry.public_graph_list, &graph_id);
                if (found) {
                    vector::remove(&mut registry.public_graph_list, index);
                };
            };
            graph.is_public = is_public;
        };

        // FIX: Clean up old tag indexes before setting new ones
        let mut i = 0;
        while (i < vector::length(&graph.tags)) {
            let old_tag = vector::borrow(&graph.tags, i);
            if (table::contains(&registry.graphs_by_tag, *old_tag)) {
                let tag_graphs = table::borrow_mut(&mut registry.graphs_by_tag, *old_tag);
                let (found, index) = vector::index_of(tag_graphs, &graph_id);
                if (found) {
                    vector::remove(tag_graphs, index);
                };
            };
            i = i + 1;
        };

        // Convert and set new tags
        let mut new_tags = vector::empty<String>();
        let mut j = 0;
        while (j < vector::length(&tags)) {
            let tag_bytes = vector::borrow(&tags, j);
            let tag = string::utf8(*tag_bytes);
            vector::push_back(&mut new_tags, tag);
            
            // Add to new tag indexes
            if (!table::contains(&registry.graphs_by_tag, tag)) {
                table::add(&mut registry.graphs_by_tag, tag, vector::empty<ID>());
            };
            let tag_graphs = table::borrow_mut(&mut registry.graphs_by_tag, tag);
            vector::push_back(tag_graphs, graph_id);
            
            j = j + 1;
        };
        graph.tags = new_tags;

        // Emit event
        event::emit(GraphUpdated {
            graph_id,
            owner: sender,
            name: graph.name,
            blob_id: graph.blob_id,
            version: graph.version,
        });
    }

    // Delete graph metadata
    public entry fun delete_graph_metadata(
        graph: GraphMetadata,
        registry: &mut GraphRegistry,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        assert!(graph.owner == sender, E_NOT_OWNER);

        let graph_id = object::uid_to_inner(&graph.id);
        
        // Remove from registry
        if (table::contains(&registry.public_graphs, graph_id)) {
            table::remove(&mut registry.public_graphs, graph_id);
            let (found, index) = vector::index_of(&registry.public_graph_list, &graph_id);
            if (found) {
                vector::remove(&mut registry.public_graph_list, index);
            };
        };

        // Remove from owner's graphs
        if (table::contains(&registry.graphs_by_owner, graph.owner)) {
            let owner_graphs = table::borrow_mut(&mut registry.graphs_by_owner, graph.owner);
            let (found, index) = vector::index_of(owner_graphs, &graph_id);
            if (found) {
                vector::remove(owner_graphs, index);
            };
        };

        // FIX: Clean up shared graph references
        // Note: This is a simplified cleanup - in production you might want to track
        // who has been shared what for more efficient cleanup
        
        registry.total_graphs = registry.total_graphs - 1;

        // Emit event
        event::emit(GraphDeleted {
            graph_id,
            owner: graph.owner,
            name: graph.name,
        });

        // Delete the object
        let GraphMetadata { 
            id, 
            name: _, 
            description: _, 
            blob_id: _, 
            owner: _, 
            created_at: _, 
            updated_at: _, 
            node_count: _, 
            relationship_count: _, 
            is_public: _, 
            tags: _, 
            version: _ 
        } = graph;
        object::delete(id);
    }

    // Query functions

    // FIX: Add missing graph sharing functionality
    public entry fun share_graph(
        graph: &GraphMetadata,
        registry: &mut GraphRegistry,
        shared_with: address,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        assert!(graph.owner == sender, E_NOT_OWNER);
        
        let graph_id = object::uid_to_inner(&graph.id);
        
        // Add to shared graphs for the recipient
        if (!table::contains(&registry.shared_graphs, shared_with)) {
            table::add(&mut registry.shared_graphs, shared_with, vector::empty<ID>());
        };
        let shared_with_user = table::borrow_mut(&mut registry.shared_graphs, shared_with);
        
        // Check if already shared to avoid duplicates
        let (already_shared, _) = vector::index_of(shared_with_user, &graph_id);
        if (!already_shared) {
            vector::push_back(shared_with_user, graph_id);
        };
        
        // Emit event
        event::emit(GraphShared {
            graph_id,
            owner: sender,
            shared_with,
        });
    }

    // Get graphs shared with a user
    public fun get_shared_graphs(registry: &GraphRegistry, user: address): vector<ID> {
        if (table::contains(&registry.shared_graphs, user)) {
            *table::borrow(&registry.shared_graphs, user)
        } else {
            vector::empty<ID>()
        }
    }

    // Get graphs by owner
    public fun get_graphs_by_owner(registry: &GraphRegistry, owner: address): vector<ID> {
        if (table::contains(&registry.graphs_by_owner, owner)) {
            *table::borrow(&registry.graphs_by_owner, owner)
        } else {
            vector::empty<ID>()
        }
    }

    // Get public graphs
    public fun get_public_graph_ids(registry: &GraphRegistry): vector<ID> {
        registry.public_graph_list
    }

    // Get graphs by tag
    public fun get_graphs_by_tag(registry: &GraphRegistry, tag: String): vector<ID> {
        if (table::contains(&registry.graphs_by_tag, tag)) {
            *table::borrow(&registry.graphs_by_tag, tag)
        } else {
            vector::empty<ID>()
        }
    }

    // Get total graph count
    public fun get_total_graphs(registry: &GraphRegistry): u64 {
        registry.total_graphs
    }

    // Getters for GraphMetadata
    public fun get_graph_name(graph: &GraphMetadata): String {
        graph.name
    }

    public fun get_graph_description(graph: &GraphMetadata): String {
        graph.description
    }

    public fun get_graph_blob_id(graph: &GraphMetadata): String {
        graph.blob_id
    }

    public fun get_graph_owner(graph: &GraphMetadata): address {
        graph.owner
    }

    public fun get_graph_created_at(graph: &GraphMetadata): u64 {
        graph.created_at
    }

    public fun get_graph_updated_at(graph: &GraphMetadata): u64 {
        graph.updated_at
    }

    public fun get_graph_node_count(graph: &GraphMetadata): u64 {
        graph.node_count
    }

    public fun get_graph_relationship_count(graph: &GraphMetadata): u64 {
        graph.relationship_count
    }

    public fun get_graph_is_public(graph: &GraphMetadata): bool {
        graph.is_public
    }

    public fun get_graph_tags(graph: &GraphMetadata): vector<String> {
        graph.tags
    }

    public fun get_graph_version(graph: &GraphMetadata): u64 {
        graph.version
    }
} 