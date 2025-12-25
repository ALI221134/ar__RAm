// data/financialData.ts - نسخه اصلاح شده
export type FinancialYear = {
  year: string;
  donors: number;
  totalReceived: number;
  totalPaid: number;
  adminCost: number;
  monthlyFamilies?: { start?: number; end: number };
  weeklyCases?: number;
  campaigns?: number;
  documents: {
    id: number;
    title: string;
    type: 'pdf' | 'image';
    url: string;
  }[];
  breakdown: {
    [category: string]: number;
  };
  trend: {
    month: string;
    received: number; // ریال
    paid: number; // ریال
  }[];
};

export const financialData: FinancialYear[] = [
  {
    year: '1401',
    donors: 178,
    totalReceived: 2875930000, // ریال
    totalPaid: 2873704500, // ریال
    adminCost: 13000000, // ریال
    monthlyFamilies: { start: 40, end: 50 },
    weeklyCases: 11,
    documents: [
      { id: 1, title: 'گزارش کامل مالی 1401', type: 'image', url: '/docs/1401-receipts.jpg' },
//      { id: 2, title: 'صورت‌های مالی تایید شده', type: 'pdf', url: '/docs/1401-audit.pdf' },
//      { id: 3, title: 'نمونه اسناد هزینه‌ها', type: 'image', url: '/docs/1401-receipts.jpg' }
    ],
    breakdown: {
      'کمک نقدی': 835000000,
      'درمانی': 633000000,
      'معیشتی': 477000000,
      'اجاره منزل': 370000000,
      'تحصیلی': 270000000,
      'جهیزیه': 120000000,
      'پوشاک': 90000000,
      'لوازم منزل': 50000000,
      'غذای گرم': 30000000,
      'اداری': 13000000
    },
    trend: [
      { month: 'فروردین', received: 180000000, paid: 150000000 },
      { month: 'اردیبهشت', received: 220000000, paid: 210000000 },
      { month: 'خرداد', received: 190000000, paid: 180000000 },
      { month: 'تیر', received: 250000000, paid: 230000000 },
      { month: 'مرداد', received: 280000000, paid: 260000000 },
      { month: 'شهریور', received: 300000000, paid: 290000000 },
      { month: 'مهر', received: 320000000, paid: 310000000 },
      { month: 'آبان', received: 350000000, paid: 330000000 },
      { month: 'آذر', received: 380000000, paid: 370000000 },
      { month: 'دی', received: 400000000, paid: 390000000 },
      { month: 'بهمن', received: 420000000, paid: 410000000 },
      { month: 'اسفند', received: 450000000, paid: 440000000 }
    ]
  },
  {
    year: '1402',
    donors: 206,
    totalReceived: 12633642392, // ریال
    totalPaid: 12727664252, // ریال
    adminCost: 13000000, // ریال
    monthlyFamilies: { start: 50, end: 55 },
    weeklyCases: 40,
    documents: [
      { id: 1, title: 'گزارش مالی سالانه 1402', type: 'image', url: '/docs/1402-payments.jpg' },
//      { id: 2, title: 'گزارش حسابرسی مستقل', type: 'pdf', url: '/docs/1402-audit.pdf' },
//      { id: 3, title: 'تصاویر اسناد پرداختی', type: 'image', url: '/docs/1402-payments.jpg' }
    ],
    breakdown: {
      'کمک‌های مالی': 3309732000,
      'درمانی': 2663364000,
      'معیشتی': 1602025000,
      'اجاره منزل': 1272764000,
      'تحصیلی': 1163384000,
      'جهیزیه': 1033452000,
      'پوشاک': 645384000,
      'لوازم منزل': 645384000,
      'فرهنگی': 387224000,
      'اداری': 13000000
    },
    trend: [
      { month: 'فروردین', received: 850000000, paid: 820000000 },
      { month: 'اردیبهشت', received: 920000000, paid: 890000000 },
      { month: 'خرداد', received: 980000000, paid: 950000000 },
      { month: 'تیر', received: 1050000000, paid: 1020000000 },
      { month: 'مرداد', received: 1100000000, paid: 1070000000 },
      { month: 'شهریور', received: 1150000000, paid: 1120000000 },
      { month: 'مهر', received: 1250000000, paid: 1220000000 },
      { month: 'آبان', received: 1350000000, paid: 1320000000 },
      { month: 'آذر', received: 1450000000, paid: 1420000000 },
      { month: 'دی', received: 1550000000, paid: 1520000000 },
      { month: 'بهمن', received: 1650000000, paid: 1620000000 },
      { month: 'اسفند', received: 1750000000, paid: 1720000000 }
    ]
  },
  {
    year: '1403',
    donors: 418,
    totalReceived: 20941000000, // ریال
    totalPaid: 19901000000, // ریال
    adminCost: 601000000, // ریال
    monthlyFamilies: { end: 51 },
    weeklyCases: 46,
    campaigns: 17,
    documents: [
      { id: 1, title: 'گزارش جامع مالی 1403', type: 'image', url: '/docs/1403-payments.jpg' },
//      { id: 2, title: 'اسناد حسابرسی شده', type: 'pdf', url: '/docs/1403-audit.pdf' },
//     { id: 3, title: 'گزارش تفصیلی هزینه‌ها', type: 'pdf', url: '/docs/1403-details.pdf' }
    ],
    breakdown: {
      'کمک مسکن': 8714000000,
      'کمک درمان': 5913000000,
      'کمک تسویه دیون': 1639000000,
      'کمک معیشت': 1069000000,
      'کمک جهیزیه': 1052000000,
      'کمک تعمیرات منزل': 307000000,
      'کمک لوازم منزل': 261000000,
      'کمک ازدواج': 230000000,
      'کمک تحصیلی': 220000000,
      'کمک اشتغال': 183000000,
      'بسته‌های ارزان': 166000000,
      'اداری': 601000000
    },
    trend: [
      { month: 'فروردین', received: 1400000000, paid: 1300000000 },
      { month: 'اردیبهشت', received: 1500000000, paid: 1400000000 },
      { month: 'خرداد', received: 1600000000, paid: 1500000000 },
      { month: 'تیر', received: 1700000000, paid: 1600000000 },
      { month: 'مرداد', received: 1800000000, paid: 1700000000 },
      { month: 'شهریور', received: 1900000000, paid: 1800000000 },
      { month: 'مهر', received: 2000000000, paid: 1900000000 },
      { month: 'آبان', received: 2100000000, paid: 2000000000 },
      { month: 'آذر', received: 2200000000, paid: 2100000000 },
      { month: 'دی', received: 2300000000, paid: 2200000000 },
      { month: 'بهمن', received: 2400000000, paid: 2300000000 },
      { month: 'اسفند', received: 2500000000, paid: 2400000000 }
    ]
  },
//  {
//    year: '1404',
//    donors: 418,
//    totalReceived: 100000000, // ریال
//    totalPaid: 90000000, // ریال
//    adminCost: 601000000, // ریال
//    monthlyFamilies: { end: 51 },
//    weeklyCases: 46,
//    campaigns: 17,
//    documents: [
//      { id: 1, title: 'گزارش جامع مالی 1403', type: 'image', url: '/docs/1404-payments.jpg' },
//      { id: 2, title: 'اسناد حسابرسی شده', type: 'image', url: '/docs/1404-details.jpg' },
//    { id: 3, title: 'گزارش تفصیلی هزینه‌ها', type: 'pdf', url: '/docs/1403-details.pdf' }
//    ],
//    breakdown: {
//      'کمک مسکن': 8714000000,
//      'کمک درمان': 5913000000,
//      'کمک تسویه دیون': 1639000000,
//      'کمک معیشت': 1069000000,
//      'کمک جهیزیه': 1052000000,
//      'کمک تعمیرات منزل': 307000000,
//      'کمک لوازم منزل': 261000000,
//      'کمک ازدواج': 230000000,
//      'کمک تحصیلی': 220000000,
//      'کمک اشتغال': 183000000,
//      'بسته‌های ارزان': 166000000,
//      'اداری': 601000000
//    },
//    trend: [
 //     { month: 'فروردین', received: 1400000000, paid: 1300000000 },
 //     { month: 'اردیبهشت', received: 1500000000, paid: 1400000000 },
 //     { month: 'خرداد', received: 1600000000, paid: 1500000000 },
 //     { month: 'تیر', received: 1700000000, paid: 1600000000 },
 //     { month: 'مرداد', received: 1800000000, paid: 1700000000 },
 //     { month: 'شهریور', received: 1900000000, paid: 1800000000 },
 //     { month: 'مهر', received: 2000000000, paid: 1900000000 },
 //     { month: 'آبان', received: 2100000000, paid: 2000000000 },
 //     { month: 'آذر', received: 2200000000, paid: 2100000000 },
 //     { month: 'دی', received: 2300000000, paid: 2200000000 },
 //     { month: 'بهمن', received: 2400000000, paid: 2300000000 },
 //     { month: 'اسفند', received: 2500000000, paid: 2400000000 }
//    ]
//  }
];