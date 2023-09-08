import Vue from 'vue'
import axios from 'axios'
import store from "@/store";
import errorCodeList from '@utils/errorCode'

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
})

instance.interceptors.request.use(
    function(config) {
        config.headers['Content-Type'] = 'application/json'
        if (store.state.userToken !== "") {
            config.headers['Authorization'] = "Bearer " + store.state.userToken
        }
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

Vue.prototype.$axios = axios
Vue.prototype.$instance = instance
export default instance