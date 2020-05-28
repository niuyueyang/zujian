<template>
    <div class="page-helper" v-if="totalCount>0">
        <div class="page-list">
            <span class="total-content">共{{Math.ceil(totalCount / pageSize)}}页</span>
            <span class="page-item" :class="{'disabled': currentPage == 1}" @click="jumpPage(1)">首页</span>
            <span class="page-item" :class="{'disabled': currentPage == 1}" @click="prevPage">上一页</span>


            <span
                  class="page-item"
                  v-for="num in groupList"
                  :class="{'page-current':currentPage===num}"
                  :key="num"
                  @click="jumpPage(num)"
            >
                {{num}}
            </span>


            <span class="page-item" :class="{'disabled': currentPage == totalPage}" @click="nextPage">下一页</span>
            <span class="page-item" :class="{'disabled': currentPage == totalPage}" @click="jumpPage(totalPage)">尾页</span>
            <span class="ml20 jump-to">跳至</span>
            <input class="page-jump-to input" v-model="jumpPageNumber"/>
            <span class="page-style">页</span>
            <span class="page-item jump-go-btn" @click="goPage(jumpPageNumber)" >确定</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Page",
        props:{
            // 当前页面
            pageNumber:{
                type:Number,
                default: 1
            },
            // 每页数量
            pageSize:{
                type:Number,
                default: 10
            },
            // 总条数
            totalCount:{
                type:Number,
                default: 0
            },
            // 连续页码个数
            pageGroup:{
                type:Number,
                default: 5
            },
        },
        data(){
            return {
                currentPage: this.pageNumber, // 当前页码
                currentSize: this.pageSize, // 每页条数
                jumpPageNumber: 1, // 跳转页数
                showPrevMore: false,
                showNextMore: false
            }
        },
        computed:{
            totalPage(){
                return Math.ceil(this.totalCount / this.pageSize)
            },
            // 获取分页码
            groupList(){
                const groupArray = [];
                const totalPage = this.totalPage; // 总页码
                const pageGroup = this.pageGroup;
                const _offset = (pageGroup-1)/2;
                let current = this.currentPage; // 当前页码
                let self = this;
                const offset = {
                    start: current - _offset,
                    end: current + _offset
                }
                if(offset.start < 1){
                    offset.end = offset.end + (1-offset.start)
                    offset.start = 1;
                }
                if(offset.end > totalPage){
                    offset.start = offset.start - _offset;
                    offset.end = totalPage;
                }
                if (offset.start < 1) offset.start = 1
                self.showPrevMore = (offset.start > 1)
                self.showNextMore = (offset.end < totalPage)
                for (let i = offset.start; i <= offset.end; i++) {
                    groupArray.push(i)
                }
                return groupArray
            }
        },
        methods:{
            prevPage () {
                if (this.currentPage > 1) {
                    this.jumpPage(this.currentPage - 1)
                }
            },
            nextPage () {
                if (this.currentPage < this.totalPage) {
                    this.jumpPage(this.currentPage + 1);

                }
            },
            goPage (jumpPageNumber) {

                if(Number(jumpPageNumber) <= 0){
                    jumpPageNumber = 1
                }if(Number(jumpPageNumber) >= this.totalPage){

                    jumpPageNumber = this.totalPage
                }
                if(isNaN(jumpPageNumber)){
                    jumpPageNumber = 1
                    alert("请输入正确的页码")
                }
                let re = /^[1-9]+[0-9]*]*$/
                if (!re.test(jumpPageNumber))
                {
                    alert("请输入正确的页码");
                    jumpPageNumber = 1
                }

                this.jumpPage(Number(jumpPageNumber))
            },
            jumpPage (pageNumber) {
                if (this.currentPage !== pageNumber) {  //点击的页码不是当前页码
                    this.currentPage = pageNumber
                    //父组件通过change方法来接受当前的页码
                    // jumpPage
                    this.$emit('pagechange', {currentPage: this.currentPage, currentSize: this.currentSize})
                }
            }
        }
    }
</script>

<style scoped>
    .page-helper {
        margin-top:50px;
        font-weight: 500;
        height: 40px;
        text-align: center;
        color: #888;
        margin: 10px auto;
    }
    .page-list {
        font-size: 0;
        height: 50px;
        line-height: 50px;
        /* margin-top:57px; */
    }
    .page-list span {
        /* display: block; */
        font-size: 18px;
        /* margin-right: 5px; */
        user-select: none;
        width: 53px;
        /* height: 40px; */
    }
    .page-list .page-item {
        border: 1px solid #aaa;
        padding: 6px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 5px;
        box-sizing: border-box;
        text-align: center;
        font-size: 14px;
    }
    .page-ellipsis {
        padding: 0 8px;
    }
    .input {
        width: 36px;
        height: 30px;
        font-size: 18px;
        border: 1px solid #aaa;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        text-align: center;
    }
    .page-list .jump-go-btn {
        font-size: 14px;
        height: 50px;
    }
    .page-select{
        border: 1px solid #aaa;
        padding: 5px 8px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 5px;
        margin-left: 5px;
    }
    .page-list  .disabled{


        color: #C0C0C0;
        cursor: not-allowed;

    }
    .page-list .page-current {
        cursor: default;
        color: #fff;
        background: #2d7bf4;
        border-color: #2d7bf4;
    }
    .total-content{
        margin-right:22px;
    }
    .jump-to{
        margin-left:19px;
        margin-right:11px;

    }
    .page-style{
        margin-left:11px;
        margin-right:11px;
    }
</style>
