"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var compiler_sfc_1 = require("@vue/compiler-sfc");
exports.default = (function (options) {
    var RelationshipFile = {};
    var getCssStr = function (options) { return (options || []).map(function (filePath) {
        RelationshipFile[filePath] = filePath;
        return fs_1.readFileSync(filePath, "utf-8");
    }).join("\n") + '\n'; };
    var publicCss = getCssStr(options);
    return {
        enforce: "pre",
        name: "rem计算插件",
        transform: function (code, id, ssr) {
            if (/\.vue$/.test(id)) {
                (compiler_sfc_1.parse(code).descriptor.styles || []).forEach(function (css) {
                    if (/less/.test(css.lang) && css.content) {
                        var codeArr = code.split("\n");
                        var start = codeArr.slice(0, css.loc.start.line).join("\n") + '\n';
                        var content = codeArr.slice(css.loc.start.line, css.loc.end.line).join("\n") + '\n';
                        try {
                            content = "" + publicCss + content;
                        }
                        catch (e) { }
                        if (content.match(/size\([0-9.]{1,}?\)/img)) {
                            RelationshipFile[id] = id.replace(path_1.resolve(__dirname, "../../").replace(/\\/g, "/"), "");
                            content = content.replace(/size\([0-9.]*?\)/img, function (s) {
                                var fontSize = s.replace(/^size\(|\)$/img, "");
                                return "calc(v-bind(css__rem) / v-bind(css__rem__base) * " + fontSize + "px)";
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
        handleHotUpdate: function (ctx) {
            if ((options || []).includes(ctx.file)) {
                publicCss = getCssStr(options);
                var result = Object.values(RelationshipFile).map(function (key) { return ctx.server.moduleGraph.urlToModuleMap.get(key); }).filter(function (e) { return e; });
                ctx.server.ws.send({
                    type: 'full-reload'
                });
                return result.reduce(function (a, b) {
                    return a.concat(__spreadArray([], b.importedModules).filter(function (e) { return /\.less$/.test(e.id); }));
                }, []);
            }
            if (RelationshipFile[ctx.file]) {
                ctx.server.ws.send({
                    type: 'full-reload'
                });
                return [
                    ctx.server.moduleGraph.urlToModuleMap.get(RelationshipFile[ctx.file])
                ];
            }
            return ctx.modules;
        }
    };
});
