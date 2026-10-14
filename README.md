# Poteho — Pet Supplies Independent Site (Demo)

A clean, responsive, SEO-ready static website for a pet-supplies brand / OEM-ODM
wholesale business. Pure HTML + CSS + vanilla JS — no build step, no framework.
Host it anywhere static (Netlify, Vercel, GitHub Pages, your own server).

> This is a working template. Brand name, copy, products, prices and images are
> placeholders — replace them with your real content.

## Folder structure

```
pet-supplies-site/
├── index.html          # ① Homepage (hero, categories, featured, blog teaser)
├── products.html       # ② Product category / catalog page (filter by category)
├── product.html        # ③ Product detail page + quick inquiry form
├── blog.html           # Blog listing
├── blog-post.html      # Sample article (replace with your ~2000-word SEO posts)
├── about.html          # ④ About us / capabilities
├── contact.html        # ⑤ Contact us / wholesale inquiry form
├── cookie.html         # ⑥ Cookie Policy (+ consent bar on every page)
├── css/style.css       # All styling (responsive, mobile-first, refined palette)
├── js/main.js          # Nav, product rendering, filter, forms, cookie bar
├── assets/             # Images (hero + 3 product shots) + favicon.svg
├── sitemap.xml         # Submit to Google Search Console
└── robots.txt          # Crawl rules
```
> 8 pages total (home, products, product, about, contact, cookie, blog, blog-post).
> A cookie-consent bar is injected on every page via `js/main.js`.

## Preview locally

From this folder, run any static server:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Or just double-click `index.html` (forms/JS still work, but a server is cleaner).

## Deploy — get a live link

**Option A — Built-in static hosting (used for the live link below):**
The site is published as a live web link via WorkBuddy's static hosting. Share it
directly — it's `https://` with automatic edge delivery. Great for testing and
sharing before you own a domain.

**Option B — Netlify (recommended for production + your own domain):**
1. Sign up free at https://app.netlify.com.
2. Drag the `pet-supplies-site` folder onto the **Drop** zone (no Git needed), or
   connect a GitHub repo. Netlify detects it as a static site automatically.
3. You get a `*.netlify.app` link **with free SSL + global CDN** instantly.
4. Want your own domain? See "Use your own domain (Netlify)" below.

Vercel / Cloudflare Pages / GitHub Pages work the same way — all free, all give
automatic HTTPS + edge CDN. The site has no built-in cert; the host provides it.

## SSL & global CDN (answered)

- **SSL certificate**: a static site has no built-in cert by itself — SSL is
  provided by the host. Netlify / Vercel / Cloudflare Pages / GitHub Pages all
  issue a **free automatic Let's Encrypt certificate** and force HTTPS. So once
  deployed to any of those, your site is `https://` with no extra cost or setup.
- **Global CDN acceleration**: same hosts serve your files from edge nodes
  worldwide (Netlify, Vercel and Cloudflare have 100+ PoPs). To get the most
  out of it: keep assets small (this template already preloads the hero image
  and uses Google Fonts via `preconnect`), and compress images to WebP. No code
  changes are needed for CDN — it's a deployment choice.

## Use your own domain (Netlify)

Buying a domain is separate from hosting — you do NOT copy files onto the domain.
You **point the domain at your Netlify site**:

1. **Buy a domain** at any registrar (Namecheap, Cloudflare Registrar, GoDaddy,
   Alibaba Cloud / 万网, etc.). Pick short + brandable, e.g. `pethome.com`.
2. Netlify → Site settings → **Domain management → Add custom domain**, enter it.
3. Add the DNS records Netlify shows. Two routes:
   - **Easiest**: set your registrar's **nameservers** to Netlify's (Netlify runs
     everything; SSL is auto-issued).
   - **Or**: add the **CNAME / A record** Netlify gives you at your registrar.
4. Wait a few minutes → Netlify provisions a **free Let's Encrypt SSL cert** and
   forces `https://`. Done.
5. Replace every `poteho.com` in the site (canonical, OG, JSON-LD,
   sitemap.xml) with your real domain, then redeploy.

> This template is currently on the built-in host. When you move to Netlify, just
> re-deploy the same folder there — your domain then points at Netlify, not here.

## Connect Formspree (receive inquiries by email)

Forms run in demo mode until you connect a real inbox. Free, ~2-minute setup:

