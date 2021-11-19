// @ts-ignore
import { ref } from "vue";
export default {
    install: function (app, opts) {
        var rem = ref(0);
        var base = ref(opts && opts.base ? opts.base : 0);
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
