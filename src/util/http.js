import axios from 'axios'
import {message} from 'antd'
import store from '@store'
import {logout} from '@action/user'

const NoMessageCode = [
    0,
]

class Http {
    baseURL = '/api';
    timeout = '';
    CancelToken = axios.CancelToken;
    fetch = axios.create({
        baseURL: this.baseURL,
        timeout: this.timeout,
    })

    constructor() {
        this.init();
        this.fetch.CancelToken = this.CancelToken;
        return this.fetch;
    }

    init = () => {
        this.request();
        this.response();
    }
    request = () => {
        this.fetch.interceptors.request.use(config => {
            config.headers.Authorization = localStorage.getItem('token');
            return config;
        }, error => {
            return Promise.reject(error);
        })
    }
    response = () => {
        this.fetch.interceptors.response.use(response => {
            if (response.data.code === 0) {
                return response.data;
            }
            if (!NoMessageCode.includes(response.data?.code)) {
                message.error(response.data?.msg)
            }
            return Promise.reject(response.data);
        }, error => {
            if (error?.__CANCEL__) return Promise.reject(error);
            if (error?.response?.status === 401) {
                message.error('token失效,请重新登录');
                store.dispatch(logout());
            } else {
                message.error(error.message)
            }
            return Promise.reject(error);
        })
    }
}

export default new Http();
