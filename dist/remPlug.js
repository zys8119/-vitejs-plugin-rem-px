;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.RemPlug = factory();
  }
}(this, function() {
"use strict";

var __spreadArray = void 0 && (void 0).__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fs_1 = require("fs");

var path_1 = require("path");

var compiler_sfc_1 = require("@vue/compiler-sfc");

exports["default"] = function (options) {
  var RelationshipFile = {};

  var getCssStr = function getCssStr(options) {
    return (options || []).map(function (filePath) {
      RelationshipFile[filePath] = filePath;
      return (0, fs_1.readFileSync)(filePath, "utf-8");
    }).join("\n") + '\n';
  };

  var publicCss = getCssStr(options);
  return {
    enforce: "pre",
    name: "rem计算插件",
    transform: function transform(code, id, ssr) {
      if (/\.vue$/.test(id)) {
        ((0, compiler_sfc_1.parse)(code).descriptor.styles || []).forEach(function (css) {
          if (/less/.test(css.lang) && css.content) {
            var codeArr = code.split("\n");
            var start = codeArr.slice(0, css.loc.start.line).join("\n") + '\n';
            var content = codeArr.slice(css.loc.start.line, css.loc.end.line).join("\n") + '\n';

            try {
              content = "".concat(publicCss).concat(content);
            } catch (e) {}

            if (content.match(/size\([0-9.]{1,}?\)/img)) {
              RelationshipFile[id] = id.replace((0, path_1.resolve)(__dirname, "../../").replace(/\\/g, "/"), "");
              content = content.replace(/size\([0-9.]*?\)/img, function (s) {
                var fontSize = s.replace(/^size\(|\)$/img, "");
                return "calc(v-bind(css__rem) / v-bind(css__rem__base) * ".concat(fontSize, "px)");
              });
            }

            var end = codeArr.slice(css.loc.end.line).join("\n");
            code = start + content + end;
          }
        });
      }

      return {
        code: code,
        map: null
      };
    },
    handleHotUpdate: function handleHotUpdate(ctx) {
      if ((options || []).includes(ctx.file)) {
        publicCss = getCssStr(options);
        var result = Object.values(RelationshipFile).map(function (key) {
          return ctx.server.moduleGraph.urlToModuleMap.get(key);
        }).filter(function (e) {
          return e;
        });
        ctx.server.ws.send({
          type: 'full-reload'
        });
        return result.reduce(function (a, b) {
          return a.concat(__spreadArray([], b.importedModules, true).filter(function (e) {
            return /\.less$/.test(e.id);
          }));
        }, []);
      }

      if (RelationshipFile[ctx.file]) {
        ctx.server.ws.send({
          type: 'full-reload'
        });
        return [ctx.server.moduleGraph.urlToModuleMap.get(RelationshipFile[ctx.file])];
      }

      return ctx.modules;
    }
  };
};
return RemPlug;
}));
