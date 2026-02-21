'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-black text-white px-4 pt-24 md:pt-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight"
        >
          Dapatkan <span className="text-[#32F08C]">Redeem Code</span> <br className="hidden md:block" />
          Eksklusif Bandung
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
        >
          Nikmati akses premium dan fitur spesial hanya dengan satu langkah mudah. 
          Gabung sekarang dan rasakan pengalaman terbaik.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="#redeem" className="px-8 py-4 bg-[#32F08C] text-black font-bold rounded-full hover:bg-[#2bd97c] transition-all transform hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(50,240,140,0.3)]">
            Dapatkan Kode Sekarang <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="px-8 py-4 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10">
            Pelajari Lebih Lanjut
          </button>
        </motion.div>
      </div>

      {/* Mockup Placeholder */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative mt-16 w-full max-w-4xl mx-auto bg-gray-800/50 rounded-t-3xl border border-white/10 backdrop-blur-md overflow-hidden shadow-2xl"
      >
        <Image 
          src="/mockup.png" 
          alt="Trae Dashboard Mockup" 
          width={1200}
          height={800}
          className="w-full h-auto rounded-t-3xl"
          priority
        />
        
        {/* Simple decorative elements for the mockup */}
        <div className="absolute top-4 left-4 flex space-x-2 z-10">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
      </motion.div>
    </section>
  );
}
