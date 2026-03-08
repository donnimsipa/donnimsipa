<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  // In Svelte 5, components are dynamic by default.
  // We assign to a local variable and use it as a regular component tag.
  const ProjectComponent = $derived(data.component);
</script>

<!--
  MDSveX compiles each .md file to a Svelte component and wraps it with
  _layout.svelte (injected at compile time). Here we render the result dynamically.
-->
{#if ProjectComponent}
  <ProjectComponent />
{/if}
