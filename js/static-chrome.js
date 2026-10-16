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

  var FORM_ENDPOINT = null; // demo mode: shows success, sends nothing

  function submitForm(form, successId) {
    var success = document.getElementById(successId);
    if (success) success.classList.add("show");
    if (form) form.reset();
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
