"use client";

import { motion } from 'framer-motion';
import { Code, Database, Network } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      title: 'Create Nodes and Edges',
      description: 'Use simple SQL-like commands to define your graph structure.',
      icon: Code,
      codeSnippet: 'CREATE NODE (name: "Alice");',
      delay: 0.1
    },
    {
      title: 'Store Data Securely',
      description: 'Store graph data on Sui and large files on Walrus for decentralized access.',
      icon: Database,
      delay: 0.2
    },
    {
      title: 'Visualize and Query',
      description: 'See your graph come to life and query relationships in real-time.',
      icon: Network,
      delay: 0.3
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-light mb-4">How It Works</h2>
          <p className="text-muted">
            Get started with our decentralized graph database in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: step.delay }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="border border-border p-6">
                <div className="mb-6">
                  <step.icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-light mb-3">{step.title}</h3>
                <p className="text-muted mb-4">{step.description}</p>
                
                {step.codeSnippet && (
                  <div className="bg-background p-3 font-mono text-sm text-muted">
                    {step.codeSnippet}
                  </div>
                )}
              </div>

              <div className="absolute -left-4 -top-4 text-3xl font-light text-muted opacity-20">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}