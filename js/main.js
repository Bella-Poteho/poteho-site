/* =========================================================
   Poteho — site scripts
   Data-driven: products & site info are loaded from /data/*.json
   so they can be edited via the CMS at /admin (Decap CMS).
   Multilingual: UI strings from js/i18n.js; product fields use
   flat keys name_en / name_zh / name_ru / name_es (etc).
   ========================================================= */

/* ---------- Config ----------
   FORM_ENDPOINT — where inquiry / contact forms are sent.
   Easiest path: create a FREE form at https://formspree.io
     1. Sign up, click "New form", copy its endpoint (looks like https://formspree.io/f/abcdwxyz)
     2. Paste it between the quotes on the line below.
   Leave as null to stay in demo mode (success message only, nothing is sent). */
const FORM_ENDPOINT = null; // <- paste your Formspree URL here, e.g. "https://formspree.io/f/abcdwxyz"

/* ---------- Data ---------- */
const PRODUCTS_URL = "data/products.json";
const SITE_URL = "data/site.json";
const POSTS_URL = "data/posts.json";
const PLACEHOLDER_IMG = "assets/placeholder.svg";

/* Categories (ids match products.json "cat" values) */
const CATS = ["bags", "bed", "apparel", "leashes", "feeding", "others"];

let PRODUCTS = [];
let SITE = {};
let POSTS_DATA = { posts: [], thumb: "assets/blog-thumb.svg" };

/* ---------- Mobile nav + misc ---------- */
function initChrome() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));
  }
  document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());
  initCookieBar();
}

/* ---------- Load data, then render ---------- */
document.addEventListener("DOMContentLoaded", async function () {
  initChrome();
  i18nInitSwitcher();
  try {
    const [pRes, sRes, bRes] = await Promise.all([
      fetch(PRODUCTS_URL, { cache: "no-cache" }),
      fetch(SITE_URL, { cache: "no-cache" }),
      fetch(POSTS_URL, { cache: "no-cache" })
    ]);
    PRODUCTS = (await pRes.json()).products || [];
    SITE = await sRes.json();
    if (bRes.ok) POSTS_DATA = await bRes.json();
  } catch (e) {
    console.warn("Could not load site data:", e);
  }
  renderAll();
});

/* Called on first load AND whenever the language changes */
function renderAll() {
  injectSiteInfo();
  renderCats();        // category chips (products.html)
  renderFeatured();    // homepage featured grid
  renderGrid();        // products.html full grid
  renderCategoryPage();// category.html
  renderDetail();      // product.html
  renderHomeBlog();    // homepage latest 3 posts
  renderBlogList();    // blog.html full list
  renderPost();        // blog-post.html single article

  /* GEO: FAQ blocks + FAQPage schema (visible section filled by JS) */
  renderFAQ(["faq.home1", "faq.home2", "faq.home3", "faq.home4", "faq.home5"], "faqHome");
  renderFAQ(["faq.about1", "faq.about2", "faq.about3", "faq.about4", "faq.about5"], "faqAbout");
  renderFAQ(["faq.wholesale1", "faq.wholesale2", "faq.wholesale3", "faq.wholesale4", "faq.wholesale5", "faq.wholesale6"], "faqProducts");
  renderFAQ(["faq.wholesale1", "faq.wholesale2", "faq.wholesale3", "faq.wholesale4", "faq.wholesale5", "faq.wholesale6"], "faqCategory");
}

/* ---------- Site info injection (footer + contact page) ---------- */
function setText(id, val) { const el = document.getElementById(id); if (el && val) el.textContent = val; }
function setHref(id, h) { const el = document.getElementById(id); if (el && h) el.href = h; }

function injectSiteInfo() {
  if (!SITE || Object.keys(SITE).length === 0) return;
  if (SITE.email) {
    setText("fEmail", SITE.email);
    setHref("fEmail", "mailto:" + SITE.email);
  }
  if (SITE.whatsappLink) setHref("fWhatsapp", SITE.whatsappLink);
  if (SITE.linkedin) setHref("fLinkedin", SITE.linkedin);
}

