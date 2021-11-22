// @ts-ignore
import {Plugin, ref} from "vue";
const Index = <Plugin>{
    install(app, opts){
        const rem = ref(0);
        const base = ref(opts && opts.base ?  opts.base :  0);
        const $$remInit = () => {
            rem.value = window.innerWidth;
        }
        app.mixin({
            data(){
                return {
                    css__rem:rem,
                    css__rem__base:base,
                }
            }
        })
        if(opts && opts.plug){
            $$remInit();
        }
        window.addEventListener("load", $$remInit);
        window.addEventListener("resize",$$remInit);
    }
}
export default Index;