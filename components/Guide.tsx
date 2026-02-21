'use client';

import { CheckCircle, Gift, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const steps = [
  {
    id: 1,
    title: 'Dapatkan Kode',
    description: 'Temukan kode promo eksklusif melalui kampanye kami atau mitra resmi.',
    icon: <Gift className="w-6 h-6 text-[#32F08C]" />,
  },
  {
    id: 2,
    title: 'Masukkan Kode',
    description: 'Salin dan tempel kode ke dalam kolom redeem di aplikasi atau website.',
    icon: <Zap className="w-6 h-6 text-[#32F08C]" />,
  },
  {
    id: 3,
    title: 'Nikmati Benefit',
    description: 'Dapatkan akses langsung ke fitur premium dan diskon spesial.',
    icon: <ShieldCheck className="w-6 h-6 text-[#32F08C]" />,
  },
];

const benefits = [
  'Akses Tanpa Batas',
  'Diskon Eksklusif',
  'Support Prioritas',
  'Update Lebih Cepat',
];

export default function Guide() {
  return (
    <section id="guide" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#32F08C]/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Cara Mendapatkan <span className="text-[#32F08C]">Keuntungan</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ikuti langkah mudah berikut untuk mengklaim kode redeem Anda dan mulai nikmati layanan premium kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-800 -z-10 transform -translate-y-1/2"></div>
            
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-[#32F08C]/30 transition-all group"
              >
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/10 group-hover:border-[#32F08C]/50 shadow-lg shadow-[#32F08C]/5">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="bg-gray-900/50 rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Kenapa Harus Redeem Sekarang?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#32F08C]" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 w-full flex justify-center md:justify-end">
                <Link href="#redeem" className="w-full md:w-auto px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/10 inline-block text-center">
                    Mulai Redeem Sekarang
                </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
