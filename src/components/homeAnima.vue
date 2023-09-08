<template>
  <div class="main">
    <div class="flex-main" ref="content">
      <div class="left">
        <img
          v-for="(item, index) in cardList"
          :key="index"
          :class="tabIndex == index ? 'opcityclass' : 'opcityclass1'"
          class="page3leftImg"
          :src="isMobile ? item.MobileUrl : item.bigUrl"
          alt=""
        />
      </div>
      <div class="line"></div>
      <div class="right">
        <div class="blue"></div>
        <div class="page_title">ANIMA</div>
        <div class="title">{{ cardList[tabIndex].title }}</div>
        <div class="content" v-html="cardList[tabIndex].text"></div>
        <div class="cardContent">
          <div
            class="cardItem"
            @click="changeIndex(index)"
            v-for="(item, index) in cardList"
            :key="index"
            :class="tabIndex == index ? 'choesd' : 'notchosed'"
          >
            <img :src="item.url" alt="" />
            <img
              class="card_coesd"
              :class="index == tabIndex ? 'show' : 'hide'"
              src="../assets/web/home/page3/page3_card_choesd.png"
              alt=""
            />
          </div>
        </div>
        <div class="link" @click="toUrl"></div>
        <div class="to_activity" @click="toActivity">
         go ANIMA CONSTRUCT
        </div>
      </div>
      <div class="line_mobile"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeAnnima",
  data() {
    return {
      tabIndex: 1,
      timer: null,
      isInContent: false,
      img1: null,
      img2: null,
      cardList: [
        {
          title: "Engi-Anima",
          text: "Engi-Anima, the first official <br />blind boxTotal: 15000",
          url: require("../assets/web/home/page3/page3_card1.webp"),
          bigUrl: require("../assets/web/home/page3/page3_card1_big.webp"),
          MobileUrl: require("../assets/web/home/page3/page3_card1_mobile.webp"),
        },
        {
          title: "Origin-Anima",
          text: "Genesis limited Anima. Specially released for <br /> pre-orderTotal: 3000",
          url: require("../assets/web/home/page3/page3_card2.webp"),
          bigUrl: require("../assets/web/home/page3/page3_card2_big.webp"),
          MobileUrl: require("../assets/web/home/page3/page3_card2_mobile.webp"),
        },
        {
          title: "Airdrop-Anima",
          text: "Distribute to potential usersTotal with <br /> SEER-Anima: 2000",
          url: require("../assets/web/home/page3/page3_card3.webp"),
          bigUrl: require("../assets/web/home/page3/page3_card3_big.webp"),
          MobileUrl: require("../assets/web/home/page3/page3_card3_mobile.webp"),
        },
        {
          title: "SEER-Anima",
          text: "DAO's early test player rewardsTotal with <br />   Airdrop-Anima: 2000",
          url: require("../assets/web/home/page3/page3_card4.webp"),
          bigUrl: require("../assets/web/home/page3/page3_card4_big.webp"),
          MobileUrl: require("../assets/web/home/page3/page3_card4_mobile.webp"),
        },
      ],
    };
  },
  methods: {
    aniChange() {
      if (
        this.$refs.content.getBoundingClientRect().top < 500 &&
        this.$refs.content.getBoundingClientRect().top > -500 &&
        this.timer == null
      ) {
        let _self = this;
        this.timer = window.setInterval(() => {
          if (_self.isInContent) return;
          let index = _self.tabIndex + 1;
          if (index == 4) {
            index = 0;
          }
          _self.changeIndex(index);
        }, 2000);
      } else if (
        (this.$refs.content.getBoundingClientRect().top > 500 ||
          this.$refs.content.getBoundingClientRect().top < -500) &&
        this.timer != null
      ) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    changeIndex(index) {
      if (this.tabIndex == index) return;
      this.tabIndex = index;
    },
    toUrl() {
      window.open("https://opensea.io/collection/moon-touch", "_blank");
    },
    toActivity() {
      let routeUrl = this.$router.resolve({ path: "/activityfirst" });
      window.open(routeUrl.href, "_blank");
    },
  },
  computed: {
    isMobile() {
      this.$store.commit("setMobile");
      return this.$store.state.isMobile;
    },
  },
  mounted() {
    this.changeIndex(0);
    window.addEventListener("scroll", this.aniChange);
    let _self = this;
    this.$refs.content.onmouseover = function () {
      _self.isInContent = true;
    };
    this.$refs.content.onmouseout = function () {
      _self.isInContent = false;
    };
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.aniChange);
  },
};
</script>

