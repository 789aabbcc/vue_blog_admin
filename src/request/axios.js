import axios from 'axios';



// 使用自定义配置新建一个 axios 实例
const service = axios.create({
    // 基础的请求地址
    // baseURL: 'http://118.31.55.53:3000',
    baseURL: 'http://127.0.0.1:1024',
    // 设置超时时间 5s
    timeout: 10000
});


// 请求拦截器，例如请求的时候在头部加上请求的token
service.interceptors.request.use(config => {

    if (localStorage.getItem('token')) {

        config.headers.ACCESS_TOKEN = localStorage.getItem('token');

    }

    return config;  //  有且必须有一个config对象被返回

}, error => {
    //   对请求错误做些什么
    console.log(error);
    return Promise.reject();
});


// 响应拦截器,例如判断服务器返回的状态，400，500啥的，其实超时可以写到这里面来，我分开写了一个比较直观
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况,这些自定义（需要与后台商量返回）
    error => {
        if (
            400 <= error.response.status < 500
        ) {
            alert("网络开小差了,请稍后再试!");
            // 清除token
            localStorage.removeItem("token");
            // 跳转登录
            // setTimeout(() => {
            //     window.location.href = "/login";
            // }, 1000);
        } else {
            if (error.response.status >= 500) {
                alert("服务器开小差了，请稍后再试！");
            } else {
                alert("服务器开小差了，请稍后再试！");
                return Promise.reject(error)
            }
        }
    }
);

export default service;