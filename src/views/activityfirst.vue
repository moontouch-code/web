<template>
  <div class="activity_main">
    <div class="activity">
      <div class="poster">
        <div class="progress">
          <div class="sold_num">{{ soldNum }}/3000</div>
          <div class="progress_title">OPENED ORGIN-ANIMA</div>
          <div class="progress_time">
            PERIOD: 6 a.m, May 11th, 2023 to 5:59 p.m August 19 2023 (UTC)
          </div>
          <div class="proress_line">
            <div class="progress_detail" ref="progressDetail"></div>
          </div>
        </div>
      </div>
      <div class="line1"></div>
      <div class="activety_content">
        <div class="activity_title">ANIMA CONSTRUCT Event Rule</div>
        <div class="item_content">
          <p
            class="activity_item"
            v-for="(item, index) in activityList"
            :key="index"
            v-html="item"
          ></p>
        </div>
      </div>
      <div class="annima_content">
        <div class="line2"></div>
        <div class="annima_left"></div>
        <div class="anima_right_title">ORIGIN-ANIMA</div>
        <div class="link" @click="toUrl"></div>
        <div class="anima_item_content">
          <div
            class="anima_item"
            v-for="(item, index) in animaItemList"
            :key="index"
          >
            <img :src="item.imgUrl" alt="" />
          </div>
        </div>
      </div>
      <div class="table">
        <div class="line3"></div>
        <div class="table_input" v-if="!isMobile">
          <input
            spellcheck="false"
            class="table_select"
            v-model="seq"
            type="text"
            @blur="search"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            maxlength="4"
            @keydown="handleKeyDown"
          />
          <div class="table_select_button"></div>
        </div>
        <div class="table_input_mobile" v-else>
          <div
            class="table_select_mobile"
            type="text"
            :class="isMobileSearchEnabled ? 'select_show' : 'select_hide'"
          >
            <input
              spellcheck="false"
              type="text"
              maxlength="4"
              @blur="changeList(false)"
              onkeyup="value=value.replace(/[^\d]/g,'')"
              v-model="seq"
            />
            <div
              class="table_input_show"
              @click="showSearch"
              :class="isMobileSearchEnabled ? 'search_show' : 'search_hide'"
            ></div>
            <div class="table_input_button"></div>
          </div>
        </div>
        <div class="table_content">
          <div
            class="table_item"
            v-for="(item, index) in tableList"
            :key="index"
          >
            <div class="item_img">
              <img :src="item.imageUrl + '?version=1.1'" alt="" />
            </div>
            <div class="item_id">Origin-{{ item.seq }}</div>
          </div>
        </div>
      </div>
      <div class="page">
        <div class="line4"></div>
        <div class="left" @click="changePage(true, 'delete')"></div>
        <div class="right" @click="changePage(true, 'add')"></div>
        <div class="middle">
          <input
            spellcheck="false"
            v-model="page"
            class="page_select"
            type="text"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            maxlength="3"
            @blur="changeList(false)"
            @keydown="handleKeyDown"
          />
          <div class="page_info">/{{ total }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getActivityList, getActivityType } from "@/apis/activity";
