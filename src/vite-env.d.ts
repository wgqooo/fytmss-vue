/// <reference types="vite/client" />

/*
ts只支持模块的导入导出, 但是有些时候你可能需要引入css/html等文件, 这时候就需要用通配符让ts把他们当做模块, 
下面是对".vue"文件的导入支持(来自vue官方):
声明把vue文件当做模块, 同时标注模块的默认导出是"component"类型. 
这样在vue的components字段中注册模块才可以正确识别类型.
*/
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-schart';
declare module 'nprogress'