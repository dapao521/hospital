import request from '@/utils/request'

export const loginapi = (data) => {
    return request({
        url: `/sms/send/+${data}`,
        method: 'get',
    })
}

export const dengluapi = (phone, code) => {
    return request({
        url: '/user/login',
        method: 'post',
        data: {
            phone,
            code
        }
    })
}

// huoqu  weixin login
export const weixinloginapi = (wxRedirectUri) => {
    return request({
        // 这里携带的事querry参数
        url: `/user/weixin/getLoginParam?wxRedirectUri=${wxRedirectUri}`,
        method: 'get',

    })
}