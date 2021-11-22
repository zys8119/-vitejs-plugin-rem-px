import {Plugin, App} from "vue"
declare const remPlug :Plugin & remPlugInstall;
type remPlugInstall  = {
    install(app:App,  ...options: remPlugOptions[]):void;
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