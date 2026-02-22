<script lang="ts">
  import type { SiteData } from "$lib/types";
  import { onMount } from "svelte";

  let { data }: { data: { data: SiteData } } = $props();
  const d = $derived(data.data);

  const hasContactInfo = $derived(
    Boolean(d.contact?.email || d.contact?.linkedin || d.contact?.website),
  );

  const linkedinLabel = $derived(
    (() => {
      const href = d.contact?.linkedin;
      if (!href) return "";
      try {
        const url = new URL(href);
        const segments = url.pathname.split("/").filter(Boolean);
        return segments.length ? segments[segments.length - 1] : href;
      } catch {
        const parts = href.split("/").filter(Boolean);
        return parts.length ? parts[parts.length - 1] : href;
      }
    })(),
  );

  const websiteLabel = $derived(
    (() => {
      const href = d.contact?.website;
      if (!href) return "";
      return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
    })(),
  );

  // Skill categories mapped to icons and labels
  const skillCategories = [
    {
      key: "healthcare_it" as const,
      label: "Healthcare IT",
      icon: "i-lucide-heart-pulse",
      gradient: "from-primary-500 to-teal-400",
    },
    {
      key: "software_infra" as const,
      label: "Software & Infrastructure",
      icon: "i-lucide-cpu",
      gradient: "from-accent-500 to-indigo-400",
    },
  ];

  // Scroll reveal
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");

            // Stagger children
            const children = entry.target.querySelectorAll(".stagger-child");
            children.forEach((child, i) => {
              setTimeout(() => {
                child.classList.add("revealed");
              }, i * 80);
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    document.querySelectorAll(".reveal-section").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  });
</script>

