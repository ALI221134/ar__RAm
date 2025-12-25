"use client";

export default function HowWeWork() {
  const steps = [
    {
      number: 1,
      icon: 'fas fa-user-plus',
      title: 'معرفی نیازمند',
      description: 'ثبت درخواست از طریق فرم آنلاین یا تماس تلفنی'
    },
    {
      number: 2,
      icon: 'fas fa-phone-alt',
      title: 'مصاحبه تلفنی',
      description: 'بررسی اولیه شرایط و نیازها توسط تیم مددکاری'
    },
    {
      number: 3,
      icon: 'fas fa-map-marker-alt',
      title: 'بازدید میدانی',
      description: 'حضور کارشناسان در محل زندگی برای بررسی دقیق'
    },
    {
      number: 4,
      icon: 'fas fa-file-alt',
      title: 'گزارش مکتوب',
      description: 'تدوین گزارش کامل از شرایط و نیازهای خانواده'
    },
    {
      number: 5,
      icon: 'fas fa-list-ol',
      title: 'ثبت در لیست نوبت',
      description: 'اضافه شدن به لیست نوبت کمک با اولویت‌بندی'
    },
    {
      number: 6,
      icon: 'fas fa-bullhorn',
      title: 'اعلام در پویش',
      description: 'معرفی در پویش‌های هفتگی جمع‌آوری کمک'
    },
    {
      number: 7,
      icon: 'fas fa-hand-holding-usd',
      title: 'جمع‌آوری کمک',
      description: 'گردآوری مبالغ از نیکوکاران در بازه زمانی مشخص'
    },
    {
      number: 8,
      icon: 'fas fa-money-check-alt',
      title: 'واریز',
      description: 'انتقال مستقیم کمک به حساب مددجو'
    }
  ];

  return (
    <section id="how-we-work" className="py-8 md:py-12 bg-gradient-to-b from-white to-slate-50/50">
      <div className="container mx-auto px-4">
        {/* هدر فشرده */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-block">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
              <span className="inline-flex items-center gap-2">
                <i className="fas fa-cogs text-emerald-600 text-lg md:text-xl"></i>
                فرآیند کمک‌رسانی
              </span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-tight">
              از شناسایی تا واریز کمک، با شفافیت کامل
            </p>
          </div>
        </div>

        {/* مراحل در Grid کاملاً فشرده */}
        <div className="relative">
          {/* خط اتصال افقی فقط در دسکتاپ */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-200 via-blue-200 to-emerald-200 -translate-y-1/2 z-0"></div>
          
          <div className="relative z-10">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {steps.map((step, index) => (
                <div key={step.number} className="relative group">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg md:rounded-xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 hover:border-emerald-200 hover:-translate-y-0.5 h-full">
                    {/* شماره مرحله */}
                    <div className="absolute -top-2 -right-2 w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold shadow-md border border-white">
                      {step.number}
                    </div>
                    
                    {/* آیکون */}
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-3 mx-auto ${
                      index < 4 ? 'bg-gradient-to-br from-emerald-50 to-emerald-100' : 'bg-gradient-to-br from-blue-50 to-blue-100'
                    }`}>
                      <i className={`${step.icon} ${
                        index < 4 ? 'text-emerald-600' : 'text-blue-600'
                      } text-base md:text-lg`}></i>
                    </div>
                    
                    {/* محتوا */}
                    <div className="text-center">
                      <h3 className="text-sm md:text-base font-bold text-slate-900 mb-1 md:mb-2 line-clamp-1">
                        {step.title}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-600 leading-tight line-clamp-2">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* خط اتصال عمودی برای موبایل */}
                  {index < steps.length - 2 && (
                    <div className="xs:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gradient-to-b from-emerald-200 to-blue-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* اطلاعات تکمیلی فشرده */}
        <div className="mt-6 md:mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {/* زمان‌بندی */}
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-emerald-50/50 to-white rounded-lg border border-emerald-100">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-lg flex items-center justify-center">
                  <i className="fas fa-clock text-emerald-600 text-sm"></i>
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-slate-900 text-sm md:text-base mb-1">زمان‌بندی دقیق</h4>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600">پویش هفتگی</span>
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">۷ روز</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600">واریز کمک</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">۴۸ ساعت</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* تضمین کیفیت */}
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50/50 to-white rounded-lg border border-blue-100">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                  <i className="fas fa-shield-alt text-blue-600 text-sm"></i>
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-slate-900 text-sm md:text-base mb-1">تضمین شفافیت</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <i className="fas fa-check-circle text-emerald-500 text-xs"></i>
                      <span className="text-xs text-slate-700">گزارش تصویری کامل</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <i className="fas fa-check-circle text-emerald-500 text-xs"></i>
                      <span className="text-xs text-slate-700">فیش بانکی واریز</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* نکته کلیدی */}
              <div className="sm:col-span-2 lg:col-span-1 flex items-start gap-3 p-3 bg-gradient-to-r from-slate-50/50 to-white rounded-lg border border-slate-200">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-50 rounded-lg flex items-center justify-center">
                  <i className="fas fa-info-circle text-slate-600 text-sm"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm md:text-base mb-1">نکته مهم</h4>
                  <p className="text-xs text-slate-600 leading-tight">
                    تمام مراحل با حضور کارشناسان و گزارش مستند انجام می‌شود.
                  </p>
                </div>
              </div>
            </div>

            {/* خط پایین */}
            <div className="mt-4 pt-4 border-t border-slate-200/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs text-slate-600 font-medium">فرآیند فعال و در حال اجرا</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <i className="fas fa-sync-alt text-emerald-500"></i>
                  <span>به‌روزرسانی لحظه‌ای</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* جداکننده ظریف */}
        <div className="mt-6 md:mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200/50"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-3 bg-white text-slate-500">
              <i className="fas fa-arrow-down text-xs"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}