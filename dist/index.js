!function(e,n){"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?module.exports=n():e.Index=n()}(this,function(){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var o=require("vue"),e=require("./remPlug"),n={install:function(e,n){function t(){r.value=window.innerWidth}var r=(0,o.ref)(0),i=(0,o.ref)(n&&n.base?n.base:0);e.mixin({data:function(){return{css__rem:r,css__rem__base:i}}}),n&&n.plug&&t(),window.addEventListener("load",t),window.addEventListener("resize",t)}};return exports.default=n,exports.remPlug=e.default,n});