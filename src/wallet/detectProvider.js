import detectEthereumProvider from "@metamask/detect-provider";
import request from '../plugins/axios/index'
import { utf8ToHex } from 'web3-utils';
import Web3 from 'web3';
import store from "@/store";

let loginSuccessCallBack = null
let tipsCallBack = null
let loginOutCallBack = null
let disconnectCallBack = null

export function requestGetWeb3Token(address) {
    return request({
        url: '/authorization/api/wallet/token/' + address,
        method: 'post',
    })
}

function walletLogin(config) {
    return request({
        url: '/authorization/user_login',
        method: 'post',
        data: {
            "account": config.account,
            "appId": config.appId,
            "channelCode": config.channelCode,
            "credit": config.credit,
            "inviteCode": config.inviteCode,
            "origin": config.origin,
            "platform": config.platform,
        }
    })
}

export function initCallBacks(login, tips, loginOut) {
    loginSuccessCallBack = login
    tipsCallBack = tips
    loginOutCallBack = loginOut
}

export function initWalletEventListener() {
    if (store.state.isConnectWallet === true) {
        addWalletEventListener()
    }
}

function addWalletEventListener() {
    if (window.ethereum !== undefined) {
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
    }
}

export function removeWalletEventListener() {
    if (window.ethereum !== undefined) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
    }
}

export async function detect() {
    var data = {
        mustBeMetaMask: true,
        silent: false,
        timeout: 3000
    }

    var provider = await detectEthereumProvider(data);
    if (provider) {
        if (provider !== window.ethereum) {
            console.error('Do you have multiple wallets installed?');
        } else {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|mi/i.test(navigator.userAgent)) {
                console.log('mobile')
                requestAccounts()
            } else {
                console.log('pc')
                getPermissions()
            }
        }
    }
}
export function setLoginOutCallBack(loginOut) {
    disconnectCallBack = loginOut
}

function getPermissions() {
    window.ethereum.request({
            method: 'wallet_getPermissions',
        })
        .then((permissions) => {
            if (permissions.length === 0) {
                requestPermissions()
            } else {
                requestAccounts()
            }
        })
        .catch((error) => {
            if (error.code === 4001) {
                console.log('Permissions needed to continue.');
            } else {
                console.error(error);
            }
        });
}

function requestPermissions() {
    window.ethereum.request({
            method: 'wallet_requestPermissions',
            params: [{ eth_accounts: {} }],
        })
        .then((permissions) => {
            const accountsPermission = permissions.find(
                (permission) => permission.parentCapability === 'eth_accounts'
            );

            if (accountsPermission) {
                if (accountsPermission.caveats.length > 0) {
                    if (accountsPermission.caveats[0].value.length > 0) {
                        store.commit("setCurrentWalletAddress", accountsPermission.caveats[0].value[0])
                        getWalletToken()
                    }
                }
            }
        })
        .catch((error) => {
            if (error.code === 4001) {
                console.log('Permissions needed to continue.');
            } else {
                console.error(error);
            }
        });
}

function requestAccounts() {
    window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
            if (accounts.length > 0) {
                store.commit("setCurrentWalletAddress", accounts[0])
                getWalletToken()
            }
        })
        .catch((err) => {
            if (err.code === 4001) {
                console.log('Please connect to MetaMask.');
            } else if (err.code === -32002) {
                if (tipsCallBack !== null) {
                    tipsCallBack(err.message)
                }
            } else {
                console.error(err);
            }
        });
}

function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        logOut()
    } else {
        if (accounts[0] !== store.getters.currentWalletAddress) {
            if (store.getters.userToken !== "") {
                logOut()
            } else {
                store.commit("setCurrentWalletAddress", accounts[0])
                getWalletToken()
            }
        } else {
            getWalletToken()
        }
    }
}

export async function getChainId() {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    store.commit("setCurrentChian", chainId)
}

function handleChainChanged(chainId) {
    store.commit("setCurrentChian", chainId)
}

export function logOut() {
    if (loginOutCallBack !== null) {
        loginOutCallBack()
    }

    if (disconnectCallBack !== null) {
        disconnectCallBack()
    }

    cleanLoginState()
    removeWalletEventListener()
}

function getWalletToken() {
    getChainId()
    requestGetWeb3Token(store.getters.currentWalletAddress).then((res) => {
        let web3Token = res.data.token
        signWalletAddress(web3Token)
    }).catch((err) => {
        console.log("requestGetWeb3Token", err);
    });
}

function signWalletAddress(token) {
    const hexString = utf8ToHex(token);
    const web3 = new Web3(window.ethereum);

    web3.eth.personal.sign(hexString, store.getters.currentWalletAddress, "").then(signature => {
        let loginInfo = {
            account: store.getters.currentWalletAddress.toString(),
            appId: store.getters.appID,
            channelCode: store.getters.channelCode,
            credit: Buffer.from(signature).toString('base64'),
            inviteCode: store.getters.inviteCode,
            origin: "PLATFORM_AUTH",
            platform: "META_MASK"
        }
        userLogin(loginInfo)
    })
}

export function userLogin(loginInfo) {
    walletLogin(loginInfo).then((res) => {
        store.commit("setRegister", res.data.register)
        store.commit("setBindEmail", res.data.email)

        if (loginSuccessCallBack !== null) {
            loginSuccessCallBack()
        }

        if (store.getters.isConnectWallet === false) {
            addWalletEventListener()
        }

        store.commit("setIsConnectWallet", true)
        store.commit("setUserToken", res.data.token)
        store.commit("setSelfInviteCode", res.data.inviteCode)
        store.commit("setDepositWalletAddress", res.data.integratedAddress)
    }).catch((err) => {
        console.log("walletLogin", err);
    })
}

export function cleanLoginState() {
    store.commit("setUserToken", "")
    store.commit("setIsConnectWallet", false)
    store.commit("setCurrentChian", "")
    store.commit("setCurrentWalletAddress", "")
    store.commit("setInviteCode", "")
    store.commit("setChannelCode", "")
    store.commit("setSelfInviteCode", "")
    store.commit("setDepositWalletAddress", "")
    store.commit("setRegister", "")
    store.commit("setBindEmail", "")
}

export function initState() {
    cleanLoginState()
    removeWalletEventListener()
}