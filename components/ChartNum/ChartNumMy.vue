<template>
    <div class="chartNum">
        <div class="box-item">
            <li
                :class="{'number-item':!isNaN(item),'mark-item':!isNaN(item)}"
                v-for="(item,index) in orderNum"
                :key="index">
                <span v-if="!isNaN(item)">
                    <i ref="numberItem">0123456789</i>
                </span>
                <span class="comma" v-else>{{item}}</span>
            </li>
        </div>
    </div>
</template>

<script>
    export default {
        name: "hChartNum",
        props:{
          num:{
              type:Number,
              default:1123
          }
        },
        data() {
            return {
                orderNum: ['0', '0', '0', '0', '0', '0', '0', '0'], // 默认订单总数
            }
        },
        mounted(){
            setTimeout(() => {
                this.toOrderNum(this.num) // 这里输入数字即可调用
            }, 500);
        },
        methods:{
            // 设置文字滚动
            setNumberTransform(){
                const numberItems = this.$refs.numberItem // 拿到数字的ref，计算元素数量
                const numberArr = this.orderNum.filter(item => !isNaN(item))
                // 结合css，让文字滚动起来
                for (let index = 0; index < numberItems.length; index++) {
                    const elem = numberItems[index];
                    elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`
                }
            },


            // 处理订单数字
            toOrderNum(num){
                num = num.toString();
                if(num.length < 8){
                    num = '0' + num; // 未满8位，补零
                    this.toOrderNum(num); // 递归添加"0"补位
                }
                else if(num.length == 8){
                    this.orderNum = num.split('')
                }
                else{
                    // 数据量超过8位
                    this.$message.error('数据量过大');
                }
                this.setNumberTransform();
            }
        }
    }
</script>

<style scoped lang="less">
    .box-item{
        position: relative;
        height: 100px;
        font-size: 54px;
        line-height: 41px;
        text-align: center;
        list-style: none;
        color: #2D7CFF;
        writing-mode: vertical-lr;
        text-orientation: upright;

        -moz-user-select: none;
        -webkit-user-select: none; /*webkit浏览器*/
        -ms-user-select: none; /*IE10*/
        -khtml-user-select: none; /*早期浏览器*/
        user-select: none;
    }

    /*默认逗号设置*/
    .number-item{
        width: 10px;
        height: 100px;
        margin-right: 5px;
        line-height: 10px;
        font-size: 48px;
        position: relative;
        & > span{
            position: absolute;
            width: 100%;
            bottom: 0;
            writing-mode: vertical-rl;
            text-orientation: upright;
          }
    }

    /*滚动数字设置*/
    .number-item {
        width: 41px;
        height: 75px;
        background: url(./img/bg.jpg) no-repeat center center;
        background-size: 100% 100%;
        list-style: none;
        margin-right: 5px;
        border-radius:4px;
        border:1px solid rgba(221,221,221,1);
        & > span{
            position: relative;
            display: inline-block;
            margin-right: 10px;
            width: 100%;
            height: 100%;
            writing-mode: vertical-rl;
            text-orientation: upright;
            overflow: hidden;
            & > i {
                font-style: normal;
                position: absolute;
                top:11px;
                left: 50%;
                transform: translate(-50%,0);
                transition: transform 1s ease-in-out;
                letter-spacing: 10px;
            }
        }
    }
    .number-item:last-child {
        margin-right: 0;
    }
</style>
