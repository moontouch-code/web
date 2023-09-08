import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state() {
        return {
            appID: "87245bf5fb0fb9a83f3682d09642ca60",
            currentChain: "",
            userToken: "",
            currentWalletAddress: "",
            depositWalletAddress: "",
            inviteCode: "",
            channelCode: "",
            isConnectWallet: false,
            selfInviteCode: "",
            isMobile: false,
            chainId: "0x66eed",
            curEmail: "",
            actavityCode: '',
            language: 'en',
            isRegister: false,
            bindEmail: "",
        }
    },
    mutations: {
        setMobile(state) {
            if (window.innerWidth<1100) {
                state.isMobile = true
            } else state.isMobile = false
        },
        setCurrentChian: (state, chain) => {
            state.currentChain = chain;
        },
        setUserToken: (state, token) => {
            state.userToken = token;
        },
        setCurrentWalletAddress: (state, address) => {
            state.currentWalletAddress = address;
        },
        setDepositWalletAddress: (state, address) => {
            state.depositWalletAddress = address;
        },
        setInviteCode: (state, code) => {
            state.inviteCode = code;
        },
        setChannelCode: (state, code) => {
            state.channelCode = code;
        },
        setIsConnectWallet: (state, connect) => {
            state.isConnectWallet = connect;
        },
        setSelfInviteCode: (state, code) => {
            state.selfInviteCode = code;
        },
        setInstallWalletState: (state, install) => {
            state.isInstallWallet = install;
        },
        setCurEmail: (state, install) => {
            state.curEmail = install;
        },
        setActavityCode: (state, code) => {
            state.actavityCode = code;
        },
        setCurrnetLanguage: (state, language) => {
            state.language = language;
        },
        setRegister: (state, isRegister) => {
            state.isRegister = isRegister;
        },
        setBindEmail: (state, bindEmail) => {
            state.bindEmail = bindEmail;
        },
    },
    actions: {},
    getters: {
        appID: state => state.appID,
        chainId: state => state.chainId,
        currentChain: state => state.currentChain,
        userToken: state => state.userToken,
        currentWalletAddress: state => state.currentWalletAddress,
        depositWalletAddress: state => state.depositWalletAddress,
        inviteCode: state => state.inviteCode,
        channelCode: state => state.channelCode,
        isConnectWallet: state => state.isConnectWallet,
        selfInviteCode: state => state.selfInviteCode,
        isInstallWallet: state => state.isInstallWallet,
        curEmail: state => state.curEmail,
        actavityCode: state => state.actavityCode,
        language: state => state.language,
        isRegister: state => state.isRegister,
        bindEmail: state => state.bindEmail,
    },
    plugins: [createPersistedState({
        key: "chain",
        paths: [
            "appID",
            "chainId",
            "currentChain",
            "userToken",
            "currentWalletAddress",
            "depositWalletAddress",
            "inviteCode",
            "channelCode",
            // "isConnectWallet",
            "selfInviteCode",
            "isInstallWallet",
            "curEmail",
            "actavityCode",
            "language",
            "isRegister",
            "bindEmail"
        ]
    })]
})