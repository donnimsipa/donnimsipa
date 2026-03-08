<script lang="ts">
  import type { ProjectSummary } from '$lib/types/project';
  import { formatDate } from '$lib/utils/projects';

  let {
    project
  }: {
    project: ProjectSummary;
  } = $props();

  const m = $derived(project.metadata);

  const categoryColors: Record<string, string> = {
    'Backend Infrastructure': 'from-teal-500 to-cyan-500',
    'API Development': 'from-violet-500 to-purple-500',
    'System Integration': 'from-orange-500 to-amber-500',
    'Data Engineering': 'from-blue-500 to-indigo-500'
  };
  const catGradient = $derived(categoryColors[m.category] || 'from-primary-500 to-accent-500');
</script>

<a
  href="/case-studies/{m.slug}"
  id="project-card-{m.slug}"
  class="group relative flex flex-col gap-4 glass-card-hover p-5 sm:p-6 no-underline text-inherit transition-all duration-300 hover:-translate-y-1"
>
  <!-- Featured ribbon -->
  {#if m.featured}
    <div class="absolute top-4 right-4">
      <span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700/40 uppercase tracking-wide">
        <span class="i-lucide-star text-xs"></span> Featured
      </span>
    </div>
  {/if}

  <!-- Category badge -->
  <div>
    <span class="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r {catGradient} text-white">
      {m.category}
    </span>
  </div>

  <!-- Title -->
  <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors pr-12">
    {m.title}
  </h3>

  <!-- Description -->
  <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
    {m.description}
  </p>

  <!-- Tech stack badges (first 5) -->
  <div class="flex flex-wrap gap-1.5">
    {#each m.stack.slice(0, 5) as tech}
      <span class="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-600/40">
        {tech}
      </span>
    {/each}
    {#if m.stack.length > 5}
      <span class="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-600/40 text-slate-500 dark:text-slate-400">
        +{m.stack.length - 5} more
      </span>
    {/if}
  </div>

  <!-- Tags -->
  <div class="flex flex-wrap gap-1.5">
    {#each m.tags.slice(0, 4) as tag}
      <span class="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-700/30">
        <span class="i-lucide-tag text-xs"></span>
        {tag}
      </span>
    {/each}
  </div>

  <!-- Meta row -->
  <div class="flex items-center justify-between pt-1 border-t border-slate-200/40 dark:border-slate-700/30">
    <div class="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
      <span class="inline-flex items-center gap-1">
        <span class="i-lucide-calendar text-xs"></span>
        {formatDate(m.date)}
      </span>
      <span class="inline-flex items-center gap-1">
        <span class="i-lucide-clock text-xs"></span>
        {m.readTime ?? 5} min read
      </span>
    </div>
    <span class="i-lucide-arrow-right text-base text-slate-300 dark:text-slate-600 group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all duration-200"></span>
  </div>
</a>
