/* =============================================================================
   MediaVenue — interactions
   - sticky-nav state
   - mobile menu
   - hero diagram draw-in
   - scroll reveals (progressive enhancement: content is visible without JS)
   - contact form stub
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- nav: shadow/border once scrolled ---- */
  var nav = document.getElementById("nav");
  function onScroll() {
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- hero diagram: trigger the staggered link draw-in ---- */
  window.requestAnimationFrame(function () {
    document.body.classList.add("hero-ready");
  });

  /* ---- scroll reveals ---- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- footer year ---- */
  var year = document.getElementById("year");
  if (year) { year.textContent = new Date().getFullYear(); }

  /* ---- contact form (stub — no network request) ---- */
  var form = document.getElementById("contactForm");
  var done = document.getElementById("formDone");
  if (form && done) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      /* Replace this block with a real submit (fetch to your endpoint). */
      form.hidden = true;
      done.hidden = false;
      done.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    });
  }
})();
