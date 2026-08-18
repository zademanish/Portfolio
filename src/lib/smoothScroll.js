// Single access point to the Lenis instance owned by <App />.
//
// Anchor links must go through Lenis, not the browser's native jump. A native
// jump moves window.scrollY behind Lenis' back, so Lenis' internal target and
// the real scroll position drift apart and the page ends up fighting itself.

let instance = null;

export function setLenis(lenis) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

/**
 * Scroll to a selector, element, or absolute offset.
 * Falls back to native smooth scrolling when Lenis is disabled (touch
 * devices and `prefers-reduced-motion`, where we never start it).
 */
export function scrollToTarget(target, options = {}) {
  const { offset = -70, duration = 1.1 } = options;

  if (instance) {
    instance.scrollTo(target, { offset, duration });
    return;
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
    return;
  }

  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY + offset,
    behavior: 'smooth',
  });
}

/** Pause/resume scrolling — used to lock the page behind the mobile menu. */
export function setScrollEnabled(enabled) {
  if (instance) {
    if (enabled) instance.start();
    else instance.stop();
  }
  document.body.style.overflow = enabled ? '' : 'hidden';
}
