<template>
    <div>
        <button @click="showModal">展示confirm</button>
    </div>
</template>

<script>
    export default {
        name: "confirm",
        methods:{
            showModal(){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    onOk: () => {
                        this.$message.success('删除成功!');
                    },
                    onCancel: () => {
                        this.$message.info('取消删除!');
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
