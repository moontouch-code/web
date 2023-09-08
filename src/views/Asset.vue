<!-- <template>
  <div class="asset">
    <div class="userinfo">
      <img
        v-if="!isMobile"
        class="userinfo_title_bg"
        src="@/assets/web/login/login_title_new.webp"
        alt=""
      />
      <img 
        v-else
        class="userinfo_title_bg"
        src="@/assets/h5/asset/title_bg.png"
        alt=""
        />
      <div class="userinfo_title_bg2">
        <h2 class="userinfo_title text_shadow_pink">personal</h2>
      </div>

      <div class="userinfo_base">
        <div class="name">
          <h3 class="text_shadow_pink">name</h3>
          <p class="text_shadow_yellow">Seeker</p>
        </div>
        <div v-if="!walletAddress" class="mail">
          <div class="mail_address">
            <h3 class="text_pink">e-mail</h3>
            <p class="text_yellow">{{email}}</p>
          </div>
          
          <div class="deposit_address">
            <p>
              Deposit wallet address:
            </p>
            <div id="mail_address_copy">
              <input
                class="text_shadow_yellow"
                type="text"
                readonly="readonly"
                v-model="depositWalletAddressForShow"
                style="border: none"
              />
              <img
                id="copy"
                src="@/assets/web/asset/copy.webp"
                alt=""
                v-clipboard="() => depositWalletAddress"
                v-clipboard:success="onCopyWalletAddress"
              />
            </div>
          </div>
        </div>
        <div v-else class="address">
          <h3 class="text_pink">
            The wallet address used for registration:
          </h3>
          <div id="address_copy">
            <input
              class="text_shadow_yellow"
              type="text"
              readonly="readonly"
              v-model="walletAddressForShow"
              style="border: none"
            />
            <img
              id="copy"
              src="@/assets/web/asset/copy.webp"
              alt=""
              v-clipboard="() => walletAddress"
              v-clipboard:success="onCopyWalletAddress"
            />
          </div>

          <h3 class="text_pink">
            Deposit wallet address:
          </h3>
          <div id="address_copy">
            <input
              class="text_shadow_yellow"
              type="text"
              readonly="readonly"
              v-model="depositWalletAddressForShow"
              style="border: none"
            />
            <img
              id="copy"
              src="@/assets/web/asset/copy.webp"
              alt=""
              v-clipboard="() => depositWalletAddress"
              v-clipboard:success="onCopyWalletAddress"
            />
          </div>

          <h3 class="text_pink_bind_email"  v-show="isBindEmail">
            Notify E-mail address:
          </h3>
          <div id="text_bind_email">
            <input
              class="text_shadow_yellow"
              type="text"
              readonly="readonly"
              v-model="bindEmail"
              style="border: none"
            />
          </div>
        </div>
        
        <div class="button" v-if="!walletAddress">
          <button class="logout" @click="clickLogout">
            <p>Logout</p>
          </button>
        </div>
        <div class="button" v-else-if="!isBindEmail">
          <button class="logout" @click="clickBindEmail">
            <p>bindemail</p>
          </button>
          <button class="logout" @click="clickLogout">
            <p>Logout</p>
          </button>
        </div>
        <div class="button" v-else-if="isBindEmail">
          <button class="logout" @click="clickLogout">
            <p>Logout</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { requestLogout } from "@/apis/login.js";
