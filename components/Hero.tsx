'use client';

import Link from 'next/link';
import { ArrowRight, Terminal, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center bg-black overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#32F08C]/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tighter text-white leading-[1.1]">
              Redeem Your <br />
              <span className="text-[#32F08C]">TRAE PRO</span> <br />
              Benefit
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed"
          >
            Understand. Execute. Deliver. <br />
            TRAE is your 10x AI Engineer who can independently build software solutions for you.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              href="https://trae.ai" 
              className="inline-flex items-center justify-center px-6 py-2.5 bg-[#32F08C] text-black font-semibold text-sm hover:bg-[#2bd97c] transition-all rounded-none uppercase tracking-wide gap-2 group"
            >
              <Zap className="w-5 h-5 fill-current" />
              Download TRAE
            </Link>
            <Link 
              href="https://trae.ai" 
              className="inline-flex items-center justify-center px-6 py-2.5 bg-transparent border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all rounded-none uppercase tracking-wide gap-2"
            >
              Explore SOLO
            </Link>
            </motion.div>
            

          </div>

          {/* Right Content / Visuals */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative hidden lg:block h-full min-h-[500px]"
          >
            {/* Abstract visual representation of code/AI */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#32F08C]/10 via-transparent to-transparent blur-3xl"></div>
            
            <div className="relative z-10 w-full h-full flex items-center justify-center">
                {/* Floating Elements imitating the 'wave' of code */}
                <div className="grid grid-cols-12 gap-2 p-4 w-full opacity-50">
                    {Array.from({ length: 144 }).map((_, i) => (
                        <div 
                            key={i} 
                            className={`h-2 w-2 rounded-none ${((i * 42) % 100) > 70 ? 'bg-[#32F08C]' : 'bg-gray-800'}`}
                            style={{ opacity: ((i * 1337) % 100) / 100 }}
                        />
                    ))}
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
