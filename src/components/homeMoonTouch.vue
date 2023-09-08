<template>
  <div>
    <div class="home_main" ref="main">
      <canvas id="canvas" ref="canvas" v-show="!isMobile"></canvas>
      <div
        class="mobile_activity_mask"
        v-if="mobileActivityShow"
        @click="mobileActivityShow = false"
        @touchmove.prevent
        @mousewheel.prevent
      >
        <div class="activity_box">
          <div class="activity_title">news</div>
          <div class="activity_content">
            <div class="activity_item" @click="toActivity">
              <img src="../assets/web/home/page1/activity1.webp" alt="" />
              <div class="activity_button">GO</div>
            </div>
            <div class="activity_item" @click="toActivity2">
              <img src="../assets/web/home/page1/activity2.webp" alt="" />
              <div class="activity_button" style="top: 64px">GO</div>
            </div>
          </div>
        </div>
      </div>
      <img class="icon" src="../assets/web/home/icon/footet_icon.png" alt="" />
      <div class="icon_title">MOON TOUCH</div>
      <div
        v-if="isMobile"
        class="mobile_activity_button"
        @click="mobileActivityShow = true"
      >
        <p>NEWS</p>
      </div>
      <img
        @click="toDownLoad(1)"
        class="google"
        src="../assets/web/home/icon/gogele_download.png"
        alt=""
      />
      <img
        @click="toDownLoad(0)"
        class="ios"
        src="../assets/web/home/icon/ios_download.png"
        alt=""
      />
      <div class="activity_box" v-if="!isMobile">
        <div class="activity_title">news</div>
        <div class="activity_content">
          <div class="activity_item" @click="toActivity">
            <img src="../assets/web/home/page1/activity1.webp" alt="" />
            <div class="activity_button">GO</div>
          </div>
          <div class="activity_item" @click="toActivity2">
            <img src="../assets/web/home/page1/activity2.webp" alt="" />
            <div class="activity_button" style="top: 64px">GO</div>
          </div>
        </div>
      </div>
      <div class="copy_content">
        <div class="buttom_nft">
          <p>NFT : 0x2cb 5021c...55Cf</p>
          <img
            v-clipboard:copy="nft"
            v-clipboard:success="copyed"
            class="copy"
            src="../assets/web/home/icon/copy.png"
            alt=""
          />
        </div>
        <div class="buttom_mts">
          <p>MTS : 0xAf1 B86E6...919D</p>
          <img
            v-clipboard:copy="mts"
            v-clipboard:success="copyed"
            class="copy"
            src="../assets/web/home/icon/copy.png"
            alt=""
          />
        </div>
      </div>
      <img
        v-if="fixShow && !isMobile"
        class="fix_in"
        @click="tofix"
        src="../assets//web/home//page1/fixin.webp"
        alt=""
      />
      <img
        class="mobile_fix_in"
        v-if="fixShow && isMobile"
        src="../assets/web/home/page1/fix_mobile.webp"
        @click="tofix"
        alt=""
      />
      <img
        v-if="ahsShow && !isMobile"
        class="ash_in"
        src="../assets/web/home/page1/toash.webp"
        alt=""
        @click="toAsh"
      />
      <img
        v-if="ahsShow && isMobile"
        src="../assets/web/home/icon/getashmobile.webp"
        alt=""
        class="get_ash_mobile"
        @click="toAsh"
      />
      <div class="content" v-html="content"></div>
      <!-- <div class="news">
      <div class="news_item"></div>
    </div> -->
    </div>
    <div class="button_mobile">
      <img
        @click="toDownLoad(1)"
        class="google_mobile"
        src="../assets/web/home/icon/gogele_mobile.png"
        alt=""
      />
      <img
        @click="toDownLoad(0)"
        class="ios_mobile"
        src="../assets/web/home/icon/ios_mobile.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { getFixStatus } from "../apis/login";
