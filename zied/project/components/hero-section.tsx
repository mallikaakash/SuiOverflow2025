"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7130469/pexels-photo-7130469.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight">
              Decentralized Graph Database for <span className="font-normal">Web3</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-muted mb-8 max-w-2xl">
              Build and query knowledge graphs on the blockchain with ease.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center space-x-6"
          >
            <Link 
              href="#cta"
              className="clip-button px-8 py-3 bg-accent text-foreground hover:bg-accent/80 transition-colors"
            >
              Get Started
            </Link>
            <Link 
              href="#features"
              className="text-muted hover:text-foreground transition-colors"
            >
              Learn More →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}