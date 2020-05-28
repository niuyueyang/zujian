<template>
    <div class="hMenu">
        <slot></slot>
    </div>
</template>

<script>
    import emit from './../../utils/emit'
    export default {
        name: "hMenu",
        mixins:[emit],
        provide(){
            return{
                rootMenu: this
            }
        },
        mounted(){
            this.$on('on-clear', val => {
                var slots = this.$slots.default
                console.log(slots)
            })
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        list-style: none;
        box-sizing: border-box;
    }
    .hMenu{
        width: 200px;
        height: 100vh;
        overflow-y: auto;
        background-color: #3d3d3d;
        color: #fff;
        font-size: 16px;
    }
</style>
