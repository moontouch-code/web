<template>
  <div class="main">
    <div class="flex-main">
      <div class="line"></div>
      <div class="line2"></div>
      <div class="title">SETTLEMENT</div>
      <div class="img_main" ref="tagMain">
        <div
          v-for="(item, index) in tabList"
          :key="index"
          class="tag"
          :class="item.claName"
        ></div>
      </div>
      <div
        class="toplist"
        v-clickoutside="handleClose"
        v-show="popShow"
        ref="pop"
      >
        <div class="content">{{ text }}</div>
        <div class="buttom"></div>
        <div class="line"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import clickoutside from "../utils/clickOutSide";
export default {
  name: "homePartner",
  directives: { clickoutside },
  data() {
    return {
      popShow: false,
      canChange: true,
      text: "",
      canClose: false,
      tabList: [
        {
          claName: "tag1",
          text: "Output time: Contains rewards and costs Warm up: no rewards and costs",
        },
        {
          claName: "tag2",
          text: "The distance of this exercise",
        },
        {
          claName: "tag3",
          text: "The number of steps in this exercise",
        },
        {
          claName: "tag4",
          text: "Average stride length for this exercise",
        },
        {
          claName: "tag5",
          text: "Player's sports evaluation and basic output: the number of each evaluation in the player's sports and the corresponding basic rewards will be counted.",
        },
        {
          claName: "tag6",
          text: "Additional rewards from using items",
        },
        {
          claName: "tag7",
          text: "Additional rewards from Fairy mint",
        },
        {
          claName: "tag8",
          text: "The server is initially based on the data of professional athletes personnel to check the exercise status. which theoretically places them at a higher level than most ordinary players. However, as we continue to collect real exercise data from ordinary players and utilize machine learning, exercise status calculations will become more representative of the general exercise level of all MT players. The current display does not actually deduct your exercise rewards; it is only used to indicate the difference between your exercise status and the professional athletes status. It indicates that there is room for improvement in your exercise level. When this value is negative, it means there is room for improvement in your exercise status, as it is lower than the set optimal exercise status. You will receive rewards based on actual exercise achievements. When this value is positive, it means your exercise level has exceeded the predetermined exercise status, and you will receive additional rewards.",
        },
        {
          claName: "tag9",
          text: "Additional rewards exclusive to Genesis Fairy",
        },
        {
          claName: "tag10",
          text: "Final rewards for this run",
        },
      ],
    };
  },
  mounted() {
    document.getElementsByClassName("tag1")[0].classList.add("shine");
    if (!this.isMobile) {
      this.$refs.tagMain.addEventListener("mouseover", (e) => {
        if (
          document.getElementsByClassName("tag1")[0].classList.contains("shine")
        ) {
          document.getElementsByClassName("tag1")[0].classList.remove("shine");
        }
        if (e.target.classList.contains("img_main")) return;
        let top8 = e.target.classList.contains("tag8") ? 500 : 0;
        const top =
          (parseInt(this.getStyle(e.target, "top")) + 81 - top8) /
            parseFloat(document.documentElement.style.fontSize) +
          "rem";
        this.$refs.pop.style.top = top;
        let taget = e.target.classList[1];
        this.text = this.tabList[taget.slice(3) - 1].text;
        this.popShow = true;
      });
      this.$refs.tagMain.addEventListener("mouseout", (e) => {
        if (!this.canChange) return;
        this.popShow = false;
        this.text = "";
      });
      this.$refs.tagMain.addEventListener("click", (e) => {
        this.canChange = !this.canChange;
      });
    } else {
      this.$refs.tagMain.addEventListener("click", (e) => {
        if (
          document.getElementsByClassName("tag1")[0].classList.contains("shine")
        ) {
          document.getElementsByClassName("tag1")[0].classList.remove("shine");
        }
        if (e.target.classList.contains("img_main")) return;
        this.canClose = false;
        let taget = e.target.classList[1];
        this.text = this.tabList[taget.slice(3) - 1].text;
        this.popShow = true;
        setTimeout(() => {
          this.canClose = true;
        });
      });
    }
  },
  computed: {
    isMobile() {
      this.$store.commit("setMobile");
      return this.$store.state.isMobile;
    },
  },
  methods: {
    getStyle(obj, attr) {
      if (obj.currentStyle) {
        return obj.currentStyle[attr];
      } else {
        return document.defaultView.getComputedStyle(obj, null)[attr];
      }
    },
    handleClose() {
      if (this.popShow && this.canClose) this.popShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes shine {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.shine {
  animation: shine 2s ease infinite;
}
.main {
  width: 100%;
  height: 100vh;
  background: url("../assets/web/activity2/bg.webp") no-repeat center/cover;
  position: relative;
  .flex-main {
    width: 1374px;
    height: 740px;
    border-radius: 60px;
    position: absolute;
    background: url("../assets/web/activity2/main_bg.webp") no-repeat
      center/cover;
    top: 138px;
    left: 300px;
    .line {
      position: absolute;
      width: 2px;
      height: 740px;
      left: 72px;
      top: 0px;
      background: #454648;
    }
    .line2 {
      width: 12px;
      height: 50px;
      background: #3ce0f3;
      position: absolute;
      left: 72px;
      top: 44px;
    }
    .title {
      position: absolute;
      width: 222px;
      height: 40px;
      left: 100px;
      top: 49px;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 40px;
      line-height: 40px;
      /* identical to box height */
      letter-spacing: 0.07em;
      color: #ffffff;
    }
    .img_main {
      position: absolute;
      width: 360px;
      height: 592px;
      left: 528px;
      top: 81px;
      background: url("../assets/web/activity2/frame.webp") no-repeat
        center/cover;
      .tag:hover {
        opacity: 1;
      }
      .tag {
        cursor: pointer;
        transition: opacity 0.2s linear;
      }
      .tag1 {
        position: absolute;
        width: 360px;
        height: 24px;
        left: 0;
        top: 35px;
        background: url("../assets/web/activity2/tag1.webp") no-repeat
          center/cover;
        opacity: 0;
      }
      .tag2 {
        position: absolute;
        width: 360px;
        height: 24px;
        left: 0px;
        top: 67px;
        background: url("../assets/web/activity2/tag2.webp") no-repeat
          center/cover;
        opacity: 0;
      }
      .tag3 {
        position: absolute;
        width: 360px;
        height: 24px;
        left: 0px;
        top: 99px;
        background: url("../assets/web/activity2/tag3.webp") no-repeat
          center/cover;
        opacity: 0;
      }
      .tag4 {
        position: absolute;
        width: 360px;
        height: 24px;
        left: 0px;
        top: 131px;
        background: url("../assets/web/activity2/tag4.webp") no-repeat
          center/cover;
        opacity: 0;
      }
      .tag5 {
        position: absolute;
        width: 360px;
        height: 238px;
        left: 0px;
        top: 170px;
        background: url("../assets/web/activity2/tag5.webp") no-repeat
          center/cover;
        opacity: 0;
      }
      .tag6 {
        position: absolute;
        width: 360px;
        height: 20px;
        left: 0px;
        top: 417px;
        background: url("../assets/web/activity2/tag6.webp") no-repeat
          center/cover;
        opacity: 0;
      }
      .tag7 {
        position: absolute;
        width: 360px;
        height: 20px;
        left: 0px;
        top: 442px;
        background: url("../assets/web/activity2/tag7.webp") no-repeat
          center/cover;
        opacity: 0;
      }
      .tag8 {
        position: absolute;
        width: 360px;
        height: 20px;
        left: 0px;
        top: 467px;
        background: url("../assets/web/activity2/tag8.webp") no-repeat
          center/cover;
        opacity: 0;
      }
      .tag9 {
        position: absolute;
        width: 360px;
        height: 20px;
        left: 0px;
        top: 492px;
        background: url("../assets/web/activity2/tag9.webp") no-repeat
          center/cover;
        opacity: 0;
      }
      .tag10 {
        position: absolute;
        width: 360px;
        height: 26px;
        left: 0px;
        top: 521px;
        background: url("../assets/web/activity2/tag10.webp") no-repeat
          center/cover;
        opacity: 0;
      }
    }
    .toplist {
      position: absolute;
      width: 360px;
      min-height: 104px;
      border: 1px solid #fffcb1;
      background: rgba(37, 28, 2, 0.7);
      left: 925px;
      top: 96px;
      border-radius: 10px 0px 0px 0px;
      .content {
        width: 297px;
        font-family: "Arial";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        /* or 24px */
        color: #ffffff;
        padding-top: 20px;
        padding-bottom: 20px;
        margin-left: 30px;
        text-align: left;
        user-select: text;
      }
      .line {
        position: absolute;
        width: 30px;
        height: 3px;
        background: #d9d9d9;
        left: 5px;
        top: -3px;
      }
      .line2 {
        position: absolute;
        width: 3px;
        height: 18px;
        left: -3px;
        top: 5px;
        background: #d9d9d9;
      }
      .line3 {
        width: 12px;
        height: 3px;
        background: #d9d9d9;
        position: absolute;
        top: 0px;
        left: -3px;
        transform: rotate(-45deg);
      }
      .buttom {
        width: 38px;
        height: 28px;
        border-right: 3px solid #d9d9d9;
        border-bottom: 3px solid #d9d9d9;
        position: absolute;
        right: -3px;
        bottom: -3px;
      }
    }
  }
}
@media only screen and (max-width: 1100px) {
  .main {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    .flex-main {
      position: absolute;
      width: 358px;
      height: 565px;
      left: 17px;
      top: 100px;
      border-radius: 25px;
      background: url("../assets/web/activity2/bg_mobile.webp") no-repeat
        center/cover;
      .line {
        position: absolute;
        width: 1px;
        height: 565px;
        left: 20px;
        top: 0px;
        background: #454648;
      }
      .line2 {
        width: 6px;
        height: 25px;
        background: #3ce0f3;
        position: absolute;
        left: 20px;
        top: 37px;
      }
      .title {
        position: absolute;
        width: 100px;
        height: 40px;
        left: 34px;
        top: 30px;
        text-align: left;
        font-family: "ADAMa";
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 40px;
        /* identical to box height */
        letter-spacing: 0.07em;
        color: #ffffff;
      }
      .img_main {
        position: absolute;
        // width: 273px;
        // height: 443px;
        left: 0px;
        top: 0px;
        transform: scale(0.7);
        background: url("../assets/web/activity2/frame.webp") no-repeat
          center/cover;
        .tag:hover {
          opacity: 1;
        }
        .tag {
          cursor: pointer;
        }
        // .tag1 {
        //   position: absolute;
        //   width: 268px;
        //   height: 19px;
        //   left: 3px;
        //   top: 26px;
        //   background: url("../assets/web/activity2/tag1.webp") no-repeat
        //     center/cover;
        //   opacity: 0;
        // }
        // .tag2 {
        //   position: absolute;
        //   width: 268px;
        //   height: 19px;
        //   left: 0px;
        //   top: 50px;
        //   background: url("../assets/web/activity2/tag2.webp") no-repeat
        //     center/cover;
        //   opacity: 0;
        // }
        // .tag3 {
        //   position: absolute;
        //   width: 268px;
        //   height: 19px;
        //   left: 0px;
        //   top: 77px;
        //   background: url("../assets/web/activity2/tag3.webp") no-repeat
        //     center/cover;
        //   opacity: 0;
        // }
        // .tag4 {
        //   position: absolute;
        //   width: 268px;
        //   height: 19px;
        //   left: 0px;
        //   top: 101px;
        //   background: url("../assets/web/activity2/tag4.webp") no-repeat
        //     center/cover;
        //   opacity: 0;
        // }
        // .tag5 {
        //   position: absolute;
        //   width: 273px;
        //   height: 182px;
        //   left: 0px;
        //   top: 128px;
        //   background: url("../assets/web/activity2/tag5.webp") no-repeat
        //     center/cover;
        //   opacity: 0;
        // }
        // .tag6 {
        //   position: absolute;
        //   width: 268px;
        //   height: 16px;
        //   left: 2px;
        //   top: 316px;
        //   background: url("../assets/web/activity2/tag6.webp") no-repeat
        //     center/cover;
        //   opacity: 0;
        // }
        // .tag7 {
        //   position: absolute;
        //   width: 268px;
        //   height: 16px;
        //   left: 3px;
        //   top: 334px;
        //   background: url("../assets/web/activity2/tag7.webp") no-repeat
        //     center/cover;
        //   opacity: 0;
        // }
        // .tag8 {
        //   position: absolute;
        //   width: 268px;
        //   height: 16px;
        //   left: 3px;
        //   top: 355px;
        //   background: url("../assets/web/activity2/tag8.webp") no-repeat
        //     center/cover;
        //   opacity: 0;
        // }
        // .tag9 {
        //   position: absolute;
        //   width: 268px;
        //   height: 16px;
        //   left: 3px;
        //   top: 375px;
        //   background: url("../assets/web/activity2/tag9.webp") no-repeat
        //     center/cover;
        //   opacity: 0;
        // }
        // .tag10 {
        //   position: absolute;
        //   width: 268px;
        //   height: 21px;
        //   left: 2px;
        //   top: 395px;
        //   background: url("../assets/web/activity2/tag10.webp") no-repeat
        //     center/cover;
        //   opacity: 0;
        // }
      }
      .toplist {
        position: absolute;
        width: 247px;
        min-height: 420px;
        border: 1px solid #fffcb1;
        background: rgba(37, 28, 2, 0.7);
        left: 56px;
        top: 96px;
        border-radius: 10px 0px 0px 0px;
        box-shadow: 0 0 0 1000em rgb(0 0 0 / 50%);
        .content {
          width: 227px;
          font-family: "Arial";
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 150%;
          /* or 24px */
          color: #ffffff;
          padding-top: 20px;
          padding-bottom: 20px;
          margin-left: 10px;
          text-align: left;
          user-select: text;
        }
        .line {
          position: absolute;
          width: 30px;
          height: 3px;
          background: #d9d9d9;
          left: 5px;
          top: -3px;
        }
        .line2 {
          position: absolute;
          width: 3px;
          height: 18px;
          left: -3px;
          top: 5px;
          background: #d9d9d9;
        }
        .line3 {
          width: 12px;
          height: 3px;
          background: #d9d9d9;
          position: absolute;
          top: 0px;
          left: -3px;
          transform: rotate(-45deg);
        }
        .buttom {
          width: 38px;
          height: 28px;
          border-right: 3px solid #d9d9d9;
          border-bottom: 3px solid #d9d9d9;
          position: absolute;
          right: -3px;
          bottom: -3px;
        }
      }
    }
  }
}
</style>
