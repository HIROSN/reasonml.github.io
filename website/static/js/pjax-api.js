/*! pjax-api v3.16.11 https://github.com/falsandtru/pjax-api | (c) 2017, falsandtru | (Apache-2.0 AND MPL-2.0) License */
require = function e(t, n, r) {
    function o(u, c) {
        if (!n[u]) {
            if (!t[u]) {
                var a = "function" == typeof require && require;
                if (!c && a) return a(u, !0);
                if (i) return i(u, !0);
                var s = new Error("Cannot find module '" + u + "'");
                throw s.code = "MODULE_NOT_FOUND", s
            }
            var f = n[u] = {
                exports: {}
            };
            t[u][0].call(f.exports, function(e) {
                var n = t[u][1][e];
                return o(n || e)
            }, f, f.exports, e, t, n, r)
        }
        return n[u].exports
    }
    for (var i = "function" == typeof require && require, u = 0; u < r.length; u++) o(r[u]);
    return o
}({
    1: [
        function(e, t, n) {}, {}
    ],
    2: [
        function(e, t, n) {
            arguments[4][1][0].apply(n, arguments)
        }, {
            dup: 1
        }
    ],
    3: [
        function(e, t, n) {
            "use strict";

            function r(e) {
                return function(t) {
                    for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
                    if (void 0 === t || null === t) throw new TypeError("Spica: assign: Cannot walk on " + t + ".");
                    try {
                        for (var i = o(n), u = i.next(); !u.done; u = i.next()) {
                            var c = u.value;
                            if (void 0 !== c && null !== c) try {
                                for (var a = o(Object.keys(Object(c))), s = a.next(); !s.done; s = a.next()) {
                                    var f = s.value,
                                        l = Object.getOwnPropertyDescriptor(Object(c), f);
                                    void 0 !== l && l.enumerable && e(f, Object(t), Object(c))
                                }
                            } catch (e) {
                                h = {
                                    error: e
                                }
                            } finally {
                                try {
                                    s && !s.done && (v = a.
                                        return) && v.call(a)
                                } finally {
                                    if (h) throw h.error
                                }
                            }
                        }
                    } catch (e) {
                        p = {
                            error: e
                        }
                    } finally {
                        try {
                            u && !u.done && (d = i.
                                return) && d.call(i)
                        } finally {
                            if (p) throw p.error
                        }
                    }
                    return Object(t);
                    var p, d, h, v
                }
            }
            var o = this && this.__values || function(e) {
                    var t = "function" == typeof Symbol && e[Symbol.iterator],
                        n = 0;
                    return t ? t.call(e) : {
                        next: function() {
                            return e && n >= e.length && (e = void 0), {
                                value: e && e[n++],
                                done: !e
                            }
                        }
                    }
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("./type");
            n.assign = r(function(e, t, n) {
                return t[e] = n[e]
            }), n.clone = r(function(e, t, r) {
                switch (i.type(r[e])) {
                    case "Array":
                        return t[e] = n.clone([], r[e]);
                    case "Object":
                        return t[e] = n.clone({}, r[e]);
                    default:
                        return t[e] = r[e]
                }
            }), n.extend = r(function(e, t, r) {
                switch (i.type(r[e])) {
                    case "Array":
                        switch (i.type(t[e])) {
                            case "Array":
                                return t[e] = n.extend([], r[e]);
                            default:
                                return t[e] = r[e]
                        }
                    case "Object":
                        switch (i.type(t[e])) {
                            case "Object":
                                return t[e] = n.extend(t[e], r[e]);
                            default:
                                return t[e] = r[e]
                        }
                    default:
                        return t[e] = r[e]
                }
            })
        }, {
            "./type": 73
        }
    ],
    4: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                }, o = this && this.__spread || function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(r(arguments[t]));
                    return e
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("./exception"),
                u = e("./monad/maybe"),
                c = e("./monad/either"),
                a = function() {
                    return function(e) {
                        void 0 === e && (e = []);
                        var t = this;
                        this.done = !1, this.listeners = new Set, this.register = function(e) {
                            function n(t) {
                                try {
                                    e(t)
                                } catch (t) {
                                    i.causeAsyncException(t)
                                }
                            }
                            return t.canceled ? (n(t.reason), function() {}) : t.done ? function() {} : (t.listeners.add(n), function() {
                                return t.done ? void 0 : void t.listeners.delete(n)
                            })
                        }, this.cancel = function(e) {
                            t.done || (t.done = !0, t.canceled = !0, t.reason = e, Object.freeze(t.listeners), Object.freeze(t), t.listeners.forEach(function(t) {
                                return void t(e)
                            }))
                        }, this.close = function() {
                            t.done || (t.done = !0, Object.freeze(t.listeners), Object.freeze(t))
                        }, this.canceled = !1, this.promise = function(e) {
                            return t.canceled ? new Promise(function(e, n) {
                                return void n(t.reason)
                            }) : Promise.resolve(e)
                        }, this.maybe = function(e) {
                            return t.canceled ? u.Nothing : u.Just(e)
                        }, this.either = function(e) {
                            return t.canceled ? c.Left(t.reason) : c.Right(e)
                        }, o(e).forEach(function(e) {
                            return void e.register(t.cancel)
                        })
                    }
                }();
            n.Cancellation = a
        }, {
            "./exception": 10,
            "./monad/either": 16,
            "./monad/maybe": 20
        }
    ],
    5: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.compose = function(e) {
                for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                return t.reduce(function(e, t) {
                    return Object.getOwnPropertyNames(t.prototype).filter(function(t) {
                        return !(t in e.prototype)
                    }).forEach(function(n) {
                        return e.prototype[n] = t.prototype[n]
                    }), Object.getOwnPropertyNames(t).filter(function(t) {
                        return !(t in e)
                    }).forEach(function(n) {
                        return e[n] = t[n]
                    }), e
                }, e)
            }
        }, {}
    ],
    6: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.concat = function(e, t) {
                for (var n = 0, r = t.length, o = e.length; n < r; ++n) e[n + o] = t[n];
                return e
            }
        }, {}
    ],
    7: [
        function(e, t, n) {
            "use strict";

            function r(e, t, n) {
                return e.length <= t.length ? e.apply(n, t.slice(0, e.length)) : function() {
                    for (var o = [], i = 0; i < arguments.length; i++) o[i] = arguments[i];
                    return r(e, t.concat(o), n)
                }
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.curry = function(e, t) {
                return 0 === e.length ? function() {
                    return e.call(t)
                } : r(e, [], t)
            }
        }, {}
    ],
    8: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            }),
            function(e) {
                for (var t in e) n.hasOwnProperty(t) || (n[t] = e[t])
            }(e("./monad/either"))
        }, {
            "./monad/either": 16
        }
    ],
    9: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.findIndex = function(e, t) {
                for (var n = e !== e, r = 0; r < t.length; ++r) {
                    var o = t[r];
                    if (n ? o !== o : o === e) return r
                }
                return -1
            }
        }, {}
    ],
    10: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.causeAsyncException = function(e) {
                new Promise(function(t, n) {
                    return void n(e)
                })
            }
        }, {}
    ],
    11: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = e("./curry");
            n.flip = function(e) {
                return r.curry(function(t, n) {
                    return e.length > 1 ? e(n, t) : e(n)(t)
                })
            }
        }, {
            "./curry": 7
        }
    ],
    12: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = e("./concat"),
                o = function() {
                    function e() {
                        this.NIL
                    }
                    return e.prototype.push = function(e) {
                        return new i(e, this)
                    }, e.prototype.extend = function(e) {
                        return this.push(e())
                    }, e.prototype.array = function() {
                        return []
                    }, e
                }();
            n.HNil = o;
            var i = function() {
                function e(e, t) {
                    this.head = e, this.tail = t, this.CONS
                }
                return e.prototype.push = function(t) {
                    return new e(t, this)
                }, e.prototype.walk = function(e) {
                    return e(this.head), this.tail
                }, e.prototype.modify = function(e) {
                    return this.tail.push(e(this.head))
                }, e.prototype.extend = function(e) {
                    return this.push(e(this.head))
                }, e.prototype.compact = function(e) {
                    var t = this;
                    return this.tail.modify(function(n) {
                        return e(t.head, n)
                    })
                }, e.prototype.reverse = function() {
                    return this.array().reduce(function(e, t) {
                        return e.push(t)
                    }, new o)
                }, e.prototype.tuple = function() {
                    return this.array()
                }, e.prototype.array = function() {
                    return r.concat([this.head], this.tail.array())
                }, e
            }()
        }, {
            "./concat": 6
        }
    ],
    13: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            }),
            function(e) {
                for (var t in e) n.hasOwnProperty(t) || (n[t] = e[t])
            }(e("./monad/maybe"))
        }, {
            "./monad/maybe": 20
        }
    ],
    14: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("./functor"),
                i = e("../curry"),
                u = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t
                }(o.Functor);
            n.Applicative = u,
            function(e) {
                function t(e, n) {
                    return n ? e.bind(function(e) {
                        return n.fmap(function(t) {
                            return 0 === e.length ? e(t) : i.curry(e)(t)
                        })
                    }) : function(n) {
                        return t(e, n)
                    }
                }
                e.ap = t
            }(u = n.Applicative || (n.Applicative = {})), n.Applicative = u
        }, {
            "../curry": 7,
            "./functor": 17
        }
    ],
    15: [
        function(e, t, n) {
            "use strict";

            function r() {
                throw new Error("Spica: Either: Invalid thunk call.")
            }
            var o = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = function(e) {
                function t(t) {
                    var n = e.call(this, t) || this;
                    return n.EITHER, n
                }
                return o(t, e), t.prototype.fmap = function(e) {
                    return this.bind(function(t) {
                        return new c(e(t))
                    })
                }, t.prototype.ap = function(e) {
                    return t.ap(this, e)
                }, t.prototype.bind = function(e) {
                    var n = this;
                    return new t(function() {
                        var r = n.evaluate();
                        if (r instanceof u) return r;
                        if (r instanceof c) return e(r.extract());
                        if (r instanceof t) return r.bind(e);
                        throw new TypeError("Spica: Either: Invalid monad value.\n\t" + r)
                    })
                }, t.prototype.extract = function(e, t) {
                    return t ? this.fmap(t).extract(e) : this.evaluate().extract(e)
                }, t
            }(e("./monad").Monad);
            n.Either = i,
            function(e) {
                function t(e) {
                    return new c(e)
                }
                e.pure = t, e.Return = t
            }(i = n.Either || (n.Either = {})), n.Either = i;
            var u = function(e) {
                function t(t) {
                    var n = e.call(this, r) || this;
                    return n.a = t, n.LEFT, n
                }
                return o(t, e), t.prototype.bind = function(e) {
                    return this
                }, t.prototype.extract = function(e) {
                    if (!e) throw this.a;
                    return e(this.a)
                }, t
            }(i);
            n.Left = u;
            var c = function(e) {
                function t(t) {
                    var n = e.call(this, r) || this;
                    return n.b = t, n.RIGHT, n
                }
                return o(t, e), t.prototype.bind = function(e) {
                    var t = this;
                    return new i(function() {
                        return e(t.extract())
                    })
                }, t.prototype.extract = function(e, t) {
                    return t ? t(this.b) : this.b
                }, t
            }(i);
            n.Right = c
        }, {
            "./monad": 21
        }
    ],
    16: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = e("./either.impl");
            ! function(e) {
                e.fmap = r.Either.fmap, e.pure = r.Either.pure, e.ap = r.Either.ap, e.Return = r.Either.Return, e.bind = r.Either.bind
            }(n.Either || (n.Either = {})), n.Left = function(e) {
                return new r.Left(e)
            }, n.Right = function(e) {
                return new r.Right(e)
            }
        }, {
            "./either.impl": 15
        }
    ],
    17: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return r(t, e), t
            }(e("./lazy").Lazy);
            n.Functor = o,
            function(e) {
                e.fmap = function(e, t) {
                    return t ? e.fmap(t) : function(t) {
                        return e.fmap(t)
                    }
                }
            }(o = n.Functor || (n.Functor = {})), n.Functor = o
        }, {
            "./lazy": 18
        }
    ],
    18: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = function() {
                function e(e) {
                    this.thunk = e
                }
                return e.prototype.evaluate = function() {
                    return this.memory_ = this.memory_ || this.thunk()
                }, e
            }();
            n.Lazy = r
        }, {}
    ],
    19: [
        function(e, t, n) {
            "use strict";

            function r() {
                throw new Error("Spica: Maybe: Invalid thunk call.")
            }
            var o = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = function(e) {
                function t(t) {
                    var n = e.call(this, t) || this;
                    return n.MAYBE, n
                }
                return o(t, e), t.prototype.fmap = function(e) {
                    return this.bind(function(t) {
                        return new u(e(t))
                    })
                }, t.prototype.ap = function(e) {
                    return t.ap(this, e)
                }, t.prototype.bind = function(e) {
                    var n = this;
                    return new t(function() {
                        var r = n.evaluate();
                        if (r instanceof u) return e(r.extract());
                        if (r instanceof c) return r;
                        if (r instanceof t) return r.bind(e);
                        throw new TypeError("Spica: Maybe: Invalid monad value.\n\t" + r)
                    })
                }, t.prototype.extract = function(e, t) {
                    return t ? this.fmap(t).extract(e) : this.evaluate().extract(e)
                }, t
            }(e("./monadplus").MonadPlus);
            n.Maybe = i,
            function(e) {
                function t(e) {
                    return new u(e)
                }
                e.pure = t, e.Return = t
            }(i = n.Maybe || (n.Maybe = {})), n.Maybe = i;
            var u = function(e) {
                function t(t) {
                    var n = e.call(this, r) || this;
                    return n.a = t, n.JUST, n
                }
                return o(t, e), t.prototype.bind = function(e) {
                    var t = this;
                    return new i(function() {
                        return e(t.extract())
                    })
                }, t.prototype.extract = function(e, t) {
                    return t ? t(this.a) : this.a
                }, t
            }(i);
            n.Just = u;
            var c = function(e) {
                function t() {
                    var t = e.call(this, r) || this;
                    return t.NOTHING, t
                }
                return o(t, e), t.prototype.bind = function(e) {
                    return this
                }, t.prototype.extract = function(e) {
                    if (!e) throw void 0;
                    return e()
                }, t
            }(i);
            n.Nothing = c,
            function(e) {
                e.mzero = new c, e.mplus = function(t, n) {
                    return new e(function() {
                        return t.fmap(function() {
                            return t
                        }).extract(function() {
                            return n
                        })
                    })
                }
            }(i = n.Maybe || (n.Maybe = {})), n.Maybe = i
        }, {
            "./monadplus": 22
        }
    ],
    20: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = e("./maybe.impl");
            ! function(e) {
                e.fmap = r.Maybe.fmap, e.pure = r.Maybe.pure, e.ap = r.Maybe.ap, e.Return = r.Maybe.Return, e.bind = r.Maybe.bind, e.mzero = r.Maybe.mzero, e.mplus = r.Maybe.mplus
            }(n.Maybe || (n.Maybe = {})), n.Just = function(e) {
                return new r.Just(e)
            }, n.Nothing = r.Maybe.mzero
        }, {
            "./maybe.impl": 19
        }
    ],
    21: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return r(t, e), t
            }(e("./applicative").Applicative);
            n.Monad = o,
            function(e) {
                function t(e, n) {
                    return n ? e.bind(n) : function(n) {
                        return t(e, n)
                    }
                }
                e.bind = t
            }(o = n.Monad || (n.Monad = {})), n.Monad = o
        }, {
            "./applicative": 14
        }
    ],
    22: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return r(t, e), t
            }(e("./monad").Monad);
            n.MonadPlus = o, o = n.MonadPlus || (n.MonadPlus = {}), n.MonadPlus = o
        }, {
            "./monad": 21
        }
    ],
    23: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = e("./sequence/core");
            n.Sequence = r.Sequence;
            var o = e("./sequence/member/static/resume"),
                i = e("./sequence/member/static/from"),
                u = e("./sequence/member/static/cycle"),
                c = e("./sequence/member/static/random"),
                a = e("./sequence/member/static/concat"),
                s = e("./sequence/member/static/zip"),
                f = e("./sequence/member/static/difference"),
                l = e("./sequence/member/static/union"),
                p = e("./sequence/member/static/intersect"),
                d = e("./sequence/member/static/pure"),
                h = e("./sequence/member/static/return"),
                v = e("./sequence/member/static/mempty"),
                y = e("./sequence/member/static/mconcat"),
                m = e("./sequence/member/static/mappend"),
                _ = e("./sequence/member/static/mzero"),
                b = e("./sequence/member/static/mplus"),
                w = e("./sequence/member/instance/extract"),
                S = e("./sequence/member/instance/iterate"),
                O = e("./sequence/member/instance/memoize"),
                q = e("./sequence/member/instance/reduce"),
                g = e("./sequence/member/instance/take"),
                j = e("./sequence/member/instance/drop"),
                P = e("./sequence/member/instance/takeWhile"),
                x = e("./sequence/member/instance/dropWhile"),
                E = e("./sequence/member/instance/takeUntil"),
                k = e("./sequence/member/instance/dropUntil"),
                T = e("./sequence/member/instance/sort"),
                M = e("./sequence/member/instance/fmap"),
                A = e("./sequence/member/instance/ap"),
                R = e("./sequence/member/instance/bind"),
                L = e("./sequence/member/instance/mapM"),
                I = e("./sequence/member/instance/filterM"),
                U = e("./sequence/member/instance/map"),
                z = e("./sequence/member/instance/filter"),
                C = e("./sequence/member/instance/scan"),
                D = e("./sequence/member/instance/foldr"),
                N = e("./sequence/member/instance/group"),
                F = e("./sequence/member/instance/inits"),
                H = e("./sequence/member/instance/tails"),
                W = e("./sequence/member/instance/segs"),
                G = e("./sequence/member/instance/subsequences"),
                J = e("./sequence/member/instance/permutations");
            e("../compose").compose(r.Sequence, o.
                default, i.
                default, u.
                default, c.
                default, a.
                default, s.
                default, f.
                default, l.
                default, p.
                default, d.
                default, h.
                default, v.
                default, y.
                default, m.
                default, _.
                default, b.
                default, w.
                default, S.
                default, O.
                default, q.
                default, g.
                default, j.
                default, P.
                default, x.
                default, E.
                default, k.
                default, T.
                default, M.
                default, A.
                default, R.
                default, L.
                default, I.
                default, U.
                default, z.
                default, C.
                default, D.
                default, N.
                default, F.
                default, H.
                default, W.
                default, G.
                default, J.
                default)
        }, {
            "../compose": 5,
            "./sequence/core": 24,
            "./sequence/member/instance/ap": 25,
            "./sequence/member/instance/bind": 26,
            "./sequence/member/instance/drop": 27,
            "./sequence/member/instance/dropUntil": 28,
            "./sequence/member/instance/dropWhile": 29,
            "./sequence/member/instance/extract": 30,
            "./sequence/member/instance/filter": 31,
            "./sequence/member/instance/filterM": 32,
            "./sequence/member/instance/fmap": 33,
            "./sequence/member/instance/foldr": 34,
            "./sequence/member/instance/group": 35,
            "./sequence/member/instance/inits": 36,
            "./sequence/member/instance/iterate": 37,
            "./sequence/member/instance/map": 38,
            "./sequence/member/instance/mapM": 39,
            "./sequence/member/instance/memoize": 40,
            "./sequence/member/instance/permutations": 41,
            "./sequence/member/instance/reduce": 42,
            "./sequence/member/instance/scan": 43,
            "./sequence/member/instance/segs": 44,
            "./sequence/member/instance/sort": 45,
            "./sequence/member/instance/subsequences": 46,
            "./sequence/member/instance/tails": 47,
            "./sequence/member/instance/take": 48,
            "./sequence/member/instance/takeUntil": 49,
            "./sequence/member/instance/takeWhile": 50,
            "./sequence/member/static/concat": 51,
            "./sequence/member/static/cycle": 52,
            "./sequence/member/static/difference": 53,
            "./sequence/member/static/from": 54,
            "./sequence/member/static/intersect": 55,
            "./sequence/member/static/mappend": 56,
            "./sequence/member/static/mconcat": 57,
            "./sequence/member/static/mempty": 58,
            "./sequence/member/static/mplus": 59,
            "./sequence/member/static/mzero": 60,
            "./sequence/member/static/pure": 61,
            "./sequence/member/static/random": 62,
            "./sequence/member/static/resume": 63,
            "./sequence/member/static/return": 64,
            "./sequence/member/static/union": 65,
            "./sequence/member/static/zip": 66
        }
    ],
    24: [
        function(e, t, n) {
            "use strict";

            function r() {
                throw new Error("Spica: Sequence: Invalid thunk call.")
            }
            var o = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = function(e) {
                function t(t) {
                    var n = e.call(this, r) || this;
                    return n.cons = t, n
                }
                return o(t, e), t.prototype[Symbol.iterator] = function() {
                    var e = this,
                        n = function() {
                            return e.iterate()
                        };
                    return {
                        next: function() {
                            var e = n();
                            return n = t.Thunk.iterator(e), {
                                done: !t.isIterable(e),
                                value: t.Thunk.value(e)
                            }
                        }
                    }
                }, t
            }(e("../monadplus").MonadPlus);
            n.Sequence = i, i = n.Sequence || (n.Sequence = {}), n.Sequence = i,
            function(e) {
                ! function(t) {
                    t.cons = function(t, n) {
                        switch (arguments.length) {
                            case 0:
                                return [];
                            case 1:
                                return [t];
                            case 2:
                                return [t, n];
                            default:
                                throw e.Exception.invalidConsError(arguments)
                        }
                    }
                }(e.Data || (e.Data = {}));
                var t;
                ! function(e) {
                    e.value = function(e) {
                        return e[0]
                    }, e.iterator = function(e) {
                        return e[1]
                    }, e.index = function(e) {
                        return e[2]
                    }
                }(t = e.Thunk || (e.Thunk = {}));
                var n;
                ! function(n) {
                    function r(n, o, i) {
                        return e.isIterable(n) ? i(n, function() {
                            return r(t.iterator(n)(), o, i)
                        }) : o(n)
                    }
                    n.done = function() {
                        return [void 0, n.done, -1]
                    }, n.when = r
                }(n = e.Iterator || (e.Iterator = {})), e.isIterable = function(e) {
                    return t.iterator(e) !== n.done
                };
                ! function(e) {
                    e.invalidConsError = function(e) {
                        return console.error(e, e.length, e[0], e[1]), new TypeError("Spica: Sequence: Invalid parameters of cons.")
                    }, e.invalidDataError = function(e) {
                        return console.error(e), new TypeError("Spica: Sequence: Invalid data.")
                    }, e.invalidThunkError = function(e) {
                        return console.error(e), new TypeError("Spica: Sequence: Invalid thunk.")
                    }
                }(e.Exception || (e.Exception = {}))
            }(i = n.Sequence || (n.Sequence = {})), n.Sequence = i
        }, {
            "../monadplus": 22
        }
    ],
    25: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.ap = function(e) {
                        return o.Sequence.ap(this, e)
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    26: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.bind = function(e) {
                        return o.Sequence.concat(this.fmap(e))
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    27: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.drop = function(e) {
                        var t = this;
                        return new o.Sequence(function(n, r) {
                            return void 0 === n && (n = function() {
                                return t.iterate()
                            }), o.Sequence.Iterator.when(n(), function() {
                                return r()
                            }, function(t, n) {
                                return o.Sequence.Thunk.index(t) < e ? n() : r(o.Sequence.Thunk.value(t), o.Sequence.Thunk.iterator(t))
                            })
                        })
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    28: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.dropUntil = function(e) {
                        var t = this;
                        return new o.Sequence(function(n, r) {
                            return void 0 === n && (n = function() {
                                return t.iterate()
                            }), o.Sequence.Iterator.when(n(), function() {
                                return r()
                            }, function(t, n) {
                                return e(o.Sequence.Thunk.value(t)) ? n() : r(o.Sequence.Thunk.value(t), o.Sequence.Thunk.iterator(t))
                            })
                        })
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    29: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.dropWhile = function(e) {
                        var t = this;
                        return new o.Sequence(function(n, r) {
                            return void 0 === n && (n = function() {
                                return t.iterate()
                            }), o.Sequence.Iterator.when(n(), function() {
                                return r()
                            }, function(t, n) {
                                return e(o.Sequence.Thunk.value(t)) ? n() : r(o.Sequence.Thunk.value(t), o.Sequence.Thunk.iterator(t))
                            })
                        })
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    30: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = e("../../../../concat"),
                u = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.extract = function() {
                        for (var e = this, t = [], n = function() {
                                return e.iterate()
                            };;) {
                            var r = n();
                            if (!o.Sequence.isIterable(r)) return t;
                            i.concat(t, [o.Sequence.Thunk.value(r)]), n = o.Sequence.Thunk.iterator(r)
                        }
                    }, t
                }(o.Sequence);
            n.
            default = u
        }, {
            "../../../../concat": 6,
            "../../core": 24
        }
    ],
    31: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.filter = function(e) {
                        var t = this;
                        return new o.Sequence(function(n, r) {
                            return void 0 === n && (n = function() {
                                return t.iterate()
                            }), o.Sequence.Iterator.when(n(), function() {
                                return r()
                            }, function(t, n) {
                                return e(o.Sequence.Thunk.value(t), o.Sequence.Thunk.index(t)) ? r(o.Sequence.Thunk.value(t), o.Sequence.Thunk.iterator(t)) : n()
                            })
                        })
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    32: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = e("../../../../concat"),
                u = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.filterM = function(e) {
                        var t = this;
                        return o.Sequence.from([0]).bind(function() {
                            var n = t.extract();
                            switch (n.length) {
                                case 0:
                                    return o.Sequence.from([
                                        []
                                    ]);
                                default:
                                    var r = n.shift();
                                    return e(r).bind(function(t) {
                                        return t ? 0 === n.length ? o.Sequence.from([
                                            [r]
                                        ]) : o.Sequence.from(n).filterM(e).fmap(function(e) {
                                            return i.concat([r], e)
                                        }) : 0 === n.length ? o.Sequence.from([
                                            []
                                        ]) : o.Sequence.from(n).filterM(e)
                                    })
                            }
                        })
                    }, t
                }(o.Sequence);
            n.
            default = u
        }, {
            "../../../../concat": 6,
            "../../core": 24
        }
    ],
    33: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.fmap = function(e) {
                        var t = this;
                        return new o.Sequence(function(n) {
                            return void 0 === n && (n = function() {
                                return t.iterate()
                            }), o.Sequence.Iterator.when(n(), function() {
                                return o.Sequence.Data.cons()
                            }, function(t) {
                                return o.Sequence.Data.cons(e(o.Sequence.Thunk.value(t)), o.Sequence.Thunk.iterator(t))
                            })
                        })
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    34: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.foldr = function(e, t) {
                        var n = this;
                        return new o.Sequence(function(r) {
                            return void 0 === r && (r = function() {
                                return n.reduce().iterate()
                            }), o.Sequence.Iterator.when(r(), function() {
                                return o.Sequence.Data.cons(t)
                            }, function(n) {
                                return o.Sequence.Data.cons(e(o.Sequence.Thunk.value(n), o.Sequence.resume(o.Sequence.Thunk.iterator(n)).foldr(e, t)))
                            })
                        }).bind(function(e) {
                            return e
                        })
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    35: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }(),
                o = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("../../core"),
                u = e("../../../../concat"),
                c = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.group = function(e) {
                        var t = this;
                        return new i.Sequence(function(n, r) {
                            var c = o(void 0 === n ? [
                                function() {
                                    return t.iterate()
                                },
                                []
                            ] : n, 2),
                                a = c[0],
                                s = c[1];
                            return i.Sequence.Iterator.when(a(), function() {
                                return 0 === s.length ? r() : r(s)
                            }, function(t, n) {
                                return 0 === s.length || e(s[0], i.Sequence.Thunk.value(t)) ? (u.concat(s, [i.Sequence.Thunk.value(t)]), n()) : r(s, [i.Sequence.Thunk.iterator(t), u.concat([], [i.Sequence.Thunk.value(t)])])
                            })
                        })
                    }, t
                }(i.Sequence);
            n.
            default = c
        }, {
            "../../../../concat": 6,
            "../../core": 24
        }
    ],
    36: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.inits = function() {
                        return o.Sequence.mappend(o.Sequence.from([
                            []
                        ]), this.scan(function(e, t) {
                            return e.concat([t])
                        }, []).dropWhile(function(e) {
                            return 0 === e.length
                        }))
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    37: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.iterate = function() {
                        return this.iterate_()
                    }, t.prototype.iterate_ = function(e, t) {
                        var n = this;
                        void 0 === t && (t = 0);
                        var r = this.cons(e, o.Sequence.Data.cons);
                        switch (r.length) {
                            case 0:
                                return [void 0, o.Sequence.Iterator.done, -1];
                            case 1:
                                return [r[0], function() {
                                    return o.Sequence.Iterator.done()
                                }, t];
                            case 2:
                                return [r[0], function() {
                                    return n.iterate_(r[1], t + 1)
                                }, t];
                            default:
                                throw o.Sequence.Exception.invalidDataError(r)
                        }
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    38: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.map = function(e) {
                        var t = this;
                        return new o.Sequence(function(n) {
                            return void 0 === n && (n = function() {
                                return t.iterate()
                            }), o.Sequence.Iterator.when(n(), function() {
                                return o.Sequence.Data.cons()
                            }, function(t) {
                                return o.Sequence.Data.cons(e(o.Sequence.Thunk.value(t), o.Sequence.Thunk.index(t)), o.Sequence.Thunk.iterator(t))
                            })
                        })
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    39: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = e("../../../../concat"),
                u = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.mapM = function(e) {
                        var t = this;
                        return o.Sequence.from([0]).bind(function() {
                            var n = t.extract();
                            switch (n.length) {
                                case 0:
                                    return o.Sequence.mempty;
                                default:
                                    var r = n.shift();
                                    return e(r).bind(function(t) {
                                        return 0 === n.length ? o.Sequence.from([
                                            [t]
                                        ]) : o.Sequence.from(n).mapM(e).fmap(function(e) {
                                            return i.concat([t], e)
                                        })
                                    })
                            }
                        })
                    }, t
                }(o.Sequence);
            n.
            default = u
        }, {
            "../../../../concat": 6,
            "../../core": 24
        }
    ],
    40: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }(),
                o = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("../../core"),
                u = new WeakMap,
                c = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.memoize = function() {
                        var e = this;
                        return new i.Sequence(function(t, n) {
                            var r = o(void 0 === t ? [0, u.get(e) || u.set(e, new Map).get(e)] : t, 2),
                                c = r[0],
                                a = r[1];
                            return i.Sequence.Iterator.when(a.get(c) || a.set(c, c > 0 && a.has(c - 1) ? i.Sequence.Thunk.iterator(a.get(c - 1))() : e.iterate()).get(c), function() {
                                return n()
                            }, function(e) {
                                return n(i.Sequence.Thunk.value(e), [c + 1, a])
                            })
                        })
                    }, t
                }(i.Sequence);
            n.
            default = c
        }, {
            "../../core": 24
        }
    ],
    41: [
        function(e, t, n) {
            "use strict";

            function r(e, t) {
                return u.Sequence.Iterator.when(e.iterate(), function() {
                    return u.Sequence.mempty
                }, function(e) {
                    return new u.Sequence(function(n, o) {
                        return u.Sequence.Iterator.when(e, function() {
                            return o()
                        }, function(e) {
                            function n(e, t) {
                                return c(function(e) {
                                    return e
                                }, e, t)[1]
                            }

                            function c(e, t, n) {
                                return u.Sequence.Iterator.when(t.iterate(), function() {
                                    return [s, n]
                                }, function(t) {
                                    var r = u.Sequence.Thunk.value(t),
                                        o = i(c(function(t) {
                                            return e(u.Sequence.mappend(u.Sequence.from([r]), t))
                                        }, u.Sequence.resume(u.Sequence.Thunk.iterator(t)), n), 2),
                                        s = o[0],
                                        f = o[1];
                                    return [u.Sequence.mappend(u.Sequence.from([r]), s), u.Sequence.mappend(u.Sequence.from([e(u.Sequence.mappend(u.Sequence.from([a]), u.Sequence.mappend(u.Sequence.from([r]), s))).extract()]), f)]
                                })
                            }
                            var a = u.Sequence.Thunk.value(e),
                                s = u.Sequence.resume(u.Sequence.Thunk.iterator(e)).memoize();
                            return o(t.permutations().foldr(function(e, t) {
                                return n(u.Sequence.from(e), t)
                            }, r(s, u.Sequence.mappend(u.Sequence.from([a]), t))))
                        })
                    }).bind(function(e) {
                        return e
                    })
                })
            }
            var o = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }(),
                i = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var u = e("../../core"),
                c = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return o(t, e), t.prototype.permutations = function() {
                        var e = this;
                        return u.Sequence.from([0]).bind(function() {
                            var t = e.extract();
                            return 0 === t.length ? u.Sequence.mempty : u.Sequence.from([t])
                        }).bind(function(e) {
                            return u.Sequence.mappend(u.Sequence.from([e]), r(u.Sequence.from(e), u.Sequence.mempty))
                        })
                    }, t
                }(u.Sequence);
            n.
            default = c
        }, {
            "../../core": 24
        }
    ],
    42: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }(),
                o = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("../../core"),
                u = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.reduce = function() {
                        var e = this;
                        return new i.Sequence(function(t, n) {
                            var r = o(void 0 === t ? [0, new Map] : t, 2),
                                u = r[0],
                                c = r[1];
                            return i.Sequence.Iterator.when(c.get(u) || c.set(u, u > 0 && c.has(u - 1) ? i.Sequence.Thunk.iterator(c.get(u - 1))() : e.iterate()).get(u), function() {
                                return n()
                            }, function(e) {
                                return n(i.Sequence.Thunk.value(e), [u + 1, c])
                            })
                        })
                    }, t
                }(i.Sequence);
            n.
            default = u
        }, {
            "../../core": 24
        }
    ],
    43: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }(),
                o = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("../../core"),
                u = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.scan = function(e, t) {
                        var n = this;
                        return new i.Sequence(function(r) {
                            var u = o(void 0 === r ? [t,
                                function() {
                                    return n.iterate()
                                },
                                0
                            ] : r, 3),
                                c = u[0],
                                a = u[1],
                                s = u[2];
                            return i.Sequence.Iterator.when(a(), function() {
                                return 0 === s ? i.Sequence.Data.cons(t) : i.Sequence.Data.cons()
                            }, function(t) {
                                return i.Sequence.Data.cons(c = e(c, i.Sequence.Thunk.value(t)), [c, i.Sequence.Thunk.iterator(t), i.Sequence.Thunk.index(t) + 1])
                            })
                        })
                    }, t
                }(i.Sequence);
            n.
            default = u
        }, {
            "../../core": 24
        }
    ],
    44: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = e("../../../../concat"),
                u = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.segs = function() {
                        return o.Sequence.mappend(this.foldr(function(e, t) {
                            return t.take(1).bind(function(n) {
                                return o.Sequence.mappend(o.Sequence.from([o.Sequence.mappend(o.Sequence.from([
                                    [e]
                                ]), o.Sequence.from(n).map(function(t) {
                                    return i.concat([e], t)
                                }))]), t)
                            })
                        }, o.Sequence.from([o.Sequence.from([])])).bind(function(e) {
                            return e
                        }), o.Sequence.from([
                            []
                        ]))
                    }, t
                }(o.Sequence);
            n.
            default = u
        }, {
            "../../../../concat": 6,
            "../../core": 24
        }
    ],
    45: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.sort = function(e) {
                        return o.Sequence.from(this.extract().sort(e))
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    46: [
        function(e, t, n) {
            "use strict";

            function r(e) {
                return i.Sequence.Iterator.when(e.iterate(), function() {
                    return i.Sequence.mempty
                }, function(e) {
                    return i.Sequence.mappend(i.Sequence.from([
                        [i.Sequence.Thunk.value(e)]
                    ]), new i.Sequence(function(t, n) {
                        return i.Sequence.Iterator.when(e, function() {
                            return n()
                        }, function(e) {
                            return n(r(i.Sequence.resume(i.Sequence.Thunk.iterator(e))).foldr(function(t, n) {
                                return i.Sequence.mappend(i.Sequence.mappend(i.Sequence.from([t]), i.Sequence.from([u.concat([i.Sequence.Thunk.value(e)], t)])), n)
                            }, i.Sequence.mempty))
                        })
                    }).bind(function(e) {
                        return e
                    }))
                })
            }
            var o = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("../../core"),
                u = e("../../../../concat"),
                c = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return o(t, e), t.prototype.subsequences = function() {
                        var e = this;
                        return i.Sequence.mappend(i.Sequence.from([
                            []
                        ]), i.Sequence.from([0]).bind(function() {
                            return r(e)
                        }))
                    }, t
                }(i.Sequence);
            n.
            default = c
        }, {
            "../../../../concat": 6,
            "../../core": 24
        }
    ],
    47: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.tails = function() {
                        return o.Sequence.mappend(o.Sequence.from(this.extract().map(function(e, t, n) {
                            return n.slice(t)
                        })), o.Sequence.from([
                            []
                        ]))
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    48: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.take = function(e) {
                        var t = this;
                        return new o.Sequence(function(n, r) {
                            return void 0 === n && (n = function() {
                                return t.iterate()
                            }), o.Sequence.Iterator.when(e > 0 ? n() : o.Sequence.Iterator.done(), function() {
                                return r()
                            }, function(t) {
                                return o.Sequence.Thunk.index(t) + 1 < e ? r(o.Sequence.Thunk.value(t), o.Sequence.Thunk.iterator(t)) : r(o.Sequence.Thunk.value(t))
                            })
                        })
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    49: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.takeUntil = function(e) {
                        var t = this;
                        return new o.Sequence(function(n, r) {
                            return void 0 === n && (n = function() {
                                return t.iterate()
                            }), o.Sequence.Iterator.when(n(), function() {
                                return r()
                            }, function(t) {
                                return e(o.Sequence.Thunk.value(t)) ? r(o.Sequence.Thunk.value(t)) : r(o.Sequence.Thunk.value(t), o.Sequence.Thunk.iterator(t))
                            })
                        })
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    50: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.prototype.takeWhile = function(e) {
                        var t = this;
                        return new o.Sequence(function(n, r) {
                            return void 0 === n && (n = function() {
                                return t.iterate()
                            }), o.Sequence.Iterator.when(n(), function() {
                                return r()
                            }, function(t) {
                                return e(o.Sequence.Thunk.value(t)) ? r(o.Sequence.Thunk.value(t), o.Sequence.Thunk.iterator(t)) : r()
                            })
                        })
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    51: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }(),
                o = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("../../core"),
                u = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.concat = function(e) {
                        return new i.Sequence(function(t, n) {
                            var r = o(void 0 === t ? [
                                function() {
                                    return e.iterate()
                                },
                                i.Sequence.Iterator.done
                            ] : t, 2),
                                u = r[0],
                                c = r[1];
                            return i.Sequence.Iterator.when(u(), function() {
                                return n()
                            }, function(e, t) {
                                return c = c === i.Sequence.Iterator.done ? function() {
                                    return i.Sequence.Thunk.value(e).iterate()
                                } : c, i.Sequence.Iterator.when(c(), function() {
                                    return c = i.Sequence.Iterator.done, t()
                                }, function(t) {
                                    return n(i.Sequence.Thunk.value(t), [
                                        function() {
                                            return e
                                        },
                                        i.Sequence.Thunk.iterator(t)
                                    ])
                                })
                            })
                        })
                    }, t
                }(i.Sequence);
            n.
            default = u
        }, {
            "../../core": 24
        }
    ],
    52: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }(),
                o = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("../../core"),
                u = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.cycle = function(e) {
                        return new i.Sequence(function t(n, r) {
                            var i = o(void 0 === n ? [e[Symbol.iterator](), 0] : n, 2),
                                u = i[0],
                                c = i[1],
                                a = u.next();
                            return a.done ? t([e[Symbol.iterator](), c + 1], r) : r(a.value, [u, c + 1])
                        }).reduce()
                    }, t
                }(i.Sequence);
            n.
            default = u
        }, {
            "../../core": 24
        }
    ],
    53: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }(),
                o = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("../../core"),
                u = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.difference = function(e, t, n) {
                        return new i.Sequence(function(r, u) {
                            var c = o(void 0 === r ? [
                                function() {
                                    return e.iterate()
                                },
                                function() {
                                    return t.iterate()
                                }
                            ] : r, 2),
                                a = c[0],
                                s = c[1];
                            return i.Sequence.Iterator.when(a(), function() {
                                return i.Sequence.Iterator.when(s(), function() {
                                    return u()
                                }, function(e) {
                                    return u(i.Sequence.Thunk.value(e), [i.Sequence.Iterator.done, i.Sequence.Thunk.iterator(e)])
                                })
                            }, function(e, t) {
                                return i.Sequence.Iterator.when(s(), function() {
                                    return u(i.Sequence.Thunk.value(e), [i.Sequence.Thunk.iterator(e), i.Sequence.Iterator.done])
                                }, function(r) {
                                    var o = n(i.Sequence.Thunk.value(e), i.Sequence.Thunk.value(r));
                                    return o < 0 ? u(i.Sequence.Thunk.value(e), [i.Sequence.Thunk.iterator(e),
                                        function() {
                                            return r
                                        }
                                    ]) : o > 0 ? u(i.Sequence.Thunk.value(r), [
                                        function() {
                                            return e
                                        },
                                        i.Sequence.Thunk.iterator(r)
                                    ]) : (s = function() {
                                        return i.Sequence.Thunk.iterator(r)()
                                    }, t())
                                })
                            })
                        })
                    }, t
                }(i.Sequence);
            n.
            default = u
        }, {
            "../../core": 24
        }
    ],
    54: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }(),
                o = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("../../core"),
                u = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.from = function(e) {
                        return new i.Sequence(function(t, n) {
                            var r = o(void 0 === t ? [e[Symbol.iterator](), 0] : t, 2),
                                i = r[0],
                                u = r[1],
                                c = i.next();
                            return c.done ? n() : n(c.value, [i, u + 1])
                        }).reduce()
                    }, t
                }(i.Sequence);
            n.
            default = u
        }, {
            "../../core": 24
        }
    ],
    55: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }(),
                o = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("../../core"),
                u = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.intersect = function(e, t, n) {
                        return new i.Sequence(function(r, u) {
                            var c = o(void 0 === r ? [
                                function() {
                                    return e.iterate()
                                },
                                function() {
                                    return t.iterate()
                                }
                            ] : r, 2),
                                a = c[0],
                                s = c[1];
                            return i.Sequence.Iterator.when(a(), function() {
                                return u()
                            }, function(e, t) {
                                return i.Sequence.Iterator.when(s(), function() {
                                    return u()
                                }, function(r, o) {
                                    var c = n(i.Sequence.Thunk.value(e), i.Sequence.Thunk.value(r));
                                    return c < 0 ? (s = function() {
                                        return r
                                    }, t()) : c > 0 ? o() : u(i.Sequence.Thunk.value(e), [i.Sequence.Thunk.iterator(e), i.Sequence.Thunk.iterator(r)])
                                })
                            })
                        })
                    }, t
                }(i.Sequence);
            n.
            default = u
        }, {
            "../../core": 24
        }
    ],
    56: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.mappend = function(e, t) {
                        return o.Sequence.mconcat([e, t])
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    57: [
        function(e, t, n) {
            "use strict";

            function r(e, t) {
                return new c.Sequence(function(n, r) {
                    var o = i(void 0 === n ? [
                        function() {
                            return e.iterate()
                        },
                        function() {
                            return t.iterate()
                        }
                    ] : n, 2),
                        u = o[0],
                        a = o[1];
                    return c.Sequence.Iterator.when(u(), function() {
                        return c.Sequence.Iterator.when(a(), function() {
                            return r()
                        }, function(e) {
                            return r(c.Sequence.Thunk.value(e), [c.Sequence.Iterator.done, c.Sequence.Thunk.iterator(e)])
                        })
                    }, function(e) {
                        return r(c.Sequence.Thunk.value(e), [c.Sequence.Thunk.iterator(e), a])
                    })
                })
            }
            var o = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }(),
                i = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                }, u = this && this.__spread || function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(i(arguments[t]));
                    return e
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var c = e("../../core"),
                a = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return o(t, e), t.mconcat = function(e) {
                        return u(e).reduce(function(e, t) {
                            return r(e, t)
                        }, c.Sequence.mempty)
                    }, t
                }(c.Sequence);
            n.
            default = a
        }, {
            "../../core": 24
        }
    ],
    58: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.mempty = new o.Sequence(function(e, t) {
                        return t()
                    }), t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    59: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.mplus = o.Sequence.mappend, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    60: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.mzero = o.Sequence.mempty, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    61: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.pure = function(e) {
                        return new o.Sequence(function(t, n) {
                            return n(e)
                        })
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    62: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.random = function(e) {
                        return void 0 === e && (e = function() {
                            return Math.random()
                        }), "function" == typeof e ? o.Sequence.from(new o.Sequence(function(t, n) {
                            return n(e(), t)
                        })) : this.random().map(function(t) {
                            return e[t * e.length | 0]
                        })
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    63: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.resume = function(e) {
                        return new o.Sequence(function(t, n) {
                            return void 0 === t && (t = e), o.Sequence.Iterator.when(t(), function() {
                                return n()
                            }, function(e) {
                                return n(o.Sequence.Thunk.value(e), o.Sequence.Thunk.iterator(e))
                            })
                        })
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    64: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../core"),
                i = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.Return = function(e) {
                        return new o.Sequence(function(t, n) {
                            return n(e)
                        })
                    }, t
                }(o.Sequence);
            n.
            default = i
        }, {
            "../../core": 24
        }
    ],
    65: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }(),
                o = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("../../core"),
                u = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.union = function(e, t, n) {
                        return new i.Sequence(function(r, u) {
                            var c = o(void 0 === r ? [
                                function() {
                                    return e.iterate()
                                },
                                function() {
                                    return t.iterate()
                                }
                            ] : r, 2),
                                a = c[0],
                                s = c[1];
                            return i.Sequence.Iterator.when(a(), function() {
                                return i.Sequence.Iterator.when(s(), function() {
                                    return u()
                                }, function(e) {
                                    return u(i.Sequence.Thunk.value(e), [i.Sequence.Iterator.done, i.Sequence.Thunk.iterator(e)])
                                })
                            }, function(e) {
                                return i.Sequence.Iterator.when(s(), function() {
                                    return u(i.Sequence.Thunk.value(e), [i.Sequence.Thunk.iterator(e), i.Sequence.Iterator.done])
                                }, function(t) {
                                    var r = n(i.Sequence.Thunk.value(e), i.Sequence.Thunk.value(t));
                                    return r < 0 ? u(i.Sequence.Thunk.value(e), [i.Sequence.Thunk.iterator(e),
                                        function() {
                                            return t
                                        }
                                    ]) : r > 0 ? u(i.Sequence.Thunk.value(t), [
                                        function() {
                                            return e
                                        },
                                        i.Sequence.Thunk.iterator(t)
                                    ]) : u(i.Sequence.Thunk.value(e), [i.Sequence.Thunk.iterator(e), i.Sequence.Thunk.iterator(t)])
                                })
                            })
                        })
                    }, t
                }(i.Sequence);
            n.
            default = u
        }, {
            "../../core": 24
        }
    ],
    66: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }(),
                o = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("../../core"),
                u = function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return r(t, e), t.zip = function(e, t) {
                        return new i.Sequence(function(n, r) {
                            var u = o(void 0 === n ? [
                                function() {
                                    return e.iterate()
                                },
                                function() {
                                    return t.iterate()
                                }
                            ] : n, 2),
                                c = u[0],
                                a = u[1];
                            return i.Sequence.Iterator.when(c(), function() {
                                return r()
                            }, function(e) {
                                return i.Sequence.Iterator.when(a(), function() {
                                    return r()
                                }, function(t) {
                                    return r([i.Sequence.Thunk.value(e), i.Sequence.Thunk.value(t)], [i.Sequence.Thunk.iterator(e), i.Sequence.Thunk.iterator(t)])
                                })
                            })
                        })
                    }, t
                }(i.Sequence);
            n.
            default = u
        }, {
            "../../core": 24
        }
    ],
    67: [
        function(e, t, n) {
            "use strict";

            function r(e, t, n, r) {
                return e.some(function(e) {
                    var o = e.type,
                        i = e.namespace,
                        u = e.listener;
                    return o === t && i.length === n.length && i.every(function(e, t) {
                        return i[t] === n[t]
                    }) && u === r
                })
            }

            function o(e, t) {
                switch (typeof e) {
                    case "function":
                        return;
                    default:
                        throw new TypeError("Spica: Observation: Invalid listener.\n\t" + t + " " + e)
                }
            }
            var i = this && this.__values || function(e) {
                    var t = "function" == typeof Symbol && e[Symbol.iterator],
                        n = 0;
                    return t ? t.call(e) : {
                        next: function() {
                            return e && n >= e.length && (e = void 0), {
                                value: e && e[n++],
                                done: !e
                            }
                        }
                    }
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var u, c = e("./concat"),
                a = e("./equal"),
                s = e("./exception");
            ! function(e) {
                e.monitor = "monitor", e.subscriber = "subscriber"
            }(u = n.RegisterItemType || (n.RegisterItemType = {}));
            var f = function() {
                function e() {
                    this.relaySources = new WeakSet, this.node_ = {
                        parent: void 0,
                        children: new Map,
                        childrenNames: [],
                        items: []
                    }
                }
                return e.prototype.monitor = function(e, t, n) {
                    var i = this,
                        c = (void 0 === n ? {} : n).once,
                        a = void 0 !== c && c;
                    o(t, e);
                    var s = this.seekNode_(e).items;
                    return r(s, u.monitor, e, t) ? function() {} : (s.push({
                        type: u.monitor,
                        namespace: e,
                        listener: t,
                        options: {
                            once: a
                        }
                    }), function() {
                        return i.off(e, t, u.monitor)
                    })
                }, e.prototype.on = function(e, t, n) {
                    var i = this,
                        c = (void 0 === n ? {} : n).once,
                        a = void 0 !== c && c;
                    o(t, e);
                    var s = this.seekNode_(e).items;
                    return r(s, u.subscriber, e, t) ? function() {} : (s.push({
                        type: u.subscriber,
                        namespace: e,
                        listener: t,
                        options: {
                            once: a
                        }
                    }), function() {
                        return i.off(e, t)
                    })
                }, e.prototype.once = function(e, t) {
                    return o(t, e), this.on(e, t, {
                        once: !0
                    })
                }, e.prototype.off = function(e, t, n) {
                    var r = this;
                    switch (void 0 === n && (n = u.subscriber), typeof t) {
                        case "function":
                            return void this.seekNode_(e).items.some(function(e, r, o) {
                                var i = e.type;
                                if (e.listener !== t) return !1;
                                if (i !== n) return !1;
                                switch (r) {
                                    case 0:
                                        return !void o.shift();
                                    case o.length - 1:
                                        return !void o.pop();
                                    default:
                                        return !void o.splice(r, 1)
                                }
                            });
                        case "undefined":
                            var i = this.seekNode_(e);
                            return i.childrenNames.slice().forEach(function(t) {
                                r.off(e.concat([t]));
                                var n = i.children.get(t);
                                n && (n.items.length + n.childrenNames.length > 0 || (i.children.delete(t), i.childrenNames.splice(a.findIndex(t, i.childrenNames), 1)))
                            }), void(i.items = i.items.filter(function(e) {
                                return e.type === u.monitor
                            }));
                        default:
                            throw o(t, e)
                    }
                }, e.prototype.emit = function(e, t, n) {
                    this.drain_(e, t, n)
                }, e.prototype.reflect = function(e, t) {
                    var n = [];
                    return this.emit(e, t, function(e, t) {
                        return n = t
                    }), n
                }, e.prototype.relay = function(e) {
                    var t = this;
                    if (this.relaySources.has(e)) return function() {};
                    this.relaySources.add(e);
                    var n = e.monitor([], function(e, n) {
                        return void t.emit(n, e)
                    });
                    return function() {
                        return t.relaySources.delete(e), n()
                    }
                }, e.prototype.drain_ = function(e, t, n) {
                    var r = this,
                        o = [];
                    if (this.refsBelow_(this.seekNode_(e)).reduce(function(i, c) {
                        var a = c.type,
                            f = c.listener,
                            l = c.options.once;
                        if (a === u.subscriber) {
                            l && r.off(e, f);
                            try {
                                var p = f(t, e);
                                n && (o[o.length] = p)
                            } catch (e) {
                                s.causeAsyncException(e)
                            }
                        }
                    }, void 0), this.refsAbove_(this.seekNode_(e)).reduce(function(n, o) {
                        var i = o.type,
                            c = o.listener,
                            a = o.options.once;
                        if (i === u.monitor) {
                            a && r.off(e, c, u.monitor);
                            try {
                                c(t, e)
                            } catch (e) {
                                s.causeAsyncException(e)
                            }
                        }
                    }, void 0), n) try {
                        n(t, o)
                    } catch (e) {
                        s.causeAsyncException(e)
                    }
                }, e.prototype.refs = function(e) {
                    return this.refsBelow_(this.seekNode_(e))
                }, e.prototype.refsAbove_ = function(e) {
                    var t = e.parent,
                        n = e.items;
                    for (n = c.concat([], n); t;) n = c.concat(n, t.items), t = t.parent;
                    return n
                }, e.prototype.refsBelow_ = function(e) {
                    var t = e.childrenNames,
                        n = e.children,
                        r = e.items;
                    r = c.concat([], r);
                    for (var o = 0; o < t.length; ++o) {
                        var i = t[o],
                            u = this.refsBelow_(n.get(i));
                        r = c.concat(r, u), 0 === u.length && (n.delete(i), t.splice(a.findIndex(i, t), 1), --o)
                    }
                    return r
                }, e.prototype.seekNode_ = function(e) {
                    var t = this.node_;
                    try {
                        for (var n = i(e), r = n.next(); !r.done; r = n.next()) {
                            var o = r.value,
                                u = t.children;
                            u.has(o) || (t.childrenNames.push(o), u.set(o, {
                                parent: t,
                                children: new Map,
                                childrenNames: [],
                                items: []
                            })), t = u.get(o)
                        }
                    } catch (e) {
                        c = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (a = n.
                                return) && a.call(n)
                        } finally {
                            if (c) throw c.error
                        }
                    }
                    return t;
                    var c, a
                }, e
            }();
            n.Observation = f
        }, {
            "./concat": 6,
            "./equal": 9,
            "./exception": 10
        }
    ],
    68: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            }),
            function(e) {
                for (var t in e) n.hasOwnProperty(t) || (n[t] = e[t])
            }(e("./monad/sequence"))
        }, {
            "./monad/sequence": 23
        }
    ],
    69: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = "0".repeat(15),
                o = 0;
            n.sqid = function(e) {
                if (arguments.length > 0) {
                    if ("number" != typeof e) throw new TypeError("Spica: sqid: A parameter value must be a number: " + e);
                    if (e >= 0 == 0) throw new TypeError("Spica: sqid: A parameter value must be a positive number: " + e);
                    if (e % 1 != 0) throw new TypeError("Spica: sqid: A parameter value must be an integer: " + e)
                }
                return void 0 === e ? (r + ++o).slice(-15) : (r + e).slice(-15)
            }
        }, {}
    ],
    70: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                }, o = this && this.__spread || function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(r(arguments[t]));
                    return e
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("./observation"),
                u = e("./assign"),
                c = e("./tick"),
                a = e("./thenable"),
                s = e("./sqid"),
                f = e("./exception"),
                l = function() {
                    function e(t) {
                        void 0 === t && (t = {});
                        var n = this;
                        if (this.id = s.sqid(), this.settings = {
                            name: "",
                            size: 1 / 0,
                            timeout: 1 / 0,
                            destructor: function(e) {},
                            scheduler: c.tick,
                            resource: 10
                        }, this.events = {
                            init: new i.Observation,
                            loss: new i.Observation,
                            exit: new i.Observation
                        }, this.workers = new Map, this.alive = !0, this.available = !0, this.messages = [], this.deliver = function() {
                            for (var e, t, o = Date.now(), i = 0, u = n.messages.length; n.available && i < u; ++i) {
                                var c = function(i, u) {
                                    if (n.settings.resource - (Date.now() - o) > 0 == 0) return {
                                        value: void n.schedule()
                                    };
                                    var c = r(n.messages[i], 4),
                                        s = c[0],
                                        l = c[1],
                                        p = c[2],
                                        d = c[3],
                                        h = n.workers.has(s) && Date.now() <= d ? n.workers.get(s).call([l, d]) : void 0;
                                    if (!h && Date.now() < d) return e = i, t = u, "continue";
                                    if (0 === i ? n.messages.shift() : n.messages.splice(i, 1), --i, --u, h || n.events.loss.emit([s], [s, l]), !h || h instanceof Error) {
                                        try {
                                            p(void 0, new Error("Spica: Supervisor: A processing has failed."))
                                        } catch (e) {
                                            f.causeAsyncException(e)
                                        }
                                        return e = i, t = u, "continue"
                                    }
                                    var v = r(h, 1)[0];
                                    if (a.isThenable(v)) Promise.resolve(v).then(function(e) {
                                        return n.available ? void p(e) : void p(void 0, new Error("Spica: Supervisor: A processing has failed."))
                                    }, function() {
                                        return void p(void 0, new Error("Spica: Supervisor: A processing has failed."))
                                    });
                                    else try {
                                        p(v)
                                    } catch (e) {
                                        f.causeAsyncException(e)
                                    }
                                    e = i, t = u
                                }(i, u);
                                if (i = e, u = t, "object" == typeof c) return c.value
                            }
                        }, this.constructor.hasOwnProperty("instances") || (this.constructor.instances = new Set), u.extend(this.settings, t), this.name = this.settings.name, this.constructor === e) throw new Error("Spica: Supervisor: <" + this.id + "/" + this.name + ">: Cannot instantiate abstract classes.");
                        this.constructor.instances.add(this), this.scheduler = function() {
                            return void(0, n.settings.scheduler)(n.deliver)
                        }
                    }
                    return Object.defineProperty(e, "count", {
                        get: function() {
                            return this.instances ? this.instances.size : 0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(e, "procs", {
                        get: function() {
                            return this.instances ? o(this.instances).reduce(function(e, t) {
                                return e + t.workers.size
                            }, 0) : 0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), e.prototype.destructor = function(e) {
                        for (this.available = !1, this.workers.forEach(function(t) {
                            return void t.terminate(e)
                        }), Object.freeze(this.workers); this.messages.length > 0;) {
                            var t = r(this.messages.shift(), 2),
                                n = t[0],
                                o = t[1];
                            this.events.loss.emit([n], [n, o])
                        }
                        Object.freeze(this.messages), this.alive = !1, this.constructor.instances.delete(this), Object.freeze(this), this.settings.destructor(e)
                    }, e.prototype.validate = function() {
                        if (!this.available) throw new Error("Spica: Supervisor: <" + this.id + "/" + this.name + ">: A supervisor is already terminated.")
                    }, e.prototype.register = function(e, t, n) {
                        var r = this;
                        if (this.validate(), this.workers.has(e)) throw new Error("Spica: Supervisor: <" + this.id + "/" + this.name + "/" + e + ">: Cannot register a process multiply with the same name.");
                        return this.schedule(), t = "function" == typeof t ? {
                            init: function(e) {
                                return e
                            },
                            call: t,
                            exit: function(e) {}
                        } : t, this.workers.set(e, new p(this, e, t, n, function() {
                            return void r.workers.delete(e)
                        })).get(e).terminate
                    }, e.prototype.call = function(e, t, n, o) {
                        var i = this;
                        for (void 0 === o && (o = this.settings.timeout), this.validate(), this.messages.push([e, t, n, Date.now() + o]); this.messages.length > this.settings.size;) {
                            var u = r(this.messages.shift(), 3),
                                c = u[0],
                                a = u[1],
                                s = u[2];
                            this.events.loss.emit([c], [c, a]);
                            try {
                                s(void 0, new Error("Spica: Supervisor: A message overflowed."))
                            } catch (e) {
                                f.causeAsyncException(e)
                            }
                        }
                        this.schedule(), o <= 0 || o !== 1 / 0 && setTimeout(function() {
                            return void i.schedule()
                        }, o + 3)
                    }, e.prototype.cast = function(e, t, n) {
                        void 0 === n && (n = this.settings.timeout), this.validate();
                        var o = this.workers.has(e) ? this.workers.get(e).call([t, n]) : void 0;
                        if (void 0 === o && this.events.loss.emit([e], [e, t]), void 0 === o || o instanceof Error) return !1;
                        var i = r(o, 1)[0];
                        return a.isThenable(i) && i.
                        catch (function() {}), !0
                    }, e.prototype.refs = function(e) {
                        function t(e) {
                            return [e.name, e.process, e.state, e.terminate]
                        }
                        return this.validate(), void 0 === e ? o(this.workers.values()).map(t) : this.workers.has(e) ? [t(this.workers.get(e))] : []
                    }, e.prototype.kill = function(e, t) {
                        return !!this.available && ( !! this.workers.has(e) && this.workers.get(e).terminate(t))
                    }, e.prototype.terminate = function(e) {
                        return !!this.available && (this.destructor(e), !0)
                    }, e.prototype.schedule = function() {
                        0 !== this.messages.length && c.tick(this.scheduler, !0)
                    }, e
                }();
            n.Supervisor = l;
            var p = function() {
                function e(e, t, n, o, i) {
                    var u = this;
                    this.sv = e, this.name = t, this.process = n, this.state = o, this.destructor_ = i, this.alive = !0, this.available = !0, this.called = !1, this.call = function(e) {
                        var t = r(e, 2),
                            n = t[0],
                            o = t[1];
                        if (u.available) try {
                            u.available = !1, u.called || (u.called = !0, u.sv.events.init.emit([u.name], [u.name, u.process, u.state]), u.state = u.process.init(u.state));
                            var i = u.process.call(n, u.state);
                            if (a.isThenable(i)) return [new Promise(function(e, t) {
                                return i.then(e, t), o === 1 / 0 ? void 0 : void setTimeout(function() {
                                    return void t(new Error)
                                }, o - Date.now())
                            }).then(function(e) {
                                var t = r(e, 2);
                                return [t[0], t[1]]
                            }).then(function(e) {
                                var t = r(e, 2),
                                    n = t[0],
                                    o = t[1];
                                return u.sv.schedule(), u.alive ? (u.state = o, u.available = !0, n) : Promise.reject(new Error)
                            }, function(e) {
                                throw u.sv.schedule(), u.terminate(e), e
                            })];
                            var c = r(i, 2),
                                s = c[0],
                                f = c[1];
                            return u.state = f, u.available = !0, [s]
                        } catch (e) {
                            return u.terminate(e), new Error
                        }
                    }, this.terminate = function(e) {
                        return !!u.alive && (u.destructor(e), !0)
                    }
                }
                return e.prototype.destructor = function(e) {
                    if (this.alive = !1, this.available = !1, Object.freeze(this), this.destructor_(), this.called) try {
                        this.process.exit(e, this.state), this.sv.events.exit.emit([this.name], [this.name, this.process, this.state, e])
                    } catch (t) {
                        this.sv.events.exit.emit([this.name], [this.name, this.process, this.state, e]), this.sv.terminate(t)
                    }
                }, e
            }()
        }, {
            "./assign": 3,
            "./exception": 10,
            "./observation": 67,
            "./sqid": 69,
            "./thenable": 71,
            "./tick": 72
        }
    ],
    71: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.isThenable = function(e) {
                return !!e && "object" == typeof e && "function" == typeof e.then
            }
        }, {}
    ],
    72: [
        function(e, t, n) {
            "use strict";

            function r() {
                1 === c.length && s.then(o)
            }

            function o() {
                for (var e = i();;) {
                    try {
                        for (; e.length > 0;) e.shift()()
                    } catch (e) {
                        u.causeAsyncException(e);
                        continue
                    }
                    return
                }
            }

            function i() {
                var e = c;
                return c = [], a = new WeakSet, e
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var u = e("./exception"),
                c = [],
                a = new WeakSet;
            n.tick = function(e, t) {
                if (void 0 === t && (t = !1), t) {
                    if (a.has(e)) return;
                    a.add(e)
                }
                c.push(e), r()
            };
            var s = Promise.resolve()
        }, {
            "./exception": 10
        }
    ],
    73: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.type = function(e) {
                var t = Object.prototype.toString.call(e).split(" ").pop().slice(0, -1);
                return "object" != typeof e && e instanceof Object == 0 || null === e ? t.toLowerCase() : t
            }
        }, {}
    ],
    74: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            }),
            function(e) {
                for (var t in e) n.hasOwnProperty(t) || (n[t] = e[t])
            }(e("./src/export"));
            var r = e("./src/export");
            n.
            default = r.
            default
        }, {
            "./src/export": 77
        }
    ],
    75: [
        function(e, t, n) {
            "use strict";

            function r(e) {
                var t = e.element;
                return null === t.parentNode || t.parentNode instanceof DocumentFragment
            }
            var o = this && this.__assign || Object.assign || function(e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++) {
                        t = arguments[n];
                        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
                    }
                    return e
                }, i = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                }, u = this && this.__spread || function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(i(arguments[t]));
                    return e
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var c;
            ! function(e) {
                e.Void = "void", e.Text = "text", e.Collection = "collection", e.Struct = "struct"
            }(c || (c = {}));
            var a = function() {
                function e(e, t) {
                    function n() {
                        for (; e.childNodes.length > 0;) e.removeChild(e.firstChild)
                    }

                    function i(e, t) {
                        function n(e, t) {
                            e.innerHTML = e.innerHTML.replace(/^\s*\$scope(?!\w)/gm, "#" + t), u(e.querySelectorAll("*")).forEach(function(e) {
                                return void e.remove()
                            })
                        }
                        if (e.match(/^[\w\-]+$/)) return void Object.values(t).map(function(e) {
                            return e.element
                        }).forEach(function(t) {
                            return t instanceof HTMLStyleElement && void n(t, e)
                        })
                    }
                    switch (this.element_ = e, this.children_ = t, this.type = void 0 === this.children_ ? c.Void : "string" == typeof this.children_ ? c.Text : Array.isArray(this.children_) ? c.Collection : c.Struct, this.tag, this.type) {
                        case c.Void:
                            return;
                        case c.Text:
                            return n(), this.children_ = document.createTextNode(""), this.element_.appendChild(this.children_), void(this.children = t);
                        case c.Collection:
                            return n(), this.children_ = [], this.children = t, void i(this.element_.id, this.children_);
                        case c.Struct:
                            return n(), this.children_ = function(e, t) {
                                return Object.defineProperties(t, Object.keys(t).reduce(function(n, o) {
                                    var i = t[o];
                                    if (!r(i)) throw new Error("TypedDOM: Cannot add a child element used in another dom.");
                                    return e.appendChild(i.element), n[o] = {
                                        configurable: !0,
                                        enumerable: !0,
                                        get: function() {
                                            return i
                                        },
                                        set: function(t) {
                                            var n = i;
                                            if (t !== n) {
                                                if (!r(t)) throw new Error("TypedDOM: Cannot add a child element used in another dom.");
                                                i = t, e.replaceChild(t.element, n.element)
                                            }
                                        }
                                    }, n
                                }, {}))
                            }(this.element_, o({}, t)), void i(this.element_.id, this.children_)
                    }
                }
                return Object.defineProperty(e.prototype, "element", {
                    get: function() {
                        return this.element_
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "children", {
                    get: function() {
                        switch (this.type) {
                            case c.Text:
                                return this.children_.data;
                            default:
                                return this.children_
                        }
                    },
                    set: function(e) {
                        var t = this;
                        switch (this.type) {
                            case c.Void:
                                return;
                            case c.Text:
                                return void(this.children_.data = e);
                            case c.Collection:
                                return this.children_.reduce(function(e, t) {
                                    var n = e.indexOf(t);
                                    return n > -1 ? e : (e.splice(n, 1), t.element.remove(), e)
                                }, u(e)), this.children_ = [], e.forEach(function(e, n) {
                                    if (!r(e)) throw new Error("TypedDOM: Cannot add a child element used in another dom.");
                                    t.children_[n] = e, t.element_.appendChild(e.element)
                                }), void Object.freeze(this.children_);
                            case c.Struct:
                                return void Object.keys(this.children_).forEach(function(n) {
                                    return t.children_[n] = e[n]
                                })
                        }
                    },
                    enumerable: !0,
                    configurable: !0
                }), e
            }();
            n.El = a
        }, {}
    ],
    76: [
        function(e, t, n) {
            "use strict";

            function r(e, t, n) {
                var r = t();
                if (e !== r.tagName.toLowerCase()) throw new Error('TypedDOM: Tag name must be "' + e + '" but "' + r.tagName.toLowerCase() + '".');
                return n ? (Object.keys(n).forEach(function(e) {
                    return void r.setAttribute(e, n[e])
                }), r) : r
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("./builder");
            n.TypedHTML = ["a", "applet", "area", "audio", "base", "basefont", "blockquote", "body", "br", "button", "canvas", "caption", "col", "colgroup", "data", "datalist", "del", "dir", "div", "dl", "embed", "fieldset", "font", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "hr", "html", "iframe", "img", "input", "ins", "isindex", "label", "legend", "li", "link", "listing", "map", "marquee", "menu", "meta", "meter", "nextid", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "script", "select", "source", "span", "style", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "ul", "video", "x-ms-webview", "xmp", "abbr", "acronym", "address", "article", "aside", "b", "bdo", "big", "center", "cite", "code", "dd", "dfn", "dt", "em", "figcaption", "figure", "footer", "header", "hgroup", "i", "kbd", "keygen", "mark", "nav", "nobr", "noframes", "noscript", "plaintext", "rt", "ruby", "s", "samp", "section", "small", "strike", "strong", "sub", "sup", "tt", "u", "var", "wbr", "create", "any"].reduce(function(e, t) {
                return e[t] = "create" === t ? function(e, t, r, o) {
                    return void 0 === t && (t = function() {
                        return document.createElement(e)
                    }), void 0 === r && (r = function() {
                        return document.createElement(e)
                    }), void 0 === o && (o = function() {
                        return document.createElement(e)
                    }), n.TypedHTML.any(t, r, o, e)
                } : function(e, n, i, u) {
                    switch (void 0 === u && (u = t), u = "any" === t ? u : t, typeof e) {
                        case "undefined":
                            return new o.El(r(u, function() {
                                return document.createElement(u)
                            }), void 0);
                        case "function":
                            return new o.El(r(u, e), void 0);
                        case "string":
                            return new o.El(r(u, n || function() {
                                return document.createElement(u)
                            }), e);
                        case "object":
                            return i = "function" == typeof n ? n : i || function() {
                                return document.createElement(u)
                            }, Object.keys(e).slice(-1).every(function(t) {
                                return void 0 === t || "object" == typeof e[t]
                            }) ? new o.El(r(u, i), e) : new o.El(r(u, i, e), n === i ? void 0 : n);
                        default:
                            throw new TypeError("TypedDOM: Invalid arguments: [" + e + ", " + n + ", " + i + "]")
                    }
                }, e
            }, {})
        }, {
            "./builder": 75
        }
    ],
    77: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = e("./dom/html");
            n.
            default = r.TypedHTML, n.TypedHTML = r.TypedHTML,
            function(e) {
                for (var t in e) n.hasOwnProperty(t) || (n[t] = e[t])
            }(e("./util/dom"))
        }, {
            "./dom/html": 76,
            "./util/dom": 78
        }
    ],
    78: [
        function(e, t, n) {
            "use strict";

            function r(e, t, r, o) {
                function u(e) {
                    "object" == typeof o && o.passive && (e.preventDefault = s.noop), n.currentTargets.set(e, e.currentTarget), r(e)
                }
                void 0 === o && (o = !1), e.addEventListener(t, u, i(o));
                var c = function() {
                    return c = s.noop, void e.removeEventListener(t, u, i(o))
                };
                return function() {
                    return void c()
                }
            }

            function o(e, t, n, o) {
                void 0 === o && (o = !1);
                var i = r(e, t, function(e) {
                    i(), n(e)
                }, o);
                return function() {
                    return void i()
                }
            }

            function i(e) {
                return f ? e : "boolean" == typeof e ? e : e.capture
            }
            var u = this && this.__assign || Object.assign || function(e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++) {
                        t = arguments[n];
                        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
                    }
                    return e
                }, c = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                }, a = this && this.__spread || function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(c(arguments[t]));
                    return e
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var s = e("./noop");
            n.currentTargets = new WeakMap, n.bind = r, n.once = o, n.delegate = function(e, t, n, i, c) {
                return void 0 === c && (c = {}), r(e instanceof Document ? e.documentElement : e, n, function(r) {
                    var u = r.target.closest(t);
                    u && a(e.querySelectorAll(t)).filter(function(e) {
                        return e === u
                    }).forEach(function(e) {
                        return void o(e, n, function(e) {
                            i(e)
                        }, c)
                    })
                }, u({}, c, {
                    capture: !0
                }))
            };
            var f = !1;
            try {
                document.createElement("div").addEventListener("test", function() {}, {
                    get capture() {
                        return f = !0
                    }
                })
            } catch (e) {}
        }, {
            "./noop": 79
        }
    ],
    79: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.noop = function() {}
        }, {}
    ],
    80: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = e("./layer/interface/service/gui");
            n.
            default = r.GUI;
            var o = e("./layer/interface/service/gui");
            n.Pjax = o.GUI;
            var i = e("./lib/router");
            n.router = i.router
        }, {
            "./layer/interface/service/gui": 114,
            "./lib/router": 125
        }
    ],
    81: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__awaiter || function(e, t, n, r) {
                    return new(n || (n = Promise))(function(o, i) {
                        function u(e) {
                            try {
                                a(r.next(e))
                            } catch (e) {
                                i(e)
                            }
                        }

                        function c(e) {
                            try {
                                a(r.
                                    throw (e))
                            } catch (e) {
                                i(e)
                            }
                        }

                        function a(e) {
                            e.done ? o(e.value) : new n(function(t) {
                                t(e.value)
                            }).then(u, c)
                        }
                        a((r = r.apply(e, t || [])).next())
                    })
                }, o = this && this.__generator || function(e, t) {
                    function n(e) {
                        return function(t) {
                            return r([e, t])
                        }
                    }

                    function r(n) {
                        if (o) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (o = 1, i && (u = i[2 & n[0] ? "return" : n[0] ? "throw" : "next"]) && !(u = u.call(i, n[1])).done) return u;
                            switch (i = 0, u && (n = [0, u.value]), n[0]) {
                                case 0:
                                case 1:
                                    u = n;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: n[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, i = n[1], n = [0];
                                    continue;
                                case 7:
                                    n = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (u = a.trys, !(u = u.length > 0 && u[u.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === n[0] && (!u || n[1] > u[0] && n[1] < u[3])) {
                                        a.label = n[1];
                                        break
                                    }
                                    if (6 === n[0] && a.label < u[1]) {
                                        a.label = u[1], u = n;
                                        break
                                    }
                                    if (u && a.label < u[2]) {
                                        a.label = u[2], a.ops.push(n);
                                        break
                                    }
                                    u[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            n = t.call(e, a)
                        } catch (e) {
                            n = [6, e], i = 0
                        } finally {
                            o = u = 0
                        }
                        if (5 & n[0]) throw n[1];
                        return {
                            value: n[0] ? n[1] : void 0,
                            done: !0
                        }
                    }
                    var o, i, u, c, a = {
                            label: 0,
                            sent: function() {
                                if (1 & u[0]) throw u[1];
                                return u[1]
                            },
                            trys: [],
                            ops: []
                        };
                    return c = {
                        next: n(0),
                        throw :n(1),
                        return :n(2)
                    }, "function" == typeof Symbol && (c[Symbol.iterator] = function() {
                        return this
                    }), c
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("spica/maybe"),
                u = e("spica/either"),
                c = e("../domain/data/config");
            n.Config = c.Config;
            var a = e("./config/scope"),
                s = e("../domain/router/api"),
                f = e("../domain/event/router"),
                l = e("./data/error");
            ! function(e) {
                for (var t in e) n.hasOwnProperty(t) || (n[t] = e[t])
            }(e("./store/path")), n.route = function(e, t, n, c) {
                return r(this, void 0, void 0, function() {
                    return o(this, function(r) {
                        return [2, i.Just(new f.RouterEvent(t).location).bind(function(t) {
                            var n = t.orig,
                                r = t.dest;
                            return a.scope(e, {
                                orig: n.pathname,
                                dest: r.pathname
                            })
                        }).fmap(function(e) {
                            return new s.RouterEntity(e, new f.RouterEvent(t), new s.RouterEntityState(n.process, n.scripts))
                        }).fmap(function(e) {
                            return s.route(e, c)
                        }).extract(function() {
                            return u.Left(new l.ApplicationError("Disabled by config."))
                        })]
                    })
                })
            }
        }, {
            "../domain/data/config": 87,
            "../domain/event/router": 89,
            "../domain/router/api": 90,
            "./config/scope": 82,
            "./data/error": 83,
            "./store/path": 84,
            "spica/either": 8,
            "spica/maybe": 13
        }
    ],
    82: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = e("../../../lib/router"),
                o = e("../../domain/data/config"),
                i = e("spica/sequence"),
                u = e("spica/maybe"),
                c = e("spica/assign");
            n.scope = function(e, t) {
                return i.Sequence.from(Object.keys(e.scope).sort().reverse()).dropWhile(function(e) {
                    return !r.compare(e, t.orig) && !r.compare(e, t.dest)
                }).take(1).filter(function(e) {
                    return !!r.compare(e, t.orig) && r.compare(e, t.dest)
                }).map(function(t) {
                    return e.scope[t]
                }).map(function(t) {
                    return t ? u.Just(new o.Config(c.extend({}, e, t))) : u.Nothing
                }).extract().reduce(function(e, t) {
                    return t
                }, u.Nothing)
            }
        }, {
            "../../../lib/router": 125,
            "../../domain/data/config": 87,
            "spica/assign": 3,
            "spica/maybe": 13,
            "spica/sequence": 68
        }
    ],
    83: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = function(e) {
                function t(t) {
                    return e.call(this, "Application: " + t) || this
                }
                return r(t, e), t
            }(e("../../../lib/error").PjaxError);
            n.ApplicationError = o
        }, {
            "../../../lib/error": 123
        }
    ],
    84: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = e("../../domain/store/path");
            n.loadTitle = r.loadTitle, n.savePosition = r.savePosition
        }, {
            "../../domain/store/path": 107
        }
    ],
    85: [
        function(e, t, n) {
            "use strict";

            function r(e) {
                return e.trim().replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]?|[\uDC00-\uDFFF]/g, function(e) {
                    return 2 === e.length ? e : ""
                }).replace(/%(?![0-9A-F]{2})|[^%\[\]]+/gi, encodeURI).replace(/\?[^#]+/, function(e) {
                    return "?" + e.slice(1).replace(/%[0-9A-F]{2}|[^=&]/gi, function(e) {
                        return e.length < 3 ? encodeURIComponent(e) : e
                    })
                }).replace(/%[0-9A-F]{2}/gi, function(e) {
                    return e.toUpperCase()
                }).replace(/#.+/, e.slice(e.indexOf("#")))
            }

            function o(e) {
                return u.href = e || location.href, u.href.replace(/^([^:/?#]+:\/\/[^/?#]*?):(?:80)?(?=$|[/?#])/, "$1").replace(/^([^:/?#]+:\/\/[^/?#]*)\/?/, "$1/").replace(/%[0-9A-F]{2}/gi, function(e) {
                    return e.toUpperCase()
                }).replace(/#.+/, e.slice(e.indexOf("#")))
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i;
            i || (i = {}), n.standardizeUrl = function(e) {
                return r(o(e))
            }, n._encode = r;
            var u = document.createElement("a")
        }, {}
    ],
    86: [
        function(e, t, n) {
            "use strict";

            function r() {
                window.history.replaceState(i.extend(window.history.state || {}, {
                    title: document.title
                }), document.title)
            }

            function o() {
                window.history.replaceState(i.extend(window.history.state || {}, {
                    position: {
                        top: window.pageYOffset,
                        left: window.pageXOffset
                    }
                }), document.title)
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("spica/assign");
            r(), o(), n.loadTitle = function() {
                return window.history.state.title || document.title
            }, n.saveTitle = r, n.loadPosition = function() {
                return window.history.state.position || {
                    top: window.pageYOffset,
                    left: window.pageXOffset
                }
            }, n.savePosition = o
        }, {
            "spica/assign": 3
        }
    ],
    87: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__awaiter || function(e, t, n, r) {
                    return new(n || (n = Promise))(function(o, i) {
                        function u(e) {
                            try {
                                a(r.next(e))
                            } catch (e) {
                                i(e)
                            }
                        }

                        function c(e) {
                            try {
                                a(r.
                                    throw (e))
                            } catch (e) {
                                i(e)
                            }
                        }

                        function a(e) {
                            e.done ? o(e.value) : new n(function(t) {
                                t(e.value)
                            }).then(u, c)
                        }
                        a((r = r.apply(e, t || [])).next())
                    })
                }, o = this && this.__generator || function(e, t) {
                    function n(e) {
                        return function(t) {
                            return r([e, t])
                        }
                    }

                    function r(n) {
                        if (o) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (o = 1, i && (u = i[2 & n[0] ? "return" : n[0] ? "throw" : "next"]) && !(u = u.call(i, n[1])).done) return u;
                            switch (i = 0, u && (n = [0, u.value]), n[0]) {
                                case 0:
                                case 1:
                                    u = n;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: n[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, i = n[1], n = [0];
                                    continue;
                                case 7:
                                    n = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (u = a.trys, !(u = u.length > 0 && u[u.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === n[0] && (!u || n[1] > u[0] && n[1] < u[3])) {
                                        a.label = n[1];
                                        break
                                    }
                                    if (6 === n[0] && a.label < u[1]) {
                                        a.label = u[1], u = n;
                                        break
                                    }
                                    if (u && a.label < u[2]) {
                                        a.label = u[2], a.ops.push(n);
                                        break
                                    }
                                    u[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            n = t.call(e, a)
                        } catch (e) {
                            n = [6, e], i = 0
                        } finally {
                            o = u = 0
                        }
                        if (5 & n[0]) throw n[1];
                        return {
                            value: n[0] ? n[1] : void 0,
                            done: !0
                        }
                    }
                    var o, i, u, c, a = {
                            label: 0,
                            sent: function() {
                                if (1 & u[0]) throw u[1];
                                return u[1]
                            },
                            trys: [],
                            ops: []
                        };
                    return c = {
                        next: n(0),
                        throw :n(1),
                        return :n(2)
                    }, "function" == typeof Symbol && (c[Symbol.iterator] = function() {
                        return this
                    }), c
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("spica/assign"),
                u = function() {
                    function e(e) {
                        this.areas = ["body"], this.link = "a:not([target])", this.form = "form:not([method])", this.replace = "", this.fetch = {
                            timeout: 3e3,
                            wait: 0
                        }, this.update = {
                            head: "base, meta, link",
                            css: !0,
                            script: !0,
                            ignore: "",
                            ignores: {
                                extension: '[href^="chrome-extension://"]',
                                security: '[src*=".scr.kaspersky-labs.com/"]'
                            },
                            reload: "",
                            logger: ""
                        }, this.sequence = new c, this.balance = {
                            bounds: [""],
                            weight: 1,
                            random: 0,
                            client: {
                                hosts: [],
                                support: {
                                    balance: /msie|trident.+ rv:|chrome|firefox|safari/i,
                                    redirect: /msie|trident.+ rv:|chrome|firefox|safari/i
                                },
                                cookie: {
                                    balance: "balanceable",
                                    redirect: "redirectable"
                                }
                            },
                            server: {
                                header: "X-Ajax-Host",
                                expiry: 2592e5
                            }
                        }, this.store = {
                            expiry: 108e5
                        }, this.progressbar = "display:none;position:absolute;bottom:0;left:0;width:0;height:2px;background:rgb(40, 105, 255);", this.scope = {
                            "/": {}
                        }, Object.defineProperties(this.update, {
                            ignore: {
                                enumerable: !1,
                                set: function(e) {
                                    this.ignores._ = e
                                },
                                get: function() {
                                    var e = this;
                                    return Object.keys(this.ignores).map(function(t) {
                                        return e.ignores[t]
                                    }).filter(function(e) {
                                        return e.trim().length > 0
                                    }).join(",")
                                }
                            }
                        }), i.extend(this, e), Object.freeze(this)
                    }
                    return e.prototype.filter = function(e) {
                        return !0
                    }, e.prototype.rewrite = function(e, t, n) {}, e.prototype.fallback = function(e, t) {
                        if (e instanceof HTMLAnchorElement) window.location.assign(e.href);
                        else if (e instanceof HTMLFormElement) window.location.assign(e.action);
                        else {
                            if (!(e instanceof Window)) throw t;
                            window.location.reload(!0)
                        }
                    }, e
                }();
            n.Config = u;
            var c = function() {
                function e() {}
                return e.prototype.fetch = function() {
                    return r(this, void 0, void 0, function() {
                        return o(this, function(e) {
                            return [2, void 0]
                        })
                    })
                }, e.prototype.unload = function() {
                    return r(this, void 0, void 0, function() {
                        return o(this, function(e) {
                            return [2, void 0]
                        })
                    })
                }, e.prototype.ready = function() {
                    return r(this, void 0, void 0, function() {
                        return o(this, function(e) {
                            return [2, void 0]
                        })
                    })
                }, e.prototype.load = function() {}, e
            }();
            n.SequenceData || (n.SequenceData = {})
        }, {
            "spica/assign": 3
        }
    ],
    88: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = function(e) {
                function t(t) {
                    return e.call(this, "Domain: " + t) || this
                }
                return r(t, e), t
            }(e("../../../lib/error").PjaxError);
            n.DomainError = o
        }, {
            "../../../lib/error": 123
        }
    ],
    89: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = e("../../../lib/url"),
                o = e("../../data/model/domain/url"),
                i = e("../../../lib/dom"),
                u = e("../data/error"),
                c = e("typed-dom"),
                a = function() {
                    return function(e) {
                        this.original = e, this.source = c.currentTargets.get(this.original), this.type = this.original.type.toLowerCase(), this.request = new l(this.source), this.location = new p(this.request.url), Object.freeze(this)
                    }
                }();
            n.RouterEvent = a;
            var s;
            ! function(e) {
                e.Anchor = HTMLAnchorElement, e.Form = HTMLFormElement, e.Window = window.Window
            }(s = n.RouterEventSource || (n.RouterEventSource = {}));
            ! function(e) {
                e.click = "click", e.submit = "submit", e.popstate = "popstate"
            }(n.RouterEventType || (n.RouterEventType = {}));
            var f;
            ! function(e) {
                e.GET = "GET", e.POST = "POST"
            }(f = n.RouterEventMethod || (n.RouterEventMethod = {}));
            var l = function() {
                return function(e) {
                    var t = this;
                    this.source = e, this.method = function() {
                        if (t.source instanceof s.Anchor) return f.GET;
                        if (t.source instanceof s.Form) return t.source.method.toUpperCase() === f.POST ? f.POST : f.GET;
                        if (t.source instanceof s.Window) return f.GET;
                        throw new TypeError
                    }(), this.url = function() {
                        if (t.source instanceof s.Anchor) return o.standardizeUrl(t.source.href);
                        if (t.source instanceof s.Form) return t.source.method.toUpperCase() === f.GET ? o.standardizeUrl(t.source.action.split(/[?#]/).shift().concat("?" + i.serialize(t.source))) : o.standardizeUrl(t.source.action.split(/[?#]/).shift());
                        if (t.source instanceof s.Window) return o.standardizeUrl(window.location.href);
                        throw new TypeError
                    }(), this.data = t.source instanceof s.Form && t.method === f.POST ? new FormData(t.source) : null, Object.freeze(this)
                }
            }();
            n.RouterEventRequest = l;
            var p = function() {
                return function(e) {
                    if (this.target = e, this.orig = new r.URL(o.standardizeUrl(window.location.href)), this.dest = new r.URL(this.target), this.orig.origin !== this.dest.origin) throw new u.DomainError("Cannot go to the different origin: " + this.dest.href);
                    Object.freeze(this)
                }
            }();
            n.RouterEventLocation = p
        }, {
            "../../../lib/dom": 122,
            "../../../lib/url": 126,
            "../../data/model/domain/url": 85,
            "../data/error": 88,
            "typed-dom": 74
        }
    ],
    90: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__awaiter || function(e, t, n, r) {
                    return new(n || (n = Promise))(function(o, i) {
                        function u(e) {
                            try {
                                a(r.next(e))
                            } catch (e) {
                                i(e)
                            }
                        }

                        function c(e) {
                            try {
                                a(r.
                                    throw (e))
                            } catch (e) {
                                i(e)
                            }
                        }

                        function a(e) {
                            e.done ? o(e.value) : new n(function(t) {
                                t(e.value)
                            }).then(u, c)
                        }
                        a((r = r.apply(e, t || [])).next())
                    })
                }, o = this && this.__generator || function(e, t) {
                    function n(e) {
                        return function(t) {
                            return r([e, t])
                        }
                    }

                    function r(n) {
                        if (o) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (o = 1, i && (u = i[2 & n[0] ? "return" : n[0] ? "throw" : "next"]) && !(u = u.call(i, n[1])).done) return u;
                            switch (i = 0, u && (n = [0, u.value]), n[0]) {
                                case 0:
                                case 1:
                                    u = n;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: n[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, i = n[1], n = [0];
                                    continue;
                                case 7:
                                    n = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (u = a.trys, !(u = u.length > 0 && u[u.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === n[0] && (!u || n[1] > u[0] && n[1] < u[3])) {
                                        a.label = n[1];
                                        break
                                    }
                                    if (6 === n[0] && a.label < u[1]) {
                                        a.label = u[1], u = n;
                                        break
                                    }
                                    if (u && a.label < u[2]) {
                                        a.label = u[2], a.ops.push(n);
                                        break
                                    }
                                    u[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            n = t.call(e, a)
                        } catch (e) {
                            n = [6, e], i = 0
                        } finally {
                            o = u = 0
                        }
                        if (5 & n[0]) throw n[1];
                        return {
                            value: n[0] ? n[1] : void 0,
                            done: !0
                        }
                    }
                    var o, i, u, c, a = {
                            label: 0,
                            sent: function() {
                                if (1 & u[0]) throw u[1];
                                return u[1]
                            },
                            trys: [],
                            ops: []
                        };
                    return c = {
                        next: n(0),
                        throw :n(1),
                        return :n(2)
                    }, "function" == typeof Symbol && (c[Symbol.iterator] = function() {
                        return this
                    }), c
                }, i = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var u = e("spica/either"),
                c = e("./module/fetch"),
                a = e("./module/update"),
                s = e("./module/update/content"),
                f = e("../store/path"),
                l = e("../data/error"),
                p = e("./model/eav/entity");
            n.RouterEntity = p.RouterEntity, n.RouterEntityState = p.RouterEntityState, n.route = function(e, t) {
                return r(this, void 0, void 0, function() {
                    function n(e, t) {
                        return s.separate({
                            src: e,
                            dst: e
                        }, t).extract(function() {
                            return !1
                        }, function() {
                            return !0
                        })
                    }
                    var p = this;
                    return o(this, function(s) {
                        return [2, u.Right(void 0).bind(e.state.process.either).bind(function() {
                            return n(t.document, e.config.areas) ? u.Right(void 0) : u.Left(new l.DomainError("Failed to match areas."))
                        }).fmap(function() {
                            return c.fetch(e.event.request, e.config, e.state.process)
                        }).fmap(function(n) {
                            return r(p, void 0, void 0, function() {
                                return o(this, function(r) {
                                    switch (r.label) {
                                        case 0:
                                            return [4, n];
                                        case 1:
                                            return [2, r.sent().fmap(function(n) {
                                                var r = i(n, 2),
                                                    o = r[0],
                                                    u = r[1];
                                                return a.update(e, o, u, {
                                                    document: t.document,
                                                    position: f.loadPosition
                                                })
                                            }).extract(u.Left)]
                                    }
                                })
                            })
                        }).extract(u.Left)]
                    })
                })
            }
        }, {
            "../data/error": 88,
            "../store/path": 107,
            "./model/eav/entity": 91,
            "./module/fetch": 94,
            "./module/update": 96,
            "./module/update/content": 98,
            "spica/either": 8
        }
    ],
    91: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = function() {
                return function(e, t, n) {
                    this.config = e, this.event = t, this.state = n, Object.freeze(this)
                }
            }();
            n.RouterEntity = r;
            var o = function() {
                return function(e, t) {
                    this.process = e, this.scripts = t, Object.freeze(this)
                }
            }();
            n.RouterEntityState = o
        }, {}
    ],
    92: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = e("../../../../../../lib/html"),
                o = e("../../../../../data/model/domain/url"),
                i = function() {
                    return function(e) {
                        this.xhr = e, this.response = new function(e) {
                            var t = this;
                            this.xhr = e, this.url = this.xhr.responseURL ? o.standardizeUrl(this.xhr.responseURL) : "", this.header = function(e) {
                                return t.xhr.getResponseHeader(e)
                            }, this.document = "document" === this.xhr.responseType ? this.xhr.responseXML : r.parse(this.xhr.responseText).extract(), Object.freeze(this)
                        }(this.xhr), Object.freeze(this)
                    }
                }();
            n.FetchResult = i
        }, {
            "../../../../../../lib/html": 124,
            "../../../../../data/model/domain/url": 85
        }
    ],
    93: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = function() {
                return function(e) {
                    this.documents = e, Object.freeze(this.documents), Object.freeze(this)
                }
            }();
            n.UpdateSource = r
        }, {}
    ],
    94: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__awaiter || function(e, t, n, r) {
                    return new(n || (n = Promise))(function(o, i) {
                        function u(e) {
                            try {
                                a(r.next(e))
                            } catch (e) {
                                i(e)
                            }
                        }

                        function c(e) {
                            try {
                                a(r.
                                    throw (e))
                            } catch (e) {
                                i(e)
                            }
                        }

                        function a(e) {
                            e.done ? o(e.value) : new n(function(t) {
                                t(e.value)
                            }).then(u, c)
                        }
                        a((r = r.apply(e, t || [])).next())
                    })
                }, o = this && this.__generator || function(e, t) {
                    function n(e) {
                        return function(t) {
                            return r([e, t])
                        }
                    }

                    function r(n) {
                        if (o) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (o = 1, i && (u = i[2 & n[0] ? "return" : n[0] ? "throw" : "next"]) && !(u = u.call(i, n[1])).done) return u;
                            switch (i = 0, u && (n = [0, u.value]), n[0]) {
                                case 0:
                                case 1:
                                    u = n;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: n[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, i = n[1], n = [0];
                                    continue;
                                case 7:
                                    n = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (u = a.trys, !(u = u.length > 0 && u[u.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === n[0] && (!u || n[1] > u[0] && n[1] < u[3])) {
                                        a.label = n[1];
                                        break
                                    }
                                    if (6 === n[0] && a.label < u[1]) {
                                        a.label = u[1], u = n;
                                        break
                                    }
                                    if (u && a.label < u[2]) {
                                        a.label = u[2], a.ops.push(n);
                                        break
                                    }
                                    u[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            n = t.call(e, a)
                        } catch (e) {
                            n = [6, e], i = 0
                        } finally {
                            o = u = 0
                        }
                        if (5 & n[0]) throw n[1];
                        return {
                            value: n[0] ? n[1] : void 0,
                            done: !0
                        }
                    }
                    var o, i, u, c, a = {
                            label: 0,
                            sent: function() {
                                if (1 & u[0]) throw u[1];
                                return u[1]
                            },
                            trys: [],
                            ops: []
                        };
                    return c = {
                        next: n(0),
                        throw :n(1),
                        return :n(2)
                    }, "function" == typeof Symbol && (c[Symbol.iterator] = function() {
                        return this
                    }), c
                }, i = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var u = e("spica/either"),
                c = e("../module/fetch/xhr"),
                a = e("../../data/error"),
                s = e("../../../../lib/url");
            n.fetch = function(e, t, n) {
                var f = e.method,
                    l = e.url,
                    p = e.data,
                    d = t.fetch,
                    h = d.timeout,
                    v = d.wait,
                    y = t.sequence;
                return r(this, void 0, void 0, function() {
                    var e, t, r, d;
                    return o(this, function(o) {
                        switch (o.label) {
                            case 0:
                                return e = c.xhr(f, l, p, h, n), window.dispatchEvent(new Event("pjax:fetch")), [4, Promise.all([e, y.fetch(void 0, {
                                    host: "",
                                    path: new s.URL(l).path,
                                    method: f,
                                    data: p
                                }), new Promise(function(e) {
                                    return void setTimeout(e, v)
                                })])];
                            case 1:
                                return t = i.apply(void 0, [o.sent(), 2]), r = t[0], d = t[1], [2, r.bind(n.either).bind(function(e) {
                                    return "" === e.response.url || new s.URL(e.response.url).origin === new s.URL(l).origin ? u.Right([e, d]) : u.Left(new a.DomainError("Request is redirected to the different domain url " + new s.URL(e.response.url).href))
                                })]
                        }
                    })
                })
            }
        }, {
            "../../../../lib/url": 126,
            "../../data/error": 88,
            "../module/fetch/xhr": 95,
            "spica/either": 8
        }
    ],
    95: [
        function(e, t, n) {
            "use strict";

            function r(e) {
                return u.Right(e).bind(function(e) {
                    return /2..|304/.test("" + e.status) ? u.Right(e) : u.Left(new a.DomainError("Faild to validate a content type of response."))
                }).bind(function(e) {
                    return o(e.getResponseHeader("Content-Type"), s) ? u.Right(e) : u.Left(new a.DomainError("Faild to validate a content type of response."))
                })
            }

            function o(e, t) {
                function n(e) {
                    return e.split(";").map(function(e) {
                        return e.trim()
                    }).filter(function(e) {
                        return e.length > 0
                    })
                }
                return i.Sequence.intersect(i.Sequence.from(n(e || "").sort()), i.Sequence.from(n(t).sort()), function(e, t) {
                    return e.localeCompare(t)
                }).take(1).extract().length > 0
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("spica/sequence"),
                u = e("spica/either"),
                c = e("../../model/eav/value/fetch"),
                a = e("../../../data/error"),
                s = "text/html";
            n.xhr = function(e, t, n, o, i) {
                var s = new XMLHttpRequest;
                return new Promise(function(f) {
                    return s.open(e, t, !0), s.responseType = "document", s.timeout = o, s.setRequestHeader("X-Pjax", "1"), s.send(n), s.addEventListener("abort", function() {
                        return void f(u.Left(new a.DomainError("Failed to request by abort.")))
                    }), s.addEventListener("error", function() {
                        return void f(u.Left(new a.DomainError("Failed to request by error.")))
                    }), s.addEventListener("timeout", function() {
                        return void f(u.Left(new a.DomainError("Failed to request by timeout.")))
                    }), s.addEventListener("load", function() {
                        return void r(s).extract(function(e) {
                            return void f(u.Left(e))
                        }, function(e) {
                            return void f(u.Right(new c.FetchResult(e)))
                        })
                    }), void i.register(function() {
                        return void s.abort()
                    })
                })
            }, n.match = o
        }, {
            "../../../data/error": 88,
            "../../model/eav/value/fetch": 92,
            "spica/either": 8,
            "spica/sequence": 68
        }
    ],
    96: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__awaiter || function(e, t, n, r) {
                    return new(n || (n = Promise))(function(o, i) {
                        function u(e) {
                            try {
                                a(r.next(e))
                            } catch (e) {
                                i(e)
                            }
                        }

                        function c(e) {
                            try {
                                a(r.
                                    throw (e))
                            } catch (e) {
                                i(e)
                            }
                        }

                        function a(e) {
                            e.done ? o(e.value) : new n(function(t) {
                                t(e.value)
                            }).then(u, c)
                        }
                        a((r = r.apply(e, t || [])).next())
                    })
                }, o = this && this.__generator || function(e, t) {
                    function n(e) {
                        return function(t) {
                            return r([e, t])
                        }
                    }

                    function r(n) {
                        if (o) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (o = 1, i && (u = i[2 & n[0] ? "return" : n[0] ? "throw" : "next"]) && !(u = u.call(i, n[1])).done) return u;
                            switch (i = 0, u && (n = [0, u.value]), n[0]) {
                                case 0:
                                case 1:
                                    u = n;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: n[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, i = n[1], n = [0];
                                    continue;
                                case 7:
                                    n = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (u = a.trys, !(u = u.length > 0 && u[u.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === n[0] && (!u || n[1] > u[0] && n[1] < u[3])) {
                                        a.label = n[1];
                                        break
                                    }
                                    if (6 === n[0] && a.label < u[1]) {
                                        a.label = u[1], u = n;
                                        break
                                    }
                                    if (u && a.label < u[2]) {
                                        a.label = u[2], a.ops.push(n);
                                        break
                                    }
                                    u[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            n = t.call(e, a)
                        } catch (e) {
                            n = [6, e], i = 0
                        } finally {
                            o = u = 0
                        }
                        if (5 & n[0]) throw n[1];
                        return {
                            value: n[0] ? n[1] : void 0,
                            done: !0
                        }
                    }
                    var o, i, u, c, a = {
                            label: 0,
                            sent: function() {
                                if (1 & u[0]) throw u[1];
                                return u[1]
                            },
                            trys: [],
                            ops: []
                        };
                    return c = {
                        next: n(0),
                        throw :n(1),
                        return :n(2)
                    }, "function" == typeof Symbol && (c[Symbol.iterator] = function() {
                        return this
                    }), c
                }, i = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var u = e("spica/either"),
                c = e("spica/hlist"),
                a = e("../../event/router"),
                s = e("../model/eav/value/update"),
                f = e("../module/update/blur"),
                l = e("../module/update/url"),
                p = e("../module/update/title"),
                d = e("../module/update/head"),
                h = e("../module/update/content"),
                v = e("../module/update/css"),
                y = e("../module/update/script"),
                m = e("../module/update/focus"),
                _ = e("../module/update/scroll"),
                b = e("../../store/path"),
                w = e("../../data/error");
            n.update = function(e, t, n, S) {
                var O = e.event,
                    q = e.config,
                    g = e.state,
                    j = t.response;
                return r(this, void 0, void 0, function() {
                    var e, t, P = this;
                    return o(this, function(x) {
                        return e = g.process, t = new s.UpdateSource({
                            src: j.document,
                            dst: S.document
                        }).documents, [2, (new c.HNil).push(e.either(n)).modify(function(n) {
                            return n.fmap(function(n) {
                                return h.separate(t, q.areas).fmap(function(e) {
                                    var n = i(e, 1)[0];
                                    return void q.rewrite(t.src, n, "")
                                }).extract(function() {
                                    return r(P, void 0, void 0, function() {
                                        return o(this, function(e) {
                                            return [2, u.Left(new w.DomainError("Failed to separate areas."))]
                                        })
                                    })
                                }, function() {
                                    return r(P, void 0, void 0, function() {
                                        var t, r;
                                        return o(this, function(o) {
                                            switch (o.label) {
                                                case 0:
                                                    return window.dispatchEvent(new Event("pjax:unload")), r = (t = e).either, [4, q.sequence.unload(n, j)];
                                                case 1:
                                                    return [2, r.apply(t, [o.sent()])]
                                            }
                                        })
                                    })
                                })
                            })
                        }).modify(function(n) {
                            return n.fmap(function(n) {
                                return r(P, void 0, void 0, function() {
                                    var s = this;
                                    return o(this, function(P) {
                                        switch (P.label) {
                                            case 0:
                                                return [4, n];
                                            case 1:
                                                return [2, P.sent().fmap(function(n) {
                                                    return (new c.HNil).extend(function() {
                                                        return r(s, void 0, void 0, function() {
                                                            return o(this, function(n) {
                                                                return [2, (f.blur(t.dst), l.url(new a.RouterEventLocation(j.url || O.location.dest.href), t.src.title, O.type, O.source, q.replace), p.title(t), b.saveTitle(), d.head({
                                                                    src: t.src.head,
                                                                    dst: t.dst.head
                                                                }, q.update.head, q.update.ignore), h.content(t, q.areas).fmap(function(e) {
                                                                    var t = i(e, 2),
                                                                        n = t[0],
                                                                        r = t[1];
                                                                    return [n, Promise.all(r)]
                                                                }).fmap(e.either).extract(function() {
                                                                    return u.Left(new w.DomainError("Failed to update areas."))
                                                                }))]
                                                            })
                                                        })
                                                    }).extend(function(a) {
                                                        return r(s, void 0, void 0, function() {
                                                            var s = this;
                                                            return o(this, function(f) {
                                                                switch (f.label) {
                                                                    case 0:
                                                                        return [4, a];
                                                                    case 1:
                                                                        return [2, f.sent().fmap(function(u) {
                                                                            var a = i(u, 1)[0];
                                                                            return Promise.all((new c.HNil).extend(function() {
                                                                                return r(s, void 0, void 0, function() {
                                                                                    var n;
                                                                                    return o(this, function(r) {
                                                                                        switch (r.label) {
                                                                                            case 0:
                                                                                                return q.update.css && v.css({
                                                                                                    src: t.src.head,
                                                                                                    dst: t.dst.head
                                                                                                }, q.update.ignore), q.update.css && v.css({
                                                                                                    src: t.src.body,
                                                                                                    dst: t.dst.body
                                                                                                }, q.update.ignore), m.focus(t.dst), _.scroll(O.type, t.dst, {
                                                                                                    hash: O.location.dest.fragment,
                                                                                                    position: S.position
                                                                                                }), b.savePosition(), q.update.script ? [4, y.script(t, g.scripts, q.update, Math.max(10 * q.fetch.timeout, 1e4), e)] : [3, 2];
                                                                                            case 1:
                                                                                                return n = r.sent(), [3, 4];
                                                                                            case 2:
                                                                                                return [4, e.either([
                                                                                                    [], Promise.resolve([])
                                                                                                ])];
                                                                                            case 3:
                                                                                                n = r.sent(), r.label = 4;
                                                                                            case 4:
                                                                                                return [2, n]
                                                                                        }
                                                                                    })
                                                                                })
                                                                            }).extend(function() {
                                                                                return r(s, void 0, void 0, function() {
                                                                                    var t, r;
                                                                                    return o(this, function(o) {
                                                                                        switch (o.label) {
                                                                                            case 0:
                                                                                                return S.document.dispatchEvent(new Event("pjax:ready")), r = (t = e).either, [4, q.sequence.ready(n, a)];
                                                                                            case 1:
                                                                                                return [2, r.apply(t, [o.sent()])]
                                                                                        }
                                                                                    })
                                                                                })
                                                                            }).reverse().tuple()).then(function(e) {
                                                                                var t = i(e, 2),
                                                                                    n = t[0],
                                                                                    r = t[1];
                                                                                return n.bind(function(e) {
                                                                                    return r.fmap(function(t) {
                                                                                        return [e, t]
                                                                                    })
                                                                                })
                                                                            })
                                                                        }).extract(u.Left)]
                                                                }
                                                            })
                                                        })
                                                    }).reverse().tuple()
                                                })]
                                        }
                                    })
                                })
                            })
                        }).modify(function(t) {
                            return t.fmap(function(t) {
                                return r(P, void 0, void 0, function() {
                                    var n = this;
                                    return o(this, function(c) {
                                        switch (c.label) {
                                            case 0:
                                                return [4, t];
                                            case 1:
                                                return [2, c.sent().fmap(function(t) {
                                                    var u = i(t, 2),
                                                        c = u[0];
                                                    return u[1].then(function(t) {
                                                        return c.then(function(u) {
                                                            return u.bind(function(u) {
                                                                var c = i(u, 2)[1];
                                                                return t.fmap(function(t) {
                                                                    var u = i(t, 2),
                                                                        a = i(u[0], 2)[1],
                                                                        s = u[1];
                                                                    return r(n, void 0, void 0, function() {
                                                                        var t;
                                                                        return o(this, function(n) {
                                                                            switch (n.label) {
                                                                                case 0:
                                                                                    return [4, a];
                                                                                case 1:
                                                                                    return n.sent(), [4, c];
                                                                                case 2:
                                                                                    return t = n.sent(), e.canceled ? [2] : (window.dispatchEvent(new Event("pjax:load")), q.sequence.load(s, t), [2])
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            }).extract(function() {})
                                                        }), t.fmap(function(e) {
                                                            var t = i(e, 1),
                                                                n = i(t[0], 2);
                                                            return [n[0], n[1]]
                                                        })
                                                    })
                                                }).extract(u.Left)]
                                        }
                                    })
                                })
                            })
                        }).head.extract(u.Left)]
                    })
                })
            }
        }, {
            "../../data/error": 88,
            "../../event/router": 89,
            "../../store/path": 107,
            "../model/eav/value/update": 93,
            "../module/update/blur": 97,
            "../module/update/content": 98,
            "../module/update/css": 99,
            "../module/update/focus": 100,
            "../module/update/head": 101,
            "../module/update/script": 102,
            "../module/update/scroll": 103,
            "../module/update/title": 105,
            "../module/update/url": 106,
            "spica/either": 8,
            "spica/hlist": 12
        }
    ],
    97: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.blur = function(e) {
                e === window.document && e.activeElement !== e.body && (e.activeElement.blur(), e.body.focus())
            }
        }, {}
    ],
    98: [
        function(e, t, n) {
            "use strict";

            function r(e, t) {
                function n(e, t) {
                    function n(t) {
                        return function(e) {
                            return function(e) {
                                return e.src.length > 0 && e.src.length === e.dst.length
                            }(e) ? c.Just(e) : c.Nothing
                        }(function(t) {
                            return {
                                src: f.find(e.src, t),
                                dst: f.find(e.dst, t)
                            }
                        }(t))
                    }
                    return o(t).reduce(function(e, t) {
                        return e.bind(function(e) {
                            return n(t).fmap(function(t) {
                                return a.concat(e, [t])
                            })
                        })
                    }, c.Just([]))
                }
                return t.reduce(function(t, r) {
                    return c.Maybe.mplus(t, n(e, r).fmap(function(e) {
                        return [r, e]
                    }))
                }, c.Nothing)
            }

            function o(e) {
                return (e.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g) || []).map(function(e) {
                    return e.trim()
                })
            }

            function i(e) {
                return Promise.race([new Promise(function(t) {
                    return void s.once(e, "load", t)
                }), new Promise(function(t) {
                    return void s.once(e, "abort", t)
                }), new Promise(function(t) {
                    return void s.once(e, "error", t)
                })])
            }
            var u = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var c = e("spica/maybe"),
                a = e("spica/concat"),
                s = e("typed-dom"),
                f = e("../../../../../lib/dom"),
                l = e("./script");
            n.content = function(e, t, n) {
                function o(t) {
                    function r(e) {
                        var t = f.find(e.src, "script").map(l.escape).reduce(function(e, t) {
                            return function() {
                                return e(), void t()
                            }
                        }, function() {});
                        n.replace(e.src, e.dst), t()
                    }
                    return t.src.map(function(n, r) {
                        return {
                            src: e.dst.importNode(t.src[r].cloneNode(!0), !0),
                            dst: t.dst[r]
                        }
                    }).map(function(e) {
                        return r(e), f.find(e.src, "img, iframe, frame").map(i)
                    }).reduce(a.concat, [])
                }
                return void 0 === n && (n = {
                    replace: function(e, t) {
                        return void t.parentNode.replaceChild(e, t)
                    }
                }), r(e, t).fmap(function(e) {
                    var t = u(e, 2)[1];
                    return [t.map(function(e) {
                        return e.dst
                    }).reduce(a.concat, []), t.map(o).reduce(a.concat, [])]
                })
            }, n.separate = r, n._split = o, n._wait = i
        }, {
            "../../../../../lib/dom": 122,
            "./script": 102,
            "spica/concat": 6,
            "spica/maybe": 13,
            "typed-dom": 74
        }
    ],
    99: [
        function(e, t, n) {
            "use strict";

            function r(e, t) {
                switch (e.tagName.toLowerCase()) {
                    case "link":
                        return e.href === t.href;
                    case "style":
                        return e.innerHTML.trim() === t.innerHTML.trim();
                    default:
                        return !1
                }
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../../../../lib/dom"),
                i = e("./sync");
            n.css = function(e, t) {
                var n = 'link[rel~="stylesheet"], style';
                return void i.sync(i.pair(o.find(e.src, n).filter(function(e) {
                    return !e.matches(t.trim() || "_")
                }), o.find(e.dst, n).filter(function(e) {
                    return !e.matches(t.trim() || "_")
                }), r), e.dst)
            }
        }, {
            "../../../../../lib/dom": 122,
            "./sync": 104
        }
    ],
    100: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = e("../../../../../lib/dom");
            n.focus = function(e) {
                return void r.find(e, "body, [autofocus]").slice(-1).filter(function(t) {
                    return e === window.document && t !== e.activeElement
                }).forEach(function(e) {
                    return void e.focus()
                })
            }
        }, {
            "../../../../../lib/dom": 122
        }
    ],
    101: [
        function(e, t, n) {
            "use strict";

            function r(e, t) {
                return e.outerHTML === t.outerHTML
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("./sync"),
                i = e("../../../../../lib/dom");
            n.head = function(e, t, n) {
                return n += t.indexOf("link") > -1 ? ', link[rel~="stylesheet"]' : "", void o.sync(o.pair(i.find(e.src, t).filter(function(e) {
                    return !e.matches(n.trim() || "_")
                }), i.find(e.dst, t).filter(function(e) {
                    return !e.matches(n.trim() || "_")
                }), r), e.dst)
            }
        }, {
            "../../../../../lib/dom": 122,
            "./sync": 104
        }
    ],
    102: [
        function(e, t, n) {
            "use strict";

            function r(e, t) {
                return u(this, void 0, void 0, function() {
                    var n;
                    return c(this, function(r) {
                        return e.hasAttribute("src") ? "module" === e.type.toLowerCase() ? [2, s.Right([e, ""])] : ((n = new XMLHttpRequest).open("GET", e.src, !0), n.timeout = t, n.send(), [2, new Promise(function(t) {
                            return ["load", "abort", "error", "timeout"].forEach(function(r) {
                                switch (r) {
                                    case "load":
                                        return void n.addEventListener(r, function() {
                                            return void t(s.Right([e, n.response]))
                                        });
                                    default:
                                        return void n.addEventListener(r, function() {
                                            return void t(s.Left(new Error(e.src + ": " + n.statusText)))
                                        })
                                }
                            })
                        })]) : [2, s.Right([e, e.text])]
                    })
                })
            }

            function o(t, n, r, o, u, c) {
                function a() {
                    if (c.canceled) return c.either(t);
                    try {
                        if (new p.URL(d.standardizeUrl(window.location.href)).path !== y.path) throw new l.FatalError("Expired.");
                        if (o.has(new p.URL(d.standardizeUrl(window.location.href)).href)) throw new l.FatalError("Expired.");
                        return (0, eval)(n), t.hasAttribute("src") && t.dispatchEvent(new Event("load")), s.Right(t)
                    } catch (e) {
                        return t.hasAttribute("src") && t.dispatchEvent(new Event("error")), s.Left(new l.FatalError(e instanceof Error ? e.message : e + ""))
                    }
                }
                var f = !! (t = t.ownerDocument === document ? t : document.importNode(t.cloneNode(!0), !0)).parentElement && t.parentElement.matches(r.trim() || "_"),
                    h = document.querySelector(f ? t.parentElement.id ? "#" + t.parentElement.id : t.parentElement.tagName : "_") || document.body,
                    v = i(t);
                h.appendChild(t), v(), !f && t.remove();
                var y = new p.URL(d.standardizeUrl(window.location.href));
                return "module" === t.type.toLowerCase() ? s.Right(u.then(function() {
                    return Promise.resolve().then(function() {
                        return e(t.src)
                    })
                }).then(function() {
                    return t.dispatchEvent(new Event("load")), s.Right(t)
                }, function(e) {
                    return t.dispatchEvent(new Event("error")), s.Left(new l.FatalError(e instanceof Error ? e.message : e + ""))
                })) : t.hasAttribute("defer") ? s.Right(u.then(a)) : t.hasAttribute("async") ? s.Right(Promise.resolve().then(a)) : s.Left(a())
            }

            function i(e) {
                var t = e.hasAttribute("src") ? e.getAttribute("src") : null,
                    n = e.text;
                return e.removeAttribute("src"), e.text = "",
                function() {
                    return e.text = " ", e.text = n, "string" == typeof t ? void e.setAttribute("src", t) : void 0
                }
            }
            var u = this && this.__awaiter || function(e, t, n, r) {
                    return new(n || (n = Promise))(function(o, i) {
                        function u(e) {
                            try {
                                a(r.next(e))
                            } catch (e) {
                                i(e)
                            }
                        }

                        function c(e) {
                            try {
                                a(r.
                                    throw (e))
                            } catch (e) {
                                i(e)
                            }
                        }

                        function a(e) {
                            e.done ? o(e.value) : new n(function(t) {
                                t(e.value)
                            }).then(u, c)
                        }
                        a((r = r.apply(e, t || [])).next())
                    })
                }, c = this && this.__generator || function(e, t) {
                    function n(e) {
                        return function(t) {
                            return r([e, t])
                        }
                    }

                    function r(n) {
                        if (o) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (o = 1, i && (u = i[2 & n[0] ? "return" : n[0] ? "throw" : "next"]) && !(u = u.call(i, n[1])).done) return u;
                            switch (i = 0, u && (n = [0, u.value]), n[0]) {
                                case 0:
                                case 1:
                                    u = n;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: n[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, i = n[1], n = [0];
                                    continue;
                                case 7:
                                    n = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (u = a.trys, !(u = u.length > 0 && u[u.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === n[0] && (!u || n[1] > u[0] && n[1] < u[3])) {
                                        a.label = n[1];
                                        break
                                    }
                                    if (6 === n[0] && a.label < u[1]) {
                                        a.label = u[1], u = n;
                                        break
                                    }
                                    if (u && a.label < u[2]) {
                                        a.label = u[2], a.ops.push(n);
                                        break
                                    }
                                    u[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            n = t.call(e, a)
                        } catch (e) {
                            n = [6, e], i = 0
                        } finally {
                            o = u = 0
                        }
                        if (5 & n[0]) throw n[1];
                        return {
                            value: n[0] ? n[1] : void 0,
                            done: !0
                        }
                    }
                    var o, i, u, c, a = {
                            label: 0,
                            sent: function() {
                                if (1 & u[0]) throw u[1];
                                return u[1]
                            },
                            trys: [],
                            ops: []
                        };
                    return c = {
                        next: n(0),
                        throw :n(1),
                        return :n(2)
                    }, "function" == typeof Symbol && (c[Symbol.iterator] = function() {
                        return this
                    }), c
                }, a = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var s = e("spica/either"),
                f = e("../../../../../lib/dom"),
                l = e("../../../../../lib/error"),
                p = e("../../../../../lib/url"),
                d = e("../../../../data/model/domain/url");
            n.script = function(e, t, n, i, l, h) {
                return void 0 === h && (h = {
                    fetch: r,
                    evaluate: o
                }), u(this, void 0, void 0, function() {
                    function r(e) {
                        return e.map(function(e) {
                            return h.fetch(e, i)
                        })
                    }

                    function o(e) {
                        return e.reduce(function(e, t) {
                            return t.bind(function() {
                                return e
                            })
                        }, e.reduce(function(e, r) {
                            return e.bind(l.either).bind(function(e) {
                                var o = a(e, 2),
                                    i = o[0],
                                    u = o[1];
                                return r.fmap(function(e) {
                                    var r = a(e, 2),
                                        o = r[0],
                                        i = r[1];
                                    return h.evaluate(o, i, n.logger, t, Promise.all(u), l)
                                }).bind(function(e) {
                                    return e.extract(function(e) {
                                        return e.fmap(function(e) {
                                            return [i.concat([e]), u]
                                        })
                                    }, function(e) {
                                        return s.Right([i, u.concat([e])])
                                    })
                                })
                            })
                        }, s.Right([
                            [],
                            []
                        ]))).fmap(function(e) {
                            var t = a(e, 2),
                                n = t[0],
                                r = t[1];
                            return [n, Promise.all(r).then(function(e) {
                                return e.reduce(function(e, t) {
                                    return e.bind(function(e) {
                                        return t.fmap(function(t) {
                                            return e.concat([t])
                                        })
                                    })
                                }, s.Right([])).extract()
                            })]
                        })
                    }
                    var u, v;
                    return c(this, function(i) {
                        switch (i.label) {
                            case 0:
                                return u = f.find(e.src, "script").filter(function(e) {
                                    return !e.type || /(?:application|text)\/(?:java|ecma)script|module/i.test(e.type)
                                }).filter(function(e) {
                                    return !e.matches(n.ignore.trim() || "_")
                                }).filter(function(e) {
                                    return !e.hasAttribute("src") || !t.has(new p.URL(d.standardizeUrl(e.src)).href) || e.matches(n.reload.trim() || "_")
                                }), v = o, [4, Promise.all(r(u))];
                            case 1:
                                return [2, v.apply(void 0, [i.sent()])]
                        }
                    })
                })
            }, n._fetch = r, n._evaluate = o, n.escape = i
        }, {
            "../../../../../lib/dom": 122,
            "../../../../../lib/error": 123,
            "../../../../../lib/url": 126,
            "../../../../data/model/domain/url": 85,
            "spica/either": 8
        }
    ],
    103: [
        function(e, t, n) {
            "use strict";

            function r(e, t, n) {
                void 0 === n && (n = {
                    scroll: window.scrollTo
                });
                var r = t.slice(1);
                if (0 === r.length) return !1;
                var o = e.getElementById(r) || e.getElementsByName(r)[0];
                return !!o && (n.scroll.call(window, window.pageXOffset, window.pageYOffset + o.getBoundingClientRect().top | 0), !0)
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("../../../event/router");
            n.scroll = function(e, t, n, i) {
                function u(e) {
                    var t = e.top,
                        n = e.left;
                    i.scroll.call(window, n, t)
                }
                switch (void 0 === i && (i = {
                    scroll: window.scrollTo,
                    hash: r
                }), e) {
                    case o.RouterEventType.click:
                        if (i.hash(t, n.hash, i)) return;
                        return void u({
                            top: 0,
                            left: 0
                        });
                    case o.RouterEventType.submit:
                        return void u({
                            top: 0,
                            left: 0
                        });
                    case o.RouterEventType.popstate:
                        return void u(n.position());
                    default:
                        throw new TypeError(e)
                }
            }, n._hash = r
        }, {
            "../../../event/router": 89
        }
    ],
    104: [
        function(e, t, n) {
            "use strict";

            function r(e, t, n) {
                return void t.map(function(t) {
                    return e.ownerDocument.importNode(t.cloneNode(!0), !0)
                }).forEach(function(t) {
                    return void e.insertBefore(t, n)
                })
            }

            function o(e) {
                return void e.remove()
            }
            var i = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                }, u = this && this.__spread || function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(i(arguments[t]));
                    return e
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var c = e("spica/either"),
                a = e("spica/concat");
            n.sync = function(e, t, n) {
                function u(e) {
                    return e ? e.parentElement : t
                }
                return void 0 === n && (n = {
                    before: r,
                    remove: o
                }), void e.forEach(function(e) {
                    var t = i(e, 2),
                        r = t[0],
                        o = t[1];
                    return n.before(u(o), r.slice(-1).some(function(e) {
                        return !!o && e.outerHTML === o.outerHTML
                    }) ? r.slice(0, -1) : r, o), o && 0 === r.length ? void n.remove(o) : void 0
                })
            }, n.pair = function(e, t, n) {
                var r = function(e, t, n) {
                    return e.reduce(function(e, r) {
                        return 0 === t.length ? e.set(null, a.concat(e.get(null) || [], [r])) : t.reduce(function(e, t) {
                            return e.bind(function(e) {
                                return !e.has(t) && n(r, t) ? (e.set(t, a.concat(e.get(null) || [], [r])), e.delete(null), c.Left(e)) : c.Right(e)
                            })
                        }, c.Right(e)).fmap(function(e) {
                            return e.set(null, a.concat(e.get(null) || [], [r]))
                        }).extract(function(e) {
                            return e
                        })
                    }, new Map)
                }(e, t, n);
                return t.filter(function(e) {
                    return !r.has(e)
                }).forEach(function(e) {
                    return void r.set(e, [])
                }), u(r).map(function(e) {
                    var t = i(e, 2),
                        n = t[0];
                    return [t[1], n]
                })
            }
        }, {
            "spica/concat": 6,
            "spica/either": 8
        }
    ],
    105: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.title = function(e) {
                e.dst.title = e.src.title
            }
        }, {}
    ],
    106: [
        function(e, t, n) {
            "use strict";

            function r(e, t) {
                if (t.dest.href === t.orig.href) return !1;
                switch (e) {
                    case i.RouterEventType.click:
                    case i.RouterEventType.submit:
                        return !0;
                    case i.RouterEventType.popstate:
                        return !1;
                    default:
                        throw new TypeError(e)
                }
            }

            function o(e, t, n) {
                switch (e) {
                    case i.RouterEventType.click:
                    case i.RouterEventType.submit:
                        return t.matches(n.trim() || "_");
                    case i.RouterEventType.popstate:
                        return !1;
                    default:
                        throw new TypeError(e)
                }
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = e("../../../event/router");
            e("typed-dom").bind(document, "pjax:ready", function() {
                return void window.history.replaceState(window.history.state, window.document.title)
            }), n.url = function(e, t, n, i, u) {
                switch (!0) {
                    case o(n, i, u):
                        return void window.history.replaceState({}, t, e.dest.href);
                    case r(n, e):
                        return void window.history.pushState({}, t, e.dest.href);
                    default:
                        return void window.history.replaceState(window.history.state, window.document.title)
                }
            }, n._isRegisterable = r, n._isReplaceable = o
        }, {
            "../../../event/router": 89,
            "typed-dom": 74
        }
    ],
    107: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            }),
            function(e) {
                for (var t in e) n.hasOwnProperty(t) || (n[t] = e[t])
            }(e("../../data/store/state"))
        }, {
            "../../data/store/state": 86
        }
    ],
    108: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = function(e) {
                function t(t) {
                    return e.call(this, "Interface: " + t) || this
                }
                return r(t, e), t
            }(e("../../../lib/error").PjaxError);
            n.InterfaceError = o
        }, {
            "../../../lib/error": 123
        }
    ],
    109: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("spica/supervisor"),
                i = e("typed-dom"),
                u = function() {
                    return function(e, t, n) {
                        var u = this;
                        this.sv = new(function(e) {
                            function t() {
                                return null !== e && e.apply(this, arguments) || this
                            }
                            return r(t, e), t
                        }(o.Supervisor)), this.close = function() {
                            return void u.sv.terminate()
                        }, this.sv.register("", function() {
                            return u.sv.events.exit.monitor([], i.delegate(e, t, "click", function(e) {
                                e.currentTarget instanceof HTMLAnchorElement && "string" == typeof e.currentTarget.href && n(e)
                            })), new Promise(function() {})
                        }, void 0), this.sv.cast("", void 0)
                    }
                }();
            n.ClickView = u
        }, {
            "spica/supervisor": 70,
            "typed-dom": 74
        }
    ],
    110: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("spica/supervisor"),
                i = e("typed-dom"),
                u = e("../../../data/model/domain/url"),
                c = e("../../service/state/url"),
                a = function() {
                    return function(e, t) {
                        var n = this;
                        this.sv = new(function(e) {
                            function t() {
                                return null !== e && e.apply(this, arguments) || this
                            }
                            return r(t, e), t
                        }(o.Supervisor)), this.close = function() {
                            return void n.sv.terminate()
                        }, this.sv.register("", function() {
                            return n.sv.events.exit.monitor([], i.bind(e, "popstate", function(n) {
                                u.standardizeUrl(e.location.href) !== c.docurl.href && t(n)
                            })), new Promise(function() {})
                        }, void 0), this.sv.cast("", void 0)
                    }
                }();
            n.NavigationView = a
        }, {
            "../../../data/model/domain/url": 85,
            "../../service/state/url": 121,
            "spica/supervisor": 70,
            "typed-dom": 74
        }
    ],
    111: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("spica/supervisor"),
                i = e("typed-dom"),
                u = function() {
                    return function(e, t) {
                        var n = this;
                        this.sv = new(function(e) {
                            function t() {
                                return null !== e && e.apply(this, arguments) || this
                            }
                            return r(t, e), t
                        }(o.Supervisor)), this.close = function() {
                            return void n.sv.terminate()
                        };
                        var u = 0;
                        this.sv.register("", function() {
                            return n.sv.events.exit.monitor([], i.bind(e, "scroll", function(e) {
                                return u = u > 0 ? u : setTimeout(function() {
                                    u = 0, t(e)
                                }, 300)
                            }, {
                                passive: !0
                            })), new Promise(function() {})
                        }, void 0), this.sv.cast("", void 0)
                    }
                }();
            n.ScrollView = u
        }, {
            "spica/supervisor": 70,
            "typed-dom": 74
        }
    ],
    112: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("spica/supervisor"),
                i = e("typed-dom"),
                u = function() {
                    return function(e, t, n) {
                        var u = this;
                        this.sv = new(function(e) {
                            function t() {
                                return null !== e && e.apply(this, arguments) || this
                            }
                            return r(t, e), t
                        }(o.Supervisor)), this.close = function() {
                            return void u.sv.terminate()
                        }, this.sv.register("", function() {
                            return u.sv.events.exit.monitor([], i.delegate(e, t, "submit", function(e) {
                                e.currentTarget instanceof HTMLFormElement && n(e)
                            })), new Promise(function() {})
                        }, void 0), this.sv.cast("", void 0)
                    }
                }();
            n.SubmitView = u
        }, {
            "spica/supervisor": 70,
            "typed-dom": 74
        }
    ],
    113: [
        function(e, t, n) {
            "use strict";

            function r(e, t) {
                var n = document.createElement("a");
                n.href = e, s.parse("").extract().body.appendChild(n), i.once(n, "click", t), n.click()
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("spica/assign"),
                i = e("typed-dom"),
                u = e("../../application/api"),
                c = e("./state/process"),
                a = e("./router"),
                s = e("../../../lib/html"),
                f = function() {
                    function e() {}
                    return e.assign = function(e, t, n) {
                        return void 0 === n && (n = {
                            document: window.document
                        }), void r(e, function(e) {
                            return void a.route(new u.Config(t), e, c.process, n)
                        })
                    }, e.replace = function(e, t, n) {
                        return void 0 === n && (n = {
                            document: window.document
                        }), void r(e, function(e) {
                            return void a.route(new u.Config(o.extend({}, t, {
                                replace: "*"
                            })), e, c.process, n)
                        })
                    }, e
                }();
            n.API = f
        }, {
            "../../../lib/html": 124,
            "../../application/api": 81,
            "./router": 116,
            "./state/process": 118,
            "spica/assign": 3,
            "typed-dom": 74
        }
    ],
    114: [
        function(e, t, n) {
            "use strict";

            function r(e) {
                return e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
            }

            function o(e) {
                return new d.URL(b.docurl.href).origin === e.origin
            }

            function i(e) {
                var t = new d.URL(b.docurl.href);
                return t.origin === e.origin && t.path === e.path && "" !== e.fragment
            }

            function u(e) {
                var t = new d.URL(b.docurl.href);
                return t.origin === e.origin && t.path === e.path && t.fragment !== e.fragment
            }
            var c = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var a = e("./api"),
                s = e("spica/supervisor"),
                f = e("spica/cancellation"),
                l = e("spica/maybe"),
                p = e("../../application/api"),
                d = e("../../../lib/url"),
                h = e("../../data/model/domain/url"),
                v = e("../module/view/click"),
                y = e("../module/view/submit"),
                m = e("../module/view/navigation"),
                _ = e("../module/view/scroll"),
                b = e("./state/url");
            e("./state/scroll-restoration");
            var w = e("./state/process"),
                S = e("./router"),
                O = e("../../application/api"),
                q = new(function(e) {
                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return c(t, e), t
                }(s.Supervisor)),
                g = function(e) {
                    function t(t, n) {
                        void 0 === n && (n = {
                            document: window.document
                        });
                        var c = e.call(this) || this;
                        c.option = t, c.io = n;
                        var a = new p.Config(c.option);
                        return q.kill(""), q.register("", {
                            init: function(e) {
                                return e
                            },
                            call: function(e, t) {
                                return t.register(new v.ClickView(c.io.document, a.link, function(e) {
                                    return void l.Just(new d.URL(h.standardizeUrl(e.currentTarget.href))).bind(function(t) {
                                        return !o(t) || i(t) || u(t) || r(e) || !a.filter(e.currentTarget) ? l.Nothing : l.Just(0)
                                    }).fmap(function() {
                                        return S.route(a, e, w.process, c.io)
                                    }).extract(b.docurl.sync)
                                }).close), t.register(new y.SubmitView(c.io.document, a.form, function(e) {
                                    return void l.Just(new d.URL(h.standardizeUrl(e.currentTarget.action))).bind(function(e) {
                                        return o(e) ? l.Just(0) : l.Nothing
                                    }).fmap(function() {
                                        return S.route(a, e, w.process, c.io)
                                    }).extract(b.docurl.sync)
                                }).close), t.register(new m.NavigationView(window, function(e) {
                                    return void l.Just(new d.URL(h.standardizeUrl(window.location.href))).bind(function(e) {
                                        return o(e) && !u(e) ? l.Just(0) : l.Nothing
                                    }).fmap(function() {
                                        return S.route(a, e, w.process, c.io)
                                    }).extract(b.docurl.sync)
                                }).close), t.register(new _.ScrollView(window, function() {
                                    return void l.Just(new d.URL(h.standardizeUrl(window.location.href))).fmap(function(e) {
                                        return e.href === b.docurl.href ? void O.savePosition() : void 0
                                    }).extract()
                                }).close), new Promise(function() {})
                            },
                            exit: function(e, t) {
                                return void t.cancel()
                            }
                        }, new f.Cancellation), q.cast("", void 0), c
                    }
                    return c(t, e), t.prototype.assign = function(e) {
                        return void a.API.assign(e, this.option, this.io)
                    }, t.prototype.replace = function(e) {
                        return void a.API.replace(e, this.option, this.io)
                    }, t
                }(a.API);
            n.GUI = g
        }, {
            "../../../lib/url": 126,
            "../../application/api": 81,
            "../../data/model/domain/url": 85,
            "../module/view/click": 109,
            "../module/view/navigation": 110,
            "../module/view/scroll": 111,
            "../module/view/submit": 112,
            "./api": 113,
            "./router": 116,
            "./state/process": 118,
            "./state/scroll-restoration": 120,
            "./state/url": 121,
            "spica/cancellation": 4,
            "spica/maybe": 13,
            "spica/supervisor": 70
        }
    ],
    115: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = document.createElement("div");
            window.addEventListener("pjax:fetch", function() {
                return void document.documentElement.appendChild(r)
            }), window.addEventListener("pjax:fetch", function() {
                return r.style.width = "5%"
            }), window.addEventListener("pjax:unload", function() {
                return r.style.width = "80%"
            }), document.addEventListener("pjax:ready", function() {
                return r.style.width = "90%"
            }), window.addEventListener("pjax:load", function() {
                return r.style.width = "100%"
            }), window.addEventListener("pjax:load", function() {
                return void r.remove()
            }), n.progressbar = function(e) {
                r.setAttribute("style", e)
            }
        }, {}
    ],
    116: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__awaiter || function(e, t, n, r) {
                    return new(n || (n = Promise))(function(o, i) {
                        function u(e) {
                            try {
                                a(r.next(e))
                            } catch (e) {
                                i(e)
                            }
                        }

                        function c(e) {
                            try {
                                a(r.
                                    throw (e))
                            } catch (e) {
                                i(e)
                            }
                        }

                        function a(e) {
                            e.done ? o(e.value) : new n(function(t) {
                                t(e.value)
                            }).then(u, c)
                        }
                        a((r = r.apply(e, t || [])).next())
                    })
                }, o = this && this.__generator || function(e, t) {
                    function n(e) {
                        return function(t) {
                            return r([e, t])
                        }
                    }

                    function r(n) {
                        if (o) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (o = 1, i && (u = i[2 & n[0] ? "return" : n[0] ? "throw" : "next"]) && !(u = u.call(i, n[1])).done) return u;
                            switch (i = 0, u && (n = [0, u.value]), n[0]) {
                                case 0:
                                case 1:
                                    u = n;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: n[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, i = n[1], n = [0];
                                    continue;
                                case 7:
                                    n = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (u = a.trys, !(u = u.length > 0 && u[u.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === n[0] && (!u || n[1] > u[0] && n[1] < u[3])) {
                                        a.label = n[1];
                                        break
                                    }
                                    if (6 === n[0] && a.label < u[1]) {
                                        a.label = u[1], u = n;
                                        break
                                    }
                                    if (u && a.label < u[2]) {
                                        a.label = u[2], a.ops.push(n);
                                        break
                                    }
                                    u[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            n = t.call(e, a)
                        } catch (e) {
                            n = [6, e], i = 0
                        } finally {
                            o = u = 0
                        }
                        if (5 & n[0]) throw n[1];
                        return {
                            value: n[0] ? n[1] : void 0,
                            done: !0
                        }
                    }
                    var o, i, u, c, a = {
                            label: 0,
                            sent: function() {
                                if (1 & u[0]) throw u[1];
                                return u[1]
                            },
                            trys: [],
                            ops: []
                        };
                    return c = {
                        next: n(0),
                        throw :n(1),
                        return :n(2)
                    }, "function" == typeof Symbol && (c[Symbol.iterator] = function() {
                        return this
                    }), c
                }, i = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var u = e("spica/cancellation"),
                c = e("typed-dom"),
                a = e("../../application/api"),
                s = e("./state/url"),
                f = e("../service/state/env"),
                l = e("./progressbar"),
                p = e("../data/error"),
                d = e("../../application/api"),
                h = e("../../data/model/domain/url"),
                v = e("../../../lib/url");
            c.bind(window, "pjax:unload", function() {
                return window.history.scrollRestoration = "auto"
            }, !0), n.route = function(e, t, n, y) {
                return r(this, void 0, void 0, function() {
                    var m, _, b, w, S = this;
                    return o(this, function(O) {
                        switch (O.label) {
                            case 0:
                                return t.preventDefault(), n.cast("", new p.InterfaceError("Abort.")), m = new u.Cancellation, _ = n.register("", function(e) {
                                    throw y.document.title = d.loadTitle(), void m.cancel(e)
                                }, void 0), [4, f.env];
                            case 1:
                                return b = i.apply(void 0, [O.sent(), 1]), w = b[0], window.history.scrollRestoration = "manual", l.progressbar(e.progressbar), [2, a.route(e, t, {
                                        process: m,
                                        scripts: w
                                    }, y).then(function(e) {
                                        return e.fmap(function(e) {
                                            var t = i(e, 2),
                                                n = t[0],
                                                u = t[1];
                                            return r(S, void 0, void 0, function() {
                                                return o(this, function(e) {
                                                    switch (e.label) {
                                                        case 0:
                                                            return _(), s.docurl.sync(), n.filter(function(e) {
                                                                return e.hasAttribute("src")
                                                            }).forEach(function(e) {
                                                                return void w.add(new v.URL(h.standardizeUrl(e.src)).href)
                                                            }), [4, u];
                                                        case 1:
                                                            return [2, void e.sent().filter(function(e) {
                                                                return e.hasAttribute("src")
                                                            }).forEach(function(e) {
                                                                return void w.add(new v.URL(h.standardizeUrl(e.src)).href)
                                                            })]
                                                    }
                                                })
                                            })
                                        }).extract()
                                    }).
                                    catch (function(n) {
                                        return _(), window.history.scrollRestoration = "auto", s.docurl.sync(), !m.canceled || n instanceof Error && "FatalError" === n.name ? void e.fallback(c.currentTargets.get(t), n instanceof Error ? n : new Error(n)) : void 0
                                    })
                                ]
                        }
                    })
                })
            }
        }, {
            "../../../lib/url": 126,
            "../../application/api": 81,
            "../../data/model/domain/url": 85,
            "../data/error": 108,
            "../service/state/env": 117,
            "./progressbar": 115,
            "./state/url": 121,
            "spica/cancellation": 4,
            "typed-dom": 74
        }
    ],
    117: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = e("./script");
            n.env = Promise.all([r.scripts, new Promise(setTimeout)])
        }, {
            "./script": 119
        }
    ],
    118: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("spica/supervisor");
            n.process = new(function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return r(t, e), t
            }(o.Supervisor))
        }, {
            "spica/supervisor": 70
        }
    ],
    119: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = e("../../../data/model/domain/url"),
                o = e("../../../../lib/url"),
                i = e("../../../../lib/dom"),
                u = e("typed-dom");
            n.scripts = new Set, u.bind(window, "pjax:unload", function() {
                return void i.find(document, "script").filter(function(e) {
                    return e.hasAttribute("src")
                }).forEach(function(e) {
                    return void n.scripts.add(new o.URL(r.standardizeUrl(e.src)).href)
                })
            })
        }, {
            "../../../../lib/dom": 122,
            "../../../../lib/url": 126,
            "../../../data/model/domain/url": 85,
            "typed-dom": 74
        }
    ],
    120: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), e("typed-dom").bind(window, "unload", function() {
                return window.history.scrollRestoration = "auto"
            }, !1)
        }, {
            "typed-dom": 74
        }
    ],
    121: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = e("../../../data/model/domain/url"),
                o = e("typed-dom"),
                i = r.standardizeUrl(location.href);
            o.bind(window, "hashchange", function() {
                return void n.docurl.sync()
            }), n.docurl = new(function() {
                function e() {
                    this.sync = function() {
                        i = r.standardizeUrl(location.href)
                    }
                }
                return Object.defineProperty(e.prototype, "href", {
                    get: function() {
                        return i
                    },
                    enumerable: !0,
                    configurable: !0
                }), e
            }())
        }, {
            "../../../data/model/domain/url": 85,
            "typed-dom": 74
        }
    ],
    122: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                }, o = this && this.__spread || function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(r(arguments[t]));
                    return e
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.find = function(e, t) {
                return o(e.querySelectorAll(t || "_"))
            }, n.serialize = function(e) {
                function t(e) {
                    return e.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]?|[\uDC00-\uDFFF]/g, function(e) {
                        return 2 === e.length ? e : ""
                    })
                }
                return Array.from(e.elements).filter(function(e) {
                    if (e.disabled) return !1;
                    switch (e.nodeName.toLowerCase()) {
                        case "input":
                            switch (e.type.toLowerCase()) {
                                case "checkbox":
                                case "radio":
                                    return e.checked;
                                case "submit":
                                case "button":
                                case "image":
                                case "reset":
                                case "file":
                                    return !1;
                                default:
                                    return !0
                            }
                        case "select":
                        case "textarea":
                            return !0;
                        default:
                            return !1
                    }
                }).filter(function(e) {
                    return "string" == typeof e.name && "string" == typeof e.value
                }).map(function(e) {
                    return [encodeURIComponent(t(e.name)), encodeURIComponent(t(e.value))].join("=")
                }).join("&")
            }
        }, {}
    ],
    123: [
        function(e, t, n) {
            "use strict";
            var r = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    };
                    return function(t, n) {
                        function r() {
                            this.constructor = t
                        }
                        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                    }
                }();
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = function(e) {
                function t(t) {
                    return e.call(this, "Pjax: " + t) || this
                }
                return r(t, e), t
            }(Error);
            n.PjaxError = o;
            var i = function(e) {
                function t(t) {
                    var n = e.call(this, "Pjax: Fatal: " + t) || this;
                    return n.name = "FatalError", n
                }
                return r(t, e), t
            }(o);
            n.FatalError = i
        }, {}
    ],
    124: [
        function(e, t, n) {
            "use strict";

            function r(e) {
                return void o(e).forEach(function(e) {
                    var t = u(e, 2),
                        n = t[0],
                        r = t[1];
                    return n.textContent = r.textContent
                })
            }

            function o(e) {
                return s.find(e, "noscript").filter(function(e) {
                    return e.children.length > 0
                }).map(function(e) {
                    var t = e.cloneNode(!0);
                    return t.textContent = e.innerHTML, [e, t]
                })
            }

            function i(e) {
                try {
                    var t = e('\n<html lang="en" class="html">\n  <head>\n    <link href="/">\n    <title>&amp;</title>\n    <noscript><style>/**/</style></noscript>\n  </head>\n  <body>\n    <noscript>noscript</noscript>\n    <a href="/"></a>\n    <script>document.head.remove();<\/script>\n    <img src="abc">\n  </body>\n</html>\n');
                    switch (!1) {
                        case t.URL && t.URL.startsWith(window.location.protocol + "//" + window.location.host):
                        case "&" === t.title:
                        case !!t.querySelector('html.html[lang="en"]'):
                        case !!t.querySelector("head > link").href:
                        case !!t.querySelector("body > a").href:
                        case !t.querySelector("head > noscript > *"):
                        case "document.head.remove();" === t.querySelector("script").innerHTML:
                        case t.querySelector("img").src.endsWith("abc"):
                        case "<style>/**/</style>" === t.querySelector("head > noscript").textContent:
                        case "noscript" === t.querySelector("body > noscript").textContent:
                            throw void 0
                    }
                    return !0
                } catch (e) {
                    return !1
                }
            }
            var u = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var c = e("spica/maybe"),
                a = e("spica/either"),
                s = e("./dom");
            n.parse = [
                function(e) {
                    var t = window.document.implementation.createHTMLDocument(""),
                        n = s.find(function(e) {
                            var n = t.createElement("div");
                            return n.innerHTML = e, n.firstElementChild ? n.firstElementChild : n
                        }(e.slice(0, e.search(/<\/title>/i) + 8)), "title").reduce(function(e, t) {
                            return t.textContent || e
                        }, "");
                    return "function" == typeof DOMParser && (t.title = n), t.open(), t.write(e), t.close(), t.title !== n && (t.title = t.querySelector("title").textContent || ""), r(t), t
                },
                function(e) {
                    var t = (new DOMParser).parseFromString(e, "text/html");
                    return r(t), t
                }
            ].reduce(function(e, t) {
                return e.bind(function() {
                    return i(t) ? a.Left(t) : e
                })
            }, a.Right(function() {
                return c.Nothing
            })).extract(function(e) {
                return function(t) {
                    return c.Just(e(t))
                }
            }), n._fixNoscript = o
        }, {
            "./dom": 122,
            "spica/either": 8,
            "spica/maybe": 13
        }
    ],
    125: [
        function(e, t, n) {
            "use strict";

            function r(e, t) {
                var n = /\/|[^/]+\/?/g,
                    r = /\/$/;
                return f.Sequence.zip(f.Sequence.from(o(e)), f.Sequence.cycle([t])).map(function(e) {
                    var t = u(e, 2),
                        o = t[0],
                        i = t[1];
                    return [o.match(n) || [], o.match(r) ? i.match(n) || [] : i.replace(r, "").match(n) || []]
                }).filter(function(e) {
                    var t = u(e, 2),
                        n = t[0],
                        r = t[1];
                    return n.length <= r.length
                }).filter(function(e) {
                    var t = u(e, 2),
                        n = t[0],
                        r = t[1];
                    return 0 === f.Sequence.zip(f.Sequence.from(n), f.Sequence.from(r)).dropWhile(function(e) {
                        var t = u(e, 2);
                        return i(t[0], t[1])
                    }).take(1).extract().length
                }).take(1).extract().length > 0
            }

            function o(e) {
                if (e.match(/\*\*|[\[\]]/)) throw new Error("Invalid pattern: " + e);
                return e.match(/{[^{}]*}/) ? c(new Set(f.Sequence.from(e.match(/{[^{}]*}|.[^{]*/g)).map(function(e) {
                    return e.match(/^{[^{}]*}$/) ? e.slice(1, -1).split(",") : [e]
                }).mapM(f.Sequence.from).bind(function(e) {
                    return f.Sequence.from(o(e.join("")))
                }).extract())) : [e]
            }

            function i(e, t) {
                function n(e, t) {
                    var r = u(c(e)),
                        o = r[0],
                        i = void 0 === o ? "" : o,
                        a = r.slice(1),
                        s = u(c(t)),
                        l = s[0],
                        p = void 0 === l ? "" : l,
                        d = s.slice(1);
                    switch (i) {
                        case "":
                            return "" === p;
                        case "?":
                            return "" !== p && "/" !== p && n(a.join(""), d.join(""));
                        case "*":
                            return "/" === p ? n(a.join(""), t) : f.Sequence.zip(f.Sequence.cycle([a.join("")]), f.Sequence.from(t).tails().map(function(e) {
                                return e.join("")
                            })).filter(function(e) {
                                var t = u(e, 2);
                                return n(t[0], t[1])
                            }).take(1).extract().length > 0;
                        default:
                            return p === i && n(a.join(""), d.join(""))
                    }
                }

                function r(e) {
                    var t = e.replace(/\*(\?+)\*?/g, "$1*");
                    return t === e ? t : r(t)
                }
                return ("." !== t[0] || !c("?*").includes(e[0])) && n(r(e), t)
            }
            var u = this && this.__read || function(e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r, o, i = n.call(e),
                        u = [];
                    try {
                        for (;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;) u.push(r.value)
                    } catch (e) {
                        o = {
                            error: e
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.
                                return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return u
                }, c = this && this.__spread || function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(u(arguments[t]));
                    return e
                };
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var a = e("../layer/data/model/domain/url"),
                s = e("./url"),
                f = e("spica/sequence"),
                l = e("spica/flip");
            n.router = function(e) {
                return function(t) {
                    var n = new s.URL(a.standardizeUrl(t)),
                        o = n.path,
                        i = n.pathname;
                    return f.Sequence.from(Object.keys(e).sort().reverse()).filter(l.flip(r)(i)).map(function(t) {
                        return e[t]
                    }).take(1).extract().pop().call(e, o)
                }
            }, n.compare = r, n.expand = o, n.match = i
        }, {
            "../layer/data/model/domain/url": 85,
            "./url": 126,
            "spica/flip": 11,
            "spica/sequence": 68
        }
    ],
    126: [
        function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = function() {
                function e(e) {
                    this.parser = document.createElement("a"), this.URL, this.parser.href = e || location.href, Object.freeze(this)
                }
                return Object.defineProperty(e.prototype, "href", {
                    get: function() {
                        return this.parser.href
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "origin", {
                    get: function() {
                        return this.protocol + "//" + this.host
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "domain", {
                    get: function() {
                        return this.protocol + "//" + this.hostname
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "scheme", {
                    get: function() {
                        return this.parser.protocol.slice(0, -1)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "protocol", {
                    get: function() {
                        return this.parser.protocol
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "userinfo", {
                    get: function() {
                        return this.parser.href.match(/[^:/?#]+:\/\/([^/?#]*)@|$/).pop() || ""
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "host", {
                    get: function() {
                        return this.parser.host
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "hostname", {
                    get: function() {
                        return this.parser.hostname
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "port", {
                    get: function() {
                        return this.parser.port
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "path", {
                    get: function() {
                        return "" + this.pathname + this.query
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "pathname", {
                    get: function() {
                        return this.parser.pathname
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "query", {
                    get: function() {
                        return this.parser.search
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "fragment", {
                    get: function() {
                        return this.parser.hash
                    },
                    enumerable: !0,
                    configurable: !0
                }), e
            }();
            n.URL = r
        }, {}
    ],
    "pjax-api": [
        function(e, t, n) {
            arguments[4][74][0].apply(n, arguments)
        }, {
            "./src/export": 80,
            dup: 74
        }
    ]
}, {}, [1, 2, "pjax-api"]);

window.Pjax = require('pjax-api').
default;
