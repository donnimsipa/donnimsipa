<script lang="ts">
  import { onMount } from "svelte";
  import "uno.css";
  import "../app.css";

  let { data, children } = $props();
  const siteName = $derived(data.meta?.siteNavbar || "Portfolio");

  let dark = $state(true);
  let scrolled = $state(false);

  onMount(() => {
    const saved = window.localStorage.getItem("theme");
    if (saved) {
      dark = saved === "dark";
    } else {
      dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    updateTheme();

    const handleScroll = () => {
      scrolled = window.scrollY > 20;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  });

  function toggleTheme() {
    dark = !dark;
    window.localStorage.setItem("theme", dark ? "dark" : "light");
    updateTheme();
  }

  function updateTheme() {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", dark);
    }
  }
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{data.meta?.title || "Portfolio"}</title>
  <meta name="description" content={data.meta?.description || ""} />
  <meta property="og:title" content={data.meta?.title || "Portfolio"} />
  <meta property="og:description" content={data.meta?.description || ""} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={data.meta?.siteName || ""} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="theme-color" content={dark ? "#0f172a" : "#f0fdfa"} />
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link
    rel="icon"
    type="image/png"
    sizes="192x192"
    href="/android-chrome-192x192.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="512x512"
    href="/android-chrome-512x512.png"
  />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.json" />
</svelte:head>

<div class="noise-overlay" aria-hidden="true"></div>

<div
  class="min-h-screen flex flex-col text-slate-900 dark:text-slate-100 transition-colors duration-200 overflow-x-hidden"
>
  <!-- Sticky Navbar -->
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    class:scrolled-nav={scrolled}
  >
    <div class="page-container py-3 md:py-4 flex items-center justify-between">
      <!-- Logo / Site Name -->
      <a href="/" class="flex items-center gap-2.5 group no-underline">
        <div
          class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-sm group-hover:shadow-glow transition-shadow duration-300"
        >
          <span class="text-white font-bold text-sm">D</span>
        </div>
        <span
          class="text-sm font-semibold tracking-wide text-slate-600 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
        >
          {siteName}
        </span>
      </a>

      <!-- Theme Toggle -->
      <button
        onclick={toggleTheme}
        class="relative inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200/60 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/50 backdrop-blur-lg hover:bg-white/80 dark:hover:bg-slate-700/60 hover:border-primary-300/50 dark:hover:border-primary-500/30 transition-all duration-200 cursor-pointer shadow-sm"
        aria-label="Toggle theme"
      >
        {#if dark}
          <span class="i-lucide-moon text-lg text-slate-400 dark:text-slate-300"
          ></span>
        {:else}
          <span class="i-lucide-sun text-lg text-amber-500"></span>
        {/if}
      </button>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-1 w-full pt-16 md:pt-20">
    {@render children()}
  </main>

  <!-- Footer -->
  <footer class="mt-auto border-t border-slate-200/40 dark:border-slate-800/40">
    <div class="page-container py-6 md:py-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div
            class="w-6 h-6 rounded-md bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center"
          >
            <span class="text-white font-bold text-[10px]">D</span>
          </div>
          <span class="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()}
            {data.meta?.name || "Donni Maulana Sipa"}
          </span>
        </div>
        <div
          class="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5"
        >
          <span class="i-lucide-sparkles text-primary-500/60 text-xs"></span>
          Built with SvelteKit & UnoCSS
        </div>
      </div>
    </div>
  </footer>
</div>

<style>
  .scrolled-nav {
    background: rgba(248, 250, 252, 0.75);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border-bottom: 1px solid rgba(226, 232, 240, 0.4);
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.04);
  }
  :global(html.dark) .scrolled-nav {
    background: rgba(15, 23, 42, 0.75);
    border-bottom-color: rgba(51, 65, 85, 0.3);
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  }
</style>
