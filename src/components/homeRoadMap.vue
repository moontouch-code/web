<template>
  <div class="main">
    <div class="flex-main" ref="content">
      <img class="mobileBg" v-if="this.isMobile" src="../assets/web/home/page6/page6_mobile.webp" alt="">
      <div class="line3"></div>
      <!-- <div class="line1"></div> -->
      <div class="line2"></div>
      <div class="title">ROAD MAP</div>
      <div class="title_second">{{ mapList[tabindex].text }}</div>
      <div class="content">
        <p
          class="text_item"
          v-for="(item, index) in mapList[tabindex].info"
          :key="index"
          v-html="item"
        >
        </p>
      </div>
      <div
        v-for="(item, index) in mapList"
        :key="index"
        :class="classList[index]"
        class="tabItemPage5"
        @click="changeChain(index)"
      >
        <span>
          {{ item.title }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeRoadMap",
  data() {
    return {
      tabindex: 0,
      timer:null,
      isInContent:false,
      mapList: [
        {
          title: "Q1",
          text: "2023 Q1",
          info: [
            "Releasing official website",
            "Start Beta Testing",
          ],
        },
        {
          title: "Q2",
          text: "2023 Q2",
          info:[
            'Release White Paper',
            "Start Public Testing",
            'Release ERC721 contract address',
            'Start Pre-Sale </br> 3000 Origin Anima'
          ]
        },
        {
          title: "Q3",
          text: "2023 Q3",
          info:[
            'Start Public Sale <br /> In-game Anima called ‘ENGI’',
            'Release Game (Full Version 1.0)',
            ' Release ERC20 contract address'
          ]
        },
        {
          title: "Q4",
          text: "2023 Q4",
          info:[
            'Release Game (Full Version 2.0)'
          ]
        },
        {
          title: "MORE",
          text: "2023 MORE",
          info:[
            'To be continued'
          ]
        },
      ],
      classList: ["pos1", "pos2", "pos3", "pos4", "pos5"],
    };
  },
  watch: {
    classList: {
      handler() {
        this.$nextTick(function () {
          this.changeFontSize();
        });
      },
      deep: true,
      immediate: true,
    },
  },
  computed:{
    isMobile() {
      this.$store.commit("setMobile");
      return this.$store.state.isMobile;
    },
  },
  methods: {
    changeChain(index) {
      this.tabindex=index;
      // console.log(document.getElementsByClassName("pos1")[0].style);
      document.getElementsByClassName("pos1")[0].style.opcity = 0;
      let targetIndex = this.classList.indexOf("pos1");
      let changClasses = this.classList[index];
      this.$set(this.classList, targetIndex, changClasses);
      this.$set(this.classList, index, "pos1");
    },
    changeFontSize() {
      let tagrget = document.getElementsByClassName("tabItemPage5");
      for (let i = 0; i < tagrget.length; i++) {
        if (
          tagrget[i].getElementsByTagName("span")[0].innerText == "MORE" &&
          !tagrget[i].classList.contains("pos1")
        ) {
          if(this.isMobile)
          tagrget[i].style.fontSize = "0.75rem";
          else
          tagrget[i].style.fontSize = "1.625rem";
        } else if (
          tagrget[i].getElementsByTagName("span")[0].innerText == "MORE" &&
          tagrget[i].classList.contains("pos1")
        ) {
          if(this.isMobile)
          tagrget[i].style.fontSize = "1.125rem";
          else
          tagrget[i].style.fontSize = "3.125rem";
        }
      }
    },
    aniChange() {
      if (
        this.$refs.content.getBoundingClientRect().top < 500 &&
        this.$refs.content.getBoundingClientRect().top > -500 &&
        this.timer == null
      ) {
        let _self = this;
        this.timer = window.setInterval(() => {
          if (_self.isInContent) return;
          let index = _self.tabindex + 1;
          if (index == 5) {
            index = 0;
          }
          _self.changeChain(index);
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

  },
  mounted() {
    this.changeFontSize();
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
.main {
  width: 100%;
  height: 940px;
  position: relative;
  .flex-main {
    width: 1374px;
    height: 740px;
    border-radius: 60px;
    background: url("../assets/web/home/page6/page6_bg.webp") no-repeat
      center/cover;
    position: absolute;
    top: 138px;
    left: 300px;
    -webkit-transform:rotate(0deg);
    .line1 {
      position: absolute;
      width: 4px;
      height: 296px;
      left: 803px;
      top: 258px;
      background: #ffffff;
    }
    .line2 {
      position: absolute;
      width: 12px;
      height: 50px;
      left: 803px;
      top: 44px;
      background: #3ce0f3;
    }
    .line3 {
      position: absolute;
      width: 2px;
      height: 740px;
      left: 803px;
      top: 0px;
      background: #454648;
    }
    .title {
      position: absolute;
      width: 215px;
      height: 35px;
      left: 840px;
      top: 53px;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 36px;
      line-height: 36px;
      text-align: left;
      /* identical to box height */

      letter-spacing: 0.07em;

      color: #ffffff;
    }
    .title_second {
      position: absolute;
      width: 250px;
      text-align: left;
      height: 35px;
      left: 840px;
      top: 148px;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 35px;
      line-height: 35px;
      /* identical to box height */

      letter-spacing: 0.07em;

      color: #ffffff;
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0px;
      gap: 4px;
      position: absolute;
      width: 433px;
      height: 344px;
      left: 840px;
      top: 248px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      /* identical to box height, or 34px */
      text-align: left;
      color: #ffffff;
      overflow: auto;
      .text_item {
        position: relative;
        margin-left: 30px;
      }
      .text_item::before {
        content: "";
        width: 10px;
        height: 10px;
        background-color: rgba(254, 255, 253, 1);
        position: absolute;
        top: 7px;
        left: -26px;
        transform: rotate(45deg);
      }
    }
    .content::-webkit-scrollbar {
      display: none;
    }
    .tabItemPage5 {
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      text-shadow: 0px 4px 0px rgba(29, 111, 121, 0.86);
      text-align: center;
      background: url("../assets/web/home/page6/page6_item.png") no-repeat
        center/cover;
      transition: all 0.2s linear;
      cursor: pointer;
    }
    .pos1 {
      position: absolute;
      width: 386px;
      height: 390px;
      left: 208px;
      top: 164px;
      text-align: center;
      line-height: 390px;
      font-size: 80px;
      color: #ffffff;

      // background: #000;
      span {
        display: inline-block;
        transition: none;
      }
    }
    .pos2 {
      position: absolute;
      width: 200px;
      height: 202px;
      left: 32px;
      top: 77px;
      text-align: center;
      line-height: 202px;
      font-size: 40px;
      opacity: 0.5;
      transition-timing-function: linear;
      color: #ffffff;
      // background: #000;
      span {
        display: inline-block;
      }
    }
 
    .pos3 {
      position: absolute;
      width: 200px;
      height: 202px;
      left: 576px;
      top: 77px;

      text-align: center;
      line-height: 202px;
      font-size: 40px;
      opacity: 0.5;
      transition-timing-function: linear;
      color: #ffffff;
      // background: #000;
      span {
        display: inline-block;
      }
    }
    .pos4 {
      position: absolute;
      width: 200px;
      height: 202px;
      left: 32px;
      top: 465px;

      text-align: center;
      line-height: 202px;
      font-size: 40px;
      opacity: 0.5;
      transition-timing-function: linear;
      color: #ffffff;
      // background: #000;
      span {
        display: inline-block;
      }
    }
    .pos5 {
      position: absolute;
      width: 200px;
      height: 202px;
      left: 576px;
      top: 465px;

      text-align: center;
      line-height: 202px;
      font-size: 40px;
      opacity: 0.5;
      transition-timing-function: linear;
      color: #ffffff;
      // background: #000;
      span {
        display: inline-block;
      }
    }
    .pos2:hover,.pos3:hover,.pos4:hover,.pos5:hover{
      transform: scale(1.1);
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
      background: url('../assets/web/home/icon/mobile_bg.webp') no-repeat center/cover;
      .mobileBg{
        width: 358px;
        height: 281px;
        position: absolute;
        top:0;
        left: 0;
      }
      .line3 {
        position: absolute;
        width: 1px;
        height: 284px;
        left: 22px;
        top: 281px;
        background: #454648;
      }
      .line1 {
        position: absolute;
        width: 2px;
        height: 182px;
        left: 22px;
        top: 346px;
        background: #ffffff;
      }
      .line2 {
        position: absolute;
        width: 6px;
        height: 27px;
        left: 22px;
        top: 292px;
        background: #3bbaf5;
      }
      .title {
        width: 120px;
        text-align: left;
        height: 20px;
        left: 42px;
        top: 302px;
        font-size: 20px;
        line-height: 7px;
      }
      .title_second {
        width: 140px;
        text-align: left;
        height: 20px;
        left: 42px;
        top: 335px;
        font-size: 20px;
        line-height: 20px;
      }
      .content {
        height: 192px;
        font-size: 12px;
        width: 280px;
        left: 42px;
        top: 360px;
        line-height: 150%;
        .text_item {
          position: relative;
          margin-left: 12px;
        }
        .text_item::before {
          content: "";
          width: 6px;
          height: 6px;
          background-color: rgba(254, 255, 253, 1);
          position: absolute;
          top: 6px;
          left: -10px;
          transform: rotate(45deg);
        }
      }
      .pos1 {
        width: 133px;
        height: 134px;
        left: 112px;
        top: 63px;
        font-size: 24px;
        line-height: 134px;
        text-shadow: 0px 1px 0px rgba(29, 111, 121, 0.86);

      }
      .pos2 {
        width: 89px;
        height: 90px;
        left: 18px;
        top: 18px;
        font-size: 16px;
        line-height: 90px;
        text-shadow: 0px 1px 0px rgba(29, 111, 121, 0.86);
      }
      .pos3 {
        width: 89px;
        height: 90px;
        left: 249px;
        top: 18px;
        font-size: 16px;
        line-height: 90px;
        text-shadow: 0px 1px 0px rgba(29, 111, 121, 0.86);
      }
      .pos4 {
        width: 89px;
        height: 90px;
        left: 18px;
        top: 180px;
        font-size: 16px;
        line-height: 90px;
        text-shadow: 0px 1px 0px rgba(29, 111, 121, 0.86);
      }
      .pos5 {
        width: 89px;
        height: 90px;
        left: 249px;
        top: 180px;
        font-size: 16px;
        line-height: 90px;
        text-shadow: 0px 1px 0px rgba(29, 111, 121, 0.86);
      }
  
    }
  }
}
</style>
