import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import RedeemForm from '@/components/RedeemForm';
import Guide from '@/components/Guide';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <Navbar />
      
      <div className="flex flex-col">
        <Hero />
        
        <section id="redeem" className="py-24 md:py-32 px-4 relative w-full bg-black border-t border-white/10">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <RedeemForm />
          </div>
        </section>

        <Guide />
      </div>

      <Footer />
    </main>
  );
}
