<template>
    <div
        @dragstart.stop="onDragstart"
        @dragenter.stop="onDragenter"
        @dragend.stop="onDragend"
        draggable="true"
        class="__drag_item"
    >
        <slot/>
    </div>
</template>

<script>
    import emit from './../../utils/emit'
    export default {
        name:'DrapItem',
        mixins:[emit],
        mounted(){
            this.dispatch('DragWrap','putChild',this.$el); // this.$el为当前组件实例对应的真实Dom。
            // 触发DragWrap这个组件上的putChild方法，参数是当前组件的真实Dom
        },
        methods:{
            onDragstart(){
                this.dispatch('DragWrap', 'dragstart', this.$el);
            },
            onDragenter(){
                this.dispatch('DragWrap', 'dragenter', this.$el);
            },
            onDragend(){
                this.dispatch('DragWrap', 'dragend');
            }
        }
    }
</script>
<style scoped>
    .__drag_item {
        animation: shake 0.3s;
    }
    @keyframes shake {
        0% {
            transform: translate3d(-10%, 0, 0);
        }
        50% {
            transform: translate3d(10%, 0, 0);
        }
        100% {
            transform: translate3d(0, 0, 0);
        }
    }
</style>
