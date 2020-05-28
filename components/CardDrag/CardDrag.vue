<template>
    <!--
    首先，absolute是根据第一个父元素不为static 定位的元素进行定位
    其次，确定宽高是因为将卡片移动的的时候，宽高会根据内容自适应，这里不需要宽高自适应。
    宽度为：列数*卡片外围宽度
    高度为：最后一个卡片的top+卡片外围的高度
-->
    <div :style="{
        position:'relative',
        height:computeTop(data.length)+cardOutsideHeight+'px',
        width:cardOutsideWidth*colNum+'px'
    }">

        <!--首先我们先要将卡片结构制作出来，读取数据循环生成卡片。-->
        <div class="d_cardBorderBox" v-for="item in data" :key="item.id" :id="item.id" :style="{
          width:cardOutsideWidth+'px',
          height:cardOutsideHeight+'px'
      }">
            <!-- 里面的div是用于显示卡片本身的内容 -->
            <div class="d_cardInsideBox" :style="{width:cardInsideWidth+'px',height:cardInsideHeight+'px'}">
                <!-- 这里是标题栏，用于添加点击事件 -->
                <!--然后我们就给普通卡片的标题栏添加点击事件，当鼠标点击标题栏的时候，
                先判断进行过渡动画的定时器是否为空，为空的话直接返回。不为空则执行点击事件-->
                <div class="d_topWrapBox" @mousedown="touchStart($event,item.id)">
                    <slot name="header" v-bind:item="item">
                        <div class="d_topMenuBox" >
                            <div class="d_menuTitle" v-if="item.name">{{item.name}}</div>
                            <div class="d_menuTitle" v-else>默认标题</div>
                        </div>
                    </slot>
                </div>
                <!-- 这里是内容部分 -->
                <component :is="item.componentData" :itemData="item" v-if="item.componentData"></component>
                <slot name="content" v-bind:item="item" v-else>
                    <div class="d_emptyContent">
                        卡片暂无内容
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    /*
    * @desc
    *   1.所有卡片统一采用absolute布局，根据位置号码和列数等参数计算出top和left进行显示。
        2.点击卡片的时候，先判断卡片是否在拖动状态。若不是则进入下一步，获取数据和去除卡片默认的过渡。
        3.点击后，全局监听鼠标的移动事件，鼠标移动多少距离，卡片就移动多少距离。同时需要监听窗口的滚动事件进行相同的操作。
        4.当鼠标松开时，清除所有监听，把卡片恢复至根据位置号码计算出的位置。将点击状态改为false
    * */
    export default {
        name: "CardDrag",
        props:{
            data:{
                type:Array,
                default:function () {
                    return []
                }
            },
            // 一行有多少列
            colNum:{
                type:Number,
                default:2
            },
            // 单个卡片的外范围宽度
            cardOutsideWidth:{
                type:Number,
                default:590
            },
            // 单个卡片的外范围高度
            cardOutsideHeight:{
                type:Number,
                default:380
            },
            // 单个卡片的内容宽度
            cardInsideWidth:{
                type:Number,
                default:560
            },
            // 单个卡片的内容高度
            cardInsideHeight:{
                type:Number,
                default:320
            }
        },
        data(){
            return {
                mousedownTimer: null, // 用于记录卡片当前是否在过渡状态中的定时器
            }
        },
        methods:{
            // 整体就是按列数的限定，从左往右一行一行地排列数据
            computeLeft(num){
                //left为（位置号码-1)%列数*卡片外围宽度
                return (num-1)%this.colNum * this.cardOutsideWidth;
            },
            computeTop(num) {
                //top为（位置号码/列数）向上取整，减去1，再乘以卡片外围高度
                return (Math.ceil(num / this.colNum) - 1) * this.cardOutsideHeight;
            },
            /*
            * @desc 在首次加载和监听到卡片数量产生变动时，需要重新根据自身的位置
            *       号码计算生成卡片的top和left。保证异步数据的加载也能读取到。
            * */
            addCardStyle(){
                this.$nextTick(() => {
                    this.data.forEach(item => {
                        document.querySelector("#"+item.id).style.top = this.computeTop(item.positionNum)+'px'
                        document.querySelector("#"+item.id).style.left = this.computeLeft(item.positionNum)+'px'
                    })
                })
            },
            //event为鼠标的点击事件，selectId是当前数据的id
            touchStart(event, selectId) {
                if (this.mousedownTimer) {
                    return false;
                }
                //若触发了点击事件，则返回一个暴露出一个方法
                this.$emit('startDrag',event,selectId)
                let positions = event.target.getBoundingClientRect();
                console.log(positions)
                const that = this;
                let DectetTimer = null;
                let originTop = document.body.scrollTop === 0 ? document.documentElement.scrollTop : document.body.scrollTop;
                let scrolTop = originTop;
                //记录鼠标移动的距离
                let moveTop = 0;
                let moveLeft = 0;
                //起始组件位置
                let OriginObjPosition = {
                    left: 0,
                    top: 0,
                    originNum: -1
                };
                // 起始鼠标信息
                let OriginMousePosition = {
                    x: 0,
                    y: 0
                };
                // 记录交换位置的号码
                let OldPositon = null;
                let NewPositon = null;
                // 选中的卡片的dom和数据
                let selectDom = document.getElementById(selectId);
                let selectMenuData = this.data.find(item => {
                    return item.id === selectId;
                });
                OriginMousePosition.x = event.screenX;
                OriginMousePosition.y = event.screenY;
                selectDom.classList.add('d_moveBox')
                moveLeft = OriginObjPosition.left = parseInt(
                    selectDom.style.left.slice(0, selectDom.style.left.length - 2)
                );
                moveTop = OriginObjPosition.top = parseInt(
                    selectDom.style.top.slice(0, selectDom.style.top.length - 2)
                );

                document.addEventListener("mousemove", mouseMoveListener);
                document.addEventListener("mouseup", mouseUpListener);
                document.addEventListener("scroll", mouseScroll);

                function mouseMoveListener(event) {
                    moveTop = OriginObjPosition.top +  event.screenY - OriginMousePosition.y;
                    moveLeft = OriginObjPosition.left +  event.screenX - OriginMousePosition.x;
                    document.querySelector(".d_moveBox").style.left = moveLeft + "px";
                    document.querySelector(".d_moveBox").style.top = moveTop + scrolTop - originTop + "px";  //这里要加上滚动的高度

                    if (!DectetTimer) {
                        DectetTimer = setTimeout(()=>{
                            cardDetect(moveTop + scrolTop - originTop,moveLeft)
                            DectetTimer = null;
                        }, 200);
                    }
                }
                function mouseScroll(event) {
                    console.log( moveTop , scrolTop , originTop)
                    scrolTop =
                        document.body.scrollTop === 0
                            ? document.documentElement.scrollTop
                            : document.body.scrollTop;
                    // document.querySelector(".d_moveBox").style.top = moveTop + scrolTop - originTop + "px";
                }
                /*
                * 在上面的鼠标移动事件中，我们调用检测函数，检测当前移动位置是否有卡片在下方，但需要对检测函数进行节流，否则检测频率太高影响性能。
                * 卡片移动至另一张卡片的某一方向距离超过百分之50的距离时，则进行位置交换。（这里检测的是以卡片外围宽高进行计算的）
                * */
                function cardDetect(moveItemTop, moveItemLeft){
                    // 计算当前移动卡片位于卡片的哪一行哪一列
                    let newWidthNum = Math.round((moveItemLeft/ that.cardOutsideWidth))+1
                    let newHeightNum = Math.round((moveItemTop/ that.cardOutsideHeight))

                    // 如果移动卡片至范围外则不会有任何操作，直接返回
                    if(newHeightNum>(Math.ceil(that.data.length / that.colNum) - 1)||
                        newHeightNum<0||
                        newWidthNum<=0||
                        newWidthNum>that.colNum){
                        return false
                    }
                    //将计算的行列转换为位置号码
                    const newPositionNum = (newWidthNum) + newHeightNum * that.colNum
                    if(newPositionNum!==selectMenuData.positionNum){
                        let newItem = that.data.find(item=>{
                            return item.positionNum === newPositionNum
                        })
                        if( newItem ){
                            swicthPosition(newItem, selectMenuData);
                        }
                    }
                }
                /*
                * 当检测得到的位置号码，与现有的其他普通卡片位置号码重复时，则判定为需要交换位置。
                * 交换的情况分为位置号码从小移动到大，和从大移动到小两种情况。
                * */
                function swicthPosition(newItem, originItem) {
                    OldPositon = originItem.positionNum;
                    NewPositon = newItem.positionNum;
                    console.log(OldPositon,NewPositon,originItem)
                    that.$emit('swicthPosition',OldPositon,NewPositon,originItem)
                    //位置号码从小移动到大
                    if (NewPositon > OldPositon) {
                        let changeArray = [];
                        //从小移动到大，那小的号码就会空出来，其余卡片应往前移动一位
                        //找出两个号码中间对应的卡片数据
                        for (let i = OldPositon + 1; i <= NewPositon; i++) {
                            let pushData = that.data.find(item => {
                                return item.positionNum === i;
                            });
                            changeArray.push(pushData);
                        }

                        for (let item of changeArray) {
                            //vue的$set使更改数据的同时实时刷新样式
                            that.$set(item, "positionNum", item.positionNum - 1);
                            document.querySelector('#'+item.id).style.top = that.computeTop(item.positionNum)+'px'
                            document.querySelector('#'+item.id).style.left = that.computeLeft(item.positionNum)+'px'
                        }
                        that.$set(originItem, "positionNum", NewPositon);
                    }
                    //位置号码从大移动到小
                    if (NewPositon < OldPositon) {
                        let changeArray = [];
                        //从大移动到小，那大的号码就会空出来，其余卡片应往后移动一位
                        //找出两个号码中间对应的卡片数据
                        for (let i = OldPositon - 1; i >= NewPositon; i--) {
                            let pushData = that.data.find(item => {
                                return item.positionNum === i;
                            });
                            changeArray.push(pushData);
                        }
                        for (let item of changeArray) {
                            that.$set(item, "positionNum", item.positionNum + 1);
                            console.log(item,that.computeLeft(item.positionNum),that.computeTop(item.positionNum))
                            document.querySelector('#'+item.id).style.top = that.computeTop(item.positionNum)+'px'
                            document.querySelector('#'+item.id).style.left = that.computeLeft(item.positionNum)+'px'
                        }
                        that.$set(originItem, "positionNum", NewPositon);
                    }
                }
                function mouseUpListener() {
                    //取消位于交换队列的检测事件、对位置进行最后一次检测
                    clearTimeout(DectetTimer)
                    DectetTimer = null
                    cardDetect(moveTop + (scrolTop - originTop),moveLeft)
                    document.querySelector(".d_moveBox").classList.add('d_transition');
                    document.querySelector(".d_moveBox").style.top = that.computeTop(selectMenuData.positionNum) + "px";
                    document.querySelector(".d_moveBox").style.left = that.computeLeft(selectMenuData.positionNum) + "px";
                    that.$emit('finishDrag',OldPositon,NewPositon,selectMenuData)
                    that.mousedownTimer = setTimeout(() => {
                        /*用0.3秒来过渡
                          mousedownTimer在一开始对点击事件进行了判断，若还在过渡则不能进行下一次点击
                        */
                        document.querySelector(".d_moveBox").classList.remove('d_transition')
                        document.querySelector(".d_moveBox").classList.remove('d_moveBox')
                        clearTimeout(that.mousedownTimer);
                        that.mousedownTimer = null;
                    }, 300);

                    document.removeEventListener("mousemove", mouseMoveListener);
                    document.removeEventListener("mouseup", mouseUpListener);
                    document.removeEventListener("scroll", mouseScroll);
                }
            },
        },
        watch:{
            data:{
                handler:function(){
                    this.addCardStyle()
                },
                immediate: true
            }
        }
    }
</script>

<style scoped>
    .d_cardBorderBox {
        user-select: none;
        position: absolute;
        transition: all 0.3s;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .d_cardInsideBox {
        border-radius: 5px;
        box-shadow: 0 0 5px #cacaca;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .d_menuTitle {
        pointer-events: none;
    }
    .d_topMenuBox {
        height: 50px;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #838383;
        background-color: white;
        padding: 0px 15px;
    }
    .d_moveBox {
        top:20px;
        left: 20px;
        z-index: 300;
        transition: none;
    }
    .d_topWrapBox {
        cursor: move;
        border-bottom: 1px solid #e0e0e0;
    }
    .d_emptyContent{
        width: 100%;
        height: 100%;
        font-size: 16px;
        color: #979797;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .d_transition{
        transition: all 0.3s;
    }
</style>
