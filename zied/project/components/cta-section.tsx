"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section id="cta" className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto border border-border p-12">
          <div className="text-center">
            <motion.h2 
              className="text-3xl font-light mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Start Building Your Decentralized Graph Today
            </motion.h2>
            
            <motion.p 
              className="text-muted mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Join thousands of developers and organizations building the future of Web3 with our graph database.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <a 
                href="#"
                className="clip-button px-8 py-3 bg-accent text-foreground hover:bg-accent/80 transition-colors flex items-center"
              >
                Sign Up Now <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="#"
                className="text-muted hover:text-foreground transition-colors"
              >
                Schedule a Demo
              </a>
            </motion.div>
            
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-muted mb-4">Stay updated with our latest features</p>
              <div className="flex max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 bg-secondary border border-border focus:outline-none focus:border-foreground transition-colors"
                />
                <button className="clip-button px-6 py-2 bg-accent text-foreground hover:bg-accent/80 transition-colors">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}