/* ---------- Product helpers ---------- */
function pName(p) { return tf(p.name_en || p.name || p); }
function pShort(p) { return tf(p.short_en || p.short || ""); }
function pDesc(p) { return tf(p.description_en || p.description || ""); }
function catName(id) { return t("cat." + id); }

/* Detail gallery: always show exactly 8 image slots.
   Accepts images as a flat array of strings OR as CMS-written objects [{img}] */
function productImages(p) {
  let raw = Array.isArray(p.images) ? p.images : (p.img ? [p.img] : []);
  let imgs = raw
    .map(x => (x && typeof x === "object" ? (x.img || x.src || "") : x))
    .filter(Boolean);
  if (!imgs.length && p.img) imgs = [p.img];
  if (!imgs.length) imgs = [PLACEHOLDER_IMG];
  return imgs.slice(0, 8);
}

/* ---------- Render product cards ---------- */
function cardHTML(p) {
  return `
    <div class="product-card">
      <a class="pc-link" href="/products/${p.id}.html">
        <div class="thumb"><img src="${p.img || PLACEHOLDER_IMG}" alt="${pName(p)}" loading="lazy" /></div>
        <div class="body">
          <span class="cat">${catName(p.cat)}</span>
          <h3>${pName(p)}</h3>
          <span class="moq">${t("det.moq")} ${p.moq || ""}</span>
        </div>
      </a>
      <a href="contact.html" class="btn btn-primary pc-quote">${t("card.quote")}</a>
    </div>`;
}

function renderFeatured() {
  const el = document.getElementById("featuredProducts");
  if (el) el.innerHTML = PRODUCTS.filter(p => p.featured).map(cardHTML).join("");
}

/* ---------- Category chips (products.html) ---------- */
function renderCats() {
  const filter = document.getElementById("catFilter");
  if (!filter) return;
  filter.innerHTML =
    `<a class="btn btn-outline" href="products.html" style="padding:8px 18px">${t("cat.all")}</a>` +
    CATS.map(c =>
      `<a class="btn btn-outline" href="category.html?cat=${c}" style="padding:8px 18px">${catName(c)}</a>`
    ).join("");
}

/* ---------- Full grid (products.html) ---------- */
function renderGrid() {
  const gridEl = document.getElementById("productGrid");
  if (!gridEl) return;
  gridEl.innerHTML = PRODUCTS.map(cardHTML).join("");
}

/* ---------- Category page (?cat=) ---------- */
function renderCategoryPage() {
  const grid = document.getElementById("catGrid");
  if (!grid) return;
  const params = new URLSearchParams(location.search);
  const cat = params.get("cat");
  if (!CATS.includes(cat)) { location.replace("products.html"); return; }

  const list = PRODUCTS.filter(p => p.cat === cat);
  document.title = catName(cat) + " — Poteho";

  const nameEl = document.getElementById("catTitle");
  const eyebrowEl = document.getElementById("catEyebrow");
  const bcEl = document.getElementById("catBreadcrumb");
  const countEl = document.getElementById("catCount");
  if (eyebrowEl) eyebrowEl.textContent = t("cpage.eyebrow");
  if (nameEl) nameEl.textContent = catName(cat);
  if (bcEl) bcEl.innerHTML = `<a href="index.html">${t("bc.home")}</a> / <a href="products.html">${t("bc.products")}</a> / <span>${catName(cat)}</span>`;
  if (countEl) countEl.textContent = `${list.length} ${t("cpage.count")}`;

  injectBreadcrumbJSONLD([
    { name: t("bc.home"), url: "https://www.poteho.com/index.html" },
    { name: t("bc.products"), url: "https://www.poteho.com/products.html" },
    { name: catName(cat), url: "https://www.poteho.com/category.html?cat=" + cat }
  ]);

  grid.innerHTML = list.length
    ? list.map(cardHTML).join("")
    : `<p style="grid-column:1/-1;color:var(--muted)">${t("cpage.empty")}</p>`;
}

