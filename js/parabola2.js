var Parabola = function(u, n, t) { !
    function() {
        for (var r = 0,
                 t = ["webkit", "moz"], e = 0; e < t.length && !window.requestAnimationFrame; ++e) window.requestAnimationFrame = window[t[e] + "RequestAnimationFrame"],
            window.cancelAnimationFrame = window[t[e] + "CancelAnimationFrame"] || window[t[e] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(t, e) {
            var n = (new Date).getTime(),
                i = Math.max(0, 16.7 - (n - r)),
                o = window.setTimeout(function() {
                        t(n + i)
                    },
                    i);
            return r = n + i,
                o
        }),
        window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
            clearTimeout(t)
        })
    } ();
    var e = {
            speed: 166.67,
            curvature: .001,
            endScale: "1",
            progress: function() {},
            complete: function() {}
        },
        c = {};
    for (var i in t = t || {},
        e) c[i] = t[i] || e[i];
    var l = "margin",
        o = document.createElement("div");
    "oninput" in o && ["", "ms", "webkit"].forEach(function(t) {
        var e = t + (t ? "T": "t") + "ransform";
        e in o.style && (l = e)
    });
    var d = c.curvature,
        w = 0,
        f = !0;
    if (u && n && 1 == u.nodeType && 1 == n.nodeType) {
        var r = {},
            a = {},
            m = {},
            s = {},
            p = {},
            x = {};
        this.position = function() {
            if (0 == f) return this;
            var t = document.documentElement.scrollLeft || document.body.scrollLeft,
                e = document.documentElement.scrollTop || document.body.scrollTop;
            return "margin" == l ? u.style.marginLeft = u.style.marginTop = "0px": u.style[l] = "translate(0, 0)",
                r = u.getBoundingClientRect(),
                a = n.getBoundingClientRect(),
                m = {
                    x: r.left + (r.right - r.left) / 2 + t,
                    y: r.top + (r.bottom - r.top) / 2 + e
                },
                s = {
                    x: a.left + (a.right - a.left) / 2 + t,
                    y: a.top + (a.bottom - a.top) / 2 + e
                },
                p = {
                    x: 0,
                    y: 0
                },
                x = {
                    x: -1 * (m.x - s.x),
                    y: -1 * (m.y - s.y)
                },
                w = (x.y - d * x.x * x.x) / x.x,
                this
        },
            this.move = function() {
                if (0 == f) return this;
                var r = 0,
                    a = 0 < x.x ? 1 : -1,
                    m = 1,
                    s = function() {
                        var t = 2 * d * r + w,
                            e = Math.sqrt(c.speed / (t * t + 1));
                        r += a * e;
                        var n = (1 - c.endScale) * e / Math.abs(p.x - x.x);
                        m -= n,
                        (1 == a && r > x.x || -1 == a && r < x.x) && (r = x.x);
                        var i = r,
                            o = d * i * i + w * i;
                        u.setAttribute("data-center", [Math.round(i), Math.round(o)].join()),
                            "margin" == l ? (u.style.marginLeft = i + "px", u.style.marginTop = o + "px") : u.style[l] = "translate(" + [i + "px", o + "px"].join() + ")scale(" + m + ")",
                            r !== x.x ? (c.progress(i, o), window.requestAnimationFrame(s)) : (c.complete(), f = !0)
                    };
                return window.requestAnimationFrame(s),
                    f = !1,
                    this
            },
            this.init = function() {
                return this.position().move(),
                    this
            }
    }
};