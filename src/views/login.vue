<template>
  <div class="login">
    <div class="login_content">
      <img
        v-if="isMobile"
        class="login_title_bg"
        src="@/assets/h5/login/login_title_new.png"
        alt=""
      />
      <img
        v-else
        class="login_title_bg"
        src="@/assets/web/login/login_title_new.webp"
        alt=""
      />

      <div class="login_title_bg2">
        <h2
          class="login_title_1 text_shadow_pink"
          v-if="loginState == 0 || loginState == 1 || loginState == 4"
        >
          LOGIN
        </h2>
        <h2
          class="login_title_2 text_shadow_pink"
          v-if="loginState == 2 || loginState == 3"
        >
          {{titleText}}
        </h2>
      </div>
      
      <div class="login_base" v-if="loginState == 0">
        <p class="titletext">Login Via</p>
        <div class="wallet" @click="chooseWallet()">
        </div>
        <!-- <div class="email" @click="chooseEmail()">
        </div> -->
        <div v-show="isThirdLogin" class="invite">FROM: {{thirdUserToken}}</div>
      </div>
     
      <div class="login_enter" v-if="loginState == 1">
        <div
          class="login_back"
          @click="onClickGoBack"
        ></div>
        <div class="enter_info">
          <el-form
            :model="loginRuleForm"
            status-icon:false
            :rules="rules"
            ref="loginRuleForm"
            label-width="100px"
            class="demo-loginRuleForm"
          >
            <div class="email_box">
              <h3 class="text_shadow_yellow">mt account</h3>
              <el-form-item label="" prop="email">
                <el-input
                  v-model="loginRuleForm.email"
                  placeholder="Email"
                ></el-input>
              </el-form-item>
            </div>
            <div class="email_box_1">
              <h3 class="text_shadow_yellow">PASSWORD</h3>
              <el-form-item label="" prop="pass">
                <el-input
                  v-model="loginRuleForm.pass"
                  placeholder="Password"
                  id="input_code"
                  type="password"
                  oninput="if(value.length>16)value=value.slice(0,16)"
                ></el-input>
                <img :src="imgUrl" alt="" id="login_img" @click="hideShowPsw" />
                <p @click="onClickForgotPassword">Forgot password</p>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="enten_btn">
          <div class="btn_b" @click="onClickLogin('loginRuleForm')">
            <p class="text_shadow_blue">LOGIN</p>
          </div>
        </div>
        <div class="register_email text_shadow_yellow">
          <p class="register_email_1" @click="onclickRegister">
            Create my MT account
          </p>
        </div>
      </div>
      
      <div class="login_mailbox" v-if="loginState == 2 || loginState == 3">
        <div class="login_back" @click="onClickGoBack" ></div>
        <el-form
          :model="ruleForm"
          status-icon:false
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="register_email_box">
            <h3 class="register_title_1 text_shadow_yellow">E-MAIL</h3>
            <el-form-item label="" prop="email">
              <el-input v-model="ruleForm.email" placeholder="Email"></el-input>
            </el-form-item>
          </div>

          <div class="register_email_box">
            <h3 class="register_title_3 text_shadow_yellow">
              VERINFICATION CODE
            </h3>
            <el-form-item class="register_email_send" label="" prop="code">
              <el-input
                class="code_input"
                v-model="ruleForm.code"
                placeholder="Verification code"
              ></el-input>
            </el-form-item>
            <el-button
              v-if="!isClickCode"
              class="code_button text_shadow_blue"
              type="text"
              @click="onClickSendCode('ruleForm', loginState)"
              >SEND</el-button
            >
            <el-button
              v-else
              class="code_button_click text_shadow_blue"
              type="text"
              >{{ codeTime }}</el-button
            >
          </div>
          
          <div class="register_email_box">
            <h3 class="register_title_2 text_shadow_yellow">PASSWORD</h3>
            <el-form-item label="" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
                placeholder="New password"
                oninput="if(value.length>16)value=value.slice(0,16)"
              ></el-input>
            </el-form-item>
          </div>

          <div class="register_email_box">
            <h3 class="register_title_4 text_shadow_yellow">
              CONFIRM PASSWORD
            </h3>
            <el-form-item label="" prop="checkPass">
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                autocomplete="off"
                placeholder="Confirm password"
                oninput="if(value.length>16)value=value.slice(0,16)"
              ></el-input>
            </el-form-item>
          </div>

          <el-button
            class="submit_btn text_shadow_blue"
            type="text"
            @click="submitForm('ruleForm', loginState)"
            >CONFIRM</el-button
          >
        </el-form>
        <div v-show="isThirdLogin" class="login_invite">FROM: {{thirdUserToken}}</div>
      </div>

      <div class="login_success" v-if="loginState == 4">
        <p class="login_success_title text_shadow_pink">Login successful</p>
        <p class="login_success_title_1 text_shadow_pink">
          returning to the home page
        </p>
        <p class="login_success_title_2 text_shadow_pink">
          we will return after
          <span class="login_success_title_span">{{ countdown }}S</span>
        </p>
        <p class="login_success_title_3 text_shadow_pink">
          if there is no respomse please
          <span class="login_success_title_span_1" @click="onClickloginToHome"
            >click here.</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  requestVerificationCode,
  requestRegisterAccount,
  requestLogin,
  requestResetPassword,
  requestForgotPassword,
} from "@/apis/login.js";
import sharePop from "@/components/sharePop";
import store from "@/store";
import { detect } from "@/wallet/detectProvider.js";