/* ---------- Product detail page (?id=) ---------- */
function renderDetail() {
  const grid = document.getElementById("detailGrid");
  if (!grid) return;
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS.find(x => x.featured) || PRODUCTS[0];
  if (!p) return;

  const name = pName(p);
  const desc = pDesc(p) || pShort(p);
  document.title = name + " — Poteho";
  const descEl = document.querySelector('meta[name="description"]');
  if (descEl) descEl.setAttribute("content", pShort(p) || desc);

  const imgs = productImages(p);
  const thumbs = imgs.map((src, i) =>
    `<img src="${src}" alt="${name} photo ${i + 1}" class="${i === 0 ? "on" : ""}" data-i="${i}" loading="lazy" />`
  ).join("");

  const specs = (p.specs || []).map(s =>
    `<li><span>${t("spec." + s.k) !== "spec." + s.k ? t("spec." + s.k) : s.k}</span><span>${s.v}</span></li>`
  ).join("");

  const bc = document.getElementById("pBreadcrumb");
  if (bc) bc.innerHTML =
    `<a href="index.html">${t("bc.home")}</a> / <a href="products.html">${t("bc.products")}</a>` +
    ` / <a href="category.html?cat=${p.cat}">${catName(p.cat)}</a> / <span>${name}</span>`;

  injectBreadcrumbJSONLD([
    { name: t("bc.home"), url: "https://www.poteho.com/index.html" },
    { name: t("bc.products"), url: "https://www.poteho.com/products.html" },
    { name: catName(p.cat), url: "https://www.poteho.com/category.html?cat=" + p.cat },
    { name: name, url: "https://www.poteho.com/product.html?id=" + p.id }
  ]);

  grid.innerHTML = `
    <div class="detail-media">
      <div class="gallery-main"><img id="galleryMain" src="${imgs[0]}" alt="${name} by Poteho" /></div>
      <div class="gallery-thumbs" id="galleryThumbs">${thumbs}</div>
    </div>
    <div class="detail-info">
      <span class="eyebrow">${catName(p.cat)}</span>
      <h1>${name}</h1>
      <p>${desc}</p>
      <ul class="spec-list">
        ${specs}
        <li><span>${t("det.moq")}</span><span>${p.moq || ""}</span></li>
      </ul>
      <a href="contact.html" class="btn btn-primary">${t("det.quote")}</a>

      <form class="lead-form" onsubmit="return handleLeadForm(this)">
        <h3>${t("lead.title")}</h3>
        <p>${t("lead.sub")}</p>
        <input type="hidden" name="product" value="${name}" />
        <div class="form-success" id="leadSuccess">${t("lead.success")}</div>
        <div class="field"><label>${t("form.name")}</label><input type="text" name="name" required /></div>
        <div class="field"><label>${t("form.email")}</label><input type="email" name="email" required /></div>
        <div class="field"><label>${t("lead.qty")}</label><input type="text" name="qty" placeholder="${t("lead.qtyPh")}" /></div>
        <div class="field"><label>${t("form.message")}</label><textarea name="message" placeholder="${t("lead.msgPh")}"></textarea></div>
        <button type="submit" class="btn btn-primary" style="width:100%">${t("form.send")}</button>
        <p class="form-note">${t("lead.privacy")}</p>
      </form>
    </div>`;

  // Gallery interaction
  const thumbsBox = document.getElementById("galleryThumbs");
  if (thumbsBox) {
    thumbsBox.querySelectorAll("img").forEach(th => {
      th.addEventListener("click", () => {
        document.getElementById("galleryMain").src = th.src;
        thumbsBox.querySelectorAll("img").forEach(x => x.classList.remove("on"));
        th.classList.add("on");
      });
    });
  }

  injectProductJSONLD(p);
}

