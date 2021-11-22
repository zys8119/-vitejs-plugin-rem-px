;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Index = factory();
  }
}(this, function() {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var vue_1 = require("vue");

var remPlug_1 = require("./remPlug");

var Index = {
  install: function install(app, opts) {
    var rem = (0, vue_1.ref)(0);
    var base = (0, vue_1.ref)(opts && opts.base ? opts.base : 0);

    var $$remInit = function $$remInit() {
      rem.value = window.innerWidth;
    };

    app.mixin({
      data: function data() {
        return {
          css__rem: rem,
          css__rem__base: base
        };
      }
    });

    if (opts && opts.plug) {
      $$remInit();
    }

    window.addEventListener("load", $$remInit);
    window.addEventListener("resize", $$remInit);
  },
  remPlug: remPlug_1["default"]
};
exports["default"] = Index;
return Index;
}));
