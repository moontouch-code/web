<template>
  <div class="page_2_main">
    <div class="flex_main" ref="content">
      <img
        v-for="(item, index) in tabList"
        :key="index"
        :class="tabIndex==index?'opcityclass':'opcityclass1'"
        class="imgIndex"
        :src="isMobile?item.mobileUrl1:item.url"
        alt=""
      />
      <div class="rectangle-4">
        <div class="tabList">
          <div
            class="tabItem"
            :class="tabIndex == item.index ? 'selected' : 'deSelect'"
            v-for="(item, index) in tabList"
            :key="index"
            @click="changeContent(index)"
          >
            <div class="titleLine"></div>
            <p class="tabTitle">{{ item.title }}</p>
          </div>
        </div>
      </div>
      <div class="page_title">STORY</div>
      <div class="rectangle-5">
        <div class="rectangle-6"></div>
        <div class="num-2713">{{ tabList[tabIndex].title }}</div>
        <p class="textContent" v-html="tabList[tabIndex].text"></p>
      </div>

      <div class="mobile_line1"></div>
      <div class="mobile_line2"></div>
      <div class="mobile_line3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeStory",
  data() {
    return {
      tabIndex: 1,
      imgurl1: null,
      imgurl2: null,
      timer: null,
      isInContent: false,
      tabList: [
        {
          title: "2710",
          index: 0,
          text: "1.Chief Scientist D Mary Lynn created the new intelligent bionic life form - Fairy.<br />2. A research institution dedicated to the study of new life forms jointly funded by the four major Zaibatsu of the New Universe Century.",
          url: require("../assets/web/home/page2/2710.webp"),
          mobileUrl1: require("../assets/web/home/page2/2710_mobile.png"),
        },
        {
          title: "2713",
          index: 1,
          text: "Oriental Transit provided Bionic Thinking,<br /> created and successfully operated<br /> Fairy&#039;s prototype - Type Zero",
          url: require("../assets/web/home/page2/2713.webp"),
          mobileUrl1: require("../assets/web/home/page2/2713_mobile.png"),
        },
        {
          title: "2714",
          index: 2,
          text: "1.Black Aqua provides super-strengthened bionic military prosthetics for new life forms.<br />2.Black Aqua has the intention of militarizing Fairy. There have been serious differences of opinion with other Zaibatsu in the official application of Fairy.",
          url: require("../assets/web/home/page2/2714.webp"),
          mobileUrl1: require("../assets/web/home/page2/2714_mobile.png"),
        },
        {
          title: "2715",
          index: 3,
          text: "1. In order to avoid the further development of the project from deviating from its purpose due to the disagreement of Zaibatsu. Temporarily freeze the project and all related technologies. <br />2. During the freezing period of the project, the 7 core researchers led by D. Mary Lynn disappeared mysteriously after the armed attack on the Anima Agency.",
          url: require("../assets/web/home/page2/2715.webp"),
          mobileUrl1: require("../assets/web/home/page2/2715_mobile.png"),
        },
        {
          title: "2716",
          index: 4,
          text: "The four major Zaibatsu finally decided to abandon the plan and recover the relevant technical data of Type Zero. The news was blocked to the outside world. ",
          url: require("../assets/web/home/page2/2716.webp"),
          mobileUrl1: require("../assets/web/home/page2/2716_mobile.png"),
        },
        {
          title: "2717",
          index: 5,
          text: "Led by El Life, the fourth-generation humanoid robot (Fairy) was launched to the market. Oriental Transit, Black Aqua, and Nova Entertainment successfully launched humanoid robots (Fairy) in their business fields.",
          url: require("../assets/web/home/page2/2717.webp"),
          mobileUrl1: require("../assets/web/home/page2/2717_mobile.png"),
        },
        {
          title: "2718",
          index: 6,
          text: "With the popularization of the fourth generation of Fairy, besides the four Zaibatsu, others are also constantly improving or upgrading Fairies. There is even a mind manifestation technology monopolized by Zaibatsu, thus giving birth to a new Fairy.",
          url: require("../assets/web/home/page2/2718.webp"),
          mobileUrl1: require("../assets/web/home/page2/2718_mobile.png"),
        },
        {
          title: "2719",
          index: 7,
          text: "1. You have received a mysterious email inviting you to install an artificial intelligence APP. <br />2. The mysterious organization begins to help guide Fairies by recruiting people from other worlds. Awaken the consciousness deeper in the mind and shake the authority of the four major Zaibatsu in the Empire. ",
          url: require("../assets/web/home/page2/2719.webp"),
          mobileUrl1: require("../assets/web/home/page2/2719_mobile.png"),
        },
        {
          title: "NEW",
          index: 8,
          text: "The legend begins when you open the APP and receive your first mission.",
          url: require("../assets/web/home/page2/new.webp"),
          mobileUrl1: require("../assets/web/home/page2/new_mobile.png"),
        },
      ],
    };
  },
  methods: {
    changeContent(index) {
      if (this.tabIndex == index) return;
      this.tabIndex = index;
      if(!this.isMobile)
      this.setContentWidth();
      document
        .getElementsByClassName("rectangle-5")[0]
        .classList.add("actionContent");
      document
        .getElementsByClassName("textContent")[0]
        .classList.add("opcityclass1");
      window.setTimeout(() => {
        document
          .getElementsByClassName("rectangle-5")[0]
          .classList.remove("actionContent");
        document
          .getElementsByClassName("textContent")[0]
          .classList.remove("opcityclass1");
      }, 500);
    },
    setContentWidth() {
      if (
        this.tabList[this.tabIndex].text.length > 200 &&
        this.tabList[this.tabIndex].text.length <= 250
      ) {
        document.getElementsByClassName("rectangle-5")[0].style.width =
          "31.25rem";
        document
          .getElementsByTagName("body")[0]
          .style.setProperty("--cWidth", "31.25rem");
      } else if (
        this.tabList[this.tabIndex].text.length > 250 &&
        this.tabList[this.tabIndex].text.length <= 300
      ) {
        document.getElementsByClassName("rectangle-5")[0].style.width = "41rem";
        document
          .getElementsByTagName("body")[0]
          .style.setProperty("--cWidth", "41rem");
      } else if (this.tabList[this.tabIndex].text.length > 300) {
        document.getElementsByClassName("rectangle-5")[0].style.width = "47rem";
        document
          .getElementsByTagName("body")[0]
          .style.setProperty("--cWidth", "47rem");
      } else {
        document.getElementsByClassName("rectangle-5")[0].style.width =
          "28.5rem";
        document
          .getElementsByTagName("body")[0]
          .style.setProperty("--cWidth", "28.5rem");
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
          let index = _self.tabIndex + 1;
          if (index == 9) {
            index = 0;
          }
          _self.changeContent(index);
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
    this.changeContent(0);
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
};
</script>

<style lang="scss" scoped>
$contentWidth: var(--cWidth, 450px);
@keyframes contentshow {
  from {
    opacity: 0;
    width: 0;
  }
  to {
    opacity: 1;
    width: $contentWidth;
  }
}
@keyframes animate1 {
  from {
    opacity: 0;
    width: 10px;
    height: 10px;
  }
  to {
    opacity: 1;
    width: 12px;
    height: 12px;
  }
}
@keyframes titleLine {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.actionContent {
  animation: contentshow 0.2s;
}
.opcityclass {
  opacity: 1;
}
.opcityclass1 {
  opacity: 0;
}
.page_2_main {
  width: 100%;
  height: 940px;
  position: relative;
  .flex_main {
    position: absolute;
    width: 1374px;
    height: 740px;
    left: 300px;
    top: 138px;
    overflow: hidden;
    border-radius: 50px;
    -webkit-transform:rotate(0deg);
    .imgIndex {
      width: 1374px;
      height: 740px;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      transition: opacity 0.2s linear;
    }
    .rectangle-4 {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      padding: 0px;
      gap: 10px;
      position: absolute;
      width: 141px;
      height: 740px;
      right: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 0px 50px 50px 0px;
      .tabList {
        position: absolute;
        width: 114.97px;
        height: 640px;
        right: 17px;
        top: 30px;
        .tabItem {
          position: relative;
          width: 300px;
          height: 65px;
          .titleLine {
            position: absolute;
            height: 65px;
            width: 50px;
            left: -58px;
            background: rgba(0, 0, 0, 0.7);
            z-index: 1;
            border-radius: 9px 0px 0px 9px;
            border-left: 15px #26fff2 solid;
            opacity: 0;
          }
          .tabTitle {
            font-family: "ADAMa";
            font-style: normal;
            font-weight: 400;
            width: 130px;
            height: 65px;
            line-height: 65px;
            margin-top: 8px;
            color: #ffffff;
            letter-spacing: 0.07em;
            position: relative;
            z-index: 2;
            cursor: pointer;
            transition: all 0.2s linear;
          }
        }

        .deSelect:hover {
          font-size: 35px;
        }
        .deSelect {
          font-size: 30px;
        }
        .selected {
          .tabTitle {
            color: #26fff2;
            font-size: 35px;
            transform: translateX(-30px);
          }
          .titleLine {
            animation: titleLine 0.2s linear forwards;
          }
        }
      }
    }
  }
}

.rectangle-5 {
  width: 452px;
  height: 267px;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  left: 0;
  top: 420px;
  overflow: hidden;
  transition: width;
}
.rectangle-6 {
  width: 12px;
  height: 50px;
  background-color: #00a2ff;
  position: absolute;
  left: 0;
  top: 18px;
}

.num-2713 {
  font-family: "ADAMa";
  font-size: 30px;
  font-weight: 400;
  line-height: normal;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  text-align: left;
  left: 51px;
  top: 26px;
  width: 333px;
  height: 93px;
  letter-spacing: 5.18px;
}

.textContent {
  position: absolute;
  height: 170px;
  width: calc(var(--cWidth) - 100px);
  left: 51px;
  top: 92px;
  font-family: "Arial";
  font-style: normal;
  text-align: left;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  overflow: scroll;
  /* or 31px */
  color: #ffffff;
  overflow: hidden;
}
.page_title {
  position: absolute;
  width: 200px;
  height: 80px;
  left: 0px;
  top: 44px;
  font-family: "ADAMa";
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 80px;
  text-align: center;
  padding-left: 8px;
  border-left: 12px #00a2ff solid;
  background: rgba(0, 0, 0, 0.6);
  /* identical to box height */

  letter-spacing: 0.07em;

  color: #ffffff;
}
@keyframes animate2 {
  from {
    opacity: 0;
    width: 4px;
    height: 4px;
  }
  to {
    opacity: 1;
    width: 6px;
    height: 6px;
  }
}
@media only screen and (max-width: 1100px) {
  .page_2_main {
    width: 100%;
    height: 649px;
    position: relative;
    margin-top: 42px;
    .flex_main {
      position: absolute;
      width: 358px;
      height: 565px;
      border-radius: 25px;
      left: 17px;
      top:42px;
      overflow: hidden;
      background: url("../assets/web/home/icon/mobile_bg.webp") no-repeat
        center/cover;
      .imgIndex {
        width: 358px;
        height: 281px;
        position: absolute;
        top: 0;
        left: 0;
        transition: 0.5s opacity linear;
      }
      .rectangle-4 {
        position: absolute;
        width: 66px;
        height: 281px;
        top: 0px;
        right: 0px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 0px;
        gap: 10px;
        position: absolute;
        // background: red;
        border-radius: 0px 25px 0px 0px;
        .tabList {
          position: absolute;
          width: 66px;
          height: 281px;
          top: -10px;
          left: 0;
          .tabItem {
            position: relative;
            width: 34px;
            height: 14px;
            .titleLine {
              position: absolute;
              height: 25px;
              width: 20px;
              left: -20px;
              background: rgba(0, 0, 0, 0.7);
              z-index: 1;
              border-radius: 5px 0px 0px 5px;
              border-left: 5px #26fff2 solid;
              opacity: 0;
            }
            .tabTitle {
              font-family: "ADAMa";
              font-style: normal;
              font-weight: 400;
              width: 34px;
              height: 14px;
              line-height: 25px;
              margin-top: 16px;
              margin-left: 15px;
              color: #ffffff;
              letter-spacing: 0.07em;
              position: relative;
              z-index: 2;
              cursor: pointer;
              transition: all 0.5s linear;
            }
          }

          .deSelect:hover {
            font-size: 14px;
          }
          .deSelect {
            font-size: 14px;
          }
          .selected {
            .tabTitle {
              color: #26fff2;
              font-size: 20px;
              transform: translateX(-20px);
            }
            .titleLine {
              animation: titleLine 0.7s linear forwards;
            }
          }
        }
      }
    }
  }
  .rectangle-5 {
    width: 358px;
    height: 285px;
    left: 0px;
    top: 281px;
    background: none;
  }
  .rectangle-6 {
    display: none;
  }
  .mobile_line1 {
    position: absolute;
    width: 1px;
    height: 283px;
    left: 24px;
    top: 281px;
    background: #454648;
  }
  .mobile_line2 {
    position: absolute;
    width: 6px;
    height: 25px;
    left: 24px;
    top: 297px;
    background: #3b64f5;
  }
  .num-2713 {
    position: absolute;
    width: 56px;
    height: 24px;
    left: 42px;
    top: 17px;
    font-family: "ADAMa";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 24px;
    /* identical to box height */

    letter-spacing: 0.07em;

    color: #ffffff;
  }
  .textContent {
    position: absolute;
    width: 300px;
    height: 200px;
    left: 42px;
    top: 79px;
    font-family: "Arial";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    /* or 24px */
    color: #ffffff;
  }
  .page_title {
    width: 93px;
    height: 38px;
    font-size: 20px;
    line-height: 38px;
    top: 18px;
    border-left: 9px solid #00a2ff;
  }
}
</style>