export default {
  name: "activity",
  data() {
    return {
      page: 1,
      pageInfo: 1,
      soldNum: 0,
      total: 100,
      isMobileSearchEnabled: false,
      seq: "",
      activityList: [
        "Anima Serial Number is subject to the NFT picture and name.",
        "The owner of the imported origin-anima is the game import address.",
        "Import origin-anima into the game and open it to get special rewards.",
        "Use the fairy with the origin tag to play the game, and the number of tokens obtained will increase by 100%",
        'Origin-anima Open reward list link:<a class="link"  href="https://moontouch.gitbook.io/moon-touch/moon-touch-nft/about-genesis-nft" target="_blank">https://moontouch.gitbook.io/moon-touch/moon-touch-nft/about-genesis-nft</a>',
      ],
      animaItemList: [
        {
          imgUrl: require("../assets/web/activity/card/card1.webp"),
        },
        {
          imgUrl: require("../assets/web/activity/card/card2.webp"),
        },
        {
          imgUrl: require("../assets/web/activity/card/card3.webp"),
        },
        {
          imgUrl: require("../assets/web/activity/card/card4.webp"),
        },
        {
          imgUrl: require("../assets/web/activity/card/card5.webp"),
        },
        {
          imgUrl: require("../assets/web/activity/card/card6.webp"),
        },
        {
          imgUrl: require("../assets/web/activity/card/card7.webp"),
        },
        {
          imgUrl: require("../assets/web/activity/card/card8.webp"),
        },
      ],
      tableList: [],
    };
  },
  computed: {
    isMobile() {
      this.$store.commit("setMobile");
      return this.$store.state.isMobile;
    },
  },
  methods: {
    handleKeyDown(e) {
      if (e.key === "Enter") {
        e.target.blur();
      }
    },
    toUrl() {
      window.open("https://opensea.io/collection/moon-touch", "_blank");
    },
    search() {
      if (this.seq != "") {
        (this.page = 1), this.changeList(false);
      } else {
        this.changeList(false);
      }
    },
    changeList(val) {
      if(!val){
        this.$scrollTo(document.getElementsByClassName("table")[0], {
        offset:-60,
        duration:0,
      });
      }
      if (this.page == "" || this.page == 0 || isNaN(this.page)) {
        this.page = 1;
      }
      if (isNaN(this.seq)) {
        this.seq = "";
      }
      this.tableList = [];
      const defaultData = {
        imageUrl: require("../assets/web/activity/card/error_img.png"),
        seq: "xxxx",
      };
      for (let i = 0; i < 30; i++) {
        this.tableList.push(defaultData);
      }
      getActivityList({
        pageNumber: this.page,
        pageSize: 30,
        seq: this.seq,
        pageNumber: this.page,
      })
        .then((res) => {
          this.tableList = res.data.rows;
          let totalnum = res.data.total;
          this.total =
            totalnum > 0
              ? totalnum < 30
                ? 1
                : totalnum % 30
                ? parseInt(totalnum / 30) + 1
                : totalnum / 30
              : 0;
        })
        .catch((err) => {});
    },
    changePage(type, math) {
      let pageNew = 0;
      if (type) {
        if (math == "add") pageNew = Number(this.page) + 1;
        else pageNew = this.page - 1;
      } else {
      }
      if (pageNew > 100) {
        pageNew = 100;
      }
      if (pageNew < 1) {
        pageNew = 1;
      }
      this.page = pageNew;
      this.changeList(false);
    },
    showSearch() {
      this.isMobileSearchEnabled = !this.isMobileSearchEnabled;
    },
  },
  mounted() {
    // this.$scrollTo(document.getElementsByClassName("activity_main")[0])
    window.scrollTo(0, 0);
    getActivityType().then((res) => {
      this.soldNum = res.data.openCount;
      if (!this.isMobile)
        this.$refs.progressDetail.style.width =
          79.3375 * (this.soldNum / 3000) + "rem";
      else
        this.$refs.progressDetail.style.width =
          18.5625 * (this.soldNum / 3000) + "rem";
    });

    this.changeList(true);
  },
};
</script>

