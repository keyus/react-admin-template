import axios from 'axios'
class Http {
    baseURL= '';
    timeout= '';
    fetch = axios.create({
        baseURL: this.baseURL,
        timeout: this.timeout,
    })
    constructor(){
        this.init();
    }
    init = ()=>{
        this.request();
        this.response();
    }
    request = ()=>{
        this.fetch.interceptors.request.use( config=> {
            config.headers.Authorization = localStorage.getItem('token');
            return config;
        }, error=>{
            return Promise.reject(error);
        })
    }
    response = ()=>{
        this.fetch.interceptors.response.use( response=> {
            return response;
        }, error=>{
            return Promise.reject(error);
        })
    }
}
export default new Http();
