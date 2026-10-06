'use strict';

function e(e, t) {
    for (var o = 0; o < t.length; o++) {
        var n = t[o];
        n.enumerable = n.enumerable || !1;
        n.configurable = !0;
        "value" in n && (n.writable = !0);
        Object.defineProperty(e, n.key, n);
    }
}

function t(e) {
    return function(e) {
        if (Array.isArray(e)) return o(e);
    }(e) || function(e) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
    }(e) || function(e, t) {
        if (!e) return;
        if ("string" == typeof e) return o(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        "Object" === n && e.constructor && (n = e.constructor.name);
        if ("Map" === n || "Set" === n) return Array.from(e);
        if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return o(e, t);
    }(e) || function() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
}

function o(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var o = 0, n = new Array(t); o < t; o++) n[o] = e[o];
    return n;
}

var n = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'];

class MicroModal {
    constructor(e) {
        var n = e.targetModal,
            i = e.triggers,
            a = void 0 === i ? [] : i,
            r = e.onShow,
            s = void 0 === r ? function() {} : r,
            l = e.onClose,
            c = void 0 === l ? function() {} : l,
            d = e.openTrigger,
            u = void 0 === d ? "data-micromodal-trigger" : d,
            f = e.closeTrigger,
            h = void 0 === f ? "data-micromodal-close" : f,
            v = e.openClass,
            g = void 0 === v ? "is-open" : v,
            m = e.disableScroll,
            b = void 0 !== m && m,
            y = e.disableFocus,
            p = void 0 !== y && y,
            w = e.awaitCloseAnimation,
            E = void 0 !== w && w,
            k = e.awaitOpenAnimation,
            M = void 0 !== k && k,
            A = e.debugMode,
            C = void 0 !== A && A;
        this.modal = document.getElementById(n);
        this.config = {
            debugMode: C,
            disableScroll: b,
            openTrigger: u,
            closeTrigger: h,
            openClass: g,
            onShow: s,
            onClose: c,
            awaitCloseAnimation: E,
            awaitOpenAnimation: M,
            disableFocus: p
        };
        a.length > 0 && this.registerTriggers(...a);
        this.onClick = this.onClick.bind(this);
        this.onKeydown = this.onKeydown.bind(this);
    }
    
    registerTriggers(...args) {
        args.filter(Boolean).forEach(t => {
            t.addEventListener("click", t => this.showModal(t));
        });
    }

    showModal(e = null) {
        this.activeElement = document.activeElement;
        this.modal.setAttribute("aria-hidden", "false");
        this.modal.classList.add(this.config.openClass);
        this.scrollBehaviour("disable");
        this.addEventListeners();
        if (this.config.awaitOpenAnimation) {
            const o = () => {
                this.modal.removeEventListener("animationend", o, !1);
                this.setFocusToFirstNode();
            };
            this.modal.addEventListener("animationend", o, !1);
        } else {
            this.setFocusToFirstNode();
        }
        this.config.onShow(this.modal, this.activeElement, e);
    }

    closeModal(e = null) {
        const t = this.modal;
        this.modal.setAttribute("aria-hidden", "true");
        this.removeEventListeners();
        this.scrollBehaviour("enable");
        if (this.activeElement && this.activeElement.focus) {
            this.activeElement.focus();
        }
        this.config.onClose(this.modal, this.activeElement, e);
        if (this.config.awaitCloseAnimation) {
            const o = this.config.openClass;
            this.modal.addEventListener("animationend", function e() {
                t.classList.remove(o);
                t.removeEventListener("animationend", e, !1);
            }, !1);
        } else {
            t.classList.remove(this.config.openClass);
        }
    }

    closeModalById(e) {
        this.modal = document.getElementById(e);
        if (this.modal) {
            this.closeModal();
        }
    }

    scrollBehaviour(e) {
        if (this.config.disableScroll) {
            const t = document.querySelector("body");
            if (e === "enable") {
                Object.assign(t.style, {
                    overflow: ""
                });
            } else if (e === "disable") {
                Object.assign(t.style, {
                    overflow: "hidden"
                });
            }
        }
    }