export default {
  name: "homeMoonTouch",
  data() {
    return {
      content:
        "SYSTEM CHECK.........STATUS: INITIATE <br /> SYSTEM CHECK.........STATUS: ONLINEENGINE START<br /> <br />3....<br />2....<br />1....<br /><br /><p class='light_main'>AWAKENING.....</p>",
      nft: "0x2cb5021cbC2223Da78404e55E7b028E81ecF55Cf",
      mts: "0xAf1B86E67E554CF36E3e8F080cCCA2d995f6919D",
      mobileActivityShow: false,
      fixShow: false,
      ahsShow: false,
    };
  },
  computed: {
    isMobile() {
      this.$store.commit("setMobile");
      return this.$store.state.isMobile;
    },
  },
  mounted() {
    getFixStatus().then((res) => {
      this.fixShow = res.data.WalletFix;
      this.ahsShow = res.data.Ash;
    });
    if (!this.isMobile) {
      live2dLoader.start();
    }

    // document.addEventListener("visibilitychange", function () {
    //   if (document.visibilityState == "hidden") {
    //     live2dLoader.stop();
    //   } else {
    //     live2dLoader.start();
    //   }
    // });
  },
  watch: {
    isMobile: {
      handler(newVal) {
        if (newVal) {
          live2dLoader.stop();
        } else {
          live2dLoader.start();
        }
      },
    },
  },
  methods: {
    tofix() {
      if (!this.$store.getters.isConnectWallet) {
        this.$popup.show({
          text: "PLEASE CONNECT",
          isOneButton: true,
        });
      } else {
        this.$popupBind.show({});
      }
    },
    toAsh() {
      if (!this.$store.getters.isConnectWallet) {
        this.$popup.show({
          text: "PLEASE CONNECT",
          isOneButton: true,
        });
      } else {
        this.$popupAsh.show({});
      }
    },
    toDownLoad(type) {
      if (type == 0) {
        window.open(
          "https://apps.apple.com/app/moon-touch/id6446166766",
          "_blank"
        );
      }
      if (type == 1) {
        window.open(
          "https://play.google.com/store/apps/details?id=com.cgtc.mt",
          "_blank"
        );
      }
    },
    copyed() {
      this.$popup.show({
        text: "Copy success",
        isOneButton: true,
      });
    },
    toActivity() {
      let routeUrl = this.$router.resolve({ path: "/activityfirst" });
      window.open(routeUrl.href, "_blank");
    },
    toActivity2() {
      let routeUrl = this.$router.resolve({ path: "/activitysecond" });
      window.open(routeUrl.href, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.button_mobile {
  display: none;
}
.lang_view {
  height: 50.6vw;
}
.short_view {
  height: 100vh;
}
.home_main {
  width: 100vw;
  // height: 50.60vw;
  // height: 100vh;
  position: relative;
  background: url("../assets/web/home/page1/text_bg.webp") no-repeat
    center/cover;
  overflow: hidden;
  -webkit-transform: rotate(0deg);
  .fix_in {
    position: absolute;
    width: 264px;
    left: 1552.5px;
    top: 120px;
    cursor: pointer;
    position: absolute;
  }
  .ash_in {
    position: absolute;
    width: 264px;
    left: 1552.5px;
    top: 50px;
    cursor: pointer;
    position: absolute;
  }
  #canvas {
    transform: scale(1.02);
  }
  .activity_box {
    position: absolute;
    width: 264px;
    height: 425.5px;
    left: 1552.5px;
    top: 203px;
    background: url("../assets/web/home/page1/activity_bg.png") no-repeat
      center/cover;
    .activity_title {
      position: absolute;
      width: 163.76px;
      height: 28px;
      line-height: 28px;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      left: 40px;
      top: 27px;
      color: #ffffff;
    }
    .activity_content {
      width: 200px;
      height: 300px;
      position: absolute;
      top: 69px;
      left: 26px;
      display: flex;
      flex-direction: column;

      .activity_item {
        width: 200px;
        height: 111px;
        margin-top: 10px;
        position: relative;
        cursor: pointer;
        img {
          width: 200px;
          height: 111px;
        }
        .activity_button {
          position: absolute;
          width: 61px;
          height: 17px;
          top: 74px;
          left: 16px;
          font-size: 12px;
          line-height: 17px;
          color: #ffffff;
          border: 1px solid #ffffff;
          border-radius: 8px;
          cursor: pointer;
        }
        .activity_button:hover {
          background: #468ffb;
        }
      }
    }
  }
  .ios {
    position: absolute;
    width: 252px;
    height: 77px;
    left: 1552px;
    top: 675px;
    cursor: pointer;
    transform: scale(0.9);
  }
  .google {
    position: absolute;
    width: 252px;
    height: 77px;
    left: 1552px;
    top: 772px;
    transform: scale(0.9);
    cursor: pointer;
  }
  .icon {
    position: absolute;
    width: 196px;
    height: 167px;
    left: 135px;
    top: 220px;
  }
  .icon_title {
    position: absolute;
    width: 290px;
    height: 36px;
    left: 95px;
    top: 398px;
    text-align: left;
    font-family: "ADAMa";
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 36px;
    /* identical to box height */

    letter-spacing: 0.07em;

    color: #ffffff;
  }
  .copy_content {
    width: 350px;
    height: 40px;
    position: absolute;
    left: 99px;
    top: 462px;
    font-family: "Arial";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.07em;
    .buttom_nft {
      width: 350px;
      height: 30px;
      font-family: "Arial";
      font-weight: 700;
      font-size: 16px;
      line-height: 18px;
      /* identical to box height */
      letter-spacing: 0.07em;
      color: #ffffff;
      text-align: left;
      margin-top: 0px;
      position: relative;
      display: flex;
      .copy {
        width: 16px;
        height: 24px;
        cursor: pointer;
        margin-left: 18px;
      }
    }
    .buttom_mts {
      width: 350px;
      height: 30px;
      font-family: "Arial";
      font-weight: 700;
      font-size: 16px;
      line-height: 18px;
      /* identical to box height */
      letter-spacing: 0.07em;
      color: #ffffff;
      text-align: left;
      margin-top: 0px;
      position: relative;
      display: flex;
      .copy {
        width: 16px;
        height: 24px;
        cursor: pointer;
        margin-left: 10px;
      }
    }
  }
  .content {
    position: absolute;
    width: 555px;
    height: 221px;
    left: 127px;
    top: 685px;
    text-align: left;
    font-family: "Arial";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.07em;

    color: rgba(87, 165, 182, 0.7);
  }
  .news {
    position: absolute;
    width: 317.68px;
    height: 525px;
    left: 1442px;
    top: 253px;
    background: url("../assets/web/home/page1/page1_content.png") no-repeat
      center/cover;
    overflow: auto;
    .news_item {
      width: 230.5px;
      height: 89.5px;
      background: url("../assets/web/home/page1/page1_item.png") no-repeat
        center/cover;
      position: absolute;
      left: 40px;
      top: 50px;
    }
  }
}
@media only screen and (max-width: 1100px) {
  .mobile_fix_in {
    position: absolute;
    right: 30px;
    top: 110px;
  }
  .get_ash_mobile{
    position: absolute;
    right: 30px;
    top: 50px;
  }
  .home_main {
    width: 100vw;
    height: 100vh;
  }
  .button_mobile {
    display: block;
    width: 100vw;
    height: 73px;
    background: #000000;
    position: relative;
    .ios_mobile {
      position: absolute;
      width: 140px;
      height: 43px;
      left: 33px;
      top: 15px;
    }
    .google_mobile {
      position: absolute;
      width: 140px;
      height: 43px;
      right: 33px;
      top: 15px;
    }
  }
  .main {
    width: 100%;
    height: 100vh;
    position: relative;
    background: url("../assets/web/home/page1/page1_bg.webp") no-repeat
      center/cover;
    .mobile_activity_mask {
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      .activity_box {
        position: absolute;
        width: 260px;
        height: 430px;
        left: 60px;
        top: 20vh;
        background: url("../assets/web/home/page1/activity_bg.png") no-repeat
          center/cover;
        .activity_title {
          position: absolute;
          width: 163px;
          height: 28px;
          line-height: 28px;
          font-family: "ADAMa";
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          left: 40px;
          top: 27px;
          color: #ffffff;
        }
        .activity_content {
          width: 200px;
          height: 300px;
          position: absolute;
          top: 72px;
          left: 26px;
          display: flex;
          flex-direction: column;

          .activity_item {
            width: 194px;
            height: 102px;

            img {
              width: 194px;
              height: 102px;
            }
            .activity_button {
              position: absolute;
              width: 61px;
              height: 17px;
              top: 74px;
              left: 16px;
              font-size: 12px;
              line-height: 17px;
              color: #ffffff;
              border: 1px solid #ffffff;
              border-radius: 8px;
              cursor: pointer;
            }
          }
        }
      }
    }
    .mobile_activity_button {
      position: absolute;
      width: 47px;
      height: 47px;
      line-height: 47px;
      left: 17px;
      top: 27px;
      border-radius: 23px;
      background: rgba(0, 0, 0, 0.5);
      font-size: 12px;
      color: #ffffff;
      font-family: "ADAMa";
      p {
        width: 47px;
        height: 47px;
        transform: scale(0.8);
      }
    }
    .ios {
      display: none;
    }
    .google {
      display: none;
    }
    .icon {
      display: none;
    }
    .mask1 {
      display: none;
    }
    .icon_title {
      display: none;
    }
    .content {
      display: none;
    }
    .copy_content {
      display: none;
    }
  }
}
</style>
<style>
@keyframes light {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.light_main {
  animation: light 1s linear infinite;
}
</style>
