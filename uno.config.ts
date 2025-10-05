import { defineConfig, presetUno, presetIcons, presetTypography } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.1
    }),
    presetTypography()
  ],
  theme: {
    colors: {
      primary: '#0ea5a4',
      primaryDark: '#0b5e57',
      surface: '#eef1f6'
    },
    boxShadow: {
      soft: '0 18px 35px -22px rgba(15, 118, 110, 0.35)'
    }
  },
  shortcuts: {
    'page-container':
      'max-w-6xl mx-auto w-full px-3 sm:px-5 md:px-8 lg:px-10 box-border',
    'card':
      'rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-white/40 dark:border-slate-700/50 shadow-soft backdrop-blur-sm',
    'section-title':
      'text-xl md:text-2xl font-semibold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2',
    'subtle-text': 'text-sm text-slate-500 dark:text-slate-400',
    'pill-link':
      'inline-flex items-center gap-1 rounded-full border border-primary/30 text-primary dark:text-teal-200 hover:bg-primary/10 hover:text-primaryDark dark:hover:bg-teal-400/20 transition-colors px-3 py-1 text-sm font-medium'
  },
  safelist: [
    'bg-gradient-to-b',
    'from-white/90',
    'to-slate-100/90',
    'dark:from-slate-950/95',
    'dark:to-slate-900/95',
    'backdrop-blur-lg',
    'i-lucide-home',
    'i-lucide-terminal',
    'i-lucide-server-cog',
    'i-lucide-shield-check',
    'i-lucide-moon-star',
    'i-lucide-sun'
  ]
});
