<template>
  <div class="main">
    <div class="flex-main">
      <div class="line1"></div>
      <div class="line2"></div>
      <div class="page_title">PARTNER</div>
      <div class="right_main">
        <img
          class="patner_item"
          v-for="(item, index) in partnerData"
          :key="index"
          :src="item.imgUrl"
          alt=""
          @click="toUrl(item.url)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homePartner",
  data() {
    return {
      partnerData: [
        {
          url: "https://arbitrum.io",
          imgUrl: require("../assets/web/home/icon/connect2.png"),
        },
        {
          url: "http://www.longling.com",
          imgUrl: require("../assets/web/home/icon/connect3.png"),
        },
        {
          url: "https://www.okx.com/cn/ventures",
          imgUrl: require("../assets/web/home/icon/connect1.png"),
        },
        {
          url: "https://alephcrypto.xyz",
          imgUrl: require("../assets/web/home/icon/connect5.png"),
        },
        {
          url: "https://evernewcap.com/",
          imgUrl: require("../assets/web/home/icon/connect7.png"),
        },
        {
          url: "https://www.wintermute.com/",
          imgUrl: require("../assets/web/home/icon/connect6.png"),
        },
        {
          url: "https://www.lolcapital.io/",
          imgUrl: require("../assets/web/home/icon/connect4.png"),
        },
      ],
    };
  },
  methods: {
    toUrl(data) {
      window.open(data, "_blank");
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
    background: url("../assets/web/home/page4/page4_bg.webp") no-repeat
      center/cover;
    top: 138px;
    left: 300px;
    -webkit-transform:rotate(0deg);
    .line1 {
      position: absolute;
      width: 1px;
      height: 740px;
      left: 72px;
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
      width: 229px;
      height: 50px;
      left: 114px;
      top: 47px;
      text-align: left;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 40px;
      line-height: 50px;
      /* identical to box height */

      letter-spacing: 0.07em;

      color: #ffffff;
    }
    .right_main {
      width: 932px;
      height: 454px;
      position: absolute;
      left: 250px;
      top: 181px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .patner_item {
        width: 200px;
        height: 200px;
      }
      .patner_item:nth-child(5) {
        margin-left: 120px;
      }
      .patner_item:nth-child(7) {
        margin-right: 120px;
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
      .line1 {
        display: none;
      }
      .line2 {
        display: none;
      }
      .page_title {
        width: 135px;
        height: 25px;
        font-size: 24px;
        line-height: 25px;
        left: 27px;
        top: 27px;
        text-align: right;
        border-left: 6px solid #8c7de4;
      }
      .right_main {
        flex-direction: column;
        width: 237px;
        height: 450px;
        left: 57px;
        top: 75px;
        flex-direction: row;
        .patner_item {
          width: 102px;
          height: 102px;
        }
        .patner_item:nth-child(5) {
        margin-left: 0px;
      }
      .patner_item:nth-child(7) {
        margin-left:65px;
      }
      }
    }
  }
}
</style>
