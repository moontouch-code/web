<template>
  <div class="popup" v-if="visable" @touchmove.prevent @mousewheel.prevent>
    <div class="mask" @click="onClickClose"></div>
    <div class="popup_box" :class="isMobile ? 'mobile_input' : ''">
      <img class="ash_icon" src="../../assets/web/home/icon/ash.webp" alt="" />
      <div class="ash_title">GET ASH</div>
      <div class="input1_title">import address</div>
      <input
        type="text"
        spellcheck="false"
        v-model="importAddress"
        class="address_input"
        oninput="value=value.replace(/[^0-9a-fA-FxX]/g,'')"
      />
      <div class="tips1">{{ tips1 }}</div>
      <div class="input2_title">amount of recharge</div>
      <input
        placeholder="Enter the amount of recharge"
        spellcheck="false"
        class="ash_input"
        type="text"
        v-model="param"
        oninput='value=this.value.replace(/^[0]+[0-9]*$/gi,"").replace(/[^\d]/g, "")'
        maxlength="6"
      />
      <div class="tips2">{{ tips2 }}</div>
      <div class="confirm" @click="sendAshContract">CONFIRM</div>
    </div>
  </div>
</template>

<script>
import { getContractInfo } from "../../apis/login";
import { abi } from "../../utils/abi.js";
import store from "@/store";
import Web3 from "web3";
import { changeChain } from "@/wallet/metamask";
import { getChainInfo } from "@/wallet/chain";
export default {
  data() {
    return {
      visable: false,
      param: null,
      importAddress: "",
      tips1: "",
      tips2: "",
    };
  },
  mounted() {},
  computed: {
    isMobile() {
      store.commit("setMobile");
      return store.state.isMobile;
    },
  },
  watch: {
    visable(newval, oldval) {
      if (newval == true) {
        this.importAddress = store.getters.depositWalletAddress;
        let chainConfig = getChainInfo(process.env.NODE_ENV);
        if (store.getters.currentWalletAddress) {
          if (store.getters.currentChain !== chainConfig.chainId) {
            changeChain();
          }
        }
      }
    },
  },
  methods: {
    onClockBtnLeft() {
      this.onClickClose();
    },
    onClockBtnRight() {
      this.onClickClose();
    },
    onClickClose() {
      this.visable = false;
      this.param = null;
      this.importAddress = "";
      this.tips1 = "";
      this.tips2 = "";
    },
    sendAshContract() {
      this.tips1 = "";
      this.tips2 = "";
      if (this.param == null||this.param[0]==0) {
        this.tips2 = "The amount of recharge is incorrect.";
        return;
      }
      let filter = /^0x[0-9a-fA-F]{40}$/;
      let result = filter.test(this.importAddress);
      if (!result) {
        this.tips1 = "The wallet address entered is incorrect.";
        return;
      }
      getContractInfo().then(async (res) => {
        const data = res.data;
        const wallet = new Web3(window.ethereum);
        const Contract = new wallet.eth.Contract(abi, data.contract);
        const res1 = await Contract.methods[data.method](
          this.importAddress,
          BigInt(this.param * Math.pow(10, 18)),
          data.action
        ).send({
          from: store.getters.currentWalletAddress,
          to: this.importAddress,
        });
        this.onClickClose();
        this.$popup.show({
          text: "success",
          isOneButton: true,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile_input {
  transform: scale(0.46);
  position: relative;
  margin-left: -46vw !important;
  margin-top: 10vh !important;
}
.popup {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 11;
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    top: 0;
  }
  .popup_box {
    position: relative;
    width: 760px;
    height: 500px;
    background: #ffffff;
    border-radius: 30px;
    margin: 0 auto;
    margin-top: 27vh;
    .ash_icon {
      position: absolute;
      width: 100px;
      height: 100px;
      left: 215px;
      top: 37px;
    }
    .ash_title {
      position: absolute;
      width: 223px;
      height: 85px;
      left: 315px;
      top: 44px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 700;
      font-size: 50px;
      line-height: 170%;
      /* identical to box height, or 85px */

      color: #060606;
    }
    .input1_title {
      position: absolute;
      width: 240px;
      text-align: center;
      height: 40px;
      left: 45px;
      top: 145px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 700;
      font-size: 30px;
      line-height: 170%;
      /* or 51px */

      color: #000000;
    }
    .address_input {
      box-sizing: border-box;
      position: absolute;
      width: 670px;
      padding-left: 50px;
      height: 44px;
      left: 45px;
      top: 199px;
      border: 3px solid #898989;
      border-radius: 34px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 170%;
      /* identical to box height, or 41px */
      color: #000000;
    }
    .tips1 {
      position: absolute;
      width: 417px;
      height: 16px;
      left: 55px;
      top: 250px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 16px;
      text-align: left;
      /* identical to box height */

      color: #d33a3a;
    }
    .input2_title {
      position: absolute;
      width: 350px;
      text-align: left;
      height: 40px;
      left: 45px;
      top: 266px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 700;
      font-size: 30px;
      line-height: 170%;
      /* or 51px */

      color: #000000;
    }
    .ash_input {
      box-sizing: border-box;
      position: absolute;
      width: 670px;
      height: 44px;
      left: 45px;
      top: 320px;
      border: 3px solid #898989;
      border-radius: 34px;
      padding-left: 50px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 170%;
      /* identical to box height, or 41px */
      color: #000000;
    }
    .ash_input::placeholder {
      font-weight: 400;
    }
    .tips2 {
      position: absolute;
      width: 417px;
      height: 16px;
      left: 55px;
      top: 375px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 16px;
      text-align: left;
      /* identical to box height */

      color: #d33a3a;
    }
    .confirm {
      position: absolute;
      width: 260px;
      height: 60px;
      left: 250px;
      top: 400px;
      color: #ffffff;
      background: #12a2de;
      border-radius: 6px;
      text-align: center;
      line-height: 60px;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 40px;
      cursor: pointer;
    }
  }
}
@media all and (orientation: portrait) {
  .popup {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    z-index: 11;
    .mask {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .popup_box {
      transform: scale(0.46);
    }
  }
}
</style>
