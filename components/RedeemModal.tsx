'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Copy } from 'lucide-react';

interface RedeemModalProps {
  isOpen: boolean;
  onClose: () => void;
  code?: string; // Optional code to display if success
}

export default function RedeemModal({ isOpen, onClose, code }: RedeemModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          />

          {/* Modal Content */}
          <motion.div
            key="modal-content"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed z-50 w-full max-w-md bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/5 bg-gradient-to-r from-gray-900 to-black">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#32F08C] animate-pulse"></span>
                Redeem Berhasil!
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 text-center space-y-6">
              <div className="mx-auto w-20 h-20 bg-[#32F08C]/10 rounded-full flex items-center justify-center mb-4 ring-1 ring-[#32F08C]/30 shadow-[0_0_30px_rgba(50,240,140,0.2)]">
                <CheckCircle className="w-10 h-10 text-[#32F08C]" />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-white">Selamat!</h4>
                <p className="text-gray-400">
                  Kode redeem Anda telah berhasil diklaim. Gunakan kode di bawah ini untuk mengakses fitur premium.
                </p>
              </div>

              {/* Code Display */}
              <div className="bg-black border border-dashed border-gray-700 rounded-xl p-4 flex items-center justify-between gap-4 group hover:border-[#32F08C]/50 transition-colors">
                <code className="text-[#32F08C] font-mono text-xl font-bold tracking-wider">
                  {code || 'TRAE-BDG-2024'}
                </code>
                <button
                  onClick={handleCopy}
                  className="p-2 text-gray-400 hover:text-white transition-colors relative"
                  title="Salin Kode"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-[#32F08C]" />
                  ) : (
                    <Copy className="w-5 h-5 group-hover:text-[#32F08C]" />
                  )}
                  {copied && (
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#32F08C] text-black text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                      Tersalin!
                    </span>
                  )}
                </button>
              </div>

              <div className="text-xs text-gray-500 mt-4">
                *Kode berlaku selama 24 jam setelah diklaim.
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-gray-900/50 flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-colors"
              >
                Tutup
              </button>
              <a 
                href="https://www.trae.ai/pricing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-3 bg-[#32F08C] hover:bg-[#2bd97c] text-black font-bold rounded-xl transition-colors shadow-lg shadow-[#32F08C]/20 flex items-center justify-center"
              >
                Gunakan Sekarang
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
