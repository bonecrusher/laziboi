function V(e, n) {
  e || console.warn("LaziBoi: element is required and can't be found");
  let c = window.scrollY, o = 0, f = i(n.multiplier, 1, "multiplier"), d = i(n.min, -100, "minVelocity"), u = i(n.max, 100, "maxVelocity"), l = i(n.dampening, 0.25, "dampening"), t = i(
    n.restrictToViewport,
    !0,
    "restrictToViewport"
  ), m = i(
    n.respectReducedMotion,
    !0,
    "respectReducedMotion"
  ), a = i(
    n.prefer3dTransforms,
    !0,
    "prefer3dTransforms"
  ), p = !1, w = !1;
  t ? new IntersectionObserver(
    (r) => {
      p = r[0].isIntersecting;
    },
    {
      rootMargin: `${e.offsetHeight}px`,
      threshold: 0
    }
  ).observe(e) : p = !0, e.style.transition = `transform ${l}s ease-out`, e.style.willChange = "transform", y(), m && window.matchMedia("(prefers-reduced-motion: reduce)").matches && h();
  function i(r, s, b) {
    return typeof r < "u" && typeof r != typeof s && console.warn(
      `LaziBoi: ${b} received the wrong datatype, should be: ${typeof s}`
    ), typeof r < "u" ? r : s;
  }
  function g(r, s, b) {
    return Math.min(Math.max(r, s), b);
  }
  function y() {
    a ? e.style.transform = `translate3d(0, ${o}px, 0)` : e.style.transform = `translateY(${o}px)`;
  }
  function h() {
    w = !0, o = 0, y();
  }
  function x() {
    w = !1;
  }
  function M() {
    h(), $.remove(this);
  }
  function T() {
    p && !w && (o = g(
      (window.scrollY - c) * f,
      d,
      u
    ), c = window.scrollY, y());
  }
  return {
    disable: h,
    enable: x,
    destroy: M,
    tick: T
  };
}
const $ = (() => {
  const e = [];
  function n(t, m) {
    const a = new V(t, m);
    return e.push(a), a;
  }
  function c(t) {
    e.splice(e.indexOf(t), 1);
  }
  function o() {
    return e;
  }
  function f() {
    e.forEach((t) => t.disable());
  }
  function d() {
    e.forEach((t) => t.enable());
  }
  function u() {
    for (; e.length; )
      e[0].destroy();
  }
  function l() {
    window.requestAnimationFrame(() => {
      e.forEach((t) => t.tick()), l();
    });
  }
  return l(), {
    add: n,
    remove: c,
    getAll: o,
    disableAll: f,
    enableAll: d,
    destroyAll: u
  };
})();
export {
  $ as default
};
