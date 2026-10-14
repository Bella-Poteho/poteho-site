/* =========================================================
   Poteho — site scripts
   Data-driven: products & site info are loaded from /data/*.json
   so they can be edited via the CMS at /admin (Decap CMS).
   ========================================================= */

/* ---------- Config ----------
   FORM_ENDPOINT — where inquiry / contact forms are sent.
   Easiest path: create a FREE form at https://formspree.io
     1. Sign up, click "New form", copy its endpoint (looks like https://formspree.io/f/abcdwxyz)
     2. Paste it between the quotes on the line below.
   Submissions then arrive in your Formspree inbox and can be forwarded to email.
   Leave as null to stay in demo mode (success message only, nothing is sent). */
const FORM_ENDPOINT = null; // <- paste your Formspree URL here, e.g. "https://formspree.io/f/abcdwxyz"

/* ---------- Data ---------- */
const PRODUCTS_URL = "data/products.json";
const SITE_URL = "data/site.json";

let PRODUCTS = [];
let SITE = {};

/* ---------- Mobile nav + misc (no data needed) ---------- */
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
  try {
    const [pRes, sRes] = await Promise.all([
      fetch(PRODUCTS_URL, { cache: "no-cache" }),
      fetch(SITE_URL, { cache: "no-cache" })
    ]);
    PRODUCTS = (await pRes.json()).products || [];
    SITE = await sRes.json();
  } catch (e) {
    console.warn("Could not load site data:", e);
  }
  injectSiteInfo();
  renderFeatured();
  renderGrid();
  renderDetail();
});

/* ---------- Site info injection (footer + contact page) ---------- */
function setText(id, t) { const el = document.getElementById(id); if (el) el.textContent = t; }
function setHref(id, h) { const el = document.getElementById(id); if (el && h) el.href = h; }

function injectSiteInfo() {
  if (!SITE || Object.keys(SITE).length === 0) return;

  // Footer
  if (SITE.email) {
    setText("fEmail", SITE.email);
    setHref("fEmail", "mailto:" + SITE.email);
  }
  if (SITE.whatsappLink) setHref("fWhatsapp", SITE.whatsappLink);
  if (SITE.linkedin) setHref("fLinkedin", SITE.linkedin);
  if (SITE.slogan) setText("fSlogan", SITE.slogan);

  // Contact page info card
  if (SITE.email) setText("cEmail", SITE.email);
  if (SITE.whatsapp) setText("cWhatsapp", SITE.whatsapp);
  if (SITE.factory) setText("cFactory", SITE.factory);
}

/* ---------- Render product cards ---------- */
function cardHTML(p) {
  return `
    <div class="product-card">
      <a class="pc-link" href="product.html?id=${p.id}">
        <div class="thumb"><img src="${p.img}" alt="${p.name}" loading="lazy" /></div>
        <div class="body">
          <span class="cat">${p.cat}</span>
          <h3>${p.name}</h3>
          <span class="moq">${p.moq}</span>
          <span class="price">${p.price}</span>
        </div>
      </a>
      <a href="contact.html" class="btn btn-primary pc-quote">Request a Quote</a>
    </div>`;
}

function renderFeatured() {
  const el = document.getElementById("featuredProducts");
  if (el) el.innerHTML = PRODUCTS.filter(p => p.featured).map(cardHTML).join("");
}

function renderGrid() {
  const gridEl = document.getElementById("productGrid");
  if (!gridEl) return;
  gridEl.innerHTML = PRODUCTS.map(cardHTML).join("");
  const filter = document.getElementById("catFilter");
  if (filter) {
    filter.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        filter.querySelectorAll("button").forEach(b => { b.style.background = ""; b.style.color = ""; });
        btn.style.background = "var(--coral)"; btn.style.color = "#fff";
        const cat = btn.dataset.cat;
        const list = cat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
        gridEl.innerHTML = list.map(cardHTML).join("");
      });
    });
  }
}

/* ---------- Product detail page (?id=) ---------- */
function renderDetail() {
  const grid = document.getElementById("detailGrid");
  if (!grid) return;
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS.find(x => x.featured) || PRODUCTS[0];
  if (!p) return;

  document.title = p.name + " — Poteho";
  const descEl = document.querySelector('meta[name="description"]');
  if (descEl) descEl.setAttribute("content", p.short || p.description || "");

  const bc = document.getElementById("pBreadcrumb");
  if (bc) bc.innerHTML = '<a href="index.html">Home</a> / <a href="products.html">Products</a> / <span>' + p.name + '</span>';

  const specs = (p.specs || []).map(s => `<li><span>${s.k}</span><span>${s.v}</span></li>`).join("");

  grid.innerHTML = `
    <div class="detail-media"><img src="${p.img}" alt="${p.name} by Poteho" /></div>
    <div class="detail-info">
      <span class="eyebrow">${p.cat}</span>
      <h1>${p.name}</h1>
      <p>${p.description || p.short || ""}</p>
      <div class="price">From ${p.price} / unit</div>
      <ul class="spec-list">
        ${specs}
        <li><span>MOQ</span><span>${p.moq}</span></li>
      </ul>
      <a href="contact.html" class="btn btn-primary">Request Wholesale Price</a>

      <form class="lead-form" onsubmit="return handleLeadForm(this)">
        <h3>Quick quote on this item</h3>
        <p>Leave your details and we'll reply within one business day.</p>
        <input type="hidden" name="product" value="${p.name}" />
        <div class="form-success" id="leadSuccess">Thanks! Your request has been received.</div>
        <div class="field"><label>Name *</label><input type="text" name="name" required /></div>
        <div class="field"><label>Email *</label><input type="email" name="email" required /></div>
        <div class="field"><label>Quantity / MOQ</label><input type="text" name="qty" placeholder="e.g. 500 units" /></div>
        <div class="field"><label>Message</label><textarea name="message" placeholder="Target market, customization needs..."></textarea></div>
        <button type="submit" class="btn btn-primary" style="width:100%">Send Inquiry</button>
        <p class="form-note">We never share your information.</p>
      </form>
    </div>`;

  injectProductJSONLD(p);
}

function injectProductJSONLD(p) {
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": p.name,
    "image": "https://www.poteho.com/" + p.img,
    "description": p.description || p.short || "",
    "brand": { "@type": "Brand", "name": (SITE.company || "Poteho") },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": String(p.price).replace(/[^0-9.]/g, "") || "0",
      "availability": "https://schema.org/InStock"
    }
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
    <p>We use cookies to improve your experience and analyze traffic. See our <a href="cookie.html">Cookie Policy</a>.</p>
    <div class="actions">
      <button class="btn btn-outline" id="cookieDecline" style="border-color:#fff;color:#fff">Decline</button>
      <button class="btn btn-light" id="cookieAccept">Accept</button>
    </div>`;
  document.body.appendChild(bar);
  const done = (val) => { localStorage.setItem("cookie-consent", val); bar.remove(); };
  bar.querySelector("#cookieAccept").addEventListener("click", () => done("accepted"));
  bar.querySelector("#cookieDecline").addEventListener("click", () => done("declined"));
}
