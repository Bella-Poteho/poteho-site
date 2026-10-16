/* =========================================================
   Poteho — static page generator
   Turns the JS-rendered product / blog detail pages into
   real, crawlable static HTML so Google can index each
   product and each article under its own URL.

   Run:  node build_static.js
   Output:
     products/<id>.html            (EN, canonical)
     products/<id>.<ru|es|zh>.html (RU / ES / ZH)
     blog/<slug>.html             (EN; blog is EN-only)
     sitemap.xml                   (rebuilt with all URLs + hreflang)

   The SPA pages (product.html?... / blog-post.html?...) stay
   as fallback; card links in js/main.js now point here.
   ========================================================= */
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SITE = "https://www.poteho.com";
const BRAND = "Poteho";

/* GA4 measurement ID (provided by site owner) */
const GA4_ID = "G-3SR90925J9";
const GA4 = `  <!-- Google Analytics (GA4) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA4_ID}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA4_ID}');
  </script>`;

/* ---------- load i18n dictionary ---------- */
const i18nCode = fs.readFileSync(path.join(ROOT, "js/i18n.js"), "utf8");
const i18n = new Function(
  i18nCode + "\n;return {I18N, FAQ, I18N_LANGS, I18N_LABELS};"
)();
const { I18N, I18N_LANGS, I18N_LABELS } = i18n;
const LANGS = I18N_LANGS; // ["en","ru","es","zh"]

/* ---------- load data ---------- */
const products = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data/products.json"), "utf8")
).products;
const postsData = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data/posts.json"), "utf8")
);
const posts = (postsData.posts || []).slice().sort((a, b) =>
  a.date < b.date ? 1 : -1
);
const site = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data/site.json"), "utf8")
);

/* ---------- helpers ---------- */
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function t(lang, key) {
  return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
}
function tf(field, lang) {
  if (field && typeof field === "object")
    return field[lang] || field.en || "";
  return field || "";
}
function trunc(s, n) {
  s = String(s || "");
  return s.length > n ? s.slice(0, n - 1).trim() + "…" : s;
}

/* ---------- shared header / footer ---------- */
function header(lang, active, langSwitchHtml) {
  const nav = [
    ["home", "/index.html"],
    ["products", "/products.html"],
    ["blog", "/blog.html"],
    ["about", "/about.html"],
    ["contact", "/contact.html"]
  ]
    .map(
      ([k, href]) =>
        `<a href="${href}" class="${k === active ? "active" : ""}">${esc(
          t(lang, "nav." + k)
        )}</a>`
    )
    .join("");
  return `  <header class="site-header">
    <div class="container nav">
      <a href="/index.html" class="brand brand-img"><img src="/assets/poteho-logo.png" alt="Poteho" /></a>
      <nav class="nav-links" id="navLinks">${nav}</nav>
      <div class="nav-cta">
        <div class="lang-switch" id="langSwitch">${langSwitchHtml}</div>
        <a href="/contact.html" class="btn btn-primary">${esc(
          t(lang, "nav.quote")
        )}</a>
        <button class="nav-toggle" id="navToggle" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>`;
}

function footer(lang) {
  const cats = ["bags", "bed", "apparel", "leashes", "feeding", "others"];
  const catLinks = cats
    .map(
      (c) =>
        `<a href="/category.html?cat=${c}">${esc(t(lang, "cat." + c))}</a>`
    )
    .join("");
  return `  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a href="/index.html" class="brand brand-img"><img src="/assets/poteho-logo-white.png" alt="Poteho" /></a>
        <p>${esc(t(lang, "footer.desc"))}</p>
      </div>
      <div><h4>${esc(t(lang, "footer.products"))}</h4>${catLinks}</div>
      <div><h4>${esc(t(lang, "footer.company"))}</h4>
        <a href="/about.html">${esc(t(lang, "footer.aboutus"))}</a>
        <a href="/blog.html">${esc(t(lang, "footer.blog"))}</a>
        <a href="/contact.html">${esc(t(lang, "footer.contact"))}</a>
        <a href="/contact.html">${esc(t(lang, "footer.getquote"))}</a>
        <a href="/cookie.html">${esc(t(lang, "footer.cookie"))}</a>
      </div>
      <div><h4>${esc(t(lang, "footer.connect"))}</h4>
        <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>
        <a href="${esc(site.whatsappLink)}">${esc(t(lang, "footer.whatsapp"))}</a>
        <a href="${esc(site.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© ${new Date().getFullYear()} ${esc(t(lang, "footer.rights"))}</span>
      <span>${esc(t(lang, "footer.slogan"))}</span>
    </div>
  </footer>`;
}

