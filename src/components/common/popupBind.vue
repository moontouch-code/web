<template>
  <div class="popup" v-if="visable" @touchmove.prevent @mousewheel.prevent>
    <div class="mask" @click="onClickClose"></div>
    <div class="popup_box" v-if="!showForm" :class="isMobile?'mobile_input':''">
      <div class="title">Virtual mailbox binding</div>
      <div class="account">
        Email account:
        {{
          account.slice(0, 4) +
          "..." +
          account.slice(account.length - 4, account.length)
        }}@moontouch.io
      </div>
      <img
        v-clipboard:copy="copyaccount"
        v-clipboard:success="copyed"
        class="copy"
        src="../../assets/web/home/icon/copyblack.webp"
        alt=""
      />
      <div class="password1">
        <div class="pastext">Password:</div>
        <input
          class="pasinp"
          type="password"
          placeholder="please enter password"
          ref="in1"
          v-model="password1"
          maxlength="16"
          spellcheck="false"
        />
        <img
          class="typechange"
          @click="changeType('in1')"
          :src="input1"
          alt=""
        />
      </div>
      <div class="password2">
        <div class="pastext">Confirm Password:</div>
        <input
          class="pasinp"
          type="password"
          placeholder="please confirm password"
          ref="in2"
          v-model="password2"
          maxlength="16"
          spellcheck="false"
        />
        <img
          class="typechange"
          @click="changeType('in2')"
          :src="input2"
          alt=""
        />
      </div>
      <div class="tips">{{ tips }}</div>
      <div class="commit_button" @click="submit">SURE</div>
    </div>
    <div class="popup_box" v-if="showForm" style="height: 23.125rem">
      <div class="title">Virtual mailbox binding</div>
      <div class="account">
        Email account:
        {{
          account.slice(0, 4) +
          "..." +
          account.slice(account.length - 4, account.length)
        }}@moontouch.io
      </div>
      <img
        v-clipboard:copy="copyaccount"
        v-clipboard:success="copyed"
        class="copy"
        src="../../assets/web/home/icon/copyblack.webp"
        alt=""
      />
      <div class="fix_succse">Virtual mailbox binding has been completed</div>
      <div class="tips_buttom">
        <p>If you forgot your password,</p>
        <p>
          go to
          <a
            href="https://discord.gg/tdSdxvVw"
            target="_blank"
            style="color: #00a1fc"
            >Discord</a
          >
          and contact MT administrator to retrieve it.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { walletFix, getAccountFixStatus } from "../../apis/login";
