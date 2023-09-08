<template>
  <div class="main">
    <div class="flex-main" ref="content">
      <div class="infoRight" ref="tabLink" ></div>
      <img
        v-for="(item, index) in imgList"
        :key="index"
        :class="contentIndex==index?'opcityclass':'opcityclass1'"
        class="rightImgfariy"
        :src="isMobile?item.mobileUrl:item.bigUrl"
        alt=""
      />
      <div class="mobie_text_bg"></div>
      <div class="gruopLine"></div>
      <div class="groupTitle"></div>
      <div class="icon">
        <img :src="imgList[contentIndex].classUrl" alt="" />
      </div>
      <div class="icon_title" v-show="!isMobile" v-html="imgList[contentIndex].publice "></div>
      <div class="page_title">FARIY</div>
      <div class="title">{{ imgList[contentIndex].title }}</div>
      <div class="content">
        {{ imgList[contentIndex].text }}
      </div>
      <div class="link" @click="toUrl"></div>
      <div class="imgList" v-if="!this.isMobile">
        <div
          class="imgItem"
          @click="changeIndex(index)"
          v-for="(item, index) in imgList"
          :key="index"
        >
          <div class="selectedInfo" v-show="index == contentIndex">
            <div class="infoLeft">
              <p class="info">{{ imgList[index].title }}</p>
            </div>
          </div>
          <img v-show="index != contentIndex" :src="item.url" alt="" />
        </div>
      </div>
      <div class="imgList_moble" v-show="this.isMobile">
        <div class="swipermask"></div>
        <div class="swipermask1"></div>
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in imgList"
            :key="index"
            :class="`type${index}`"
          >
            <div class="content">{{ imgList[index].title }}</div>
            <img class="swiper-slide_img" :src="item.url" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  name: "himeFairy",
  data() {
    return {
      contentIndex: 1,
      img1: null,
      img2: null,
      timer: null,
      isInContent: false,
      imgList: [
        {
          title: "NOTT",
          publice: "Republic <br /> Navy",
          url: require("../assets/web/home/page4/frame1.webp"),
          classUrl: require("../assets/web/home/page4/namy.png"),
          bigUrl: require("../assets/web/home/page4/frame1_big.webp"),
          mobileUrl: require("../assets/web/home/page4/frame1_mobile.webp"),
          text: "She is the bulwark of the Republic Navy and the meat grinder of the Star Sea.",
        },
        {
          title: "MESSIAH",
          publice: "<span style='font-size: 1.375rem; margin-right:3px'>EI-LIFE</span>",
          url: require("../assets/web/home/page4/frame2.webp"),
          classUrl: require("../assets/web/home/page4/ellife.png"),
          bigUrl: require("../assets/web/home/page4/frame2_big.webp"),
          mobileUrl: require("../assets/web/home/page4/frame2_mobile.webp"),
          text: "She   loves everyone and everyone loves her. She watches over her life and she no   longer has her life suffer because of him.",
        },
        {
          title: "VALKYRJA",
          publice: "Republic <br />Navy",
          url: require("../assets/web/home/page4/frame3.webp"),
          classUrl: require("../assets/web/home/page4/namy.png"),
          bigUrl: require("../assets/web/home/page4/frame3_big.webp"),
          mobileUrl: require("../assets/web/home/page4/frame3_mobile.webp"),
          text: "Her bravery is unmatched, and she believes that life will be saved in war.",
        },
        {
          title: "LEVIATHAN",
          publice: "Black Aqua",
          url: require("../assets/web/home/page4/frame4.webp"),
          classUrl: require("../assets/web/home/page4/aqua.png"),
          bigUrl: require("../assets/web/home/page4/frame4_big.webp"),
          mobileUrl: require("../assets/web/home/page4/frame4_mobile.webp"),
          text: "As the   leader of Black Aqua's elite combat team, she executes the most dangerous   missions with precision and skill, striking fear into the hearts of her   enemies. With Leviathan leading the charge, victory is all but assured.",
        },
        {
          title: "SAYA&MAYA",
          publice: "Nova<br /> Entertainment",
          url: require("../assets/web/home/page4/frame5.webp"),
          classUrl: require("../assets/web/home/page4/nova.png"),
          bigUrl: require("../assets/web/home/page4/frame5_big.webp"),
          mobileUrl: require("../assets/web/home/page4/frame5_mobile.webp"),
          text: "Saya and   Maya are twin sisters and renowned dancers of Nova Entertainment. Born into a   famous artistic family, they showed exceptional talent for dance from a young   age. Their performances are full of passion and energy. And always captivate   audiences with their elegant postures and superb skills, making them a   highlight of the company.",
        },
        {
          title: "HEL",
          publice: "<span style='font-size: 1.375rem; margin-right:3px'>EI-LIFE</span>",
          url: require("../assets/web/home/page4/frame6.webp"),
          classUrl: require("../assets/web/home/page4/ellife.png"),
          bigUrl: require("../assets/web/home/page4/frame6_big.webp"),
          mobileUrl: require("../assets/web/home/page4/frame6_mobile.webp"),
          text: "The boundary between life and death is not so clear, what can save people can also kill people.",
        },
      ],
    };
  },
  mounted() {
    this.preloaderImg();
    this.changeIndex(0);
    this.initSwiper();
    // window.onresize();
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
  computed: {
    isMobile() {
      this.$store.commit("setMobile");
      return this.$store.state.isMobile;
    },
  },
  methods: {
    initSwiper() {
      let _self = this;
      this.mySwiper2 = new Swiper(".imgList_moble", {
        autoplay: true,
        loop: true,
        centeredSlides: true,
        slidesPerView: 5,
        spaceBetween: 0,
        direction: "horizontal",
        breakpointsBase: "contaniner",
        slideToClickedSlide:true,
        on: {
          slideChangeTransitionStart() {
            document.getElementsByClassName("swipermask")[0].style.transition =
              "none";
            document.getElementsByClassName("swipermask1")[0].style.transition =
              "none";
            document.getElementsByClassName("swipermask")[0].style.opacity = 0;
            document.getElementsByClassName("swipermask1")[0].style.opacity = 0;
          },
          touchMove() {
            document.getElementsByClassName("swipermask")[0].style.transition =
              "none";
            document.getElementsByClassName("swipermask1")[0].style.transition =
              "none";
            document.getElementsByClassName("swipermask")[0].style.opacity = 0;
            document.getElementsByClassName("swipermask1")[0].style.opacity = 0;
          },
          slideChangeTransitionEnd: function () {
            _self.changeIndex(
              (this.activeIndex - 5) % 6 >= 0 ? (this.activeIndex - 5) % 6 : 5
            );
            document.getElementsByClassName("swipermask")[0].style.transition =
              "opcity , 0.3s linear";
            document.getElementsByClassName("swipermask1")[0].style.transition =
              "opcity , 0.3s linear";
            document.getElementsByClassName("swipermask")[0].style.opacity = 1;
            document.getElementsByClassName("swipermask1")[0].style.opacity = 1;
          },
        },
      });
    },

    aniChange() {
      if (this.isMobile) return;
      if (
        this.$refs.content.getBoundingClientRect().top < 500 &&
        this.$refs.content.getBoundingClientRect().top > -500 &&
        this.timer == null
      ) {
        let _self = this;
        this.timer = window.setInterval(() => {
          if (_self.isInContent) return;
          let index = _self.contentIndex + 1;
          if (index == 6) {
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
    preloaderImg() {
      if (document.images) {
        this.imgList.forEach((item) => {
          let img = new Image();
          img.src = this.isMobile ? item.mobileUrl : item.bigUrl;
        });
      }
    },
    changeIndex(index) {
      if (this.contentIndex == index) return;
      this.contentIndex = index;
      switch (index) {
        case 0:
          this.$refs.tabLink.style.top = "3rem";
          break;
        case 1:
          this.$refs.tabLink.style.top = "9.8125rem";
          break;
        case 2:
          this.$refs.tabLink.style.top = "16.625rem";
          break;
        case 3:
          this.$refs.tabLink.style.top = "23.4375rem";
          break;
        case 4:
          this.$refs.tabLink.style.top = "30.25rem";
          break;
        case 5:
          this.$refs.tabLink.style.top = "37.0625rem";
          break;
      }
       
    },
    toUrl(){
      window.open("https://opensea.io/collection/moon-touch", "_blank");
    }
  },
};
</script>

<style lang="scss" scoped>
@keyframes selectLeftWidth {
  from {
    transform: translate(299px);
  }
  to {
    transform: translate(0);
  }
}
.opcityclass {
  opacity: 1;
}
.opcityclass1 {
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
    background: url("../assets/web/home/page4/page4_bg.webp") no-repeat
      center/cover;
    position: absolute;
    top: 138px;
    left: 300px;
    overflow: hidden;
    .infoRight {
      width: 14px;
      height: 100px;
      background: #f4a53e;
      position: absolute;
      right: 0;
      top: 48px;
      transition: top 0.5s linear;
      z-index: 3;
    }
    .gruopLine {
      position: absolute;
      width: 2px;
      height: 740px;
      left: 192px;
      top: 0px;
      background: #454648;
    }
    .groupTitle {
      position: absolute;
      width: 12px;
      height: 50px;
      left: 192px;
      top: 44px;
      background: #f4a53e;
    }
    .groupIndex {
      position: absolute;
      width: 4px;
      height: 260px;
      left: 192px;
      top: 228px;
      background: #ffffff;
    }
    .icon {
      position: absolute;
      width: 81.5px;
      height: 70px;
      left: 222px;
      top: 78px;
      img {
        width: 81.5px;
        height: 70px;
      }
    }
    .icon_title {
      position: absolute;
      width: 100px;
      height: 30px;
      left: 216px;
      text-align: center;
      top: 159px;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      /* identical to box height */
      letter-spacing: 0.07em;
      color: #ffffff;
    }
    .page_title {
      position: absolute;
      width: 107px;
      height: 36px;
      left: 49px;
      top: 50px;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 40px;
      line-height: 36px;
      /* identical to box height */
      letter-spacing: 0.07em;

      color: #ffffff;
    }
    .title {
      position: absolute;
      width: 125px;
      height: 35px;
      left: 219px;
      top: 253px;
      font-family: "ADAMa";
      font-style: normal;
      text-align: left;
      font-weight: 400;
      font-size: 30px;
      line-height: 35px;
      /* identical to box height */
      letter-spacing: 0.07em;
      color: #ffffff;
    }
    .content {
      position: absolute;
      width: 362px;
      height: 250px;
      left: 221px;
      top: 306px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      overflow: auto;
      line-height: 150%;
      /* or 27px */
      text-align: left;
      color: #ffffff;
      z-index: 9;
    }
    .content::-webkit-scrollbar {
      display: none;
    }
    .link {
      position: absolute;
      width: 50px;
      height: 50px;
      left: 224px;
      top: 550px;
      background: url("../assets/web/home/icon/frame.png") no-repeat
        center/contain;
        cursor: pointer;
    }
    .rightImgfariy {
      height: 740px;
      position: absolute;
      right: 0px;
      border-radius: 60px;
      transition: opacity 0.5s linear 0.2s;
      transform: translate3d(0, 0, 0);
      will-change: transform;
    }
    .imgList {
      width: 100px;
      height: 645px;
      position: absolute;
      right: 32px;
      top: 48px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .selectedInfo {
        width: 229px;
        height: 100px;
        position: absolute;
        right: -28px;
        display: flex;
        justify-content: space-between;
        // transform: translate3d(0, 0, 0);

        .infoLeft {
          width: 206px;
          height: 100px;
          overflow: hidden;
          .info {
            width: 200px;
            height: 100px;
            text-align: center;
            color: #ffffff;
            border-radius: 10px;
            background: #f4a53e;
            font-size: 28px;
            font-weight: 700;
            font-family: "fary";
            line-height: 100px;
            font-weight: 400;
            letter-spacing: 0.07em;
            margin-left: 4px;
            animation: selectLeftWidth 0.5s linear;
          }
        }
      }

      .imgItem {
        width: 100px;
        height: 100px;
        cursor: pointer;
        img {
          width: 100px;
          height: 100px;
        }
        img:hover {
          transform: scale(1.05);
          transition: 0.2s linear;
        }
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
      top:42px;
      border-radius: 25px;
      background: url("../assets/web/home/icon/mobile_bg.webp") no-repeat
        center/cover;
      overflow: hidden ;
      -webkit-transform:rotate(0deg);
      .infoRight {
        display: none;
      }
      .imgList {
        display: none;
      }
      .gruopLine {
        position: absolute;
        width: 358px;
        height: 3px;
        left: 0px;
        top: 358px;
        background: #454648;
      }
      .groupTitle {
        position: absolute;
        width: 97px;
        height: 9px;
        left: 130px;
        top: 358px;
        background: #f4a53e;
      }
      .rightImgfariy {
        position: absolute; 
        z-index: 0;
        border-radius: 25px 25px 25px 25px;
        height: 390px;
        height: 570px;
        left: 0px;
        top: 0px;
        transform: rotate(0deg)
      }
      .icon {
        width: 44px;
        height: 37px;
        top: 378px;
        left: 156px;
        img {
          width: auto;
          height: 37px;
        }
      }
      .mobie_text_bg {
        position: absolute;
        width: 358px;
        height: 207px;
        left: 0px;
        bottom: 0px;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 0px 0px 25px 25px;
      }
      .icon_title {
        font-size: 12px;
        line-height: 12px;
        width: 155px;
        height: 12px;
        text-align: center;
        left: 100px;
        top: 424px;
      }
      .page_title {
        height: 25px;
        width: 94px;
        font-size: 24px;
        line-height: 28px;
        text-align: right;
        border-left: 6px solid #53f5ff;
        left: 24px;
        top: 377px;
      }
      .content {
        width: 338px;
        height: 112px;
        left: 15px;
        top: 430px;
        font-size: 12px;
        line-height: 150%;
        text-align: left;
      }
      .title {
        font-size: 20px;
        width: 120px;
        height: 20px;
        position: absolute;
        left: 210px;
        text-align: right;
        top: 400px;
        display: none;
      }
      .groupIndex {
        width: 25.41px;
        height: 5px;
        left: 328px;
        top: 410px;
        transform: rotate(-89.7deg);
        display: none;
      }

      .link {
        position: absolute;
        width: 24px;
        height: 24px;
        left: 322px;
        top: 14px;
        // background: #2081e2;
        // background: url("../assets/web/home_sprite.webp") no-repeat center/cover;
        // background-size: 1920px 1080px;
        // background-position: -1111px -6px;
      }
      .imgList_moble {
        width: 386px;
        height: 62px;
        position: absolute;
        top: 290px;
        left: -15px;
        display: block;
        .swiper-wrapper {
          width: 386px;
          height: 62px;
          margin-left: -13px;
        }
        .swiper-slide {
          width: 62px;
          height: 62px;
          position: relative;
          .content {
            display: none;
          }
        }
        .swipermask {
          width: 62px;
          height: 62px;
          position: absolute;
          background: rgba(0, 0, 0, 0.3);
          // background: #000;
          left: 335px;
          border-radius: 10px;
          top: 0;
          z-index: 3;
        }
        .swipermask1 {
          width: 62px;
          height: 62px;
          position: absolute;
          background: rgba(0, 0, 0, 0.3);
          // background: #000;
          left: -12px;
          border-radius: 10px;
          top: 0;
          z-index: 3;
        }
        .swiper-slide-active {
          width: 102px !important;
          background: #f4a53e !important;
          border-radius: 10px !important;
          margin-right: 15px !important;
          position: relative;
          img {
            display: none;
          }
          .content {
            position: absolute;
            width: 102px;
            height: 62px;
            top: 0;
            left: 0;
            display: block;
            font-family: "fary";
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            text-align: center;
            line-height: 62px;
            letter-spacing: 0.07em;
            color: #ffffff;
          }
        }
        .swiper-slide_img {
          position: relative;
          width: 62px;
          height: 62px;
          animation: slide_img_anim 0.5s linear 0.2s forwards;
        }
      }
    }
  }
}
</style>
