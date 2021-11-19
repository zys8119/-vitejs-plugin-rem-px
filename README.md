# vitejs-plugin-rem-px

vite字体px自动响应

## 安装

```
npm i @vitejs/plugin-rem-px -S
```

## 使用方法

main.ts

```typescript
import {createApp} from "vue"
import remPlug from "./index"
createApp(<any>App)
    .use(remPlug,{
        base:1440
    })
    .mount("#app")
```

vite.config.ts

```typescript
import {UserConfig} from 'vite'
import remPlug from './remPlug.ts'
import {resolve} from "path"

export default <UserConfig>{
    plugins: [
        remPlug({
            resolve(__dirname, "./src/assets/less/public.less"),
        }),
    ],
}

```