<style lang="scss" type="text/scss" scoped>
.activity_main {
  width: 100%;
  height: 4300px;
}
.activity {
  position: absolute;
  width: 1446px;
  height: 3950px;
  left: 238px;
  top: 218px;
  background: url("../assets/web/activity/bg.webp") no-repeat center/cover;
  border-radius: 60px;
  margin-bottom: 100px;
  overflow: hidden;
  .poster {
    width: 1446px;
    height: 740px;
    position: relative;
    background: url("../assets/web/activity/banner.webp") no-repeat center/cover;
    border-radius: 60px 60px 0px 0px;
    .progress {
      position: absolute;
      width: 1342px;
      height: 138px;
      left: 52px;
      top: 584px;
      position: absolute;
      background: rgba(27, 26, 2, 0.5);
      border-radius: 25px;
      .progress_time {
        position: absolute;
        width: 900px;
        height: 44px;
        left: 410px;
        top: 91px;
        text-align: right;
        font-family: "Arial";
        font-style: normal;
        font-weight: 400;
        font-size: 26px;
        line-height: 170%;
        /* or 44px */

        color: #ffffff;
      }
      .sold_num {
        position: absolute;
        width: 142px;
        height: 51px;
        left: 1168px;
        top: 0px;
        font-family: "Arial";
        text-align: right;
        font-style: normal;
        font-weight: 400;
        font-size: 30px;
        line-height: 51px;
        z-index: 5;
        color: white;
      }
      .progress_title {
        position: absolute;
        width: 362px;
        height: 51px;
        left: 460px;
        top: 0px;
        font-family: "ADAMa";
        font-style: normal;
        font-weight: 400;
        font-size: 30px;
        line-height: 170%;
        /* identical to box height, or 51px */

        color: #ffffff;
      }
      .proress_line {
        position: absolute;
        width: 1271px;
        height: 33px;
        border: 3px solid #ffe44d;
        left: 38px;
        top: 52px;
        box-sizing: content-box;
        background: rgba(80, 69, 9, 0.5);

        .progress_detail {
          position: absolute;
          top: 2px;
          left: 0;
          height: 29px;
          width: 100px;
          background: #ffe44d;
        }
      }
    }
  }
  .line1 {
    width: 61px;
    height: 12px;
    background: #3ba1ff;
    position: absolute;
    top: 740px;
    left: 88px;
  }
  .activety_content {
    width: 1446px;
    height: 460px;
    border-bottom: 2px solid #818181;
    position: relative;

    .activity_title {
      position: absolute;
      width: 800px;
      text-align: left;
      height: 30px;
      left: 88px;
      top: 65px;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 30px;
      line-height: 30px;
      /* identical to box height */
      letter-spacing: 0.07em;
      color: #ffffff;
    }
    .item_content {
      width: 1000px;
      height: 280px;
      position: absolute;
      left: 88px;
      top: 123px;
      .activity_item {
        width: 1000px;
        height: 34px;
        margin-top: 18px;
        line-height: 34px;
        font-family: "Arial";
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        color: #ffffff;
        text-align: left;
        margin-left: 18px;
        position: relative;
        ::v-deep a {
          border-bottom: 1px solid #ffffff;
        }
      }
      .activity_item::before {
        content: "";
        width: 10px;
        height: 10px;
        transform: rotate(45deg);
        position: absolute;
        background: #ffffff;
        left: -18px;
        top: 11px;
      }
    }
  }
  .annima_content {
    width: 1446px;
    height: 600px;
    border-bottom: 2px solid #818181;
    position: relative;
    .line2 {
      position: absolute;
      width: 61px;
      height: 12px;
      background: #da7fff;
      top: 0;
      right: 88px;
    }
    .annima_left {
      position: absolute;
      width: 470px;
      height: 470px;
      left: 88px;
      top: 66px;
      background: url("../assets/web/activity/card/default.webp") no-repeat
        center/cover;
      border-radius: 45px;
    }
    .anima_right_title {
      position: absolute;
      width: 356px;
      height: 61px;
      left: 628px;
      top: 76px;
      font-family: "ADAMa";
      font-style: normal;
      font-weight: 400;
      font-size: 36px;
      line-height: 61px;
      border-left: 12px solid #3ba1ff;
      letter-spacing: 0.07em;
      text-align: center;

      color: #ffffff;
    }
    .link {
      position: absolute;
      width: 50px;
      height: 50px;
      left: 1310px;
      top: 78px;
      background: url("../assets/web/home/icon/frame.png") no-repeat
        center/contain;
      cursor: pointer;
    }
    .anima_item_content {
      width: 728px;
      height: 329px;
      position: absolute;
      left: 628px;
      top: 192px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .anima_item {
        width: 155px;
        height: 155px;
        border-radius: 5px;
        margin-bottom: 30px;
        img {
          width: 155px;
          height: 155px;
        }
      }
    }
  }
  .table {
    width: 1446px;
    height: 1950px;
    position: relative;
    border-bottom: 2px solid #818181;
    .line3 {
      position: absolute;
      width: 61px;
      height: 12px;
      top: 0;
      left: 88px;
      background: #21dde4;
    }
    .table_input {
      width: 302px;
      height: 65px;
      position: absolute;
      top: 42px;
      right: 88px;
      .table_select {
        position: absolute;
        width: 302px;
        height: 65px;
        border: 2px solid #bfbfbf;
        border-radius: 8px;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        font-size: 28px;
        padding-left: 50px;
      }
      .table_select:focus {
        box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 15px;
      }
      .table_select_button {
        width: 25px;
        height: 25px;
        position: absolute;
        background: url("../assets/web/activity/icon/search.png") no-repeat
          center/cover;
        top: 19px;
        left: 18px;
      }
    }
    .table_content {
      width: 1268px;
      height: 1000px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      position: absolute;
      left: 88px;
      top: 148px;
      .table_item {
        width: 226px;
        height: 265px;
        margin-bottom: 30px;
        .item_img {
          width: 226px;
          height: 226px;
          border-radius: 25px;
          border: 1px solid #00ffff;
          overflow: hidden;
          position: relative;

          img {
            position: absolute;
            width: 226px;
            height: 226px;
            // border-radius: 14px;
          }
        }
        .item_id {
          width: 226px;
          height: 29px;
          text-align: center;
          line-height: 29px;
          border: 1px solid #00ffff;
          font-family: "Arial";
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          margin-top: 9px;
        }
      }
    }
  }
  .page {
    width: 1446px;
    height: 193px;
    position: relative;
    .line4 {
      position: absolute;
      background: #21dde4;
      width: 61px;
      height: 12px;
      right: 88px;
      top: 0px;
    }
    .left {
      width: 17px;
      height: 34px;
      background: url("../assets/web/activity/icon/left.png") no-repeat
        center/cover;
      position: absolute;
      left: 592px;
      top: 81px;
      cursor: pointer;
    }
    .right {
      width: 17px;
      height: 34px;
      background: url("../assets/web/activity/icon/right.png") no-repeat
        center/cover;
      position: absolute;
      top: 81px;
      left: 831px;
      cursor: pointer;
    }
    .middle {
      height: 60px;
      width: 160px;
      position: absolute;
      left: 642px;
      top: 76px;
      display: flex;
      .page_select {
        width: 87px;
        height: 44px;
        border: 2px solid #01e1e3;
        border-radius: 4px;
        font-size: 24px;
        font-family: "ADAMa";
        text-align: center;
        color: #ffffff;
        background: #08101b;
      }
      .page_info {
        width: 100px;
        height: 58px;
        font-size: 24px;
        font-family: "ADAMa";
        text-align: center;
        color: #ffffff;
        text-align: left;
        margin-left: 10px;
        line-height: 42px;
      }
    }
  }
}
@media only screen and (max-width: 1100px) {
  .activity_main {
    width: 100%;
    height: 3800px;
  }
  .activity {
    position: absolute;
    width: 359px;
    height: 3650px;
    left: 17px;
    top: 100px;
    background: url("../assets/web/activity/bg_mobile.webp") no-repeat
      center/cover;
    border-radius: 25px;
    .poster {
      width: 359px;
      height: 185px;
      border-radius: 25px 25px 0px 0px;
      .progress {
        position: absolute;
        width: 314px;
        height: 32px;
        left: 23px;
        top: 149px;
        position: absolute;
        background: rgba(27, 26, 2, 0.5);
        border-radius: 6px;
        .progress_time {
          position: absolute;
          width: 400px;
          height: 44px;
          left: -33px;
          top: 16px;
          text-align: right;
          font-family: "Arial";
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 12px;
          /* or 44px */
          transform: scale(0.7);

          color: #ffffff;
        }
        .progress_title {
          position: absolute;
          width: 200px;
          height: 12px;
          left: 55px;
          top: 0px;
          font-family: "ADAMa";
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 13px;
          transform: scale(0.8);
          /* identical to box height, or 51px */

          color: #ffffff;
        }
        .sold_num {
          position: absolute;
          width: 80px;
          height: 12px;
          left: 239px;
          top: 0px;
          text-align: right;
          font-family: "Arial";
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 12px;
          z-index: 5;
          color: white;
          transform: scale(0.7);
        }
        .proress_line {
          position: absolute;
          width: 297px;
          height: 7px;
          border: 1px solid #ffe44d;
          left: 9px;
          top: 12px;
          background: rgba(80, 69, 9, 0.5);

          .progress_detail {
            position: absolute;
            top: 0;
            left: 0;
            height: 5px;
            width: 100px;
            margin-top: 1px;
            background: #ffe44d;
          }
        }
      }
    }
    .line1 {
      width: 25px;
      height: 6px;
      background: #3ba1ff;
      position: absolute;
      top: 185px;
      left: 21px;
    }
    .activety_content {
      width: 359px;
      height: 279px;
      border-bottom: 1px solid #818181;
      position: relative;

      .activity_title {
        position: absolute;
        width: 300px;
        text-align: left;
        height: 30px;
        left: 20px;
        top: 18px;
        font-family: "ADAMa";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 16px;
        /* identical to box height */
        letter-spacing: 0.07em;
        color: #ffffff;
      }
      .item_content {
        width: 280px;
        height: 280px;
        position: absolute;
        left: 31px;
        top: 40px;
        .activity_item {
          width: 315px;
          height: 32px;
          margin-top: 8px;
          line-height: 130%;
          font-family: "Arial";
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          color: #ffffff;
          text-align: left;
          margin-left: 0px;
          position: relative;
          ::v-deep a {
            border-bottom: 1px solid #ffffff;
          }
        }
        .activity_item::before {
          content: "";
          width: 5px;
          height: 5px;
          transform: rotate(45deg);
          position: absolute;
          background: #ffffff;
          left: -10px;
          top: 5px;
        }
      }
    }
    .annima_content {
      width: 359px;
      height: 199px;
      border-bottom: 1px solid #818181;
      position: relative;
      .line2 {
        // position: absolute;
        // width: 25px;
        // height: 6px;
        // background: #da7fff;
        // top: 0;
        // right: 15px;
        display: none;
      }
      .annima_left {
        position: absolute;
        width: 125px;
        height: 125px;
        left: 15px;
        top: 37px;
        border-radius: 12px;
      }
      .anima_right_title {
        position: absolute;
        width: 150px;
        height: 25px;
        left: 150px;
        top: 37px;
        text-align: center;
        font-family: "ADAMa";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        letter-spacing: 0.07em;
        border-left: 4px solid #3ba1ff;
        color: #ffffff;
      }
      .link {
        position: absolute;
        width: 18px;
        height: 18px;
        left: 330px;
        top: 14px;
        background: url("../assets/web/home/icon/frame.png") no-repeat
          center/contain;
        cursor: pointer;
      }
      .anima_item_content {
        width: 198px;
        height: 71px;
        position: absolute;
        left: 147px;
        top: 67px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .anima_item {
          width: 46px;
          height: 46px;
          border-radius: 5px;
          margin-bottom: 3px;
          img {
            width: 46px;
            height: 46px;
          }
        }
      }
    }
    .table {
      width: 359px;
      height: 2920px;
      position: relative;
      border-bottom: 1px solid #818181;
      .line3 {
        position: absolute;
        width: 25px;
        height: 6px;
        top: 0;
        left: 21px;
        background: #21dde4;
      }
      .table_input_mobile {
        position: absolute;
        width: 323px;
        height: 34px;
        // box-sizing: border-box;
        border-radius: 17px;
        left: 16px;
        top: 24px;
        overflow: hidden;
        .table_select_mobile {
          width: 323px;
          height: 34px;
          // box-sizing: border-box;
          background: rgba(0, 0, 0, 0.5);

          border-radius: 17px;
          overflow: hidden;
          position: absolute;
          transition: left 0.5s linear;
          input {
            width: 200px;
            height: 34px;
            position: absolute;
            background: rgba(0, 0, 0, 0);
            color: rgba(255, 255, 255, 0.3);
            left: 30px;
            top: -2px;
            font-family: "Arial";
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            transition: left 0.5s linear;
          }
          input:focus {
            outline: none;
          }
        }
        .select_hide {
          left: 288px;
        }
        .select_show {
          left: 0;
          border: 2px solid #818181;
        }
        .table_input_show {
          position: absolute;
          width: 17px;
          height: 17px;
          left: 10px;
          top: 8px;
        }
        .table_input_button {
          position: absolute;
          width: 37px;
          height: 34px;
          background: url("../assets/web/activity/icon/search_button.png")
            no-repeat center/cover;
          right: 0;
          top: -2px;
        }
        .search_show {
          background: url("../assets/web/activity/icon/search_show.png")
            no-repeat center/cover;
          top: 7px;
        }
        .search_hide {
          background: url("../assets/web/activity/icon/search.png") no-repeat
            center/cover;
        }
      }
      .table_content {
        width: 308px;
        height: 920px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        position: absolute;
        left: 23px;
        top: 74px;
        .table_item {
          width: 144px;
          height: 168px;
          margin-bottom: 20px;
          .item_img {
            box-sizing: border-box;
            width: 144px;
            height: 144px;
            border-radius: 14px;
            border: 1px solid #00ffff;
            // overflow: hidden;
            img {
              width: 144px;
              height: 144px;
              // border-radius: 14px;
            }
          }
          .item_id {
            width: 144px;
            height: 29px;
            text-align: center;
            line-height: 29px;
            border: 1px solid #00ffff;
            font-family: "Arial";
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
            margin-top: 6px;
          }
        }
      }
    }
    .page {
      width: 359px;
      height: 57px;
      position: relative;
      .line4 {
        position: absolute;
        background: #21dde4;
        width: 25px;
        height: 6px;
        right: 18px;
        top: 0px;
      }
      .left {
        width: 10px;
        height: 21px;
        position: absolute;
        left: 111px;
        top: 17px;
      }
      .right {
        width: 10px;
        height: 21px;
        position: absolute;
        top: 17px;
        left: 236px;
      }
      .middle {
        height: 60px;
        width: 90px;
        position: absolute;
        left: 139px;
        top: 16px;
        display: flex;
        .page_select {
          width: 44px;
          height: 23px;
          border: 2px solid #01e1e3;
          border-radius: 4px;
          font-size: 14px;
          font-family: "ADAMa";
          text-align: center;
          color: #ffffff;
          background: #08101b;
        }
        .page_info {
          width: 38px;
          height: 23px;
          font-size: 14px;
          line-height: 23px;
          font-family: "ADAMa";
          color: #ffffff;
          text-align: left;
        }
      }
    }
  }
}
</style>
