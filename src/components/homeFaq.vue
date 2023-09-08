<template>
  <div class="main">
    <div class="flex-main">
      <div class="line1"></div>
      <div class="line2"></div>
      <div class="page_title">FAQ</div>
      <div class="logo"></div>
      <p class="content" v-html="text"></p>
      <div class="button1" @click="toDis">
        <img
          class="buttonIcon"
          src="../assets/web/home/icon/footer2.png"
          alt=""
        />
        <p class="buttonText">DISCORD</p>
      </div>
      <div class="button2" @click="toTwi">
        <img
          class="buttonIcon"
          src="../assets/web/home/icon/twitter.webp"
          alt=""
        />
        <p class="buttonText">TWITTER</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeFaq",
  data() {
    return {
      text: "FOR MORE FEEDBACK,<br /> PLEASE PARTICIPATE IN OUR COMMUNITY DISCUSSIONS,<br /> OR DIRECTLY REPORT PROBLEMS TO MANAGEMENT",
    };
  },
  methods:{
    toDis(){
      window.open("https://discord.gg/moontouch", "_blank");
    },
    toTwi(){
      window.open("https://twitter.com/MoonTouch77", "_blank");
    },
  }
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
    background: url("../assets/web/home/page4/page4_bg.webp") no-repeat
      center/cover;
    top: 138px;
    left: 300px;
    -webkit-transform:rotate(0deg);
    .line1 {
      position: absolute;
      width: 1px;
      height: 740px;
      left: 71px;
      top: 0px;
      border: 2px solid #454648;
    }
    .line2 {
      position: absolute;
      width: 12px;
      height: 50px;
      left: 72px;
      top: 44px;
      background: #8c7de4;
    }
    .page_title {
      position: absolute;
      width: 102px;
      height: 48px;
      left: 114px;
      top: 48px;
      text-align: left;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 40px;
      line-height: 48px;
      /* identical to box height */

      letter-spacing: 0.07em;

      color: #ffffff;
    }
    .logo {
      position: absolute;
      width: 195px;
      height: 167px;
      left: 625px;
      top: 99px;
      background: url("../assets/web/home/icon/footet_icon.png") no-repeat
        center/contain;
    }
    .content {
      position: absolute;
      width: 918px;
      height: 150px;
      left: 264px;
      top: 314px;
      font-family: "ADAMa";
      font-style: normal;
      // font-weight: 400;
      font-size: 26px;
      line-height: 50px;
      /* or 150% */
      text-align: center;
      letter-spacing: 0.07em;
      color: #ffffff;
      mix-blend-mode: normal;
    }
    .button1 {
      position: absolute;
      width: 283px;
      height: 73px;
      left: 339px;
      top: 575px;
      border: 3px solid #ffffff;
      border-radius: 8px;
      .buttonIcon {
        position: absolute;
        width: 45px;
        height: 34px;
        left: 40px;
        top: 20px;
      }
    }
    .button2 {
      position: absolute;
      width: 283px;
      height: 73px;
      left: 824px;
      top: 575px;
      border: 3px solid #ffffff;
      border-radius: 8px;
      .buttonIcon {
        position: absolute;
        width: 40px;
        height: 34px;
        left: 40px;
        top: 20px;
      }
    }
    .buttonText {
      position: absolute;
      width: 140px;
      height: 50px;
      right: 40px;
      top: 10px;
      text-align: right ;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 30px;
      line-height: 50px;
      /* identical to box height, or 167% */

      text-align: center;
      letter-spacing: 0.07em;

      color: #ffffff;

      mix-blend-mode: normal;
    }
    .button2:hover,
    .button1:hover {
      background: #468ffb;
      // border: none;7
      cursor: pointer;
    }
  }
}
@media only screen and (max-width: 1100px) {
  .main {
    width: 100%;
    height: 700px;
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
      .line1 {
        display: none;
      }
      .line2 {
        display: none;
      }
      .page_title {
        width: 70px;
        height: 25px;
        font-size: 24px;
        line-height: 25px;
        left: 27px;
        top: 27px;
        text-align: right;
        border-left: 6px solid #8c7de4;
      }
      .logo {
        width: 105px;
        height: auto;
        left: 133px;
        height: 149px;
      }
      .content {
        width: 282px;
        height: 123px;
        left: 44px;
        top: 253px;
        font-size: 14px;
        line-height: 24px;
      }
      .button1 {
        position: absolute;
        width: 116px;
        height: 29px;
        left: 45px;
        top: 463px;
        border: 1px solid #ffffff;
        border-radius: 8px;
        .buttonIcon {
          position: absolute;
          height: 20px;
          width: auto;
          left: 10px;
          top: 4px;
          transform: scale(0.8);
        }
        transform: scale(1.2);
      }
      .button2 {
        position: absolute;
        width: 116px;
        height: 29px;
        left: 204px;
        top: 463px;
        border: 1px solid #ffffff;
        border-radius: 8px;
        .buttonIcon {
          position: absolute;
          height: 20px;
          width: auto;
          left: 10px;
          top: 4px;
          transform: scale(0.8);
        }
        transform: scale(1.2);
      }
      .buttonText {
        position: absolute;
        width: 100px;
        height: 29px;
        right: -10px;
        top: -11px;

        font-family: "ADAMa";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 50px;
        /* identical to box height, or 167% */

        text-align: center;
        letter-spacing: 0.07em;

        color: #ffffff;

        mix-blend-mode: normal;
      }
      .button2:hover,
      .button1:hover {
        background: none;
        // border: none;7
        cursor: pointer;
      }
    }
  }
}
</style>
