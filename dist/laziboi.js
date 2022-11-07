class r {
  constructor(t, e) {
    this.currentScrollY = window.scrollY, this.previousScrollY = this.currentScrollY, this.velocity = 0, this.element = t, this.multiplier = e.multiplier ? e.multiplier : 1, this.minVelocity = e.min ? e.min : -100, this.maxVelocity = e.max ? e.max : 100, this.dampening = e.dampening ? e.dampening : 0.25, this.restrictToViewport = this.restrictToViewport ? this.restrictToViewport : !0, this.respectReducedMotion = e.respectReducedMotion ? e.respectReducedMotion : !0, this.prefer3dTransforms = e.prefer3dTransforms ? e.prefer3dTransforms : !0, this.onScreen = !1, this.paused = !1, window.requestAnimationFrame(() => {
      this.tick();
    }), window.addEventListener("scroll", () => {
      this.currentScrollY = window.scrollY;
    }), this.restrictToViewport ? new IntersectionObserver(
      (i) => {
        this.onScreen = i[0].isIntersecting;
      },
      {
        root: document,
        rootMargin: `${this.element.offsetHeight * 2}px`,
        threshold: 0
      }
    ).observe(this.element) : this.onScreen = !0, this.element.style.transition = `transform ${this.dampening}s ease-out`, this.element.style.willChange = "transform", this.setStyles(), this.respectReducedMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches && this.disable();
  }
  clampVelocity(t, e, i) {
    return Math.min(Math.max(t, e), i);
  }
  setStyles() {
    this.prefer3dTransforms ? this.element.style.transform = `translate3d(0, ${this.velocity}px, 0)` : this.element.style.transform = `translateY(${this.velocity}px)`;
  }
  disable() {
    this.paused = !0, this.velocity = 0, this.setStyles();
  }
  enable() {
    this.paused = !1;
  }
  tick() {
    this.onScreen && !this.paused && (this.velocity = this.clampVelocity(
      (this.currentScrollY - this.previousScrollY) * this.multiplier,
      this.minVelocity,
      this.maxVelocity
    ), this.previousScrollY = this.currentScrollY, this.setStyles()), window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
export {
  r as default
};
