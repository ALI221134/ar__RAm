"use client";
//پویشها
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalProjects: number;
  projectsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  totalProjects,
  projectsPerPage,
  onPageChange 
}: PaginationProps) {
  
  const getPageNumbers = () => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const startProject = (currentPage - 1) * projectsPerPage + 1;
  const endProject = Math.min(currentPage * projectsPerPage, totalProjects);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-slate-200">
      {/* اطلاعات */}
      <div className="text-sm text-slate-600">
        نمایش پویش ها <span className="font-bold text-slate-900">{startProject.toLocaleString('fa-IR')}</span> تا{' '}
        <span className="font-bold text-slate-900">{endProject.toLocaleString('fa-IR')}</span> از{' '}
        <span className="font-bold text-slate-900">{totalProjects.toLocaleString('fa-IR')}</span> پروژه
      </div>

      {/* دکمه‌های پاگینیشن */}
      <div className="flex items-center gap-1">
        {/* قبلی */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* صفحات */}
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={index} className="w-10 h-10 flex items-center justify-center text-slate-400">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(Number(page))}
              className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
                currentPage === page
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {(page as number).toLocaleString('fa-IR')}
            </button>
          )
        ))}

        {/* بعدی */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
      </div>

      {/* انتخاب تعداد در صفحه */}
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <span>تعداد در صفحه:</span>
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
          <button className="px-2 py-1 rounded hover:bg-white">۹</button>
          <button className="px-2 py-1 rounded hover:bg-white">۱۸</button>
          <button className="px-2 py-1 rounded hover:bg-white">۲۷</button>
        </div>
      </div>
    </div>
  );
}