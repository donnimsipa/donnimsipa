<script lang="ts">
  import { marked } from 'marked';

  export let title: string;
  export let body: string | null = null;
  export let done: boolean | null = false;

  $: htmlBody = marked.parse(body ?? '');
</script>

<li class="link-card" data-done={done ? '' : undefined}>
  <div class="inner">
    <div class="check">
      <span>{done ? '✅' : '🔘'}</span>
    </div>
    <h2>{title}</h2>
    <div class="content">{@html htmlBody}</div>
  </div>
</li>
