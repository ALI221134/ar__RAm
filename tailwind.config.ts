/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',      // موبایل: 320px-767px
      'md': '768px',      // تبلت: 768px-1023px
      'lg': '1024px',     // دسکتاپ: 1024px به بالا
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        vazir: ['Vazirmatn', 'sans-serif'],
      },
      fontSize: {
        'h1': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['2.25rem', { lineHeight: '1.3', fontWeight: '700' }],
        'h3': ['1.875rem', { lineHeight: '1.4', fontWeight: '700' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',    // آبی اصلی (#2563eb)
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',    // نارنجی انرژی (#f97316)
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#f59e0b',    // طلایی (#f59e0b)
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        neutral: {
          bg: '#f8fafc',     // پس‌زمینه روشن
          text: '#1e293b',   // متن مشکی متمایل به آبی
          border: '#e2e8f0', // بوردرها
        }
      },
      spacing: {
        'section': '2rem',   // فاصله بین سکشن‌ها در دسکتاپ
        'section-mobile': '1.5rem', // فاصله در موبایل
      },
      animation: {
        'count-up': 'countUp 2s ease-out forwards',
        'progress-fill': 'progressFill 2s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        countUp: {
          '0%': { 
            content: 'attr(data-start)',
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            content: 'attr(data-end)',
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 10px 30px rgba(0, 0, 0, 0.12)',
        'button': '0 4px 14px rgba(0, 0, 0, 0.1)',
        'button-hover': '0 6px 20px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}