"use client";

import { motion } from 'framer-motion';

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "This service made building my dApp's social graph a breeze!",
      author: "Alice",
      role: "Web3 Developer",
      delay: 0.1
    },
    {
      quote: "The decentralized storage gives me peace of mind for my data.",
      author: "Bob",
      role: "Blockchain Enthusiast",
      delay: 0.2
    },
    {
      quote: "Fast queries and easy integration – exactly what I needed.",
      author: "Charlie",
      role: "AI Researcher",
      delay: 0.3
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-light mb-4">What Users Are Saying</h2>
          <p className="text-muted">
            See why developers and organizations choose our graph database solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: testimonial.delay }}
              className="border border-border p-6 relative"
            >
              <div className="absolute top-6 right-6 opacity-10 text-6xl font-serif">"</div>
              <p className="text-muted mb-6 relative z-10">{testimonial.quote}</p>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-lg font-light">
                  {testimonial.author.charAt(0)}
                </div>
                <div className="ml-4">
                  <h4 className="font-light">{testimonial.author}</h4>
                  <p className="text-sm text-muted">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}