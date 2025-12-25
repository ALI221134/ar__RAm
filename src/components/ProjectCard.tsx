"use client";

import { Project } from '@/types/project';
import { useState, useEffect } from 'react';
import ProjectModal from './ProjectModal';

interface ProjectCardProps {
  project: Project;
}

const checkImageExists = (imageUrl: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = imageUrl;
    // تایم‌اوت برای جلوگیری از انتظار طولانی
    setTimeout(() => resolve(false), 2000);
  });
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  useEffect(() => {
    const loadProjectImage = async () => {
      if (!project) return;
      
      setIsLoadingImage(true);
      
      // لیست منابع تصویر برای بررسی
      const imageSources = [
        project.imageUrl,
        `/images/projects/${project.id}/1.jpg`,
        `/images/projects/${project.id}/main.jpg`,
        `/images/projects/${project.id}.jpg`,
        `/images/projects/${project.id}/01.jpg`,
      ];
      
      // بررسی منابع تصویر تا اولین تصویر موجود پیدا شود
      for (const source of imageSources) {
        if (!source) continue;
        
        try {
          const exists = await checkImageExists(source);
          if (exists) {
            setImageUrl(source);
            setHasImage(true);
            setIsLoadingImage(false);
            return;
          }
        } catch (error) {
          console.log(`Error loading image from ${source}:`, error);
          continue;
        }
      }
      
      // اگر هیچ تصویری پیدا نشد
      setHasImage(false);
      setImageUrl('');
      setIsLoadingImage(false);
    };

    loadProjectImage();
  }, [project]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full">
        {/* بخش تصویر */}
        <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
          {isLoadingImage ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-200 mb-2"></div>
                <div className="h-2 w-24 bg-slate-200 rounded"></div>
              </div>
            </div>
          ) : hasImage ? (
            <>
              {/* اگر عکس دارد: نمایش اولین عکس */}
              <img
                src={imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={() => {
                  // اگر خطا در بارگذاری عکس رخ داد، به حالت بدون عکس برو
                  setHasImage(false);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* نشانگر گالری */}
              {project.hasGallery && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-700 text-xs px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                  <i className="fas fa-images text-emerald-500"></i>
                  <span className="font-medium">گالری تصاویر</span>
                </div>
              )}
            </>
          ) : (
            // حالت بدون عکس: نمایش آیکون و رنگ
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <div className={`w-20 h-20 rounded-2xl ${project.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                <i className={`${project.icon} text-2xl`}></i>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{project.title}</h3>
              <div className="text-slate-500 text-sm">
                <i className="fas fa-image ml-1"></i>
                تصویر پروژه
              </div>
            </div>
          )}
          
          {/* تاریخ - همیشه نمایش داده می‌شود */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-slate-700 text-xs px-3 py-1.5 rounded-full shadow-sm">
            <i className="fas fa-calendar-alt ml-1.5"></i>
            <span className="font-medium">{project.completedDate}</span>
          </div>
        </div>
        
        {/* محتوای کارت */}
        <div className="p-5 sm:p-6 flex flex-col flex-grow">
          {/* دسته‌بندی و مکان */}
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
              <i className={`${project.icon} ml-1.5`}></i>
              {project.category}
            </span>
            <div className="text-slate-600 text-xs flex items-center">
              <i className="fas fa-map-marker-alt ml-1"></i>
              <span>{project.location}</span>
            </div>
          </div>

          {/* عنوان */}
          <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {project.title}
          </h3>
          
          {/* توضیحات مختصر */}
          <p className="text-slate-600 text-sm mb-5 leading-relaxed line-clamp-2 flex-grow">
            {project.description}
          </p>

          {/* آمار پروژه */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-3 text-center border border-emerald-100">
              <div className="text-base font-bold text-emerald-700">
                {project.totalHelp.toLocaleString('fa-IR')}
              </div>
              <div className="text-xs text-slate-600 mt-1">میلیون ریال</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-3 text-center border border-amber-100">
              <div className="text-base font-bold text-amber-700">
                {project.beneficiaries.toLocaleString('fa-IR')}
              </div>
              <div className="text-xs text-slate-600 mt-1">بهره‌بردار</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-3 text-center border border-blue-100">
              <div className="text-base font-bold text-blue-700">
                {hasImage ? 'دارد' : 'ندارد'}
              </div>
              <div className="text-xs text-slate-600 mt-1">تصویر پروژه</div>
            </div>
          </div>

          {/* دکمه مشاهده جزئیات */}
          <button 
            onClick={openModal}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg group/btn"
          >
            <i className="fas fa-eye group-hover/btn:scale-110 transition-transform"></i>
            مشاهده جزئیات پروژه
          </button>
        </div>
      </div>

      {/* Modal */}
      <ProjectModal 
        project={project}
        isOpen={isModalOpen}
        onClose={closeModal}
        hasImage={hasImage}
        imageUrl={imageUrl}
      />
    </>
  );
}