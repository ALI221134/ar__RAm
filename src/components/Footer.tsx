"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText('9338905519')
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('خطا در کپی کردن: ', err);
      });
  };

  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center">
          {/* لوگو */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-lg flex items-center justify-center">
              <i className="fas fa-hands-helping text-white text-lg"></i>
            </div>
            <div className="text-right">
              <h3 className="text-lg font-bold">مؤسسه خیریه مردم نهاد آرام‌دلها</h3>
              <p className="text-amber-300 text-sm">یاران مهدی موعود (عج)</p>
            </div>
          </div>

          {/* اطلاعات تماس */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
              <div className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-emerald-400"></i>
                <span>بلوار امام رضا (ع) ، مجتمع تجاری فردوس ، طبقه منفی یک ، واحد ۸۶</span>
              </div>
              
              {/* بخش پیام‌رسان ایتا */}
              <div className="relative">
                <div className="flex items-center gap-2">
                  {/* لوگوی ایتا */}
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Image
                      src="/images/logo/eita-logo.png" // مسیر لوگوی ایتا
                      alt="پیام‌رسان ایتا"
                      width={20}
                      height={20}
                      className="object-contain"
                      onError={(e) => {
                        // fallback اگر تصویر لود نشد
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<i class="fas fa-comment text-emerald-400"></i>';
                        }
                      }}
                    />
                  </div>
                  
                  <button
                    onClick={copyToClipboard}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    <span>۰۹۳۳۸۹۰۵۵۱۹</span>
                    {copied && (
                      <span className="absolute right-0 -top-8 bg-green-100 text-green-800 text-xs py-1 px-2 rounded shadow whitespace-nowrap">
                        کپی شد!
                      </span>
                    )}
                  </button>
                </div>
                
                {/* راهنمای کپی */}
                <div className="text-xs text-slate-400 mt-1 hidden sm:block">
                 در پیام رسان ایتا با ما در ارتباط باشید
                </div>
              </div>
            </div>
          </div>

          {/* کپی‌رایت */}
          <div className="border-t border-slate-800 pt-6">
            <div className="flex flex-col items-center gap-2">
              <p className="text-slate-400 text-sm">
                © {currentYear} مؤسسه خیریه آرام‌دلها. تمامی حقوق محفوظ است.
              </p>
              
              {/* لینک portfolio با طراحی زیبا */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-slate-500 text-xs">طراحی و توسعه توسط</span>
                <a 
                  href="https://a-yazdi.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer nofollow"
                  className="group inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-all duration-300"
                  title="مشاهده پورتفولیو علیرضا یزدی"
                >
                  <span className="text-xs font-medium bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent group-hover:from-emerald-400 group-hover:to-emerald-300">
                    Alireza Yazdi
                  </span>
                  <svg 
                    className="w-3 h-3 text-emerald-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
              
              {/* متن کوچک زیر لینک */}
              <p className="text-slate-600 text-[10px] mt-1">
                Frontend Developer & UI/UX Designer
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}