<div class="page-container py-6 md:py-10">
  <div class="flex flex-col gap-8 md:gap-14">
    <!-- ═══════════════════════════════════════════════ -->
    <!-- HERO SECTION -->
    <!-- ═══════════════════════════════════════════════ -->
    <section
      class="reveal-section relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 lg:p-14"
    >
      <!-- Gradient background -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-slate-800/80 dark:via-slate-900/90 dark:to-slate-800/60 rounded-3xl"
      ></div>
      <div
        class="absolute inset-0 border border-white/50 dark:border-slate-700/30 rounded-3xl"
      ></div>

      <!-- Decorative orbs -->
      <div
        class="absolute -top-20 -right-20 w-60 h-60 bg-primary-300/20 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none"
      ></div>
      <div
        class="absolute -bottom-16 -left-16 w-48 h-48 bg-accent-300/15 dark:bg-accent-500/8 rounded-full blur-3xl pointer-events-none"
      ></div>

      <div class="relative space-y-6">
        <!-- Label -->
        <div class="section-label">
          <span class="i-lucide-sparkles text-sm"></span>
          Portfolio
        </div>

        <!-- Name -->
        <h1
          class="text-4xl sm:text-5xl md:text-[3.5rem] leading-[1.1] font-extrabold text-slate-900 dark:text-white max-w-3xl"
        >
          {d.name}
        </h1>

        <!-- Headline -->
        <p
          class="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl"
        >
          {d.headline}
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-3 pt-1">
          <a
            class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-5 py-2.5 text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 no-underline"
            href="/cv.pdf"
            download
          >
            <span class="i-lucide-download text-base"></span>
            Download CV
          </a>
          {#if d.contact?.website}
            <a
              class="inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-600/50 bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm text-slate-700 dark:text-slate-300 px-5 py-2.5 text-sm font-medium hover:border-primary-300 dark:hover:border-primary-500/40 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-200 no-underline"
              href={d.contact.website}
              target="_blank"
            >
              <span class="i-lucide-globe text-base"></span>
              {websiteLabel}
            </a>
          {/if}
        </div>

        <!-- Contact Row -->
        {#if hasContactInfo}
          <div
            class="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-200/40 dark:border-slate-700/30 mt-2"
          >
            <span
              class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mr-1"
            >
              Contact
            </span>
            {#if d.contact?.email}
              <a
                href={"mailto:" + d.contact.email}
                class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/50 dark:bg-slate-700/30 border border-slate-200/50 dark:border-slate-600/30 text-sm text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300/50 dark:hover:border-primary-500/30 transition-all duration-200 no-underline group"
              >
                <svg
                  class="w-4 h-4 text-slate-400 group-hover:text-primary-500 transition-colors shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><rect width="20" height="16" x="2" y="4" rx="2" /><path
                    d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                  /></svg
                >
                <span>{d.contact.email}</span>
              </a>
            {/if}
            {#if d.contact?.linkedin}
              <a
                href={d.contact.linkedin}
                target="_blank"
                class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/50 dark:bg-slate-700/30 border border-slate-200/50 dark:border-slate-600/30 text-sm text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300/50 dark:hover:border-primary-500/30 transition-all duration-200 no-underline group"
              >
                <svg
                  class="w-4 h-4 text-slate-400 group-hover:text-primary-500 transition-colors shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path
                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                  /><rect width="4" height="12" x="2" y="9" /><circle
                    cx="4"
                    cy="4"
                    r="2"
                  /></svg
                >
                <span>{linkedinLabel}</span>
              </a>
            {/if}
            {#if d.contact?.website}
              <a
                href={d.contact.website}
                target="_blank"
                class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/50 dark:bg-slate-700/30 border border-slate-200/50 dark:border-slate-600/30 text-sm text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300/50 dark:hover:border-primary-500/30 transition-all duration-200 no-underline group"
              >
                <svg
                  class="w-4 h-4 text-slate-400 group-hover:text-primary-500 transition-colors shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><circle cx="12" cy="12" r="10" /><path
                    d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
                  /><path d="M2 12h20" /></svg
                >
                <span>{websiteLabel}</span>
              </a>
            {/if}
          </div>
        {/if}
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- ABOUT SECTION -->
    <!-- ═══════════════════════════════════════════════ -->
    <section class="reveal-section space-y-4">
      <div class="flex items-center gap-3">
        <span class="i-lucide-user text-primary-500 text-lg"></span>
        <h2 class="section-title">About</h2>
      </div>
      <div class="glass-card p-5 sm:p-6 md:p-8">
        <p
          class="text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-300"
        >
          {d.about}
        </p>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- EXPERIENCE SECTION (Timeline) -->
    <!-- ═══════════════════════════════════════════════ -->
    <section class="reveal-section space-y-4">
      <div class="flex items-center gap-3">
        <span class="i-lucide-briefcase text-primary-500 text-lg"></span>
        <h2 class="section-title">Experience</h2>
      </div>
      <div class="relative pl-10 md:pl-12 space-y-6">
        <!-- Timeline line -->
        <div class="timeline-line"></div>

        {#each d.experience as e}
          <article
            class="stagger-child relative glass-card-hover p-5 sm:p-6 md:p-7"
          >
            <!-- Timeline dot -->
            <div class="timeline-dot"></div>

            <div
              class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-3"
            >
              <h3
                class="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100"
              >
                {e.company}
              </h3>
              <span
                class="text-xs font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap bg-slate-100/80 dark:bg-slate-700/40 px-2.5 py-1 rounded-full"
              >
                {e.period}
              </span>
            </div>

            <div class="inline-flex items-center gap-1.5 mb-3">
              <span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
              <span
                class="text-sm font-semibold text-primary-600 dark:text-primary-400"
                >{e.role}</span
              >
            </div>

            {#if e.bullets}
              <ul class="space-y-2 mt-2">
                {#each e.bullets as b}
                  <li
                    class="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <span
                      class="i-lucide-chevron-right text-primary-400 dark:text-primary-500 mt-0.5 shrink-0 text-xs"
                    ></span>
                    <span>{b}</span>
                  </li>
                {/each}
              </ul>
            {/if}
          </article>
        {/each}
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- PROJECTS SECTION -->
    <!-- ═══════════════════════════════════════════════ -->
    <section class="reveal-section space-y-4">
      <div class="flex items-center gap-3">
        <span class="i-lucide-folder-open text-primary-500 text-lg"></span>
        <h2 class="section-title">Projects</h2>
      </div>
      <div class="grid gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {#each d.projects as p, i}
          <article
            class="stagger-child glass-card-hover p-5 sm:p-6 flex flex-col gap-3 group"
          >
            <!-- Project number badge -->
            <div class="flex items-start justify-between">
              <span
                class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/40 dark:to-accent-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {#if p.link}
                <a
                  href={p.link}
                  target="_blank"
                  class="i-lucide-arrow-up-right text-slate-400 hover:text-primary-500 transition-colors text-lg no-underline"
                  aria-label="Visit project"
                ></a>
              {/if}
            </div>

            <h3
              class="text-base md:text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug"
            >
              {p.title}
            </h3>

            {#if p.highlight}
              <p
                class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1"
              >
                {p.highlight}
              </p>
            {/if}

            <div class="flex flex-wrap gap-2 pt-1">
              {#if p.link}
                <a class="pill-link text-xs" target="_blank" href={p.link}>
                  <span class="i-lucide-external-link text-xs"></span>
                  Visit
                </a>
              {/if}
              {#if p.links}
                {#each p.links as l}
                  <a class="pill-link text-xs" target="_blank" href={l.url}>
                    <span class="i-lucide-external-link text-xs"></span>
                    {l.text}
                  </a>
                {/each}
              {/if}
            </div>
          </article>
        {/each}
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- SKILLS SECTION (Bento Grid with Tags) -->
    <!-- ═══════════════════════════════════════════════ -->
    <section class="reveal-section space-y-4">
      <div class="flex items-center gap-3">
        <span class="i-lucide-terminal text-primary-500 text-lg"></span>
        <h2 class="section-title">Skills</h2>
      </div>
      <div class="grid gap-4 md:gap-5 md:grid-cols-2">
        {#each skillCategories as cat}
          {@const items = d.skills?.[cat.key] || []}
          <div class="stagger-child glass-card-hover p-5 sm:p-6 md:p-7">
            <div class="flex items-center gap-2.5 mb-4">
              <div
                class="w-8 h-8 rounded-lg bg-gradient-to-br {cat.gradient} flex items-center justify-center"
              >
                <span class="{cat.icon} text-white text-sm"></span>
              </div>
              <h3
                class="text-base font-bold text-slate-800 dark:text-slate-100"
              >
                {cat.label}
              </h3>
            </div>
            <div class="flex flex-wrap gap-2">
              {#each items as s}
                <span class="skill-tag">{s}</span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- CERTIFICATIONS SECTION -->
    <!-- ═══════════════════════════════════════════════ -->
    <section class="reveal-section space-y-4">
      <div class="flex items-center gap-3">
        <span class="i-lucide-award text-primary-500 text-lg"></span>
        <h2 class="section-title">Certifications</h2>
      </div>
      <div class="glass-card p-5 sm:p-6 md:p-7">
        <div class="grid sm:grid-cols-2 gap-3 md:gap-4">
          {#each d.certifications as c}
            <div
              class="stagger-child flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors duration-200 group"
            >
              <div
                class="mt-0.5 w-6 h-6 rounded-md bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/20 flex items-center justify-center shrink-0 group-hover:from-primary-200 group-hover:to-accent-200 dark:group-hover:from-primary-800/40 dark:group-hover:to-accent-800/30 transition-colors"
              >
                <span
                  class="i-lucide-award text-primary-600 dark:text-primary-400 text-xs"
                ></span>
              </div>
              <span
                class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                >{c}</span
              >
            </div>
          {/each}
        </div>
      </div>
    </section>
  </div>
</div>
