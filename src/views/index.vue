<template>
  <div class="main">
    <div class="bg"></div>
    <div class="flex-wrapper-two">
      <div class="icon" @click="toHome">
        <div class="icon_img"></div>
        <div class="icon_text">MOON TOUCH</div>
      </div>

      <div class="linkType">
        <div class="linkIcon"></div>
        <div class="linkContent">
          <p class="pre-sale" @click="comingSonn">PRE-SALE</p>
          <p class="wihtepaper" @click="comingSonn">WHITEPAPER</p>
        </div>
      </div>
      <div class="wallet" v-if="!isConnectWallet">
        <p @click="connectWallet">Connect</p>
      </div>
      <div v-else class="photo">
        <img src="../assets/web/index/photo.png" alt="" />
        <p>{{ walltAdress }}</p>
        <div class="walltContent" @click="logout" ref="logout">logout</div>
      </div>
      <div class="language">
        <div class="lang" @click="changeLang(0)">
          <img class="langItem" :src="langimgList[language]" alt="" />
        </div>
        <div class="lang">
          <img
            @click="changeLang(1)"
            class="langItem"
            :src="
              langimgList[
                Object.keys(langimgList).filter((item) => item != language)[0]
              ]
            "
            alt=""
          />
        </div>
      </div>
      <!-- <div v-else class="language_mobile">
        <img :src="langimgList[language]" alt="">
        <img class="mobile_change" src="../assets/web/home/icon/mobile_changelang.png" alt="" @click="changeLang(1)">
      </div> -->
    </div>

    <router-view></router-view>
    <div class="logout_toast" ref="logoutToast">
      <img src="../assets/web/index/logout_toast.png" alt="" />
      <p>You have been logged out successfully.</p>
    </div>
  </div>
</template>

<script>
import {
  detect,
  cleanLoginState,
  initWalletEventListener,
  removeWalletEventListener,
} from "@/wallet/detectProvider.js";
import { requestLogout } from "@/apis/login.js";
export default {
  name: "index",
  data() {
    return {
      language: "en",
      langimgList: {
        en: require("../assets/web/home/icon/eng.png"),
        ja: require("../assets/web/home/icon/jap.png"),
      },
    };
  },
  methods: {
    changeLang(type) {
      if (type == 0) return;
      this.language == "en" ? (this.language = "ja") : (this.language = "en");
    },
    connectWallet() {
      if (this.isConnectWallet) {
      } else {
        localStorage.setItem("wallet", "Metamask");
        if (this.$store.getters.isConnectWallet === true && this.isConnect) {
          this.$router.push("/");
        } else {
          if (window.ethereum != undefined) {
            detect();
          } else {
            this.$store.commit("setInstallWalletState", 0);
            if (this.isMobile) {
              window.location.href =
                "https://metamask.app.link/dapp/www.moontouch.io/";
            } else {
            }
          }
        }
      }
    },
    logout() {
      requestLogout()
        .then((res) => {
          cleanLoginState();
          removeWalletEventListener();
        })
        .catch((err) => {
          cleanLoginState();
          removeWalletEventListener();
        });
      this.$refs.logoutToast.classList.add("toast_ani");
      let _self = this;
      setTimeout(() => {
        _self.$refs.logoutToast.classList.remove("toast_ani");
      }, 3000);
    },
    comingSonn() {
      this.$popup.show({
        text: "COMING SOON！",
        isOneButton: true,
      });
    },
    toHome() {
      this.$router.push({ path: "/home" });
    },
  },
  computed: {
    isMobile() {
      this.$store.commit("setMobile");
      return this.$store.state.isMobile;
    },
    walltAdress() {
      return (
        this.$store.state.currentWalletAddress.slice(0, 4) +
        "..." +
        this.$store.state.currentWalletAddress.slice(
          this.$store.state.currentWalletAddress.length - 4,
          this.$store.state.currentWalletAddress.length
        )
      );
    },
    isConnectWallet() {
      return this.$store.state.isConnectWallet;
    },
  },
  mounted() {
    document.body.addEventListener('touchstart',function(){
      
    })
  },
};
</script>

