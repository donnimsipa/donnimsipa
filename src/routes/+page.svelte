<script lang="ts">
  import type { SiteData } from "$lib/types";
  import type { ProjectSummary } from "$lib/types/project";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import { onMount } from "svelte";
  import { fade, scale } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  let {
    data,
  }: { data: { data: SiteData; projectSummaries: ProjectSummary[] } } =
    $props();
  const d = $derived(data.data);
  const s = $derived(d.sections || {});
  const projectSummaries = $derived(data.projectSummaries);

  // Pick top 3 case studies: featured first, then newest overall
  const topCaseStudies = $derived.by(() => {
    const sorted = [...projectSummaries].sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime(),
    );
    const featured = sorted.filter((p) => p.metadata.featured);
    const nonFeatured = sorted.filter((p) => !p.metadata.featured);
    return [...featured, ...nonFeatured].slice(0, 3);
  });

  let activeCertImage = $state<string | null>(null);



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
          {s.portfolio || "Portfolio"}
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

          <div
            class="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200/40 dark:border-slate-700/30 mt-4"
          >
            <a
              class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-5 py-2.5 text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 no-underline"
              href="/cv.pdf"
              download
            >
              <span class="i-lucide-download text-base"></span>
              {s.download_cv || "Download CV"}
            </a>

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
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- ABOUT SECTION -->
    <!-- ═══════════════════════════════════════════════ -->
    <section class="reveal-section space-y-4">
      <div class="flex items-center gap-3">
        <span class="i-lucide-user text-primary-500 text-lg"></span>
        <h2 class="section-title">{s.about || "About"}</h2>
      </div>
      <div class="glass-card p-5 sm:p-6 md:p-8">
        <p
          class="text-primary-600 dark:text-primary-400 font-bold mb-3 uppercase tracking-wider text-xs sm:text-sm"
        >
          {d.about_tagline || ""}
        </p>
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
        <h2 class="section-title">{s.experience || "Experience"}</h2>
      </div>
      <div class="relative space-y-8">
        <!-- Timeline line -->
        <div class="timeline-line"></div>

        {#each d.experience as e}
          <div class="relative">
            <!-- Timeline dot -->
            <div class="timeline-dot top-6"></div>

            <article
              class="stagger-child glass-card-hover p-5 sm:p-6 md:p-7 ml-10 md:ml-12"
            >
              <div
                class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-3"
              >
                <h3
                  class="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100"
                >
                  {e.role} <span class="text-sm md:text-base font-normal text-slate-500 dark:text-slate-400 mx-1">at</span> {e.company}
                </h3>
                <span
                  class="text-xs font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap bg-slate-100/80 dark:bg-slate-700/40 px-2.5 py-1 rounded-full"
                >
                  {e.period}
                </span>
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
          </div>
        {/each}
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- CASE STUDIES SECTION (Featured Deep Dives) -->
    <!-- ═══════════════════════════════════════════════ -->
    {#if topCaseStudies.length > 0}
      <section class="reveal-section space-y-6">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="i-lucide-book-open text-primary-500 text-lg"></span>
            <h2 class="section-title">{s.case_studies || "Technical Case Studies"}</h2>
          </div>
          <a
            href="/case-studies"
            class="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-1 no-underline"
          >
            View All
            <span class="i-lucide-arrow-right text-base"></span>
          </a>
        </div>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {#each topCaseStudies as project}
            <ProjectCard {project} />
          {/each}
        </div>
      </section>
    {/if}

    <!-- ═══════════════════════════════════════════════ -->
    <!-- PROJECTS SECTION (General) -->
    <!-- ═══════════════════════════════════════════════ -->
    <section class="reveal-section space-y-4">
      <div class="flex items-center gap-3">
        <span class="i-lucide-folder-open text-primary-500 text-lg"></span>
        <h2 class="section-title">{s.projects || "Projects & Collaborations"}</h2>
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
        <h2 class="section-title">{s.skills || "Skills"}</h2>
      </div>
      <div class="glass-card p-5 sm:p-6 md:p-8">
        <div class="flex flex-wrap gap-2.5">
          {#each d.skills as s}
            <span class="skill-tag text-sm">{s}</span>
          {/each}
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- CERTIFICATIONS SECTION -->
    <!-- ═══════════════════════════════════════════════ -->
    <section class="reveal-section space-y-4">
      <div class="flex items-center gap-3">
        <span class="i-lucide-award text-primary-500 text-lg"></span>
        <h2 class="section-title">{s.certifications || "Certifications"}</h2>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {#each d.certifications as c}
          <button
            class="stagger-child glass-card-hover p-4 flex flex-col gap-4 text-left group transition-all duration-300"
            onclick={() =>
              (activeCertImage =
                c.image?.startsWith("http") || c.image?.startsWith("//")
                  ? c.image
                  : (d.siteUrl || "") + (c.image || ""))}
          >
            <!-- Certificate Thumbnail -->
            <div
              class="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 group-hover:border-primary-300/50 transition-colors"
            >
              {#if c.image}
                <img
                  src={c.image.startsWith("http") || c.image.startsWith("//")
                    ? c.image
                    : (d.siteUrl || "") + c.image}
                  alt={c.title}
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <!-- Hover Overlay -->
                <div
                  class="absolute inset-0 bg-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <div
                    class="bg-white/90 dark:bg-slate-900/90 p-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <span class="i-lucide-maximize-2 text-primary-600 text-xl"
                    ></span>
                  </div>
                </div>
              {:else}
                <div
                  class="w-full h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600"
                >
                  <span class="i-lucide-award text-4xl mb-2"></span>
                  <span class="text-xs font-medium">No certificate preview</span
                  >
                </div>
              {/if}
            </div>

            <div class="space-y-2 flex-1">
              <h3
                class="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
              >
                {c.title}
              </h3>
              <div
                class="flex items-center gap-1.5 text-xs font-medium text-primary-600 dark:text-primary-400"
              >
                <span class="i-lucide-zoom-in text-xs"></span>
                Click to expand
              </div>
            </div>
          </button>
        {/each}
      </div>
    </section>
  </div>
</div>

<!-- ═══════════════════════════════════════════════ -->
<!-- CERTIFICATE MODAL (Light-box) -->
<!-- ═══════════════════════════════════════════════ -->
{#if activeCertImage}
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-slate-950/90 backdrop-blur-md transition-all duration-300"
    transition:fade={{ duration: 200 }}
  >
    <button
      class="absolute inset-0 w-full h-full cursor-zoom-out"
      onclick={() => (activeCertImage = null)}
      aria-label="Close modal"
    ></button>

    <div
      class="relative max-w-5xl w-full max-h-full flex items-center justify-center"
      transition:scale={{ start: 0.95, duration: 300, easing: cubicOut }}
    >
      <img
        src={activeCertImage}
        alt="Certification Preview"
        class="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/10"
      />

      <button
        class="absolute -top-12 sm:top-0 sm:-right-16 text-white hover:text-primary-400 transition-colors p-2 group"
        onclick={() => (activeCertImage = null)}
        aria-label="Close certification preview"
      >
        <span class="i-lucide-x text-3xl"></span>
      </button>
    </div>
  </div>
{/if}

<style>
  /* Reuse existing project card styles for consistent feel */
  :global(.fade-in) {
    animation: fadeIn 0.5s ease-out forwards;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
