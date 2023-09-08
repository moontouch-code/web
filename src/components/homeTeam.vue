<template>
  <div class="main">
    <div class="flex-main">
      <div class="pc_shadow">
        <img
          class="pc_title_bg"
          :src="item.url"
          alt=""
          v-for="(item, index) in bgImg"
          :key="index"
          :class="item.name == contenttype ? 'opcityclass' : 'opcityclass1'"
        />
      </div>
      <div class="line1"></div>
      <div class="line2"></div>
      <div ref="lineColor" class="line3"></div>
      <div class="line4"></div>
      <div class="page_title">{{ teamName[contenttype] }}</div>
      <div class="leftIcon" :class="`${contenttype}_left`"></div>
      <div
        class="line6"
        :class="isMobile ? `${contenttype}_mobile` : contenttype"
      ></div>
      <div class="left_img">
        <img :src="imgList[contenttype][index].imgurl" alt="" />
      </div>
      <div class="left_title1">{{ imgList[contenttype][index].advisors }}</div>
      <div class="left_title2">{{ imgList[contenttype][index].name }}</div>
      <div class="left_text">
        {{ text}}
      </div>
      <div class="ringt_img_father">
        <div class="right_img_content">
          <div
            class="right_content"
            v-for="(item, index1) in imgList[contenttype]"
            :key="index1"
            @click="changeImgIndex(index1)"
          >
            <div class="img_item">
              <img
                :class="index != index1 ? 'default' : ''"
                :src="imgList[contenttype][index1].imgurl"
                alt=""
              />
              <img
                class="selecte"
                v-show="index == index1"
                :src="selectURL[contenttype]"
                alt=""
              />
            </div>
            <p class="title_item">{{ item.name }}</p>
            <p class="adv_item">{{ item.advisors }}</p>
          </div>
        </div>
      </div>

      <div
        class="button1"
        :class="this.contenttype == 'company' ? 'd1_selected' : 'd1_deselect'"
        @click="changIndex('company')"
      ></div>
      <div
        class="button2"
        :class="this.contenttype == 'advisors' ? 'd2_selected' : 'd2_deselect'"
        @click="changIndex('advisors')"
      ></div>
      <div
        class="button3"
        :class="this.contenttype == 'artist' ? 'd3_selected' : 'd3_deselect'"
        @click="changIndex('artist')"
      ></div>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
