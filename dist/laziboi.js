var w = {
  Linear: {
    None: function(t) {
      return t;
    }
  },
  Quadratic: {
    In: function(t) {
      return t * t;
    },
    Out: function(t) {
      return t * (2 - t);
    },
    InOut: function(t) {
      return (t *= 2) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
    }
  },
  Cubic: {
    In: function(t) {
      return t * t * t;
    },
    Out: function(t) {
      return --t * t * t + 1;
    },
    InOut: function(t) {
      return (t *= 2) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2);
    }
  },
  Quartic: {
    In: function(t) {
      return t * t * t * t;
    },
    Out: function(t) {
      return 1 - --t * t * t * t;
    },
    InOut: function(t) {
      return (t *= 2) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2);
    }
  },
  Quintic: {
    In: function(t) {
      return t * t * t * t * t;
    },
    Out: function(t) {
      return --t * t * t * t * t + 1;
    },
    InOut: function(t) {
      return (t *= 2) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2);
    }
  },
  Sinusoidal: {
    In: function(t) {
      return 1 - Math.cos(t * Math.PI / 2);
    },
    Out: function(t) {
      return Math.sin(t * Math.PI / 2);
    },
    InOut: function(t) {
      return 0.5 * (1 - Math.cos(Math.PI * t));
    }
  },
  Exponential: {
    In: function(t) {
      return t === 0 ? 0 : Math.pow(1024, t - 1);
    },
    Out: function(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    },
    InOut: function(t) {
      return t === 0 ? 0 : t === 1 ? 1 : (t *= 2) < 1 ? 0.5 * Math.pow(1024, t - 1) : 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
    }
  },
  Circular: {
    In: function(t) {
      return 1 - Math.sqrt(1 - t * t);
    },
    Out: function(t) {
      return Math.sqrt(1 - --t * t);
    },
    InOut: function(t) {
      return (t *= 2) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    }
  },
  Elastic: {
    In: function(t) {
      return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
    },
    Out: function(t) {
      return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
    },
    InOut: function(t) {
      return t === 0 ? 0 : t === 1 ? 1 : (t *= 2, t < 1 ? -0.5 * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI) : 0.5 * Math.pow(2, -10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI) + 1);
    }
  },
  Back: {
    In: function(t) {
      var e = 1.70158;
      return t * t * ((e + 1) * t - e);
    },
    Out: function(t) {
      var e = 1.70158;
      return --t * t * ((e + 1) * t + e) + 1;
    },
    InOut: function(t) {
      var e = 2.5949095;
      return (t *= 2) < 1 ? 0.5 * (t * t * ((e + 1) * t - e)) : 0.5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
    }
  },
  Bounce: {
    In: function(t) {
      return 1 - w.Bounce.Out(1 - t);
    },
    Out: function(t) {
      return t < 0.36363636363636365 ? 7.5625 * t * t : t < 0.7272727272727273 ? 7.5625 * (t -= 0.5454545454545454) * t + 0.75 : t < 0.9090909090909091 ? 7.5625 * (t -= 0.8181818181818182) * t + 0.9375 : 7.5625 * (t -= 0.9545454545454546) * t + 0.984375;
    },
    InOut: function(t) {
      return t < 0.5 ? w.Bounce.In(t * 2) * 0.5 : w.Bounce.Out(t * 2 - 1) * 0.5 + 0.5;
    }
  }
}, g;
typeof self > "u" && typeof process < "u" && process.hrtime ? g = function() {
  var t = process.hrtime();
  return t[0] * 1e3 + t[1] / 1e6;
} : typeof self < "u" && self.performance !== void 0 && self.performance.now !== void 0 ? g = self.performance.now.bind(self.performance) : Date.now !== void 0 ? g = Date.now : g = function() {
  return new Date().getTime();
};
var _ = g, C = function() {
  function t() {
    this._tweens = {}, this._tweensAddedDuringUpdate = {};
  }
  return t.prototype.getAll = function() {
    var e = this;
    return Object.keys(this._tweens).map(function(i) {
      return e._tweens[i];
    });
  }, t.prototype.removeAll = function() {
    this._tweens = {};
  }, t.prototype.add = function(e) {
    this._tweens[e.getId()] = e, this._tweensAddedDuringUpdate[e.getId()] = e;
  }, t.prototype.remove = function(e) {
    delete this._tweens[e.getId()], delete this._tweensAddedDuringUpdate[e.getId()];
  }, t.prototype.update = function(e, i) {
    e === void 0 && (e = _()), i === void 0 && (i = !1);
    var r = Object.keys(this._tweens);
    if (r.length === 0)
      return !1;
    for (; r.length > 0; ) {
      this._tweensAddedDuringUpdate = {};
      for (var n = 0; n < r.length; n++) {
        var s = this._tweens[r[n]], a = !i;
        s && s.update(e, a) === !1 && !i && delete this._tweens[r[n]];
      }
      r = Object.keys(this._tweensAddedDuringUpdate);
    }
    return !0;
  }, t;
}(), y = {
  Linear: function(t, e) {
    var i = t.length - 1, r = i * e, n = Math.floor(r), s = y.Utils.Linear;
    return e < 0 ? s(t[0], t[1], r) : e > 1 ? s(t[i], t[i - 1], i - r) : s(t[n], t[n + 1 > i ? i : n + 1], r - n);
  },
  Bezier: function(t, e) {
    for (var i = 0, r = t.length - 1, n = Math.pow, s = y.Utils.Bernstein, a = 0; a <= r; a++)
      i += n(1 - e, r - a) * n(e, a) * t[a] * s(r, a);
    return i;
  },
  CatmullRom: function(t, e) {
    var i = t.length - 1, r = i * e, n = Math.floor(r), s = y.Utils.CatmullRom;
    return t[0] === t[i] ? (e < 0 && (n = Math.floor(r = i * (1 + e))), s(t[(n - 1 + i) % i], t[n], t[(n + 1) % i], t[(n + 2) % i], r - n)) : e < 0 ? t[0] - (s(t[0], t[0], t[1], t[1], -r) - t[0]) : e > 1 ? t[i] - (s(t[i], t[i], t[i - 1], t[i - 1], r - i) - t[i]) : s(t[n ? n - 1 : 0], t[n], t[i < n + 1 ? i : n + 1], t[i < n + 2 ? i : n + 2], r - n);
  },
  Utils: {
    Linear: function(t, e, i) {
      return (e - t) * i + t;
    },
    Bernstein: function(t, e) {
      var i = y.Utils.Factorial;
      return i(t) / i(e) / i(t - e);
    },
    Factorial: function() {
      var t = [1];
      return function(e) {
        var i = 1;
        if (t[e])
          return t[e];
        for (var r = e; r > 1; r--)
          i *= r;
        return t[e] = i, i;
      };
    }(),
    CatmullRom: function(t, e, i, r, n) {
      var s = (i - t) * 0.5, a = (r - e) * 0.5, o = n * n, h = n * o;
      return (2 * e - 2 * i + s + a) * h + (-3 * e + 3 * i - 2 * s - a) * o + s * n + e;
    }
  }
}, S = function() {
  function t() {
  }
  return t.nextId = function() {
    return t._nextId++;
  }, t._nextId = 0, t;
}(), P = new C(), k = function() {
  function t(e, i) {
    i === void 0 && (i = P), this._object = e, this._group = i, this._isPaused = !1, this._pauseStart = 0, this._valuesStart = {}, this._valuesEnd = {}, this._valuesStartRepeat = {}, this._duration = 1e3, this._initialRepeat = 0, this._repeat = 0, this._yoyo = !1, this._isPlaying = !1, this._reversed = !1, this._delayTime = 0, this._startTime = 0, this._easingFunction = w.Linear.None, this._interpolationFunction = y.Linear, this._chainedTweens = [], this._onStartCallbackFired = !1, this._id = S.nextId(), this._isChainStopped = !1, this._goToEnd = !1;
  }
  return t.prototype.getId = function() {
    return this._id;
  }, t.prototype.isPlaying = function() {
    return this._isPlaying;
  }, t.prototype.isPaused = function() {
    return this._isPaused;
  }, t.prototype.to = function(e, i) {
    return this._valuesEnd = Object.create(e), i !== void 0 && (this._duration = i), this;
  }, t.prototype.duration = function(e) {
    return this._duration = e, this;
  }, t.prototype.start = function(e) {
    if (this._isPlaying)
      return this;
    if (this._group && this._group.add(this), this._repeat = this._initialRepeat, this._reversed) {
      this._reversed = !1;
      for (var i in this._valuesStartRepeat)
        this._swapEndStartRepeatValues(i), this._valuesStart[i] = this._valuesStartRepeat[i];
    }
    return this._isPlaying = !0, this._isPaused = !1, this._onStartCallbackFired = !1, this._isChainStopped = !1, this._startTime = e !== void 0 ? typeof e == "string" ? _() + parseFloat(e) : e : _(), this._startTime += this._delayTime, this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat), this;
  }, t.prototype._setupProperties = function(e, i, r, n) {
    for (var s in r) {
      var a = e[s], o = Array.isArray(a), h = o ? "array" : typeof a, d = !o && Array.isArray(r[s]);
      if (!(h === "undefined" || h === "function")) {
        if (d) {
          var f = r[s];
          if (f.length === 0)
            continue;
          f = f.map(this._handleRelativeValue.bind(this, a)), r[s] = [a].concat(f);
        }
        if ((h === "object" || o) && a && !d) {
          i[s] = o ? [] : {};
          for (var v in a)
            i[s][v] = a[v];
          n[s] = o ? [] : {}, this._setupProperties(a, i[s], r[s], n[s]);
        } else
          typeof i[s] > "u" && (i[s] = a), o || (i[s] *= 1), d ? n[s] = r[s].slice().reverse() : n[s] = i[s] || 0;
      }
    }
  }, t.prototype.stop = function() {
    return this._isChainStopped || (this._isChainStopped = !0, this.stopChainedTweens()), this._isPlaying ? (this._group && this._group.remove(this), this._isPlaying = !1, this._isPaused = !1, this._onStopCallback && this._onStopCallback(this._object), this) : this;
  }, t.prototype.end = function() {
    return this._goToEnd = !0, this.update(1 / 0), this;
  }, t.prototype.pause = function(e) {
    return e === void 0 && (e = _()), this._isPaused || !this._isPlaying ? this : (this._isPaused = !0, this._pauseStart = e, this._group && this._group.remove(this), this);
  }, t.prototype.resume = function(e) {
    return e === void 0 && (e = _()), !this._isPaused || !this._isPlaying ? this : (this._isPaused = !1, this._startTime += e - this._pauseStart, this._pauseStart = 0, this._group && this._group.add(this), this);
  }, t.prototype.stopChainedTweens = function() {
    for (var e = 0, i = this._chainedTweens.length; e < i; e++)
      this._chainedTweens[e].stop();
    return this;
  }, t.prototype.group = function(e) {
    return this._group = e, this;
  }, t.prototype.delay = function(e) {
    return this._delayTime = e, this;
  }, t.prototype.repeat = function(e) {
    return this._initialRepeat = e, this._repeat = e, this;
  }, t.prototype.repeatDelay = function(e) {
    return this._repeatDelayTime = e, this;
  }, t.prototype.yoyo = function(e) {
    return this._yoyo = e, this;
  }, t.prototype.easing = function(e) {
    return this._easingFunction = e, this;
  }, t.prototype.interpolation = function(e) {
    return this._interpolationFunction = e, this;
  }, t.prototype.chain = function() {
    for (var e = [], i = 0; i < arguments.length; i++)
      e[i] = arguments[i];
    return this._chainedTweens = e, this;
  }, t.prototype.onStart = function(e) {
    return this._onStartCallback = e, this;
  }, t.prototype.onUpdate = function(e) {
    return this._onUpdateCallback = e, this;
  }, t.prototype.onRepeat = function(e) {
    return this._onRepeatCallback = e, this;
  }, t.prototype.onComplete = function(e) {
    return this._onCompleteCallback = e, this;
  }, t.prototype.onStop = function(e) {
    return this._onStopCallback = e, this;
  }, t.prototype.update = function(e, i) {
    if (e === void 0 && (e = _()), i === void 0 && (i = !0), this._isPaused)
      return !0;
    var r, n, s = this._startTime + this._duration;
    if (!this._goToEnd && !this._isPlaying) {
      if (e > s)
        return !1;
      i && this.start(e);
    }
    if (this._goToEnd = !1, e < this._startTime)
      return !0;
    this._onStartCallbackFired === !1 && (this._onStartCallback && this._onStartCallback(this._object), this._onStartCallbackFired = !0), n = (e - this._startTime) / this._duration, n = this._duration === 0 || n > 1 ? 1 : n;
    var a = this._easingFunction(n);
    if (this._updateProperties(this._object, this._valuesStart, this._valuesEnd, a), this._onUpdateCallback && this._onUpdateCallback(this._object, n), n === 1)
      if (this._repeat > 0) {
        isFinite(this._repeat) && this._repeat--;
        for (r in this._valuesStartRepeat)
          !this._yoyo && typeof this._valuesEnd[r] == "string" && (this._valuesStartRepeat[r] = this._valuesStartRepeat[r] + parseFloat(this._valuesEnd[r])), this._yoyo && this._swapEndStartRepeatValues(r), this._valuesStart[r] = this._valuesStartRepeat[r];
        return this._yoyo && (this._reversed = !this._reversed), this._repeatDelayTime !== void 0 ? this._startTime = e + this._repeatDelayTime : this._startTime = e + this._delayTime, this._onRepeatCallback && this._onRepeatCallback(this._object), !0;
      } else {
        this._onCompleteCallback && this._onCompleteCallback(this._object);
        for (var o = 0, h = this._chainedTweens.length; o < h; o++)
          this._chainedTweens[o].start(this._startTime + this._duration);
        return this._isPlaying = !1, !1;
      }
    return !0;
  }, t.prototype._updateProperties = function(e, i, r, n) {
    for (var s in r)
      if (i[s] !== void 0) {
        var a = i[s] || 0, o = r[s], h = Array.isArray(e[s]), d = Array.isArray(o), f = !h && d;
        f ? e[s] = this._interpolationFunction(o, n) : typeof o == "object" && o ? this._updateProperties(e[s], a, o, n) : (o = this._handleRelativeValue(a, o), typeof o == "number" && (e[s] = a + (o - a) * n));
      }
  }, t.prototype._handleRelativeValue = function(e, i) {
    return typeof i != "string" ? i : i.charAt(0) === "+" || i.charAt(0) === "-" ? e + parseFloat(i) : parseFloat(i);
  }, t.prototype._swapEndStartRepeatValues = function(e) {
    var i = this._valuesStartRepeat[e], r = this._valuesEnd[e];
    typeof r == "string" ? this._valuesStartRepeat[e] = this._valuesStartRepeat[e] + parseFloat(r) : this._valuesStartRepeat[e] = this._valuesEnd[e], this._valuesEnd[e] = i;
  }, t;
}(), F = "18.6.4", x = S.nextId, c = P, U = c.getAll.bind(c), B = c.removeAll.bind(c), D = c.add.bind(c), j = c.remove.bind(c), q = c.update.bind(c), M = {
  Easing: w,
  Group: C,
  Interpolation: y,
  now: _,
  Sequence: S,
  nextId: x,
  Tween: k,
  VERSION: F,
  getAll: U,
  removeAll: B,
  add: D,
  remove: j,
  update: q
};
function L(t, e) {
  t || console.warn("LaziBoi: element is required and can't be found");
  let i = window.scrollY, r = p(e.multiplier, 1, "multiplier"), n = p(e.min, -100, "minVelocity"), s = p(e.max, 100, "maxVelocity"), a = p(e.dampening, 0.4, "dampening"), o = p(
    e.restrictToViewport,
    !0,
    "restrictToViewport"
  ), h = p(
    e.respectReducedMotion,
    !0,
    "respectReducedMotion"
  ), d = p(
    e.prefer3dTransforms,
    !0,
    "prefer3dTransforms"
  ), f = !1, v = !1;
  o ? new IntersectionObserver(
    (u) => {
      f = u[0].isIntersecting;
    },
    {
      rootMargin: `${window.innerHeight * 2}px`,
      threshold: 0
    }
  ).observe(t) : f = !0, t.style.transition = `transform ${a}s ease-out`, t.style.willChange = "transform", b(), h && window.matchMedia("(prefers-reduced-motion: reduce)").matches && I();
  function p(u, l, T) {
    return typeof u < "u" && typeof u != typeof l && console.warn(
      `LaziBoi: ${T} received the wrong datatype, should be: ${typeof l}`
    ), typeof u < "u" ? u : l;
  }
  function O(u, l, T) {
    return Math.min(Math.max(u, l), T);
  }
  function b(u) {
    const l = { y: u };
    new M.Tween(l).to({ y: u }, 200).easing(M.Easing.Quadratic.Out).onUpdate(() => {
      d ? t.style.transform = `translate3d(0, ${l.y}px, 0)` : t.style.transform = `translateY(${l.y}px)`;
    }).start();
  }
  function I() {
    v = !0, b();
  }
  function R() {
    v = !1;
  }
  function A() {
    I(), $.remove(this);
  }
  function E(u) {
    if (f && !v) {
      const l = O(
        (window.scrollY - i) * r,
        n,
        s
      );
      b(l), M.update(u), i = window.scrollY;
    }
  }
  return {
    disable: I,
    enable: R,
    destroy: A,
    tick: E
  };
}
const $ = (() => {
  const t = [];
  function e(h, d) {
    const f = new L(h, d);
    return t.push(f), f;
  }
  function i(h) {
    t.splice(t.indexOf(h), 1);
  }
  function r() {
    return t;
  }
  function n() {
    t.forEach((h) => h.disable());
  }
  function s() {
    t.forEach((h) => h.enable());
  }
  function a() {
    for (; t.length; )
      t[0].destroy();
  }
  function o() {
    window.requestAnimationFrame(() => {
      t.forEach((h) => h.tick()), o();
    });
  }
  return o(), {
    add: e,
    remove: i,
    getAll: r,
    disableAll: n,
    enableAll: s,
    destroyAll: a
  };
})();
export {
  $ as default
};
