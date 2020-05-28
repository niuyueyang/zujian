<template>
    <hSwiper height="200px"  :list="imgList" :options="swiperOption" effect="zoom" @onClick="handleSwiperClick"></hSwiper>
</template>

<script>
    export default {
        name: "swiper",
        data(){
            return{
                imgList:[
                    {img:'http://39.106.10.163:800/fj1.jpg'},
                    {img:'http://39.106.10.163:800/fj2.jpg'},
                    {img:'http://39.106.10.163:800/fj3.jpg'},
                    {img:'http://39.106.10.163:800/fj4.jpg'},
                    {img:'http://39.106.10.163:800/fj5.jpg'}
                ],
                swiperOption:{
                    showDots: true
                }
            }
        },
        methods:{
            handleSwiperClick(index){
                console.log(index)
            }
        }

    }
</script>

<style scoped>

</style>
