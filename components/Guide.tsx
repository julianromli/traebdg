'use client';

import { CheckCircle, Gift, ShieldCheck, Zap, Code, Terminal, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const features = [
  {
    id: 1,
    title: 'From Idea to Launch',
    description: 'AI Integrated Into the Entire Development Lifecycle. Build faster than ever before.',
    icon: <Code className="w-8 h-8 text-white" />,
  },
  {
    id: 2,
    title: 'Ship Autonomously',
    description: 'With TRAE SOLO, your AI agent handles complex tasks independently while you oversee.',
    icon: <Terminal className="w-8 h-8 text-white" />,
  },
  {
    id: 3,
    title: 'Seamless Switch',
    description: 'Switch between Chat and Builder modes instantly to maintain your flow.',
    icon: <Cpu className="w-8 h-8 text-white" />,
  },
];

export default function Guide() {
  return (
    <section id="features" className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
          {/* Header Section */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-[1.1]">
              What You&apos;ll <br />
              Unlock <br />
              with <span className="text-[#32F08C]">TRAE</span>
            </h2>
            <p className="text-gray-400 max-w-sm text-base sm:text-lg">
              Experience the future of software engineering. Redeem your code to unlock premium capabilities.
            </p>
            <Link 
              href="#redeem" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold text-lg hover:bg-gray-200 transition-all rounded-none uppercase tracking-wide"
            >
              Get Started
            </Link>
          </div>

          {/* Grid Section */}
          <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`
                  group relative bg-[#0A0A0A] border border-white/10 p-8 hover:border-[#32F08C]/50 transition-all duration-300
                  ${index === 2 ? 'md:col-span-2' : ''}
                `}
              >
                <div className="flex flex-col h-full justify-between gap-8">
                  <div className="flex justify-between items-start">
                    <span className="text-[#32F08C] font-mono text-sm tracking-wider">
                      [{String(index).padStart(2, '0')}]
                    </span>
                    <div className="p-3 bg-white/5 rounded-none group-hover:bg-[#32F08C] group-hover:text-black transition-colors duration-300">
                      {/* Icon Color Change on Hover */}
                      <div className="group-hover:text-black text-white transition-colors duration-300">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold tracking-tight group-hover:text-[#32F08C] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  {/* Visual Placeholder for Tech Aesthetic */}
                  <div className="w-full h-32 bg-black/50 border border-white/5 relative overflow-hidden mt-4">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#32F08C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
