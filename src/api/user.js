
import request from '@/utils/request'

///GET /api/user/patient/auth/findAll
// 获取就诊人信息
export const getPatientapi = () => {
    return request({
        url: '/user/patient/auth/findAll',
        method: 'get',
    })
}
    
// 得到 /api/hosp/hospital/getSchedule/{scheduleId}
// 获取挂号医生信息
export const getHospitoldocapi = (scheduleId) => {
    return request({
        url: `/hosp/hospital/getSchedule/${scheduleId}`,
        method: 'get',
        // params: {
        //     scheduleId
        // }
    })
}

// 邮政 /api/order/orderInfo/auth/submitOrder/{hoscode}/{scheduleId}/{patentId}
// 提交订单
export const submitOrderapi = (hoscode, scheduleId, patientId) => {
    return request({
        url: `/order/orderInfo/auth/submitOrder/${hoscode}/${scheduleId}/${patientId}`,
        method: 'post',
    })
}

// GET /api/order/orderInfo/auth/getOrderInfo/{id}
// 获取订单
export const getOrderapi = (id) => {
    return request({
        url: `/order/orderInfo/auth/getOrderInfo/${id}`,
        method: 'get',
    })
}

// GET /api/order/orderInfo/auth/cancelOrder/{orderId}
// 取消订单
export const cancelOrderapi = (orderId) => {
    return request({
        url: `/order/orderInfo/auth/cancelOrder/${orderId}`,
        method: 'get',
    })
}

// GET /api/order/weixin/createNative/{orderId}
// 生成二维码支付
export const createNativeapi = (orderId) => {
    return request({
        url: `/order/weixin/createNative/${orderId}`,
        method: 'get',
    })
}

// GET /api/order/weixin/queryPayStatus/{orderId}
// 查询支付状态
export const queryPayStatusapi = (orderId) => {
    return request({
        url: `/order/weixin/queryPayStatus/${orderId}`,
        method: 'get',
    })
}

// GET /api/user/auth/getUserInfo
// 获取用户信息
export const getUserapi = () => {
    return request({
        url: '/user/auth/getUserInfo',
        method: 'get',
    })
}

// POST /api/user/auth/userAuah
// 用户认证
export const userAuthapi = (data) => {
    return request({
        url: '/user/auth/userAuah',
        method: 'post',
        data
    })
}

// GET /api/order/orderInfo/auth/{page}/{limit}
// 获取订单列表
export const getOrderListapi = (page, limit,patientId,orderStatus) => {
    return request({
        url: `/order/orderInfo/auth/${page}/${limit}`,
        method: 'get',
        params: {
            patientId,
            orderStatus
        }
    })
}

// GET /api/user/patient/auth/findAll
// 获取所有就诊人名单
export const getPatientListapi = () => {
    return request({
        url: '/user/patient/auth/findAll',
        method: 'get',
    })
}

// GET /api/cmn/dict/findByParentId/{parentId}
// 获取省市区数据
export const getAreaapi = (parentId) => {
    return request({
        url: `/cmn/dict/findByParentId/${parentId}`,
        method: 'get',
    })
}

// POST /api/user/patient/auth/save
// PUT /api/user/patient/auth/update
// 新增与修改就诊人
export const savePatientapi = (data) => {
    if (data.id) {
        return request({
            url: '/user/patient/auth/update',
            method: 'put',
            data
        })
    }
    return request({
        url: '/user/patient/auth/save',
        method: 'post',
        data
    })
}

// DELETE /api/user/patient/auth/remove/{id}
// 删除就诊人
export const deletePatientapi = (id) => {
    return request({
        url: `/user/patient/auth/remove/${id}`,
        method: 'delete',
    })
}