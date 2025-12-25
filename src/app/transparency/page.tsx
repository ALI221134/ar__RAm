// app/transparency/page.tsx - نسخه بهبود یافته
"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  AreaChart, Area, ResponsiveContainer, Cell
} from 'recharts';
import { financialData } from '@/data/financialData';

// پالت رنگ‌های جدید با تفکیک بهتر - جداگانه تعریف شده
const COLORS = {
  primary: {
    emerald: '#10b981',
    emeraldLight: '#34d399',
    emeraldDark: '#059669',
    blue: '#3b82f6',
    blueLight: '#60a5fa',
    blueDark: '#2563eb',
    amber: '#f59e0b',
    amberLight: '#fbbf24',
    amberDark: '#d97706',
    purple: '#8b5cf6',
    purpleLight: '#a78bfa',
    purpleDark: '#7c3aed',
    red: '#ef4444',
    redLight: '#f87171',
    redDark: '#dc2626',
    pink: '#ec4899',
    pinkLight: '#f472b6',
    pinkDark: '#db2777',
    cyan: '#06b6d4',
    cyanLight: '#22d3ee',
    cyanDark: '#0891b2',
    teal: '#14b8a6',
    tealLight: '#2dd4bf',
    tealDark: '#0d9488',
    indigo: '#6366f1',
    indigoLight: '#818cf8',
    indigoDark: '#4f46e5',
  },
  // پالت مخصوص نمودار میله‌ای
  bar: {
    دریافتی: '#10b981',
    پرداختی: '#f59e0b',
    'هزینه اداری': '#ef4444',
  },
  // پالت مخصوص نمودار منطقه‌ای
  area: {
    دریافتی: '#10b981',
    پرداختی: '#f59e0b',
  },
  // پالت برای کارت‌ها
  cards: {
    donors: '#8b5cf6',
    received: '#10b981',
    paid: '#f59e0b',
    admin: '#ef4444',
    families: '#3b82f6',
    cases: '#ec4899',
  },
  // پالت برای بخش‌های مختلف
  sections: {
    breakdown: '#3b82f6',
    trend: '#8b5cf6',
    comparison: '#10b981',
    documents: '#ec4899',
  }
};

// پالت رنگی برای لیست هزینه‌ها
const BREAKDOWN_COLORS = [
  '#10b981', // سبز - کمک نقدی
  '#3b82f6', // آبی - درمانی
  '#f59e0b', // نارنجی - معیشتی
  '#8b5cf6', // بنفش - اجاره منزل
  '#ef4444', // قرمز - تحصیلی
  '#ec4899', // صورتی - جهیزیه
  '#06b6d4', // آبی فیروزه - پوشاک
  '#14b8a6', // فیروزه - لوازم منزل
  '#6366f1', // نیلی - غذای گرم
  '#84cc16', // سبز زیتونی - اداری
  '#f97316', // نارنجی تیره - فرهنگی
  '#7c3aed', // بنفش
  '#2563eb', // آبی
  '#059669', // سبز تیره
  '#d97706', // نارنجی تیره
  '#dc2626', // قرمز تیره
];

// تابع فرمت اعداد به فارسی با واحد ریال
const formatRial = (num: number): string => {
  if (num >= 1000000000) {
    const value = num / 1000000000;
    return `${value.toFixed(value % 1 === 0 ? 0 : 1).replace(/\.0$/, '')} میلیارد ریال`;
  } else if (num >= 1000000) {
    const value = num / 1000000;
    return `${value.toFixed(value % 1 === 0 ? 0 : 1).replace(/\.0$/, '')} میلیون ریال`;
  } else if (num >= 1000) {
    const value = num / 1000;
    return `${value.toFixed(value % 1 === 0 ? 0 : 1).replace(/\.0$/, '')} هزار ریال`;
  }
  return `${num.toLocaleString('fa-IR')} ریال`;
};

// تابع فرمت عدد خالی برای نمودارها
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('fa-IR').format(num);
};

