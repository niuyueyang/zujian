<template>
    <div>
        <button @click="send">发送</button>
        <img src="http://127.0.0.1:3000/1.jpg"/>
    </div>
</template>

<script>
    export default {
        name: "testnode",
        methods:{
            send(){
                this.$axios.get('http://127.0.0.1:3000/1.jpg',{
                    name:'傻猴',
                }).then(res => {
                    console.log(res.data)
                })
            }
        }
    }
</script>

<style scoped>

</style>
