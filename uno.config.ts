import {
  defineConfig,
  presetUno,
  presetIcons,
  presetTypography,
  presetWebFonts,
  transformerDirectives
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: {
          name: 'Inter',
          weights: [300, 400, 500, 600, 700, 800]
        },
        mono: 'JetBrains Mono'
      }
    })
  ],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#14b8a6',
        50: '#f0fdfa',
        100: '#ccfbf1',
        200: '#99f6e4',
        300: '#5eead4',
        400: '#2dd4bf',
        500: '#14b8a6',
        600: '#0d9488',
        700: '#0f766e',
        800: '#115e59',
        900: '#134e4a'
      },
      accent: {
        DEFAULT: '#8b5cf6',
        50: '#f5f3ff',
        100: '#ede9fe',
        200: '#ddd6fe',
        300: '#c4b5fd',
        400: '#a78bfa',
        500: '#8b5cf6',
        600: '#7c3aed'
      },
      surface: {
        light: '#f8fafc',
        DEFAULT: '#f1f5f9',
        dark: '#0f172a'
      }
    },
    boxShadow: {
      glass: '0 8px 32px rgba(0, 0, 0, 0.08)',
      'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.3)',
      glow: '0 0 40px rgba(20, 184, 166, 0.15)',
      'glow-accent': '0 0 40px rgba(139, 92, 246, 0.12)',
      soft: '0 4px 24px -4px rgba(0, 0, 0, 0.08)',
      card: '0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.06)'
    },
    animation: {
      keyframes: {
        'fade-in-up': '{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}',
        'fade-in': '{from{opacity:0}to{opacity:1}}',
        shimmer: '{0%{background-position:-200% 0}100%{background-position:200% 0}}',
        float: '{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}',
        'gradient-x': '{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}'
      },
      durations: {
        'fade-in-up': '0.6s',
        'fade-in': '0.4s',
        shimmer: '3s',
        float: '3s',
        'gradient-x': '6s'
      },
      timingFns: {
        'fade-in-up': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'ease-out',
        shimmer: 'linear',
        float: 'ease-in-out',
        'gradient-x': 'ease'
      },
      counts: {
        shimmer: 'infinite',
        float: 'infinite',
        'gradient-x': 'infinite'
      }
    }
  },
  shortcuts: {
    'page-container':
      'max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 box-border',
    'glass-card':
      'rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-white/60 dark:border-slate-700/40 shadow-card backdrop-blur-xl',
    'glass-card-hover':
      'rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-white/60 dark:border-slate-700/40 shadow-card backdrop-blur-xl hover:shadow-glass hover:border-primary-200/60 dark:hover:border-primary-500/30 transition-all duration-300',
    'section-title':
      'text-2xl md:text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100',
    'subtle-text': 'text-sm text-slate-500 dark:text-slate-400',
    'pill-link':
      'inline-flex items-center gap-1.5 rounded-full border border-primary-300/40 dark:border-primary-500/30 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:border-primary-400/60 dark:hover:border-primary-400/50 transition-all duration-200 px-4 py-1.5 text-sm font-medium',
    'skill-tag':
      'inline-flex items-center rounded-lg bg-slate-100/80 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 px-3 py-1.5 text-sm font-medium border border-slate-200/60 dark:border-slate-600/40 transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-700 dark:hover:text-primary-300 hover:border-primary-300/50',
    'gradient-text':
      'bg-gradient-to-r from-primary-500 via-primary-400 to-accent-500 bg-clip-text text-transparent',
    'section-label':
      'inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary-600 dark:text-primary-400'
  },
  safelist: [
    'i-lucide-mail',
    'i-lucide-linkedin',
    'i-lucide-globe',
    'i-lucide-download',
    'i-lucide-briefcase',
    'i-lucide-folder-open',
    'i-lucide-award',
    'i-lucide-cpu',
    'i-lucide-heart-pulse',
    'i-lucide-user',
    'i-lucide-moon',
    'i-lucide-sun',
    'i-lucide-arrow-up-right',
    'i-lucide-chevron-right',
    'i-lucide-sparkles',
    'i-lucide-terminal',
    'i-lucide-external-link',
    'i-lucide-github',
    'i-lucide-circle-dot'
  ]
});
