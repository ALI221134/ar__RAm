"use client";

import { getSponsors } from '@/data/sponsors';
import SponsorsGrid from '@/components/SponsorsGrid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function SponsorsPage() {
  const sponsors = getSponsors();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      {/* هیرو حامیان */}
      <section className="relative py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/"
              className="flex items-center gap-2 text-white hover:text-amber-300 transition-colors group"
            >
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <i className="fas fa-arrow-right"></i>
              </div>
              بازگشت به صفحه اصلی
            </Link>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              حامیان مؤسسه
            </h1>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              مؤسسه خیریه آرام دلها با حمایت این عزیزان توانسته است 
              در طول ۵ سال فعالیت، ۲۵۴ پروژه خیریه را به انجام برساند.
            </p>
          </div>
        </div>
      </section>
      
      {/* محتوای حامیان */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <SponsorsGrid sponsors={sponsors} />
          
          {/* دعوت به همکاری */}
          <div className="mt-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">می‌خواهید حامی ما شوید؟</h3>
              <p className="text-white/90 mb-6">
                با همکاری شما می‌توانیم پروژه‌های بیشتری را اجرا کرده 
                و به نیازمندان بیشتری کمک کنیم.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact"
                  className="px-6 py-3 bg-white text-emerald-700 font-medium rounded-lg hover:bg-slate-100 transition-colors"
                >
                  تماس با ما
                </Link>
                <Link 
                  href="/about"
                  className="px-6 py-3 bg-transparent text-white font-medium rounded-lg border border-white hover:bg-white/10 transition-colors"
                >
                  درباره مؤسسه
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}