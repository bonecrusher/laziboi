import LaziBoi from "./LaziBoi.js";
import TWEEN from '@tweenjs/tween.js'

export default function LaziBoiItem(element, options) {
  if (!element) console.warn("LaziBoi: element is required and can't be found");
  let previousScrollY = window.scrollY;
  let velocity = 0;
  let multiplier = setOption(options.multiplier, 1, "multiplier");
  let minVelocity = setOption(options.min, -100, "minVelocity");
  let maxVelocity = setOption(options.max, 100, "maxVelocity");
  let dampening = setOption(options.dampening, 0.4, "dampening");
  let restrictToViewport = setOption(
    options.restrictToViewport,
    true,
    "restrictToViewport"
  );
  let respectReducedMotion = setOption(
    options.respectReducedMotion,
    true,
    "respectReducedMotion"
  );
  let prefer3dTransforms = setOption(
    options.prefer3dTransforms,
    true,
    "prefer3dTransforms"
  );
  let onScreen = false;
  let paused = false;

  // Detect if element is in view
  if (restrictToViewport) {
    new IntersectionObserver(
      (value) => {
        onScreen = value[0].isIntersecting;
      },
      {
        // root: document,
        rootMargin: `${window.innerHeight * 2}px`,
        threshold: 0,
      }
    ).observe(element);
  } else {
    onScreen = true;
  }

  element.style.transition = `transform ${dampening}s ease-out`;
  element.style.willChange = "transform";
  setStyles();

  if (
    respectReducedMotion &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    disable();
  }

  function setOption(value, defaultValue, optionName) {
    if (typeof value !== "undefined" && typeof value !== typeof defaultValue) {
      console.warn(
        `LaziBoi: ${optionName} received the wrong datatype, should be: ${typeof defaultValue}`
      );
    }

    return typeof value !== "undefined" ? value : defaultValue;
  }

  function clampVelocity(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  function setStyles(newScrollY) {
    const coords = {y: newScrollY}
    new TWEEN.Tween(coords)
        .to({y: newScrollY}, 200)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          if (prefer3dTransforms) {
            element.style.transform = `translate3d(0, ${coords.y}px, 0)`;
          } else {
            element.style.transform = `translateY(${coords.y}px)`;
          }
        })
        .start()
  }

  function disable() {
    paused = true;
    velocity = 0;
    setStyles();
  }

  function enable() {
    paused = false;
  }

  function destroy() {
    disable();
    LaziBoi.remove(this);
  }

  function tick(time) {
    if (onScreen && !paused) {
      velocity = clampVelocity(
        (window.scrollY - previousScrollY) * multiplier,
        minVelocity,
        maxVelocity
      );

      const newScrollY = clampVelocity(
          (window.scrollY - previousScrollY) * multiplier,
          minVelocity,
          maxVelocity
      )

      setStyles(newScrollY);
      TWEEN.update(time)
      previousScrollY = window.scrollY;
    }
  }

  return {
    disable,
    enable,
    destroy,
    tick,
  };
}
