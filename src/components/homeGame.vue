<template>
  <div class="main">
    <div class="flex-main">
      <div class="line1"></div>
      <div class="line2"></div>
      <!-- <div class="line3"></div> -->
      <div class="title">{{ tabList[index].text }}</div>
      <div class="page_title">GAME PLAY</div>
      <div class="title_second">INTRODUCE</div>
      <div class="content">
        {{ tabList[index].content }}
      </div>
      <div
        class="button_first"
        :class="this.index == 1 ? 'selectd' : ''"
        @click="changetab(1)"
      >
        HOW TO EARN
      </div>
      <!-- <div class="button_second">DOWNLOAD</div> -->
      <div
        class="button_third"
        :class="this.index == 0 ? 'selectd' : ''"
        @click="changetab(0)"
      >
        HOW TO PLAY
      </div>
      <div class="rightContent">
        <img
          :src="this.isMobile ? tabList[index].imgmobile : tabList[index].imgpc"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeGame",
  data() {
    return {
      index: 0,
      tabList: [
        {
          text: "How TO PLAY ",
          imgpc: require("../assets/web/home/page5/page5_bg.webp"),
          imgmobile: require("../assets/web/home/page5/page5_bg_mobile.webp"),
          content:
            "The NFT assets in the game can be withdrawn to the wallet or imported from the wallet to the game through the functions in the game.",
        },
        {
          text: "How TO EARN",
          imgpc: require("../assets/web/home/page5/page5_bg2.webp"),
          imgmobile: require("../assets/web/home/page5/page5_bg2_mobile.webp"),
          content:
            "Moon Touch is not a simple sports game. We want players to take steps into reality to interact with the game world through virtual and reality. All changes come from your efforts. All growth comes from your efforts. All happiness also comes from your giving. Take a step away from the boring status quo and join the exciting adventures of Moon Touch.",
        },
      ],
    };
  },
  methods: {
    changetab(type) {
      this.index = type;
    },
  },
  computed: {
    isMobile() {
      this.$store.commit("setMobile");
      return this.$store.state.isMobile;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 940px;
  position: relative;

  .flex-main {
    width: 1374px;
    height: 740px;
    border-radius: 60px;
    position: absolute;
    top: 138px;
    left: 300px;
    background: url("../assets/web/home/page4/page4_bg.webp") no-repeat
      center/cover;
      -webkit-transform:rotate(0deg);
    .line1 {
      position: absolute;
      width: 2px;
      height: 740px;
      left: 72px;
      top: 0px;
      background: #454648;
    }
    .line2 {
      position: absolute;
      width: 12px;
      height: 50px;
      left: 72px;
      top: 44px;
      background: #468ffb;
    }
    .line3 {
      position: absolute;
      width: 4px;
      height: 326px;
      left: 72px;
      top: 242px;
      background: #ffffff;
    }
    .title {
      position: absolute;
      width: 304px;
      height: 39px;
      left: 111px;
      top: 180px;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 30px;
      line-height: 35px;
      letter-spacing: 0.07em;
      color: #ffffff;
      text-align: left;
    }
    .page_title {
      position: absolute;
      width: 304px;
      height: 39px;
      left: 111px;
      top: 53px;

      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 36px;
      line-height: 36px;
      letter-spacing: 0.07em;
      text-align: left;
      color: #ffffff;
    }
    .title_second {
      position: absolute;
      width: 175px;
      height: 28px;
      left: 111px;
      top: 242px;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      text-align: left;
      line-height: 28px;
      /* identical to box height */
      letter-spacing: 0.07em;
      color: #ffffff;
    }
    .content {
      position: absolute;
      width: 270px;
      height: 240px;
      left: 111px;
      top: 276px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      overflow: auto;
      text-align: left;
      /* or 21px */
      color: #ffffff;
    }
    .content::-webkit-scrollbar {
      display: none;
    }
    .button_first {
      position: absolute;
      width: 165px;
      height: 41px;
      left: 100px;
      top: 580px;
      mix-blend-mode: normal;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 41px;
      color: #ffffff;
      border: 1px solid #a6a6a6;
      cursor: pointer;
      transition: all 0.2s linear;
      border-radius: 8px;
    }
    .button_second {
      position: absolute;
      width: 165px;
      height: 41px;
      left: 304px;
      top: 568px;
      mix-blend-mode: normal;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 41px;
      color: #ffffff;
      border: 1px solid #a6a6a6;
      cursor: pointer;
      transition: all 0.2s linear;
    }
    .button_third {
      position: absolute;
      width: 165px;
      height: 41px;
      left: 304px;
      top: 580px;
      mix-blend-mode: normal;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 41px;
      border-radius: 8px;
      color: #ffffff;
      border: 1px solid #a6a6a6;
      cursor: pointer;
      transition: all 0.2s linear;
    }
    .selectd {
      transform: scale(1.1);
      background: #468ffb;
    }
    .button_first:hover,
    .button_second:hover,
    .button_third:hover {
      background: #468ffb;
    }
    .rightContent {
      width: 868px;
      height: 740px;
      position: absolute;
      right: 0px;
      img {
        width: 868px;
        height: 740px;
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
      width: 359px;
      height: 565px;
      left: 17px;
      top:42px;
      border-radius: 25px;
      background: url("../assets/web/home/icon/mobile_bg.webp") no-repeat
        center/cover;
      overflow: hidden;
      .line1 {
        position: absolute;
        width: 1px;
        height: 261px;
        left: 24px;
        top: 214px;
        background: #454648;
      }
      .line3 {
        position: absolute;
        width: 2px;
        height: 222px;
        left: 24px;
        top: 265px;
        background: #ffffff;
      }
      .line2 {
        position: absolute;
        width: 6px;
        height: 25px;
        left: 24px;
        top: 230px;
        background: #00a2ff;
      }
      .title {
        position: absolute;
        width: 200px;
        height: 14px;
        left: 42px;
        top: 270px;
        font-family: "ADAMa";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 0.07em;
        color: #ffffff;
      }
      .page_title {
        left: 41px;
        top: 238px;
        font-size: 20px;
        line-height: 11px;
      }
      .title_second {
        position: absolute;
        width: 110px;
        height: 16px;
        left: 42px;
        top: 294px;
        font-family: "ADAMa";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        /* identical to box height */
        letter-spacing: 0.07em;
        color: #ffffff;
      }
      .content {
        position: absolute;
        width: 270px;
        height: 215px;
        left: 42px;
        top: 323px;
        font-family: "Arial";
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 150%;
        /* or 21px */

        color: #ffffff;
      }
      .button_first {
        box-sizing: border-box;
        position: absolute;
        width: 116px;
        height: 29px;
        border-radius: 8px;
        left: 200px;
        top: 490px;
        font-size: 14px;
        line-height: 27px;
        border: 1px solid #ffffff;
        z-index: 9;
        z-index: 3;
      }
      .button_second {
        box-sizing: border-box;
        position: absolute;
        width: 100px;
        height: 22px;
        border-radius: 4px;
        left: 245px;
        top: 490px;
        font-size: 12px;
        line-height: 21px;
        border: 1px solid #ffffff;
        z-index: 3;
      }
      .button_third {
        width: 116px;
        height: 29px;
        border-radius: 8px;
        border: 1px solid #ffffff;
        position: absolute;
        top: 490px;
        left: 50px;
        font-size: 14px;
        line-height: 27px;
        text-align: center;
        z-index: 3;
      }
      .selectd {
        transform: scale(1.1);
        background: #468ffb;
      }
      .button_second:hover {
        background: none;
      }
      .rightContent {
        position: absolute;
        width: 358px;
        height: 214px;
        left: 0px;
        top: 0px;
        img {
          width: 359px;
          height: 214px;
        }
      }
    }
  }
}
</style>
