<!-- <template>
    <div class="loading" >
        <div class="mask">
            <div class="icon">
            </div>
            <div class="text">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'loading',
    methods:{
        
    }
}
</script>

<style lang="scss" scoped>
.loading{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100vw;
    height: 940px;
    z-index: 100;
    .mask{
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .icon{
            width: 237px;
            height: 237px;
            background: url("../assets/web/loading/logo.png") no-repeat center/cover;
            animation: baskball 2.5s infinite;
            animation-timing-function: linear;
        }
        .text{
            width: 491px;
            height: 92px;
            background: url("../assets/web/loading/loading.png") no-repeat center/cover;
        }
    }
}
@keyframes baskball {
    100% {
        transform:rotate(360deg);
    }
  }
</style> -->