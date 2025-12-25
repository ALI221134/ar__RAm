export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  completedDate: string;
  totalHelp: number;
  beneficiaries: number;
  location: string;
  icon: string;
  color: string;
  gradient: string;
  hasGallery?: boolean;
  imageUrl?: string;
  sponsors?: string[];
}