"use client";

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import ProjectModal from './ProjectModal';
import { Project } from '@/types/project';

const projects: Project[] = [
  {
    id: 1,
    title: 'توزیع بسته‌های معیشتی زمستانه',
    description: 'توزیع ۵۰۰ بسته معیشتی شامل برنج، روغن، قند و چای بین خانواده‌های نیازمند در مناطق محروم قم',
    category: 'معیشت',
    completedDate: '۱۴۰۲/۰۹/۱۵',
    totalHelp: 1272,
    beneficiaries: 500,
    location: 'قم',
    icon: 'fas fa-shopping-basket',
    color: 'bg-emerald-500',
    gradient: 'from-emerald-500 to-emerald-600',
    hasGallery: true
  },
  // ... بقیه پروژه‌ها
];

export default function ProjectsSlider() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectImages, setProjectImages] = useState<{[key: number]: {hasImage: boolean, imageUrl: string}}>({});

  // تابع چک کردن وجود تصویر
  const checkImageExists = (imageUrl: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
      setTimeout(() => resolve(false), 2000);
    });
  };

  // بررسی تصاویر برای هر پروژه
  useEffect(() => {
    const loadProjectImages = async () => {
      const images: {[key: number]: {hasImage: boolean, imageUrl: string}} = {};
      
      for (const project of projects) {
        const imageSources = [
          `/images/projects/${project.id}/1.jpg`,
          `/images/projects/${project.id}/main.jpg`,
          `/images/projects/${project.id}.jpg`,
        ];
        
        let hasImage = false;
        let imageUrl = '';
        
        for (const source of imageSources) {
          try {
            const exists = await checkImageExists(source);
            if (exists) {
              hasImage = true;
              imageUrl = source;
              break;
            }
          } catch (error) {
            continue;
          }
        }
        
        images[project.id] = { hasImage, imageUrl };
      }
      
      setProjectImages(images);
    };
    
    loadProjectImages();
  }, []);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <section id="projects" className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">آخرین پویش های تکمیل شده</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            گزارش 5 پویش آخر  
            </p>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination',
                type: 'bullets',
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="projects-swiper"
            >
              {projects.map((project) => {
                const projectImage = projectImages[project.id] || { hasImage: false, imageUrl: '' };
                
                return (
                  <SwiperSlide key={project.id}>
                    <div className="h-full">
                      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col group">
                        {/* هدر کارت */}
                        <div className={`relative h-32 rounded-t-2xl bg-gradient-to-r ${project.gradient} overflow-hidden`}>
                          {/* اگر عکس دارد، نمایش عکس */}
                          {projectImage.hasImage ? (
                            <>
                              <img 
                                src={projectImage.imageUrl} 
                                alt={project.title}
                                className="w-full h-full object-cover opacity-80"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                            </>
                          ) : null}
                          
                          <div className="absolute top-4 right-4 z-10">
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                              {project.category}
                            </span>
                          </div>
                          <div className="absolute -bottom-6 right-6 z-10">
                            <div className={`w-14 h-14 rounded-xl ${project.color} flex items-center justify-center text-white shadow-2xl border-4 border-white group-hover:scale-110 transition-transform duration-300`}>
                              <i className={`${project.icon} text-xl`}></i>
                            </div>
                          </div>
                        </div>

                        {/* بقیه کد بدون تغییر */}
                        <div className="p-6 pt-10 flex-1 flex flex-col">
                          {/* عنوان و تاریخ */}
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{project.title}</h3>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-slate-500">
                                <i className="fas fa-calendar-alt ml-1"></i>
                                {project.completedDate}
                              </div>
                              <div className="text-sm text-slate-500">
                                <i className="fas fa-map-marker-alt ml-1"></i>
                                {project.location}
                              </div>
                            </div>
                          </div>

                          {/* توضیحات */}
                          <p className="text-slate-700 leading-relaxed mb-6 flex-1 line-clamp-3">
                            {project.description}
                          </p>

                          {/* آمار پروژه */}
                          <div className="mt-auto">
                            <div className="grid grid-cols-3 gap-3">
                              <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-100">
                                <div className="text-xl font-bold text-emerald-700">{project.totalHelp.toLocaleString('fa-IR')}</div>
                                <div className="text-xs text-slate-500">میلیون</div>
                              </div>
                              <div className="text-center p-3 bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-100">
                                <div className="text-xl font-bold text-amber-700">
                                  {project.beneficiaries.toLocaleString('fa-IR')}
                                </div>
                                <div className="text-xs text-slate-500">نفر</div>
                              </div>
                              <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
                                <div className="text-sm font-bold text-blue-700">{projectImage.hasImage ? 'دارد' : 'ندارد'}</div>
                                <div className="text-xs text-slate-500">تصویر</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* فوتر کارت */}
                        <div className="px-6 py-4 border-t border-slate-100">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500">
                              <i className="fas fa-check-circle text-emerald-500 ml-1"></i>
                              تکمیل شده
                            </span>
                            <button 
                              onClick={() => openModal(project)}
                              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors flex items-center gap-1 group/btn"
                            >
                              جزئیات بیشتر
                              <i className="fas fa-arrow-left text-xs group-hover/btn:-translate-x-1 transition-transform"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* دکمه‌های ناوبری سفارشی */}
            <div className="swiper-button-prev !w-12 !h-12 !bg-white !text-slate-700 !rounded-full !shadow-xl !border !border-slate-200 hover:!bg-emerald-500 hover:!text-white hover:!border-emerald-500 transition-all duration-300">
              <i className="fas fa-chevron-right"></i>
            </div>
            <div className="swiper-button-next !w-12 !h-12 !bg-white !text-slate-700 !rounded-full !shadow-xl !border !border-slate-200 hover:!bg-emerald-500 hover:!text-white hover:!border-emerald-500 transition-all duration-300">
              <i className="fas fa-chevron-left"></i>
            </div>

            {/* Pagination */}
            <div className="swiper-pagination !relative !mt-10 !bottom-0"></div>
          </div>

          {/* دکمه مشاهده همه */}
          <div className="text-center mt-14">
            <a 
              href="/all-projects"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-500 shadow-xl hover:shadow-2xl text-base relative overflow-hidden"
            >
              <span className="relative z-10">
                <i className="fas fa-list text-lg ml-2"></i>
                مشاهده همه ۲۵۴ پروژه
              </span>
              <i className="fas fa-arrow-left text-sm group-hover:translate-x-1 transition-transform relative z-10"></i>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>
          </div>
        </div>
      </section>

      {/* Modal نمایش جزئیات */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
          hasImage={projectImages[selectedProject.id]?.hasImage || false}
          imageUrl={projectImages[selectedProject.id]?.imageUrl || ''}
        />
      )}
    </>
  );
}