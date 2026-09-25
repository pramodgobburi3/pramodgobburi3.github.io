/* ============================================================
   Pramod Gobburi — Portfolio app
   Fetches content.json from a remote source at runtime so the
   site can be updated WITHOUT a redeploy. Falls back to the
   bundled local copy if the remote is unreachable.
   ============================================================ */

/* ---------- CONFIG ----------------------------------------------------------
   REMOTE_CONTENT_URL: raw JSON hosted in a GitHub repo.
   Using raw.githubusercontent.com (sends CORS `*`, ~5-min edge cache) so edits
   go live in seconds. Swap the placeholders once your content repo exists:

     https://raw.githubusercontent.com/<user>/<repo>/<branch>/content.json

   Set to "" (empty string) to always use the local bundled content.json.
--------------------------------------------------------------------------- */
const REMOTE_CONTENT_URL =
  "https://raw.githubusercontent.com/pramodgobburi3/portfolio-content/master/content.json";
const LOCAL_CONTENT_URL = "content.json";

/* -------------------------------------------------------------------------- */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* Minimal inline icon set (no external icon font needed for socials). */
const ICONS = {
  github:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>',
  linkedin:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z"/></svg>',
  mail:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
  twitter:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.49l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.29L17.61 20.65Z"/></svg>',
  link:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
};

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

/* Google Drive "view" links -> direct/preview when possible. */
const resolveResume = (url) => url || "#";

function toast(msg) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 4000);
}

/* ---------- Fetch with fallback ---------- */
async function loadContent() {
  const bust = `?t=${Date.now()}`;
  if (REMOTE_CONTENT_URL) {
    try {
      const res = await fetch(REMOTE_CONTENT_URL + bust, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return { data: await res.json(), source: "remote" };
    } catch (err) {
      console.warn("[portfolio] remote content failed, using local:", err.message);
    }
  }
  const res = await fetch(LOCAL_CONTENT_URL + bust, { cache: "no-store" });
  if (!res.ok) throw new Error(`Local content failed: HTTP ${res.status}`);
  return { data: await res.json(), source: "local" };
}

/* ---------- Renderers ---------- */
function renderProfile(p) {
  $("[data-name]").textContent = p.name || "";
  $("[data-title]").textContent = p.title || "";
  $("[data-tagline]").textContent = p.tagline || "";
  $("[data-about-heading]") && ($("[data-about-heading]").textContent = "About");
  document.title = `${p.name} — ${p.title}`;
  $("[data-footer-name]").textContent = p.name || "";

  const avail = $("[data-availability]");
  if (avail) avail.textContent = p.availableForWork ? "Available for work" : (p.title || "Software Engineer");

  $$("[data-resume]").forEach((a) => {
    a.href = resolveResume(p.resumeUrl);
    if (!p.resumeUrl) a.style.display = "none";
  });

  const socialHTML = (p.socials || [])
    .map((s) => {
      const icon = ICONS[s.icon] || ICONS.link;
      return `<a class="social" href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}" title="${esc(s.label)}">${icon}</a>`;
    })
    .join("");
  $$("[data-socials]").forEach((el) => (el.innerHTML = socialHTML));
}

function renderAbout(about) {
  if (!about) return;
  $("[data-about-heading]").textContent = about.heading || "About";
  $("[data-about-body]").innerHTML = (about.body || [])
    .map((para) => `<p>${esc(para)}</p>`)
    .join("");
}

function renderSkills(skills = []) {
  $("[data-skills]").innerHTML = skills
    .map((s) => `<li>${s.icon ? `<i class="${esc(s.icon)}"></i>` : ""}<span>${esc(s.name)}</span></li>`)
    .join("");
}

function renderExperience(items = []) {
  $("[data-experience]").innerHTML = items
    .map(
      (job) => `
      <li class="tl-item reveal">
        <div class="tl-item__head">
          ${job.logo ? `<img class="tl-item__logo" src="${esc(job.logo)}" alt="${esc(job.company)} logo" loading="lazy">` : ""}
          <span class="tl-item__role">${esc(job.role)}</span>
          <span class="tl-item__company">· ${esc(job.company)}</span>
          <span class="tl-item__period">${esc(job.period)}</span>
        </div>
        <ul class="tl-item__list">
          ${(job.highlights || []).map((h) => `<li>${esc(h)}</li>`).join("")}
        </ul>
      </li>`
    )
    .join("");
}

function renderProjects(items = []) {
  // Featured first, preserving order otherwise.
  const sorted = [...items].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  $("[data-projects]").innerHTML = sorted
    .map((p) => {
      const links = (p.links || [])
        .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`)
        .join("");
      const tags = (p.tags || []).map((t) => `<span>${esc(t)}</span>`).join("");
      const media = p.image
        ? `<div class="card__media"><img src="${esc(p.image)}" alt="${esc(p.name)} screenshot" loading="lazy"></div>`
        : "";
      return `
        <article class="card reveal ${p.featured ? "card--featured" : ""}">
          ${media}
          <div class="card__body">
            <h3 class="card__title">${esc(p.name)}</h3>
            <p class="card__desc">${esc(p.description)}</p>
            ${tags ? `<div class="card__tags">${tags}</div>` : ""}
            ${links ? `<div class="card__links">${links}</div>` : ""}
          </div>
        </article>`;
    })
    .join("");
}

function renderEducation(items = []) {
  $("[data-education]").innerHTML = items
    .map(
      (e) => `
      <div class="edu reveal">
        ${e.logo ? `<img class="edu__logo" src="${esc(e.logo)}" alt="${esc(e.school)} logo" loading="lazy">` : ""}
        <div>
          <div class="edu__school">${esc(e.school)}</div>
          <div class="edu__degree">${esc(e.degree)}</div>
          <div class="edu__period">${esc(e.period)}</div>
          <div class="edu__detail">${esc(e.detail || "")}</div>
        </div>
      </div>`
    )
    .join("");
}

/* ---------- Behaviour: reveal on scroll, nav shadow ---------- */
function initScrollReveal() {
  const els = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => io.observe(el));
}

function initNav() {
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* Mark statically-present sections as reveal targets too. */
function tagStaticReveals() {
  $$(".section__head, .hero, .about__body, .about__skills").forEach((el) =>
    el.classList.add("reveal")
  );
}

/* ---------- Boot ---------- */
(async function boot() {
  $("#year") && ($("#year").textContent = new Date().getFullYear());
  try {
    const { data, source } = await loadContent();
    renderProfile(data.profile || {});
    renderAbout(data.about);
    renderSkills(data.skills);
    renderExperience(data.experience);
    renderProjects(data.projects);
    renderEducation(data.education);

    tagStaticReveals();
    initScrollReveal();
    initNav();

    if (source === "local" && REMOTE_CONTENT_URL) {
      toast("⚠ Using local content (remote unavailable)");
    }
  } catch (err) {
    console.error("[portfolio] fatal:", err);
    $("main").innerHTML = `
      <div class="load-error">
        <h2>Couldn't load content</h2>
        <p>Please refresh, or check back shortly.</p>
      </div>`;
  }
})();
