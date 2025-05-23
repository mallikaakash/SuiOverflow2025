"use client";

import { motion } from 'framer-motion';
import { Lock, Zap, Share2 } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      title: 'Decentralized Storage',
      description: 'Store your graph data securely on the blockchain, ensuring data integrity and availability.',
      icon: Lock,
      delay: 0.1
    },
    {
      title: 'Fast Querying',
      description: 'Query complex relationships in milliseconds with our optimized graph algorithms.',
      icon: Zap,
      delay: 0.2
    },
    {
      title: 'Seamless Integration',
      description: 'Integrate easily with Sui and Walrus for scalable and cost-effective data management.',
      icon: Share2,
      delay: 0.3
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-light mb-4">Why Choose Our Graph Database?</h2>
          <p className="text-muted">
            Built for Web3 developers, our database offers unparalleled performance and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true }}
              className="border border-border p-6"
            >
              <feature.icon className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-light mb-3">{feature.title}</h3>
              <p className="text-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}