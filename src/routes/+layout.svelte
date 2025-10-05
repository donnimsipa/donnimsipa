<script>
  import 'uno.css';
  import '../app.css';

  export let data;
  const siteName = data.meta?.siteName || 'Portfolio';

  let dark = true;
  const baseToggleClasses =
    'inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full border transition-colors duration-150 box-border';
  $: themeToggleClasses = dark
    ? 'border-slate-600/70 bg-slate-50/10 text-slate-100 hover:bg-slate-50/20'
    : 'border-slate-300/60 bg-white text-slate-800 hover:bg-slate-100';

  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('theme');
    if (saved) dark = saved === 'dark';
    updateTheme();
  }

  function toggleTheme() {
    dark = !dark;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    }
    updateTheme();
  }

  function updateTheme() {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', dark);
    }
  }

</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{data.meta?.title || 'Portfolio'}</title>
  <meta name="description" content={data.meta?.description || ''} />
  <meta property="og:title" content={data.meta?.title || 'Portfolio'} />
  <meta property="og:description" content={data.meta?.description || ''} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={data.meta?.siteName || ''} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="theme-color" content="#0ea5a4" />
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
  <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.json" />
</svelte:head>

<div
  class="min-h-screen flex flex-col bg-gradient-to-b from-white/90 to-slate-100/90 dark:from-slate-950/95 dark:to-slate-900/95 text-slate-900 dark:text-slate-100 transition-colors duration-200 overflow-x-hidden"
>
  <header class="w-full border-b border-slate-200/70 dark:border-slate-800/60 backdrop-blur-lg">
    <div class="page-container py-2.5 md:py-4 flex flex-wrap items-center justify-between gap-2.5 md:gap-4">
      <span class="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
        {siteName}
      </span>

      <button
        class={`${baseToggleClasses} ${themeToggleClasses}`}
        on:click={toggleTheme}
        aria-label="Toggle theme"
      >
        {dark ? 'Dark' : 'Light'}
      </button>
    </div>
  </header>

  <main class="flex-1 w-full">
    <div class="page-container py-6 md:py-12">
      <slot />
    </div>
  </main>

  <footer class="border-t border-slate-200/70 dark:border-slate-800/60 py-4 md:py-6">
    <div class="page-container text-sm text-slate-500 dark:text-slate-400 flex flex-col md:flex-row md:items-center gap-2 md:gap-3 md:justify-between text-center md:text-left">
      <div>
        © {new Date().getFullYear()} {data.meta?.name || 'Donni Maulana Sipa'}.
      </div>
    </div>
  </footer>
</div>