<style lang="scss" scoped>
@keyframes toastShow {
  0% {
    bottom: -50px;
  }
  10% {
    bottom: 44px;
  }
  90% {
    bottom: 44px;
  }
  100% {
    bottom: -50px;
  }
}
.toast_ani {
  animation: toastShow 3s linear;
}
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .bg {
    width: 100%;
    height: 100%;
    top: 60px;
    background: url("../assets/web/index/index_bg.webp") no-repeat center/cover;
    position: fixed;
  }
  .logout_toast {
    position: fixed;
    width: 374px;
    height: 50px;
    left: 1467px;
    bottom: -50px;
    z-index: 10;
    background: #ffffff;
    border-radius: 8px;
    img {
      position: absolute;
      width: 34px;
      height: 34px;
      left: 16px;
      top: 8px;
    }
    p {
      position: absolute;
      width: 302px;
      height: 16px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      /* identical to box height */
      letter-spacing: 0.07em;
      color: #000000;
      left: 62px;
      top: 17px;
    }
  }
}
.flex-wrapper-two {
  background-color: rgba(1, 10, 19, 1);
  padding: 11px 173px 8.5px 179px;
  height: 60px;
  width: 100%;
  position: fixed;
  z-index: 11;
}
.icon {
  position: absolute;
  width: 207px;
  height: 29px;
  left: 76px;
  top: 14px;
  cursor: pointer;
  .icon_img {
    position: absolute;
    width: 34px;
    height: 29px;
    left: 0px;
    top: 0px;
    background: url("../assets/web/home/icon/footet_icon.png") no-repeat
      center/contain;
  }
  .icon_text {
    position: absolute;
    width: 200px;
    height: 22px;
    left: 39px;
    top: 6px;
    font-family: "ADAMa";
    text-align: left;
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 22px;
    /* identical to box height */

    letter-spacing: 0.07em;

    color: #ffffff;
  }
}
.pre-sale {
  position: absolute;
  width: 170px;
  height: 30px;
  left: 0px;
  top: 18px;
  font-family: "ADAMa";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  /* identical to box height */

  letter-spacing: 0.07em;

  color: #ffffff;
}
.wihtepaper {
  position: absolute;
  width: 206px;
  height: 30px;
  left: 0px;
  top: 60px;
  font-family: "ADAMa";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  /* identical to box height */

  letter-spacing: 0.07em;

  color: #ffffff;
}
.wallet {
  background: url("../assets/web/home/icon/wallt.png") no-repeat center/cover;
  position: absolute;
  width: 135px;
  height: 39px;
  left: 1612px;
  top: 11px;
  font-size: 20px;
  line-height: 39px;
  color: #ffffff;
  font-family: "ADAMa";
  cursor: pointer;
}
.photo {
  position: absolute;
  width: 135px;
  height: 39px;
  left: 1612px;
  cursor: pointer;
  img {
    width: 35px;
    height: 35px;
    position: absolute;
    top: 2px;
  }
  p {
    font-family: "ADAMa";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: #ffffff;
    position: absolute;
    left: 46px;
    top: 12px;
  }
  .walltContent {
    width: 145px;
    height: 0px;
    position: absolute;
    top: 49px;
    left: 0px;
    background: #010a13;
    transition: height 0.2s linear;
    overflow: hidden;
    border-radius: 0px 0px 10px 10px;
    line-height: 40px;
    font-size: 20px;
    line-height: 39px;
    text-align: center;
    color: #ffffff;
    font-family: "ADAMa";
  }
}
.photo:hover .walltContent {
  height: 40px;
}
.linkType {
  width: 60px;
  height: 60px;
  position: absolute;
  left: 1550px;
  top: 0px;
  cursor: pointer;
}
.linkIcon {
  width: 30px;
  height: 20px;
  position: absolute;
  left: 0px;
  top: 20px;
  background: url("../assets/web/home/icon/title_link.png") no-repeat
    center/cover;
}
.linkType:hover .linkContent {
  height: 100px;
}
.linkContent {
  width: 210px;
  height: 0px;
  position: fixed;
  top: 40px;
  left: 1380px;
  background: #010a13;
  transition: height 0.3s linear;
  overflow: hidden;
  border-radius: 25px;
}
.language {
  position: absolute;
  width: 86px;
  height: 30px;
  left: 1770px;
  top: 13px;
  background: #010a13;
  border-radius: 25px;
  justify-content: space-between;
  overflow: hidden;
  transition: height 0.2s linear;
  .lang {
    width: 86px;
    height: 45px;
    position: relative;
    img {
      width: 42px;
      height: 22px;
      position: absolute;
      top: 7px;
      left: 22px;
    }
  }
  // .lang:nth-child(1):after {
  //   content: "";
  //   width: 8px;
  //   height: 8px;
  //   border: solid #fff;
  //   border-width: 3px 0 0 3px;
  //   transform: translate(-50%, -50%) rotate(-135deg);
  //   transition: all 0.2s linear;
  //   position: absolute;
  //   right: -1px;
  //   top: 16px;
  // }
}
// .language:hover {
//   height: 100px;
//   cursor: pointer;
// }
.language:hover .lang:nth-child(1):after {
  transform: translate(-50%, -50%) rotate(45deg);
}
@media only screen and (max-width: 1100px) {
  .main {
    .bg {
      width: 100%;
      height: 940px;
      top: 44px;
      background: url("../assets/web/index/index_bg.webp") no-repeat
        center/cover;
      position: fixed;
    }
    .logout_toast {
      position: fixed;
      width: 263px;
      height: 41px;
      left: 64px;
      bottom: -50px;
      z-index: 10;
      background: #ffffff;
      border-radius: 8px;
      img {
        position: absolute;
        width: 21px;
        height: 21px;
        left: 10px;
        top: 10px;
      }
      p {
        position: absolute;
        width: 300px;
        height: 11px;
        font-family: "Arial";
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        text-align: left;
        line-height: 11px;
        letter-spacing: 0.07em;
        transform: scale(0.85);
        /* identical to box height */
        letter-spacing: 0.07em;
        color: #000000;
        left: 15px;
        top: 15px;
      }
    }
  }
  .flex-wrapper-two {
    width: 100%;
    height: 44px;
    left: 0px;
    background: #010a13;
    position: fixed;
    z-index: 10;
    .icon {
      position: absolute;
      width: 71px;
      height: 24px;
      left: 18px;
      top: 12px;
      .icon_img {
        position: absolute;
        width: 26px;
        height: 21px;
        left: 0px;
        top: 0px;
      }
      .icon_text {
        position: absolute;
        width: 45px;
        height: 24px;
        left: 28px;
        top: 0px;
        font-family: "ADAMa";
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 12px;
        letter-spacing: 0.07em;
        color: #ffffff;
      }
    }
    .pre-sale {
      position: absolute;
      width: 170px;
      height: 30px;
      left: 30px;
      top: 5px;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 30px;
      /* identical to box height */

      letter-spacing: 0.07em;

      color: #ffffff;
    }
    .wihtepaper {
      position: absolute;
      width: 206px;
      height: 30px;
      left: 170px;
      top: 5px;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 30px;
      /* identical to box height */

      letter-spacing: 0.07em;

      color: #ffffff;
    }
    .wallet {
      position: absolute;
      width: 80px;
      height: 23px;
      left: 293px;
      top: 11px;
      font-size: 12px;
      line-height: 23px;
    }
    .photo {
      position: absolute;
      width: 135px;
      height: 39px;
      left: 293px;
      cursor: pointer;
      img {
        width: 23px;
        height: 23px;
        position: absolute;
        top: 0px;
      }
      p {
        font-family: "ADAMa";
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 12px;
        color: #ffffff;
        position: absolute;
        left: 23px;
        top: 7px;
        transform: scale(0.8);
      }
      .walltContent {
        width: 95px;
        height: 0px;
        position: absolute;
        top: 32px;
        left: -2px;
        background: #010a13;
        transition: height 0.2s linear;
        overflow: hidden;
        border-radius: 0px 0px 10px 10px;
        line-height: 40px;
        font-size: 16px;
        line-height: 30px;
        text-align: center;
      }
    }
    .photo:hover .walltContent {
      height: 30px;
    }
    .linkType {
      width: 38px;
      height: 38px;
      position: absolute;
      left: 245px;
      top: 0px;
      cursor: pointer;
    }
    .linkIcon {
      width: 25px;
      height: 16px;
      position: absolute;
      left: 0px;
      top: 14px;
      background: url("../assets/web/home/icon/title_link.png") no-repeat
        center/cover;
    }
    .linkContent {
      width: 390px;
      height: 0px;
      position: fixed;
      top: 36px;
      left: 0px;
      background: #010a13;
      transition: height 0.3s linear;
      overflow: hidden;
      border-radius: 10px;
    }
    .linkType:hover .linkContent {
      height: 36px;
    }
    .language_mobile {
      width: 25px;
      height: 13px;
      position: absolute;
      left: 191px;
      top: 16px;
      img {
        width: 25px;
        height: 13px;
      }
      .mobile_change {
        width: 11px;
        height: 13px;
        position: absolute;
        left: 30px;
        top: 0px;
      }
    }
    .language {
      position: absolute;
      width: 50px;
      height: 25px;
      left: 191px;
      top: 10px;
      background: #010a13;
      border-radius: 10px;
      justify-content: space-between;
      overflow: hidden;
      transition: height 0.2s linear;
      .lang {
        width: 30px;
        height: 20px;
        position: relative;
        img {
          width: 25px;
          height: 13px;
          position: absolute;
          left: 5px;
        }
      }
      // .lang:nth-child(1):after {
      //   content: "";
      //   width: 5px;
      //   height: 5px;
      //   border: solid #fff;
      //   border-width: 3px 0 0 3px;
      //   transform: translate(-50%, -50%) rotate(-135deg);
      //   transition: all 0.2s linear;
      //   position: absolute;
      //   left: 40px;
      //   top: 12px;
      // }
    }
  }
  // .language:hover {
  //   height: 50px;
  //   cursor: pointer;
  // }
  .language:hover .lang:nth-child(1):after {
    transform: translate(-50%, -50%) rotate(45deg);
    top: 16px;
  }
}
</style>
