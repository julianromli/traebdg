import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: <Twitter className="w-5 h-5" /> },
    { name: 'Instagram', href: '#', icon: <Instagram className="w-5 h-5" /> },
    { name: 'LinkedIn', href: '#', icon: <Linkedin className="w-5 h-5" /> },
    { name: 'GitHub', href: '#', icon: <Github className="w-5 h-5" /> },
  ];

  return (
    <footer className="bg-black text-white py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 text-3xl font-semibold tracking-tighter uppercase">
              <Image src="/trae-color.svg" alt="TRAE" width={40} height={40} />
              <span className="text-white">BDG</span>
            </Link>
            <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
              The responsive coding agent that ships at full speed. 
              Join the revolution of AI-driven software development.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href} 
                  className="text-gray-500 hover:text-[#32F08C] transition-colors p-2 border border-white/10 hover:border-[#32F08C] bg-black"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-6">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-500">Product</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="text-white hover:text-[#32F08C] transition-colors">Download</Link></li>
              <li><Link href="#" className="text-white hover:text-[#32F08C] transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-white hover:text-[#32F08C] transition-colors">Changelog</Link></li>
              <li><Link href="#" className="text-white hover:text-[#32F08C] transition-colors">Docs</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-500">Company</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="text-white hover:text-[#32F08C] transition-colors">About</Link></li>
              <li><Link href="#" className="text-white hover:text-[#32F08C] transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-white hover:text-[#32F08C] transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-white hover:text-[#32F08C] transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-wider">
          <p>&copy; {currentYear} TraeBDG. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
