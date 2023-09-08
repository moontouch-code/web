<template>
  <div class="home">
    <homeMoonTouch class="section"></homeMoonTouch>
    <HomeStory class="section"></HomeStory>
    <HomeAnima class="section"></HomeAnima>
    <HomeFairy class="section"></HomeFairy>
    <HomeGame class="section"></HomeGame>
    <HomeRoadMap class="section"></HomeRoadMap>
    <HomeTeam class="section"></HomeTeam>
    <HomePartner class="section" id="test"></HomePartner>
    <HomeFaq class="section"></HomeFaq>
    <footerInfo class="section"></footerInfo>
    <div class="flex-wrapper-four" v-if='!isMobile'  v-show="tabIndex != 0">
      <div class="tabScrollContent">
        <p ref="tabIndexNum" class="num-04">{{ tabInfo }}</p>
      </div>
      <div class="relative-wrapper-one">
        <div class="rectangle-2"></div>
        <div class="rectangle-21" ref="tabScroll"></div>
      </div>
      <div class="flex-wrapper-five">
        <p
          class="tabNum"
          v-for="(item, index) in tabList"
          :key="index"
          @click="jumpTo(index)"
          @mouseenter="showDetail(1, index)"
          @mouseleave="showDetail(0, index)"
          ref="tabItem"
        >
          {{
            index == tabIndex
              ? item.text
              : item.type == 1
              ? item.text
              : item.name
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { actionReport } from "@/apis/login";
import HomeAnima from "@/components/homeAnima.vue";
import HomeFairy from "@/components/homeFairy.vue";
import HomeGame from "@/components/homeGame.vue";
import HomePartner from "@/components/homePartner.vue";
import HomeRoadMap from "@/components/homeRoadMap.vue";
import HomeStory from "@/components/homeStory.vue";
import HomeTeam from "@/components/homeTeam.vue";
import HomeFaq from "@/components/homeFaq.vue";
import { set } from "vue";
export default {
  name: "home",
  data() {
    return {
      arrDom: [],
      tabInfo: "01",
      tabIndex: 0,
      timer: null,
      tabList: [
        {
          name: "01",
          text: "home",
          type: 0,
        },
        {
          name: "02",
          text: "Story",
          type: 0,
        },
        {
          name: "03",
          text: "Anima",
          type: 0,
        },
        {
          name: "04",
          text: "Fairy",
          type: 0,
        },
        {
          name: "05",
          text: "Game",
          type: 0,
        },
        {
          name: "06",
          text: "Roadmap",
          type: 0,
        },
        {
          name: "07",
          text: "Team",
          type: 0,
        },
        {
          name: "08",
          text: "Partner",
          type: 0,
        },
        {
          name: "09",
          text: "FAQ",
          type: 0,
        },
      ],
    };
  },
  mounted() {
    if (this.isMobile) return;
    this.arrDom = document.getElementsByClassName("section");
    window.addEventListener("scroll", this.handleScroll);  
    // this.$scrollTo(document.getElementsByClassName("section")[0]);
    window.scrollTo(0,0)
  },
  destroyed() {
    // if (this.isMobile()) return true;
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    isMobile() {
      this.$store.commit("setMobile");
      return this.$store.state.isMobile;
    },
  },
  methods: {
    handleScroll() {
      if (this.isMobile) return;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.headerFixed = scrollTop > this.offsetTop;
      for (let i = 0; i < this.arrDom.length; i++) {
        if (this.arrDom[this.arrDom.length - 1].offsetTop - scrollTop > 80) {
          if (
            this.arrDom[i].offsetTop - scrollTop <= 80 &&
            (this.arrDom[i + 1].offsetTop - scrollTop > 80 ||
              !this.arrDom[i + 1])
          ) {
            this.tabChange(i);
          }
        } else {
        }
      }
    },
    jumpTo(index) {
      let offsetTop = 0;
      if (index == 0) offsetTop = -60;
      this.$scrollTo(document.getElementsByClassName("section")[index], {
        offset: offsetTop,
      });
    },
    tabChange(i) {
      this.$refs.tabScroll.style.top = 10.5 * i + "vh";
      this.$refs.tabIndexNum.style.marginTop = 10.5 * i + "vh";
      this.tabIndex = i;
      this.tabInfo = this.tabList[i].name;
      // document.getElementsByName("tabNum")[i].innerText = this.tabList[i].text;
    },
    showDetail(type, index) {
      this.$refs.tabItem[index].style.opacity = 0;
      setTimeout(() => {
        this.tabList[index].type = type;
        this.$refs.tabItem[index].style.opacity = 1;
      }, 300);
      // console.log(item,type,index,)/
    },
  },
  components: {
    HomeStory,
    HomeFairy,
    HomeAnima,
    HomeGame,
    HomeRoadMap,
    HomeTeam,
    HomeTeam,
    HomePartner,
    HomeFaq,
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: absolute;
  left: 0;
  top: 59px;
  overflow: hidden;
  // -webkit-transform:rotate(0deg);
  .flex-wrapper-four {
    width: 250px;
    height: 92vh;
    padding: 0 0 0 28px;
    display: flex;
    z-index: 10;
    align-items: flex-start;
    position: fixed;
    top: 61px;
  }
  .tabScrollContent {
    width: 60px;
    height: 100vh;
    margin-top: 45px;
    position: relative;
    .num-04 {
      font-family: "ADAMa";
      font-size: 30px;
      font-weight: 400;
      line-height: normal;
      color: rgba(255, 255, 255, 1);
      position: absolute;
      top: 0;
      margin-top: 80px;
      margin-right: 20px;
      width: 40px;
      letter-spacing: 2.1px;
      z-index: 10;
      transition: all 0.5s linear;
    }
  }

  .relative-wrapper-one {
    margin-right: 15px;
    position: relative;
  }
  .rectangle-2 {
    width: 2px;
    height: 100vh;
    background-color: rgba(217, 217, 217, 1);
    position: relative;
  }
  .rectangle-21 {
    width: 6px;
    height: 78px;
    background-color: rgba(0, 162, 255, 1);
    position: absolute;
    left: -2px;
    top: 0px;
    margin-top: 20px;
    transition: 0.5s all;
  }
  .flex-wrapper-five {
    margin-left: 18px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
  .tabNum {
    font-family: "ADAMa";
    font-size: 20px;
    font-weight: 400;
    line-height: normal;
    color: rgba(171, 175, 179, 1);
    margin-left: -10px;
    letter-spacing: 2.1px;
    line-height: 3.5vh;
    height: 5vh;
    margin-top: 5.5vh;
    width: 100px;
    text-align: left;
    cursor: pointer;
    transition: opacity .2s linear;
  }
  .tabNum:nth-child(1) {
    margin-top: 40px !important;
  }
}
@media only screen and (max-width: 1100px) {
  .home {
    margin-top: -30px;
  }
}
</style>
