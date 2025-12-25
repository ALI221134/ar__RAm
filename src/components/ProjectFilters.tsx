"use client";

import { useState } from 'react';
import { getProjectStats } from '@/data/projects';

interface ProjectFiltersProps {
  filters: {
    category: string;
    year: string;
    location: string;
    search: string;
  };
  onFilterChange: (filters: any) => void;
  onReset: () => void;
}

export default function ProjectFilters({ filters, onFilterChange, onReset }: ProjectFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const stats = getProjectStats();

  const handleChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange('search', e.target.value);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">جستجو و فیلتر پویش ها</h3>
          <p className="text-slate-600 text-sm">
            {stats.totalProjects} پروژه | {typeof stats.totalAmount === 'number' 
              ? stats.totalAmount.toLocaleString('fa-IR') 
              : stats.totalAmount} میلیون ریال کمک
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
          >
            <i className={`fas ${isFiltersOpen ? 'fa-filter-circle-xmark' : 'fa-filter'}`}></i>
            {isFiltersOpen ? 'بستن فیلترها' : 'فیلتر پیشرفته'}
          </button>
          
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors text-sm"
          >
            <i className="fas fa-rotate-right"></i>
            بازنشانی
          </button>
        </div>
      </div>

      {/* جستجوی سریع */}
      <div className="relative mb-6">
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
          <i className="fas fa-search"></i>
        </div>
        <input
          type="text"
          value={filters.search}
          onChange={handleSearch}
          placeholder="جستجوی پویش ها..."
          className="w-full pr-10 pl-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
        />
      </div>

      {/* فیلترهای پیشرفته */}
      {isFiltersOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
          {/* دسته‌بندی */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              دسته‌بندی
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="همه">همه دسته‌بندی‌ها</option>
              {stats.categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* سال */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              سال اجرا
            </label>
            <select
              value={filters.year}
              onChange={(e) => handleChange('year', e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="همه">همه سال‌ها</option>
              {stats.years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* موقعیت */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              موقعیت جغرافیایی
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="همه">همه موقعیت‌ها</option>
              {stats.locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* تگ‌های فیلتر فعال */}
      {(filters.category !== 'همه' || filters.year !== 'همه' || filters.location !== 'همه') && (
        <div className="flex flex-wrap gap-2 mt-4">
          {filters.category !== 'همه' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
              دسته: {filters.category}
              <button 
                onClick={() => handleChange('category', 'همه')}
                className="text-emerald-500 hover:text-emerald-700"
              >
                <i className="fas fa-times text-xs"></i>
              </button>
            </span>
          )}
          {filters.year !== 'همه' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              سال: {filters.year}
              <button 
                onClick={() => handleChange('year', 'همه')}
                className="text-blue-500 hover:text-blue-700"
              >
                <i className="fas fa-times text-xs"></i>
              </button>
            </span>
          )}
          {filters.location !== 'همه' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
              موقعیت: {filters.location}
              <button 
                onClick={() => handleChange('location', 'همه')}
                className="text-amber-500 hover:text-amber-700"
              >
                <i className="fas fa-times text-xs"></i>
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}