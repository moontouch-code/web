<!-- <template>
  <div class="download">
    <div class="download_cont" :class="isQRCode_pop?'chanageOpacity':''">
      <ul class="download_ul">
        <li
          class="download_li"
          v-for="(item, index) in downloadList"
          :key="index"
          @click="onClickDownLoad(index)"
        >
          <a :href="item.href" class="download_a"></a>
        </li>
      </ul>
    </div>

    <div v-show="isQRCode_pop" class="downloadQRCode_pop" @click="isQRCode_pop = false">
      <img src="../assets/web/download/QRCode_bg.png" alt="">
    </div>
  </div>
</template>

<script>
import { actionReport } from '@/apis/login'
export default {
  name: "download",
  data() {
    return {
      downloadList: [
        {
          href: "#",
        },
      ],
      isQRCode_pop:false,
    };
  },
  methods:{
    onClickDownLoad(index){
      var _packageName = "com.cgtc.mt1"
      var _downUrl = "https://play.google.com/store/apps/details?id=com.cgtc.mt"
      var _scheme = "mt"
      var sendMsg = {"package" : _packageName, "downUrl" : _downUrl , "scheme" : _scheme};
      if (window.flutter_inappwebview != null) {
        window.flutter_inappwebview.callHandler("onMTSTakesClaim", JSON.stringify(sendMsg));
      } else {
        window.open("https://play.google.com/store/apps/details?id=com.cgtc.mt");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.download {
  width: 100%;
  height: 940px;
  background: url("../assets/web/download/download_bg.webp") no-repeat
    center/cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .download_cont {
    width: 1379px;
    height: 688px;
    background: url("../assets/web/download/download_box.webp") no-repeat
      center/cover;
    box-sizing: border-box;
    .download_ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin: 0 auto;
      padding-left: 60px;
      box-sizing: border-box;
      .download_li {
        width: 330px;
        height: 98px;
        margin-right: 60px;
        margin-bottom: 28px;
        &:nth-child(2n) {
          margin-right: 0;
        }
        &:nth-child(1) {
          background: url("../assets/web/download/google_download.png") no-repeat
            center/cover;
        }
        // &:nth-child(2) {
        //   background: url("../assets/web/download/app_store.webp") no-repeat
        //     center/cover;
        //   margin-left: 57px;
        // }
        .download_a {
          display: block;
          width: 100%;
          height: 100%;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .downloadQRCode_pop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 495px;
      height: 595px;
      background-size: 100% 100%;
    }
  }
  .chanageOpacity {
    opacity: .4;
  }
}

@media all and (orientation: portrait) {
  .download {
    background: url("../assets/h5/download/download_bg.jpg") no-repeat
      center/cover;
    .download_cont {
      width: 738px;
      height: 1076px;
      background: url("../assets/h5/download/download_box.png") no-repeat
        center/cover;
      .download_ul {
        width: 330px;
        padding-left: 0;
        flex-direction: column;
        justify-content: center;
        padding: 280px 0;
        .download_li {
          margin-right: 0;
          margin-bottom: 18px;
          &:nth-child(1) {
            background: url("../assets/web/download/google_download.png") no-repeat
              center/cover;
          }
          // &:nth-child(2) {
          //   background: url("../assets/h5/download/app_store.png") no-repeat
          //     center/cover;
          //   margin-left: 0;
          // }
        }
      }
    }
  }
}
.short {
  .download_cont {
    transform: scale(0.9) !important;
    margin-top: 50px;
  }
}
</style> -->
