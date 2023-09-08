import {
    Message,
} from 'element-ui'
import {
    createWeb3,
    web3Process
} from './web3Init'

import { requestPresaleData } from '@/apis/login'
import store from '@/store'
import { BlindBoxContract } from "@/wallet/BlindBoxContract"
import { USDTContract } from "@/wallet/USDTContract"
import { getChainInfo } from "@/wallet/chain";
import { changeChain } from "@/wallet/metamask";
const transaction = {
    data() {
        return {
            boxContract: null,
            buyBoxContract: null,
            openBoxContract: null,
            nftContract: null,
            usdtContract: null,
            blindBoxContract: null,
            planId: "",
            price: "",
            currency: "",
            chainId: "",
            buyMTContract: null,
            paymentId: "",
            startTime: 0,
            endTime: 0,
            showTime: 0,
            startTimeMillis: 0,
            endTimeMillis: 0,
            getNFTsTimeOutCount: 0,
            getNFTsTimeOutMax: 300,
            getNFTsInternal: 0,
            getNFTsInternalMax: 1,
            linkHash: "",
        }
    },
    methods: {
        sendStatus(hash, load, errorFun) {
            web3Process.web3.eth.getTransactionReceipt(hash, (err, tx) => {
                if (!tx) {
                    this.sendStatus(hash, load, errorFun)
                } else {
                    if (tx.status) {
                        // load()
                    } else {
                        Message({
                            message: 'Contract interaction failed, please check status on the official website for your wallet.',
                            type: 'error'
                        })
                        errorFun()
                    }
                }
            }).then((res) => {
                if (res) {
                    load(res)
                }
            })
        },
        async getAbis(type) {
            await createWeb3()
            let currentChain = await web3Process.web3.eth.getChainId()
            this.getAbisgetAbis = currentChain

            switch (type) {
                case "BLIND_BOX":
                    let chainConfig = getChainInfo(process.env.NODE_ENV);
                    if (store.getters.currentChain !== chainConfig.chainId) {
                        let judge = await changeChain();
                        if (judge) {
                            this.isLodaing = true;
                        }
                    } else {
                        this.isLodaing = true;
                    }
                    break;
                case "PRESALE":

                    break;
            }

            const usdtAbi = USDTContract
            const blindBoxAbi = BlindBoxContract

            this.usdtContract = new web3Process.web3.eth.Contract(usdtAbi, this.usdtAddress)
            this.blindBoxContract = new web3Process.web3.eth.Contract(blindBoxAbi, this.boxAddress)

        },
        getPreSalePlans() {
            let chainConfig = getChainInfo(process.env.NODE_ENV);
            if (store.getters.currentWalletAddress) {
                if (store.getters.currentChain !== chainConfig.chainId) {
                    changeChain();
                }
            }

            requestPresaleData().then((res) => {
                let data = res.data
                if (data && data.plans.length > 0) {
                    let plans = data.plans
                    for (let index = 0; index < plans.length; index++) {
                        let plan = plans[index];

                        if (plan.active) {
                            this.startTime = plan.startTime
                            this.endTime = plan.endTime
                            this.planId = plan.planId
                            this.startTimeMillis = plan.startTimeMillis
                            this.endTimeMillis = plan.endTimeMillis

                            if (plan.payments && plan.payments.length > 0) {
                                let payment = plan.payments[0]
                                this.chainId = payment.chainId
                                this.currency = payment.currency
                                this.usdtAddress = this.currency
                                this.paymentScale = payment.scale
                                this.price = payment.price * Math.pow(10, payment.scale)
                                localStorage.setItem("isclickbtn", true)
                                this.checkPlanState()
                            }

                            break
                        } else {
                            if (index == plans.length - 1) {
                                this.notStart()
                            }
                        }
                    }
                } else {
                    this.isPlanOpen = false
                }
            }).catch((err) => {
                console.log("err", err);
            })
        },
        // Presale
        async buyPresaleGoods(buyNum) {
            try {
                var value = BigInt(buyNum * this.price * Math.pow(10, this.paymentScale));
                await this.usdtContract.methods.transfer(this.boxAddress, value).send({
                    from: store.getters.currentWalletAddress,
                }).on('transactionHash', (hash) => {
                    this.sendStatus(hash, async(res) => {
                        this.isLodaing = false
                        this.showTipsWithKey("TRANSACTION_COMPLETE")
                        this.isTransactionComplete = true
                            // this.showTipsWithLink("TRANSACTION_COMPLETE_LEFT", "TRANSACTION_COMPLETE_LINK", "TRANSACTION_COMPLETE_RIGHT", res.transactionHash)
                    }, () => {
                        this.isLodaing = false
                        this.showTipsWithKey("TRANSACTION_FAILED")
                    })
                }).catch()
            } catch (error) {
                if (error.code === 4001) {
                    this.showTipsWithKey("TRANSACTION_CANCEL")
                } else {
                    console.log(error.message);
                }
                this.isLodaing = false
            }
        },
        // async getUserNFT() {
        //     try {
        //         let currentWalletAddress = store.getters.currentWalletAddress
        //         let nftNum = await this.blindBoxContract.methods.peek(currentWalletAddress).call({
        //             from: currentWalletAddress
        //         })
        //         return nftNum
        //     } catch (error) {
        //         this.showTips(error.message);
        //     }
        // },
        // async requestUserNFTs() {
        //     let nftNum = await this.getUserNFT()

        //     if (nftNum === this.currentNFTs) {
        //         this.isStartCheckNFTs = false
        //     } else {
        //         this.currentNFTs = nftNum
        //         this.showTips("Current NFTs: " + nftNum)
        //         this.isTransactionComplete = false
        //         this.getNFTsTimeOutCount = 0
        //     }
        // },
        async getBalance(buyNum) {
            await createWeb3()

            var price = BigInt(buyNum * this.price * Math.pow(10, this.paymentScale));
            var balance = await this.usdtContract.methods.balanceOf(store.getters.currentWalletAddress).call({
                from: store.getters.currentWalletAddress,
            })

            return balance >= price
        },
        showTips(message) {
            this.$popup.show({ title: "Tips", text: message });
        },
        showTipsWithKey(key) {
            let message = this.getMessageViaKey(key)
            this.$popup.show({ title: "Tips", text: message });
        },
        showTipsWithLink(left, text, right, linkHash) {
            let linkLeft = this.getMessageViaKey(left)
            let message = this.getMessageViaKey(text)
            let linkRight = this.getMessageViaKey(right)
            this.$popupPresale.show({ showLink: true, title: "Tips", text: message, linkLeft: linkLeft, linkRight: linkRight, linkHash: linkHash });
        },
        getMessageViaKey(key) {
            return this.$t(key)
        }
    }
}
export default transaction