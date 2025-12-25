// components/LuxHero.tsx
"use client";

import { useEffect, useState } from 'react';
import StatsCounter from './StatsCounter';
import Link from 'next/link';

export default function LuxHero() {
  const [animatedText, setAnimatedText] = useState('');
  const texts = ['محرومان', 'نیازمندان', 'یتیمان', 'درماندگان'];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex <= currentText.length) {
        setAnimatedText(currentText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }, 1500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentTextIndex]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-amber-900 py-20 lg:py-24">
      {/* افکت‌های مینیمال */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-amber-500/5 to-transparent blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-56 h-56 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-emerald-500/5 to-transparent blur-2xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* بخش متن */}
            <div className="text-center lg:text-right space-y-6">
              
              {/* لوگو */}
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-lg flex items-center justify-center shadow-md">
                  <i className="fas fa-hands-helping text-white text-base lg:text-lg"></i>
                </div>
                <div className="text-right">
                  <h1 className="text-xl lg:text-2xl font-bold text-white">آرام دلها </h1>
                  <p className="text-amber-300 text-xs lg:text-sm">یاران مهدی موعود (عج)</p>
                </div>
              </div>

              {/* عنوان اصلی */}
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  <span className="block mb-2">به یاری</span>
                  <div className="relative inline-block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-white">
                      {animatedText}
                    </span>
                    <span className="inline-block w-0.5 h-8 bg-amber-400 mr-1 animate-pulse"></span>
                  </div>
                  <span className="block mt-2">می‌آییم</span>
                </h2>

                <p className="text-base lg:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  مؤسسه خیریه ثبت‌شده با پروانه سازمان بهزیستی
                  <br />
                  شماره پروانه: ۲۳۵۶/۱۴۰/۷۸
                </p>
              </div>

              {/* آمارهای کلیدی */}
              <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto lg:mx-0">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="text-lg lg:text-xl font-bold text-white mb-1">
                    <StatsCounter end={49.4} duration={1000} />
                  </div>
                  <div className="text-xs text-slate-300">میلیارد ریال</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="text-lg lg:text-xl font-bold text-white mb-1">
                    <StatsCounter end={254} duration={2000} delay={300} />
                  </div>
                  <div className="text-xs text-slate-300">پروژه اجرا شده</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="text-lg lg:text-xl font-bold text-white mb-1">
                    <StatsCounter end={318} duration={2000} delay={600} />
                  </div>
                  <div className="text-xs text-slate-300">نیکوکار</div>
                </div>
              </div>

              {/* دکمه‌های اقدام */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-3">
                <Link 
                  href="/all-projects"
                  className="group relative px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm"
                >
                  <span className="relative flex items-center justify-center gap-2">
                    <i className="fas fa-file-invoice text-sm"></i>
                    پویش های ما
                  </span>
                </Link>

                <Link 
                  href="/about"
                  className="group px-6 py-3 bg-transparent text-white font-medium rounded-lg border border-white/30 hover:border-amber-400 hover:bg-white/5 transition-all duration-300 text-sm"
                >
                  <span className="flex items-center justify-center gap-2">
                    <i className="fas fa-certificate"></i>
                    درباره ما
                  </span>
                </Link>
              </div>
            </div>

            {/* بخش گرافیکی */}
            <div className="relative">
              <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-md">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-medium mb-3">
                    <i className="fas fa-certificate text-xs"></i>
                    پروانه ۲۳۵۶/۱۴۰/۷۸
                  </div>
                  <h3 className="text-lg font-bold text-white">آدرس مؤسسه</h3>
                  <p className="text-slate-300 text-sm mt-1">  بلوار امام رضا (ع)  مجتمع تجاری فردوس ، طبقه منفی یک    </p>
                </div>

                {/* اطلاعات تماس */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500/20 to-emerald-500/20 rounded flex items-center justify-center">
                      <i className="fas fa-map-marker-alt text-amber-300 text-sm"></i>
                    </div>
                    <div className="text-right flex-1">
                      <div className="text-xs text-slate-300">آدرس دقیق</div>
                      <div className="text-white text-xs">بلوار امام رضا (ع) ، مجتمع تجاری فردوس ، طبقه منفی یک ، واحد ۸۶ </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-white/5 rounded-lg">
                      <div className="text-base font-bold text-amber-300">۵ سال</div>
                      <div className="text-xs text-slate-300">اعتبار پروانه</div>
                    </div>
                    <div className="text-center p-2 bg-white/5 rounded-lg">
                      <div className="text-base font-bold text-emerald-300">۲۷۸۸</div>
                      <div className="text-xs text-slate-300">شماره ثبت</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}