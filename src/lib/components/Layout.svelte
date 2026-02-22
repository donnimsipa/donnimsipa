<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    title,
    fullWidth = false,
    children,
  }: {
    title: string;
    fullWidth?: boolean;
    children: Snippet;
  } = $props();
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main class="w-full">
  {#if fullWidth}
    <div class="w-full overflow-x-hidden">
      {@render children()}
    </div>
  {:else}
    <div class="page-container py-8 md:py-12">
      <div class="glass-card p-0 sm:p-6 md:p-8 lg:p-10">
        {@render children()}
      </div>
    </div>
  {/if}
</main>
