// app/page.tsx
import LuxHero from '@/components/LuxHero';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectsSlider from '@/components/ProjectsSlider';
import HowWeWork from '@/components/HowWeWork'; // اضافه شده
// import BlogCard from '@/components/BlogCard'; // اضافه شده
// import { getBlogPosts, getFeaturedPosts } from '@/data/blog-posts'; // اضافه شده
import { getSponsors } from '@/data/sponsors'; // اضافه شده
import SponsorsGrid from '@/components/SponsorsGrid'; // اضافه شده
import Link from 'next/link';

export default function HomePage() {
//  const blogPosts = getBlogPosts();
//  const featuredPosts = getFeaturedPosts();
  const sponsors = getSponsors();
  
  const processSteps = [
    {
      number: 1,
      icon: 'fas fa-search',
      title: 'شناسایی',
      description: 'بررسی میدانی و شناسایی نیازمندان واقعی'
    },
    {
      number: 2,
      icon: 'fas fa-clipboard-check',
      title: 'اعتبارسنجی',
      description: 'تأیید نهایی با بررسی اسناد و مدارک'
    },
    {
      number: 3,
      icon: 'fas fa-hand-holding-heart',
      title: 'توزیع',
      description: 'کمک‌رسانی مستقیم به دست نیازمندان'
    },
    {
      number: 4,
      icon: 'fas fa-chart-line',
      title: 'گزارش‌دهی',
      description: 'گزارش کامل از نحوه هزینه‌کرد'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <LuxHero />
      
      {/* بخش پروژه‌های تکمیل شده */}
     {/* <ProjectsSlider />*/}

      {/* بخش نحوه کار ما */}
      <HowWeWork />
{/*
      {/* بخش وبلاگ 
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">آخرین مقالات وبلاگ</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              گزارش‌های مفصلی از پروژه‌ها و فعالیت‌های مؤسسه
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300"
            >
              <i className="fas fa-newspaper"></i>
              مشاهده همه مقالات
            </Link>
          </div>
        </div>
      </section>
       */}

      {/* بخش حامیان */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">حامیان مؤسسه</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              با همکاری این عزیزان توانسته‌ایم پروژه‌های متعددی را اجرا کنیم
            </p>
          </div>
          
          <SponsorsGrid sponsors={sponsors.slice(0, 6)} />
          
          {/*<div className="text-center mt-8">
            <Link 
              href="/sponsors"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-lg border border-slate-300 hover:border-emerald-400 hover:text-emerald-700 transition-all duration-300"
            >
              <i className="fas fa-handshake"></i>
              مشاهده همه حامیان
            </Link>
          </div>*/}
        </div>
      </section>

      {/* بخش درباره بنیاد */}
      <section id="about" className="py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">درباره مؤسسه</h2>
              <p className="text-slate-600">
                مؤسسه خیریه "آرام دلهای یاران مهدی موعود (عج)" با پروانه رسمی سازمان بهزیستی 
                در خدمت نیازمندان واقعی است.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <i className="fas fa-certificate text-white"></i>
                  </div>
                  <h3 className="font-bold text-slate-900">پروانه رسمی</h3>
                </div>
                <p className="text-slate-700 text-sm">
                  شماره پروانه: ۲۳۵۶/۱۴۰/۷۸
                  <br />
                  سازمان بهزیستی کشور
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                    <i className="fas fa-hand-holding-heart text-white"></i>
                  </div>
                  <h3 className="font-bold text-slate-900">اهداف مؤسسه</h3>
                </div>
                <p className="text-slate-700 text-sm">
                  کمک به نیازمندان واقعی، شفافیت مالی کامل، ایجاد تغییر ماندگار در زندگی افراد
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link 
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 text-sm"
              >
                <i className="fas fa-info-circle"></i>
                اطلاعات بیشتر
              </Link>
            </div>
          </div>
        </div>
      </section>

       

      <Footer />
    </div>
  );
}