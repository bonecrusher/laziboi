export default class LazyBoi {
  constructor(element, options) {
    this.currentScrollY = window.scrollY;
    this.previousScrollY = this.currentScrollY;
    this.velocity = 0;
    this.element = element;
    this.multiplier = options.multiplier ? options.multiplier : 1;
    this.minVelocity = options.min ? options.min : -100;
    this.maxVelocity = options.max ? options.max : 100;
    this.dampening = options.dampening ? options.dampening : 0.25;
    this.restrictToViewport = this.restrictToViewport ? this.restrictToViewport : true
    this.respectReducedMotion = options.respectReducedMotion
      ? options.respectReducedMotion
      : true;
    this.prefer3dTransforms = options.prefer3dTransforms
      ? options.prefer3dTransforms
      : true;
    this.onScreen = false;
    this.paused = false;

    window.requestAnimationFrame(() => {
      this.tick();
    });

    window.addEventListener("scroll", () => {
      this.currentScrollY = window.scrollY;
    });

    // Detect if element is in view
    if (this.restrictToViewport) {
      new IntersectionObserver(
          (value) => {
            this.onScreen = value[0].isIntersecting;
          },
          {
            root: document,
            rootMargin: `${this.element.offsetHeight * 2}px`,
            threshold: 0,
          }
      ).observe(this.element);
    } else {
      this.onScreen = true;
    }

    this.element.style.transition = `transform ${this.dampening}s ease-out`;
    this.element.style.willChange = "transform";
    this.setStyles();

    if (
      this.respectReducedMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      this.disable();
    }
  }

  clampVelocity(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  setStyles() {
    if (this.prefer3dTransforms) {
      this.element.style.transform = `translate3d(0, ${this.velocity}px, 0)`;
    } else {
      this.element.style.transform = `translateY(${this.velocity}px)`;
    }
  }

  disable() {
    this.paused = true;
    this.velocity = 0;
    this.setStyles();
  }

  enable() {
    this.paused = false;
  }

  tick() {
    if (this.onScreen && !this.paused) {
      this.velocity = this.clampVelocity(
        (this.currentScrollY - this.previousScrollY) * this.multiplier,
        this.minVelocity,
        this.maxVelocity
      );
      this.previousScrollY = this.currentScrollY;
      this.setStyles();
    }

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
