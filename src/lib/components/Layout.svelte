<script lang="ts">
  export let title: string;
  export let fullWidth = false;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main class="w-full">
  {#if fullWidth}
    <div class="w-full overflow-x-hidden">
      <slot />
    </div>
  {:else}
    <div class="page-container py-8 md:py-12">
      <div class="card p-0 sm:p-6 md:p-8 lg:p-10">
        <slot />
      </div>
    </div>
  {/if}
</main>
