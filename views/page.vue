<template>
    <Page
            @pagechange="pagechange"
            :totalCount= "total"
            :page-number="pageNumber"
            :pageSize="PageSize">
    </Page>
</template>
<script>
    export default {
        data(){
            return {
                PageSize: 10,     //每页的条数
                total:90, //总条数
                pageNumber: 1,   // 当前的页数
            }
        },
        methods:{
            pagechange:function(page){
                console.log(page)
                // ajax请求, 向后台发送 page.currentPage, 来获取对应的数据，
        //发送请求是 loading=true,请求成功后 loading=false,就能更新过页码来，如果没有搜索功能的可以不用添加loading
            },
        },
    }
</script>
