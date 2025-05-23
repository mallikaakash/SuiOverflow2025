"use client";

import { motion } from 'framer-motion';
import { Users, Brain, ThumbsUp } from 'lucide-react';

export function UseCasesSection() {
  const useCases = [
    {
      title: 'Decentralized Social Networks',
      description: 'Manage user relationships and interactions without a central authority.',
      icon: Users,
      delay: 0.1
    },
    {
      title: 'AI Knowledge Graphs',
      description: 'Power AI agents with decentralized, semantic data for better reasoning.',
      icon: Brain,
      delay: 0.2
    },
    {
      title: 'Recommendation Systems',
      description: 'Build personalized recommendations with decentralized data storage.',
      icon: ThumbsUp,
      delay: 0.3
    }
  ];

  return (
    <section id="use-cases" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-light mb-4">Real-World Applications</h2>
          <p className="text-muted">
            Discover how our graph database powers innovative applications across industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: useCase.delay }}
              className="border border-border p-6 group"
            >
              <useCase.icon className="h-8 w-8 mb-6 opacity-60 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-light mb-3">{useCase.title}</h3>
              <p className="text-muted">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}