export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  completedDate: string;
  totalHelp: number; // تغییر به number
  beneficiaries: number;
  location: string;
  icon: string;
  color: string;
  gradient: string;
  tags?: string[];
  images?: string[];
  details?: string;
  sponsors?: string[];
}
//پروژه اسلایدر
const allProjects: Project[] = [
  {
    id: 1,
    title: 'توزیع موزززز معیشتی زمستانه',
    description: 'توزیع ۵۰۰ بسته معیشتی شامل برنج، روغن، قند و چای بین خانواده‌های نیازمند در مناطق محروم قم',
    category: 'معیشت',
    completedDate: '۱۴۰۲/۰۹/۱۵',
    totalHelp: 1272,
    beneficiaries: 500,
    location: 'قم',
    icon: 'fas fa-shopping-basket',
    color: 'bg-emerald-500',
    gradient: 'from-emerald-500 to-emerald-600',
    tags: ['معیشت', 'زمستان', 'قم']
  },
  {
    id: 2,
    title: 'کمک به درمان بیماران خاص',
    description: 'پرداخت هزینه درمان ۴۵ بیمار خاص و صعب‌العلاج در بیمارستان‌های شهر قم',
    category: 'درمبان',
    completedDate: '۱۴۰۲/۰۸/۱۰',
    totalHelp: 99,
    beneficiaries: 85,
    location: 'بیمارستان‌های قم',
    icon: 'fas fa-heartbeat',
    color: 'bg-rose-500',
    gradient: 'from-rose-500 to-pink-600',
    tags: ['درمان', 'بیماران خاص', 'سلامتی']
  },
  {
    id: 3,
    title: 'برنامه‌های فرهنگی و مذهبی',
    description: 'اجرای ۳۶ برنامه فرهنگی و مذهبی شامل مراسم دعا و عزاداری برای عموم مردم',
    category: 'فرهنگی',
    completedDate: '۱۴۰۳/۰۶/۳۰',
    totalHelp: 1629,
    beneficiaries: 3500,
    location: 'قم و حومه',
    icon: 'fas fa-book-open',
    color: 'bg-amber-500',
    gradient: 'from-amber-500 to-orange-500',
    tags: ['فرهنگی', 'مذهبی', 'مراسم']
  },
  {
    id: 4,
    title: 'کمک به اجاره مسکن',
    description: 'پرداخت اجاره بهای مسکن برای ۱۲۰ خانواده نیازمند به مدت ۶ ماه',
    category: 'مسکن',
    completedDate: '۱۴۰۳/۰۵/۱۵',
    totalHelp: 601,
    beneficiaries: 120,
    location: 'استان قم',
    icon: 'fas fa-home',
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-cyan-600',
    tags: ['مسکن', 'اجاره', 'خانواده']
  },
  {
    id: 5,
    title: 'کمک‌های آموزشی',
    description: 'تأمین لوازم التحریر و کمک هزینه تحصیل برای ۲۰۰ دانش‌آموز نیازمند',
    category: 'آموزشی',
    completedDate: '۱۴۰۳/۰۷/۲۰',
    totalHelp: 980,
    beneficiaries: 200,
    location: 'مدارس قم',
    icon: 'fas fa-graduation-cap',
    color: 'bg-purple-500',
    gradient: 'from-purple-500 to-violet-600',
    tags: ['آموزش', 'دانش‌آموز', 'تحصیل']
  },
  {
    id: 6,
    title: 'پویش لباس عید',
    description: 'توزیع لباس نو برای ۳۰۰ کودک نیازمند در آستانه عید نوروز',
    category: 'معیشت',
    completedDate: '۱۴۰۲/۱۲/۲۰',
    totalHelp: 750,
    beneficiaries: 300,
    location: 'مناطق محروم قم',
    icon: 'fas fa-tshirt',
    color: 'bg-indigo-500',
    gradient: 'from-indigo-500 to-blue-600',
    tags: ['لباس', 'عید', 'کودک']
  }
];

export const PROJECTS_PER_PAGE = 9;

// فیلتر کردن پروژه‌ها
export function getProjectsByPage(page: number, filters?: {
  category?: string;
  year?: number;
  location?: string;
  search?: string;
}) {
  let filteredProjects = [...allProjects];

  // اعمال فیلترها
  if (filters) {
    if (filters.category) {
      filteredProjects = filteredProjects.filter(project => 
        project.category === filters.category
      );
    }

    if (filters.year) {
      filteredProjects = filteredProjects.filter(project => {
        const projectYear = parseInt(project.completedDate.split('/')[0]);
        return projectYear === filters.year;
      });
    }

    if (filters.location) {
      filteredProjects = filteredProjects.filter(project => 
        project.location.includes(filters.location!)
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProjects = filteredProjects.filter(project => 
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.category.toLowerCase().includes(searchTerm) ||
        project.location.toLowerCase().includes(searchTerm)
      );
    }
  }

  // محاسبه پاگینیشن
  const totalProjects = filteredProjects.length;
  const totalPages = Math.ceil(totalProjects / PROJECTS_PER_PAGE);
  const startIndex = (page - 1) * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  return {
    projects: paginatedProjects,
    pagination: {
      currentPage: page,
      totalPages,
      totalProjects,
      projectsPerPage: PROJECTS_PER_PAGE
    }
  };
}

// آمار پروژه‌ها
export function getProjectStats() {
  const categories = Array.from(new Set(allProjects.map(p => p.category)));
  const years = Array.from(new Set(allProjects.map(p => parseInt(p.completedDate.split('/')[0])))).sort((a, b) => b - a);
  const locations = Array.from(new Set(allProjects.map(p => p.location)));
  
  const totalAmount = allProjects.reduce((sum, project) => sum + project.totalHelp, 0);
  const totalBeneficiaries = allProjects.reduce((sum, project) => sum + project.beneficiaries, 0);

  return {
    totalProjects: allProjects.length,
    totalAmount, // عدد
    totalBeneficiaries, // عدد
    categories,
    years: years.map(y => y.toString()),
    locations
  };
}

// گرفتن پروژه بر اساس ID
export function getProjectById(id: number): Project | undefined {
  return allProjects.find(project => project.id === id);
}