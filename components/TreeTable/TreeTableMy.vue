<template>
    <div class="tree-table">
        <div class="tree-head">
            <table>
                <tr>
                    <td class="td1">职位名称</td>
                    <td class="td2">负责人</td>
                    <td class="td3" @click="isDesc=!isDesc">
                        创建时间
                        <div class="arrow">
                            <span class="up-arrow" :class="{'sort':isDesc}"></span>
                            <span class="down-arrow" :class="{'sort':!isDesc}"></span>
                        </div>
                    </td>
                    <td class="td4">工作经验</td>
                    <td class="td5">发布时间</td>
                    <td class="td6">操作</td>
                </tr>
            </table>
        </div>
        <div id="scrollWrap" class="tree-wrap">
                <TreeItemMy
                    v-for="(model,i) in treeDataSource"
                    :key = "'root_node_'+i"
                    :root="0"
                    :num = "i"
                    @actionFunc="actionFunc"
                    @deleteFunc="deleteFunc"
                    @handlerExpand="handlerExpand"
                    :nodes="treeDataSource.length"
                    :trees.sync="treeDataSource"
                    :model.sync="model"
                >
                </TreeItemMy>
        </div>
    </div>
</template>

<script>
    import TreeItemMy from './TreeItemMy.vue'
    export default {
        name: "TreeTableMy",
        props:['list'],
        mounted(){
            this.$nextTick(()=>{
                this.initTreeData();
            })
        },
        data(){
            return{
                treeDataSource: [],
                isDesc:false, // 是否排序
            }
        },
        methods:{
            initTreeData(){
                console.log('处理前的数据为：',JSON.parse(JSON.stringify(this.list)));
                var tempData = JSON.parse(JSON.stringify(this.list));
                this.reduceDataFunc(tempData,1);
                console.log('处理后的数据为：',tempData);
                this.treeDataSource = tempData;
            },
            reduceDataFunc(data, level){
                data.map((m) => {
                    m.isExpand = false
                    m.children = m.children || [];
                    m.level = level;
                    m.bLeft = level == 1 ? 34 : (level-1)*16+34;
                    m.Experience = m.Experience || '无';
                    if(m.children.length>0){
                        this.reduceDataFunc(m.children,level+1)
                    }
                })
            },
            // 编辑
            actionFunc(m) {
                this.$emit('actionFunc', m)
            },
            // 删除
            deleteFunc(m) {
                this.$emit('deleteFunc', m)
            },
            // 展开
            handlerExpand(m) {
                console.log('table',m.isExpand)
                m.isExpand = !m.isExpand
                this.$emit('handlerExpand', m)
            }
        },
        components: {
            TreeItemMy
        },
        watch:{
            list: {
                handler(){
                    this.initTreeData()
                },
                deep:true
            }
        }
    }
</script>

<style scoped>
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    .tree-table{
        width: 100%;
        position: relative;
    }
    table{
        width: 100%;
        text-align: center;
        border-collapse: collapse;
        border-spacing: 0;
    }
    td{
        word-break: break-all;
        word-wrap: break-word;
        font-size: 12px;
    }
    th,td{
        font-weight: 400;
        text-align: left;
    }
    .td1 {width: 260px;height: 40px;line-height: 40px;text-align: left;padding-left: 30px;}
    .td2 {width: 100px;text-align: left;box-sizing: border-box;}
    .td3 {width: 120px;text-align: left;box-sizing: border-box;}
    .td4 {width: 220px;text-align: left;box-sizing: border-box;overflow: hidden;}
    .td5 {width: 100px;text-align: left;box-sizing: border-box;}
    .td6 {width: 140px;text-align: left;box-sizing: border-box;}
    .tree-wrap{
        top: 40px;
    }
    .tree-head td {
        color: rgba(0, 0, 0, 0.45);
        border-bottom: 2px solid #E8E8E8;
    }
    .tree-head .arrow {
        position: relative;
        display: inline-block;
        width: 16px;
        height: 16px;
        background-color: #fff;
    }
    .tree-head .arrow span {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        left: 0;
        border-style: solid;
        border-width: 4px;
    }
    .tree-head .arrow .up-arrow {
        top: 3px;
        border-color: transparent transparent #ddd transparent;
    }
    .tree-head .arrow .up-arrow.sort {
        border-bottom-color: #3C4454;
    }
    .tree-head .arrow .down-arrow {
        top: 12px;
        border-color: #ddd transparent transparent transparent;
    }
    .tree-head .arrow .down-arrow.sort {
        border-top-color: #3C4454;
    }
    .tree-wrap{
        overflow: hidden;
    }
</style>
