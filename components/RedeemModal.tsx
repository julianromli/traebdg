'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Copy } from 'lucide-react';

interface RedeemModalProps {
  isOpen: boolean;
  onClose: () => void;
  code?: string;
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg bg-black border border-white/20 shadow-2xl relative"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <h3 className="text-xl font-semibold text-white uppercase tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 bg-[#32F08C]"></span>
              Redeem Successful
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <h4 className="text-3xl font-semibold text-white">Congratulations!</h4>
              <p className="text-gray-400">
                Your code has been successfully claimed. Use the code below to access premium features.
              </p>
            </div>

            {/* Code Display */}
            <div className="bg-[#0A0A0A] border border-white/10 p-6 flex items-center justify-between gap-4 group hover:border-[#32F08C]/50 transition-colors">
              <code className="text-[#32F08C] font-mono text-2xl font-semibold tracking-widest">
                {code || 'TRAE-BDG-2024'}
              </code>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase text-sm font-semibold tracking-wider"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#32F08C]" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <button 
                onClick={onClose}
                className="px-6 py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white font-semibold uppercase tracking-wider transition-colors"
              >
                Close
              </button>
              <a 
                href="https://www.trae.ai/pricing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-[#32F08C] hover:bg-[#2bd97c] text-black font-semibold uppercase tracking-wider transition-colors text-center flex items-center justify-center"
              >
                Use Now
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