/* ---------- product page ---------- */
function productLangSwitch(p, lang) {
  return LANGS.map((L) => {
    const href = `/products/${p.id}${L === "en" ? "" : "." + L}.html`;
    return `<a href="${href}" class="${
      L === lang ? "on" : ""
    }" hreflang="${L}">${I18N_LABELS[L]}</a>`;
  }).join("");
}

function productHreflang(p) {
  const alt = LANGS.map(
    (L) =>
      `<xhtml:link rel="alternate" hreflang="${L}" href="${SITE}/products/${
        p.id
      }${L === "en" ? "" : "." + L}.html" />`
  ).join("\n    ");
  return (
    alt +
    `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/products/${p.id}.html" />`
  );
}

function renderProduct(p, lang) {
  const name = tf(p["name_" + lang] || p.name, lang) || tf(p.name_en, lang);
  const desc = tf(p["description_" + lang] || p.description_en, lang);
  const short = tf(p["short_" + lang] || p.short_en, lang);
  const cat = p.cat;
  const catName = t(lang, "cat." + cat);
  const img = "/" + (p.img || p.images?.[0] || "assets/placeholder.svg");
  const imgAbs = SITE + img;
  const metaDesc = trunc(short || desc, 160);

  const specs = (p.specs || [])
    .map((s) => {
      const k = t(lang, "spec." + s.k) !== "spec." + s.k ? t(lang, "spec." + s.k) : s.k;
      return `<li><span>${esc(k)}</span><span>${esc(s.v)}</span></li>`;
    })
    .join("");

  const breadcrumb = `<nav class="breadcrumb">
      <a href="/index.html">${esc(t(lang, "bc.home"))}</a> / <a href="/products.html">${esc(
    t(lang, "bc.products")
  )}</a> / <a href="/category.html?cat=${cat}">${esc(catName)}</a> / <span>${esc(
    name
  )}</span>
    </nav>`;

  const detail = `<div class="detail-grid">
      <div class="detail-media">
        <div class="gallery-main"><img src="${esc(img)}" alt="${esc(
    name
  )} by Poteho" /></div>
        <div class="gallery-thumbs"><img src="${esc(img)}" alt="${esc(
    name
  )} photo 1" class="on" /></div>
      </div>
      <div class="detail-info">
        <span class="eyebrow">${esc(catName)}</span>
        <h1>${esc(name)}</h1>
        <p>${esc(desc)}</p>
        <ul class="spec-list">
          ${specs}
          <li><span>${esc(t(lang, "det.moq"))}</span><span>${esc(
    p.moq || ""
  )}</span></li>
        </ul>
        <a href="/contact.html" class="btn btn-primary">${esc(
    t(lang, "det.quote")
  )}</a>
        <form class="lead-form" name="lead" data-netlify="true" data-netlify-honeypot="bot-field" onsubmit="return handleLeadForm(this)">
          <h3>${esc(t(lang, "lead.title"))}</h3>
          <p>${esc(t(lang, "lead.sub"))}</p>
          <p class="nf-hidden" style="display:none"><label>Leave this empty: <input name="bot-field" /></label></p>
          <input type="hidden" name="form-name" value="lead" />
          <input type="hidden" name="product" value="${esc(name)}" />
          <div class="form-success" id="leadSuccess">${esc(
            t(lang, "lead.success")
          )}</div>
          <div class="field"><label>${esc(
            t(lang, "form.name")
          )}</label><input type="text" name="name" required /></div>
          <div class="field"><label>${esc(
            t(lang, "form.email")
          )}</label><input type="email" name="email" required /></div>
          <div class="field"><label>${esc(
            t(lang, "lead.qty")
          )}</label><input type="text" name="qty" placeholder="${esc(
    t(lang, "lead.qtyPh")
  )}" /></div>
          <div class="field"><label>${esc(
            t(lang, "form.message")
          )}</label><textarea name="message" placeholder="${esc(
    t(lang, "lead.msgPh")
  )}"></textarea></div>
          <button type="submit" class="btn btn-primary" style="width:100%">${esc(
            t(lang, "form.send")
          )}</button>
          <p class="form-note">${esc(t(lang, "lead.privacy"))}</p>
        </form>
      </div>
    </div>`;

  const productJSONLD = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: name,
    image: imgAbs,
    description: tf(p["description_" + lang] || p.description_en, lang),
    brand: { "@type": "Brand", name: site.company || BRAND },
    offers: { "@type": "Offer", availability: "https://schema.org/InStock" }
  };
  const breadcrumbJSONLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t(lang, "bc.home"), item: SITE + "/index.html" },
      { "@type": "ListItem", position: 2, name: t(lang, "bc.products"), item: SITE + "/products.html" },
      { "@type": "ListItem", position: 3, name: catName, item: SITE + "/category.html?cat=" + cat },
      { "@type": "ListItem", position: 4, name: name, item: SITE + "/products/" + p.id + (lang === "en" ? "" : "." + lang) + ".html" }
    ]
  };

  const head = `  <title>${esc(name)} — Poteho</title>
  <link rel="icon" href="/assets/favicon.svg" />
  <meta name="description" content="${esc(metaDesc)}" />
  <link rel="canonical" href="${SITE}/products/${p.id}${
    lang === "en" ? "" : "." + lang
  }.html" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${esc(name)} — Poteho" />
  <meta property="og:description" content="${esc(metaDesc)}" />
  <meta property="og:image" content="${esc(imgAbs)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="alternate" hreflang="en" href="${SITE}/products/${p.id}.html" />
  <link rel="alternate" hreflang="ru" href="${SITE}/products/${p.id}.ru.html" />
  <link rel="alternate" hreflang="es" href="${SITE}/products/${p.id}.es.html" />
  <link rel="alternate" hreflang="zh" href="${SITE}/products/${p.id}.zh.html" />
  <link rel="alternate" hreflang="x-default" href="${SITE}/products/${p.id}.html" />`;

  return PAGE(lang, "products", head, breadcrumb + detail, productLangSwitch(p, lang), [
    productJSONLD,
    breadcrumbJSONLD
  ]);
}