// تابع کوتاه‌سازی متن
const truncateText = (text: string, maxLength: number = 15): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// کامپوننت Tooltip سفارشی برای ریال
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-xl text-sm min-w-[200px] backdrop-blur-sm bg-white/95">
        <p className="font-bold text-gray-900 mb-2 border-b pb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex justify-between items-center mb-2 last:mb-0">
            <div className="flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></span>
              <span className="text-gray-700 text-sm">{entry.name}:</span>
            </div>
            <span className="font-bold text-gray-900 text-left text-sm">
              {entry.name.includes('هزینه اداری') 
                ? formatRial(entry.value * 1000000) 
                : formatRial(entry.value * 1000000)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// کامپوننت برای نمایش اعداد در میله‌های نمودار
const CustomBarLabel = ({ x, y, width, value, index, dataLength }: any) => {
  if (width < 50 || value === 0) return null;
  
  const displayValue = value >= 1000 
    ? `${(value / 1000).toFixed(1)}K`
    : formatNumber(value);
  
  return (
    <text 
      x={x + width / 2} 
      y={y - 8} 
      fill="#374151"
      textAnchor="middle"
      fontSize={11}
      className="font-bold"
      style={{ textShadow: '0px 0px 3px rgba(255,255,255,0.8)' }}
    >
      {displayValue}
    </text>
  );
};

// کامپوننت Tooltip برای لیست هزینه‌ها
const BreakdownTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-xl text-sm min-w-[200px] backdrop-blur-sm bg-white/95">
        <p className="font-bold text-gray-900 mb-2">{payload[0].payload.fullName}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">مبلغ:</span>
          <span className="font-bold text-gray-900">
            {formatRial(payload[0].payload.fullValue)}
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-gray-700">درصد:</span>
          <span className="font-bold text-gray-900">
            {payload[0].payload.percent.toFixed(1)}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function TransparencyPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'annual' | 'documents'>('overview');
  const [selectedYear, setSelectedYear] = useState('1403');
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);

  // داده سال انتخاب شده
  const selectedYearData = financialData.find(item => item.year === selectedYear);

  // محاسبه آمار کلی
  const totalDonors = financialData.reduce((sum, item) => sum + item.donors, 0);
  const totalReceived = financialData.reduce((sum, item) => sum + item.totalReceived, 0);
  const totalPaid = financialData.reduce((sum, item) => sum + item.totalPaid, 0);
  
  // داده برای نمودار مقایسه سالانه (بر حسب میلیون ریال برای نمایش بهتر)
  const comparisonData = useMemo(() => 
    financialData.map(item => ({
      year: item.year,
      دریافتی: Math.round(item.totalReceived / 1000000),
      پرداختی: Math.round(item.totalPaid / 1000000),
      'هزینه اداری': Math.round(item.adminCost / 1000000),
    }))
  , []);

  // داده برای لیست تفکیک هزینه‌ها
  const breakdownData = useMemo(() => {
    if (!selectedYearData) return [];
    
    const totalBreakdown = Object.values(selectedYearData.breakdown).reduce((a, b) => a + b, 0);
    
    return Object.entries(selectedYearData.breakdown)
      .map(([name, value]) => ({
        name: truncateText(name, 20),
        fullName: name,
        value: Math.round(value / 1000), // تبدیل به هزار ریال برای نمایش بهتر
        fullValue: value,
        percent: (value / totalBreakdown) * 100,
        displayValue: formatRial(value)
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 16); // محدود به ۱۶ آیتم برای خوانایی بهتر
  }, [selectedYearData]);

  // داده برای نمودار روند ماهانه
  const trendData = useMemo(() => {
    if (!selectedYearData?.trend) return [];
    
    // تبدیل اعداد trend به میلیون ریال برای نمایش یکسان
    return selectedYearData.trend.map(item => ({
      month: item.month,
      دریافتی: Math.round(item.received / 1000000), // تبدیل به میلیون ریال
      پرداختی: Math.round(item.paid / 1000000), // تبدیل به میلیون ریال
    }));
  }, [selectedYearData]);

  // محاسبه عرض میله‌ها بر اساس تعداد داده‌ها
  const barSize = useMemo(() => {
    const dataLength = comparisonData.length;
    if (dataLength <= 3) return 60;
    if (dataLength <= 5) return 50;
    return 40;
  }, [comparisonData.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* هدر */}
      <header className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="max-w-2xl">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm mb-4 group"
              >
                <svg className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                بازگشت به صفحه اصلی
              </Link>
              <h1 className="text-3xl font-bold mt-2 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300">
                شفافیت مالی مؤسسه
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed">
                گزارش دقیق، شفاف و مستند عملکرد مالی مؤسسه به همراه کلیه اسناد و مدارک
              </p>
            </div>
            
            {/* کارت سریع آمار */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                <div className="text-xl font-bold text-white">{formatNumber(totalDonors)}</div>
                <div className="text-xs text-slate-300 mt-1">کل نیکوکاران</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                <div className="text-xl font-bold text-white">
                  {(totalReceived / 1000000000).toFixed(1)}
                </div>
                <div className="text-xs text-slate-300 mt-1">میلیارد ریال</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* تب‌های اصلی */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 sm:flex-none px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-300 relative group ${
                activeTab === 'overview'
                  ? 'border-emerald-500 text-emerald-700 bg-gradient-to-b from-emerald-50 to-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <i className="fas fa-chart-network ml-2 text-sm"></i>
              دید کلی مالی
              {activeTab === 'overview' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('annual')}
              className={`flex-1 sm:flex-none px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-300 relative group ${
                activeTab === 'annual'
                  ? 'border-blue-500 text-blue-700 bg-gradient-to-b from-blue-50 to-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <i className="fas fa-calendar-star ml-2 text-sm"></i>
              گزارش سالانه
              {activeTab === 'annual' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`flex-1 sm:flex-none px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-300 relative group ${
                activeTab === 'documents'
                  ? 'border-purple-500 text-purple-700 bg-gradient-to-b from-purple-50 to-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <i className="fas fa-file-certificate ml-2 text-sm"></i>
              اسناد و مدارک
              {activeTab === 'documents' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* محتوای اصلی */}
      <main className="container mx-auto px-4 py-8">
        
        {/* بخش 1: دید کلی مالی */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* کارت‌های آمار کلی با طراحی جدید */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-50 to-white rounded-2xl p-6 border border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">
                      {formatNumber(totalDonors)}
                    </div>
                    <div className="text-slate-600 text-sm">کل نیکوکاران</div>
                    <div className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                      <i className="fas fa-arrow-up"></i>
                      {((financialData[financialData.length-1]?.donors || 0) / (financialData[0]?.donors || 1) * 100 - 100).toFixed(0)}% رشد
                    </div>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl text-white">
                    <i className="fas fa-users text-lg"></i>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/10 via-blue-50 to-white rounded-2xl p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">
                      {formatRial(totalReceived)}
                    </div>
                    <div className="text-slate-600 text-sm">کل دریافتی‌ها</div>
                    <div className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                      <i className="fas fa-chart-line"></i>
                      {financialData.length} سال گزارش
                    </div>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white">
                    <i className="fas fa-donate text-lg"></i>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-500/10 via-amber-50 to-white rounded-2xl p-6 border border-amber-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">
                      {formatRial(totalPaid)}
                    </div>
                    <div className="text-slate-600 text-sm">کل پرداختی‌ها</div>
                    <div className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                      <i className="fas fa-hand-holding-heart"></i>
                      کمک به نیازمندان
                    </div>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl text-white">
                    <i className="fas fa-hand-holding-usd text-lg"></i>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/10 via-purple-50 to-white rounded-2xl p-6 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">
                      {financialData.length}
                    </div>
                    <div className="text-slate-600 text-sm">سال گزارش</div>
                    <div className="text-xs text-purple-600 mt-2 flex items-center gap-1">
                      <i className="fas fa-history"></i>
                      از {financialData[0]?.year} تا {financialData[financialData.length-1]?.year}
                    </div>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white">
                    <i className="fas fa-calendar-alt text-lg"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* نمودار مقایسه دریافتی و پرداختی سالانه */}
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">مقایسه عملکرد مالی سالانه</h2>
                  <p className="text-slate-600 text-sm">بررسی روند دریافتی و پرداختی در سال‌های مختلف</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span>دریافتی</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span>پرداختی</span>
                  </div>
                </div>
              </div>
              
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={comparisonData}
                    margin={{ top: 20, right: 30, left: 40, bottom: 70 }}
                    barSize={barSize}
                    barGap={8}
                  >
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="#e2e8f0"
                      vertical={false}
                    />
                    <XAxis 
                      dataKey="year" 
                      fontSize={12}
                      tick={{ fill: '#64748b' }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={{ stroke: '#cbd5e1' }}
                    />
                    <YAxis 
                      fontSize={11}
                      tick={{ fill: '#64748b' }}
                      tickFormatter={(value) => formatNumber(value)}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={{ stroke: '#cbd5e1' }}
                      label={{ 
                        value: 'میلیون ریال', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { textAnchor: 'middle', fill: '#64748b', fontSize: 12 },
                        offset: -20
                      }}
                    />
                    <Tooltip 
                      content={<CustomTooltip />}
                    />
                    <Legend 
                      verticalAlign="top"
                      height={50}
                      iconType="circle"
                      iconSize={10}
                      wrapperStyle={{ paddingBottom: '20px' }}
                    />
                    <Bar 
                      dataKey="دریافتی" 
                      fill={COLORS.bar.دریافتی}
                      radius={[6, 6, 0, 0]}
                      name="دریافتی"
                      animationBegin={200}
                      animationDuration={1800}
                      animationEasing="ease-out"
                      onMouseEnter={() => setHoveredBar('دریافتی')}
                      onMouseLeave={() => setHoveredBar(null)}
                      fillOpacity={hoveredBar === 'دریافتی' ? 1 : 0.9}
                      stroke={COLORS.primary.emeraldDark}
                      strokeWidth={hoveredBar === 'دریافتی' ? 2 : 0}
                      label={(props) => (
                        <CustomBarLabel 
                          {...props} 
                          dataLength={comparisonData.length}
                        />
                      )}
                    />
                    <Bar 
                      dataKey="پرداختی" 
                      fill={COLORS.bar.پرداختی}
                      radius={[6, 6, 0, 0]}
                      name="پرداختی"
                      animationBegin={400}
                      animationDuration={1800}
                      animationEasing="ease-out"
                      onMouseEnter={() => setHoveredBar('پرداختی')}
                      onMouseLeave={() => setHoveredBar(null)}
                      fillOpacity={hoveredBar === 'پرداختی' ? 1 : 0.9}
                      stroke={COLORS.primary.amberDark}
                      strokeWidth={hoveredBar === 'پرداختی' ? 2 : 0}
                      label={(props) => (
                        <CustomBarLabel 
                          {...props} 
                          dataLength={comparisonData.length}
                        />
                      )}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex flex-wrap gap-4 justify-center text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
                    <span>میانگین دریافتی سالانه: {formatRial(totalReceived / financialData.length)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gradient-to-r from-amber-500 to-amber-600"></div>
                    <span>میانگین پرداختی سالانه: {formatRial(totalPaid / financialData.length)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* نمودار روند نیکوکاران */}
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xl">
              <h2 className="text-xl font-bold text-slate-900 mb-8">روند رشد تعداد نیکوکاران در سال‌های مختلف</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart 
                    data={financialData}
                    margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                  >
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="#e2e8f0"
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis 
                      dataKey="year" 
                      fontSize={12}
                      tick={{ fill: '#64748b' }}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={{ stroke: '#cbd5e1' }}
                    />
                    <YAxis 
                      fontSize={11}
                      tick={{ fill: '#64748b' }}
                      tickFormatter={(value) => formatNumber(value)}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={{ stroke: '#cbd5e1' }}
                    />
                    <Tooltip 
                      formatter={(value) => [formatNumber(Number(value)), 'نیکوکار']}
                      labelFormatter={(label) => `سال ${label}`}
                      contentStyle={{ 
                        backgroundColor: 'white',
                        borderColor: '#e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <defs>
                      <linearGradient id="colorDonors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.cards.donors} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={COLORS.cards.donors} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="donors" 
                      stroke={COLORS.cards.donors}
                      fill="url(#colorDonors)"
                      strokeWidth={3}
                      name="تعداد نیکوکاران"
                      animationBegin={600}
                      animationDuration={2000}
                      animationEasing="ease-out"
                      dot={{ 
                        stroke: COLORS.primary.purpleDark, 
                        strokeWidth: 2, 
                        r: 4,
                        fill: 'white'
                      }}
                      activeDot={{ 
                        stroke: COLORS.primary.purpleDark, 
                        strokeWidth: 3, 
                        r: 6,
                        fill: 'white'
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* بخش 2: گزارش سالانه */}
        {activeTab === 'annual' && (
          <div className="space-y-8">
            {/* انتخاب سال */}
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xl">
              <h2 className="text-xl font-bold text-slate-900 mb-6">انتخاب سال برای مشاهده گزارش مفصل</h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {financialData.map((item) => (
                  <button
                    key={item.year}
                    onClick={() => setSelectedYear(item.year)}
                    className={`px-6 py-3 rounded-xl transition-all duration-300 text-sm font-medium relative overflow-hidden group ${
                      selectedYear === item.year
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl scale-105'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md'
                    }`}
                  >
                    <span className="relative z-10">سال {item.year}</span>
                    {selectedYear === item.year && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* آمار سال انتخاب شده */}
            {selectedYearData && (
              <>
                {/* کارت‌های آمار سال */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-50 to-white rounded-2xl p-6 border border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-2xl font-bold text-slate-900 mb-1">{formatNumber(selectedYearData.donors)}</div>
                        <div className="text-slate-600 text-sm">نیکوکار</div>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl text-white">
                        <i className="fas fa-user-friends"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-500/10 via-blue-50 to-white rounded-2xl p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-2xl font-bold text-slate-900 mb-1">{formatRial(selectedYearData.totalReceived)}</div>
                        <div className="text-slate-600 text-sm">دریافتی</div>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white">
                        <i className="fas fa-donate"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-500/10 via-amber-50 to-white rounded-2xl p-6 border border-amber-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-2xl font-bold text-slate-900 mb-1">{formatRial(selectedYearData.totalPaid)}</div>
                        <div className="text-slate-600 text-sm">پرداختی</div>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl text-white">
                        <i className="fas fa-hand-holding-usd"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-500/10 via-purple-50 to-white rounded-2xl p-6 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-2xl font-bold text-slate-900 mb-1">{formatRial(selectedYearData.adminCost)}</div>
                        <div className="text-slate-600 text-sm">هزینه اداری</div>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white">
                        <i className="fas fa-building"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* لیست تفکیک هزینه‌ها */}
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xl">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-2">تفکیک هزینه‌های سال {selectedYear}</h2>
                      <p className="text-slate-600 text-sm">بررسی نحوه توزیع کمک‌های دریافتی بر اساس موضوعات حمایتی</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-slate-600 bg-slate-100 px-4 py-2 rounded-lg">
                        {breakdownData.length} موضوع حمایتی
                      </div>
                      <div className="text-sm text-slate-600 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg">
                        کل: {formatRial(selectedYearData.totalPaid)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-3 custom-scrollbar">
                    {breakdownData.map((item, index) => (
                      <div 
                        key={index} 
                        className="space-y-3 p-4 rounded-xl hover:bg-slate-50 transition-all duration-300 border border-slate-100 hover:border-slate-200 bg-white"
                        onMouseEnter={() => setHoveredItemIndex(index)}
                        onMouseLeave={() => setHoveredItemIndex(null)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-5 h-5 rounded-lg transition-all duration-300" 
                              style={{ 
                                backgroundColor: BREAKDOWN_COLORS[index % BREAKDOWN_COLORS.length],
                                boxShadow: hoveredItemIndex === index 
                                  ? `0 0 0 4px ${BREAKDOWN_COLORS[index % BREAKDOWN_COLORS.length]}40`
                                  : 'none'
                              }}
                            ></div>
                            <div>
                              <h3 className="font-bold text-slate-900 text-sm">{item.fullName}</h3>
                              <div className="text-xs text-slate-500 mt-1">
                                {item.percent.toFixed(1)}% از کل هزینه‌ها
                              </div>
                            </div>
                          </div>
                          <div className="text-left">
                            <span className="font-bold text-slate-900 text-sm">
                              {item.displayValue}
                            </span>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ 
                              width: `${item.percent}%`,
                              backgroundColor: BREAKDOWN_COLORS[index % BREAKDOWN_COLORS.length],
                              backgroundImage: `linear-gradient(90deg, ${BREAKDOWN_COLORS[index % BREAKDOWN_COLORS.length]}, ${BREAKDOWN_COLORS[index % BREAKDOWN_COLORS.length]}DD)`
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* نمودار روند ماهانه */}
                {trendData.length > 0 && (
                  <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xl">
                    <h2 className="text-xl font-bold text-slate-900 mb-8">روند ماهانه دریافتی و پرداختی سال {selectedYear}</h2>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart 
                          data={trendData}
                          margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                        >
                          <CartesianGrid 
                            strokeDasharray="3 3" 
                            stroke="#e2e8f0"
                            horizontal={true}
                            vertical={false}
                          />
                          <XAxis 
                            dataKey="month" 
                            fontSize={11}
                            tick={{ fill: '#64748b' }}
                            axisLine={{ stroke: '#cbd5e1' }}
                            tickLine={{ stroke: '#cbd5e1' }}
                          />
                          <YAxis 
                            fontSize={11}
                            tick={{ fill: '#64748b' }}
                            tickFormatter={(value) => formatNumber(value)}
                            axisLine={{ stroke: '#cbd5e1' }}
                            tickLine={{ stroke: '#cbd5e1' }}
                          />
                          <Tooltip 
                            formatter={(value) => [`${formatNumber(Number(value))} میلیون`, 'ریال']}
                            labelFormatter={(label) => `ماه ${label}`}
                            contentStyle={{ 
                              backgroundColor: 'white',
                              borderColor: '#e2e8f0',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                          <Legend 
                            verticalAlign="top"
                            height={50}
                            iconType="circle"
                            iconSize={10}
                          />
                          <defs>
                            <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={COLORS.area.دریافتی} stopOpacity={0.8}/>
                              <stop offset="95%" stopColor={COLORS.area.دریافتی} stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={COLORS.area.پرداختی} stopOpacity={0.8}/>
                              <stop offset="95%" stopColor={COLORS.area.پرداختی} stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <Area 
                            type="monotone" 
                            dataKey="دریافتی" 
                            stroke={COLORS.area.دریافتی}
                            fill="url(#colorReceived)"
                            name="دریافتی"
                            animationBegin={300}
                            animationDuration={1600}
                            strokeWidth={3}
                            dot={{ 
                              stroke: COLORS.primary.emeraldDark, 
                              strokeWidth: 2, 
                              r: 4,
                              fill: 'white'
                            }}
                            activeDot={{ 
                              stroke: COLORS.primary.emeraldDark, 
                              strokeWidth: 3, 
                              r: 6,
                              fill: 'white'
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="پرداختی" 
                            stroke={COLORS.area.پرداختی}
                            fill="url(#colorPaid)"
                            name="پرداختی"
                            animationBegin={500}
                            animationDuration={1600}
                            strokeWidth={3}
                            dot={{ 
                              stroke: COLORS.primary.amberDark, 
                              strokeWidth: 2, 
                              r: 4,
                              fill: 'white'
                            }}
                            activeDot={{ 
                              stroke: COLORS.primary.amberDark, 
                              strokeWidth: 3, 
                              r: 6,
                              fill: 'white'
                            }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {trendData.length === 0 && (
                      <div className="text-center py-12 text-slate-500">
                        <i className="fas fa-chart-line text-3xl mb-4 text-slate-300"></i>
                        <p>داده‌های روند ماهانه برای این سال موجود نیست</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* بخش 3: اسناد و مدارک */}
        {activeTab === 'documents' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xl">
              <h2 className="text-xl font-bold text-slate-900 mb-6">اسناد و مدارک مؤسسه</h2>
              
              {/* تب‌های سال‌ها برای اسناد */}
              <div className="flex overflow-x-auto mb-8 pb-4 scrollbar-hide">
                <div className="flex space-x-3 rtl:space-x-reverse">
                  {financialData.map((yearData) => (
                    <button
                      key={yearData.year}
                      onClick={() => setSelectedYear(yearData.year)}
                      className={`px-5 py-3 rounded-xl transition-all duration-300 text-sm font-medium whitespace-nowrap relative group ${
                        selectedYear === yearData.year
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md'
                      }`}
                    >
                      <span className="relative z-10">سال {yearData.year}</span>
                      {selectedYear === yearData.year && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl"></div>
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-600"></div>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* لیست اسناد سال انتخاب شده */}
              {selectedYearData && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {selectedYearData.documents.map((doc) => (
                    <div 
                      key={doc.id}
                      className="group border border-slate-200 rounded-2xl p-5 hover:border-purple-300 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-4 rounded-xl transition-all duration-500 group-hover:scale-110 ${
                          doc.type === 'pdf' 
                            ? 'bg-gradient-to-br from-red-100 to-red-50 group-hover:from-red-200' 
                            : 'bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200'
                        }`}>
                          {doc.type === 'pdf' ? (
                            <i className="fas fa-file-pdf text-red-500 text-2xl"></i>
                          ) : (
                            <i className="fas fa-image text-blue-500 text-2xl"></i>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-slate-900 mb-2 group-hover:text-purple-700 text-sm leading-relaxed line-clamp-2">
                            {doc.title}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-300 ${
                              doc.type === 'pdf' 
                                ? 'bg-red-100 text-red-700 group-hover:bg-red-200' 
                                : 'bg-blue-100 text-blue-700 group-hover:bg-blue-200'
                            }`}>
                              {doc.type === 'pdf' ? 'PDF' : 'تصویر'}
                            </span>
                            <span className="text-xs text-slate-500">سال {selectedYear}</span>
                          </div>
                        </div>
                        <a 
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-purple-600 p-2 transition-colors duration-300 self-start group-hover:scale-110"
                          title="مشاهده سند"
                        >
                          <i className="fas fa-external-link-alt text-lg"></i>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* اطلاعات مؤسسه */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-4 text-lg">اطلاعات رسمی مؤسسه</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                          <div className="p-2 bg-emerald-100 rounded-lg">
                            <i className="fas fa-id-card text-emerald-600"></i>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500">شماره پروانه</div>
                            <div className="font-bold text-slate-900">۲۳۵۶/۱۴۰/۷۸</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <i className="fas fa-calendar-alt text-blue-600"></i>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500">تاریخ تأسیس</div>
                            <div className="font-bold text-slate-900">۱۳۹۹/۰۵/۱۲</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <i className="fas fa-hashtag text-purple-600"></i>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500">شماره ثبت</div>
                            <div className="font-bold text-slate-900">۲۷۸۸</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                          <div className="p-2 bg-amber-100 rounded-lg">
                            <i className="fas fa-bank text-amber-600"></i>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500">شماره حساب</div>
                            <div className="font-bold text-slate-900 text-sm">۸۱۰۰-۸۱۲۵-۷۴۱۲-۶۳۳</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                    <Link 
                      href="/about" 
                      className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 text-sm text-center shadow-lg hover:shadow-xl font-medium flex items-center justify-center gap-2"
                    >
                      <i className="fas fa-external-link-alt"></i>
                      مشاهده پروانه
                    </Link>
                   {/* <button className="px-6 py-3 border-2 border-emerald-600 text-emerald-600 rounded-xl hover:bg-emerald-50 transition-all duration-300 text-sm text-center hover:shadow-lg font-medium flex items-center justify-center gap-2">
                      <i className="fas fa-download"></i>
                      دانلود همه اسناد
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}