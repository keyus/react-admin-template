import http from '@http'

const CancelToken = http.CancelToken;

export function login (data){
    login.source = CancelToken.source();
    return http.post('/login',data,{
        cancelToken: login.source.token
    });
}

export const accoutList = (data)=>{
    accoutList.source = CancelToken.source();
    return http.post('/account/list',data,{
        cancelToken: accoutList.source.token
    });
}
