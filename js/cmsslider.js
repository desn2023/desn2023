"use strict";

function cmsSlider() {
    var G = Object.defineProperty;
    var X = (e, t, o) => t in e ? G(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: o
    }) : e[t] = o;
    var U = (e, t, o) => (X(e, typeof t != "symbol" ? t + "" : t, o), o);
    var u = "fs-attributes";
    var h = "cmsattribute";
    var L = "cmscore";
    var m = "cmsslider";
    var _ = "support";
    var M = async (...e) => {
        var o;
        let t = [];
        for (let i of e) {
            let r = await ((o = window.fsAttributes[i]) == null ? void 0 : o.loading);
            t.push(r)
        }
        return t
    };
    var d = class {
        static activateAlerts() {
            this.alertsActivated = !0
        }
        static alert(t, o) {
            if (this.alertsActivated && window.alert(t), o === "error") throw new Error(t)
        }
    };
    U(d, "alertsActivated", !1);
    var y = () => {};
    var f = {
        slider: "w-slider",
        slide: "w-slide",
        sliderMask: "w-slider-mask",
        sliderNav: "w-slider-nav",
        sliderDot: "w-slider-dot",
        activeSliderDot: "w-active"
    };
    var A = e => typeof e == "string";
    var w = () => document.documentElement.getAttribute("data-wf-site");
    var R = async e => {
        var o, i;
        let {
            Webflow: t
        } = window;
        if (!(!t || !("destroy" in t) || !("ready" in t) || !("require" in t)) && !(e && !e.length)) {
            if (e || (t.destroy(), t.ready()), !e || e.includes("ix2")) {
                let r = t.require("ix2");
                if (r) {
                    let {
                        store: n,
                        actions: s
                    } = r, {
                        eventState: a
                    } = n.getState().ixSession, c = Object.entries(a);
                    e || r.destroy(), r.init(), await Promise.all(c.map(l => n.dispatch(s.eventStateChanged(...l))))
                }
            }
            if (!e || e.includes("commerce")) {
                let r = t.require("commerce"),
                    n = w();
                r && n && (r.destroy(), r.init({
                    siteId: n,
                    apiUrl: "https://render.webflow.com"
                }))
            }
            if (e != null && e.includes("lightbox") && ((o = t.require("lightbox")) == null || o.ready()), e != null && e.includes("slider")) {
                let r = t.require("slider");
                r && (r.redraw(), r.ready())
            }
            return e != null && e.includes("tabs") && ((i = t.require("tabs")) == null || i.redraw()), new Promise(r => t.push(() => r(void 0)))
        }
    };

    function P(e, t, o) {
        var r;
        let i = window.fsAttributes[e];
        return i.destroy = o || y, (r = i.resolve) == null || r.call(i, t), t
    }
    var b = (e, t = "1", o = "iife") => {
        let r = `${e}${o==="esm"?".esm":""}.js`;
        return `https://cdn.jsdelivr.net/npm/@finsweet/attributes-${e}@${t}/${r}`
    };
    var W = b(L, "1"),
        N = async () => {
            let {
                fsAttributes: e
            } = window;
            e.cmscore || (e.cmscore = {});
            let {
                cmscore: t
            } = e;
            if (t.import) return t.import;
            try {
                return t.import = import(W), t.import.then(o => {
                    o && (t.version || (t.version = o.version))
                }), t.import
            } catch (o) {
                d.alert(`${o}`, "error");
                return
            }
        };
    var z = `${u}-${_}`,
        D = async () => {
            var r;
            let {
                fsAttributes: e,
                location: t
            } = window, {
                host: o,
                searchParams: i
            } = new URL(t.href);
            return !o.includes("webflow.io") || !i.has(z) ? !1 : (r = e.import) == null ? void 0 : r.call(e, _, "1")
        };
    var C = e => t => `${e}${t?`-${t}`:""}`,
        x = e => {
            let t = (r, n, s) => {
                let a = e[r],
                    {
                        key: c,
                        values: l
                    } = a,
                    p;
                if (!n) return `[${c}]`;
                let I = l == null ? void 0 : l[n];
                A(I) ? p = I : p = I(s && "instanceIndex" in s ? s.instanceIndex : void 0);
                let E = s && "caseInsensitive" in s && s.caseInsensitive ? "i" : "";
                if (!(s != null && s.operator)) return `[${c}="${p}"${E}]`;
                switch (s.operator) {
                    case "prefixed":
                        return `[${c}^="${p}"${E}]`;
                    case "suffixed":
                        return `[${c}$="${p}"${E}]`;
                    case "contains":
                        return `[${c}*="${p}"${E}]`
                }
            };

            function o(r, n) {
                let s = t("element", r, n),
                    a = (n == null ? void 0 : n.scope) || document;
                return n != null && n.all ? [...a.querySelectorAll(s)] : a.querySelector(s)
            }
            return [t, o, (r, n) => {
                let s = e[n];
                return s ? r.getAttribute(s.key) : null
            }]
        };
    var T = {
            preventLoad: {
                key: `${u}-preventload`
            },
            debugMode: {
                key: `${u}-debug`
            },
            src: {
                key: "src",
                values: {
                    finsweet: "@finsweet/attributes"
                }
            },
            dev: {
                key: `${u}-dev`
            }
        },
        [g, qt] = x(T);
    var K = e => {
        let {
            currentScript: t
        } = document, o = {};
        if (!t) return {
            attributes: o,
            preventsLoad: !1
        };
        let r = {
            preventsLoad: A(t.getAttribute(T.preventLoad.key)),
            attributes: o
        };
        for (let n in e) {
            let s = t.getAttribute(e[n]);
            r.attributes[n] = s
        }
        return r
    };
    var O = ({
            scriptAttributes: e,
            attributeKey: t,
            version: o,
            init: i
        }) => {
            var a;
            Q(), (a = window.fsAttributes)[t] || (a[t] = {});
            let {
                preventsLoad: r,
                attributes: n
            } = K(e), s = window.fsAttributes[t];
            s.version = o, s.init = i, r || (window.Webflow || (window.Webflow = []), window.Webflow.push(() => i(n)))
        },
        Q = () => {
            let e = Z();
            if (window.fsAttributes && !Array.isArray(window.fsAttributes)) {
                v(window.fsAttributes, e);
                return
            }
            let t = J(e);
            v(t, e), tt(t), window.fsAttributes = t, window.FsAttributes = window.fsAttributes, D()
        },
        J = e => {
            let t = {
                cms: {},
                push(...o) {
                    var i, r;
                    for (let [n, s] of o)(r = (i = this[n]) == null ? void 0 : i.loading) == null || r.then(s)
                },
                async import(o, i) {
                    let r = t[o];
                    return r || new Promise(n => {
                        let s = document.createElement("script");
                        s.src = b(o, i), s.async = !0, s.onload = () => {
                            let [a] = v(t, [o]);
                            n(a)
                        }, document.head.append(s)
                    })
                },
                destroy() {
                    var o, i;
                    for (let r of e)(i = (o = window.fsAttributes[r]) == null ? void 0 : o.destroy) == null || i.call(o)
                }
            };
            return t
        },
        Z = () => {
            let e = g("src", "finsweet", {
                    operator: "contains"
                }),
                t = g("dev");
            return [...document.querySelectorAll(`script${e}, script${t}`)].reduce((r, n) => {
                var a;
                let s = n.getAttribute(T.dev.key) || ((a = n.src.match(/[\w-. ]+(?=(\.js)$)/)) == null ? void 0 : a[0]);
                return s && !r.includes(s) && r.push(s), r
            }, [])
        },
        v = (e, t) => t.map(i => {
            let r = e[i];
            return r || (e[i] = {}, r = e[i], r.loading = new Promise(n => {
                r.resolve = s => {
                    n(s), delete r.resolve
                }
            }), r)
        }),
        tt = e => {
            let t = Array.isArray(window.fsAttributes) ? window.fsAttributes : [];
            e.push(...t)
        };
    var k = "1.7.1";
    var $ = `fs-${m}`,
        rt = "list",
        ot = "slider",
        st = "resetix",
        nt = {
            true: "true"
        },
        B = {
            element: {
                key: `${$}-element`,
                values: {
                    list: C(rt),
                    slider: C(ot)
                }
            },
            resetIx: {
                key: `${$}-${st}`,
                values: nt
            }
        },
        [S, re] = x(B);
    var {
        element: {
            key: it
        },
        resetIx: {
            key: V,
            values: F
        }
    } = B, Y = e => {
        var i;
        let t = [],
            o = !1;
        for (let r of e) {
            let n = r.getInstanceIndex(it),
                s = document.querySelector(`.${f.slider}${S("element","slider",{instanceIndex:n})}`);
            if (!s) continue;
            (t[i = n || 0] || (t[i] = {
                listInstances: [],
                slider: s
            })).listInstances.push(r), o || (o = s.getAttribute(V) === F.true), o || (o = r.getAttribute(V) === F.true)
        }
        return t = t.filter(r => r && r.listInstances.length), [t, o]
    };
    var q = "role";
    var {
        slide: at,
        sliderMask: ct
    } = f, j = ({
        listInstances: e,
        slider: t
    }) => {
        let o = t.querySelector(`.${ct}`),
            i = t.querySelectorAll(`.${at}`);
        if (!o || !i.length) return;
        let r = i[0].classList.value;
        for (let s of i) s.remove();
        let n = s => {
            for (let {
                    element: a
                }
                of s) {
                a.removeAttribute(q);
                let c = document.createElement("div");
                c.setAttribute("class", r), c.appendChild(a), o.appendChild(c)
            }
        };
        for (let {
                wrapper: s,
                items: a
            }
            of e) n(a), s.style.display = "none";
        return n
    };
    var H = async () => {
        let e = await N();
        if (!e) return [];
        await M(h);
        let t = e.createCMSListInstances([S("element", "list", {
                operator: "prefixed"
            })]),
            [o, i] = Y(t),
            r = async () => {
                let n = ["slider"];
                i && n.push("ix2"), await R(n)
            };
        for (let n of o) {
            let {
                listInstances: s
            } = n, a = j(n);
            if (!!a)
                for (let c of s) c.restartSliders = !0, c.restartIx || (c.restartIx = i), c.items = [], c.on("additems", async l => {
                    c.items = [], a(l), await r()
                })
        }
        return await r(), P(m, t, () => {
            for (let n of t) n.destroy()
        })
    };
    O({
        init: H,
        version: k,
        attributeKey: m
    });
}

cmsSlider();