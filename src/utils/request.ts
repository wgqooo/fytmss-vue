import router from '@/router';
import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';


const service: AxiosInstance = axios.create({
    timeout: 5000,
    withCredentials:true,
    baseURL:"http://localhost:9091/",
    headers:{
        'Content-Type': 'application/json; charset=uft-8'
    }
});



service.interceptors.request.use(
    /*
    这是一个拦截请求的处理函数。当请求发送前，Axios 会调用这个函数。
    它接收一个参数 config，即请求的配置对象。在这个处理函数中，它直接返回了传入的 config，
    表示没有对请求做任何修改，直接放行。这样的处理函数在请求发送前执行，
    可以用来对请求做一些额外的配置，比如添加请求头部信息、修改请求参数等。
    */
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject();
    }
);

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
// service.adornUrl = (actionName) => {
//     // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
//     return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.baseUrl) + actionName
//   }

service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response;
        } else {
            Promise.reject();
        }
    },
    (error: AxiosError) => {
        console.log(error)
        // alert("您的账号已被异地登录！")
        // router.push('/login');
        return Promise.reject();
    }
);

export default service;
