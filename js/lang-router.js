/* =========================================================
   Poteho — language router (single source of truth)
   Loaded synchronously in <head> on EVERY page.

   - The visitor's language lives in localStorage["poteho-lang"].
   - Product detail pages have real per-language URLs for SEO
     (/products/<id>.html, .ru.html, .zh.html). If a visitor with
     a saved non-EN preference lands on the EN product URL, we send
     them to their own language version so the whole site stays in
     one language.
   - Bots are NEVER redirected, so canonical / hreflang / indexing
     of every language URL stays intact.
   - No redirect on normal site pages: those render client-side
     from the same saved preference.
   ========================================================= */
(function () {
  var LANGS = ["en", "ru", "zh"];
  var KEY = "poteho-lang";
  var LS = window.localStorage;

  function read() {
    try {
      var v = LS.getItem(KEY);
      return LANGS.indexOf(v) > -1 ? v : "en";
    } catch (e) { return "en"; }
  }
  function write(l) {
    if (LANGS.indexOf(l) < 0) return;
    try { LS.setItem(KEY, l); } catch (e) {}
  }
  function isBot() {
    return /bot|crawler|spider|slurp|bingpreview|inspectiontool/i.test(navigator.userAgent || "");
  }

  var lang = read();

  // /products/pth-1101.html | /products/pth-1101.ru.html | ...zh.html
  var m = location.pathname.match(/^\/products\/([A-Za-z0-9_-]+?)(?:\.(ru|zh))?\.html$/);
  var pageLang = m ? (m[2] || "en") : null;

  // An explicit language URL wins: adopt it as this visitor's preference.
  // We deliberately do NOT flag this as an explicit user choice, so a
  // crawler that loads .ru.html can never cause a later EN page to redirect.
  if (pageLang && pageLang !== "en" && lang !== pageLang) {
    write(pageLang);
    lang = pageLang;
  }

  // Saved preference wins on the EN product URL — real visitors only.
  if (m && pageLang === "en" && lang !== "en" && !isBot()) {
    location.replace(
      "/products/" + m[1] + "." + lang + ".html" + location.search + location.hash
    );
  }

  window.PT_LANGS = LANGS;
  window.PT_getLang = read;
  window.PT_setLang = write;
  window.PT_LANG = lang;
  try {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  } catch (e) {}
})();