/* ---------- blog page (EN only) ---------- */
function blogLangSwitch(slug) {
  return (
    `<a href="/blog/${slug}.html" class="on" hreflang="en">EN</a>` +
    `<a href="/index.html" hreflang="ru">RU</a>` +
    `<a href="/index.html" hreflang="es">ES</a>` +
    `<a href="/index.html" hreflang="zh">中文</a>`
  );
}

function renderBlog(post) {
  const title = post.title;
  const metaDesc = trunc(post.excerpt, 160);
  const img = "/" + (post.image || postsData.thumb || "assets/blog-thumb.svg");
  const imgAbs = SITE + img;
  const dateStr = new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const meta = `${post.category} · ${post.minutes} min read · ${dateStr}`;

  const bodyHtml = `<img class="post-hero" src="${esc(img)}" alt="${esc(
    title
  )}" loading="lazy" />` +
    post.body
      .map((b) => (b.startsWith("## ") ? `<h2>${esc(b.slice(3))}</h2>` : `<p>${esc(b)}</p>`))
      .join("");

  const faqHtml = (post.faq || [])
    .map(
      (f) =>
        `<div class="faq-item"><h3 class="faq-q">${esc(f.q)}</h3><div class="faq-a">${esc(
          f.a
        )}</div></div>`
    )
    .join("");
  const faqBlock = (post.faq && post.faq.length)
    ? `<section class="faq-section">
      <div class="section-head" style="text-align:left;margin:20px 0 22px">
        <span class="eyebrow">${esc(t("en", "faq.eyebrow"))}</span>
        <h2>${esc(t("en", "faq.h2.home"))}</h2>
      </div>
      <div class="faq-list">${faqHtml}</div>
    </section>`
    : "";

  const main = `<nav class="breadcrumb"><a href="/index.html">${esc(
    t("en", "bc.home")
  )}</a> / <a href="/blog.html">${esc(t("en", "nav.blog"))}</a> / <span>${esc(
    title
  )}</span></nav>
    <span class="eyebrow" style="margin-top:18px">${esc(meta)}</span>
    <h1>${esc(title)}</h1>
    <div id="postBody">${bodyHtml}</div>
    ${faqBlock}
    <p style="margin-top:34px"><a href="/blog.html" class="btn btn-outline">${esc(
      t("en", "bl.back")
    )}</a></p>`;

  const articleJSONLD = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    image: imgAbs,
    author: { "@type": "Organization", name: BRAND },
    publisher: {
      "@type": "Organization",
      name: BRAND,
      logo: { "@type": "ImageObject", url: SITE + "/assets/poteho-logo.png" }
    },
    datePublished: post.date,
    description: post.excerpt
  };
  const breadcrumbJSONLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("en", "bc.home"), item: SITE + "/index.html" },
      { "@type": "ListItem", position: 2, name: t("en", "nav.blog"), item: SITE + "/blog.html" },
      { "@type": "ListItem", position: 3, name: title, item: SITE + "/blog/" + post.slug + ".html" }
    ]
  };
  const faqJSONLD = (post.faq && post.faq.length)
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a }
        }))
      }
    : null;

  const jsonld = [articleJSONLD, breadcrumbJSONLD, faqJSONLD].filter(Boolean);

  const head = `  <title>${esc(title)} — Poteho</title>
  <link rel="icon" href="/assets/favicon.svg" />
  <meta name="description" content="${esc(metaDesc)}" />
  <link rel="canonical" href="${SITE}/blog/${post.slug}.html" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${esc(title)} — Poteho" />
  <meta property="og:description" content="${esc(metaDesc)}" />
  <meta property="og:image" content="${esc(imgAbs)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="alternate" hreflang="en" href="${SITE}/blog/${post.slug}.html" />
  <link rel="alternate" hreflang="x-default" href="${SITE}/blog/${post.slug}.html" />
  <style>
    .article{max-width:760px;margin:0 auto}
    .article h1{margin-top:6px}
    .article h2{margin:34px 0 12px;font-size:1.5rem}
    .article p{margin-bottom:18px}
    .article img{border-radius:var(--radius);margin:22px 0;box-shadow:var(--shadow-sm)}
    .article .post-hero{width:100%;height:auto;display:block;margin:10px 0 26px;object-fit:cover;aspect-ratio:16/9}
    #postBody p{color:var(--ink);font-size:1.03rem;line-height:1.75}
    #postBody h2{font-size:1.32rem;margin-top:30px}
  </style>`;

  return PAGE("en", "blog", head, main, blogLangSwitch(post.slug), jsonld);
}

