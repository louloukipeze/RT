(() => {
    var V = Object.defineProperty;
    var D = (e, t, r) => t in e ? V(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : e[t] = r;
    var T = (e, t, r) => (D(e, typeof t != "symbol" ? t + "" : t, r), r);
    var l = (e, t, r) => new Promise((s, i) => {
        var o = n => {
                try {
                    c(r.next(n))
                } catch (m) {
                    i(m)
                }
            },
            a = n => {
                try {
                    c(r.throw(n))
                } catch (m) {
                    i(m)
                }
            },
            c = n => n.done ? s(n.value) : Promise.resolve(n.value).then(o, a);
        c((r = r.apply(e, t)).next())
    });
    var u = class {
        static activateAlerts() {
            this.alertsActivated = !0
        }
        static alert(t, r) {
            if (this.alertsActivated && window.alert(t), r === "error") throw new Error(t)
        }
    };
    T(u, "alertsActivated", !1);
    var A = e => t => `${e}${t?`-${t}`:""}`,
        f = e => {
            let t = (s, i, o) => {
                let a = e[s],
                    {
                        key: c,
                        values: n
                    } = a,
                    m;
                if (!i) return `[${c}]`;
                let y = n == null ? void 0 : n[i];
                if (typeof y == "string" ? m = y : m = y(o && "instanceIndex" in o ? o.instanceIndex : void 0), !(o == null ? void 0 : o.operator)) return `[${c}="${m}"]`;
                switch (o.operator) {
                    case "prefixed":
                        return `[${c}^="${m}"]`;
                    case "suffixed":
                        return `[${c}$="${m}"]`;
                    case "contains":
                        return `[${c}*="${m}"]`
                }
            };
            return [t, (s, i) => {
                let o = t("element", s, i);
                return ((i == null ? void 0 : i.scope) || document).querySelector(o)
            }]
        };
    var w = "fs-attributes",
        b = {
            preventLoad: {
                key: `${w}-preventload`
            },
            debugMode: {
                key: `${w}-debug`
            },
            src: {
                key: "src",
                values: {
                    finsweet: "@finsweet/attributes"
                }
            },
            dev: {
                key: `${w}-dev`
            }
        },
        [C, J] = f(b);
    var x = () => {
        let {
            currentScript: e
        } = document, {
            preventLoad: t,
            debugMode: r
        } = b, s = typeof(e == null ? void 0 : e.getAttribute(t.key)) == "string";
        return typeof(e == null ? void 0 : e.getAttribute(r.key)) == "string" && u.activateAlerts(), {
            preventsLoad: s
        }
    };
    var I = () => {
            if (window.fsAttributes && !Array.isArray(window.fsAttributes)) return;
            let e = {
                cms: {},
                push(...t) {
                    var r, s;
                    for (let [i, o] of t)(s = (r = this[i]) == null ? void 0 : r.loading) == null || s.then(o)
                }
            };
            R(e), U(e), window.fsAttributes = e, window.FsAttributes = window.fsAttributes
        },
        R = e => {
            let t = C("src", "finsweet", {
                    operator: "contains"
                }),
                r = C("dev"),
                i = [...document.querySelectorAll(`script${t}, script${r}`)].reduce((o, a) => {
                    var n;
                    let c = a.getAttribute(b.dev.key) || ((n = a.src.match(/[\w-. ]+(?=(\.js)$)/)) == null ? void 0 : n[0]);
                    return c && !o.includes(c) && o.push(c), o
                }, []);
            for (let o of i) {
                e[o] = {};
                let a = e[o];
                a.loading = new Promise(c => {
                    a.resolve = n => {
                        c(n), delete a.resolve
                    }
                })
            }
        },
        U = e => {
            let t = Array.isArray(window.fsAttributes) ? window.fsAttributes : [];
            e.push(...t)
        };
    var j = "https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmscore@1/cmscore.js",
        d = () => l(void 0, null, function*() {
            let {
                fsAttributes: e
            } = window;
            e.cms || (e.cms = {});
            let {
                cms: t
            } = e;
            if (t.coreImport) return t.coreImport;
            try {
                let r = import(j);
                return t.coreImport = r, r.then(s => {
                    s && (t.coreVersion || (t.coreVersion = s.version))
                }), r
            } catch (r) {
                u.alert(`${r}`, "error");
                return
            }
        });
    var v = "1.5.0";
    var p = "cmscombine",
        O = `fs-${p}`,
        _ = "list",
        F = "items-count",
        g = {
            element: {
                key: `${O}-element`,
                values: {
                    list: A(_),
                    itemsCount: A(F)
                }
            }
        },
        [$, h] = f(g);
    var M = e => {
        var r;
        let t = [];
        for (let s of e) {
            let i = s.getInstanceIndex(g.element.key),
                o = t[r = i || 0] || (t[r] = {
                    lists: [],
                    target: s,
                    instanceIndex: i
                });
            s !== o.target && o.lists.push(s)
        }
        return t = t.filter(s => s && s.lists.length), t
    };
    var E = (e, t) => l(void 0, null, function*() {
        let r = t.map(({
            element: s
        }) => s);
        yield e.addItems(r)
    });
    var S = () => l(void 0, null, function*() {
            var i, o;
            let e = yield d();
            if (!e) return [];
            let t = e.createCMSListInstances([$("element", "list", {
                    operator: "prefixed"
                })]),
                r = M(t),
                s = yield Promise.all(r.map(P));
            return (o = (i = window.fsAttributes[p]).resolve) == null || o.call(i, s), s
        }),
        P = s => l(void 0, [s], function*({
            lists: e,
            target: t,
            instanceIndex: r
        }) {
            if (!t.itemsCount) {
                let i = h("itemsCount", {
                    instanceIndex: r
                });
                i && t.addItemsCount(i)
            }
            for (let i of e) i.on("additems", o => l(void 0, null, function*() {
                return yield E(t, o)
            }));
            return yield Promise.all(e.map(a => l(void 0, [a], function*({
                wrapper: i,
                items: o
            }) {
                i.remove(), yield E(t, o)
            }))), t
        });
    I();
    d();
    var L, N;
    (L = window.fsAttributes)[N = p] || (L[N] = {});
    var {
        preventsLoad: K
    } = x(), k = window.fsAttributes[p];
    k.version = v;
    K ? k.init = S : (window.Webflow || (window.Webflow = []), window.Webflow.push(S));
})();