function injectProductJSONLD(p) {
  const existing = document.getElementById("productJSONLD");
  if (existing) existing.remove();
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.id = "productJSONLD";
  s.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": tf(p.name_en || p.name),
    "image": "https://www.poteho.com/" + (p.img || PLACEHOLDER_IMG),
    "description": tf(p.description_en || p.description || p.short_en || p.short || ""),
    "brand": { "@type": "Brand", "name": (SITE.company || "Poteho") },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  });
  document.head.appendChild(s);
}

/* ---------- Blog (data/posts.json) ---------- */
function sortedPosts() {
  return (POSTS_DATA.posts || []).slice().sort((a, b) => (a.date < b.date ? 1 : -1));
}
function postDateStr(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
function postCardHTML(post) {
  return `
    <a href="/blog/${post.slug}.html" class="blog-card">
      <div class="thumb"><img src="${post.image || POSTS_DATA.thumb}" alt="${post.title}" loading="lazy" /></div>
      <div class="body">
        <div class="meta">${post.category} · ${post.minutes} min · ${postDateStr(post.date)}</div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <span class="read-more" data-i18n="bl.readmore">Read article →</span>
      </div>
    </a>`;
}
/* Homepage: latest 3 posts */
function renderHomeBlog() {
  const el = document.getElementById("homeBlog");
  if (!el) return;
  const list = sortedPosts().slice(0, 3);
  el.innerHTML = list.map(postCardHTML).join("");
  if (typeof i18nApply === "function") i18nApply();
}
/* Blog page: full list */
function renderBlogList() {
  const el = document.getElementById("blogGrid");
  if (!el) return;
  const list = sortedPosts();
  el.innerHTML = list.length
    ? list.map(postCardHTML).join("")
    : `<p style="grid-column:1/-1;color:var(--muted)">More articles coming soon.</p>`;
  if (typeof i18nApply === "function") i18nApply();
}
/* Single post (?slug=) */
function renderPost() {
  const body = document.getElementById("postBody");
  if (!body) return;
  const posts = sortedPosts();
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");
  const post = posts.find(x => x.slug === slug) || posts[0];
  if (!post) return;

  document.title = post.title + " — Poteho";
  const descEl = document.querySelector('meta[name="description"]');
  if (descEl) descEl.setAttribute("content", post.excerpt);
  const crumb = document.getElementById("postCrumb");
  if (crumb) crumb.textContent = post.title;
  const meta = document.getElementById("postMeta");
  if (meta) meta.textContent = `${post.category} · ${post.minutes} min read · ${postDateStr(post.date)}`;
  const h1 = document.getElementById("postTitle");
  if (h1) h1.textContent = post.title;

  body.innerHTML = `<img class="post-hero" src="${post.image || POSTS_DATA.thumb}" alt="${post.title}" loading="lazy" />` +
    post.body.map(b => b.startsWith("## ") ? `<h2>${b.slice(3)}</h2>` : `<p>${b}</p>`).join("");

  injectPostJSONLD(post);
  renderPostFAQ(post);
  injectBreadcrumbJSONLD([
    { name: t("bc.home"), url: "https://www.poteho.com/index.html" },
    { name: t("nav.blog"), url: "https://www.poteho.com/blog.html" },
    { name: post.title, url: "https://www.poteho.com/blog-post.html?slug=" + slug }
  ]);
}
function injectPostJSONLD(post) {
  const existing = document.getElementById("postJSONLD");
  if (existing) existing.remove();
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.id = "postJSONLD";
  s.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": "https://www.poteho.com/" + (post.image || POSTS_DATA.thumb),
    "author": { "@type": "Organization", "name": "Poteho" },
    "publisher": { "@type": "Organization", "name": "Poteho", "logo": { "@type": "ImageObject", "url": "https://www.poteho.com/assets/poteho-logo.png" } },
    "datePublished": post.date,
    "description": post.excerpt
  });
  document.head.appendChild(s);
}

