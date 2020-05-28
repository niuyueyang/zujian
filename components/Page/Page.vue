<template>
    <div>
        <div class="page-helper" v-if="showPageHelper">
            <div class="page-list">
                <!--totalCount/12根据自己每页显示的条数 -->
                <span class="total-content">共{{Math.ceil(totalCount/12)}}页</span>


                <span class="page-item" :class="{'disabled': currentPage == 1}"  @click="prevPage">上一页</span>

                <span class="page-item" v-for="num in groupList" :class="{'page-current':currentPage===num}" :key="num"
                      @click="jumpPage(num)">{{num}}
                </span>

                <span class="page-item" :class="{'disabled': currentPage == totalPage}" @click="nextPage">下一页</span>
                <span class="ml20 jump-to">跳至</span>
                <input class="page-jump-to input" type="type" v-model="jumpPageNumber">
                <span class="page-style">页</span>
                <span class="page-item jump-go-btn" @click="goPage(jumpPageNumber)" >确定</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Page',
        data () {
            return {
                ddd:this.pageNumber,
                currentPage: this.pageNumber,
                currentSize: this.pageSizeArray[0],
                jumpPageNumber: 1,
                showPrevMore: false,
                showNextMore: false
            }
        },
        //   获取父组件传入的数据
        props: {
            pageNumber: {   //当前页面
                type: Number,
                default: 1
            },
            pageSizeArray: {   //每页显示数量
                type: Array,//Array
                default () {
                    return [1]
                }
            },
            totalCount: {   //总条数
                type: Number,
                default: 150
            },
            pageGroup: {   //连续页码个数
                type: Number,
                default: 5
            }
        },
        computed: {
            showPageHelper () {
                return this.totalCount > 0
            },
            totalPage () {   //总页数
                return Math.ceil(this.totalCount / this.currentSize);
            },
            groupList () {  //获取分页码
                const groupArray = []
                const totalPage = this.totalPage//总页码
                const pageGroup = this.pageGroup//显示每页个数
                const _offset = (pageGroup - 1) / 2
                let current = this.currentPage
                let self = this;
                const offset = {
                    start: current - _offset,
                    end: current + _offset
                }
                if (offset.start < 1) {
                    offset.end = offset.end + (1 - offset.start)
                    offset.start = 1
                }
                if (offset.end > totalPage) {
                    offset.start = offset.start - (offset.end - totalPage)
                    offset.end = totalPage
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
        methods: {
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
            showPrevPage() {
                this.currentPage = this.currentPage - this.pageGroup > 0 ? this.currentPage - this.pageGroup : 1
            },
            showNextPage() {
                this.currentPage = this.currentPage + this.pageGroup < this.totalPage ? this.currentPage + this.pageGroup : this.totalPage
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
        },
        watch: {
            currentSize (newValue, oldValue) {
                if(newValue !== oldValue){
                    if(this.currentPage >= this.totalPage){ //当前页面大于总页面数
                        this.currentPage = this.totalPage
                    }
                    this.$emit('jumpPage', {currentPage: this.currentPage, currentSize: this.currentSize})
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
        padding: 10px 10px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 5px;
    }
    .page-ellipsis {
        padding: 0 8px;
    }
    .input {
        width: 36px;
        height: 46px;
        font-size: 18px;
        border: 1px solid #aaa;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        text-align: center;
    }
    .page-list .jump-go-btn {
        font-size: 18px;
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
        background: #D0121B;
        border-color: #D0121B;
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
