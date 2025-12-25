"use client";

import { Sponsor } from '@/data/sponsors';

interface SponsorsGridProps {
  sponsors: Sponsor[];
}

export default function SponsorsGrid({ sponsors }: SponsorsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sponsors.map((sponsor) => (
        <div key={sponsor.id} className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          {/* هدر کارت */}
          <div className={`h-2 ${
            sponsor.type === 'فردی' ? 'bg-purple-500' :
            sponsor.type === 'شرکتی' ? 'bg-amber-500' :
            'bg-blue-500'
          }`}></div>
          
          <div className="p-6">
            {/* لوگو/آیکون */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center">
                {sponsor.logo ? (
                  <img 
                    src={sponsor.logo} 
                    alt={`لوگوی ${sponsor.name}`}
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  <i className="fas fa-handshake text-2xl text-slate-600"></i>
                )}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                sponsor.type === 'فردی' ? 'bg-purple-100 text-purple-700' :
                sponsor.type === 'شرکتی' ? 'bg-amber-100 text-amber-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {sponsor.type}
              </span>
            </div>
            
            {/* نام و توضیحات */}
            <h3 className="text-lg font-bold text-slate-900 mb-2">{sponsor.name}</h3>
            <p className="text-slate-600 text-sm mb-4">{sponsor.description}</p>
            
            {/* اطلاعات */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <i className="fas fa-calendar-alt"></i>
                <span>عضویت از: {sponsor.joinDate}</span>
              </div>
              
              {sponsor.totalDonation && (
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <i className="fas fa-hand-holding-usd"></i>
                  <span>مجموع کمک: {sponsor.totalDonation}</span>
                </div>
              )}
              
              {sponsor.projects && sponsor.projects.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <i className="fas fa-project-diagram"></i>
                  <span>{sponsor.projects.length} پروژه حمایت شده</span>
                </div>
              )}
            </div>
            
            {/* اطلاعات تماس */}
            {(sponsor.phone || sponsor.email || sponsor.website) && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="space-y-1">
                  {sponsor.phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <i className="fas fa-phone"></i>
                      <span>{sponsor.phone}</span>
                    </div>
                  )}
                  {sponsor.email && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <i className="fas fa-envelope"></i>
                      <span>{sponsor.email}</span>
                    </div>
                  )}
                  {sponsor.website && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <i className="fas fa-globe"></i>
                      <span>{sponsor.website}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}