<script lang="ts">
  import { marked } from "marked";

  let {
    title,
    body = null,
    done = false,
  }: {
    title: string;
    body?: string | null;
    done?: boolean | null;
  } = $props();

  const htmlBody = $derived(marked.parse(body ?? ""));
</script>

<li class="link-card" data-done={done ? "" : undefined}>
  <div class="inner">
    <div class="check">
      <span>{done ? "✅" : "🔘"}</span>
    </div>
    <h2>{title}</h2>
    <div class="content">{@html htmlBody}</div>
  </div>
</li>
