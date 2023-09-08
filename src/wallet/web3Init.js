import Web3 from 'web3'
// import Portis from '@portis/web3'
// import Fortmatic from 'fortmatic'
// import Torus from "@toruslabs/torus-embed"
// import {
//   Arkane
// } from '@arkane-network/web3-arkane-provider'
// import WalletConnectProvider from "@walletconnect/web3-provider"
// import {
//   Bitski,
//   AuthenticationStatus
// } from 'bitski'
import { getChainInfo } from '../wallet/chain'

let chainConfig = getChainInfo(process.env.NODE_ENV)
let martic = chainConfig
const type = process.env.VUE_APP_TYPE
let netName = martic.netName
let rpcUrl = martic.rpcUrl
let blockExplorerUrl = martic.blockExplorerUrl
let tokenName = martic.tokenName
let symbol = martic.symbol
let portis = null
let torus = null

const approve_amount = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; //(2^256 - 1 )

const metamaskWeb3 = async function() {
        web3Process.web3 = new Web3(window.ethereum)
    }
    // const portisWeb3 = function () {
    //   const netname = {
    //     nodeUrl: rpcUrl,
    //     chainId: web3Process.network
    //   }
    //   portis = new Portis('36bc4fd6-a9f7-4da4-b2ab-eebd58f85a86', netname)
    //   web3Process.web3 = new Web3(portis.provider)
    // }

// const portisNet = async function () {
//   const netname = {
//     nodeUrl: rpcUrl,
//     chainId: web3Process.network
//   }
//   await portis.changeNetwork(netname)
// }

// const fortmaticWeb3 = async function () {
//   const BSCOptions = {
//     rpcUrl: martic.ETHNETWORK === '137' ? martic.rpcUrl : 'https://rpc-mumbai.matic.today',
//     chainId: martic.ETHNETWORK
//   }
//   const fm = new Fortmatic(martic.ETHNETWORK === '137' ? 'pk_live_144047DDAEF098AE' : 'pk_test_B93751EA4B1D2958', BSCOptions)
//   web3Process.web3 = new Web3(fm.getProvider())
// }
// const torusWeb3 = async function () {
//   torus = new Torus({
//     buttonPosition: "top-left", // default: bottom-left
//   })
//   await torus.init({
//     buildEnv: "production", // default: production
//     enableLogging: true, // default: false
//     network: {
//       host: rpcUrl, // default: mainnet
//       chainId: web3Process.network, // default: 1
//       networkName: netName, // default: Main Ethereum Network
//     },
//     showTorusButton: false, // default: true
//   })
//   await torus.login() // await torus.ethereum.enable()
//   web3Process.web3 = new Web3(torus.provider)
// }

// const torusNet = async function () {
//   const netname = {
//     host: rpcUrl,
//     networkName: netName,
//     chainId: web3Process.network
//   }
//   await torus.setProvider(netname)
// }
// const walletConnectWeb3 = async function () {
//   const obj = {}
//   obj[web3Process.network] = rpcUrl
//   const provider = new WalletConnectProvider({
//     rpc: obj
//   })
//   provider.on("disconnect", () => {
//     if (localStorage.getItem('walletconnect')) {
//       localStorage.removeItem('walletconnect')
//     }
//     provider.enable()
//   })
//   await provider.enable()
//   web3Process.web3 = new Web3(provider)
// }

// const venlyWeb3 = async function () {
//   const options = {
//     clientId: 'Testaccount',
//     environment: martic.ETHNETWORK === '137' ? 'production' : 'staging',
//     //optional: you can set an identity provider to be used when authenticating
//     secretType: 'MATIC' //optional, ETHEREUM by default
//   }
//   const provider = await Arkane.createArkaneProviderEngine(options)
//   web3Process.web3 = new Web3(provider)
// }
// const bitskiWeb3 = async function () {
//   const bitski = new Bitski('7c43ddaf-f458-4f41-a49d-67e068099b80', window.location.origin + '/login')
//   const options = {
//     rpcUrl: rpcUrl,
//     chainId: web3Process.network,
//   }
//   const provider = bitski.getProvider({
//     network: options
//   })
//   if (bitski.authStatus === AuthenticationStatus.NotConnected) {
//     await bitski.signIn()
//   }
//   web3Process.web3 = new Web3(provider)
// }

export const createWeb3 = async function() {
    const map = {
        'Metamask': metamaskWeb3,
        // 'Bitski': bitskiWeb3,
        // 'Walletconnect': walletConnectWeb3,
        // 'Venly': venlyWeb3,
        // 'Torus': torusWeb3,
        // 'Portis': portisWeb3,
        // 'Fortmatic': fortmaticWeb3,
        // 'ImToken': metamaskWeb3,
        // 'TokenPocket': metamaskWeb3,
        // 'Trust': metamaskWeb3
    }
    map[localStorage.getItem('wallet')] ? await map[localStorage.getItem('wallet')]() : await metamaskWeb3()
}

export const setChain = async function(id, store) {
    const marticId = Number(martic.ETHNETWORK)

    if (id === marticId) {
        web3Process.network = marticId
        netName = martic.netName
        rpcUrl = martic.rpcUrl
        blockExplorerUrl = martic.blockExplorerUrl
        tokenName = martic.tokenName
        symbol = martic.symbol
        web3Process.gasPrice = await web3Process.web3.eth.getGasPrice()
        web3Process.gasPrice = web3Process.web3.utils.fromWei(web3Process.gasPrice, 'Gwei')
        web3Process.gasPrice = web3Process.gasPrice > 5 ? web3Process.gasPrice : '5'
        web3Process.gas = 5500000
    }

    if (localStorage.getItem('wallet') === 'Metamask' || localStorage.getItem('wallet') === 'Trust' || localStorage.getItem('wallet') === 'ImToken' || localStorage.getItem('wallet') === 'TokenPocket') {
        try {
            await addNetwork()
        } catch (e) {
            throw (e)
        }
    }

    try {
        await createWeb3()
    } catch (error) {
        throw (error)
    }
}

export const addNetwork = async function(store) {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{
                chainId: martic.chainId,
            }],
        })
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: martic.chainId,
                        chainName: netName,
                        nativeCurrency: {
                            name: martic.tokenName,
                            symbol: martic.symbol,
                            decimals: martic.coefficient,
                        },
                        rpcUrls: [rpcUrl],
                        blockExplorerUrls: [blockExplorerUrl]
                    }]
                })
            } catch (addError) {
                console.log("addError", addError);
            }
        }
        throw (switchError)
    }
}

export const web3Process = {
    web3: null,
    type,
    network: Number(martic.ETHNETWORK),
    approve_amount,
    gas: 5500000,
    gasPrice: '40'
}