export default {
  data() {
    return {
      visable: false,
      account: store.getters.currentWalletAddress,
      copyaccount: store.getters.currentWalletAddress + "@moontouch.io",
      input1: require("../../assets/web/home/icon/password.webp"),
      input2: require("../../assets/web/home/icon/password.webp"),
      textImg: require("../../assets/web/home/icon/text.webp"),
      passwordImg: require("../../assets/web/home/icon/password.webp"),
      password1: "",
      password2: "",
      tips: "",
      showForm: true,
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
      this.account = store.getters.currentWalletAddress;
      this.copyaccount = store.getters.currentWalletAddress + "@moontouch.io";
      if (newval == true) {
        getAccountFixStatus().then((res) => {
          this.showForm = res.data.fix;
        });
      }
    },
  },
  methods: {
    submit() {
      if (this.password1 == "" || this.password2 == "") {
        this.tips = "Please enter password";
        return;
      }
      if (this.password1 != this.password2) {
        this.tips = "The two passwords do not match";
        return;
      }
      let filter = /^(?![0-9]+$)(?=.*[A-Z])(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      let result = filter.test(this.password1);
      if (!result) {
        this.tips =
          "Password should be 8-16 digits, include number, uppercase & lowercase letter";
        return;
      }
      this.tips = "";
      let data = {
        wallet: store.getters.currentWalletAddress,
        password: this.password1,
      };
      walletFix(data)
        .then((res) => {
          this.$popup.show({
            text: "success",
            isOneButton: true,
          });
          this.onClickClose();
        })
        .catch((err) => {
          this.$popup.show({
            text: "Failed",
            isOneButton: true,
          });
        });
    },
    onClockBtnLeft() {
      this.onClickClose();
    },
    onClickClose() {
      this.visable = false;
      (this.password1 = ""), (this.password2 = "");
    },
    copyed() {
      this.$popup.show({
        text: "Copy success",
        isOneButton: true,
      });
    },
    changeType(val) {
      if (val == "in1") {
        if (this.$refs.in1.type == "text") {
          console.log(this.$refs.in1);
          this.input1 = this.passwordImg;
          this.$refs.in1.type = "password";
        } else {
          this.input1 = this.textImg;
          this.$refs.in1.type = "text";
        }
      } else {
        if (this.$refs.in2.type == "text") {
          this.input2 = this.passwordImg;
          this.$refs.in2.type = "password";
        } else {
          this.input2 = this.textImg;
          this.$refs.in2.type = "text";
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.mobile_input{
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
    height: 458px;
    margin: 0 auto;
    margin-top: 30vh;
    background: #ffffff;
    border-radius: 30px;
    .title {
      position: absolute;
      width: 398px;
      height: 61px;
      left: 181px;
      top: 37px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 700;
      font-size: 36px;
      line-height: 170%;
      /* or 61px */

      color: #060606;
    }
    .account {
      position: absolute;
      width: 530px;
      text-align: left;
      height: 40px;
      left: 105px;
      top: 119px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 170%;
      /* or 41px */

      color: #000000;
    }
    .copy {
      position: absolute;
      width: 30px;
      height: 30px;
      left: 600px;
      top: 122px;
      cursor: pointer;
    }
    .password1 {
      width: 650px;
      height: 44px;
      position: absolute;
      top: 193px;
      left: 55px;
      display: flex;
    }

    .password2 {
      width: 650px;
      height: 44px;
      position: absolute;
      top: 271px;
      left: 55px;
      display: flex;
    }
    .pastext {
      font-family: "Arial";
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 44px;
      margin-right: 4px;
      /* or 41px */
      width: 226px;
      height: 44px;
      text-align: right;
      color: #000000;
    }
    .pasinp {
      box-sizing: border-box;
      width: 420px;
      background: #ffffff;
      height: 44px;
      border: 3px solid #898989;
      border-radius: 34px;
      line-height: 44px;
      -web-kit-appearance: none;
      -moz-appearance: none;
      color: #000000;
      font-size: 24px;
      outline: 0;
      padding-left: 20px;
    }
    .pasinp::placeholder {
      color: #898989;
      font-size: 24px;
      font-family: "Arial";
      font-weight: 400;
    }
    .typechange {
      position: absolute;
      width: 30px;
      height: 30px;
      left: 600px;
      top: 8px;
      cursor: pointer;
    }
    .tips {
      position: absolute;
      width: 430px;
      height: 14px;
      left: 290px;
      top: 322px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      /* identical to box height */
      color: #d33a3a;
      text-align: left;
    }
    .commit_button {
      position: absolute;
      width: 260px;
      height: 60px;
      left: 250px;
      top: 358px;
      background: #12a2de;
      border-radius: 6px;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 40px;
      line-height: 60px;
      text-align: center;
      color: #ffffff;
      cursor: pointer;
    }
    .fix_succse {
      position: absolute;
      width: 503px;
      height: 41px;
      left: 105px;
      top: 183px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 170%;
      /* identical to box height, or 41px */

      color: #000000;
    }
    .tips_buttom {
      position: absolute;
      width: 731px;
      height: 80px;
      left: 14;
      top: 290px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 20px;
      /* or 111% */

      text-align: center;

      color: #616161;
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
