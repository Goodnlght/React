import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
import {Link} from 'react-router-dom'

axios.defaults.baseURL = "http://127.0.0.1:8888";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// axios.defaults.transformRequest = [function(data){
//     return qs.stringify(data);
// }]
//请求拦截器，在请求发送之前进行拦截，作用是改变 一些配置信息
axios.interceptors.request.use(function(config){
    if(config.method==="post"){
        config.data = qs.stringify(config.data);
    }
    //返回配置信息
    return config;
})
//在响应刚刚回来后，处理response
axios.interceptors.response.use(function(response){
    console.log(response);
    let {data} = response;
    response.status = data.status;
    response.statusText = data.message;
    response.data = data.data;
    return response;
},(error)=>{
    message.error('服务器异常');
    Promise.reject(error);
})

export default axios;