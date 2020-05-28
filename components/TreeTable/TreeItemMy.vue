<template>
    <div class="tree-body" :class="tdClass">
        <span class="before-line" v-if="root!=0 && nodes!=1" ></span>
        <table>
            <tr class="leve">
                <td class="td1">
                    <div class="td-title" :style="{'paddingLeft':model.bLeft+'px'}" @click="handlerExpand(model)">
                        <span
                                v-if="model.children.length > 0"
                                :class="{'tree-open':model.isExpand,'tree-close':!model.isExpand}"
                        >
                        </span>
                        <a class="ellipsis">
                            <i class="t-icon m-dep"></i>
                            <span :title="model.ObjectName">{{model.ObjectName}}</span>
                        </a>
                    </div>
                </td>
                <td class="td2">
                    {{model.ResponsibleName}}
                </td>
                <td class="td3">{{model.CreateTime|formatDate}}</td>
                <td class="td4">
                    {{model.Experience}}
                </td>
                <td class="td5">{{model.BelongTo}}天</td>
                <td class="td6">
                    <a class="reset" href="javascript:;" @click="actionFunc(model)">编辑</a>
                    <i class="line"></i>
                    <a class="delete" href="javascript:;" @click="deleteFunc(model)">删除</a>
                </td>
            </tr>
        </table>
        <div v-show="model.isExpand" class="other-node">
            <TreeItemMy
                    v-for="(m, i) in model.children"
                    :key="String('child_node'+i)"
                    :num='i'
                    :root="1"
                    @actionFunc="actionFunc"
                    @deleteFunc="deleteFunc"
                    @handlerExpand="handlerExpand"
                    :nodes.sync='model.children.length'
                    :trees.sync='trees'
                    :model.sync="m">
            </TreeItemMy>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TreeItemMy",
        props: ['model', 'num', 'nodes', 'root', 'trees'],
        computed:{
            tdClass() {
                return this.root === 0 ? 'td-border' : 'not-border'
            }
        },
        filters: {
            formatDate: function(date) {
                // 后期自己格式化
                return date //Utility.formatDate(date, 'yyyy/MM/dd')
            }
        },
        methods:{
            handlerExpand(m) {
                this.$emit('handlerExpand', m)
            },
            deleteFunc(m) {
                this.$emit('deleteFunc', m)
                // this.getParentNode(m)
                // console.log(this.parentNodeModel)
                // if (this.parentNodeModel.hasOwnProperty('children')) {
                // 	console.log('父级是跟节点', this.parentNodeModel)
                // 	this.parentNodeModel.children.splice(this.parentNodeModel.children.indexOf(m), 1)
                // } else if (this.parentNodeModel instanceof Array) {
                // 	console.log('跟节点', this.parentNodeModel)
                // 	this.parentNodeModel.splice(this.parentNodeModel.indexOf(m), 1)
                // }
            },
            actionFunc(m) {
                this.$emit('actionFunc', m)
            }
        }
    }
</script>

<style scoped lang="less">
    *{
        box-sizing: border-box;
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
    .tree-body{
        width: 100%;
        height: auto;
    }
    .td1 {width: 260px;height: 40px;line-height: 40px;text-align: left;padding-left: 30px;}
    .td2 {width: 100px;text-align: left;}
    .td3 {width: 120px;text-align: left;}
    .td4 {width: 220px;text-align: left;}
    .td5 {width: 100px;text-align: left;}
    .td6 {width: 140px;text-align: left;}
    .tree-open,.tree-close{
        position: absolute;
        width: 0;
        height: 0;
        border-color: #999;
        border-style: solid;
        cursor: pointer;
        border-width:5px;
        z-index: 2;
    }
    .tree-close{
        left: -12px;
        top: 11px;
        border-color: transparent transparent transparent #AAAAAA;
    }
    .tree-open{
        left: -17px;
        top: 14px;
        border-color: #AAAAAA transparent transparent;
    }
    .td-title{
        position: relative;
        height: 40px;
        line-height: 40px;
    }

    .t-icon{
        display: inline-block;
        width: 14px;
        height: 18px;
        background-size: 100% 100% !important;
        vertical-align: middle;
        margin: -3px 4px 0 0;
        &.m-dep {
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAASCAYAAABrXO8xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDZEQUMxRDA0Q0U1MTFFODlGQkJCODYxMDNDRkIzQUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDZEQUMxRDE0Q0U1MTFFODlGQkJCODYxMDNDRkIzQUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNkRBQzFDRTRDRTUxMUU4OUZCQkI4NjEwM0NGQjNBQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNkRBQzFDRjRDRTUxMUU4OUZCQkI4NjEwM0NGQjNBQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj8y8UsAAAIjSURBVHjanJPPa9RQEMe/85Jss7v9RVO0UtqDVbR2FbEXEQQP3qTgyX9AEG89KagHRfDi3yAIvfai3qRYUbH0sNJakUV6KOyWLii2btNkNz9enpPEddkfVPALj8mbzGdm3ryElFLwtu4qqjVsre6VKVKboj/3GX2Zj5DqG4jK6NSZp9CTh9FhqCPRQOgFM/hhz1B177puahC5LKD4PQmXE+xDGHNsizEiErAhAddPd1PjXCiC3LMZIF7si2QOMhyDkg+bRVMwScsKI8BvgOKtECnYrq0OsENaDFArYQ/1BJNwats19der41+SDWZ5kRGHMxgd0mqzZHTAsSZgXgaMSfbL9cMrCoaUA2TGGbjBOXji6jRPf3NekfGMuiryxwCdc2W4LVVj6BJDv3ja5dTS0QIiZ7C7VUNLbY2raSJujZf4MxMzOS8Fy9V2ML4CQ0e0tAERBDCs4xz4hv3bUJn4RByvLbMdybWDcVIvYIdEZmQY6BdQuyuo6BdBUQFfdqZRP+B2R323q1UV01kdZPpQZoBbb2/j0QoPZsdDsWTj2MJVfK8MhT2uQ4PulbjF13hRvIIgP42Tzie8Kq1D16qYPzuEO+/ODbaug1Ch0J8gkvAvPF8jZ99YfLlamLA8DCCLpdCErOcxa7nQAmrdIwljklR4X6mfT5z8qaqj9117fHPqQc3era9+Lbn3Tmyct6zq3Nr27PuyO/YhYeIf+X/0W4ABAGLgy0VZgovSAAAAAElFTkSuQmCC) no-repeat;
        }
    }
    .ellipsis{
        padding-left: 20px;
    }

    .not-border {
        .td-title {
            box-sizing: border-box;
            &::before{
                content: '';
                position: absolute;
                width: 1px;
                height: 40px;
                background-color: #E8E8E8;
                border: none;
                left: 20px;
                top: -20px;
                z-index: 1;
            }
            &::after {
                content: '';
                left: 20px;
                position: absolute;
                right: auto;
                background-color: #E8E8E8;
                height: 1px;
                top: 19px;
                width: 16px;
                z-index: 1;
            }
        }
    }

</style>
