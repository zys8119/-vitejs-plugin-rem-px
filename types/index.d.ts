import {Plugin, App} from "vue"
import {Plugin as vitePlugin} from "vite"
declare const remPlug :Plugin & remPlugInstall;
type remPlugInstall  = {
    install(app:App,  ...options: remPlugOptions[]):void;
    /**
     * 文件路径
     * @param options
     */
    remPlug?(options:string[]):vitePlugin;
}
type remPlugOptions = {
    /**
     * 设计稿基准
     */
    base:number | 0;
    /**
     * 是否为弹框插件模式，原因是弹框插件需要每次实例化
     */
    plug:boolean;
}
export = remPlug;