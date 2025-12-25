"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const navItems = [
    { id: 'home', label: 'خانه', href: '/' },
    { id: 'projects', label: 'پویش ها', href: '/all-projects' },
    { id: 'about', label: 'درباره ما', href: '/about' },
    { id: 'transparency', label: 'شفافیت مالی', href: '/transparency' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/25 backdrop-blur-md shadow-md py-3' : 'bg-white py-4'}`}
      >
        <div className="container mx-auto px-8 lg:px-15">
          <div className="flex items-center justify-between">
            {/* لوگو */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center shadow-md overflow-hidden bg-white">
                  {!logoError ? (
                    <Image
                      src="/images/logo/logo.png"
                      alt="لوگوی مؤسسه خیریه آرام‌دلها"
                      width={90}
                      height={90}
                      className="object-contain p-0.1"
                      priority
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500 to-amber-500">
                      <i className="fas fa-hands-helping text-white text-2xl"></i>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <h1 className="text-lg font-bold text-gray-900"> مؤسسه خیریه آرام‌دلها</h1>
                  <p className="text-emerald-600 text-xs"> یاران مهدی موعود (عج) </p>
                </div>
              </Link>
            </div>

            {/* منوی دسکتاپ */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* دکمه منوی موبایل */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-all duration-300"
              aria-label="منو"
            >
              <div className="relative w-5 h-5">
                <span className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
                <span className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* منوی موبایل */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white transform transition-all duration-300 ease-out shadow-xl lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-white shadow-sm">
                {!logoError ? (
                  <Image
                    src="/images/logo/logo.png"
                    alt="لوگوی مؤسسه خیریه آرام‌دلها"
                    width={40}
                    height={40}
                    className="object-contain p-1"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500 to-amber-500">
                    <i className="fas fa-hands-helping text-white"></i>
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-bold text-gray-900">  آرام‌دلها</h2>
                <p className="text-xs text-emerald-600">مؤسسه خیریه مردم نهاد</p>
              </div>
            </div>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-all duration-300"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="fas fa-chevron-left text-xs text-gray-400"></i>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      
      {/* overlay برای منوی موبایل */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}