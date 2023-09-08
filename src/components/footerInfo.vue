<template>
  <div class="footer">
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
    <div class="footerMain">
      <div class="icon"></div>
      <div class="title">Moon Touch</div>
      <div class="text">Digging treasure among stars</div>
      <div class="tag1" @click="toUrl(0)"></div>
      <div class="tag2" @click="toUrl(1)"></div>
      <div class="tag3" @click="toUrl(2)"></div>
    </div>
    <div class="footerMainButtom">
      <div class="buttom_nft">
        NFT : 0x2cb 5021c...55Cf
        <img
          v-clipboard:copy="nft"
          v-clipboard:success="copyed"
          class="copy"
          src="../assets/web/home/icon/copy.png"
          alt=""
        />
      </div>
      <div class="buttom_mts">
        MTS : 0xAf1 B86E6...919D
        <img
        v-clipboard:success="copyed"
          v-clipboard:copy="mts"
          class="copy"
          src="../assets/web/home/icon/copy.png"
          alt=""
        />
      </div>
    </div>
    <div class="footerButtom">©Moon Touch 組織委員会</div>
  </div>
</template>
<script>
export default {
  name: "footerInfo",
  data() {
    return {
      nft: "0x2cb5021cbC2223Da78404e55E7b028E81ecF55Cf",
      mts: "0xAf1B86E67E554CF36E3e8F080cCCA2d995f6919D",
    };
  },
  methods: {
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
    toUrl(type){
      if (type == 0) {
        window.open(
          "https://twitter.com/MoonTouch77",
          "_blank"
        );
      }
      if (type == 1) {
        window.open(
          "https://discord.gg/moontouch",
          "_blank"
        );
      }
      if(type==2){
        window.open(
          "https://opensea.io/collection/moon-touch",
          "_blank"
        );
      }
    },
    copyed(){
      this.$popup.show({
        text:'Copy success',
        isOneButton:true,
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.footer {
  width: 1920px;
  height: 386px;
  background: #000000;
  position: relative;
  margin-top: 150px;
  .ios {
    position: absolute;
    width: 231px;
    height: 71px;
    left: 1157px;
    top: 185px;
    z-index: 5;
    cursor: pointer;
  }
  .google {
    position: absolute;
    width: 231px;
    height: 71px;
    left: 1477px;
    top: 185px;
    z-index: 5;
    cursor: pointer;
  }
  .footerMain {
    width: 1486px;
    height: 118px;
    border-bottom: 1px solid #ffffff;
    position: absolute;
    left: 217px;
    top: 37px;
    .icon {
      position: absolute;
      left: 0px;
      top: 4px;
      width: 95px;
      height: 81px;
      background: url("../assets/web/home/icon/footet_icon.png") no-repeat
        center/cover;
    }
    .title {
      position: absolute;
      width: 350px;
      height: 55px;
      left: 125px;
      top: 5px;
      font-family: "Arial";
      font-style: normal;
      // font-weight: 400;
      font-size: 40px;
      line-height: 55px;
      letter-spacing: 0.07em;
      color: #ffffff;
      text-align: left;
    }
    .text {
      position: absolute;
      width: 500px;
      height: 30px;
      left: 125px;
      top: 55px;
      font-family: "Arial";
      font-style: normal;
      // font-weight: 700;
      font-size: 22px;
      line-height: 30px;
      /* identical to box height */
      text-align: left;
      letter-spacing: 0.07em;
      color: #ffffff;
    }
    .tag1 {
      position: absolute;
      width: 46px;
      height: 38px;
      left: 1202px;
      top: 46px;
      background: url("../assets/web/home/icon/twitter.webp") no-repeat
        center/cover;
        cursor: pointer;
    }
    .tag2 {
      position: absolute;
      width: 50px;
      height: 38px;
      left: 1317px;
      top: 46px;
      background: url("../assets/web/home/icon/footer2.png") no-repeat
        center/cover;
        cursor: pointer;
    }
    .tag3 {
      position: absolute;
      width: 38px;
      height: 38px;
      left: 1436px;
      top: 46px;
      background: url("../assets/web/home/icon/footer3.png") no-repeat
        center/cover;
        cursor: pointer;
    }
  }
  .footerMainButtom {
    height: 140px;
    width: 1486px;
    border-bottom: 1px solid #ffffff;
    position: absolute;
    left: 217px;
    top: 155px;
    .buttom_nft,
    .buttom_mts {
      width: 450px;
      height: 28px;
      font-family: "Arial";
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
      /* identical to box height */
      letter-spacing: 0.07em;
      color: #ffffff;
      text-align: left;
      margin-top: 27px;
      position: relative;
    }
    .copy {
      width: 16px;
      height: 24px;
      position: absolute;
      right:180px;
      top: 5px;
      cursor: pointer;
    }
    .text_item {
      font-family: "Arial";
      font-style: normal;
      // font-weight: 700;
      font-size: 20px;
      line-height: 30px;
      text-align: left;
      height: 30px;
      color: #ffffff;
      width: auto;
    }
  }
  .footerButtom {
    position: absolute;
    width: 350px;
    height: 30px;
    left: 217px;
    top: 310px;
    font-family: "Arial";
    font-style: normal;
    text-align: left;
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;
    /* identical to box height */

    letter-spacing: 0.07em;

    color: #ffffff;
  }
}
@media only screen and (max-width: 1100px) {
  .footer {
    width: 390px;
    height: 325px;
    margin-top: 0;
    .ios {
      position: absolute;
      width: 103px;
      height: 32px;
      left: 31px;
      top: 160px;
    }
    .google {
      position: absolute;
      width: 103px;
      height: 32px;
      left: 160px;
      top: 160px;
    }
    .footerMain {
      width: 306px;
      left: 37px;
      top: 14px;
      height: 188px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      .icon {
        width: 47px;
        height: 40px;
        top: 0;
        left: 0px;
      }
      .title {
        font-weight: 400;
        font-size: 20px;
        width: 250px;
        height: 41px;
        left: 0;
        top: 35px;
      }
      .text {
        width: 350px;
        height: 21px;
        left: 0px;
        font-size: 12px;
        line-height: 21px;
        top: 75px;
      }
      .tag1 {
        position: absolute;
        width: 24px;
        height: 20px;
        left: 0px;
        top: 111px;
      }
      .tag2 {
        position: absolute;
        width: 24px;
        height: 20px;
        left: 61px;
        top: 111px;
      }
      .tag3 {
        position: absolute;
        width: 19px;
        height: 19px;
        left: 119px;
        top: 112px;
      }
    }
    .footerMainButtom {
      height: 70px;
      width: 306px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      position: absolute;
      left: 42px;
      top: 201px;
      .buttom_nft,
      .buttom_mts {
        width: 300px;
        height: 16px;
        font-family: "Arial";
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        /* identical to box height */
        letter-spacing: 0.07em;
        color: #ffffff;
        text-align: left;
        margin-top: 12px;
        position: relative;
      }
      .copy {
        width: 14px;
        height: 19px;
        position: absolute;
        right: 90px;
        top: 0px;
        cursor: pointer;
      }
      .text_item {
        font-family: "Arial";
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        text-align: left;
        height: 16px;
        color: #ffffff;
        width: auto;
      }
    }
    .footerButtom {
      position: absolute;
      width: 350px;
      height: 30px;
      left: 42px;
      top: 288px;
      font-family: "Arial";
      font-style: normal;
      text-align: left;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      /* identical to box height */
      letter-spacing: 0.07em;
      color: #ffffff;
    }
  }
}
</style>
