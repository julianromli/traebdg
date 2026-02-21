import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import RedeemForm from '@/components/RedeemForm';
import Guide from '@/components/Guide';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#32F08C] selection:text-black font-sans">
      <Navbar />
      
      <div className="flex flex-col">
        <Hero />
        
        <section id="redeem" className="py-24 px-4 relative w-full bg-black">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-50 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-[#32F08C]/5 blur-[100px] rounded-full pointer-events-none" />
          
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
