<template>
    <div>
        <img src="./../assets/img/fj1.jpg"/>
        <button @click="changeUrl">点击card</button>
        <CardDrag  ref="cardDrag" :data="cardList" :colNum="1"></CardDrag>
    </div>

</template>
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                cardList: [
                    {
                        positionNum: 1,
                        name: "演示卡片1",
                        id: "card1"
                    },
                    {
                        positionNum: 2,
                        name: "演示卡片2",
                        id: "card2"
                    },
                    {
                        positionNum: 3,
                        name: "演示卡片3",
                        id: "card3"
                    },
                    {
                        positionNum: 4,
                        name: "演示卡片4",
                        id: "card4"
                    },
                    {
                        positionNum: 5,
                        name: "演示卡片5",
                        id: "card5"
                    },
                    {
                        positionNum: 6,
                        name: "演示卡片6",
                        id: "card6"
                    },
                    {
                        positionNum: 7,
                        name: "演示卡片7",
                        id: "card7"
                    },
                    {
                        positionNum: 8,
                        name: "演示卡片8",
                        id: "card8"
                    },
                    {
                        positionNum: 9,
                        name: "演示卡片9",
                        id: "card9"
                    },
                    {
                        positionNum: 10,
                        name: "演示卡片10",
                        id: "card10"
                    },
                    {
                        positionNum: 11,
                        name: "演示卡片11",
                        id: "card11"
                    },
                ],
            }
        },
        async mounted(){
            let res = await axios.get('http://localhost:7001/admin/login').catch(err => null);
            // console.log(res.data)
        },
        methods:{
            changeUrl(){
                this.$router.push({path:'/date'})
            }
        }
    }
</script>
<style>
    .item{
        width: 100px;
        height: auto;
        overflow: hidden;
        float: right;
    }
    .item div{
        width: 100px;
        height: 50px;
        color: #fff;
        background-color: #2d7bf4;
        text-align: center;
        line-height: 50px;
        margin-bottom: 20px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 20px;
    }
</style>
