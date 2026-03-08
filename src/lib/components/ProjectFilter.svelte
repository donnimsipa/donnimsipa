<script lang="ts">
  let {
    tags = [] as string[],
    categories = [] as string[],
    selectedTags = $bindable([] as string[]),
    selectedCategory = $bindable(''),
    search = $bindable(''),
    sort = $bindable('date' as 'date' | 'featured' | 'title'),
    viewMode = $bindable('grid' as 'grid' | 'list'),
    totalCount = 0,
    filteredCount = 0
  } = $props();

  function toggleTag(tag: string) {
    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter((t) => t !== tag);
    } else {
      selectedTags = [...selectedTags, tag];
    }
  }

  function clearAll() {
    search = '';
    selectedCategory = '';
    selectedTags = [];
    sort = 'date';
  }

  const hasFilters = $derived(
    search.trim() !== '' || selectedCategory !== '' || selectedTags.length > 0
  );
</script>

<div class="space-y-4">
  <!-- Top row: search + view toggle + sort -->
  <div class="flex flex-col sm:flex-row gap-3">
    <!-- Search -->
    <div class="relative flex-1">
      <span class="absolute left-3 top-1/2 -translate-y-1/2 i-lucide-search text-slate-400 text-base pointer-events-none"></span>
      <input
        id="project-search"
        type="search"
        placeholder="Search projects, technologies..."
        bind:value={search}
        class="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/70 dark:bg-slate-800/50 border border-white/60 dark:border-slate-700/40 backdrop-blur-xl text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-400/40 dark:focus:ring-primary-500/30 focus:border-primary-300 dark:focus:border-primary-600/50 shadow-card transition-all"
      />
    </div>

    <!-- Sort -->
    <select
      id="project-sort"
      bind:value={sort}
      class="px-3 py-2.5 rounded-xl bg-white/70 dark:bg-slate-800/50 border border-white/60 dark:border-slate-700/40 backdrop-blur-xl text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-400/40 shadow-card cursor-pointer"
      aria-label="Sort projects"
    >
      <option value="date">Latest First</option>
      <option value="featured">Featured First</option>
      <option value="title">A → Z</option>
    </select>

    <!-- Grid / List toggle -->
    <div class="flex rounded-xl overflow-hidden border border-white/60 dark:border-slate-700/40 shadow-card bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl">
      <button
        id="view-grid"
        onclick={() => (viewMode = 'grid')}
        class="px-3 py-2.5 text-base transition-colors {viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-slate-400 hover:text-primary-500'}"
        aria-label="Grid view"
        aria-pressed={viewMode === 'grid'}
      >
        <span class="i-lucide-grid-3x3"></span>
      </button>
      <button
        id="view-list"
        onclick={() => (viewMode = 'list')}
        class="px-3 py-2.5 text-base transition-colors {viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-slate-400 hover:text-primary-500'}"
        aria-label="List view"
        aria-pressed={viewMode === 'list'}
      >
        <span class="i-lucide-list"></span>
      </button>
    </div>
  </div>

  <!-- Category filter -->
  {#if categories.length > 0}
    <div class="flex flex-wrap gap-2 items-center">
      <span class="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 shrink-0">Category</span>
      <button
        onclick={() => (selectedCategory = '')}
        class="text-xs px-3 py-1.5 rounded-full border transition-all {selectedCategory === ''
          ? 'bg-primary-500 text-white border-primary-500'
          : 'border-slate-200/60 dark:border-slate-600/40 text-slate-600 dark:text-slate-400 hover:border-primary-300 dark:hover:border-primary-600/50'}"
      >
        All
      </button>
      {#each categories as cat}
        <button
          onclick={() => (selectedCategory = selectedCategory === cat ? '' : cat)}
          class="text-xs px-3 py-1.5 rounded-full border transition-all {selectedCategory === cat
            ? 'bg-primary-500 text-white border-primary-500'
            : 'border-slate-200/60 dark:border-slate-600/40 text-slate-600 dark:text-slate-400 hover:border-primary-300 dark:hover:border-primary-600/50'}"
        >
          {cat}
        </button>
      {/each}
    </div>
  {/if}

  <!-- Tag cloud -->
  {#if tags.length > 0}
    <div class="flex flex-wrap gap-2 items-center">
      <span class="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 shrink-0">
        <span class="i-lucide-tag text-xs mr-0.5"></span>Tags
      </span>
      {#each tags as tag}
        <button
          onclick={() => toggleTag(tag)}
          class="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-all {selectedTags.includes(tag)
            ? 'bg-primary-500 text-white border-primary-500'
            : 'border-primary-200/50 dark:border-primary-700/30 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'}"
        >
          {#if selectedTags.includes(tag)}
            <span class="i-lucide-check text-xs"></span>
          {/if}
          {tag}
        </button>
      {/each}
    </div>
  {/if}

  <!-- Active filters summary + clear -->
  <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
    <span>
      Showing <strong class="text-slate-700 dark:text-slate-300">{filteredCount}</strong> of
      <strong class="text-slate-700 dark:text-slate-300">{totalCount}</strong> case studies
    </span>
    {#if hasFilters}
      <button
        id="clear-filters"
        onclick={clearAll}
        class="inline-flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 hover:underline"
      >
        <span class="i-lucide-x text-xs"></span>
        Clear all filters
      </button>
    {/if}
  </div>
</div>
