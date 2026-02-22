'use client';

import { useActionState, useEffect, useState, startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { redeemSchema, RedeemFormValues } from '@/lib/validations';
import { redeemCode } from '@/app/actions';
import RedeemModal from './RedeemModal';
import { Loader2, AlertCircle, Check, User, Mail, Phone, Terminal, Code2, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RedeemForm() {
  const [state, dispatch, isPending] = useActionState(redeemCode, {
    success: false,
    message: '',
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm<RedeemFormValues>({
    resolver: zodResolver(redeemSchema),
    defaultValues: {
      background: 'Non-IT',
      usedTrae: 'NO',
    },
    mode: 'onBlur',
  });

  const [showModal, setShowModal] = useState(false);
  const background = watch('background');

  useEffect(() => {
    if (state.success) {
      setShowModal(true);
    }
  }, [state.success]);

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    
    handleSubmit(async () => {
      const formData = new FormData(form);
      startTransition(() => {
        dispatch(formData);
      });
    })(evt);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      <RedeemModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        code={state.code} 
      />
      
      <motion.form 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        onSubmit={onSubmit}
        className="space-y-8 bg-black/50 backdrop-blur-sm p-8 md:p-12 border border-white/10 max-w-2xl mx-auto relative overflow-hidden rounded-xl shadow-2xl shadow-[#32F08C]/5"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#32F08C]/10 to-transparent pointer-events-none rounded-tr-xl"></div>
        <div className="absolute top-0 right-0 w-[1px] h-20 bg-gradient-to-b from-[#32F08C] to-transparent"></div>
        <div className="absolute top-0 right-0 w-20 h-[1px] bg-gradient-to-l from-[#32F08C] to-transparent"></div>
        
        {/* Header */}
        <motion.div variants={itemVariants} className="space-y-4 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-8 bg-[#32F08C]"></span>
            <span className="text-[#32F08C] font-mono text-xs tracking-widest uppercase">Limited Access</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
            Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Redeem Code</span>
          </h2>
          <p className="text-gray-400 font-light">
            Fill out the form below to unlock your premium access to <span className="text-[#32F08C] font-mono">TRAE PRO</span>.
          </p>
        </motion.div>

        {/* Global Error Message */}
        <AnimatePresence mode="wait">
          {!state.success && state.message && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-500/10 border border-red-500/20 p-4 flex items-start gap-3 rounded-lg"
            >
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-400 font-mono">{state.message}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6">
          {/* Full Name */}
          <motion.div variants={itemVariants} className="space-y-2 group">
            <label htmlFor="fullName" className="text-xs font-mono text-[#32F08C] uppercase tracking-wider flex items-center gap-2">
              <User className="w-3 h-3" /> Full Name
            </label>
            <div className="relative">
              <input
                id="fullName"
                {...register('fullName')}
                className="w-full bg-white/5 border border-white/10 px-4 py-4 pl-11 text-white placeholder-white/20 focus:outline-none focus:border-[#32F08C] focus:bg-white/10 focus:ring-1 focus:ring-[#32F08C]/50 transition-all rounded-lg font-mono text-sm"
                placeholder="ENTER YOUR FULL NAME"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#32F08C] transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>
              </div>
            </div>
            <AnimatePresence>
              {formErrors.fullName && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-red-400 font-mono flex items-center gap-1 mt-1"
                >
                  <span className="text-red-500">!</span> {formErrors.fullName.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariants} className="space-y-2 group">
            <label htmlFor="email" className="text-xs font-mono text-[#32F08C] uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-3 h-3" /> Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full bg-white/5 border border-white/10 px-4 py-4 pl-11 text-white placeholder-white/20 focus:outline-none focus:border-[#32F08C] focus:bg-white/10 focus:ring-1 focus:ring-[#32F08C]/50 transition-all rounded-lg font-mono text-sm"
                placeholder="NAME@EMAIL.COM"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#32F08C] transition-colors" />
            </div>
            <AnimatePresence>
              {formErrors.email && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-red-400 font-mono flex items-center gap-1 mt-1"
                >
                  <span className="text-red-500">!</span> {formErrors.email.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* WhatsApp */}
          <motion.div variants={itemVariants} className="space-y-2 group">
            <label htmlFor="whatsapp" className="text-xs font-mono text-[#32F08C] uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-3 h-3" /> WhatsApp Number
            </label>
            <div className="relative">
              <input
                id="whatsapp"
                {...register('whatsapp')}
                className="w-full bg-white/5 border border-white/10 px-4 py-4 pl-11 text-white placeholder-white/20 focus:outline-none focus:border-[#32F08C] focus:bg-white/10 focus:ring-1 focus:ring-[#32F08C]/50 transition-all rounded-lg font-mono text-sm"
                placeholder="08123456789"
              />
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#32F08C] transition-colors" />
            </div>
            <AnimatePresence>
              {formErrors.whatsapp && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-red-400 font-mono flex items-center gap-1 mt-1"
                >
                  <span className="text-red-500">!</span> {formErrors.whatsapp.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Background */}
          <motion.div variants={itemVariants} className="space-y-3">
            <label className="text-xs font-mono text-[#32F08C] uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-3 h-3" /> Background
            </label>
            <div className="grid grid-cols-2 gap-4">
              {['IT', 'Non-IT'].map((val) => (
                <label key={val} className="cursor-pointer group relative">
                  <input
                    type="radio"
                    value={val}
                    {...register('background')}
                    className="peer sr-only"
                  />
                  <div className="flex flex-col items-center justify-center px-4 py-6 border border-white/10 bg-white/5 text-gray-400 peer-checked:bg-[#32F08C]/10 peer-checked:text-[#32F08C] peer-checked:border-[#32F08C] transition-all hover:border-white/30 hover:bg-white/10 rounded-lg group-hover:scale-[1.02]">
                    {val === 'IT' ? <Code2 className="w-6 h-6 mb-2 opacity-50 peer-checked:opacity-100 transition-opacity" /> : <User className="w-6 h-6 mb-2 opacity-50 peer-checked:opacity-100 transition-opacity" />}
                    <span className="font-mono text-sm font-semibold">{val === 'IT' ? 'IT / Tech' : 'Non-IT'}</span>
                  </div>
                  {/* Checkmark */}
                  <div className="absolute top-3 right-3 opacity-0 peer-checked:opacity-100 text-[#32F08C] transition-all transform scale-50 peer-checked:scale-100">
                    <div className="bg-[#32F08C]/20 p-1 rounded-full">
                        <Check className="w-3 h-3" />
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </motion.div>

          {/* IT Role (Conditional) */}
          <AnimatePresence>
            {background === 'IT' && (
              <motion.div 
                initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-2 group"
              >
                <label htmlFor="itRole" className="text-xs font-mono text-[#32F08C] uppercase tracking-wider flex items-center gap-2 pt-2">
                  <Terminal className="w-3 h-3" /> IT Role
                </label>
                <div className="relative">
                  <input
                    id="itRole"
                    {...register('itRole')}
                    className="w-full bg-white/5 border border-white/10 px-4 py-4 pl-11 text-white placeholder-white/20 focus:outline-none focus:border-[#32F08C] focus:bg-white/10 focus:ring-1 focus:ring-[#32F08C]/50 transition-all rounded-lg font-mono text-sm"
                    placeholder="E.G. FRONTEND, BACKEND, FULLSTACK"
                  />
                  <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#32F08C] transition-colors" />
                </div>
                {formErrors.itRole && (
                  <p className="text-xs text-red-400 font-mono flex items-center gap-1 mt-1">
                    <span className="text-red-500">!</span> {formErrors.itRole.message}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Used TRAE */}
          <motion.div variants={itemVariants} className="space-y-3">
            <label className="text-xs font-mono text-[#32F08C] uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-3 h-3" /> Have you used TRAE before?
            </label>
            <div className="grid grid-cols-2 gap-4">
               {['YES', 'NO'].map((val) => (
                <label key={val} className="cursor-pointer group relative">
                  <input
                    type="radio"
                    value={val}
                    {...register('usedTrae')}
                    className="peer sr-only"
                  />
                  <div className="flex items-center justify-center px-4 py-4 border border-white/10 bg-white/5 text-gray-400 peer-checked:bg-[#32F08C]/10 peer-checked:text-[#32F08C] peer-checked:border-[#32F08C] transition-all hover:border-white/30 hover:bg-white/10 rounded-lg group-hover:scale-[1.02]">
                    <span className="font-mono text-sm font-semibold">{val === 'YES' ? 'Yes' : 'No'}</span>
                  </div>
                  {/* Checkmark */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-4 opacity-0 peer-checked:opacity-100 text-[#32F08C] transition-all transform scale-50 peer-checked:scale-100">
                    <Check className="w-4 h-4" />
                  </div>
                </label>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.button
          variants={itemVariants}
          type="submit"
          disabled={isPending}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#32F08C] hover:bg-[#2bd97c] text-black font-bold py-5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 rounded-lg uppercase tracking-widest text-lg group relative overflow-hidden font-mono shadow-[0_0_20px_rgba(50,240,140,0.3)] hover:shadow-[0_0_30px_rgba(50,240,140,0.5)]"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out skew-y-12"></div>
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin relative z-10" />
              <span className="relative z-10">Processing...</span>
            </>
          ) : (
            <>
              <span className="relative z-10">Get Redeem Code</span>
              <Terminal className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </motion.button>
      </motion.form>
    </>
  );
}
