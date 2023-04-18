"use strict";
function cmsLoad() {
    var qe = Object.create;
    var F = Object.defineProperty;
    var je = Object.getOwnPropertyDescriptor;
    var Xe = Object.getOwnPropertyNames;
    var Qe = Object.getPrototypeOf,
        ze = Object.prototype.hasOwnProperty;
    var Je = (e, t, o) => t in e ? F(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: o
    }) : e[t] = o;
    var Ze = (e, t) => () => (t || e((t = {
        exports: {}
    }).exports, t), t.exports);
    var et = (e, t, o, r) => {
        if (t && typeof t == "object" || typeof t == "function")
            for (let n of Xe(t)) !ze.call(e, n) && n !== o && F(e, n, {
                get: () => t[n],
                enumerable: !(r = je(t, n)) || r.enumerable
            });
        return e
    };
    var tt = (e, t, o) => (o = e != null ? qe(Qe(e)) : {}, et(t || !e || !e.__esModule ? F(o, "default", {
        value: e,
        enumerable: !0
    }) : o, e));
    var oe = (e, t, o) => (Je(e, typeof t != "symbol" ? t + "" : t, o), o);
    var $e = Ze((tr, De) => {
        De.exports = Yt;

        function Yt(e, t, o, r) {
            var n, i, s;
            return function() {
                if (s = this, i = Array.prototype.slice.call(arguments), n && (o || r)) return;
                if (!o) return c(), n = setTimeout(l, t), n;
                n = setTimeout(c, t), e.apply(s, i);

                function l() {
                    c(), e.apply(s, i)
                }

                function c() {
                    clearTimeout(n), n = null
                }
            }
        }
    });
    var P = "fs-attributes";
    var ne = "animation";
    var re = "cmscore";
    var L = "cmsload";
    var G = "support";
    var A = class {
        static activateAlerts() {
            this.alertsActivated = !0
        }
        static alert(t, o) {
            if (this.alertsActivated && window.alert(t), o === "error") throw new Error(t)
        }
    };
    oe(A, "alertsActivated", !1);
    var v = () => {};

    function h(e, t, o, r) {
        return e ? (e.addEventListener(t, o, r), () => e.removeEventListener(t, o, r)) : v
    }
    var ie = e => e instanceof Element;
    var se = e => e instanceof HTMLAnchorElement;
    var ae = (e, t) => !!e && t.includes(e);
    var W = e => e != null;
    var B = e => typeof e == "string",
        ce = e => typeof e == "number";
    var N = "w--current";
    var le = {
        wrapper: "w-dyn-list",
        list: "w-dyn-items",
        item: "w-dyn-item",
        paginationWrapper: "w-pagination-wrapper",
        paginationNext: "w-pagination-next",
        paginationPrevious: "w-pagination-previous",
        pageCount: "w-page-count",
        emptyState: "w-dyn-empty"
    };
    var me = {
            addToCartForm: "w-commerce-commerceaddtocartform"
        },
        ue = {
            trigger: "w-lightbox"
        };
    var U = (e, t = !0) => e.cloneNode(t);

    function O(e, t, o, r = !0) {
        let n = o ? [o] : [];
        if (!e) return n;
        let i = e.split(",").reduce((s, a) => {
            let l = a.trim();
            return (!r || l) && s.push(l), s
        }, []);
        if (t) {
            let s = i.filter(a => ae(a, t));
            return s.length ? s : n
        }
        return i
    }
    var pe = new Map([
        ["tiny", "(max-width: 479px)"],
        ["small", "(max-width: 767px)"],
        ["medium", "(max-width: 991px)"],
        ["main", "(min-width: 992px)"]
    ]);
    var Y = () => {
        for (let [e, t] of pe)
            if (window.matchMedia(t).matches) return e;
        return "main"
    };
    var q = (e = document) => {
        var o;
        let t = "Last Published:";
        for (let r of e.childNodes)
            if (r.nodeType === Node.COMMENT_NODE && ((o = r.textContent) != null && o.includes(t))) {
                let n = r.textContent.trim().split(t)[1];
                if (n) return new Date(n)
            }
    };
    var D = (e = document) => e.documentElement.getAttribute("data-wf-site");

    function de(e, t, o) {
        var n;
        let r = window.fsAttributes[e];
        return r.destroy = o || v, (n = r.resolve) == null || n.call(r, t), t
    }
    var R = (e, t = "1", o = "iife") => {
        let n = `${e}${o==="esm"?".esm":""}.js`;
        return `https://cdn.jsdelivr.net/npm/@finsweet/attributes-${e}@${t}/${n}`
    };
    var ot = R(ne, "1", "esm"),
        fe = async () => {
            let {
                fsAttributes: e
            } = window;
            e.animation || (e.animation = {});
            let {
                animation: t
            } = e;
            if (t.import) return t.import;
            try {
                return t.import = import(ot), t.import
            } catch (o) {
                A.alert(`${o}`, "error");
                return
            }
        };
    var nt = R(re, "1"),
        ge = async () => {
            let {
                fsAttributes: e
            } = window;
            e.cmscore || (e.cmscore = {});
            let {
                cmscore: t
            } = e;
            if (t.import) return t.import;
            try {
                return t.import = import(nt), t.import.then(o => {
                    o && (t.version || (t.version = o.version))
                }), t.import
            } catch (o) {
                A.alert(`${o}`, "error");
                return
            }
        };
    var rt = `${P}-${G}`,
        Ee = async () => {
            var n;
            let {
                fsAttributes: e,
                location: t
            } = window, {
                host: o,
                searchParams: r
            } = new URL(t.href);
            return !o.includes("webflow.io") || !r.has(rt) ? !1 : (n = e.import) == null ? void 0 : n.call(e, G, "1")
        };
    var b = e => t => `${e}${t?`-${t}`:""}`,
        $ = e => {
            let t = (n, i, s) => {
                let a = e[n],
                    {
                        key: l,
                        values: c
                    } = a,
                    m;
                if (!i) return `[${l}]`;
                let p = c == null ? void 0 : c[i];
                B(p) ? m = p : m = p(s && "instanceIndex" in s ? s.instanceIndex : void 0);
                let f = s && "caseInsensitive" in s && s.caseInsensitive ? "i" : "";
                if (!(s != null && s.operator)) return `[${l}="${m}"${f}]`;
                switch (s.operator) {
                    case "prefixed":
                        return `[${l}^="${m}"${f}]`;
                    case "suffixed":
                        return `[${l}$="${m}"${f}]`;
                    case "contains":
                        return `[${l}*="${m}"${f}]`
                }
            };

            function o(n, i) {
                let s = t("element", n, i),
                    a = (i == null ? void 0 : i.scope) || document;
                return i != null && i.all ? [...a.querySelectorAll(s)] : a.querySelector(s)
            }
            return [t, o, (n, i) => {
                let s = e[i];
                return s ? n.getAttribute(s.key) : null
            }]
        };
    var I = {
            preventLoad: {
                key: `${P}-preventload`
            },
            debugMode: {
                key: `${P}-debug`
            },
            src: {
                key: "src",
                values: {
                    finsweet: "@finsweet/attributes"
                }
            },
            dev: {
                key: `${P}-dev`
            }
        },
        [j, un] = $(I);
    var Te = e => {
        let {
            currentScript: t
        } = document, o = {};
        if (!t) return {
            attributes: o,
            preventsLoad: !1
        };
        let n = {
            preventsLoad: B(t.getAttribute(I.preventLoad.key)),
            attributes: o
        };
        for (let i in e) {
            let s = t.getAttribute(e[i]);
            n.attributes[i] = s
        }
        return n
    };
    var Se = ({
            scriptAttributes: e,
            attributeKey: t,
            version: o,
            init: r
        }) => {
            var a;
            it(), (a = window.fsAttributes)[t] || (a[t] = {});
            let {
                preventsLoad: n,
                attributes: i
            } = Te(e), s = window.fsAttributes[t];
            s.version = o, s.init = r, n || (window.Webflow || (window.Webflow = []), window.Webflow.push(() => r(i)))
        },
        it = () => {
            let e = at();
            if (window.fsAttributes && !Array.isArray(window.fsAttributes)) {
                X(window.fsAttributes, e);
                return
            }
            let t = st(e);
            X(t, e), ct(t), window.fsAttributes = t, window.FsAttributes = window.fsAttributes, Ee()
        },
        st = e => {
            let t = {
                cms: {},
                push(...o) {
                    var r, n;
                    for (let [i, s] of o)(n = (r = this[i]) == null ? void 0 : r.loading) == null || n.then(s)
                },
                async import(o, r) {
                    let n = t[o];
                    return n || new Promise(i => {
                        let s = document.createElement("script");
                        s.src = R(o, r), s.async = !0, s.onload = () => {
                            let [a] = X(t, [o]);
                            i(a)
                        }, document.head.append(s)
                    })
                },
                destroy() {
                    var o, r;
                    for (let n of e)(r = (o = window.fsAttributes[n]) == null ? void 0 : o.destroy) == null || r.call(o)
                }
            };
            return t
        },
        at = () => {
            let e = j("src", "finsweet", {
                    operator: "contains"
                }),
                t = j("dev");
            return [...document.querySelectorAll(`script${e}, script${t}`)].reduce((n, i) => {
                var a;
                let s = i.getAttribute(I.dev.key) || ((a = i.src.match(/[\w-. ]+(?=(\.js)$)/)) == null ? void 0 : a[0]);
                return s && !n.includes(s) && n.push(s), n
            }, [])
        },
        X = (e, t) => t.map(r => {
            let n = e[r];
            return n || (e[r] = {}, n = e[r], n.loading = new Promise(i => {
                n.resolve = s => {
                    i(s), delete n.resolve
                }
            }), n)
        }),
        ct = e => {
            let t = Array.isArray(window.fsAttributes) ? window.fsAttributes : [];
            e.push(...t)
        };
    var xe = "1.11.2";
    var mt = "fs-cms-element",
        ut = {
            wrapper: "wrapper",
            list: "list",
            item: "item",
            paginationWrapper: "pagination-wrapper",
            paginationNext: "pagination-next",
            paginationPrevious: "pagination-previous",
            pageCount: "page-count",
            emptyState: "empty"
        },
        T = e => {
            let t = `.${le[e]}`,
                o = `[${mt}="${ut[e]}"]`;
            return `:is(${t}, ${o})`
        },
        be = (e, t = document) => {
            e = e.filter(i => i);
            let o = e.join(", ") || T("wrapper");
            return [...t.querySelectorAll(o)].reduce((i, s) => {
                if (!s) return i;
                let a = C(s, "wrapper");
                return !a || i.includes(a) || i.push(a), i
            }, [])
        };

    function C(e, t, o = document) {
        let r = typeof e == "string" ? o.querySelector(e) : e;
        if (!r) return;
        let n = r.closest(T("wrapper"));
        if (!n) return;
        let i = n.querySelector(T("list"));
        return t === "wrapper" ? n : t === "list" ? i : t === "items" ? [...(i == null ? void 0 : i.querySelectorAll(`:scope > ${T("item")}`)) || []] : t === "pageCount" ? n.querySelector(T("pageCount")) : t === "empty" ? n.querySelector(`:scope > ${T("emptyState")}`) : t === "pagination" ? n.querySelector(T("paginationWrapper")) : n.querySelector(T(t === "next" ? "paginationNext" : "paginationPrevious"))
    }
    var w = "pages",
        Q = new Map,
        k = async (e, {
            cacheExternal: t,
            cacheKey: o,
            cacheVersion: r
        } = {}) => {
            var n, i;
            try {
                let s = new URL(e, window.location.origin),
                    a = await pt(s);
                if (a) return a;
                let l = D(),
                    c = q(),
                    m = l || o,
                    p = (i = (n = c == null ? void 0 : c.getTime()) != null ? n : r) != null ? i : 1,
                    f = m ? await dt(m, p) : null;
                if (!f) {
                    let {
                        page: g
                    } = await ye(s);
                    return g
                }
                let d = await ft(f, s.href);
                if (d) {
                    let g = z(d);
                    return t && !Ce(g, l) && Ae(f, s, l, t), g
                }
                return await Ae(f, s, l, t)
            } catch {
                return null
            }
        }, pt = async e => {
            let t = await Q.get(e.href);
            if (t) return z(t)
        }, ye = async e => {
            let t = fetch(e.href).then(n => n.text());
            Q.set(e.href, t);
            let o = await t;
            return {
                page: z(o),
                rawPage: o
            }
        }, Ae = async (e, t, o, r) => {
            let {
                page: n,
                rawPage: i
            } = await ye(t), s = Ce(n, o);
            return !s && !r || (await gt(e, t.href, i), s && Q.delete(t.href)), n
        }, Ce = (e, t) => {
            if (!t) return !1;
            let o = D(e);
            return o && o === t
        }, z = e => new DOMParser().parseFromString(e, "text/html"), dt = (e, t) => new Promise(o => {
            try {
                let r = window.indexedDB.open(e, t);
                r.onblocked = () => {
                    o(null)
                }, r.onupgradeneeded = () => {
                    let n = r.result;
                    n.objectStoreNames.contains(w) && n.deleteObjectStore(w), n.createObjectStore(w)
                }, r.onerror = () => o(null), r.onsuccess = () => {
                    let n = r.result;
                    n.onversionchange = () => n.close(), o(n)
                }
            } catch {
                o(null)
            }
        }), ft = async (e, t) => new Promise(o => {
            let i = e.transaction(w).objectStore(w).get(t);
            i.onerror = () => o(null), i.onsuccess = () => o(i.result)
        }), gt = async (e, t, o) => new Promise(r => {
            let s = e.transaction(w, "readwrite").objectStore(w).put(o, t);
            s.onerror = () => r(), s.onsuccess = () => r()
        });
    var we = ({
            textContent: e
        }) => {
            if (!e) return;
            let [, t] = e.split("/");
            return t ? parseInt(t.trim()) : void 0
        },
        K = async (e, t, o, r) => {
            r == null || r.preventDefault();
            let {
                items: n,
                itemsPerPage: i
            } = e;
            if (!(!t && i === n.length)) {
                if (i + o <= n.length) e.itemsPerPage = i + o;
                else if (t) {
                    let s = await e.once("renderitems");
                    e.itemsPerPage = i + s.length
                } else e.itemsPerPage += n.length - i;
                await e.renderItems(!0)
            }
        }, _e = e => {
            let {
                pagesQuery: t,
                currentPage: o,
                totalPages: r,
                paginationNext: n,
                paginationPrevious: i
            } = e;
            o && (i && (i.style.display = o !== 1 ? "" : "none", i.href = `?${t}=${o-1}`), n && (n.style.display = o !== r ? "" : "none", n.href = `?${t}=${o+1}`))
        }, Pe = (e, {
            currentPage: t,
            totalPages: o
        }) => {
            e.setAttribute("aria-label", `Page ${t} of ${o}`), e.textContent = `${t} / ${o}`
        };
    var V = async (e, t, o) => {
        var p;
        let {
            index: r,
            paginationNext: n,
            paginationPrevious: i,
            originalItemsPerPage: s
        } = t, a = be([], e)[r];
        if (!a) return;
        if (!i || !n) {
            let f = C(a, "pagination"),
                d = C(a, "previous"),
                u = C(a, "next");
            if (d) {
                let g = [...(f == null ? void 0 : f.children) || []].indexOf(d);
                t.addPaginationButton(d, "paginationPrevious", g)
            }
            if (u) {
                let g = [...(f == null ? void 0 : f.children) || []].indexOf(u);
                d || (g += 1), t.addPaginationButton(u, "paginationNext", g)
            }
        }
        let l = (p = C(a, "next")) == null ? void 0 : p.href,
            c = C(a, "items"),
            {
                length: m
            } = c;
        return l && s !== m && (t.originalItemsPerPage = t.itemsPerPage = m), await t.addItems(c, o), l
    };
    var y = async e => {
        let {
            paginationNext: t,
            paginationPrevious: o,
            paginationCount: r,
            extractingPaginationData: n
        } = e;
        if (!t && !o) return;
        await n;
        let i = r ? we(r) : void 0;
        await e.displayElement("loader"), i ? await Le(e, i) : await Et(e), await e.emit("finishload"), await e.displayElement("loader", !1)
    }, Et = async e => {
        let {
            paginationNext: t,
            currentPage: o
        } = e;
        if (o && await Le(e, o), !t) return;
        let {
            href: r
        } = t, n = [r], i = async s => {
            let a = await k(s);
            if (!a) return;
            let l = await V(a, e);
            !l || n.includes(l) || (n.push(l), await i(l))
        };
        await i(r)
    }, Le = async (e, t) => {
        let {
            paginationNext: o,
            paginationPrevious: r
        } = e;
        if (!o && !r) return;
        let {
            pagesQuery: n,
            currentPage: i
        } = e;
        if (!n || !i) return;
        let {
            origin: s,
            pathname: a
        } = window.location;
        for (let c = i - 1; c >= 1; c--) {
            let m = await k(`${s}${a}?${n}=${c}`);
            if (!m) return;
            await V(m, e, "unshift")
        }
        let l = [];
        for (let c = i + 1; c <= t; c++) l[c] = (async () => {
            let m = l[c - 1],
                p = await k(`${s}${a}?${n}=${c}`);
            await m, p && await V(p, e)
        })();
        await Promise.all(l)
    };
    var he = async e => {
        let {
            paginationNext: t,
            paginationPrevious: o,
            paginationCount: r,
            itemsPerPage: n
        } = e;
        if (!t) return;
        o && (o.style.display = "none"), r == null || r.remove();
        let i = !0,
            s = !1;
        e.initPagination(), e.on("renderitems", () => {
            let {
                validItems: m,
                items: p,
                itemsPerPage: f
            } = e;
            if (!i && p.length === f) return c();
            t.style.display = m.length > f ? "" : "none"
        });
        let l = h(t, "click", async m => {
                m.preventDefault(), !s && (s = !0, await K(e, i, n, m), s = !1)
            }),
            c = () => {
                l(), t.style.display = "none"
            };
        return await y(e), i = !1, c
    };
    var Re = Tt;

    function Tt(e, t, o) {
        var r = null,
            n = null,
            i = o && o.leading,
            s = o && o.trailing;
        i == null && (i = !0), s == null && (s = !i), i == !0 && (s = !1);
        var a = function() {
                r && (clearTimeout(r), r = null)
            },
            l = function() {
                var m = n;
                a(), m && m()
            },
            c = function() {
                var m = i && !r,
                    p = this,
                    f = arguments;
                if (n = function() {
                        return e.apply(p, f)
                    }, r || (r = setTimeout(function() {
                        if (r = null, s) return n()
                    }, t)), m) return m = !1, n()
            };
        return c.cancel = a, c.flush = l, c
    }
    var S = `fs-${L}`,
        St = "list",
        xt = "loader",
        bt = "items-count",
        At = "visible-count",
        yt = "visible-count-from",
        Ct = "visible-count-to",
        wt = "scroll-anchor",
        _t = "page-button",
        Pt = "page-dots",
        Lt = "empty",
        ht = "mode",
        Rt = {
            loadUnder: "load-under",
            renderAll: "render-all",
            pagination: "pagination",
            infinite: "infinite"
        },
        vt = "threshold",
        It = "pagesiblings",
        Mt = "pageboundary",
        Bt = "animation",
        Nt = "easing",
        Ut = "duration",
        Ot = "stagger",
        Dt = "resetix",
        $t = {
            true: "true"
        },
        kt = "showquery",
        Kt = {
            true: "true"
        },
        M = {
            element: {
                key: `${S}-element`,
                values: {
                    list: b(St),
                    loader: b(xt),
                    itemsCount: b(bt),
                    visibleCount: b(At),
                    visibleCountFrom: b(yt),
                    visibleCountTo: b(Ct),
                    scrollAnchor: b(wt),
                    empty: b(Lt),
                    pageButton: _t,
                    pageDots: Pt
                }
            },
            mode: {
                key: `${S}-${ht}`,
                values: Rt
            },
            threshold: {
                key: `${S}-${vt}`
            },
            pageSiblings: {
                key: `${S}-${It}`
            },
            pageBoundary: {
                key: `${S}-${Mt}`
            },
            animation: {
                key: `${S}-${Bt}`
            },
            easing: {
                key: `${S}-${Nt}`
            },
            duration: {
                key: `${S}-${Ut}`
            },
            stagger: {
                key: `${S}-${Ot}`
            },
            resetIx: {
                key: `${S}-${Dt}`,
                values: $t
            },
            showQuery: {
                key: `${S}-${kt}`,
                values: Kt
            }
        },
        [H, x] = $(M),
        ve = "-20",
        Ie = 1,
        Me = 1,
        Be = {
            main: 0,
            medium: 1,
            small: 2,
            tiny: 3
        };
    var {
        pageSiblings: {
            key: Vt
        },
        pageBoundary: {
            key: Ht
        },
        threshold: {
            key: Ft
        },
        showQuery: {
            key: Gt,
            values: Wt
        }
    } = M, Ne = e => {
        let {
            paginationWrapper: t,
            paginationCount: o
        } = e;
        if (!t) return;
        let r = x("pageButton", {
                operator: "prefixed",
                scope: t
            }),
            n = x("pageDots", {
                operator: "prefixed",
                scope: t
            });
        n ? n.remove() : (n = document.createElement("div"), n.textContent = "...");
        let i = e.getAttribute(Ht),
            s = (i ? O(i) : []).map(d => parseInt(d)),
            a = e.getAttribute(Vt),
            l = (a ? O(a) : []).map(d => parseInt(d)),
            [c, m] = J(s, l),
            p = [s, l].some(({
                length: d
            }) => d > 1),
            f = e.getAttribute(Gt) === Wt.true;
        return {
            paginationWrapper: t,
            pageButtonTemplate: r,
            pageDotsTemplate: n,
            paginationCount: o,
            pageBoundary: c,
            pageBoundaryValues: s,
            pageSiblings: m,
            pageSiblingsValues: l,
            hasBreakpoints: p,
            showQueryParams: f
        }
    }, J = (e, t) => {
        let o = Y(),
            r = Be[o],
            n = [];
        [e, t].forEach((a, l) => {
            for (let c = r; c >= 0; c--) {
                let m = a[c];
                if (ce(m)) {
                    n[l] = m;
                    break
                }
            }
        });
        let [i, s] = n;
        return i != null || (i = Me), s != null || (s = Ie), [i, s]
    }, Ue = e => 1 - parseInt(e.getAttribute(Ft) || ve) / 100;
    var Oe = async e => {
        let {
            list: t,
            paginationNext: o,
            paginationPrevious: r,
            paginationCount: n,
            itemsPerPage: i
        } = e;
        if (!t || !o) return;
        r && (r.style.display = "none"), n == null || n.remove();
        let s = Ue(e),
            a = !0,
            l = !1;
        e.initPagination(), e.on("renderitems", () => {
            let {
                validItems: d,
                items: u,
                itemsPerPage: g
            } = e;
            if (!a && u.length === g) {
                f();
                return
            }
            o.style.display = d.length > g ? "" : "none"
        });
        let c = async d => {
            d.preventDefault()
        }, m = Re(async () => {
            if (l) return;
            let {
                innerHeight: d
            } = window, {
                bottom: u
            } = t.getBoundingClientRect(), g = s * d;
            u > 0 && u <= g && (l = !0, await K(e, a, i), l = !1)
        }, 100), p = new IntersectionObserver(d => {
            for (let {
                    isIntersecting: u
                }
                of d) window[u ? "addEventListener" : "removeEventListener"]("scroll", m)
        }), f = () => {
            window.removeEventListener("scroll", m), o.removeEventListener("click", c), o.style.display = "none", p.disconnect()
        };
        return o.addEventListener("click", c), p.observe(t), await y(e), a = !1, f
    };
    var ke = tt($e(), 1);
    var Ke = async e => {
        let t = Ne(e);
        if (!t) return;
        let {
            paginationWrapper: o,
            pageButtonTemplate: r,
            pageDotsTemplate: n,
            paginationCount: i,
            pageBoundary: s,
            pageBoundaryValues: a,
            pageSiblings: l,
            pageSiblingsValues: c,
            hasBreakpoints: m,
            showQueryParams: p
        } = t, f;
        if (r) {
            let {
                parentElement: g
            } = r;
            r.remove(), g && (f = {
                parentElement: g,
                pageButtonTemplate: r,
                pageDotsTemplate: n,
                pageBoundary: s,
                pageSiblings: l,
                renderedElements: new Map([])
            })
        }
        e.initPagination(p), e.on("renderitems", () => qt(e, f, i));
        let d = h(o, "click", g => Qt(g, f, e)),
            u;
        return f && m && (u = h(window, "resize", (0, ke.default)(() => {
            zt(f, e, a, c)
        }, 100))), await y(e), () => {
            d(), u == null || u()
        }
    }, qt = (e, t, o, r = !0) => {
        t && Ve(t, e), o && Pe(o, e), r && _e(e)
    }, Ve = (e, t) => {
        let {
            currentPage: o,
            totalPages: r
        } = t;
        if (!o) return;
        let {
            parentElement: n,
            renderedElements: i,
            pageBoundary: s,
            pageSiblings: a
        } = e, l = [...i], c = a * 2 + 1, p = s * 2 + c + 2, f = o - 1 < p - c, d = r - o < p - c;
        for (let u = 1; u <= p; u++) {
            let [g, Z] = l[u - 1] || [], [ee] = l[u - 2] || [];
            if (u > r) {
                g && (g.remove(), l[u - 1] = void 0);
                continue
            }
            let E;
            r <= p ? E = u : f ? u > p - s ? E = r - (p - u) : u === p - s ? E = null : E = u : d ? u < s + 1 ? E = u : u === s + 1 ? E = null : E = r - (p - u) : u < s + 1 ? E = u : u > p - s ? E = r - (p - u) : u === s + 1 || u === p - s ? E = null : E = o + (u - (s + 1) - (1 + a));
            let _;
            Z !== E && (g == null || g.remove(), _ = jt(e, E, t), l[u - 1] = [_, E], ee ? n.insertBefore(_, ee.nextSibling) : n.appendChild(_), _.style.opacity = "");
            let te = _ || g;
            te && Xt(te, E === o)
        }
        e.renderedElements = new Map([...l.filter(W)])
    }, jt = ({
        pageButtonTemplate: e,
        pageDotsTemplate: t
    }, o, {
        pagesQuery: r
    }) => {
        if (!o) return U(t);
        let n = U(e);
        return n.classList.remove(N), n.textContent = `${o}`, se(n) && r && (n.href = `?${r}=${o}`), n
    }, Xt = (e, t) => {
        t ? (e.classList.add(N), e.setAttribute("aria-current", "page")) : (e.classList.remove(N), e.removeAttribute("aria-current"))
    }, Qt = (e, t, o) => {
        let {
            target: r
        } = e;
        if (!ie(r)) return;
        let n = r.closest(H("element", "pageButton", {
                operator: "prefixed"
            })),
            i = r.closest(T("paginationNext")),
            s = r.closest(T("paginationPrevious"));
        if (!n && !i && !s) return;
        e.preventDefault();
        let {
            currentPage: a,
            totalPages: l
        } = o;
        if (!a) return;
        let c;
        i && (c = a + 1), s && (c = a - 1), n && (c = t == null ? void 0 : t.renderedElements.get(n)), c && c >= 1 && c <= l && o.switchPage(c)
    }, zt = (e, t, ...o) => {
        let {
            pageBoundary: r,
            pageSiblings: n,
            renderedElements: i
        } = e, [s, a] = J(...o);
        if (!(r === s && n === a)) {
            e.pageBoundary = s, e.pageSiblings = a;
            for (let [l] of i) l.remove();
            i.clear(), Ve(e, t)
        }
    };
    var He = async e => {
        let {
            paginationNext: t,
            paginationPrevious: o,
            paginationCount: r
        } = e;
        t && (t.style.display = "none", o && (o.style.display = "none"), r == null || r.remove(), await y(e))
    };
    var {
        element: {
            key: Jt
        },
        mode: {
            key: Zt,
            values: {
                renderAll: eo,
                infinite: to,
                pagination: oo
            }
        },
        animation: {
            key: no
        },
        duration: {
            key: Fe
        },
        easing: {
            key: Ge
        },
        stagger: {
            key: ro
        },
        resetIx: {
            key: io,
            values: so
        }
    } = M, We = async (e, t) => {
        let o = e.getInstanceIndex(Jt),
            {
                items: r
            } = e,
            {
                Webflow: n
            } = window,
            i = !!n && "require" in n;
        t.addItemsAnimation(e, {
            animationKey: no,
            durationKey: Fe,
            easingKey: Ge,
            staggerKey: ro
        }), t.addListAnimation(e, {
            durationKey: Fe,
            easingKey: Ge
        });
        let s = i && !!n.require("commerce") && r.some(({
            element: d
        }) => d.querySelector(`.${me.addToCartForm}`));
        s && (e.restartCommerce = s);
        let a = i && !!n.require("lightbox") && r.some(({
            element: d
        }) => d.querySelector(`.${ue.trigger}`));
        a && (e.restartLightbox = a);
        let l = e.getAttribute(io) === so.true;
        l && (e.restartIx = l);
        let c = x("loader", {
            instanceIndex: o
        });
        c && e.addLoader(c);
        let m = x("empty", {
            instanceIndex: o
        });
        if (m && e.addEmptyElement(m), !e.itemsCount) {
            let d = x("itemsCount", {
                instanceIndex: o
            });
            d && e.addItemsCount(d)
        }
        if (!e.visibleCount || !e.visibleCountFrom || !e.visibleCountTo) {
            let d = x("visibleCount", {
                    instanceIndex: o
                }),
                u = x("visibleCountFrom", {
                    instanceIndex: o
                }),
                g = x("visibleCountTo", {
                    instanceIndex: o
                });
            e.addVisibleCount(d, u, g)
        }
        if (!e.scrollAnchor) {
            let d = x("scrollAnchor", {
                instanceIndex: o
            });
            d && (e.scrollAnchor = d)
        }
        let p = e.getAttribute(Zt);
        return p === eo ? await He(e) : p === to ? await Oe(e) : p === oo ? await Ke(e) : await he(e)
    };
    var Ye = async () => {
        let e = await ge();
        if (!e) return [];
        let t = e.createCMSListInstances([H("element", "list", {
                operator: "prefixed"
            })]),
            o = await Promise.all(t.map(r => We(r, e)));
        return de(L, t, () => {
            var r;
            for (let n of t)(r = n.destroy) == null || r.call(n);
            for (let n of o) n == null || n()
        })
    };
    Se({
        init: Ye,
        version: xe,
        attributeKey: L
    });
    fe();
}

cmsLoad();