/* ToolBocks experience layer — GSAP ScrollTrigger + Lenis.
   Progressive enhancement only: without JS the site renders fully (SEO-safe).
   Honors prefers-reduced-motion. */
(function () {
  /* Mobile nav toggle — must work regardless of motion/library availability */
  var menuBtn = document.querySelector(".menu-btn");
  var navLinks = document.getElementById("nav-links");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !window.gsap) { document.documentElement.classList.add("no-fx"); return; }

  gsap.registerPlugin(ScrollTrigger);

  /* Smooth scroll */
  if (window.Lenis) {
    var lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* Cursor glow */
  var glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);
  window.addEventListener("pointermove", function (e) {
    glow.style.transform = "translate(" + (e.clientX - 200) + "px," + (e.clientY - 200) + "px)";
  }, { passive: true });

  /* Hero entrance */
  var heroEls = document.querySelectorAll(".hero .orb, .hero .kicker, .hero h1, .hero .sub, .hero .cta-row, .hero .cta-note, .page-hero .kicker, .page-hero h1, .page-hero .sub, .page-hero .cta-row");
  if (heroEls.length) {
    gsap.from(heroEls, { y: 34, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.09, delay: 0.15 });
  }
  var mock = document.querySelector(".hero .mock");
  if (mock) {
    gsap.from(".mock-stage", { y: 90, opacity: 0, duration: 1.3, ease: "power3.out", delay: 0.5 });
    /* Gentle float parallax as you scroll past the hero */
    gsap.to(".mock-stage", {
      y: -40, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
    /* 3D tilt on pointer */
    var wrap = mock.parentElement;
    wrap.style.perspective = "1200px";
    wrap.addEventListener("pointermove", function (e) {
      var r = mock.getBoundingClientRect();
      var rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
      var ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
      gsap.to(mock, { rotateX: rx, rotateY: ry, duration: 0.5, ease: "power2.out" });
    });
    wrap.addEventListener("pointerleave", function () {
      gsap.to(mock, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "elastic.out(1,0.5)" });
    });
    /* Live rows pulse */
    var rows = mock.querySelectorAll(".mock-row");
    if (rows.length) {
      gsap.from(rows, { x: 24, opacity: 0, stagger: 0.35, duration: 0.6, ease: "power2.out", delay: 1, repeat: -1, repeatDelay: 6 });
    }
  }

  /* Hero video parallax fade on scroll */
  var hv = document.querySelector(".hero-media");
  if (hv) {
    gsap.to(hv, {
      opacity: 0.25, scale: 1.12, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
  }

  /* Section reveals */
  document.querySelectorAll("section .section-head, .prose h2, .prose p, .prose ul, .cta-final, .logos, details").forEach(function (el) {
    gsap.from(el, {
      y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true }
    });
  });
  document.querySelectorAll(".grid").forEach(function (grid) {
    gsap.from(grid.children, {
      y: 50, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.12,
      scrollTrigger: { trigger: grid, start: "top 85%", once: true }
    });
  });

  /* Animated counters */
  document.querySelectorAll(".nums b").forEach(function (el) {
    var raw = el.textContent.trim();
    var m = raw.match(/^([~]?)([\d,.]+)(.*)$/);
    if (!m) return;
    var target = parseFloat(m[2].replace(/,/g, ""));
    var obj = { v: 0 };
    gsap.to(obj, {
      v: target, duration: 1.8, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: function () {
        var n = target >= 100 ? Math.round(obj.v).toLocaleString("en-US") : (Math.round(obj.v * 10) / 10).toString().replace(/\.0$/, "");
        el.textContent = m[1] + n + m[3];
      }
    });
  });

  /* Magnetic buttons */
  document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("pointermove", function (e) {
      var r = btn.getBoundingClientRect();
      gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.3 });
    });
    btn.addEventListener("pointerleave", function () {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
    });
  });

  /* Integration marquee */
  var logos = document.querySelector(".logos");
  if (logos && logos.children.length) {
    logos.classList.add("marquee");
    var track = document.createElement("div");
    track.className = "marquee-track";
    while (logos.firstChild) track.appendChild(logos.firstChild);
    logos.appendChild(track);
    var clone = track.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    logos.appendChild(clone);
    gsap.to([track, clone], { xPercent: -100, ease: "none", duration: 28, repeat: -1 });
  }

  /* Nav shrink */
  ScrollTrigger.create({
    start: 80,
    onEnter: function () { document.querySelector("header.site").classList.add("scrolled"); },
    onLeaveBack: function () { document.querySelector("header.site").classList.remove("scrolled"); }
  });
})();
