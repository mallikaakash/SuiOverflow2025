"use client";

import Link from 'next/link';
import { Database } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Database className="h-6 w-6" />
            <span className="text-xl font-mono">GraphDB3</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-sm text-muted hover:text-foreground transition-colors">
              Core technologies
            </Link>
            <Link href="#how-it-works" className="text-sm text-muted hover:text-foreground transition-colors">
              Why GraphDB3
            </Link>
            <Link href="#use-cases" className="text-sm text-muted hover:text-foreground transition-colors">
              Articles
            </Link>
            <Link href="#cta" className="clip-button px-6 py-2 bg-accent text-sm text-foreground hover:bg-accent/80 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}