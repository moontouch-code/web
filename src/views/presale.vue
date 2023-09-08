<!-- <template>
  <div class="presale">
    <div class="presale_content">
      <div class="presale_top">
        <div class="presale_top_time" v-if="!isTeaser">
          <img v-show="isPlanActive" class="presale_top_tips" src="@/assets/web/presale/tips.png" @click="showPresaleTips"/>
          <div v-show="isPlanActive" class="presale_top_img">
            <img :src="tipsUrl" alt="">
          </div>
          <p v-show="isPlanActive && isShowCountdown" >{{ saleEndsTime }}</p>
        </div>
        <div class="presale_top_tiem_teaser" v-else></div>
        <div class="presale_top_box">
          <img src="@/assets/web/presale/card.png" alt="" />
        </div>
        <div class="top_box_buy" v-show="isPlanOpen">
            <img class="buy_price" src="@/assets/web/presale/price.png" alt="" />
            <div class="buy_number">
              <button class="buy_button" @click="onClickBuy(1)">
                <p class="text_shadow_yellow">BUY x1</p>
              </button>
              <button class="buy_button_p" @click="onClickBuy(2)">
                <p class="text_shadow_pink">BUY x2</p>
              </button>
            </div>
            <div class="buy_remaining_box">
              <div class="not_discount">
                <p >{{ soldTotal }} Anima sold</p>
                <p >{{currentRound}} Round:{{ currentCursor }}/{{ totalSupply }}</p>
              </div>
            </div>
          </div>
      </div>

      <div class="presale_bottom">
        <div class="presale_bottom_swiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in imgList[selectBoxIndex]"
              :key="index"
            >
              <img class="swiper-slide_img" :src="item.imgUrl" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading v-show="isLodaing"/>
    
    <div class="presale_tips_bg" v-show=showSwiper>
      <div class="presale_tips_box" >
        <div class="presale_swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in infoList[selectBoxIndex]" :key="index">
              <img class="swiper-slide_img" :src="item.imgUrl" @click="onClickLink(index)" />
            </div>
            <div class="swiper-slide" v-if="!isTeaser" @click="showPresaleTips">
              <div>
              </div>
            </div>
          </div>
        </div>
        <div class="popup_title">
          <img src="@/assets/web/presale/notice.png" alt="" />
        </div>
        <div class="close_div">
          <img class="close" src="@/assets/web/pop/pop_close.png" v-if="!isTeaser" @click="showPresaleTips"/>
        </div>
      </div>
    </div>

    <div class="presale_not_started_tips_bg" v-show="!isTeaser && !isPlanOpen && !isPlanActive">
      <div class="presale_tips_box" >
        <div class="popup_title">
          <img src="@/assets/web/presale/notice.png" alt="" />
        </div>
        <div class="popup_content">
          <p>{{ notStartTips }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import { transaction } from "@/wallet/web3";
import store from "@store/index";
import { actionReport,requestCursorAmount,requestBuy } from '@/apis/login'
export default {
  name: "presale",
  data() {
    return {
      buyNum: 1,
      mySwiper: null,
      mySwiper2: null,
      isLodaing: false,
      showSwiper: false,
      selectBoxIndex: 0,
      imgList: [
        [
          {
            imgUrl: require("@/assets/web/presale/presale_bottom_icon0.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_bottom_icon1.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_bottom_icon2.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_bottom_icon3.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_bottom_icon4.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_bottom_icon5.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_bottom_icon6.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_bottom_icon7.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_bottom_icon8.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_bottom_icon9.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_bottom_icon10.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_bottom_icon11.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_bottom_icon12.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_bottom_icon13.png"),
          },
        ],
        [
          {
            imgUrl: require("@/assets/web/presale/role.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/role.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/role.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/role.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/role.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/role.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/role.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/role.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/role.png"),
          },
        ],
      ],
      infoList: [
        [
          {
            imgUrl: require("@/assets/web/presale/presale_notice_1.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_notice_2.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_notice_3.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_notice_4.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_notice_5.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_notice_6.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_notice_7.png"),
          },
        ],
        [
          {
            imgUrl: require("@/assets/web/presale/presale_notice_1.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_notice_2.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_notice_3.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_notice_4.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_notice_5.png"),
          },
          {
            imgUrl: require("@/assets/web/presale/presale_notice_6.png"),
          }, 
          {
            imgUrl: require("@/assets/web/presale/presale_notice_7.png"),
          },
        ]
      ],
      saleEnds: {
        day: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      },

      isPlanOpen:false,
      isPlanActive:true,
      isTeaser:false,
      isCanBuy:false,
      mainTimer:null,
      checkTimer:null,
      getPresaleInfoInterval:0,
      totalSellAmount:0,
      totalSupply:0,
      currentCursor:0,
      boxAddress:"",
      usdtAddress: "",
      buyTypeHead:"BUY_",
      paymentScale:0,
      countdownTime:0,
      isTransactionComplete:false,
      currentNFTs:0,
      isStartCheckNFTs:false,
      tipsUrl:"",
      isPresaleStatus:0,
      isShowCountdown: false,
      currentRound:"",
      roundInfo: [
        "First",
        "Second",
        "Third",
        "Fourth",
        "Fifth",
      ],
      notStartTips: "",
      soldTotal: 0,
    };
  },
  computed: {
    language(){
      return this.$store.getters.language
    },
    saleEndsTime() {
      return (
        this.saleEnds.hours +
        ":" +
        this.saleEnds.minutes +
        ":" +
        this.saleEnds.seconds
      );
    },
    isMobile() {
      this.$store.commit("setMobile");
      return this.$store.state.isMobile;
    },
    isConnectWallet() {
      return this.$store.getters.isConnectWallet
    },
  },
  async mounted() {
    actionReport("PRESALE_BROWSE","presale_number")
    this.swiperFunc();

    // if (this.isTeaser) {
    //   this.selectBoxIndex = 1
    //   this.showPresaleTips()
    // } else {
    //   this.mainLoop();
    //   this.mainTimer = setInterval(this.mainLoop, 1000);
    // }
    this.notStart()
    
    var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent &&
               navigator.userAgent.indexOf('CriOS') == -1 &&
               navigator.userAgent.indexOf('FxiOS') == -1;
    if (isSafari) {
      this.showTipsWithKey("Browse Experience");
    }
  },
  mixins: [transaction],
  methods: {
    swiperFunc() {
      this.mySwiper = new Swiper(".presale_bottom_swiper", {
        initialSlide: 0,
        speed: 1000,
        loop: false,
        slidesPerView: "auto",
        slideToClickedSlide: true,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
      });

      this.mySwiper2 = new Swiper(".presale_swiper", {
        initialSlide: 0,
        loop: false,
        slidesPerView: "auto",
        observer: true,
        observeParents: true,
        direction : 'vertical',
        freeMode : true,
        mousewheel: {
          sensitivity : 0.5,
        },
      });
    },
    onClickBuy(number) {
      actionReport("PRESALE_BROWSE","buy_number_" + number)
      this.buyNum = number
      if (!this.isConnectWallet) {
        let message = this.getMessageViaKey('PLEASE_LOGIN')
        this.showTipsWithCallback(message,()=>{
          this.$router.push("/login");
        })
        return;
      }
      
      if (this.isPlanOpen) {
        if (this.currentPresaleState === "OPEN") {
          requestBuy(this.planId,this.buyTypeHead + number).then((res)=>{
            let data = res.data
            if (data) {
              let boxAddress = data.contractAddress
              let presaleInfo = data.presaleInfo
              if (boxAddress) {
                if (presaleInfo) {
                  if (presaleInfo.totalSupply - presaleInfo.cursor > 0) {
                    this.boxAddress = boxAddress
                    let hint = this.getMessageViaKey("PRESALE_HINT_BUY_NUM").replace('%s',number)
                    this.showTipsWithCallback(hint,this.requestBuy)
                  } else {
                    this.showTipsWithKey("PRESALE_SELL_OUT");
                  }
                }
              } else {
                this.showTipsWithKey("PRESALE_BUY_BASY");
              }
            }
          }).catch((e)=>{
            this.showTips(e)
          })
        } else if (this.currentPresaleState === "SELL_OUT") {
          this.showTipsWithKey("PRESALE_SELL_OUT");
        } else if (this.currentPresaleState === "COMING_SOON") {
          this.showTipsWithKey("PRESALE_BUY_BASY");
        } else if (this.currentPresaleState === "NO_READY") {
          this.showTipsWithKey("PRESALE_NOT_START");
        }
      }
    },
    async requestBuy(){
      if (store.getters.currentWalletAddress) {
        this.isLodaing = true;
      }
      await this.getAbis("PRESALE");
      // this.currentNFTs = await this.getUserNFT();
      this.buyPresaleGoods(this.buyNum);
    },
    getLocalTime() {
      if (this.countdownTime > 0) {
        this.countdownTime--
      }
      
      let b = this.countdownTime
      var hours = Math.floor((b / (60 * 60)));
      var minutes = Math.floor((b % (60 * 60)) / 60);
      var seconds = Math.floor(b % 60);
      
      if (this.isPlanOpen) {
        if (hours >= 24) {
          this.isPresaleStatus = 1
          this.checkPresaleState()
        } else if (hours < 24) {
          this.isPresaleStatus = 2
          this.checkPresaleState()
        }
      }

      var obj = {};
      obj.hours = hours < 10 ? "0" + hours : hours;
      obj.minutes = minutes < 10 ? "0" + minutes : minutes;
      obj.seconds = seconds < 10 ? "0" + seconds : seconds;
      return obj;
    },
    mainLoop() {
      this.getPresaleInfoInterval--

      if (this.getPresaleInfoInterval <= 0) {
        this.getPreSalePlans();
        this.getPresaleInfoInterval = 5
      }

      if (this.isPlanOpen) {
        this.requestCursorAmount()
      }
      
      // if (this.isTransactionComplete) {
      //   this.getNFTsTimeOutCount++
      //   if (this.getNFTsTimeOutCount === this.getNFTsTimeOutMax) {
      //     this.isTransactionComplete = false
      //   }

      //   if (!this.isStartCheckNFTs) {
      //     this.isStartCheckNFTs = true
      //     this.checkTimer = setInterval( async ()=>{
      //       await this.requestUserNFTs()
      //       clearInterval(this.checkTimer);
      //     }, 2000)
      //   }
      // }

      this.saleEnds = this.getLocalTime();
    },
    showPresaleTips() {
      this.showSwiper = !this.showSwiper;
    },
    requestCursorAmount() {
      requestCursorAmount(this.planId).then((res) => {
          let data = res.data
          if (data) {
            if (data.state == "NO_READY") {
              this.currentPresaleState = data.state
              this.currentRound = "--"
              this.currentCursor = "-"
              this.totalSupply = "-"
              this.soldTotal = data.soldTotal
            } else {
              this.totalSupply = data.totalSupply
              this.totalSellAmount = data.cursor
              this.currentPresaleState = data.state
              this.currentCursor = data.totalSupply - data.cursor
              this.soldTotal = data.soldTotal
              this.currentRound = this.getCurrentRouond(data.round)
            }
          }
      }).catch((e) => {
          console.warn("requestCursorAmount", e);
      })
    },
    checkPlanState() {
      this.isPlanActive = true
      
      if (this.startTimeMillis > 0) {
        this.isPlanOpen = false
        let countdownTime = this.startTimeMillis
        this.countdownTime = countdownTime
        this.isPresaleStatus = 0
        this.checkPresaleState()
      } else if (this.endTimeMillis > 0) {
        let countdownTime = this.endTimeMillis
        this.countdownTime = countdownTime
        this.requestCursorAmount()
        this.isPlanOpen = true
      } else {
        this.notStart()
      }

      this.saleEnds = this.getLocalTime();
    },
    notStart() {
      this.isPlanOpen = false
      this.isPlanActive = false
      this.notStartTips = this.getMessageViaKey("PRESALE_NOT_START")
      this.selectBoxIndex = 1
    },
    checkPresaleState() {
      if (this.isPresaleStatus === 0) {
        this.tipsUrl = require("@/assets/web/presale/presale_countdown_" + this.language + ".png")
        this.isShowCountdown = true
        this.selectBoxIndex = 0
      } else if (this.isPresaleStatus === 1) {
        this.tipsUrl = require("@/assets/web/presale/presale_selling_" + this.language + ".png")
        this.isShowCountdown = false
        this.selectBoxIndex = 0
      } else if (this.isPresaleStatus === 2) {
        this.tipsUrl = require("@/assets/web/presale/presale_residue_" + this.language + ".png")
        this.isShowCountdown = true
        this.selectBoxIndex = 0
      }
    },
    showTips(message) {
      this.$popup.show({title: "Tips", text: message});
    },
    showTipsWithCallback(message, callback) {
      this.$popup.show({title: "Message",text: message,btnFunLeft: callback});
    },
    showTipsWithKey(key) {
      let message = this.getMessageViaKey(key)
      this.$popup.show({title: "Tips",text: message});
    },
    getMessageViaKey(key) {
      return this.$t(key)
    },
    getCurrentRouond(key) {
      return this.roundInfo[key-1]
    },
    onClickLink(index) {
      if (index === 5) {
        window.open("https://moontouch.gitbook.io/about-pre-sale/");
      } else if (index === 6) {
        window.open("https://moontouch.gitbook.io/arbitrum-one-guide/");
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.mainTimer);
    clearInterval(this.checkTimer);
  }
};
</script>

<style lang="scss" scoped>
.presale {
  width: 100%;
  height: 100%;
  background: url("../assets/web/presale/presale_bg.webp") no-repeat
    center/cover;
  padding-top: 86px;
  overflow: hidden;
  .presale_back {
    position: fixed;
    top: 120px;
    right: 66px;
    width: 79px;
    height: 79px;
    background: url("../assets/web/presale/presale_back.png") no-repeat
      center/cover;
    z-index: 1;
  }
  .presale_content {
    transform: scale(0.9);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .presale_top {
      position: relative;
      width: 100%;
      height: 674px;
      .presale_top_tiem_teaser{
        height: 48px;
        margin-top: -3%;
      }
      .presale_top_time {
        height: 48px;
        margin-top: -3%;
        display: flex;
        justify-content: center;
        align-items: center;
        > img {
          height: 59px;
          background-size: 100% 100%;
        }
        >.timeImg_ja{
          width: 394px;
          height: 54px;
          margin-left: 120px;
        }
        > p {
          font-size: 33px;
          margin-top: 5px;
          font-family: YuGothicUI;
          font-weight: bold;
          color: #ffffff;
          text-shadow: 0rem 0rem 0rem #ffe555, 0rem 0rem 0rem #ffe555,
            0rem 0.05rem 0.1rem #ffe555, 0rem -0.05rem 0.1rem #ffe555;
        }
        .presale_top_tips {
          cursor: pointer;
          width: 66px;
          height: 56px;
          margin-bottom: 8px;
          background-size: 100% 100%;
        }
        .presale_top_img {
          display: flex;
          justify-items: left;
        }
      }
      .presale_top_box {
        position: relative;
        margin: auto;
        width: 741px;
        height: 752px;
        background: url("../assets/web/presale/presale_bg.png") no-repeat center/cover;
        display: flex;
        justify-content: center;
        align-items: center;
        > img {
          position: absolute;
          top: 16%;
          left: 29%;
          transform: translateX(-50%,-50%);
          width: 294px;
          height: 328px;
        }
        #percentage {
          position: absolute;
          width: 143px;
          height: 128px;
          top: 0;
          right: -100px;
        }
      }
      .top_box_buy {
          position: relative;
          width: 730px;
          margin: 0 auto;
          margin-top: -270px;
          z-index: 3;
          .buy_price {
            width: 187px;
            height: 40px;
            transform: translate(144%, -50%);
          }
          .buy_number {
            width: 100%;
            height: 61px;
            margin-bottom: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            > img {
              width: 30px;
              height: 30px;
            }
            .buy_button,.buy_button_p {
              cursor: pointer;
              border-style: none;
              width: 141px;
              height: 61px;
              background: url("../assets/web/presale/buy_btn.png") no-repeat
                center/cover;
              > p {
                font-size: 30px;
                font-family: Yu Gothic UI;
                font-weight: bold;
                color: #ffffff;
              }
            }
            .buy_button_p{
              margin-left: 180px;
              width: 141px;
              height: 61px;
              background: url("../assets/web/presale/buy_btn_p.png") no-repeat center/cover;
            }
          }
          .buy_remaining_box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 730px;
            height: 96px;
            background: url("../assets/web/presale/buy_remaining_bg.png") no-repeat
                center/cover;
            .discount_show {
              width: 100%;
              height: 100%;
              .before_discount {
                padding-top: 15px;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                .before_money {
                  margin-right: 28px;
                  width: 223px;
                  height: 28px;
                  >p {
                    width: 223px;
                    position: absolute;
                    text-align: center;
                  }
                  #keepImg {
                    position: absolute;
                    width: 223px;
                    height: 28px;
                  }
                }
                p {
                  margin-right: 11px;
                }
              }
            }
            p,span {
              font-size: 30px;
              font-family: Yu Gothic UI;
              font-weight: bold;
              color: #FFFFFF;
              height: 28px;
              line-height: 28px;
            }
            .not_discount {
              p {
                margin-bottom: 5px;
                font-size: 36px;
              }
            }
          }
                > p {
                  font-size: 24px;
                  font-family: YuGothicUI;
                  font-weight: bold;
                  color: #ffffff;
                  text-shadow: 0rem 0rem 0rem #ffe555, 0rem 0rem 0rem #ffe555,
                    0rem 0.05rem 0.1rem #ffe555, 0rem -0.05rem 0.1rem #ffe555;
                }
        }
    }
    .presale_bottom {
      position: relative;
      margin: 20px auto 0;
      width: 1790px;
      height: 206px;
      background: url("../assets/web/presale/swiper_bg.webp") no-repeat
        center/cover;
        .presale_bottom_swiper {
          margin: 0 auto;
          width: 1574px;
          height: 206px;
          overflow: hidden;
          .swiper-wrapper {
            .swiper-slide {
              width: 292px !important;
              height: 206px;
              margin: 0 13.5px;
              display: flex;
              justify-content: center;
              align-items: center;
              .swiper-slide_img {
                position: relative;
                width: 306px;
                height: 141px;
                opacity: 0;
                animation: slide_img_anim 0.5s linear 0.2s forwards;
              }
            }
          }
        }
    }
  }
  .presale_tips_bg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.5);
    .presale_tips_box {
      position: absolute;
      width: 850px;
      height: 734px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: url("../assets/web/presale/presale_scroller_bg.png") no-repeat;
      background-size: 100% 100%;
      overflow: hidden;
      .presale_swiper {
        position: absolute;
        width: 100%;
        height: 78%;
        left: 51%;
        top: 55%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        .swiper-wrapper {
          .swiper-slide:nth-child(1) {
            width: 100% !important;
            height: 110px;
            .swiper-slide_img {
              width: 100%;
            }
          }
          .swiper-slide:nth-child(2) {
            width: 100% !important;
            height: 340px;
            .swiper-slide_img {
              width: 100%;
            }
          }
          .swiper-slide:nth-child(3) {
            width: 100% !important;
            height: 160px;
            .swiper-slide_img {
              width: 100%;
            }
          }
          .swiper-slide:nth-child(4) {
            width: 100% !important;
            height: 340px;
            .swiper-slide_img {
              width: 100%;
            }
          }
          .swiper-slide:nth-child(5) {
            width: 100% !important;
            height: 50px;
            left: 1.5%;
            .swiper-slide_img {
              width: 100%;
            }
          }
          .swiper-slide:nth-child(6) {
            width: 100% !important;
            height: 90px;
            left: 5%;
            .swiper-slide_img {
              width: 39%;
              cursor: pointer;
            }
          }
          .swiper-slide:nth-child(7) {
            width: 100% !important;
            height: 60px;
            left: 15%;
            .swiper-slide_img {
              width: 70%;
              cursor: pointer;
            }
          }
          .swiper-slide:nth-child(8) {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            width: 100% !important;
            height: 100px;
          }
          .swiper-slide {
            >div {
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-content: center;
              width: 214px;
              height: 61px;
              background: url("../assets/web/pop/common_btn.png") no-repeat;
              background-size: 100% 100%;
              >p {
                position: absolute;
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
      }
      .close_div {
        position: absolute;
        width: 100%;
        > .close {
          cursor: pointer;
          margin-top: 5%;
          margin-left: 88%;
          width: 75px;
          height: 61px;
        }
      }
      .popup_title {
        position: absolute;
        width: 100%;
        height: 63px;
        margin-top: 6%;
        > img {
          margin: auto;
          width: 258px;
          height: 63px;
        }
      }
    }
  }
  .presale_not_started_tips_bg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.5);
    .presale_tips_box {
      position: absolute;
      width: 965px;
      height: 482px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: url("../assets/web/pop/popbg.webp") no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .popup_title {
        position: absolute;
        width: 100%;
        height: 63px;
        margin-top: -33%;
        > img {
          margin: auto;
          width: 258px;
          height: 63px;
        }
      }
      .popup_content {
        display: flex;
        justify-content: center;
        align-content: center;
        padding-left: 25px;
        > p {
          font-size: 36px;
          font-family: Yu Gothic UI;
          font-weight: bold;
          color: #ffffff;
          text-shadow: 0.2rem 0rem 0.5rem #d45cdf, -0.2rem 0rem 0.5rem #d45cdf,
            0rem 0.2rem 0.5rem #d45cdf, 0rem -0.2rem 0.5rem #d45cdf;
        }
      }
    }
  }
}
.text_shadow_pink {
  color: #fff;
  text-shadow: 0.2rem 0rem 0.5rem #d45cdf, -0.2rem 0rem 0.5rem #d45cdf,
    0rem 0.2rem 0.5rem #d45cdf, 0rem -0.2rem 0.5rem #d45cdf;
}
.text_shadow_yellow {
  color: #e2c664;
  text-shadow: 0.2rem 0rem 0.5rem #bea170, -0.2rem 0rem 0.5rem #bea170,
    0rem 0.2rem 0.5rem #bea170, 0rem -0.2rem 0.5rem #bea170;
}
@keyframes swiper_slide_anim {
  0% {
    opacity: 0.3;
    transform: scale(0.95);
  }
  80% {
    opacity: 0.8;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes slide_img_anim {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  80% {
    opacity: 0.8;
    transform: scale(1.05);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@media all and (orientation: portrait) {
  .presale {
    width: 100vw;
    height: 940px;
    background: url("../assets/h5/presale/presale_bg.png") no-repeat
      center/cover;
    .presale_content {
      width: 100%;
      height: 100%;
      transform: scale(1);
      .presale_top {
        width: 100%;
        height: 60%;
        top: -5%;
        .presale_top_time {
          display: flex;
          flex-direction: column;
          align-items: center;
          > img {
            width: 600px;
            height: 48px;
          }
          >.timeImg_ja{
            margin-left: 0;
          }
          .presale_top_img {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
          }
        }
        .top_box_buy {
          position: absolute;
          top: 910px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          .buy_price {
            transform: translate(144%, -50%);
          }
          .buy_number {
            justify-content: center;
          }
      }
        .presale_top_box {
          width: 100%;
          height: 100%;
          margin-top: 10%;
          width: 741px;
          height: 752px;
          background: url("../assets/web/presale/presale_bg.png") no-repeat center/cover;
          display: flex;
          justify-content: center;
          align-items: center;
          > img {
            position: absolute;
            top: 16%;
            left: 29%;
            transform: translateX(-50%,-50%);
            width: 294px;
            height: 328px;
          }
          #percentage{
            position: absolute;
            right: 0;
            margin-left: 320px;
          }
        }
      }
      
      .presale_bottom {
        position: relative;
        width: 100%;
        height: 204px;
        .presale_bottom_swiper {
          width: 100%;
          height: 204px;
          .swiper-wrapper {
            align-items: center;
            .swiper-slide {
              width: 306px !important;
              height: 141px;
              margin: 0 0px;
              .swiper-slide_img {
                width: 306px;
                height: 141px;
              }
            }
          }
        }
      }
    }
    .presale_tips_bg {
      .presale_tips_box {
        width: 95%;
        .presale_swiper {
          width: 100%;
          height: 78%;
          left: 51%;
          top: 55%;
          transform: translate(-50%, -50%);
          .swiper-wrapper {
            .swiper-slide:nth-child(1) {
              height: 15%;
              .swiper-slide_img {
                width: 100%;
              }
            }
            .swiper-slide:nth-child(2) {
              height: 49%;
              .swiper-slide_img {
                width: 100%;
              }
            }
            .swiper-slide:nth-child(3) {
              height: 23%;
              .swiper-slide_img {
                width: 100%;
              }
            }
            .swiper-slide:nth-child(4) {
              height: 50%;
              .swiper-slide_img {
                width: 100%;
              }
            }
            .swiper-slide:nth-child(5) {
              height: 7%;
              .swiper-slide_img {
                width: 100%;
              }
            }
            .swiper-slide:nth-child(6) {
              height: 15%;
              .swiper-slide_img {
                width: 39%;
              }
            }
            .swiper-slide:nth-child(7) {
              height: 13%;
              .swiper-slide_img {
                width: 70%;
              }
            }
            .swiper-slide {
              >div {
                display: flex;
                align-items: center;
                width: 214px;
                height: 61px;
                background: url("../assets/web/pop/common_btn.png") no-repeat;
                background-size: 100% 100%;
                >p {
                  font-size: 30px;
                  font-family: adam;
                  font-weight: 400;
                  color: #ffffff;
                  text-shadow: 0.2rem 0rem 0.2rem #30798e, -0.2rem 0rem 0.2rem #30798e,
                    0rem 0.2rem 0.2rem #30798e, 0rem -0.2rem 0.2rem #30798e;
                }
              }
            }
          }
        }
      }
    }
    .presale_not_started_tips_bg {
      .presale_tips_box {
        width: 95%;
      }
    }
  }
}
.short {
  .presale_top {
    top: -7% !important;
  }
}
</style> -->
