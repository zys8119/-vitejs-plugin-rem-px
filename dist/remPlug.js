!function(e,r){"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?module.exports=r():e.RemPlug=r()}(this,function(){"use strict";var o=function(e,r,n){if(n||2===arguments.length)for(var t,o=0,i=r.length;o<i;o++)!t&&o in r||((t=t||Array.prototype.slice.call(r,0,o))[o]=r[o]);return e.concat(t||Array.prototype.slice.call(r))};Object.defineProperty(exports,"__esModule",{value:!0});var r=require("fs"),u=require("path"),s=require("@vue/compiler-sfc");return exports.default=function(n){function t(e){return(e||[]).map(function(e){return l[e]=e,(0,r.readFileSync)(e,"utf-8")}).join("\n")+"\n"}var l={},c=t(n);return{enforce:"pre",name:"rem计算插件",transform:function(o,i,e){return/\.vue$/.test(i)&&((0,s.parse)(o).descriptor.styles||[]).forEach(function(e){if(/less/.test(e.lang)&&e.content){var r=o.split("\n"),n=r.slice(0,e.loc.start.line).join("\n")+"\n",t=r.slice(e.loc.start.line,e.loc.end.line).join("\n")+"\n";try{t="".concat(c).concat(t)}catch(e){}t.match(/size\([0-9.]{1,}?\)/gim)&&(l[i]=i.replace((0,u.resolve)(__dirname,"../../").replace(/\\/g,"/"),""),t=t.replace(/size\([0-9.]*?\)/gim,function(e){e=e.replace(/^size\(|\)$/gim,"");return"calc(v-bind(css__rem) / v-bind(css__rem__base) * ".concat(e,"px)")}));e=r.slice(e.loc.end.line).join("\n");o=n+t+e}}),{code:o,map:null}},handleHotUpdate:function(r){if((n||[]).includes(r.file)){c=t(n);var e=Object.values(l).map(function(e){return r.server.moduleGraph.urlToModuleMap.get(e)}).filter(function(e){return e});return r.server.ws.send({type:"full-reload"}),e.reduce(function(e,r){return e.concat(o([],r.importedModules,!0).filter(function(e){return/\.less$/.test(e.id)}))},[])}return l[r.file]?(r.server.ws.send({type:"full-reload"}),[r.server.moduleGraph.urlToModuleMap.get(l[r.file])]):r.modules}}},RemPlug});