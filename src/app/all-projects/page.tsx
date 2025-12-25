"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getProjectsByPage, getProjectStats, PROJECTS_PER_PAGE } from '@/data/projects';
import ProjectFilters from '@/components/ProjectFilters';
import Pagination from '@/components/Pagination';
import ProjectCard from '@/components/ProjectCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// کامپوننت داخلی که از useSearchParams استفاده می‌کند
function AllProjectsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stats = getProjectStats();

  // دریافت پارامترهای URL
  const pageFromUrl = parseInt(searchParams.get('page') || '1');
  const categoryFromUrl = searchParams.get('category') || 'همه';
  const yearFromUrl = searchParams.get('year') || 'همه';
  const locationFromUrl = searchParams.get('location') || 'همه';
  const searchFromUrl = searchParams.get('search') || '';

  // استیت‌ها
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [filters, setFilters] = useState({
    category: categoryFromUrl,
    year: yearFromUrl,
    location: locationFromUrl,
    search: searchFromUrl
  });

  // محاسبه پروژه‌ها
  const { projects, pagination } = getProjectsByPage(currentPage, {
    category: filters.category !== 'همه' ? filters.category : undefined,
    year: filters.year !== 'همه' ? parseInt(filters.year) : undefined,
    location: filters.location !== 'همه' ? filters.location : undefined,
    search: filters.search
  });

  // به‌روزرسانی URL هنگام تغییر فیلترها
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (currentPage > 1) params.set('page', currentPage.toString());
    if (filters.category !== 'همه') params.set('category', filters.category);
    if (filters.year !== 'همه') params.set('year', filters.year);
    if (filters.location !== 'همه') params.set('location', filters.location);
    if (filters.search) params.set('search', filters.search);
    
    router.push(`/all-projects${params.toString() ? `?${params.toString()}` : ''}`);
  }, [currentPage, filters, router]);

  // ریست فیلترها
  const handleReset = () => {
    setFilters({
      category: 'همه',
      year: 'همه',
      location: 'همه',
      search: ''
    });
    setCurrentPage(1);
  };

  // تغییر صفحه
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      {/* هیرو */}
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900">
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
            
            <div className="text-center text-amber-300 text-sm">
              <i className="fas fa-calendar-alt ml-2"></i>
              آخرین به‌روزرسانی: امروز
            </div>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              همه پویشهای تکمیل شده
            </h1>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              گزارش کامل {stats.totalProjects.toLocaleString('fa-IR')} پروژه اجرا شده در ۵ سال گذشته
            </p>
            
            {/* آمار سریع */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white mb-1">
                  {typeof stats.totalProjects === 'number' 
                    ? stats.totalProjects.toLocaleString('fa-IR') 
                    : stats.totalProjects}
                </div>
                <div className="text-white/80 text-sm">پروژه موفق</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white mb-1">
                  {typeof stats.totalAmount === 'number' 
                    ? stats.totalAmount.toLocaleString('fa-IR') 
                    : stats.totalAmount}
                </div>
                <div className="text-white/80 text-sm">میلیون ریال</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white mb-1">
                  {typeof stats.totalBeneficiaries === 'number' 
                    ? stats.totalBeneficiaries.toLocaleString('fa-IR') 
                    : stats.totalBeneficiaries}
                </div>
                <div className="text-white/80 text-sm">بهره‌بردار</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white mb-1">{stats.categories.length}</div>
                <div className="text-white/80 text-sm">دسته‌بندی</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* محتوا */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* فیلترها */}
          <ProjectFilters 
            filters={filters}
            onFilterChange={setFilters}
            onReset={handleReset}
          />

          {/* لیست پروژه‌ها */}
          {projects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {/* پاگینیشن */}
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalProjects={pagination.totalProjects}
                projectsPerPage={pagination.projectsPerPage}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            // حالت عدم وجود پروژه
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-search text-3xl text-slate-400"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">پویش یافت نشد</h3>
              <p className="text-slate-600 mb-6">با فیلترهای فعلی هیچ پویش ای مطابقت ندارد.</p>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                مشاهده همه پویش ها
              </button>
            </div>
          )}
        </div>
      </section>

      {/* اطلاعات پایانی */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">درباره پویش ها</h3>
              <p className="text-slate-600 max-w-3xl mx-auto">
                تمامی پویش های این صفحه با دقت بالا شناسایی، اعتبارسنجی و اجرا شده‌اند. 
                گزارش کامل هر پروژه شامل عکس‌ها، مستندات و نحوه هزینه‌کرد در دسترس نیکوکاران قرار دارد.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shield-alt text-2xl text-emerald-600"></i>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">شفافیت ۱۰۰٪</h4>
                <p className="text-slate-600 text-sm">گزارش مالی کامل برای هر پروژه</p>
              </div>
              
              <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check-circle text-2xl text-blue-600"></i>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">اعتبارسنجی شده</h4>
                <p className="text-slate-600 text-sm">بررسی نیازمندی واقعی افراد</p>
              </div>
              
              <div className="text-center p-6 bg-amber-50 rounded-xl border border-amber-100">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-camera text-2xl text-amber-600"></i>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">مستندسازی</h4>
                <p className="text-slate-600 text-sm">عکس و فیلم از مراحل اجرا</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// کامپوننت اصلی با Suspense
export default function AllProjectsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">در حال بارگذاری...</p>
        </div>
      </div>
    }>
      <AllProjectsContent />
    </Suspense>
  );
}