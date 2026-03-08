<script lang="ts">
  import type { PageData } from './$types';
  import { filterProjects } from '$lib/utils/projects';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import ProjectFilter from '$lib/components/ProjectFilter.svelte';
  import { onMount } from 'svelte';

  import { page } from '$app/stores';
  let { data }: { data: PageData } = $props();
  const d = $derived($page.data.meta || {});
  const s = $derived($page.data.meta?.sections || {});

  // Filter/sort state
  let search = $state('');
  let selectedCategory = $state('');
  let selectedTags = $state<string[]>([]);
  let sort = $state<'date' | 'featured' | 'title'>('date');
  let viewMode = $state<'grid' | 'list'>('grid');

  // Parse URL params on mount (e.g., from tag links in project pages)
  onMount(() => {
    const url = new URL(window.location.href);
    const tagParam = url.searchParams.get('tag');
    if (tagParam) selectedTags = [tagParam];
    const catParam = url.searchParams.get('category');
    if (catParam) selectedCategory = catParam;
  });

  const filtered = $derived(
    filterProjects(data.projects, {
      search,
      category: selectedCategory,
      tags: selectedTags,
      sort
    })
  );

  // Scroll reveal
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal-section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>Technical Case Studies — Donni Maulana Sipa</title>
  <meta
    name="description"
    content="{s.case_studies_description || 'Technical case studies and engineering deep dives.'} — by {d.name}"
  />
  <meta property="og:title" content="Technical Case Studies — Donni Maulana Sipa" />
  <meta
    property="og:description"
    content={s.case_studies_description || "Technical case studies and engineering deep dives."}
  />
</svelte:head>

<div class="page-container py-8 md:py-12">
  <div class="flex flex-col gap-8 md:gap-12">

    <!-- ═══ HERO ═══ -->
    <section class="reveal-section relative overflow-hidden rounded-3xl p-7 sm:p-9 md:p-12">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-slate-800/80 dark:via-slate-900/90 dark:to-slate-800/60 rounded-3xl"></div>
      <div class="absolute inset-0 border border-white/50 dark:border-slate-700/30 rounded-3xl"></div>
      <div class="absolute -top-20 -right-20 w-72 h-72 bg-primary-300/15 dark:bg-primary-500/8 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-16 -left-16 w-56 h-56 bg-accent-300/12 dark:bg-accent-500/6 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative space-y-5">
        <div class="section-label">
          <span class="i-lucide-book-open text-sm"></span>
          {s.case_studies || "Technical Case Studies"}
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-[3.25rem] leading-tight font-extrabold text-slate-900 dark:text-white max-w-3xl">
          {s.case_studies_headline || "Technical Case Studies"}
        </h1>
        <p class="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          {s.case_studies_description || "Technical deep dives into production-grade systems and real-world integration challenges."}
        </p>

        <!-- Stats row -->
        <div class="flex flex-wrap gap-6 pt-2">
          {#each [
            { icon: 'i-lucide-folder-open', value: data.projects.length, label: 'Case Studies' },
            { icon: 'i-lucide-tag', value: data.tags.length, label: 'Technologies' },
            { icon: 'i-lucide-layers', value: data.categories.length, label: 'Categories' }
          ] as stat}
            <div class="flex items-center gap-2">
              <span class="{stat.icon} text-primary-500 text-base"></span>
              <span class="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{stat.value}</span>
              <span class="text-sm text-slate-500 dark:text-slate-400">{stat.label}</span>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- ═══ FILTER ═══ -->
    <section class="reveal-section">
      <ProjectFilter
        tags={data.tags}
        categories={data.categories}
        bind:search
        bind:selectedCategory
        bind:selectedTags
        bind:sort
        bind:viewMode
        totalCount={data.projects.length}
        filteredCount={filtered.length}
      />
    </section>

    <!-- ═══ RESULTS ═══ -->
    <section class="reveal-section">
      {#if filtered.length === 0}
        <!-- Empty state -->
        <div class="glass-card p-12 text-center space-y-4">
          <span class="i-lucide-search text-4xl text-slate-300 dark:text-slate-600 block mx-auto"></span>
          <h3 class="text-lg font-semibold text-slate-600 dark:text-slate-400">No results found</h3>
          <p class="text-sm text-slate-500 dark:text-slate-500 max-w-sm mx-auto">
            Try adjusting your search or removing some filters to see more case studies.
          </p>
        </div>
      {:else if viewMode === 'grid'}
        <div class="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {#each filtered as project (project.metadata.slug)}
            <ProjectCard {project} />
          {/each}
        </div>
      {:else}
        <!-- List view -->
        <div class="flex flex-col gap-3">
          {#each filtered as project (project.metadata.slug)}
            <a
              href="/case-studies/{project.metadata.slug}"
              class="group glass-card-hover p-5 flex flex-col sm:flex-row sm:items-center gap-4 no-underline text-inherit transition-all duration-300 hover:-translate-y-0.5"
            >
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1 flex-wrap">
                  {#if project.metadata.featured}
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700/40">
                      ★ Featured
                    </span>
                  {/if}
                  <span class="text-xs text-slate-500 dark:text-slate-500">{project.metadata.category}</span>
                </div>
                <h3 class="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                  {project.metadata.title}
                </h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{project.metadata.description}</p>
              </div>
              <div class="flex items-center gap-4 shrink-0">
                <div class="flex flex-wrap gap-1 max-w-[200px]">
                  {#each project.metadata.stack.slice(0, 3) as tech}
                    <span class="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400">{tech}</span>
                  {/each}
                </div>
                <span class="i-lucide-arrow-right text-slate-300 dark:text-slate-600 group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all"></span>
              </div>
            </a>
          {/each}
        </div>
      {/if}
    </section>

  </div>
</div>
