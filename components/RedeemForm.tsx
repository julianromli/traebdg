'use client';

import { useActionState, useEffect, useState, startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { redeemSchema, RedeemFormValues } from '@/lib/validations';
import { redeemCode } from '@/app/actions';
import RedeemModal from './RedeemModal';
import { Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming this exists or I should use clsx/tailwind-merge directly if not.
// Checking package.json, clsx and tailwind-merge are installed. 
// I'll check if lib/utils.ts exists.

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
    // This is the correct way to wrap RHF with server actions that need FormData
    // We prevent default first
    evt.preventDefault();
    
    // We call handleSubmit, which runs validation
    // If valid, it runs our callback. 
    // BUT we need the original event target (the form) to create FormData reliably
    // because data object might miss unchecked checkboxes or file inputs not managed by RHF
    const form = evt.currentTarget;
    
    handleSubmit(async (data) => {
      // Validation passed
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
        className="space-y-6 bg-[#111] p-8 rounded-2xl border border-white/10 shadow-xl max-w-xl mx-auto"
      >
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Dapatkan Kode Redeem</h2>
          <p className="text-gray-400 text-sm">Isi formulir di bawah ini untuk mendapatkan akses premium.</p>
        </div>

        {/* Global Error Message */}
        {!state.success && state.message && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{state.message}</p>
          </div>
        )}

        <div className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium text-gray-300">
              Nama Lengkap
            </label>
            <input
              id="fullName"
              {...register('fullName')}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#32F08C] focus:ring-1 focus:ring-[#32F08C] transition-colors"
              placeholder="Masukkan nama lengkap Anda"
            />
            {formErrors.fullName && (
              <p className="text-xs text-red-400">{formErrors.fullName.message}</p>
            )}
            {state.errors?.fullName && (
              <p className="text-xs text-red-400">{state.errors.fullName[0]}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#32F08C] focus:ring-1 focus:ring-[#32F08C] transition-colors"
              placeholder="nama@email.com"
            />
            {formErrors.email && (
              <p className="text-xs text-red-400">{formErrors.email.message}</p>
            )}
            {state.errors?.email && (
              <p className="text-xs text-red-400">{state.errors.email[0]}</p>
            )}
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <label htmlFor="whatsapp" className="text-sm font-medium text-gray-300">
              Nomor WhatsApp
            </label>
            <input
              id="whatsapp"
              {...register('whatsapp')}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#32F08C] focus:ring-1 focus:ring-[#32F08C] transition-colors"
              placeholder="08123456789"
            />
            {formErrors.whatsapp && (
              <p className="text-xs text-red-400">{formErrors.whatsapp.message}</p>
            )}
            {state.errors?.whatsapp && (
              <p className="text-xs text-red-400">{state.errors.whatsapp[0]}</p>
            )}
          </div>

          {/* Background */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Latar Belakang
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="IT"
                  {...register('background')}
                  className="peer sr-only"
                />
                <div className="flex items-center justify-center px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-gray-400 peer-checked:bg-[#32F08C]/10 peer-checked:border-[#32F08C] peer-checked:text-[#32F08C] transition-all hover:bg-white/5">
                  IT / Tech
                </div>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="Non-IT"
                  {...register('background')}
                  className="peer sr-only"
                />
                <div className="flex items-center justify-center px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-gray-400 peer-checked:bg-[#32F08C]/10 peer-checked:border-[#32F08C] peer-checked:text-[#32F08C] transition-all hover:bg-white/5">
                  Non-IT
                </div>
              </label>
            </div>
            {formErrors.background && (
              <p className="text-xs text-red-400">{formErrors.background.message}</p>
            )}
          </div>

          {/* IT Role (Conditional) */}
          {background === 'IT' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <label htmlFor="itRole" className="text-sm font-medium text-gray-300">
                Role IT
              </label>
              <input
                id="itRole"
                {...register('itRole')}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#32F08C] focus:ring-1 focus:ring-[#32F08C] transition-colors"
                placeholder="Contoh: Frontend Dev, Backend Dev, UI/UX"
              />
              {formErrors.itRole && (
                <p className="text-xs text-red-400">{formErrors.itRole.message}</p>
              )}
              {state.errors?.itRole && (
                <p className="text-xs text-red-400">{state.errors.itRole[0]}</p>
              )}
            </div>
          )}

          {/* Used TRAE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Sudah pernah menggunakan TRAE?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="YES"
                  {...register('usedTrae')}
                  className="peer sr-only"
                />
                <div className="flex items-center justify-center px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-gray-400 peer-checked:bg-[#32F08C]/10 peer-checked:border-[#32F08C] peer-checked:text-[#32F08C] transition-all hover:bg-white/5">
                  Ya
                </div>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="NO"
                  {...register('usedTrae')}
                  className="peer sr-only"
                />
                <div className="flex items-center justify-center px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-gray-400 peer-checked:bg-[#32F08C]/10 peer-checked:border-[#32F08C] peer-checked:text-[#32F08C] transition-all hover:bg-white/5">
                  Tidak
                </div>
              </label>
            </div>
            {formErrors.usedTrae && (
              <p className="text-xs text-red-400">{formErrors.usedTrae.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#32F08C] hover:bg-[#2bd97c] text-black font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#32F08C]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Memproses...
            </>
          ) : (
            'Dapatkan Kode Redeem'
          )}
        </button>
      </form>
    </>
  );
}