/* ---------- page shell ---------- */
function PAGE(lang, active, headInner, mainInner, langSwitchHtml, jsonldArr) {
  const jsonld = (jsonldArr || [])
    .map((o) => `  <script type="application/ld+json">\n  ${JSON.stringify(
      o
    )}\n  </script>`)
    .join("\n");
  const htmlLang = lang === "zh" ? "zh-CN" : lang;
  return `<!DOCTYPE html>
<html lang="${htmlLang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
${headInner}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Nunito+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/css/style.css" />
${jsonld}
${GA4}
</head>
<body>
${header(lang, active, langSwitchHtml)}
  <main class="section">
    <div class="container${active === "blog" ? " article" : ""}">
${mainInner}
    </div>
  </main>
${footer(lang)}
  <script src="/js/static-chrome.js"></script>
</body>
</html>
`;
}

/* ---------- write product pages ---------- */
const prodDir = path.join(ROOT, "products");
const blogDir = path.join(ROOT, "blog");
fs.mkdirSync(prodDir, { recursive: true });
fs.mkdirSync(blogDir, { recursive: true });

let count = 0;
products.forEach((p) => {
  if (!p.id) return;
  LANGS.forEach((lang) => {
    const html = renderProduct(p, lang);
    const fname = p.id + (lang === "en" ? "" : "." + lang) + ".html";
    fs.writeFileSync(path.join(prodDir, fname), html, "utf8");
    count++;
  });
});

posts.forEach((post) => {
  if (!post.slug) return;
  const html = renderBlog(post);
  fs.writeFileSync(path.join(blogDir, post.slug + ".html"), html, "utf8");
  count++;
});

console.log("Generated", count, "static detail pages");

/* ---------- rebuild sitemap.xml ---------- */
function url(loc, lastmod, alternates) {
  let s = `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>`;
  if (alternates)
    alternates.forEach((a) => {
      s += `\n    <xhtml:link rel="alternate" hreflang="${a[0]}" href="${a[1]}" />`;
    });
  s += `\n  </url>`;
  return s;
}

const today = new Date().toISOString().slice(0, 10);
const core = [
  ["/", 1.0],
  ["/products.html", 0.9],
  ["/blog.html", 0.8],
  ["/about.html", 0.7],
  ["/contact.html", 0.7],
  ["/delivery-guide.html", 0.6],
  ["/cookie.html", 0.4]
];

let urls = "";
core.forEach(([p, prio]) => {
  urls += `  <url>\n    <loc>${SITE}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${prio}</priority>\n  </url>\n`;
});

products.forEach((p) => {
  if (!p.id) return;
  const alts = LANGS.map((L) => [
    L,
    `${SITE}/products/${p.id}${L === "en" ? "" : "." + L}.html`
  ]);
  alts.push(["x-default", `${SITE}/products/${p.id}.html`]);
  LANGS.forEach((L) => {
    urls +=
      url(`${SITE}/products/${p.id}${L === "en" ? "" : "." + L}.html`, today, alts) +
      "\n";
  });
});

posts.forEach((post) => {
  if (!post.slug) return;
  urls += url(`${SITE}/blog/${post.slug}.html`, today) + "\n";
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}</urlset>
`;
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap, "utf8");
console.log("sitemap.xml rebuilt:", (sitemap.match(/<loc>/g) || []).length, "URLs");
