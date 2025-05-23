"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';
import type { GraphData } from 'react-d3-graph';

// Dynamically import client components to prevent SSR issues
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });
const Graph = dynamic(() => import('react-d3-graph').then(mod => ({ default: mod.Graph })), { ssr: false });

export default function Home() {
  const [code, setCode] = useState('// Write Cypher-like commands here\n// Example: CREATE NODE (name: "Alice")\n// Example: CREATE RELATIONSHIP (from: "Alice", to: "Bob", type: "KNOWS")');
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [
      { id: "Alice" },
      { id: "Bob" },
      { id: "Charlie" }
    ],
    links: [
      { source: "Alice", target: "Bob" },
      { source: "Alice", target: "Charlie" },
    ]
  });

  // Configuration for the graph
  const graphConfig = {
    nodeHighlightBehavior: true,
    height: 400,
    width: 800,
    node: {
      color: "#5CA8DB",
      size: 120,
      highlightStrokeColor: "#007BFF",
      fontSize: 14,
    },
    link: {
      highlightColor: "#007BFF",
      labelProperty: "label",
    },
    d3: {
      alphaTarget: 0.05,
      gravity: -250,
      linkLength: 120,
    }
  };

  // Handle execution of commands
  const handleExecute = () => {
    const commands = code.split('\n').filter(cmd => cmd.trim() && !cmd.startsWith('//'));
    let newGraphData = { ...graphData };
    
    for (const command of commands) {
      if (command.toLowerCase().startsWith('create node')) {
        const nameMatch = command.match(/name:\s*"(.+?)"/);
        if (nameMatch) {
          const name = nameMatch[1];
          // Check if node already exists
          if (!newGraphData.nodes.find(node => node.id === name)) {
            newGraphData.nodes = [...newGraphData.nodes, { id: name }];
          }
        }
      } else if (command.toLowerCase().startsWith('create relationship')) {
        const fromMatch = command.match(/from:\s*"(.+?)"/);
        const toMatch = command.match(/to:\s*"(.+?)"/);
        const typeMatch = command.match(/type:\s*"(.+?)"/);
        
        if (fromMatch && toMatch) {
          const from = fromMatch[1];
          const to = toMatch[1];
          const type = typeMatch ? typeMatch[1] : "RELATES_TO";
          
          // Ensure both nodes exist
          if (!newGraphData.nodes.find(node => node.id === from)) {
            newGraphData.nodes = [...newGraphData.nodes, { id: from }];
          }
          if (!newGraphData.nodes.find(node => node.id === to)) {
            newGraphData.nodes = [...newGraphData.nodes, { id: to }];
          }
          
          // Add the relationship
          const newLink = { source: from, target: to, label: type };
          // Check if this link already exists
          if (!newGraphData.links.some(link => 
            link.source === from && link.target === to && link.label === type)) {
            newGraphData.links = [...newGraphData.links, newLink];
          }
        }
      } else if (command.toLowerCase().startsWith('delete node')) {
        const nameMatch = command.match(/name:\s*"(.+?)"/);
        if (nameMatch) {
          const name = nameMatch[1];
          newGraphData.nodes = newGraphData.nodes.filter(node => node.id !== name);
          newGraphData.links = newGraphData.links.filter(link => 
            link.source !== name && link.target !== name);
        }
      }
    }
    
    setGraphData(newGraphData);
  };

  const onClickNode = function(nodeId: string) {
    console.log(`Clicked node ${nodeId}`);
  };

  const onClickLink = function(source: string, target: string) {
    console.log(`Clicked link between ${source} and ${target}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-950 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">WebWalrus Graph Database</h1>
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Graph Visualization Tool</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Write Cypher-like commands to create and manipulate a graph database. Use the editor below to input commands.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium mb-4">Command Editor</h3>
            <div className="h-[300px] border border-gray-300 dark:border-gray-700 rounded">
              <Editor
                height="100%"
                defaultLanguage="cypher"
                language="sql"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 14,
                }}
              />
            </div>
            <div className="mt-4 flex space-x-4">
              <button 
                onClick={handleExecute}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Execute
              </button>
              <button 
                onClick={() => setGraphData({ nodes: [], links: [] })}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Clear Graph
              </button>
            </div>
            
            <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded">
              <h4 className="font-medium mb-2">Example Commands:</h4>
              <ul className="text-sm space-y-1 font-mono">
                <li>CREATE NODE (name: "Alice")</li>
                <li>CREATE NODE (name: "Bob")</li>
                <li>CREATE RELATIONSHIP (from: "Alice", to: "Bob", type: "KNOWS")</li>
                <li>DELETE NODE (name: "Charlie")</li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium mb-4">Graph Visualization</h3>
            <div className="h-[400px] border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 relative">
              {graphData.nodes.length > 0 ? (
                <div className="h-full w-full">
                  <Graph
                    id="graph-id"
                    data={graphData}
                    config={graphConfig}
                    onClickNode={onClickNode}
                    onClickLink={onClickLink}
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  No graph data available. Create nodes using the editor.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-950 p-6 mt-12">
        <div className="container mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
          <p>WebWalrus Graph Database Demo - Built with Next.js, react-d3-graph, and Monaco Editor</p>
        </div>
      </footer>
    </div>
  );
}
