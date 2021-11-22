"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var vue_1 = require("vue");
exports.default = {
    install: function (app, opts) {
        var rem = vue_1.ref(0);
        var base = vue_1.ref(opts && opts.base ? opts.base : 0);
        var $$remInit = function () {
            rem.value = window.innerWidth;
        };
        app.mixin({
            data: function () {
                return {
                    css__rem: rem,
                    css__rem__base: base,
                };
            }
        });
        if (opts && opts.plug) {
            $$remInit();
        }
        window.addEventListener("load", $$remInit);
        window.addEventListener("resize", $$remInit);
    }
};
