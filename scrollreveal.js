/**
 * scroll-reveal.js
 *
 * Scroll-reveal module powered by anime.js v4.
 * Mirrors the ScrollReveal React component pattern from the main project
 * but in plain JS — no build step required.
 *
 * HTML usage:
 *   Add [data-reveal] to any container.
 *   Add [data-reveal-item] to the children you want animated one-by-one.
 *
 * Optional attributes on [data-reveal]:
 *   data-reveal-mode="self"      → animate the wrapper itself (default: "children")
 *   data-reveal-delay="200"      → start delay in ms          (default: 0)
 *   data-reveal-stagger="80"     → stagger between items in ms (default: 85)
 *   data-reveal-distance="20"    → translateY start distance px (default: 28)
 *   data-reveal-duration="800"   → animation duration in ms    (default: 900)
 */

// Signal to CSS that JS is running — starting states (opacity:0) only apply
// when this attribute is present, so content stays visible if JS is disabled.
document.documentElement.dataset.revealReady = "true";

function showAll() {
  document.querySelectorAll("[data-reveal]").forEach((root) => {
    root.dataset.revealState = "visible";
    root.querySelectorAll("[data-reveal-item]").forEach((t) => {
      t.style.opacity   = "1";
      t.style.transform = "none";
      t.style.filter    = "none";
    });
  });
}

async function initScrollReveal() {
  // Dynamic import so we can catch CDN failures gracefully.
  let animate, stagger;
  try {
    ({ animate, stagger } = await import(
      "https://cdn.jsdelivr.net/npm/animejs@4.4.1/lib/anime.esm.js"
    ));
  } catch {
    // anime.js CDN unreachable — show all content immediately without animation.
    showAll();
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const roots = Array.from(document.querySelectorAll("[data-reveal]"));

  roots.forEach((root) => {
    const mode      = root.dataset.revealMode             || "children";
    const delay     = Number(root.dataset.revealDelay)    || 0;
    const staggerMs = Number(root.dataset.revealStagger)  || 85;
    const distance  = Number(root.dataset.revealDistance) || 28;
    const duration  = Number(root.dataset.revealDuration) || 900;

    const items   = Array.from(root.querySelectorAll("[data-reveal-item]"));
    const targets = mode === "children" && items.length > 0 ? items : [root];

    // Reduced-motion: show everything immediately, skip animation entirely.
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      root.dataset.revealState = "visible";
      targets.forEach((t) => {
        t.style.opacity   = "1";
        t.style.transform = "none";
        t.style.filter    = "none";
      });
      return;
    }

    let animation;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        root.dataset.revealState = "visible";
        targets.forEach((t) => {
          t.style.willChange = "opacity, transform, filter";
        });

        animation = animate(targets, {
          opacity:    [0, 1],
          translateY: [distance, 0],
          scale:      [0.985, 1],
          filter:     ["blur(10px)", "blur(0px)"],
          duration,
          delay: mode === "children"
            ? stagger(staggerMs, { start: delay })
            : delay,
          ease: "outCubic",
          onComplete() {
            root.dataset.revealComplete = "true";
            targets.forEach((t) => {
              t.style.willChange = "";
            });
          },
        });

        observer.unobserve(root);
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(root);
  });
}

initScrollReveal();
