export interface Sponsor {
  id: number;
  name: string;
  type: 'فردی' | 'شرکتی' | 'سازمانی';
  joinDate: string;
  description: string;
  logo?: string;
  website?: string;
  phone?: string;
  email?: string;
  totalDonation?: string;
  projects: number[];
}
//حامیان
export const sponsors: Sponsor[] = [
  {
    id: 1,
    name: ' درمانگاه امام صادق علیه السلام',
    type: 'سازمانی',
    joinDate: '1402/03/09',
    description: 'حامی اصلی پویش‌های درمانی و رادیولوژی + آزمایشگاه',
    logo: '/images/sponsors/emamsadegh.jpg',
    website: ' https://clinicemehresadegh.ir',
    phone: '021-55683620',
   // email: ' ',
    totalDonation: ' 250+ میلیون ریال ',
    projects: []
  },
  {
    id: 2,
    name: ' داروخانه دکتر شریعت',
    type: 'سازمانی',
    joinDate: '1402/08/20',
    description: 'حامی اصلی پویش‌های درمانی و توزیع دارو',
    totalDonation: '130+ میلیون ریال',
    phone: '025-36611835',
    projects: []
  }
];

export function getSponsors() {
  return sponsors;
}