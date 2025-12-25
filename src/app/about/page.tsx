// app/about/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// کامپوننت BoardMember مخصوص هیئت مدیره
function BoardMember({ member }: {
  member: {
    id: string;
    name: string;
    position: string;
    description: string;
    color: string;
    image: string;
  }
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div key={member.id} className="bg-white rounded-lg border border-slate-200 p-4 hover:border-emerald-300 transition-colors">
      <div className="flex items-center gap-3">
        {/* قسمت عکس - فقط برای هیئت مدیره */}
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          {!imageError ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              sizes="48px"
            />
          ) : null}

          {/* آیکون پیش‌فرض اگر عکس خطا داد یا وجود نداشت */}
          <div className={`absolute inset-0 ${imageError ? 'flex' : 'hidden'} items-center justify-center bg-gradient-to-br ${member.color}`}>
            <i className="fas fa-user text-white"></i>
          </div>
        </div>
        <div>
          <div className="font-bold text-slate-900">{member.name}</div>
          <div className="text-sm text-slate-600">{member.position}</div>
        </div>
      </div>
    </div>
  );
}

// کامپوننت TrusteeMember مخصوص هیئت امنا (بدون عکس)
function TrusteeMember({ member }: {
  member: {
    id: string;
    name: string;
    position: string;
    description: string;
    color: string;
  }
}) {
  return (
    <div key={member.id} className="bg-white rounded-lg border border-slate-200 p-4 hover:border-emerald-300 transition-colors">
      <div className="flex items-center gap-3">
        {/* آیکون کاربر برای هیئت امنا */}
        <div className={`w-12 h-12 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center`}>
          <i className="fas fa-user text-white"></i>
        </div>
        <div>
          <div className="font-bold text-slate-900">{member.name}</div>
          <div className="text-sm text-slate-600">{member.position}</div>
        </div>
      </div>
    </div>
  );
}

const teamMembers = [
  {
    id: '1',
    name: 'آقای احسان حائری',
    position: 'رییس هیئت مدیره',
    description: '  ',
    color: 'from-emerald-500 to-emerald-600',
    image: '/images/team/01.jpg'
  },
  {
    id: '2',
    name: 'آقای روح اله تقوی',
    position: 'نایب رییس هیئت مدیره',
    description: 'همکاری در امور اجرایی',
    color: 'from-blue-500 to-blue-600',
    image: '/images/team/2.jpg'
  },
  {
    id: '3',
    name: 'آقای محمد حسین حائری',
    position: 'مدیر عامل و عضو هیئت مدیره',
    description: 'مسئول اجرایی روزانه',
    color: 'from-amber-500 to-amber-600',
    image: '/images/team/3.jpg'
  },
  {
    id: '4',
    name: 'خانم فرخنده مشهدی هاشمی',
    position: 'عضو هیئت مدیره',
    description: 'نظارت بر امور مالی',
    color: 'from-purple-500 to-purple-600',
    image: '/images/team/4.jpg'
  },
  {
    id: '5',
    name: 'آقای عباس جان دانه',
    position: 'عضو هیئت مدیره',
    description: 'نظارت جایگزین',
    color: 'from-rose-500 to-rose-600',
    image: '/images/team/5.jpg'
  }
];