    addEventListeners() {
        this.modal.addEventListener("touchstart", this.onClick);
        this.modal.addEventListener("click", this.onClick);
        document.addEventListener("keydown", this.onKeydown);
    }

    removeEventListeners() {
        this.modal.removeEventListener("touchstart", this.onClick);
        this.modal.removeEventListener("click", this.onClick);
        document.removeEventListener("keydown", this.onKeydown);
    }

    onClick(e) {
        if (e.target.hasAttribute(this.config.closeTrigger) || e.target.parentNode.hasAttribute(this.config.closeTrigger)) {
            e.preventDefault();
            e.stopPropagation();
            this.closeModal(e);
        }
    }

    onKeydown(e) {
        if (e.keyCode === 27) {
            this.closeModal(e);
        }
        if (e.keyCode === 9) {
            this.retainFocus(e);
        }
    }

    getFocusableNodes() {
        const e = this.modal.querySelectorAll(n);
        return Array.from(e);
    }

    setFocusToFirstNode() {
        if (!this.config.disableFocus) {
            const e = this.getFocusableNodes();
            if (e.length > 0) {
                const t = e.filter(t => !t.hasAttribute(this.config.closeTrigger));
                if (t.length > 0) {
                    t[0].focus();
                } else {
                    e[0].focus();
                }
            }
        }
    }

    retainFocus(e) {
        let t = this.getFocusableNodes();
        if (t.length !== 0) {
            t = t.filter(e => e.offsetParent !== null);
            if (this.modal.contains(document.activeElement)) {
                const o = t.indexOf(document.activeElement);
                if (e.shiftKey && o === 0) {
                    t[t.length - 1].focus();
                    e.preventDefault();
                }
                if (!e.shiftKey && t.length > 0 && o === t.length - 1) {
                    t[0].focus();
                    e.preventDefault();
                }
            } else {
                t[0].focus();
            }
        }
    }
}

function validateModalId(e) {
    if (!document.getElementById(e)) {
        console.warn(`MicroModal: ❗Seems like you have missed '%c${e}%c' ID somewhere in your code. Refer example below to resolve it.`, "background-color: #f8f9fa;color: #50596c;font-weight: bold;");
        console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", `<div class="modal" id="${e}"></div>`);
        return false;
    }
    return true;
}

function validateTriggers(e, t) {
    if (e.length <= 0) {
        console.warn("MicroModal: ❗Please specify at least one %c'micromodal-trigger'", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", "data attribute.");
        console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", '<a href="#" data-micromodal-trigger="my-modal"></a>');
    }
    if (!t) return true;
    for (let o in t) {
        validateModalId(o);
    }
    return true;
}

const MicroModalController = {
    init: function(e) {
        const o = Object.assign({ openTrigger: "data-micromodal-trigger" }, e);
        const n = Array.from(document.querySelectorAll(`[${o.openTrigger}]`));
        const r = function(e, t) {
            const o = [];
            e.forEach(function(e) {
                const n = e.attributes[t].value;
                if (!o[n]) {
                    o[n] = [];
                }
                o[n].push(e);
            });
            return o;
        }(n, o.openTrigger);
        if (o.debugMode !== true || validateTriggers(n, r)) {
            for (let l in r) {
                const c = r[l];
                o.targetModal = l;
                o.triggers = Array.from(c);
                new MicroModal(o);
            }
        }
    },
    show: function(e, t) {
        const o = t || {};
        o.targetModal = e;
        if (o.debugMode === true && !validateModalId(e)) return;
        const instance = new MicroModal(o);
        instance.showModal();
    },
    close: function(e) {
        const instance = new MicroModal({});
        if (e) {
            instance.closeModalById(e);
        } else {
            instance.closeModal();
        }
    }
};

// Exporting MicroModal as an ES module
export default MicroModalController;
