<!-- 加载更多 -->
<template>
    <div>
        <!-- 列表 -->
        <div class="cont">
            <m-scroller :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData" :marginTop="marginTop">
                <ul>
                    <li v-for="(item,index) in listdata" :key="index">{{item.title}}</li>
                </ul>
            </m-scroller>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import mScroller from './mobilescroll'

    export default {
        components: {
            mScroller
        },
        data() {
            return {
                marginTop:'margin-top:0px;',
                pageStart: 1, // 开始页数
                pageEnd: 0, // 结束页数
                listdata: [], // 数据列表
                scrollData:{
                    noFlag: false //暂无更多数据显示
                }
            }
        },
        mounted: function() {
            // 首次请求数据
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.pageStart=1;
                axios.get('http://39.106.10.163:7001/shop/page',{params:{page:this.pageStart}}).then((response) => {
                    this.listdata = response.data;
                    // 获取总页数
                    this.pageEnd = 100;
                    // 还原
                    this.pageStart = 1;
                })
            },
            // 下拉刷新
            onRefresh(done) {
                this.fetchData();
                done(); // call done
            },
            // 上拉加载更多
            onInfinite(done) {
                this.pageStart++;
                // 加载条
                let more = this.$el.querySelector('.load-more');
                // 判断是否显示加载条
                if(this.pageStart > this.pageEnd){
                    //走完数据调用方法
                    this.scrollData.noFlag = true;
                }else{
                    let _this = this;
                    axios.get('http://39.106.10.163:7001/shop/page',{params:{page:this.pageStart}}).then((response) => {
                        _this.listdata = _this.listdata.concat(response.data);
                        // 获取总页数
                        _this.pageEnd = 200;
                    })
                }
                // 隐藏加载条
                more.style.display = 'none';
                done();
            }
        }
    }
</script>

<style lang="less" scoped>
    ul {
        li {
            min-height: 50px;
            line-height: 50px;
            text-align: center;
            border: 1px solid red;
        }
    }
    // 隐藏滚动条
    ::-webkit-scrollbar{
        display:none;
    }
</style>

