import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
	base: './',
	plugins: [
		vue(),
		VueSetupExtend(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	],
	optimizeDeps: {
		include: ['schart.js']
	},
	resolve: {
		alias: {
			'@': '/src',
			'~': '/src/assets'
		}
	},
	define: {
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
	},
	//解决跨域
	server: {
		proxy: {
		  "/api": {//代理标识，一般是每个接口前的相同部分
			 target: "http://localhost:9091",
			 changeOrigin: true,//允许跨域请求
			 ws:true,//允许websocket代理
			 //重写路径，替换请求地址中的指定路径
			 //rewrite的作用就是将axios请求地址的/api去掉，如果不需要去掉api的话，不写rewrite就行
			 rewrite: (path) => path.replace(/^\/api/, ''),
		    },
		},
	}
});