1. Sign up free at **https://formspree.io** (free tier: 50 submissions/month).
2. Click **New form** → copy its endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
3. In `js/main.js`, paste it:
   ```js
   const FORM_ENDPOINT = "https://formspree.io/f/abcdwxyz"; // <- your ID
   ```
4. Done — every "Get a Quote" / contact / quick-quote submission lands in your
   Formspree inbox and can be auto-forwarded to your email. (Spam filter + email
   notifications are configurable in the Formspree dashboard.)

## Publish SEO articles yourself

The blog is plain static HTML — you add a post by **copying a template file**:

1. **Duplicate** `blog-post.html` → rename to a keyword slug, e.g.
   `best-orthopedic-dog-beds.html`.
2. **Edit `<head>`** (critical for SEO): `<title>` (keyword first),
   `<meta name="description">`, `<link rel="canonical">` + OG url/title (real URL),
   and the **Article JSON-LD** (`headline`, `datePublished`, `image`, `author`).
3. **Write the body** inside `<article>…</article>`: 1,500–2,000 words, natural
   human tone (no obvious AI phrasing), one keyword per post, H2/H3 subheads,
   a few internal links to products / other posts.
4. **List it**: in `blog.html`, copy one `<a class="post-card">…</a>` block and
   point `href` to your new file with a new title/excerpt/date.
5. **Add to `sitemap.xml`** as a new `<url>` so Google discovers it.
6. **Redeploy** (Netlify auto-redeploys on Git push; for built-in host, re-publish).
7. In Google Search Console, the URL is picked from the sitemap; use
   **URL Inspection → Request indexing** to speed it up.

> Tip: post 1–2×/week around keyword clusters ("dog bed", "cat calming",
> "travel with pets"…). Consistency beats one-off blasts.

## Edit content via a visual backend (Decap CMS) — 后台改内容

You don't have to touch code to change products or contact info. A free,
open-source CMS (**Decap CMS**, formerly Netlify CMS) is wired in at **/admin**.

**What you can edit in the browser:**
- **Site Settings** — company name, email, phone, WhatsApp, WeChat, LinkedIn,
  factory/address, footer slogan. Stored in `data/site.json` and injected into
  every page's footer + the contact page automatically.
- **Products** — add / edit / remove products: name, category, price, MOQ, image,
  featured flag, descriptions, spec rows. Stored in `data/products.json`.

**Why it needs a Git backend (important):**
A pure static host can't *save* edits — there's no server to write files. Decap
CMS commits changes back to a **Git repository** and the site rebuilds. So the
`/admin` backend only *really saves* once the project lives in a Git repo with a
backend enabled:

- **Easiest (Netlify):** deploy to Netlify, enable **Identity** + **Git
  Gateway**, invite yourself as a user — then `/admin` saves straight to your
  repo and Netlify auto-redeploys.
- **Or GitHub OAuth:** in `admin/config.yml` switch the `backend` block to
  `name: github` with your repo + branch; register a GitHub OAuth app.

Until that's set up, you can still edit `data/products.json` and `data/site.json`
directly (plain JSON) and re-publish — a perfectly fine low-tech route.

## Customize

| What | Where |
|------|-------|
| Brand name / logo | Search `Poteho` across HTML files + the SVG paw in headers/footers |
| Products & prices | `data/products.json` (also editable in the `/admin` backend) |
| Images | Replace files in `assets/` (keep filenames or update references) |
| Inquiry form delivery | `js/main.js` → set `FORM_ENDPOINT` to Formspree / Getform / your API |
| Contact details | `contact.html` and the footer in every page |
| Domain & SEO URLs | Replace `poteho.com` in `<link rel="canonical">`, OG tags, JSON-LD and `sitemap.xml` |
| Blog articles | Duplicate `blog-post.html`, write your content, link from `blog.html` |

## SEO checklist

- [ ] Replace all `poteho.com` with your real domain.
- [ ] Set unique `<title>` + `<meta name="description">` per page.
- [ ] Submit `sitemap.xml` in Google Search Console.
- [ ] Add `hreflang` if you ship multiple languages.
- [ ] Use real, compressed images (WebP ideally) and set descriptive `alt` text.
- [ ] Keep publishing helpful blog posts around your keyword clusters.
- [ ] Consider adding FAQ / Review schema on product pages.

## Notes

- The inquiry forms run in **demo mode** by default (they just show a success
  message). Wire `FORM_ENDPOINT` to start receiving leads.
- All product cards currently link to the single sample `product.html`. For a
  real catalog, generate one detail page per product or switch to a
  query-string / CMS-driven detail route.
