/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import QS from 'qs';
import store from '../store/index';
import router from "@/router";
// 环境的切换
// if (process.env.NODE_ENV == 'development') {    
    axios.defaults.baseURL = '/requestApi';
// } else if (process.env.NODE_ENV == 'debug') {    
//     axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') {    
//     axios.defaults.baseURL = 'http://api.123dailu.com/';
// }

// 请求超时时间
// axios.defaults.timeout = 10000;

// post请求头


axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true; //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.headers.common['clientId'] = 'app';
axios.defaults.headers.common['clientSecret'] = 'app';
axios.defaults.headers.common["token"] = store.getters.user.access_token; // 页面刷新获取token
axios.defaults.headers.common["eduCheck"] = "2222";




axios.interceptors.response.use(
    response => {
        //当返回信息为未登录或者登录失效的时候重定向为登录页面
        if (response.data.code == '401' || response.data.msg == '未登陆或登陆失效') {
            localStorage.clear();
            var arr = [];
            store.commit("SET_KEEP_ALIVE", arr);
            console.log(router)
            setTimeout(() => {
                // localStorage.setItem("preRoute", router.currentRoute.fullPath)
                router.push({
                    path: "/login",
                    // query: { redirect: router.currentRoute.fullPath } //从哪个页面跳转
                })
            }, 1000);
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    })
/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        })        
        .then(res => {          
            resolve(res);        
        })        
        .catch(err => {           
            reject(err)        
        })    
    });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {    
    return new Promise((resolve, reject) => {         
        axios.post(url, params)        
        .then(res => {            
            resolve(res);        
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}

export function postDownload(url, params) {    
    return new Promise((resolve, reject) => {         
        axios({
            method: "POST",
            url: url,
            responseType: "blob",
            data: params,
          })        
        .then(res => {            
            resolve(res);        
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}

export default {
    post,get,postDownload
}