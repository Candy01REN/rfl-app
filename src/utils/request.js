import axios from "axios";

//1.创建实例
const service = axios.create({
    baseURL:'/devApi/',
    timeout:5000,
});
//2.请求拦截
service.interceptors.request.use(function(config){
    
    
    //在发送请求前做些什么
    return config;
},function(error){
    //对请求错误做些什么
    return Promise.reject(error);
});
//3.响应拦截
service.interceptors.response.use(function(response){
    return response;
     
},function(error){
    return Promise.reject(error);
});

export default service;