export default {
  name: "homeTeam",
  data() {
    return {
      index: 1,
      text: "",
      contenttype: "company",
      selectURL: {
        company: require("../assets/web/home/page7/select_company.webp"),
        advisors: require("../assets/web/home/page7/seleted_advisors.webp"),
        artist: require("../assets/web/home/page7/seleted_artist.webp"),
      },
      teamName: {
        company: "Marketing Team",
        advisors: "Advisors",
        artist: "Dev Team",
      },
      bgImg: [
        {
          name: "company",
          url: require("../assets/web/home/page7/bg1.png"),
        },
        {
          name: "advisors",
          url: require("../assets/web/home/page7/bg2.png"),
        },
        {
          name: "artist",
          url: require("../assets/web/home/page7/bg3.png"),
        },
      ],
      imgList: {
        advisors: [
          // {
          //   name: "VINCENT SHEN",
          //   advisors: "ADVISORS",
          //   imgurl: require("../assets/web/home/page7/advisors/shen.webp"),
          //   text: "Served as Senior Product Manager in Tencent and Alibaba. Achieved $1.4 billion GMV during the 11·11 event of Tmall.",
          // },
          // {
          //   name: "TAO YANG",
          //   advisors: "ADVISORS",
          //   imgurl: require("../assets/web/home/page7/advisors/tao.webp"),
          //   text: "Ex-VP/CPO of Forgame Group, Producer of top web page game FanRenXiuZhen. Led the team to make several products with monthly sales over $14M. ",
          // },
          {
            name: "MIKE",
            advisors: "ADVISORS",
            imgurl: require("../assets/web/home/page7/advisors/mike.webp"),
            text: "Release Producer of League of Legends, head of product and community.",
          },
          {
            name: "SINA PAHLEVAN",
            advisors: "ADVISORS",
            imgurl: require("../assets/web/home/page7/advisors/sina.webp"),
            text: "4 years of growth marketing experience across Web3 social and gamefi project management.",
          },
        ],
        company: [
          {
            name: "ALISON WANG",
            advisors: "CMO",
            imgurl: require("../assets/web/home/page7/company/wang.webp"),
            text: "Gamer. NFT collectorBA from USC Marshall. Expert in resource gathering, BD, and PR. Been in charge of crypto project operations since 2018.",
          },
          {
            name: "ETHAN RABINOWITZ",
            advisors: "CSO",
            imgurl: require("../assets/web/home/page7/company/ethan.webp"),
            text: "Law School BackgroundDC Crypto Inner CircleMulti-faceted operator with experience in industries such as manufacturing, technology, sports, and entertainment. Led the negotiation and implementation of contracts with professional athletes and Fortune 100 counterparties.",
          },
          {
            name: "SHIV SINGH JUNEJA",
            advisors: "CRO",
            imgurl: require("../assets/web/home/page7/company/shiv.webp"),
            text: "Crypto Community Growth ExpertPast experience in crypto, back-end development project, ICOs, community creation for 3 projects, 150,000+ crypto-based digital impressions and investor fundraising experience. Helped grow over 10 million users in India and USA.",
          },
          {
            name: "LIUDMYLA",
            advisors: "COMMUNTY MANAGER",
            imgurl: require("../assets/web/home/page7/company/liud.webp"),
            text: "Crypto expert, fashion model and an influencer with 6mil follower. Female Binance ambassador that has past experience in launching and selling out a NFT collection. On track to bring more opportunities and open up new possibilities for women in Web3.",
          },
          {
            name: "ANTHONY NOSHIMURI",
            advisors: "DATA ANALYST",
            imgurl: require("../assets/web/home/page7/company/anthony.webp"),
            text: "Participated in the team of blockchain game on Polygon. More than 50,000 DAU at most. Game used to be the #1 game on Polygon.",
          },
        ],
        artist: [
          {
            name: "NAOE NAKADAMA",
            advisors: "PROGRAM DIRECTOR",
            imgurl: require("../assets/web/home/page7/artist/naoe.webp"),
            text: "Previous participated project: Microsoft Lionhead Studios “Fable” CAPCOM “Dragon's Dogma”",
          },
          {
            name: "JUNTOYO LUO",
            advisors: "TECH DIRECTOR",
            imgurl: require("../assets/web/home/page7/artist/luo.webp"),
            text: "Engaged in technology development for 18 years, dedicated to encryption algorithm research.Responsible for the game development on Polygon with a Market Volume over 10 million USDT.",
          },
          {
            name: "JASON PHELPS",
            advisors: "TECH ADVISOR",
            imgurl: require("../assets/web/home/page7/artist/json.webp"),
            text: "He provided long-term tech support for several crypto and NFT projects. He is very familiar with science and technology, sports, and game projects.",
          },
          {
            name: "EVANGELION",
            advisors: "ARTIST",
            imgurl: require("../assets/web/home/page7/artist/lion.webp"),
            text: "Artists active on social media participate in Comic Market, the world's largest Doujinshi convention.",
          },
          {
            name: "MAME NO MOTO",
            advisors: "ARTIST",
            imgurl: require("../assets/web/home/page7/artist/mame.webp"),
            text: "Well-known illustrator from Tokyo, JapanHas high popularity on platforms such as Pixiv and Twitter.",
          },
        ],
      },
    };
  },
  computed: {
    isMobile() {
      this.$store.commit("setMobile");
      return this.$store.state.isMobile;
    },
  },
  mounted() {
    let bs = new BScroll(".ringt_img_father", {
      scrollX: true,
      scrollY: false,
      click: true,
      tap: true,
      preventDefault: false,
    });
    this.changeImgIndex(0);
  },
  methods: {
    changIndex(index) {
      this.contenttype = index;
      this.index = 0;
      this.changeImgIndex(0,false);
      if (index == "company") {
        this.$refs.lineColor.setAttribute("style", "background:#E1DF03;");
      } else if (index == "advisors") {
        this.$refs.lineColor.setAttribute("style", "background:#D1FF9A;");
      } else {
        this.$refs.lineColor.setAttribute("style", "background:#43D2FF;");
      }
    },
    changeImgIndex(index,flag) {
      if (this.index == index&&flag) return;
      this.text = '';
      let _self = this 
       setTimeout(function(){
        _self.index = index;
        _self.text=_self.imgList[_self.contenttype][_self.index].text
       })
    },
  },
};
</script>

