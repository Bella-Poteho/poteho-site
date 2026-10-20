/* =========================================================
   Poteho — minimal chrome for static detail pages
   (products/*.html, blog/*.html). Keeps the mobile nav
   toggle, footer year and lead-form working without the
   full SPA bundle (js/main.js, js/i18n.js).
   ========================================================= */
(function () {
  function initChrome() {
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        links.classList.toggle("open");
      });
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          links.classList.remove("open");
        });
      });
    }
    document.querySelectorAll("#year").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  // Default delivery: Netlify Forms (same-page POST). Set FORM_ENDPOINT
  // to a Formspree/Getform URL to route through that service instead.
  var FORM_ENDPOINT = null;

  function submitForm(form, successId) {
    var success = document.getElementById(successId);
    var formName = (form && form.getAttribute("name")) || "lead";
    var fd = new FormData(form);
    fd.set("form-name", formName);
    var done = function () {
      if (success) success.classList.add("show");
      if (form) form.reset();
      return false;
    };
    var fail = function () {
      alert("Your message could not be sent (the form service returned an error). Please email info@poteho.com directly and we'll get back to you.");
      return false;
    };
    // Where to POST: third-party endpoint, otherwise the page that contains
    // the form (so Netlify matches the registered form on this page).
    var postUrl = FORM_ENDPOINT || (form && form.getAttribute("action")) || location.pathname;
    if (FORM_ENDPOINT) {
      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd.entries()))
      }).then(function (res) {
        if (!res.ok) throw new Error("bad");
        done();
      }).catch(fail);
      return false;
    }
    // Netlify Forms — check the response so a failed submit is reported
    // instead of showing a fake success message.
    fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(fd).toString()
    }).then(function (res) {
      if (!res.ok) throw new Error("bad");
      done();
    }).catch(fail);
    return false;
  }
  function handleLeadForm(form) { return submitForm(form, "leadSuccess"); }
  function handleContactForm(form) { return submitForm(form, "contactSuccess"); }

  // expose for inline onsubmit handlers
  window.handleLeadForm = handleLeadForm;
  window.handleContactForm = handleContactForm;

  if (document.readyState !== "loading") initChrome();
  else document.addEventListener("DOMContentLoaded", initChrome);
})();
