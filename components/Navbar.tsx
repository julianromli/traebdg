'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Product', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Docs', href: '#' },
    { name: 'Community', href: '#' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-2xl font-semibold text-white tracking-tighter uppercase">
              <Image src="/trae-color.svg" alt="TRAE" width={32} height={32} />
              <span className="text-white">BDG</span>
            </Link>
            
            {/* Desktop Menu - Left Aligned next to logo */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="#redeem" 
              className="bg-[#32F08C] text-black hover:bg-[#2bd97c] px-6 py-2.5 rounded-none text-sm font-semibold transition-all duration-200 uppercase tracking-wide"
            >
              Download
            </Link>
            <button className="p-2 text-white hover:text-[#32F08C] transition-colors bg-[#1A1A1A] rounded-none">
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-none text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-[#32F08C] block py-3 text-base font-medium border-b border-white/5"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-4">
                <Link
                  href="#redeem"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center block bg-[#32F08C] text-black hover:bg-[#2bd97c] px-3 py-3 rounded-none text-base font-semibold uppercase"
                >
                  Download
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
