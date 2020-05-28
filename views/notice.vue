<template>
    <div>
        <button @click="open">打开通知提醒</button>
        <button @click="info">打开通知提醒</button>
        <button @click="success">打开成功提醒</button>
        <button @click="warning">打开警告提醒</button>
        <button @click="error">打开错误提醒</button>
    </div>
</template>

<script>
    export default {
        name: "notice",
        methods: {
            open(){
                this.$notice.open({
                    title: 'Notice 通知提醒',
                    desc: '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述',
                    duration:0//duration为0时，手动关闭
                })
            },
            info(){
                this.$notice.info({
                    title: 'Notice 通知提醒',
                    desc: '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述',
                })
            },
            success(){
                this.$notice.success({
                    title: 'Notice 通知提醒',
                    desc: '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述'
                })
            },
            warning(){
                this.$notice.warning({
                    title: 'Notice 通知提醒',
                    desc: '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述'
                })
            },
            error(){
                this.$notice.error({
                    title: 'Notice 通知提醒',
                    desc: '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述'
                })
            },
        }
    }
</script>

<style scoped>

</style>
