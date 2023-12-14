import request from '@/utils/request'

// 获取医院挂号信息
export const getHospitalguahaoapi = (page, limit, hoscode, depcode) => {
    return request({
        url: `/hosp/hospital/auth/getBookingScheduleRule/${page}/${limit}/${hoscode}/${depcode}`,
        method: 'get',
    })
}

//获取挂号医生信息
export const getHospitoldocapi = (hoscode, depcode,workDate) => {
    return request({
        url: `/hosp/hospital/auth/findScheduleList/${hoscode}/${depcode}/${workDate}`,
        method: 'get',
    })
}