/**
 * 登录接口 
 */
export function infoList(data){
    return service.request({
        url:"/login", 
        method:"post",
        data,//请求类型为post时
        //params:data//请求类型为get时
    })
}
export function infoDetailed(data){
    return service.request({
        url:"/login", 
        method:"post",
        data,//请求类型为post时
        //params:data//请求类型为get时
    })
}