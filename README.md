# WalGraph 🌊📊

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Sui Network](https://img.shields.io/badge/Sui-Blockchain-blue)](https://sui.io/)
[![Walrus Protocol](https://img.shields.io/badge/Walrus-Storage-orange)](https://walrus.space/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://typescriptlang.org/)

**WalGraph** is a revolutionary decentralized graph database that combines the power of SUI blockchain, Walrus protocol storage, and modern web technologies to create a truly distributed, censorship-resistant graph data management system.

## 🚀 What is WalGraph?

WalGraph enables you to create, store, query, and analyze graph data structures in a completely decentralized manner. Unlike traditional graph databases that rely on centralized servers, WalGraph stores your data permanently on the Walrus protocol while maintaining metadata and access control on the SUI blockchain.

### 🔑 Key Features

#### 🌐 Decentralized Architecture
- **Distributed Storage**: Large graph data stored as JSON-LD on Walrus protocol
- **No Single Point of Failure**: Truly distributed system with no central authority
- **Censorship Resistant**: Your data cannot be deleted or modified by third parties

#### 📊 Complete Graph Database Capabilities
- **CRUD Operations**: Full Create, Read, Update, Delete for nodes and relationships
- **Cypher-like Queries**: Powerful query language with MATCH, WHERE, RETURN clauses
- **Graph Algorithms**: Built-in PageRank, degree centrality, connected components
- **Path Finding**: Shortest path and all paths between nodes
- **Advanced Analytics**: Comprehensive graph statistics and metrics

#### 🎨 Modern Web Interface
- **Interactive Visualization**: Real-time D3.js-powered graph rendering
- **Intuitive Editor**: Visual graph creation and editing interface
- **Query Builder**: User-friendly query construction and execution
- **Responsive Design**: Works seamlessly on desktop and mobile devices

#### 🔗 Web3 Integration
- **Wallet Connect**: Seamless SUI wallet integration
- **True Ownership**: Users own their graph data through blockchain
- **Smart Contracts**: Automated access control and data integrity
- **JSON-LD Standards**: Semantic web compatibility and interoperability

## 🏗️ Architecture

WalGraph employs a sophisticated three-layer architecture:

```
┌─────────────────────────────────────────────────────┐
│                 Frontend Layer                      │
│  Next.js + TypeScript + D3.js + Tailwind CSS      │
└─────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────┐
│                Blockchain Layer                     │
│       SUI Smart Contracts (Move Language)          │
│                                                    │
│  • Access Control & Permissions                    │
│  • Ownership Tracking                             │
└─────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────┐
│               Storage Layer                         │
│            Walrus Protocol                         │
│  • Large Graph Data (JSON-LD Format)              │
│  • Decentralized Content Storage                   │
│  • Content-Addressed Blob Storage                  │
└─────────────────────────────────────────────────────┘
```

### Data Flow

1. **Graph Creation**: Users create graphs in the web interface
2. **Local Processing**: Graph algorithms and queries run client-side
3. **Serialization**: Graph data is serialized to JSON-LD format
4. **Walrus Storage**: Large graph data stored as blobs on Walrus
5. **Blockchain Registry**: Ownership recorded on SUI
6. **Discovery**: Public graphs discoverable through blockchain registry

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **D3.js**: Interactive data visualization
- **Monaco Editor**: Code editor for queries
- **Lucide React**: Beautiful icon library

### Blockchain
- **SUI Blockchain**: Layer 1 blockchain for metadata
- **Move Language**: Smart contract development
- **Walrus Protocol**: Decentralized blob storage
- **JSON-LD**: Semantic web data format

### Development Tools
- **ESLint**: Code linting and formatting
- **Turbopack**: Next.js bundler for fast development
- **React Query**: Data fetching and caching
- **UUID**: Unique identifier generation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- SUI CLI installed
- SUI wallet (for testnet)
- Basic knowledge of graph databases

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/walgraph.git
cd walgraph
```

### 2. Install Dependencies

```bash
cd frontend
npm install --legacy-peer-deps
```

### 3. Set Up Environment

Create `frontend/.env.local`:

```env
# SUI Contract Configuration (TESTNET)
NEXT_PUBLIC_PACKAGE_ID=0x[your_package_id]
NEXT_PUBLIC_REGISTRY_ID=0x[your_registry_id]

# Walrus Configuration (TESTNET)
NEXT_PUBLIC_WALRUS_AGGREGATOR_URL=https://aggregator-devnet.walrus.space
NEXT_PUBLIC_WALRUS_PUBLISHER_URL=https://publisher-devnet.walrus.space

# Network Configuration
NEXT_PUBLIC_SUI_NETWORK=testnet
NEXT_PUBLIC_WALRUS_NETWORK=testnet
```

### 4. Deploy Smart Contracts

```bash
# Navigate to contracts directory
cd sui_contracts

# Build contracts
sui move build

# Deploy to testnet
sui client publish --gas-budget 100000000
```

### 5. Start Development Server

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` to access the application.

## 📖 Usage Guide

### Creating Your First Graph

1. **Connect Wallet**: Click "Connect Wallet" and approve the connection
2. **Create Nodes**: Use the "Create" tab to add nodes with properties
3. **Add Relationships**: Connect nodes with labeled relationships
4. **Visualize**: See your graph rendered in real-time
5. **Save**: Store your graph on Walrus and SUI blockchain

### Querying Graphs

WalGraph supports Cypher-like query syntax:

```cypher
MATCH (person:Person)-[r:KNOWS]-(friend:Person)
WHERE person.name = "Alice"
RETURN person, r, friend
```

### Graph Analytics

Run built-in algorithms:
- **Degree Centrality**: Find the most connected nodes
- **PageRank**: Identify influential nodes
- **Connected Components**: Discover graph clusters
- **Shortest Path**: Find optimal routes between nodes

## 🔧 Development

### Project Structure

```
walgraph/
├── frontend/                 # Next.js web application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   ├── lib/             # Utility libraries
│   │   └── services/        # API services
│   └── public/              # Static assets
├── sui_contracts/           # SUI Move smart contracts
│   ├── sources/             # Move source files
│   └── Move.toml           # Package configuration
├── walrus-verification/     # Walrus integration tools
└── deployment-guide.md     # Detailed deployment instructions
```

### Smart Contract Features

The Move smart contracts provide:

- **Graph Metadata Management**: Store graph information on-chain
- **Access Control**: Manage public/private graph permissions
- **Owner Verification**: Ensure only owners can modify their graphs
- **Graph Discovery**: Public registry for finding shared graphs
- **Version Control**: Track graph updates and versions
- **Tag-based Search**: Organize graphs with custom tags

### Frontend Architecture

The frontend follows modern React patterns:

- **Component-Based**: Modular, reusable UI components
- **Type Safety**: Full TypeScript coverage
- **State Management**: React Query for server state
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 compliance

## 🌟 Use Cases

### Academic Research
- **Citation Networks**: Model academic paper relationships
- **Collaboration Graphs**: Track researcher collaborations
- **Knowledge Graphs**: Build semantic research databases

### Social Networks
- **Decentralized Social**: Build censorship-resistant social platforms
- **Community Analysis**: Analyze social group dynamics
- **Influence Mapping**: Identify key community members

### Business Intelligence
- **Supply Chain**: Model complex supply relationships
- **Organizational Charts**: Visualize company structures
- **Customer Journey**: Track user interaction patterns

### Blockchain Analytics
- **Transaction Graphs**: Analyze blockchain transaction flows
- **Protocol Relationships**: Model DeFi protocol interactions
- **Token Flow Analysis**: Track asset movements

## 🛡️ Security & Privacy

### Data Ownership
- **Blockchain Proof**: Ownership recorded immutably on SUI
- **Private Keys**: Only you control your data
- **Access Control**: Granular permissions management

## 🚀 Deployment

### Production Deployment

For detailed deployment instructions, see our [Deployment Guide](deployment-guide.md).

### Vercel Deployment

The frontend can be easily deployed on Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Self-Hosting

Deploy on your own infrastructure:

```bash
# Build production assets
npm run build

# Start production server
npm start
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Contribution Guidelines

- **Code Quality**: Follow TypeScript best practices
- **Testing**: Add tests for new features
- **Documentation**: Update docs for API changes
- **Performance**: Consider performance implications
- **Security**: Follow security best practices

### Areas for Contribution

- **Graph Algorithms**: Implement new analysis algorithms
- **UI/UX**: Improve user interface and experience
- **Performance**: Optimize query processing
- **Mobile**: Enhance mobile responsiveness
- **Documentation**: Improve guides and tutorials

## 📚 Resources

### Documentation
- [SUI Blockchain Documentation](https://docs.sui.io/)
- [Walrus Protocol Documentation](https://docs.walrus.space/)
- [Move Programming Language](https://move-language.github.io/move/)
- [JSON-LD Specification](https://www.w3.org/TR/json-ld11/)

### Community
- [SUI Discord](https://discord.gg/sui)
- [Walrus Community](https://discord.gg/walrus)
- [GitHub Discussions](https://github.com/yourusername/walgraph/discussions)

### Support
- [Issues](https://github.com/yourusername/walgraph/issues)
- [Feature Requests](https://github.com/yourusername/walgraph/issues/new?template=feature_request.md)
- [Bug Reports](https://github.com/yourusername/walgraph/issues/new?template=bug_report.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **SUI Foundation**: For providing the blockchain infrastructure
- **Walrus Team**: For decentralized storage protocol
- **Move Community**: For the smart contract language
- **Open Source Community**: For the amazing tools and libraries

---

**Built with ❤️ by the WalGraph Team**

*Democratizing graph data storage and analysis through decentralization* 