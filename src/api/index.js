import http from '@http'

//登录
export const login = (data)=>{
    return http.post('/login',data);
}
//玩家-订单列表
export const playOrderList = (data)=>{
    return http.post('/pay/lucky/extract/record',data);
}
