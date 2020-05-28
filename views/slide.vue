<template>
    <div class="wrap">
        <hSlider :min=0 :max=80 v-model = "value" :range="true" @on-change="showValue"></hSlider>
        <br/>
        <hSlider :min=0 :max=100 v-model = "value1" ></hSlider>
    </div>

</template>

<script>
    export default {
        name: "slide",
        data(){
            return{
                min:0,
                max:80,
                value:[15,50],
                value1:20,
                min1:10,
                max1:100
            }
        },
        methods:{
            Val(){

            },
            showValue(val){
                console.log(val)
            },
            showValue1(val){
                console.log(val)
            }
        }
    }
</script>

<style scoped>
    .wrap{
        width: 200px;
        height: 30px;
        position: relative;
        margin: 0 auto;
    }
</style>
