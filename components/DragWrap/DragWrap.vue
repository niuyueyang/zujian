<template>
    <div>
        <div ref="wrap" @dragenter.prevent @dragover.prevent>
            <slot/>
        </div>
    </div>
</template>
<script>
    import emit from './../../utils/emit'
    export default {
        name:'DragWrap',
        mixins:[emit],
        props:{
            data:{
                type: Array,
                default(){
                    return []
                }
            }
        },
        /*
        * @desc
        * this.$on一定要比this.$emit先执行，因为要先注册才能被触发吧，
        * 不然哪来事件触发了。还有就是父子组件的钩子执行顺序，
        * mounted是子组件先执行，created是父组件先执行。
        * */
        created(){
            this.toDom = ''; // 拖拽时进入的元素
            this.fromDom = ''; // 拖拽时离开的元素
            this.children = []; // 存放所有子组件元素的集合
            this.$on('dragstart', this.onDragStart);
            this.$on('dragenter', this.onDragEnter);
            this.$on('dragend', this.onDragEnd);
            this.$on('putChild', child => {
                this.children.push(child);
            })
        },
        methods:{
            onDragStart(el){
                this.fromDom = el;
            },

            /*
            * @desc
            * 开始拖拽使用insertBefore交换它们的位置即可。
            * 不过这里有个注意点就是要知道当前拖拽元素是往前拖动还是往后拖动，
            * 所以我们在DragWrap组件内添加以下代码
            * */
            onDragEnter(el){
                this.toDom = el;
                if(this.fromDom == this.toDom){
                    return;
                }
                // 判断进入节点是否在起始节点的前面
                if(this.isPrevNode(this.fromDom, this.toDom)) {
                    this.$refs["wrap"].insertBefore(this.fromDom, this.toDom);
                    // 将起始节点插入到进入节点的前面
                } else {  // 否则就是在之后
                    this.$refs["wrap"].insertBefore(this.fromDom, this.toDom.nextSibling);
                    // 将起始节点插入到进入节点下一个兄弟节点的前面
                }
            },
            onDragEnd(){
                if(!this.data.length) return;
                const oldDom = [...this.$refs["wrap"].children].filter(child => {
                    return child.classList.contains('__drag_item')
                })
                this.getDataOrder(oldDom, this.children);
            },
            // 对比两颗dom树
            getDataOrder(newList,oldList){
                // const order = realList.map(realItem => {  // 拿到打乱Dom树对应的序号
                //     return dragAfterList.findIndex(dragItem => realItem === dragItem);
                // });
                // const newData = [];
                // order.forEach((item, i) => {  // 将原数组的数据按照打乱的序号赋值给新数组
                //     newData[i] = this.data[item];
                // });
                this.$emit("watchData", {
                    newDom:newList,
                    oldDom:oldList
                });
            },
            // to是否在from的前面
            isPrevNode(from, to){
                while(from.previousSibling !== null){
                    if(from.previousSibling == to){
                        return true
                    }
                    from = from.previousSibling;
                }
            }
        }
    }
</script>