export default {
  data() {
    return {
      walletAddress: "",
      walletAddressForShow: "",
      depositWalletAddress: "",
      depositWalletAddressForShow: "",
      email:null,
      bindEmail: "",
      isBindCode:false,
      activationTipsList:[
        {
          code:1,
          message:this.$t('invalid')
        },
        {
          code:2,
          message:this.$t('used')
        },
        {
          code:3,
          message:this.$t('expired')
        },
        {
          code:4,
          message:this.$t('activation')
        },

      ]
    };
  },
  computed: {
    isMobile() {
      return store.getters.isMobile;
    },
    isRegister() {
      return store.getters.isRegister;
    },
    isBindEmail() {
      return (store.getters.bindEmail != "" && store.getters.bindEmail != null);
    }
  },
  mounted() {
    this.walletAddress = store.getters.currentWalletAddress;
    this.walletAddressForShow = this.walletAddress.substring(0,5) + "..." + this.walletAddress.substring(this.walletAddress.length - 4);
    this.depositWalletAddress = store.getters.depositWalletAddress;
    this.depositWalletAddressForShow = this.depositWalletAddress.substring(0,5) + "..." + this.depositWalletAddress.substring(this.depositWalletAddress.length - 4);
    this.email = store.getters.curEmail;
    this.bindEmail = store.getters.bindEmail;
    this.showBind();
  },
  methods: {
    clickLogout() {
      requestLogout()
        .then((res) => {
          this.$emit("logOut", false);
        })
        .catch((err) => {
          this.$emit("logOut", false);
        });
    },
    clickBindEmail() {
      this.$popupBind.show({bindCallback:this.bindCallback, bindTips:this.$t("BIND_TIPS")});
    },
    onCopyWalletAddress() {
      this.$popup.show({ text: this.$t('copySuccessfully') });
    },
    clickActivationCode(){
      this.$popup.show({
        title: this.$t('enterActivityCode'),
        isBindActivityCode:true,
        btnFunLeft: this.bindActivityCode,
      });
    },
    bindActivityCode(){
      setTimeout(()=>{
        let code = 4
        this.sendActavityCodeReturnResults(code)
        if(code == 0){
          store.commit("setActavityCode", "");
        }
      },2000)
    },
    sendActavityCodeReturnResults(code){
      let message = this.$t('activated')
      for (let index = 0; index < this.activationTipsList.length; index++) {
          if(code == this.activationTipsList[index].code){
            message = this.activationTipsList[index].message
          }
      }
      this.$popup.show({ title: "Tips", text:message });
    },
    showBind() {
      if (this.isRegister) {
        this.$popupBind.show({bindCallback:this.bindCallback, bindTips:this.$t("BIND_TIPS")});
      }
    },
    bindCallback() {
      this.$popup.show({
        title: "Tips",
        text: "Bind E-mail success!",
      });
      this.bindEmail = store.getters.bindEmail
      store.commit("setRegister", false)
    }
  },
};
</script>

