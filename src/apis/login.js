import request from '../plugins/axios/index'
import store from '@/store'

export function requestVerificationCode(mail) {
    return request({
        url: '/authorization/mail_code',
        method: 'get',
        params: {
            "mail": mail
        }
    })
}

export function requestRegisterAccount(mes) {
    return request({
        url: '/authorization/register',
        method: 'post',
        data: {
            "appId": store.getters.appID,
            "channelCode": mes.channelCode,
            "code": mes.code,
            "inviteCode": mes.inviteCode,
            "mail": mes.mail,
            "origin": "PLATFORM_AUTH",
            "password": mes.password
        },
    })
}


export function requestLogin(mes) {
    return request({
        url: '/authorization/user_login',
        method: 'post',
        data: {
            "account": mes.account,
            "appId": store.getters.appID,
            "channelCode": mes.channelCode,
            "credit": mes.credit,
            "inviteCode": mes.inviteCode,
            "origin": "PLATFORM_AUTH",
            "platform": "ORIGIN"
        },
    })
}

export function requestResetPassword(mes) {
    return request({
        url: '/authorization/reset_pwd',
        method: 'post',
        data: {
            "account": mes.account,
            "code": mes.code,
            "mail": mes.account,
            "newPassword": mes.newPassword
        },
    })
}

export function requestForgotPassword(mail) {
    return request({
        url: '/authorization/forgot_pwd',
        method: 'get',
        params: {
            "mail": mail
        }
    })
}

export function requestLogout() {
    return request({
        url: '/authorization/logout',
        method: 'post',
    })
}


export function requestPresaleData() {
    return request({
        url: '/shop/api/presale/87245bf5fb0fb9a83f3682d09642ca60',
        method: 'get',
    })
}

export function actionReport(eventType, param, userId) {
    return request({
        url: "/dashboard/api/anchor_log/report",
        method: "post",
        data: {
            "eventType": eventType,
            "param": param,
            "userId": userId,
        },
    });
}

export function requestCursorAmount(planId) {
    return request({
        url: "/shop/api/presale/cursor/amount",
        method: "get",
        params: {
            "planId": planId,
        },
    });
}

export function requestBuy(planId, type) {
    return request({
        url: "/shop/api/presale/buy",
        method: "post",
        data: {
            "planId": planId,
            "type": type,
        },
    });
}

export function requestBindMailCode(mail) {
    return request({
        url: "/authorization/bind_mail_code",
        method: "get",
        params: {
            "mail": mail,
        },
    });
}

export function requestBindMail(data) {
    return request({
        url: "/authorization/bind_mail",
        method: "post",
        data: {
            "code": data.code,
            "mail": data.mail,
        },
    });
}
export function walletFix(data) {
    return request({
        url: "/authorization/wallet_fix",
        method: "post",
        data: {
            "wallet": data.wallet,
            "password": data.password,
        }
    })
}
export function getFixStatus(data) {
    return request({
        url:'/authorization/api/config/get',
        method:"get",
        data
    })
}
export function getAccountFixStatus(data) {
    return request({
        url:'/authorization/get_fix_account',
        method:"post",
        data
    })
}
export function getContractInfo(data) {
    return request({
        url:'/authorization/get_ash_config',
        method:"post",
        data
    })
}
export function setClickTimes(data){
    return request({
        url:'/dashboard/api/log2/pv/commit',
        method:"post",
        data
    })
}