<style lang="scss" scoped>
.opcityclass {
  opacity: 1;
}
.opcityclass1 {
  opacity: 0;
}
.show {
  opacity: 1;
}
.hide {
  opacity: 0;
}
.main {
  width: 100%;
  height: 940px;
  position: relative;
  .flex-main {
    width: 1374px;
    height: 740px;
    border-radius: 60px;
    background: #201f1f;
    position: absolute;
    top: 138px;
    left: 300px;
    display: flex;
    overflow: hidden;
    -webkit-transform:rotate(0deg);
    .left {
      width: 801px;
      height: 740px;
      border-radius: 60px 0 0 60px;
      .page3leftImg {
        position: absolute;
        width: 801px;
        height: 740px;
        left: 0px;
        top: 0px;
        border-radius: 60px 0px 0px 60px;
        transition: opacity 0.5s linear 0.1s;
      }
    }
    .line {
      width: 2px;
      height: 740px;
      background: #454648;
      position: absolute;
      left: 801px;
      top: 0px;
      z-index: 3;
    }
    .right {
      width: 573px;
      height: 740px;
      border-radius: 0px 50px 50px 0px;
      position: relative;
      background: url("../assets/web/home/page3/page3_right.webp") no-repeat
        center/cover;
      .to_activity {
        position: absolute;
        width: 300px;
        height: 49px;
        left: 120px;
        top: 620px;
        font-family: "ADAMa";
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 49px;
        border: 1px solid #ffffff;
        border-radius: 8px;
        color: #ffffff;
        cursor: pointer;
       
      }
      .to_activity:hover {
        background: #468ffb;
      }
      .blue {
        position: absolute;
        width: 12px;
        height: 50px;
        left: 0px;
        top: 44px;
        z-index: 4;
        background: #3bbaf5;
      }
      .title {
        position: absolute;
        width: 350px;
        text-align: left;
        height: 35px;
        left: 35px;
        top: 146px;
        font-family: "ADAMa";
        font-style: normal;
        font-weight: 400;
        font-size: 30px;
        line-height: 35px;
        letter-spacing: 0.07em;
        color: #ffffff;
      }
      .content {
        position: absolute;
        width: 200px;
        height: 96px;
        left: 35px;
        top: 203px;
        text-align: left;
        font-family: "Arial";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        /* or 24px */
        overflow: auto;
        color: #ffffff;
      }
      .content::-webkit-scrollbar {
        display: none;
      }
      .cardContent {
        position: absolute;
        width: 486.48px;
        height: 156px;
        left: 35px;
        top: 389px;
        display: flex;
        justify-content: space-between;
        z-index: 9;
        .cardItem {
          width: 100px;
          height: 156px;
          cursor: pointer;
          position: relative;
          transition: all 0.2s linear 0.1s;
          img {
            width: 100px;
            height: 156px;
          }
          .card_coesd {
            position: absolute;
            transition: opacity 0.5s linear;
            left: 0;
            top: 0;
          }
        }
        .notchosed:hover {
          transform: scale(1.1);
        }
        .choesd {
          transform: scale(1.2);
        }
      }
      .link {
        position: absolute;
        width: 50px;
        height: 50px;
        left: 35px;
        top: 620px;
        background: url("../assets/web/home/icon/frame.png") no-repeat
          center/contain;
        cursor: pointer;
      }
      .page_title {
        position: absolute;
        width: 71px;
        height: 40px;
        left: 36px;
        top: 49px;

        font-family: "ADAMa";
        font-style: normal;
        font-weight: 400;
        font-size: 40px;
        line-height: 45px;
        /* identical to box height */

        letter-spacing: 0.07em;

        color: #ffffff;
      }
    }
  }
}
@media only screen and (max-width: 1100px) {
  .main {
    width: 100%;
    height: 649px;
    position: relative;
    .flex-main {
      position: absolute;
      width: 358px;
      height: 565px;
      left: 17px;
      top: 42px;
      border-radius: 25px;
      background: url("../assets/web/home/icon/mobile_bg.webp") no-repeat
        center/cover;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .left {
        width: 358px;
        height: 281px;
        border-radius: 25px 25px 0px 0px;
        .page3leftImg {
          width: 358px;
          height: 281px;
          border-radius: 25px 25px 0px 0px;
        }
      }
      .right {
        width: 358px;
        height: 284px;
        border-radius: 0px 0px 25px 25px;
        position: relative;
        .to_activity {
          position: absolute;
          width: 150px;
          height: 21px;
          left: 41px;
          top: 246px;
          font-family: "ADAMa";
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          padding-top: 3px;
          line-height: 14px;
          border-radius: 8px;
          border: 1px solid #ffffff;
          border-radius: 4px;
          color: #ffffff;
          cursor: pointer;
          transform: scale(0.9);
      
        }
        .blue {
          position: absolute;
          width: 6px;
          height: 27px;
          left: 24px;
          top: 17px;
          background: #53f5ff;
          z-index: 4;
        }

        .link {
          position: absolute;
          width: 24px;
          height: 24px;
          left: 308px;
          top: -260px;
        }
        .title {
          position: absolute;
          width: 200px;
          height: 20px;
          left: 42px;
          top: 55px;
          text-align: left;
          font-family: "ADAMa";
          font-style: normal;
          font-weight: 400;
          font-size: 20px;
          line-height: 20px;
          /* identical to box height */

          letter-spacing: 0.07em;

          color: #ffffff;
        }
        .content {
          position: absolute;
          width: 290px;
          height: 84px;
          left: 42px;
          top: 82px;
          font-family: "Arial";
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 150%;
          text-align: left;
          /* or 21px */

          color: #ffffff;
        }
        .cardContent {
          height: 93px;
          position: absolute;
          width: 286px;
          height: 92.99px;
          left: 44px;
          top: 135px;
          z-index: 9;
          .cardItem {
            width: 58.9px;
            height: 92.99px;
            img {
              width: 58.9px;
              height: 92.99px;
            }
          }
        }
        .page_title {
          font-size: 24px;
          line-height: 24px;
          width: 142px;
          height: 30px;
          left: 41px;
          top: 19px;
          text-align: left;
        }
      }
    }
    .line_mobile {
      position: absolute;
      width: 1px;
      height: 289px;
      left: 24px;
      top: 281px;
      background: #454648;
    }
  }
}
</style>