/* =========================================================
   GEO helpers — FAQ blocks + structured data
   FAQPage JSON-LD makes answers citable by AI assistants
   (ChatGPT, Perplexity, Google AI Overviews). BreadcrumbList
   helps engines understand page hierarchy & entity.
   ========================================================= */
function clearJSONLD(id) {
  const e = document.getElementById(id);
  if (e) e.remove();
}

/* Render a visible FAQ list AND inject a matching FAQPage JSON-LD
   in the current page language. keys -> ["faq.home1", ...] */
function renderFAQ(keys, containerId) {
  const el = document.getElementById(containerId);
  if (!el || !keys || !keys.length) return;
  const lang = i18nGetLang();
  const mainEntity = [];
  let html = "";
  keys.forEach(k => {
    const q = t(k + ".q");
    const a = t(k + ".a");
    if (!q || q === k + ".q" || !a) return;
    html += `<div class="faq-item"><h3 class="faq-q">${q}</h3><div class="faq-a">${a}</div></div>`;
    mainEntity.push({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } });
  });
  el.innerHTML = html;
  if (mainEntity.length) {
    clearJSONLD("faqJSONLD_" + containerId);
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = "faqJSONLD_" + containerId;
    s.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "inLanguage": lang,
      "mainEntity": mainEntity
    });
    document.head.appendChild(s);
  }
}

/* FAQ for a single blog post (English, posts are EN-only) */
function renderPostFAQ(post) {
  const el = document.getElementById("faqPost");
  if (!el) return;
  const faq = (post && post.faq) || [];
  if (!faq.length) { el.innerHTML = ""; return; }
  const mainEntity = faq.map(f => ({
    "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }));
  el.innerHTML = faq.map(f =>
    `<div class="faq-item"><h3 class="faq-q">${f.q}</h3><div class="faq-a">${f.a}</div></div>`
  ).join("");
  clearJSONLD("postFaqJSONLD");
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.id = "postFaqJSONLD";
  s.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": mainEntity });
  document.head.appendChild(s);
}

/* BreadcrumbList JSON-LD for category / product / post pages */
function injectBreadcrumbJSONLD(items) {
  if (!items || !items.length) return;
  clearJSONLD("breadcrumbJSONLD");
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.id = "breadcrumbJSONLD";
  s.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, i) => ({
      "@type": "ListItem", "position": i + 1, "name": it.name, "item": it.url
    }))
  });
  document.head.appendChild(s);
}

/* ---------- Form handling ---------- */
async function submitForm(form, successId) {
  const success = document.getElementById(successId);
  const data = Object.fromEntries(new FormData(form).entries());
  if (FORM_ENDPOINT) {
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Network response was not ok");
      if (success) success.classList.add("show");
      form.reset();
    } catch (e) {
      alert("Something went wrong sending your message. Please email us directly.");
    }
  } else {
    console.log("Demo form submission:", data);
    if (success) success.classList.add("show");
    form.reset();
  }
  return false;
}

function handleLeadForm(form) { return submitForm(form, "leadSuccess"); }
function handleContactForm(form) { return submitForm(form, "contactSuccess"); }

/* ---------- Cookie consent bar ---------- */
function initCookieBar() {
  if (localStorage.getItem("cookie-consent")) return;
  const bar = document.createElement("div");
  bar.className = "cookie-bar";
  bar.innerHTML = `
    <p><span data-i18n="cookie.msg"></span> <a href="cookie.html" data-i18n="cookie.policy"></a>.</p>
    <div class="actions">
      <button class="btn btn-outline" id="cookieDecline" style="border-color:#fff;color:#fff" data-i18n="cookie.decline"></button>
      <button class="btn btn-light" id="cookieAccept" data-i18n="cookie.accept"></button>
    </div>`;
  document.body.appendChild(bar);
  const done = (val) => { localStorage.setItem("cookie-consent", val); bar.remove(); };
  bar.querySelector("#cookieAccept").addEventListener("click", () => done("accepted"));
  bar.querySelector("#cookieDecline").addEventListener("click", () => done("declined"));
  i18nApply();
}