export default {
  data() {
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please enter the verification code"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter the password"));
      } else {
        var filter = /^(?![0-9]+$)(?=.*[A-Z])(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
        var judge = filter.test(value);
        if (!judge) {
          callback(
            new Error(
              "8-16 digits, include number, uppercase & lowercase letter"
            )
          );
        } else if (this.ruleForm.checkPass !== "") {
          if (this.loginState == 0) {
            this.ruleForm.validateField("checkPass");
          } else if (this.loginState == 1) {
            this.$refs.loginRuleForm.validateField("checkPass");
          } else if (this.loginState == 3) {
            this.$refs.ruleForm.validateField("checkPass");
          } else {
            this.$refs.ruleForm.validateField("checkPass");
          }
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter password again"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("The two passwords do not match"));
      } else {
        callback();
      }
    };
    return {
      imgUrl: require("@/assets/web/login/login_hide.webp"),
      loginRuleForm: {
        email: "",
        pass: "",
      },
      ruleForm: {
        email: "",
        code: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please enter the email address",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Incorrect email address format",
            trigger: "blur",
          },
        ],
        code: [{ validator: checkCode, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      walletList: [
        {
          icon: require("@/assets/web/login/wallet/wallet_metamask.webp"),
          text: "Metamask",
        },
      ],
      loginState: 0,
      isClickCode: false,
      codeTime: 60,
      codeTimer: null,
      isEmail: false,
      isSubmit: false,
      isRegister: false,
      countdown: 5,
      countdownTemp: null,
      titleText : "Forgot password",
      isThirdLogin : true,
      thirdUserToken : "",
    };
  },
  components: {
    sharePop,
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (val.query.active == 0) {
          this.loginState = 0;
        } else if (val.query.active == 1 && val.query.tab == 1) {
          this.loginState = 1;
          this.isRegister = false;
        } else if (val.query.active == 2 && val.query.tab == 2) {
          this.loginState = 2;
          this.isRegister = true;
        } else if (val.query.active == 3 && val.query.tab == 3) {
          this.loginState = 3;
          this.isRegister = false;
        }
      },
      deep: true,
    },
  },
  computed: {
    isMobile() {
      this.$store.commit("setMobile");
      return this.$store.state.isMobile;
    },
  },
  mounted() {
    this.$bus.$on("isConnected", (judge) => {});

    if (this.$route.query.active) {
      this.loginState = this.$route.query.active;
      if (this.loginState == 2) {
        this.titleText = "Forgot password"
      } else if (this.loginState == 3) {
        this.titleText = "Register"
      }

      switch (this.$route.query.tab) {
        case "1":
          this.isRegister = false;
          break;
        case "2":
          this.isRegister = true;
          break;
      }
    }
    
    if (this.$route.query.invite) {
      this.isThirdLogin = true;
      this.thirdUserToken = this.$route.query.invite;
    } else {
      this.isThirdLogin = false;
      this.thirdUserToken = "";
    }
    
    var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent &&
               navigator.userAgent.indexOf('CriOS') == -1 &&
               navigator.userAgent.indexOf('FxiOS') == -1;
    if (isSafari) {
      let message = this.$t("Browse Experience")
      this.$popup.show({title: "Tips",text: message});
    }
  },
  methods: {
    hideShowPsw() {
      let input_code = document.getElementById("input_code");
      if (input_code.type == "password") {
        input_code.type = "text";
        this.imgUrl = require("@/assets/web/login/login_show.webp");
      } else {
        input_code.type = "password";
        this.imgUrl = require("@/assets/web/login/login_hide.webp");
      }
    },
    submitForm(formName, state) {
      this.checkAllInfo(formName);
      if (!this.isSubmit) {
        return;
      }
      if (state == 3) {
        let registerInfo = {
          channelCode: "",
          code: this.ruleForm.code,
          inviteCode: "",
          mail: this.ruleForm.email,
          password: this.ruleForm.pass,
        };
        requestRegisterAccount(registerInfo)
          .then((res) => {
            this.$popup.show({
              title: "Tips",
              text: "Account registration success!",
            });
            this.$popup.show({
              title: "Congratulations",
              text: "registration success",
              btnFunLeft: this.backToLogin,
            });
          })
          .catch((err) => {
            this.$popup.show({
              title: "Tips",
              text: err,
            });
          });
      } else {
        let findPass = {
          account: this.ruleForm.email,
          code: this.ruleForm.code,
          mail: this.ruleForm.email,
          newPassword: Buffer.from(this.ruleForm.pass).toString("base64"),
        };
        requestResetPassword(findPass)
          .then((res) => {
            console.log(res);
            this.$popup.show({
              title: "Congratulations",
              text: "Password reset complete",
              btnFunLeft: this.backToLogin,
            });
          })
          .catch((err) => {
            this.$popup.show({ title: "Tips", text: err });
            console.log(err);
          });
      }
    },
    onClickGoBack() {
      this.clearInterval();
      if (this.loginState == 2) {
        this.isShowBack = true;
        this.changeIndex(1);
        return;
      } else if (this.loginState == 3 || this.loginState == 1) {
        this.isShowBack = false;
        this.changeIndex(0);
        return;
      }
      this.$router.go(-1);
    },
    onClickLogin(formName) {
      this.$refs[formName].validate((valid) => {
        console.log("onClickLogin", valid);
        if (valid) {
          let loginInfo = {
            account: this.loginRuleForm.email,
            channelCode: "",
            credit: Buffer.from(this.loginRuleForm.pass).toString("base64"),
            inviteCode: "",
          };
          requestLogin(loginInfo)
            .then((res) => {
              this.$bus.$emit("loginpass");
              store.commit("setIsConnectWallet", true);
              store.commit("setUserToken", res.data.token);
              store.commit("setSelfInviteCode", res.data.inviteCode);
              store.commit("setCurEmail", this.loginRuleForm.email);
              store.commit("setDepositWalletAddress", res.data.integratedAddress)
            })
            .catch((err) => {
              console.log(err);
              this.$popup.show({ title: "Tips", text: err });
            });
        }
      });
    },
    onClickSendCode(formName, state) {
      this.checkEmail(formName);
      if (!this.isEmail) {
        return;
      }
      
      if (state == 3) {
        requestVerificationCode(this.ruleForm.email)
          .then((res) => {
            this.$popup.show({
              title: "Tips",
              text: "We have sent a code to your email address!",
            });
          })
          .catch((err) => {
            this.$popup.show({
              title: "Tips",
              text: err,
            });
          });
      } else {
        requestForgotPassword(this.ruleForm.email)
          .then((res) => {
            this.$popup.show({
              title: "Tips",
              text: "We have sent a code to your email address!",
            });
          })
          .catch((err) => {
            console.log("bbb", err);
            this.$popup.show({
              title: "Tips",
              text: err,
            });
          });
      }
      this.isClickCode = true;
      this.codeInterval();
    },
    codeInterval() {
      this.codeTimer = setInterval(() => {
        this.codeTime = this.codeTime - 1;
        if (this.codeTime == 0) {
          this.clearInterval();
        }
      }, 1000);
    },
    clearInterval() {
      if (this.codeTimer) {
        clearInterval(this.codeTimer);
        this.isClickCode = false;
        this.codeTime = 60;
      }
    },
    checkEmail(formName) {
      this.$refs[formName].validateField("email", (valid) => {
        if (!valid) {
          this.isEmail = true;
        } else {
          this.isEmail = false;
        }
      });
    },
    checkAllInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isSubmit = true;
        } else {
          this.isSubmit = false;
        }
      });
    },
    onclickRegister() {
      this.titleText = "Register";
      this.emailRegister();
      this.isShowBack = true;
    },
    emailRegister() {
      this.changeIndex(3);
    },
    backToLogin() {
      this.changeIndex(0);
      // this.$popupDownload.show({ title: "Tips", text: "COMING SOON!" });
    },
    onClickForgotPassword() {
      this.titleText = "Forgot password"
      this.changeIndex(2);
    },
    changeIndex(index) {
      this.loginState = index;

      if (index == 0) {
        this.$router.push("/login?active=" + index);
      } else {
        this.$router.push("/login?active=" + index + "&tab=" + index);
      }
    },
    chooseEmail() {
      this.changeIndex(1);
      this.isShowBack = true;
    },
    chooseWallet() {
      localStorage.setItem("wallet", "Metamask");
      if (this.$store.getters.isConnectWallet === true && this.isConnect) {
        this.$router.push("/");
      } else {
        if (window.ethereum != undefined) {
          detect();
        } else {
          this.$store.commit("setInstallWalletState", 0);
          if (this.isMobile) {
            window.location.href = 'https://metamask.app.link/dapp/www.moontouch.io/'
          } else {
            this.$popup.show({
              title: "Tips",
              text: "Please install wallet!",
            });
          }
        }
      }
    },
    countdownON() {
      this.countdownTemp = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          this.$router.push("/home");
          clearInterval(this.countdownTemp);
        }
      }, 1000);
    },
    onClickloginToHome() {
      clearInterval(this.countdownTemp);
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../assets/web/login/login_bg_new.webp") no-repeat
    center/cover;
  padding-top: 86px;
  overflow: hidden;
  position: relative;
  .login_content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .login_title_bg {
      width: 1116px;
      height: 115px;
      margin: 0 auto;
    }
    .login_title_bg2 {
      margin-top: 19px;
      width: 1043px;
      height: 114px;
      background: url("../assets/web/login/login_title_new2.webp") no-repeat
        center/cover;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .login_title_1,
      .login_title_2 {
        margin-top: 5px;
        width: 350px;
        font-size: 50px;
        font-family: YuGothicUI;
        font-weight: 400;
        color: #ffffff;
      }
      .login_title_2 {
        font-size: 30px;
      }
    }
    .login_base,
    .login_enter,
    .login_mailbox,
    .login_success {
      width: 842px;
      height: 486px;
      background: url("../assets/web/login/login_content_bg_new.webp") no-repeat
        center/cover;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      .login_back {
        position: absolute;
        right: -6%;
        top: 5%;
        width: 69px;
        height: 67px;
        background: url("../assets/web/login/login_back.png") no-repeat
          center/cover;
      }
    }
    .login_enter {
      height: 580px;
    }
    .login_mailbox {
      height: 680px;
      .login_invite {
        position: absolute;
        display: flex;
        align-items: right;
        justify-content: right;
        width: 80%;
        top: 85%;
        font-size: 24px;
        font-family: yugothr;
        font-weight: 400;
        color: #fff;
        text-shadow: 0.2rem 0rem 0.5rem #d45cdf, -0.2rem 0rem 0.5rem #d45cdf,
          0rem 0.2rem 0.5rem #d45cdf, 0rem -0.2rem 0.5rem #d45cdf;
        margin: 0 auto;
      }
    }
    .login_success {
      height: 397px;
    }

    .titletext {
      font-size: 40px;
      font-family: yugothr;
      font-weight: 400;
      color: #fff;
      text-shadow: 0.2rem 0rem 0.5rem #d45cdf, -0.2rem 0rem 0.5rem #d45cdf,
        0rem 0.2rem 0.5rem #d45cdf, 0rem -0.2rem 0.5rem #d45cdf;
      margin: 0 auto;
    }
    .invite {
      position: absolute;
      display: flex;
      align-items: right;
      justify-content: right;
      width: 80%;
      top: 80%;
      font-size: 24px;
      font-family: yugothr;
      font-weight: 400;
      color: #fff;
      text-shadow: 0.2rem 0rem 0.5rem #d45cdf, -0.2rem 0rem 0.5rem #d45cdf,
        0rem 0.2rem 0.5rem #d45cdf, 0rem -0.2rem 0.5rem #d45cdf;
      margin: 0 auto;
    }
    .wallet {
      width: 386px;
      height: 108px;
      margin-top: 29px;
      background: url("../assets/web/login/login_mask_new.webp");
      background-size: 100% 100%;
      margin: 0 auto;
      cursor: pointer;
    }
    .email {
      width: 386px;
      height: 108px;
      margin-top: 11px;
      background: url("../assets/web/login/login_mail_new.webp");
      background-size: 100% 100%;
      margin: 0 auto;
      cursor: pointer;
    }
    .enter_info {
      .demo-loginRuleForm {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .email_box,
        .email_box_1 {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin: 25px 0;
        }
        h3 {
          font-size: 40px;
          font-family: OratorStd;
          font-weight: 400;
          color: #f1cf0e;
          text-align: center;
          padding-top: 10px;
          margin-right: 10px;
          letter-spacing: -5px;
        }
        .el-form-item {
          width: 431px;
          height: 61px;
          font-size: 28px;
          font-family: YuGothicUI;
          font-weight: bold;
          color: #3f3c3c;
          line-height: 33px;
          text-align: left;
          margin-bottom: 0;
          ::v-deep .el-form-item__content {
            margin-left: 0 !important;
            height: 100%;
            .el-input {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              .el-input__inner {
                width: 100%;
                height: 100%;
                background: url("../assets/web/login/login_input.webp")
                  no-repeat center/cover;
                font-size: 28px;
                font-family: YuGothicUI;
                font-weight: 300;
                color: #e2c664;
                text-shadow: 0.2rem 0rem 0.5rem #bea170,
                  -0.2rem 0rem 0.5rem #bea170, 0rem 0.2rem 0.5rem #bea170,
                  0rem -0.2rem 0.5rem #bea170;
                border: none;
                padding-left: 30px;
                letter-spacing: 2px;
              }
            }
            .el-form-item__error {
              position: absolute !important;
              color: #fff !important;
              padding-left: 0px;
              top: unset;
              left: unset;
              right: 0px;
              text-align: right;
              width: 200%;
              bottom: -25px;
              font-weight: 300;
              font-size: 20px;
              text-shadow: 0.2rem 0rem 0.5rem #d45cdf,
                -0.2rem 0rem 0.5rem #d45cdf, 0rem 0.2rem 0.5rem #d45cdf,
                0rem -0.2rem 0.5rem #d45cdf;
            }
            .el-input__inner::-webkit-input-placeholder {
              color: #fff !important;
              text-shadow: unset;
            }
          }
          #login_img {
            position: absolute;
            right: 35px;
            top: 35%;
            width: 41px;
            height: 27px;
          }
          p {
            margin-top: 20px;
            padding-right: 15px;
            text-align: right;
            font-size: 20px;
            font-family: YuGothicUI;
            font-weight: 300;
            color: #e2c664;
            text-shadow: 0.2rem 0rem 0.5rem #bea170, -0.2rem 0rem 0.5rem #bea170,
              0rem 0.2rem 0.5rem #bea170, 0rem -0.2rem 0.5rem #bea170;
            cursor: pointer;
          }
        }
      }
    }
    .enten_btn {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 57px;
      .btn_b {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        width: 214px;
        height: 61px;
        background: url("../assets/web/login/login_confirm.webp") no-repeat
          center/cover;
        cursor: pointer;
        > p {
          font-size: 30px;
          font-family: adam;
          font-weight: 300;
          line-height: 55px;
        }
      }
      > p {
        font-size: 28px;
        font-family: YuGothicUI;
        font-weight: bold;
        color: #000000;
        line-height: 33px;
        margin-bottom: 20px;
      }
    }
    .register_email {
      margin-top: 15px;
      padding-right: 35px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      font-family: YuGothicUI;
      font-weight: 400;
      .register_email_1,
      .register_email_0 {
        margin-left: 35px;
        cursor: pointer;
      }
      .register_email_0 {
        margin-left: unset;
      }
    }
    .demo-ruleForm {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .register_email_box {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 15px 0;
        h3 {
          font-size: 40px;
          font-family: OratorStd;
          font-weight: 400;
          color: #f1cf0e;
          text-align: center;
          padding-top: 8px;
          box-sizing: border-box;
        }
        .register_title_1 {
          margin-left: 78px;
          margin-right: 5px;
          letter-spacing: -2px;
        }
        .register_title_2 {
          margin-left: 35px;
          margin-right: 5px;
          letter-spacing: -2px;
        }
        .register_title_3 {
          margin-left: 15px;
          margin-right: 5px;
          font-size: 25px;
          letter-spacing: -3px;
        }
        .register_title_4 {
          margin-left: -13px;
          margin-right: 5px;
          font-size: 25px;
          letter-spacing: -1px;
        }
        .code_button {
          font-size: 25px;
          font-weight: 500;
          letter-spacing: 2px;
          width: 141px;
          height: 61px;
          background: url("../assets/web/login/login_confirm.webp") no-repeat
            center/cover;
          background-size: 100% 100%;
        }
        .code_button_click {
          width: 141px;
          height: 61px;
          font-size: 30px;
          color: #fff;
          text-align: left;
          cursor: unset;
        }
      }
      .submit_btn {
        font-size: 30px;
        margin-top: 10px;
        width: 214px;
        height: 61px;
        background: url("../assets/web/login/login_confirm.webp") no-repeat
          center/cover;
        background-size: 100% 100%;
      }
      .el-form-item {
        width: 431px;
        height: 61px;
        font-size: 28px;
        font-family: YuGothicUI;
        font-weight: bold;
        color: #3f3c3c;
        line-height: 33px;
        text-align: left;
        margin-bottom: 0;
        ::v-deep .el-form-item__content {
          margin-left: 0 !important;
          height: 100%;
          width: 100%;
          .el-input {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            .el-input__inner {
              width: 100%;
              height: 100%;
              background: url("../assets/web/login/login_input.webp") no-repeat
                center/cover;
              background-size: 100% 100%;
              font-size: 28px;
              font-family: YuGothicUI;
              font-weight: 300;
              border: none;
              padding-left: 30px;
              letter-spacing: 2px;
              color: #e2c664;
              text-shadow: 0.2rem 0rem 0.5rem #bea170,
                -0.2rem 0rem 0.5rem #bea170, 0rem 0.2rem 0.5rem #bea170,
                0rem -0.2rem 0.5rem #bea170;
            }
          }
          .el-form-item__error {
            position: absolute !important;
            color: #fff !important;
            padding-left: 0px;
            top: unset;
            left: unset;
            right: 0px;
            text-align: right;
            bottom: -23px;
            font-weight: 300;
            width: 200%;
            font-size: 20px;
            text-shadow: 0.2rem 0rem 0.5rem #d45cdf, -0.2rem 0rem 0.5rem #d45cdf,
              0rem 0.2rem 0.5rem #d45cdf, 0rem -0.2rem 0.5rem #d45cdf;
          }
          .el-input__inner::-webkit-input-placeholder {
            color: #fff !important;
            text-shadow: unset !important;
          }
        }
      }
      .register_email_send {
        width: 310px;
      }
    }
    .login_success_title {
      font-size: 50px;
      font-family: YuGothicUI;
      font-weight: 400;
    }
    .login_success_title_1 {
      margin-top: 33px;
      font-size: 30px;
      font-family: YuGothicUI;
      font-weight: 400;
    }
    .login_success_title_2,
    .login_success_title_3 {
      margin-top: 20px;
      font-size: 30px;
      font-family: YuGothicUI;
      font-weight: 400;
    }
    .login_success_title_span,
    .login_success_title_span_1 {
      font-size: 36px;
      font-family: YuGothicUI;
      font-weight: 400;
      color: #fff;
      text-shadow: 0.2rem 0rem 0.5rem #c2a46e, -0.2rem 0rem 0.5rem #c2a46e,
        0rem 0.2rem 0.5rem #c2a46e, 0rem -0.2rem 0.5rem #c2a46e;
    }
    .login_success_title_span_1 {
      font-size: 30px;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .text_shadow_pink {
    color: #fff;
    text-shadow: 0.2rem 0rem 0.5rem #d45cdf, -0.2rem 0rem 0.5rem #d45cdf,
      0rem 0.2rem 0.5rem #d45cdf, 0rem -0.2rem 0.5rem #d45cdf;
  }
  .text_shadow_yellow {
    color: #e2c664;
    text-shadow: 0.2rem 0rem 0.5rem #bea170, -0.2rem 0rem 0.5rem #bea170,
      0rem 0.2rem 0.5rem #bea170, 0rem -0.2rem 0.5rem #bea170;
  }
  .text_shadow_blue {
    color: #fff;
    text-shadow: 0.2rem 0rem 0.5rem #6c8ff6, -0.2rem 0rem 0.5rem #6c8ff6,
      0rem 0.2rem 0.5rem #6c8ff6, 0rem -0.2rem 0.5rem #6c8ff6;
  }
}

@media all and (orientation: portrait) {
  .login {
    .login_content {
      .login_title_bg {
        width: 631px;
        height: 322px;
      }
      .login_title_bg2 {
        width: 750px;
        height: 95px;
        .login_title_1 {
          font-size: 36px;
        }
        .login_title_2 {
          font-size: 25px;
        }
      }
      .login_base,
      .login_enter,
      .login_mailbox,
      .login_success {
        width: 750px;
        height: 555px;
        .login_back {
          right: 2%;
          top: -6%;
        }
        .enten_btn {
          .btn_b {
            p {
              line-height: 65px;
            }
          }
        }
      }
      .login_mailbox {
        height: 630px;
      }
    }
  }
}
</style>