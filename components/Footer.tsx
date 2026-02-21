import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: <Twitter className="w-5 h-5" /> },
    { name: 'Instagram', href: '#', icon: <Instagram className="w-5 h-5" /> },
    { name: 'LinkedIn', href: '#', icon: <Linkedin className="w-5 h-5" /> },
    { name: 'GitHub', href: '#', icon: <Github className="w-5 h-5" /> },
  ];

  return (
    <footer className="bg-black text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter mb-4 inline-block">
              Trae<span className="text-[#32F08C]">BDG</span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6">
              Platform redeem code terbaik untuk komunitas Bandung. 
              Dapatkan akses eksklusif dan fitur premium dengan mudah.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href} 
                  className="text-gray-500 hover:text-[#32F08C] transition-colors p-2 bg-white/5 rounded-full"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Navigasi</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="#guide" className="text-gray-400 hover:text-white transition-colors">Panduan</Link></li>
              <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors">Fitur</Link></li>
              <li><Link href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} TraeBDG. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Dibuat dengan ❤️ di Bandung</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
