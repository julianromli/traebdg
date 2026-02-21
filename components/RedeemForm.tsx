'use client';

import { useActionState, useEffect, useState, startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { redeemSchema, RedeemFormValues } from '@/lib/validations';
import { redeemCode } from '@/app/actions';
import RedeemModal from './RedeemModal';
import { Loader2, AlertCircle, Check } from 'lucide-react';

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
  const usedTrae = watch('usedTrae');

  useEffect(() => {
    if (state.success) {
      setShowModal(true);
    }
  }, [state.success]);

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    
    handleSubmit(async (data) => {
      const formData = new FormData(form);
      startTransition(() => {
        dispatch(formData);
      });
    })(evt);
  };

  return (
    <>
      <RedeemModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        code={state.code} 
      />
      
      <form 
        onSubmit={onSubmit}
        className="space-y-8 bg-black p-8 md:p-12 border border-white/10 max-w-2xl mx-auto relative overflow-hidden"
      >
        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#32F08C]/10 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-[#32F08C]"></div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight">Get Your Redeem Code</h2>
          <p className="text-gray-400">Fill out the form below to get premium access.</p>
        </div>

        {/* Global Error Message */}
        {!state.success && state.message && (
          <div className="bg-red-900/20 border border-red-500/50 p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{state.message}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-semibold text-white uppercase tracking-wider">
              Full Name
            </label>
            <input
              id="fullName"
              {...register('fullName')}
              className="w-full bg-transparent border border-white/20 px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#32F08C] focus:ring-1 focus:ring-[#32F08C] transition-all rounded-none"
              placeholder="ENTER YOUR FULL NAME"
            />
            {formErrors.fullName && (
              <p className="text-xs text-red-400 font-mono">{formErrors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-white uppercase tracking-wider">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full bg-transparent border border-white/20 px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#32F08C] focus:ring-1 focus:ring-[#32F08C] transition-all rounded-none"
              placeholder="NAME@EMAIL.COM"
            />
            {formErrors.email && (
              <p className="text-xs text-red-400 font-mono">{formErrors.email.message}</p>
            )}
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <label htmlFor="whatsapp" className="text-sm font-semibold text-white uppercase tracking-wider">
              WhatsApp Number
            </label>
            <input
              id="whatsapp"
              {...register('whatsapp')}
              className="w-full bg-transparent border border-white/20 px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#32F08C] focus:ring-1 focus:ring-[#32F08C] transition-all rounded-none"
              placeholder="08123456789"
            />
            {formErrors.whatsapp && (
              <p className="text-xs text-red-400 font-mono">{formErrors.whatsapp.message}</p>
            )}
          </div>

          {/* Background */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white uppercase tracking-wider">
              Background
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
                  <div className="flex items-center justify-center px-4 py-4 border border-white/20 text-gray-400 peer-checked:bg-[#32F08C] peer-checked:text-black peer-checked:border-[#32F08C] peer-checked:font-semibold transition-all hover:border-white/50 rounded-none">
                    {val === 'IT' ? 'IT / Tech' : 'Non-IT'}
                  </div>
                  {/* Checkmark for selected state */}
                  <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 text-black transition-opacity">
                    <Check className="w-3 h-3" />
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* IT Role (Conditional) */}
          {background === 'IT' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <label htmlFor="itRole" className="text-sm font-semibold text-white uppercase tracking-wider">
                IT Role
              </label>
              <input
                id="itRole"
                {...register('itRole')}
                className="w-full bg-transparent border border-white/20 px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#32F08C] focus:ring-1 focus:ring-[#32F08C] transition-all rounded-none"
                placeholder="E.G. FRONTEND DEV, BACKEND DEV"
              />
              {formErrors.itRole && (
                <p className="text-xs text-red-400 font-mono">{formErrors.itRole.message}</p>
              )}
            </div>
          )}

          {/* Used TRAE */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white uppercase tracking-wider">
              Have you used TRAE before?
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
                  <div className="flex items-center justify-center px-4 py-4 border border-white/20 text-gray-400 peer-checked:bg-[#32F08C] peer-checked:text-black peer-checked:border-[#32F08C] peer-checked:font-semibold transition-all hover:border-white/50 rounded-none">
                    {val === 'YES' ? 'Yes' : 'No'}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#32F08C] hover:bg-[#2bd97c] text-black font-semibold py-5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-none uppercase tracking-widest text-lg group"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            'Get Redeem Code'
          )}
        </button>
      </form>
    </>
  );
}
