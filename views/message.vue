<template>
    <div>
        <button @click="info">显示info提示</button>
        <button @click="success">显示成功提示</button>
        <button @click="warning">显示警告提示</button>
        <button @click="error">显示错误提示</button>
        <button @click="loading">显示loading</button>
    </div>

</template>

<script>
    export default {
        methods: {
            info(){
                this.$message.info('message 消息')
            },
            success(){
                this.$message.success('message 消息')
            },
            warning(){
                this.$message.warning('message 消息')
            },
            error(){
                this.$message.error('message 消息')
            },
            loading(){
                const loading = this.$message.loading('message 消息', 0)
                setTimeout(loading, 3000)
            }
        }
    }
</script>

