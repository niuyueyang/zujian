<template>
    <div>
        <TreeNode
                v-for="(item, index) in cloneData"
                :key="index"
                :data="item"
                :show-checkbox="showCheckbox"
        ></TreeNode>
    </div>
</template>

<script>
    import TreeNode from './TreeNode.vue';
    import { deepCopy } from './../../utils/assist';
    /*
   * 定义了组件的入口，即组件的 API；
      对接收的数据 props：data 初步处理，为了在 tree.vue 中不破坏使用者传递的源数据 data，所以会克隆一份数据（cloneData）。*/
    export default {
        name: "Tree",
        props: {
            data: {
                type: Array,
                default () {
                    return [];
                }
            },
            showCheckbox: {
                type: Boolean,
                default: false
            }
        },
        provide(){
            return{
                tree: this
            }
        },
        data () {
            return {
                cloneData: []
            }
        },
        created () {
            this.rebuildData();
        },
        watch: {
            data () {
                this.rebuildData();
            }
        },
        methods: {
            rebuildData () {
                this.cloneData = deepCopy(this.data);
            },
            emitEvent (eventName, data) {
                this.$emit(eventName, data, this.cloneData);
            }
        },
        components:{
            TreeNode
        }
    }
</script>

<style scoped>

</style>
