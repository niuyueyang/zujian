<template>
    <div class="swiper-component" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" :style="{height:height}">
        <ul :style="[ulStyle, swiperStyle]">
            <li v-for="(item, ind) in list" :key="ind" :style="{width: itemWidth + 'px'}" :class="[index===ind?'active':'', effect]" @click="handleClick(item)">
                <img :src="item.img">
            </li>
        </ul>
        <div v-show="options.showDots" class="swiper-dots">
            <div v-for="(item, ind) in list" :key="ind" class="dots-item" :class="{active:index===ind}"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'hSwiper',
        data(){
            return{
                ulStyle: { width: window.innerWidth+"px" }, // 轮播图容器宽度
                itemWidth:document.innerWidth,
                swiperStyle:{},
                index: 0, // 当前显示的轮播图索引，默认第一张
                touchStart: 0, // 触摸开始点位
                touchEnd: {}, // 触摸结束点位
                intervalTime: "" // 循环轮播定时器
            }
        },
        props:{
            height:{
                type:String,
                default:'300px'
            },
            options:{
                type:Object,
                default(){
                    return{
                        showDots: true, // 是否显示分页器
                        interval: 3000, // 轮播间隔时间，默认3s
                        autoplay: true, // 是否自动播放
                        loop: false // 是否循环轮播
                    }
                }
            },
            list:{
                type: Array,
                default(){
                    return []
                }
            },
            effect:{
                type:String,
                default:'zoom',// 轮播图的样式类型，默认正常类型 normal，可选：zoom（缩放）
            }
        },
        mounted(){
            this.calcWidth();
            // this.handleLoopMove();
        },
        methods:{
            /**
             * @desc 初始化时的一些宽度计算操作
             */
            calcWidth(){
                // 页面更新后执行宽度计算
                this.$nextTick(()=>{
                    if(this.effect == 'zoom'){
                        this.itemWidth = document.body.clientWidth-40;
                        this.ulStyle.paddingLeft = '20px'
                    }
                    else if(this.effect == 'normal'){
                        this.itemWidth = document.body.clientWidth;
                        this.ulStyle.paddingLeft = 0;
                    }
                    var length = this.list.length;
                    this.ulStyle.width = parseInt((this.itemWidth +40) * length) + 'px' // 必须加40，否则最后一张显示不出来
                })
            },
            /**
             * 轮播图点击事件
             */
            handleClick(val) {
                // 触发外部事件，将点击的轮播图详情数据返回
                this.$emit("onClick", val);
            },
            /**
             * 触摸开始事件，记录下触摸点
             */
            onTouchStart(e){
                this.touchStart = e.changedTouches[0];
                clearInterval(this.intervalTime);
            },
            /**
             * 移动处理
             */
            handleMove() {
                let moveX = this.itemWidth * this.index;
                if(this.index ===0 ){
                    moveX = 0;
                }
                else{
                    this.swiperStyle = {
                        transform: "translateX(-" + (moveX+20) + "px)"
                    }
                }
                this.swiperStyle = {
                    transform: "translateX(-" + moveX + "px)"
                }
            },
            handleLoopMove(){
                // 当设置自动播放时，执行自动循环播放操作，否则，只执行下一次轮播效果
                if (this.options.autoplay) {
                    let interval = this.options.interval ? this.options.interval : 3000;
                    this.intervalTime = setInterval(() => {
                        this.index++;
                        if (this.index > this.list.length - 1) {
                            this.index = 0; // 置为-1,下次轮播时index就会变成0，图片定位到起始位置
                        }
                        this.handleMove();
                    }, interval);
                }
            },
            /*
            * 手指滑动
            * */
            onTouchMove(e){
                  var now =  e.changedTouches[0].clientX;
                  var start = this.touchStart.clientX;
                  var minus = now - start;
                  let moveX = this.itemWidth * this.index;
                  // 左滑
                  if(minus > 0 && minus < 60){
                    this.swiperStyle = {
                        transform: "translateX(-" + (moveX+20-minus) + "px)"
                    }
                  }
                  // 右滑
                  if(minus < 0 && minus > -60){
                    this.swiperStyle = {
                        transform: "translateX(-" + (moveX+20-minus) + "px)"
                    }
                   }
            },
            /**
             * 触摸结束事件，记录下触摸点，比较当前点和触摸开始点，判断触摸方向
             */
            onTouchEnd(e){
                this.touchEnd = e.changedTouches[0];
                // 比较移动的点位差，正数就是右滑，负数就是左滑
                if(this.touchEnd.clientX - this.touchStart.clientX > 60){
                    this.index--;
                    if(this.index <= 0){
                        this.index = 0;
                    }
                }
                if(this.touchEnd.clientX - this.touchStart.clientX < -60){
                    this.index++;
                    if(this.index > this.list.length -1){
                        this.index = this.list.length -1;
                    }
                }
                // 处理当前的滑动
                this.handleMove();
                // 同时开启自动轮播
                this.handleLoopMove();
            }
        },
        watch:{
            list:function () {
                this.calcWidth();
            }
        },
        destroyed(){
            if(this.options.autoplay){
                clearInterval(this.intervalTime);
            }

        }
    }
</script>

<style lang="less" scoped>
    .swiper-component {
        overflow: hidden;
        height: 300px;
        position: relative;
        ul {
            white-space: nowrap;
            height: 100%;
            transition: 0.5s ease;
            li {
                list-style: none;
                height: 100%;
                float: left;
                overflow: hidden;
                width: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
                &.zoom {
                    border-radius: 0.16rem;
                    transform: scale(0.93);
                    transition: 0.5s ease;
                    &.active {
                        transform: scale(1);
                    }
                }
            }
        }
        .swiper-dots {
            position: absolute;
            bottom: 16px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            .dots-item {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                margin: 0rem 4px;
                &.active {
                    background: #409eff;
                }
            }
        }
    }
</style>
