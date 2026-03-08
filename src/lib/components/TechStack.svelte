<script lang="ts">
  let { stack = [] as string[], maxVisible = 8 } = $props();

  const visible = $derived(stack.slice(0, maxVisible));
  const overflow = $derived(stack.length - maxVisible);
</script>

{#if stack.length > 0}
  <div class="flex flex-wrap gap-2">
    {#each visible as tech}
      <span
        class="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-600/40"
      >
        {tech}
      </span>
    {/each}
    {#if overflow > 0}
      <span class="inline-flex items-center text-xs px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-700/30 text-slate-400 dark:text-slate-500">
        +{overflow} more
      </span>
    {/if}
  </div>
{/if}