<style lang="scss" scoped>
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
    -webkit-transform:rotate(0deg);
    .pc_shadow {
      position: absolute;
      width: 1373px;
      height: 160px;
      left: 0px;
      top: 0px;
      background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 112.5%);
      border-radius: 60px 60px 0px 0px;
      .pc_title_bg {
        height: auto;
        width: 754px;
        position: absolute;
        top: 0;
        right: 0;
        transition: opacity 0.5s linear;
      }
    }
    .line1 {
      width: 2px;
      height: 740px;
      background: #454648;
      /* Inside auto layout */
      flex: none;
      order: 0;
      flex-grow: 0;
      position: absolute;
      top: 0px;
      left: 105px;
    }
    .line2 {
      position: absolute;
      width: 2px;
      height: 740px;
      left: 618px;
      top: 0px;
      background: #454648;
      display: block;
    }
    .line3 {
      position: absolute;
      width: 12px;
      height: 50px;
      left: 106px;
      top: 44px;
      background: #e1df03;
    }
    .line4 {
      display: none;
    }
    .line5 {
      position: absolute;
      width: 2px;
      height: 740px;
      left: 1263px;
      top: 0px;
      background: #454648;
    }
    .page_title {
      position: absolute;
      width: 300px;
      height: 40px;
      left: 149px;
      top: 50px;
      text-align: left;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 30px;
      line-height: 40px;
      /* identical to box height */
      letter-spacing: 0.07em;
      color: #ffffff;
    }
    .company_left {
      position: absolute;
      width: 328px;
      height: 498px;
      right: 0px;
      bottom: 0px;
      background: url("../assets/web/home/page7/company_big.png") no-repeat
        center/cover;
    }
    .artist_left {
      position: absolute;
      width: 328px;
      height: 498px;
      right: 0px;
      bottom: 0px;
      background: url("../assets/web/home/page7/artist_big.png") no-repeat
        center/cover;
    }
    .advisors_left {
      position: absolute;
      width: 328px;
      height: 498px;
      right: 0px;
      bottom: 0px;
      background: url("../assets/web/home/page7/advisors_big.png") no-repeat
        center/cover;
    }
    .left_img {
      position: absolute;
      width: 300px;
      height: 300px;
      left: 108px;
      top: 130px;
      img {
        width: 300px;
        height: 300px;
      }
    }
    .left_title1 {
      position: absolute;
      width: 600px;
      height: 30px;
      left: 108px;
      top: 464px;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 30px;
      /* identical to box height */
      letter-spacing: 0.07em;
      color: #ffffff;
      text-align: left;
    }
    .left_title2 {
      position: absolute;
      width: 500px;
      height: 40px;
      left: 108px;
      top: 498px;
      font-family: "ADAMa";
      text-align: left;
      font-style: normal;
      font-weight: 400;
      font-size: 30px;
      line-height: 40px;
      /* identical to box height */

      letter-spacing: 0.07em;

      color: #ffffff;
    }
    .left_text {
      position: absolute;
      width: 429px;
      height: 48px;
      left: 108px;
      top: 568px;
      font-family: "Arial";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      /* or 24px */
      text-align: left;
      color: #ffffff;
    }
    .ringt_img_father {
      width: 572px;
      height: 468px;
      position: absolute;
      top: 160px;
      left: 704px;
      z-index: 9;
    }
    .right_img_content {
      width: 572px;
      height: 468px;
      position: absolute;
      top: 0px;
      left: 0px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .right_img_content::after {
      content: "";
      width: 150px;
    }
    .right_content {
      width: 150px;
      height: 220px;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      position: relative;
      z-index: 9;
      .img_item {
        width: 150px;
        height: 150px;
        position: relative;
        img {
          width: 150px;
          height: 150px;
        }
        .default:hover {
          transition: all 0.2s linear;
          transform: scale(1.1);
        }
        .selecte {
          width: 180px;
          height: 180px;
          position: absolute;
          top: -13px;
          left: -16px;
        }
      }
      .title_item {
        font-family: "ADAMa";
        font-style: normal;
        width: 200px;
        height: 27px;
        font-weight: 400;
        font-size: 18px;
        line-height: 150%;
        text-align: center;
        margin-top: 9px;
        position: absolute;
        top: 145px;
        left: -20px;
        /* identical to box height, or 27px */

        color: #ffffff;
      }
      .adv_item {
        font-family: "ADAMa";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        width: 200px;
        height: 24px;
        text-align: center;
        position: absolute;
        top: 185px;
        left: -20px;
        /* identical to box height, or 24px */
        color: #ffffff;
      }
    }
    .button1 {
      position: absolute;
      width: 45px;
      height: 51px;
      left: 695px;
      top: 17px;
      cursor: pointer;
      transition: 0.2s linear;
    }
    .d1_selected {
      background: url("../assets/web/home/page7/company.webp") no-repeat
        center/cover;
      transform: scale(1.1);
    }
    .d1_deselect {
      background: url("../assets/web/home/page7/company1.webp") no-repeat
        center/cover;
    }
    .button2 {
      position: absolute;
      width: 60px;
      height: 48px;
      left: 848px;
      top: 15px;
      cursor: pointer;
      transition: 0.2s linear;
    }
    .d2_selected {
      background: url("../assets/web/home/page7/advisors.webp") no-repeat
        center/cover;
      transform: scale(1.1);
    }
    .d2_deselect {
      background: url("../assets/web/home/page7/advisors1.webp") no-repeat
        center/cover;
    }
    .button3 {
      position: absolute;
      width: 36px;
      height: 51px;
      left: 1020px;
      top: 15px;
      cursor: pointer;
      transition: 0.2s linear;
    }
    .d3_selected {
      background: url("../assets/web/home/page7/artist.webp") no-repeat
        center/cover;
      transform: scale(1.1);
    }
    .d3_deselect {
      background: url("../assets/web/home/page7/artist1.webp") no-repeat
        center/cover;
    }
    .button1:hover,
    .button2:hover,
    .button3:hover {
      transform: scale(1.1);
    }
  }
  .line6 {
    display: none;
  }
  .company {
    position: absolute;
    width: 5px;
    height: 51px;
    left: 1265px;
    top: 56px;
    background: #ffff00;
  }
  .advisors {
    position: absolute;
    width: 5px;
    height: 51px;
    left: 1265px;
    top: 129px;
    background: #d1ff9a;
  }
  .artist {
    position: absolute;
    width: 5px;
    height: 51px;
    left: 1265px;
    top: 212px;
    background: #43d2ff;
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
      overflow: hidden;
      .pc_shadow {
        display: none;
      }
      .line1 {
        position: absolute;
        width: 1px;
        height: 332px;
        left: 27px;
        top: 0px;
        background: #454648;
      }
      .line2 {
        display: none;
      }
      .line3 {
        position: absolute;
        width: 6px;
        height: 25px;
        left: 27px;
        top: 14px;
        background: #e1df03;
      }
      .line4 {
        display: block;
        position: absolute;
        width: 358px;
        height: 1px;
        left: 0px;
        top: 481px;

        border: 1px solid #454648;
      }
      .line5 {
        display: none;
      }
      .line6 {
        display: block;
      }
      .page_title {
        font-size: 20px;
        line-height: 20px;
        left: 47px;
        top: 16px;
        text-align: left;
      }
      .leftIcon {
        display: none;
      }
      .left_img {
        position: absolute;
        width: 138px;
        height: 135.28px;
        left: 110px;
        top: 56px;
        img {
          width: 138px;
          height: 135.28px;
        }
        // background: #3a2c3d;
      }
      .left_title1 {
        width: 350px;
        height: 20px;
        line-height: 20px;
        left: 45px;
        top: 210px;
        font-size: 14px;
        text-align: left;
      }
      .left_title2 {
        width: 250px;
        height: 20px;
        line-height: 20px;
        left: 45px;
        top: 230px;
        font-size: 16px;
        text-align: left;
      }
      .left_text {
        width: 303px;
        height: 80px;
        font-size: 12px;
        text-align: left;
        left: 45px;
        top: 260px;
      }
      .ringt_img_father {
        position: absolute;
        height: 90px;
        width: 331px;
        left: 20px;
        top: 385px;
        overflow: hidden;
        z-index: 9;
      }
      .right_img_content {
        height: 90px;
        width: 500px;
        left: 0;
        top: 0;
        flex-wrap: nowrap;
        justify-content: start;
        .right_content {
          width: 75px;
          height: 120px;
          margin-right: 12px;
          margin-left: 12px;
          position: relative;
          z-index: 9;
          .img_item {
            width: 75px;
            height: 73px;
            img {
              width: 75px;
              height: 73px;
            }
            .selecte {
              width: 92px;
              height: 92px;
              position: absolute;
              top: -9px;
              left: -10px;
            }
            .default:hover {
              transform: scale(1);
            }
          }
          .title_item {
            width: 110px;
            height: 18px;
            line-height: 18px;
            font-size: 12px;
            position: absolute;
            text-align: center;
            left: -20px;
            top: 70px;
            display: none;
          }
          .adv_item {
            font-size: 12px;
            width: 120px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            position: absolute;
            top: 94px;
            left: -10px;
            display: none;
          }
        }
      }
      .button1 {
        width: 35px;
        height: 37px;
        left: 40px;
        top: 505px;
        z-index: 9;
      }
      .button2 {
        width: 48.91px;
        height: 39.5px;
        left: 158px;
        top: 501px;
        z-index: 9;
      }
      .button3 {
        width: 29px;
        height: 42px;
        left: 289px;
        top: 502px;
        z-index: 9;
      }
    }
  }

  .company_mobile {
    position: absolute;
    width: 50px;
    height: 2px;
    left: 32px;
    top: 481px;
    background: #ffff00;
  }
  .advisors_mobile {
    position: absolute;
    width: 50px;
    height: 2px;
    left: 158px;
    top: 481px;
    background: #d1ff9a;
  }
  .artist_mobile {
    position: absolute;
    width: 50px;
    height: 2px;
    left: 278px;
    top: 481px;
    background: #43d2ff;
  }
}
</style>
