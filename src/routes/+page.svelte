<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import type { SiteData } from '$lib/types';

  export let data: { data: SiteData };
  const d = data.data;
  const hasContactInfo = Boolean(
    d.contact?.email || d.contact?.linkedin || d.contact?.website
  );
  const linkedinLabel = (() => {
    const href = d.contact?.linkedin;
    if (!href) return '';
    try {
      const url = new URL(href);
      const segments = url.pathname.split('/').filter(Boolean);
      return segments.length ? segments[segments.length - 1] : href;
    } catch (error) {
      const parts = href.split('/').filter(Boolean);
      return parts.length ? parts[parts.length - 1] : href;
    }
  })();
  const websiteLabel = (() => {
    const href = d.contact?.website;
    if (!href) return '';
    return href.replace(/^https?:\/\//, '').replace(/\/$/, '');
  })();
</script>

<Layout title={`${d.name} — ${d.headline}`}>
  <p slot="context">{d.headline}</p>

  <div class="flex flex-col gap-6 md:gap-12">
    <section class="card relative overflow-hidden p-0 sm:p-5 md:p-7 lg:p-9">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-white/40 dark:via-slate-900/50 to-transparent pointer-events-none"></div>
      <div class="relative m-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div class="space-y-3">
          <span class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Curriculum Vitae</span>
          <h1 class="text-3xl md:text-[2.75rem] leading-tight font-semibold text-slate-800 dark:text-slate-100">
            {d.name}
          </h1>
          <p class="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
            {d.headline}
          </p>
          <div class="flex flex-wrap gap-2 pt-0.5 md:pt-2">
            <a class="pill-link" href="/cv.pdf" download>
              Download CV
            </a>
          </div>
        </div>
        {#if hasContactInfo}
          <div class="grid gap-1.5 md:gap-3 text-sm text-slate-600 dark:text-slate-300 self-start lg:self-center lg:text-right">
            {#if d.contact?.email}
              <div class="flex flex-col gap-1 lg:items-end">
                <span class="uppercase tracking-[0.3em] text-[0.6rem] text-slate-400 dark:text-slate-500">Email</span>
                <a class="hover:text-primary transition-colors" href={"mailto:" + d.contact.email}>
                  {d.contact.email}
                </a>
              </div>
            {/if}
            {#if d.contact?.linkedin}
              <div class="flex flex-col gap-1 lg:items-end">
                <span class="uppercase tracking-[0.3em] text-[0.6rem] text-slate-400 dark:text-slate-500">LinkedIn</span>
                <a class="hover:text-primary transition-colors" target="_blank" href={d.contact.linkedin}>
                  {linkedinLabel}
                </a>
              </div>
            {/if}
            {#if d.contact?.website}
              <div class="flex flex-col gap-1 lg:items-end">
                <span class="uppercase tracking-[0.3em] text-[0.6rem] text-slate-400 dark:text-slate-500">Website</span>
                <a class="hover:text-primary transition-colors" target="_blank" href={d.contact.website}>
                  {websiteLabel}
                </a>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </section>

    <section class="space-y-2.5 md:space-y-4">
      <h2 class="section-title">
        About
      </h2>
      <div class="card prose prose-slate max-w-none dark:prose-invert p-0 sm:p-5 md:p-7">
        <p>{d.about}</p>
      </div>
    </section>

    <section class="space-y-2.5 md:space-y-4">
      <h2 class="section-title">
        Experience
      </h2>
      <div class="grid gap-3 md:gap-5">
        {#each d.experience as e}
          <article class="card border-l-4 border-primary/40 p-0 sm:p-5 md:p-6">
            <div class="flex flex-wrap items-baseline gap-2 justify-between">
              <p class="text-lg font-semibold text-slate-800 dark:text-slate-100">
                {e.company}
              </p>
              <span class="subtle-text">{e.period}</span>
            </div>
            <p class="text-sm text-primary mt-1 font-medium">{e.role}</p>
            <ul class="mt-2.5 space-y-1.5 text-sm text-slate-600 dark:text-slate-300 list-disc list-inside">
              {#each e.bullets as b}
                <li>{b}</li>
              {/each}
            </ul>
          </article>
        {/each}
      </div>
    </section>

    <section class="space-y-2.5 md:space-y-4">
      <h2 class="section-title">
        Projects
      </h2>
      <div class="grid gap-3 md:gap-5 md:grid-cols-2">
        {#each d.projects as p}
          <article class="card p-0 sm:p-5 md:p-6 space-y-2.5">
            <div class="text-lg font-semibold text-slate-800 dark:text-slate-100">{p.title}</div>
            {#if p.highlight}
              <p class="text-sm text-slate-500 dark:text-slate-400">{p.highlight}</p>
            {/if}
            <div class="flex flex-wrap gap-1.5 text-sm">
              {#if p.link}
                <a class="pill-link" target="_blank" href={p.link}>
                  Visit
                </a>
              {/if}
              {#if p.links}
                {#each p.links as l}
                  <a class="pill-link" target="_blank" href={l.url}>
                    {l.text}
                  </a>
                {/each}
              {/if}
            </div>
          </article>
        {/each}
      </div>
    </section>

    <section class="grid gap-3 md:gap-5 md:grid-cols-2">
      <div class="card p-0 sm:p-5 md:p-6">
        <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          Healthcare IT
        </h3>
        <ul class="mt-2.5 space-y-1.5 text-sm text-slate-600 dark:text-slate-300 list-disc list-inside">
          {#each (d.skills?.healthcare_it || []) as s}
            <li>{s}</li>
          {/each}
        </ul>
      </div>
      <div class="card p-0 sm:p-5 md:p-6">
        <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          Software & Infrastructure
        </h3>
        <ul class="mt-2.5 space-y-1.5 text-sm text-slate-600 dark:text-slate-300 list-disc list-inside">
          {#each (d.skills?.software_infra || []) as s}
            <li>{s}</li>
          {/each}
        </ul>
      </div>
    </section>

    <section class="space-y-2.5 md:space-y-4">
      <h2 class="section-title">
        Certifications
      </h2>
      <div class="card p-0 sm:p-5 md:p-6">
        <ul class="grid sm:grid-cols-2 gap-2.5 text-sm text-slate-700 dark:text-slate-300">
          {#each d.certifications as c}
            <li class="flex items-center gap-2">
              <span>{c}</span>
            </li>
          {/each}
        </ul>
      </div>
    </section>
  </div>
</Layout>