<style lang="scss" scoped>
.asset {
  width: 100%;
  height: 940px;
  background: url("../assets/web/login/login_bg_new.webp") no-repeat
    center/cover;
  .userinfo {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .userinfo_title_bg {
      width: 1116px;
      height: 115px;
      margin: 0 auto;
    }
    .userinfo_title_bg2 {
      width: 1043px;
      height: 114px;
      background: url("../assets/web/login/login_title_new2.webp") no-repeat
        center/cover;
      margin: 0 auto;
      margin-top: 26px;
      .userinfo_title {
        margin-top: 25px;
        font-size: 50px;
        font-family: adam;
        font-weight: 400;
        color: #ffffff;
      }
    }
    .userinfo_base {
      width: 842px;
      height: 512px;
      background: url("../assets/web/login/login_content_bg_new.webp") no-repeat
        center/cover;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .name {
        display: flex;
        align-items: center;
        height: 28px;
        margin: 25px 0;
        letter-spacing: -4px;
        > h3 {
          font-size: 50px;
          font-family: OratorStd;
          font-weight: 500;
          color: #ffffff;
        }
        > p {
          margin-top:-9px;
          margin-left: 13px;
          font-size: 30px;
          font-family: YuGothicUI;
          font-weight: 400;
          color: #ffffff;
          letter-spacing: 1px;
        }
      }
      .mail {
        display: flex;
        flex-direction: column;
        height: 68px;
        margin-bottom: 180px;
        .mail_address {
          display: flex;
          align-items: center;
          .text_pink {
            font-size: 40px;
            font-family: OratorStd;
            font-weight: 500;
            color: #ffffff;
            text-shadow: 0.2rem 0rem 0.5rem #d45cdf, -0.2rem 0rem 0.5rem #d45cdf,
              0rem 0.2rem 0.5rem #d45cdf, 0rem -0.2rem 0.5rem #d45cdf;
          }
          .text_yellow {
            margin-left: 13px;
            margin-top: -7px;
            font-size: 30px;
            font-family: YuGothicUI;
            font-weight: 400;
            letter-spacing: 1px;
            color: #ffffff;
            text-shadow: 0.2rem 0rem 0.5rem #bea170, -0.2rem 0rem 0.5rem #bea170,
              0rem 0.2rem 0.5rem #bea170, 0rem -0.2rem 0.5rem #bea170;
          }
        }
        .deposit_address {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          > p {
            margin-left: 50px;
            font-size: 30px;
            font-family: YuGothicUI;
            font-weight: 400;
            color: #ffffff;
            transform: translate(-16%);
            color: #fff;
            text-shadow: 0.2rem 0rem 0.5rem #d45cdf, -0.2rem 0rem 0.5rem #d45cdf,
              0rem 0.2rem 0.5rem #d45cdf, 0rem -0.2rem 0.5rem #d45cdf;
          }
          #mail_address_copy {
            display: flex;
            margin-left: 25px;
            // transform: translate(70%);
            > input {
              width: 160px;
              font-size: 30px;
              font-family: YuGothicUI;
              font-weight: 400;
              color: #ffffff;
              line-height: 47px;
              background-color: transparent;
            }
            #copy {
              width: 42px;
              height: 42px;
            }
          }
        }
      }
      .address {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 68px;
        margin-bottom: 180px;
        > h3 {
          font-size: 30px;
          font-family: YuGothicUI;
          font-weight: 400;
          color: #ffffff;
          text-shadow: 0.2rem 0rem 0.5rem #d45cdf, -0.2rem 0rem 0.5rem #d45cdf,
            0rem 0.2rem 0.5rem #d45cdf, 0rem -0.2rem 0.5rem #d45cdf;
        }
        #address_copy {
          display: flex;
          justify-content: center;
          align-items: center;
          > input {
            width: 160px;
            font-size: 30px;
            font-family: YuGothicUI;
            font-weight: 400;
            color: #ffffff;
            line-height: 47px;
            background-color: transparent;
          }
          #copy {
            cursor: pointer;
            width: 42px;
            height: 42px;
          }
        }
        .text_pink_bind_email {
            margin-top: 10px;
        }
        #text_bind_email {
          display: flex;
          justify-content: center;
          align-items: center;
          > input {
            text-align: center;
            width: 500px;
            font-size: 30px;
            font-family: YuGothicUI;
            font-weight: 400;
            color: #ffffff;
            line-height: 47px;
            background-color: transparent;
          }
        }
      }
      .button {
        width: 100%;
        bottom: 15%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        > button {
          margin: 0 43px;
          width: 214px;
          height: 61px;
          border-style: none;
        }
        .logout {
          cursor: pointer;
          width: 214px;
          height: 61px;
          background: url("../assets/web/asset/logout.webp") no-repeat;
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          > p {
            margin-top: 0;
            text-shadow: 0.2rem 0rem 0.2rem #6094db, -0.2rem 0rem 0.2rem #6094db,
              0rem 0.2rem 0.2rem #6094db, 0rem -0.2rem 0.2rem #6094db;
          }
        }
        p {
          margin-top: -3%;
          font-size: 30px;
          font-family: adam;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
  }
  .text_shadow_pink {
    color: #fff;
    text-shadow: 0.2rem 0rem 0.5rem #d45cdf, -0.2rem 0rem 0.5rem #d45cdf,
      0rem 0.2rem 0.5rem #d45cdf, 0rem -0.2rem 0.5rem #d45cdf;
  }
  .text_shadow_pink_1 {
    display: flex;
    justify-content: left;
    transform: translate(20%);
    color: #fff;
    text-shadow: 0.2rem 0rem 0.5rem #d45cdf, -0.2rem 0rem 0.5rem #d45cdf,
      0rem 0.2rem 0.5rem #d45cdf, 0rem -0.2rem 0.5rem #d45cdf;
  }
  .text_shadow_yellow {
    color: #e2c664;
    text-shadow: 0.2rem 0rem 0.5rem #bea170, -0.2rem 0rem 0.5rem #bea170,
      0rem 0.2rem 0.5rem #bea170, 0rem -0.2rem 0.5rem #bea170;
  }
}
@media all and (orientation: portrait) {
  .asset {
    .userinfo {
      .userinfo_title_bg {
        width: 631px;
        height: 322px;
      }
      .userinfo_title_bg2 {
        width: 750px;
        height: 95px;
        background: url("../assets/web/login/login_title_new2.webp") no-repeat
          center/cover;
          background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 64px;
        .userinfo_title  {
          margin-top: 6px;
          font-size: 36px;
        }
      }
      
      .userinfo_base {
        width: 750px;
        height: 555px;
        background: url("../assets/web/login/login_content_bg_new.webp") no-repeat
        center/cover;
        background-size: 100% 100%;
        .name {
          h3 {
            font-size: 50px;
          }
          p {
            font-size: 30px;
          }
        }
        .mail {
          .deposit_address {
            #mail_address_copy {
              margin-left: -15px;
            }
          }
        }
        .address {
          h3 {
            margin-left: -50px;
            font-size: 30px;
          }
        }
        .button {
          margin-top: 50px;
        }
      }
    }
  }
 }
</style> -->