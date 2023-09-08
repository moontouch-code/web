<!-- <template>
  <transition name="animation">
    <div class="popup" v-if="isVisable">
      <div class="mask" @click="onClickMask"></div>
      <div class="popup_box" :style="{width:isWidth,height:isHeight}">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    setClose: {
      type: [Boolean],
      default: false,
    },
    setWidth: {
      type: [Number],
      default: 965,
    },
    setHeight: {
      type: [Number],
      default: 482,
    },
  },
  mounted() {
  },
  computed: {
    isVisable() {
      return this.setClose
    },
    isWidth() {
      return this.setWidth + "rem"
    },
    isHeight() {
      return this.setHeight + "rem"
    },
  },
  methods: {
    onClickMask() {
      this.$emit('popup_close',false)
    }
  }
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
  transition: opacity 0.6s;
}

.popup {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .popup_box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: url("../assets/web/pop/popbg.webp") no-repeat;
    background-size: 100% 100%;
    animation: pop 0.3s;
  }
}
</style> -->
