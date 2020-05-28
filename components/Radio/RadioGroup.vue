<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    import emit from './../../utils/emit'
    export default {
        name: "RadioGroup",
        props:['value'],
        provide(){
            return{
                rootRadio:this
            }
        },
        data(){
            return {
                rootValue:this.value
            }
        },
        mixins:[emit],
        mounted(){
            this.$on('check',val=>{
                console.log(val)
                this.$emit('input',val)
            })
        }
    }
</script>

<style scoped>
    @import "//at.alicdn.com/t/font_1536357_ga2thqgaupa.css";
</style>
