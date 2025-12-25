"use client";

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  hasImage: boolean;
  imageUrl: string;
}

// تابع برای چک کردن وجود تصاویر
const checkImageExists = (imageUrl: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = imageUrl;
    setTimeout(() => resolve(false), 2000);
  });
};

// تابع برای گرفتن مسیر عکس‌های پروژه
const getProjectImages = (projectId: number): string[] => {
  const imageNames = [
    `${projectId}_1.jpg`,
    `${projectId}_2.jpg`,
    `${projectId}_3.jpg`,
    `${projectId}_4.jpg`,
    `${projectId}_5.jpg`,
    `${projectId}_6.jpg`,
    `/images/projects/${projectId}/1.jpg`,
    `/images/projects/${projectId}/2.jpg`,
    `/images/projects/${projectId}/3.jpg`,
    `/images/projects/${projectId}/4.jpg`,
    `/images/projects/${projectId}/5.jpg`,
    `/images/projects/${projectId}/6.jpg`,
    `/images/projects/${projectId}/main.jpg`,
    `/images/projects/${projectId}.jpg`,
    `/images/projects/${projectId}/01.jpg`,
  ];
  
  return imageNames;
};

export default function ProjectModal({ 
  project, 
  isOpen, 
  onClose, 
  hasImage: parentHasImage, 
  imageUrl: parentImageUrl 
}: ProjectModalProps) {
  if (!project) return null;

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [hasImages, setHasImages] = useState(false);
  const [galleryExpanded, setGalleryExpanded] = useState(false);

  // چک کردن وجود تصاویر برای گالری
  useEffect(() => {
    const checkImages = async () => {
      if (!project) return;
      
      setIsLoadingImages(true);
      const projectImages = getProjectImages(project.id);
      const checks = await Promise.all(
        projectImages.map(img => checkImageExists(img))
      );
      
      const existing = projectImages.filter((_, index) => checks[index]);
      setExistingImages(existing.slice(0, 6)); // حداکثر 6 تصویر
      setHasImages(existing.length > 0);
      setIsLoadingImages(false);
      
      // اگر فقط یک عکس داریم، گالری را مینیمایز کنیم
      if (existing.length <= 1) {
        setGalleryExpanded(false);
      }
    };

    if (isOpen) {
      checkImages();
    }
  }, [project, isOpen]);

  const handleToggleGallery = () => {
    if (hasImages && existingImages.length > 1) {
      setGalleryExpanded(!galleryExpanded);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-2 md:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-right align-middle shadow-3xl transition-all">
                {/* هدر Modal */}
                <div className="relative">
                  <button
                    onClick={onClose}
                    className="absolute left-4 top-4 md:left-6 md:top-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-700 hover:bg-white hover:shadow-xl transition-all duration-300 shadow-lg border border-slate-200"
                  >
                    <i className="fas fa-times text-lg md:text-xl"></i>
                  </button>

                  {/* هدر رنگی - همیشه نمایش داده می‌شود */}
                  <div className={`h-40 md:h-48 rounded-t-2xl bg-gradient-to-r ${project.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative h-full flex items-center justify-center px-4">
                      <div className="text-center">
                        <div className="inline-block px-3 py-1 md:px-4 md:py-2 bg-white/20 backdrop-blur-sm rounded-full mb-2 md:mb-3">
                          <span className="text-white font-semibold text-sm md:text-base">
                            <i className={`${project.icon} ml-1 md:ml-2`}></i>
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-3xl font-bold text-white">{project.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* محتوای Modal */}
                <div className="p-4 md:p-8">
                  {/* اطلاعات کلی */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                    <div className="bg-slate-50 rounded-xl p-3 md:p-4 text-center">
                      <div className="text-lg md:text-2xl font-bold text-emerald-700 mb-1">
                        {project.totalHelp.toLocaleString('fa-IR')}
                      </div>
                      <div className="text-xs md:text-sm text-slate-600">میلیون ریال کمک مالی</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 md:p-4 text-center">
                      <div className="text-lg md:text-2xl font-bold text-amber-700 mb-1">
                        {project.beneficiaries.toLocaleString('fa-IR')}
                      </div>
                      <div className="text-xs md:text-sm text-slate-600">نفر بهره‌بردار</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 md:p-4 text-center">
                      <div className="text-base md:text-xl font-bold text-blue-700 mb-1">{project.location}</div>
                      <div className="text-xs md:text-sm text-slate-600">مکان اجرا</div>
                    </div>
                  </div>

                  {/* توضیحات اصلی */}
                  <div className="mb-6 md:mb-8">
                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg ${project.color} flex items-center justify-center text-white`}>
                        <i className={project.icon}></i>
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-slate-900">توضیحات پروژه</h4>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-justify text-sm md:text-base">
                      {project.description}
                    </p>
                  </div>

                  {/* بخش تصاویر - فقط اگر تصویری وجود داشته باشد */}
                  {hasImages && existingImages.length > 0 && (
                    <div className="mb-6 md:mb-8">
                      <div 
                        className="flex items-center justify-between mb-3 md:mb-4 cursor-pointer group"
                        onClick={handleToggleGallery}
                      >
                        <h4 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
                          <i className="fas fa-images text-emerald-500"></i>
                          تصاویر پروژه
                          <span className="text-sm font-normal text-slate-500">
                            ({existingImages.length} تصویر)
                          </span>
                        </h4>
                        {existingImages.length > 1 && (
                          <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1">
                            {galleryExpanded ? (
                              <>
                                <span>بستن گالری</span>
                                <i className="fas fa-chevron-up"></i>
                              </>
                            ) : (
                              <>
                                <span>مشاهده گالری</span>
                                <i className="fas fa-chevron-down"></i>
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      {/* حالت مینیمایز: نمایش یک تصویر */}
                      {!galleryExpanded && (
                        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                          <div className="w-full h-48 md:h-64 flex items-center justify-center">
                            <img 
                              src={existingImages[0]} 
                              alt={`تصویر اصلی پروژه ${project.title}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement!.innerHTML = `
                                  <div class="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6">
                                    <div class="w-16 h-16 rounded-2xl ${project.color} flex items-center justify-center text-white mb-4">
                                      <i class="${project.icon} text-2xl"></i>
                                    </div>
                                    <span class="text-sm">تصویر پروژه</span>
                                  </div>
                                `;
                              }}
                            />
                          </div>
                          
                          {/* نمایش تعداد تصاویر اگر بیشتر از یکی باشد */}
                          {existingImages.length > 1 && (
                            <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                              <i className="fas fa-images"></i>
                              <span>{existingImages.length} تصویر</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* حالت گالری کامل */}
                      {galleryExpanded && existingImages.length > 1 && (
                        <>
                          {/* Swiper اصلی */}
                          <div className="mb-3 md:mb-4">
                            <Swiper
                              modules={[Navigation, Pagination, Thumbs, FreeMode]}
                              spaceBetween={10}
                              slidesPerView={1}
                              navigation={{
                                nextEl: '.swiper-button-next-main',
                                prevEl: '.swiper-button-prev-main',
                              }}
                              pagination={{
                                clickable: true,
                                el: '.swiper-pagination-main',
                              }}
                              thumbs={{ swiper: thumbsSwiper }}
                              onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
                              className="rounded-xl overflow-hidden"
                            >
                              {existingImages.map((img, index) => (
                                <SwiperSlide key={index}>
                                  <div className="relative h-48 md:h-64 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl overflow-hidden">
                                    <div className="w-full h-full flex items-center justify-center">
                                      <img 
                                        src={img} 
                                        alt={`تصویر ${index + 1} پروژه ${project.title}`}
                                        className="w-full h-full object-contain bg-white"
                                        onError={(e) => {
                                          const target = e.target as HTMLImageElement;
                                          target.style.display = 'none';
                                          target.parentElement!.innerHTML = `
                                            <div class="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6">
                                              <div class="w-16 h-16 rounded-2xl ${project.color} flex items-center justify-center text-white mb-4">
                                                <i class="${project.icon} text-2xl"></i>
                                              </div>
                                              <span class="text-sm">تصویر پروژه</span>
                                            </div>
                                          `;
                                        }}
                                      />
                                    </div>
                                    
                                    {/* شماره تصویر */}
                                    <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                                      {index + 1} / {existingImages.length}
                                    </div>
                                  </div>
                                </SwiperSlide>
                              ))}
                            </Swiper>

                            {/* ناوبری Swiper */}
                            <div className="swiper-button-prev-main !w-8 !h-8 md:!w-10 md:!h-10 !bg-white/80 !text-slate-700 !rounded-full !shadow-lg !border !border-slate-200 hover:!bg-emerald-500 hover:!text-white hover:!border-emerald-500 transition-all duration-300">
                              <i className="fas fa-chevron-right"></i>
                            </div>
                            <div className="swiper-button-next-main !w-8 !h-8 md:!w-10 md:!h-10 !bg-white/80 !text-slate-700 !rounded-full !shadow-lg !border !border-slate-200 hover:!bg-emerald-500 hover:!text-white hover:!border-emerald-500 transition-all duration-300">
                              <i className="fas fa-chevron-left"></i>
                            </div>

                            {/* Pagination */}
                            <div className="swiper-pagination-main !relative !mt-3 !bottom-0"></div>
                          </div>

                          {/* Thumbnail Swiper */}
                          {existingImages.length > 3 && (
                            <div className="mt-3">
                              <Swiper
                                onSwiper={setThumbsSwiper}
                                modules={[FreeMode, Navigation, Thumbs]}
                                spaceBetween={8}
                                slidesPerView={3}
                                freeMode={true}
                                watchSlidesProgress={true}
                                breakpoints={{
                                  640: { slidesPerView: 4 },
                                  768: { slidesPerView: 5 },
                                }}
                                className="thumb-swiper"
                              >
                                {existingImages.map((img, index) => (
                                  <SwiperSlide key={index}>
                                    <div className="relative h-16 md:h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-emerald-400 cursor-pointer transition-all duration-300">
                                      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                                        <img 
                                          src={img} 
                                          alt={`تصویر کوچک ${index + 1}`}
                                          className="w-full h-full object-cover"
                                          onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            target.parentElement!.innerHTML = `
                                              <div class="w-full h-full flex items-center justify-center text-slate-400">
                                                <i class="${project.icon}"></i>
                                              </div>
                                            `;
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </SwiperSlide>
                                ))}
                              </Swiper>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {/* توضیحات تکمیلی */}
                  <div className="mb-6 md:mb-8 bg-gradient-to-r from-slate-50 to-white rounded-xl p-4 md:p-6 border border-slate-200">
                    <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-3 md:mb-4">جزئیات تکمیلی</h4>
                    <div className="space-y-3 md:space-y-4">
                      <p className="text-slate-700 text-sm md:text-base">
                        این پروژه با مشارکت {project.beneficiaries.toLocaleString('fa-IR')} نفر از هموطنان نیازمند به انجام رسیده است. کمک‌های مالی با دقت و شفافیت کامل توزیع شده و گزارش کامل آن در بخش شفافیت مالی قابل مشاهده است.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-slate-600 text-sm md:text-base">
                          <i className="fas fa-calendar-alt text-emerald-500"></i>
                          <span>تاریخ تکمیل: {project.completedDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 text-sm md:text-base">
                          <i className="fas fa-check-circle text-emerald-500"></i>
                          <span>وضعیت: تکمیل شده و تأیید شده</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* حمایت‌کنندگان */}
                  {project.sponsors && project.sponsors.length > 0 && (
                    <div className="bg-gradient-to-r from-emerald-50 to-white rounded-xl p-4 md:p-6 border border-emerald-100">
                      <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-3 md:mb-4">حامیان این پروژه</h4>
                      <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                        {project.sponsors.map((sponsor, index) => (
                          <div 
                            key={index}
                            className="px-3 py-1 md:px-4 md:py-2 bg-white rounded-lg border border-slate-200 flex items-center gap-2 text-xs md:text-sm"
                          >
                            <i className="fas fa-user-circle text-emerald-500"></i>
                            <span className="text-slate-700">{sponsor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* فوتر Modal */}
                <div className="px-4 md:px-8 py-3 md:py-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4">
                    <div className="flex items-center gap-2 text-slate-600 text-xs md:text-sm">
                      <i className="fas fa-info-circle text-emerald-500"></i>
                      <span>برای مشاهده گزارش مالی کامل به بخش شفافیت مالی مراجعه کنید.</span>
                    </div>
                    <button
                      onClick={onClose}
                      className="px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-medium rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
                    >
                      بستن پنجره
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}