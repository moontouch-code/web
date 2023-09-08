<template>
  <div class="popup" v-if="visable" @touchmove.prevent @mousewheel.prevent>
    <div class="mask" @click="onClickClose"></div>
    <div class="popup_box">
      <div class="popup_title"></div>
      <div class="popup_content">
        {{ text }}
      </div>
      <div
        :class="!isOneButton ? 'buttonLeft' : 'buttonMiddle'"
        @click="onClockBtnLeft"
      >
        Cancel
      </div>
      <div v-show="!isOneButton" class="buttonRight" @click="onClockBtnRight">
        {{ btnTextRight }}
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  data() {
    return {
      visable: false,
      text: "",
      btnTextRight: "",
      btnFunLeft: null,
      btnFunRight: null,
      isOneButton: false,
    };
  },
  mounted() {},
  methods: {
    onClockBtnLeft() {
      this.onClickClose();
    },
    onClockBtnRight() {
      this.btnFunRight();
      this.onClickClose();
    },
    onClickClose() {
      this.visable = false;
      this.text = "";
      this.btnTextRight = "";
      this.btnFunLeft = null;
      this.btnFunRight = null;
      this.isOneButton= false;
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 13;
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .popup_box {
    position: absolute;
    width: 624px;
    height: 299px;
    left: 33vw;
    top: 33vh;
    background: #edfcff;
    border-radius: 30px;
  }

  .popup_content {
    width: 624px;
    height: 58px;
    position: absolute;
    top: 71px;
    font-family: "Arial";
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 58px;
    text-align: center;
  }
  .buttonLeft {
    position: absolute;
    width: 162px;
    height: 47px;
    left: 133px;
    top: 190px;
    border: 1px solid #000000;
    border-radius: 12px;
    font-family: "Arial";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 47px;
    cursor: pointer;
  }
  .buttonMiddle {
    position: absolute;
    width: 162px;
    height: 47px;
    left: 231px;
    top: 190px;
    border: 1px solid #000000;
    border-radius: 12px;
    font-family: "Arial";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 47px;
    cursor: pointer;
  }
  .buttonRight {
    position: absolute;
    width: 162px;
    height: 47px;
    left: 329px;
    top: 190px;
    border: 1px solid #000000;
    border-radius: 12px;
    font-family: "Arial";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 47px;
    cursor: pointer;
  }
  .buttonLeft:hover,
  .buttonMiddle:hover,
  .buttonRight:hover {
    transition: 0.2s linear;
    background: #042631;
    color: #ffffff;
  }
}
@media all and (orientation: portrait) {
  .popup {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    z-index: 13;
    .mask {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .popup_box {
      position: absolute;
      width: 359px;
      height: 172.02px;
      left: 16px;
      top: 33vh;
      background: #edfcff;
      border-radius: 18px;
    }

    .popup_content {
      width: 359px;
      height: 33px;
      position: absolute;
      top: 42px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 33px;
      text-align: center;
    }
    .buttonLeft {
      position: absolute;
      width: 93px;
      height: 27px;
      left: 70px;
      top: 101px;
      border: 1px solid #000000;
      border-radius: 8px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 27px;
      cursor: pointer;
    }
    .buttonMiddle {
      position: absolute;
      width: 93px;
      height: 27px;
      left: 133px;
      top: 101px;
      border: 1px solid #000000;
      border-radius: 8px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 27px;
      cursor: pointer;
    }
    .buttonRight {
      position: absolute;
      width: 93px;
      height: 27px;
      left: 193px;
      top: 101px;
      border: 1px solid #000000;
      border-radius: 8px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 27px;
      cursor: pointer;
    }
    .buttonLeft:hover,
    .buttonMiddle:hover,
    .buttonRight:hover {
      transition: 0.2s linear;
      background: #042631;
      color: #ffffff;
    }
  }
}
</style>
