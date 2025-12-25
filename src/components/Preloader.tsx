"use client";
// پویش ها
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // شبیه‌سازی پیشرفت بارگذاری
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // همچنین اگر صفحه کامل بارگذاری شد
    const handleLoad = () => {
      setProgress(100);
      setTimeout(() => setIsVisible(false), 500);
    };

    window.addEventListener('load', handleLoad);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      id="preloader" 
      className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center transition-opacity duration-500"
      style={{ opacity: progress >= 100 ? 0 : 1 }}
    >
      {/* آیکون قلب تپنده */}
      <div className="text-6xl text-primary-500 mb-8 animate-heartbeat">
        <i className="fas fa-heart"></i>
      </div>
      
      {/* متن */}
      <div className="text-gray-600 text-lg mb-8 font-medium">
        <span className="inline-block animate-pulse">
          بارگذاری مهربانی
          <span className="inline-block animate-bounce">.</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
        </span>
      </div>
      
      {/* نوار پیشرفت */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* درصد */}
      <div className="text-gray-500 text-sm mt-3 font-mono">
        {progress}%
      </div>
      
      {/* شعار */}
      <div className="absolute bottom-8 text-center text-gray-400 text-sm">
        <p>بنیاد مهر | مهربانی هوشمند، تغییر واقعی</p>
      </div>
    </div>
  );
}