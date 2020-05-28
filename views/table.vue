<template>
    <Table :data="data" >
</template>

<script>
    import Table from './Table'
    export default {
        components: {
            Table
        },
        data(){
            return {
                data: [
                    {
                        name:'张三',
                        price:50
                    },
                    {
                        name:'李四',
                        price:80
                    }
                ],
                columns: [
                    { label: '名称', prop: 'name', width: 200, fixed: 'left'},
                    { label: '金额', prop: 'price', prefix:'￥',width: 200,suffix:'元'}
                ]
            }
        }
    }
</script>
