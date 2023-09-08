<!-- <template>
  <transition name="animation">
    <div class="popup" v-if="visable">
      <div class="mask" @click="onClickClose"></div>
      <div class="popup_box">
        <div class="close_div">
          <img class="close" src="@/assets/web/pop/pop_close.png" @click="onClickClose"/>
        </div>
        <div class="popup_content"></div>
        <div class="popup_btn">
          <div class="popup_btn1" @click="onClickLink"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import store from "@/store";
export default {
  data() {
    return {
      visable: false,
      title: "Tips",
      text: "",
      isShowBtnRight: false,
      btnTextLeft: "",
      btnTextRight: "CANCEL",
      btnFunLeft: null,
      btnFunRight: null,
      isBindActivityCode:false,
      actavityCode:'',
    };
  },
  mounted() {},
  methods: {
    onClockBtnLeft() {
      if (this.btnFunLeft) {

        if(this.isBindActivityCode){
          this.commitActaticyCode()
        }

        this.btnFunLeft();
      }
      this.onClickClose();
    },
    onClockBtnRight() {
      if (this.btnFunRight) {
        this.btnFunRight();
      }
      this.onClickClose();
    },
    onClickClose() {
      this.visable = false;
      this.title = "Tips";
      (this.text = ""), (this.isShowBtnRight = false);
      this.btnTextLeft = "";
      this.btnTextRight = "CANCEL";
      this.btnFunLeft = null;
      this.btnFunRight = null;
      this.isBindActivityCode = false
      this.actavityCode = ''
    },
    commitActaticyCode(){
      store.commit("setActavityCode", this.actavityCode);
    },
    onClickLink() {
      this.onClickClose()
      window.open("https://karatdao.com/forms/1TnIGlhNH");
    }
  },
};
</script>

<style lang="scss" scoped>
@keyframes pop {
  0% {
    opacity: 0;
    margin-top: -2%;
  }
  100% {
    opacity: 1;
    margin-top: 0%;
  }
}
.animation-enter,
.animation-leave-to {
  opacity: 0;
}

.animation-enter-active,
.animation-leave-active {
  transition: opacity 0.5s;
}

.popup {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .popup_box {
    position: absolute;
    width: 965px;
    height: 482px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
    background: url("../../assets/web/home/pop/pop_bg.png") no-repeat;
    background-size: 100% 100%;
    animation: pop 0.3s;
  }
  .close_div {
    width: 100%;
    > .close {
      cursor: pointer;
      margin-top: 3%;
      margin-left: 87%;
      width: 75px;
      height: 61px;
    }
  }
  
  .popup_title {
    width: 100%;
    height: 120px;
    padding-top: 0px;
    padding-left: 25px;
    > img {
      margin: auto;
      width: 295px;
      height: 75px;
    }
    > .code_title_bg {
      width: 698px;
      height: 65px;
    }
    > p {
      font-size: 32px;
      font-family: arial;
      font-weight: bold;
      color: #010101;
      line-height: 85px;
    }
  }
  .popup_content {
    display: flex;
    justify-content: center;
    width: 90%;
    height: 180px;
    padding-left: 25px;
    > p {
      margin-bottom: 10px;
      font-size: 36px;
      font-family: Yu Gothic UI;
      font-weight: bold;
      color: #ffffff;
      text-shadow: 0.2rem 0rem 0.5rem #d45cdf, -0.2rem 0rem 0.5rem #d45cdf,
        0rem 0.2rem 0.5rem #d45cdf, 0rem -0.2rem 0.5rem #d45cdf;
    }
    > input {
      margin: 0 auto;
      width: 75%;
      height: 94px;
      background: url("../../assets/web/pop/code_bg.png") no-repeat;
      background-size: 100% 100%;
      font-size: 30px;
      font-family: adam;
      font-weight: 400;
      color: #ffffff;
      line-height: 55px;
      text-shadow: 0.2rem 0rem 0.2rem #30798e, -0.2rem 0rem 0.2rem #30798e,
        0rem 0.2rem 0.2rem #30798e, 0rem -0.2rem 0.2rem #30798e;
      text-indent: 15px;
    }
    .Content1 {
      font-size: 38px;
    }
  }
  .textAlign {
    text-align: left;
  }
  .popup_btn {
    cursor: pointer;
    width: 90%;
    padding-left: 25px;
    display: flex;
    justify-content: center;
    .popup_btn1,
    .popup_btn2 {
      width: 214px;
      height: 61px;
      background: url("../../assets/web/home/pop/pop_btn.png") no-repeat
        center/cover;
      background-size: 100%;
      margin: 0px 35px 40px;
      > p {
        font-size: 30px;
        font-family: adam;
        font-weight: 400;
        color: #ffffff;
        line-height: 55px;
        text-shadow: 0.2rem 0rem 0.2rem #30798e, -0.2rem 0rem 0.2rem #30798e,
          0rem 0.2rem 0.2rem #30798e, 0rem -0.2rem 0.2rem #30798e;
      }
    }
  }
}
@media all and (orientation: portrait) {
  .popup {
    .popup_box {
      width: 730px;
      height: 367px;
    }
    .popup_btn {
      .popup_btn1,
      .popup_btn2 {
        > P {
          font-size: 20px;
          line-height: 63px;
        }
      }
    }
  }
}
</style> -->