const teamaMembers = [
  {
    id: 't1',
    name: ' خانم فرخنده مشهدی هاشمی',
    position: "عضو هیئت امنا",
    description: 'عضو هیئت امنا',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 't2',
    name: 'آقای محمد صادق جعفری',
    position: "عضو هیئت امنا",
    description: 'عضو هیئت امنا',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 't3',
    name: 'آقای احمد کردجزی',
    position: "عضو هیئت امنا",
    description: 'عضو هیئت امنا',
    color: 'from-amber-500 to-amber-600'
  },
  {
    id: 't4',
    name: 'خانم زینب صفر محجری',
    position: "عضو هیئت امنا",
    description: 'عضو هیئت امنا',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 't5',
    name: 'آقای محمد صابر جعفری',
    position: "عضو هیئت امنا",
    description: 'عضو هیئت امنا',
    color: 'from-rose-500 to-rose-600'
  },
  {
    id: 't6',
    name: 'آقای عباس جان دانه',
    position: "عضو هیئت امنا",
    description: 'عضو هیئت امنا',
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 't7',
    name: 'آقای حسن برجبان',
    position: "عضو هیئت امنا",
    description: 'عضو هیئت امنا',
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 't8',
    name: 'آقای سید مجتی نادعلی',
    position: "عضو هیئت امنا",
    description: 'عضو هیئت امنا',
    color: 'from-teal-500 to-teal-600'
  },
  {
    id: 't9',
    name: 'خانم نرجس مددیان',
    position: "عضو هیئت امنا",
    description: 'عضو هیئت امنا',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 't10',
    name: 'آقای مهدی معارفوند',
    position: "عضو هیئت امنا",
    description: 'عضو هیئت امنا',
    color: 'from-red-500 to-red-600'
  },
  {
    id: 't11',
    name: 'آقای حسین یزدی',
    position: "عضو هیئت امنا",
    description: 'عضو هیئت امنا',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 't12',
    name: 'آقای هادی توحیدی مهر',
    position: "عضو هیئت امنا",
    description: 'عضو هیئت امنا',
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    id: 't13',
    name: 'آقای احسان حائری',
    position: "عضو هیئت امنا",
    description: 'عضو هیئت امنا',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 't14',
    name: 'آقای روح اله تقوی',
    position: "عضو هیئت امنا",
    description: 'عضو هیئت امنا',
    color: 'from-lime-500 to-lime-600'
  },
  {
    id: 't15',
    name: 'آقای سید محمد رضوی زاده',
    position: "عضو هیئت امنا",
    description: 'عضو هیئت امنا',
    color: 'from-fuchsia-500 to-fuchsia-600'
  },
  {
    id: 't16',
    name: 'آقای محمد حسین حائری',
    position: "عضو هیئت امنا",
    description: 'عضو هیئت امنا',
    color: 'from-sky-500 to-sky-600'
  },
  {
    id: 't17',
    name: ' خانم خدیجه حسن زاده',
    position: "عضو هیئت امنا",
    description: 'عضو هیئت امنا',
    color: 'from-violet-500 to-violet-600'
  }
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('about');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText('9338905519')
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('خطا در کپی کردن: ', err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* هیرو صفحه درباره ما */}
      <section className="relative py-12 bg-gradient-to-br from-emerald-900 to-emerald-800">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-white hover:text-amber-300 transition-colors"
            >
              <i className="fas fa-arrow-right"></i>
              بازگشت به صفحه اصلی
            </Link>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                <i className="fas fa-certificate text-white text-2xl"></i>
              </div>
              <div className="text-right">
                <h1 className="text-2xl lg:text-3xl font-bold text-white">درباره مؤسسه</h1>
                <p className="text-amber-300 text-lg">آرام دلها _ یاران مهدی موعود (عج)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* تب‌های اطلاعات */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* تب‌ها */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: 'about', label: 'درباره مؤسسه' },
                { id: 'team', label: 'هیئت مدیره' },
                { id: 'ateam', label: 'هیئت امنا' },
                { id: 'contact', label: 'تماس با ما' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm ${activeTab === tab.id
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-300 hover:border-emerald-400'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* محتوای تب‌ها */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">درباره مؤسسه</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-slate-700 leading-relaxed mb-4">
                        مؤسسه خیریه «آرام دلها» در سال ۱۳۹۸
                        با دریافت پروانه رسمی از سازمان بهزیستی کشور تأسیس شد.
                      </p>
                      <p className="text-slate-700 leading-relaxed">
                        این مؤسسه با تکیه بر اصول اسلامی و ارزش‌های انسانی،
                        در طول ۵ سال فعالیت خود موفق به برگزاری ۲۵۴ پویش خیریه شده است.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-xl p-6">
                      <h3 className="font-bold text-slate-900 mb-3">آدرس مؤسسه</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <i className="fas fa-map-marker-alt text-emerald-600 mt-1"></i>
                          <div>
                            <div className="font-medium text-slate-900">بلوار امام رضا (ع) ، مجتمع تجاری فردوس</div>
                            <div className="text-slate-600">طبقه منفی یک ، واحد ۸۶</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* اهداف مؤسسه */}
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    {[
                      { icon: 'fas fa-heart', title: 'کمک به نیازمندان', desc: 'شناسایی و کمک به نیازمندان واقعی' },
                      { icon: 'fas fa-hand-holding-usd', title: 'شفافیت مالی', desc: 'گزارش کامل از محل هزینه کرد کمک‌ها' },
                      { icon: 'fas fa-users', title: 'جامعه‌سازی', desc: 'ایجاد شبکه نیکوکاری آگاه و مسئول' }
                    ].map((goal, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4 border border-slate-200 hover:border-emerald-300 transition-all duration-300">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white mb-3">
                          <i className={goal.icon}></i>
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2">{goal.title}</h4>
                        <p className="text-slate-600 text-sm">{goal.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'team' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900">هیئت مدیره</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {teamMembers.map((member) => (
                      <BoardMember key={member.id} member={member} />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'ateam' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900">هیئت امنا</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {teamaMembers.map((member) => (
                      <TrusteeMember key={member.id} member={member} />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900">تماس با مؤسسه</h2>

                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h3 className="font-bold text-slate-900 mb-3">اطلاعات تماس</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded flex items-center justify-center">
                            <i className="fas fa-map-marker-alt"></i>
                          </div>
                          <div>
                            <div className="text-sm text-slate-600">آدرس</div>
                            <div className="text-slate-900">بلوار امام رضا (ع) ، مجتمع تجاری فردوس ، طبقه منفی یک ، واحد ۸۶</div>
                          </div>
                        </div>

                        {/* بخش پیام‌رسان ایتا */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 flex items-center justify-center">
                            {/* لوگوی ایتا بدون بک‌گراند */}
                            <div className="w-6 h-6 flex items-center justify-center">
                              <Image
                                src="/images/logo/eita-logo.png" // مسیر لوگوی ایتا
                                alt="پیام‌رسان ایتا"
                                width={24}
                                height={24}
                                className="object-contain"
                                onError={(e) => {
                                  // fallback اگر تصویر لود نشد
                                  const target = e.currentTarget as HTMLImageElement;
                                  target.style.display = 'none';
                                  const parent = target.parentElement;
                                  if (parent) {
                                    parent.innerHTML = '<i class="fas fa-comment text-blue-600 text-lg"></i>';
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <div className="relative">
                            <div className="text-sm text-slate-600">پیام‌رسان ایتا</div>
                            <button
                              onClick={copyToClipboard}
                              className="text-slate-900 hover:text-blue-600 transition-colors font-medium text-right"
                            >
                              ۰۹۳۳۸۹۰۵۵۱۹
                              {copied && (
                                <span className="absolute right-0 -top-8 bg-green-100 text-green-800 text-xs py-1 px-2 rounded shadow">
                                  کپی شد!
                                </span>
                              )}
                            </button>
                            <div className="text-xs text-slate-500 mt-1">
                              در پیام رسان ایتا با ما در ارتباط باشید
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded flex items-center justify-center">
                            <i className="fas fa-clock"></i>
                          </div>
                          <div>
                            <div className="text-sm text-slate-600">ساعات کاری</div>
                            <div className="text-slate-900">شنبه تا چهارشنبه: ۸:۰۰ - ۱۶:۰۰</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}