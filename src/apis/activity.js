import axios from 'axios'
import store from "@/store";
import errorCodeList from '@utils/errorCode'

const instance = axios.create({
    baseURL: 'https://dcdnapp.moontouch.io:37000/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    }
})

instance.interceptors.request.use(
    function(config) {
        config.headers['Content-Type'] = 'application/json'
        return config
    },
    function(error) {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    res => {
        if (res.status === 200) {
            return res.data
        } else if ([600, 602].includes(res.status)) {

        }
    },
    error => {
        let res = error.response

        if (res.status === 500) {
            return Promise.reject(errorCodeList[res.status])
        } else if (res.status === 503) {
            return Promise.reject(errorCodeList[res.status])
        }

        if (error.response.data || {}) {
            return Promise.reject(errorCodeList[error.response.data.code])
        }

        return Promise.reject(error.response)
    }
)

export function getActivityList(params) {
    return instance({
        url: '/website/api/origin/activity/recordPage',
        method: 'get',
        params: {
            pageNumber:params.pageNumber,
            pageSize:params.pageSize,
            seq:params.seq,
        }
    })
}
export function getActivityType(){
    return instance({
        url:'/website/api/origin/activity/openCount',
        method: 'get',
        params:{}
    })
}