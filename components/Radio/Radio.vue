<template>
    <div class="hRadioWrap" :class="[{hRadioWrapDisable:disabled},{hRadioWrapCheck:checkedMy}]" @click="checkRadio">
        <div  :class="['hRadioCheck',{hRadioCheckActive:isDisable==true}]"></div>
        <span v-if="label && !$slots.default">{{label}}</span>
        <span v-else-if="label && $slots.default"><slot></slot></span>
        <span v-else><slot></slot></span>
    </div>
</template>

<script>
    import emit from './../../utils/emit'
    export default {
        name: "Radio",
        mixins:[emit],
        props:{
            disabled:Boolean,
            value:[String,Boolean,Number],
            label:[String,Boolean,Number],
            checked:[Boolean]
        },
        data(){
            return{
                checkedMy:false,
                isDisable:false
            }
        },
        methods:{
            singleCheck(){
                if(this.checked && this.disabled){
                    this.isDisable = true;
                }
                else if(this.checked){
                    this.checkedMy = true;
                }
            },
            initCheck(){
                if(this.$parent.$data.rootValue==this.value && !this.disabled){
                    this.checkedMy = true;
                }
                if(this.$parent.$data.rootValue==this.value && this.disabled){
                    this.isDisable = true;
                }
            },

            checkRadio(){
                this.checkedMy = false;
                if(!this.disabled){
                    if(this.$parent.$children.length>0){
                        var childs = this.$parent.$children;
                        for(let i =0; i<childs.length;i++){
                            childs[i].$data['checkedMy'] = false;
                            childs[i].$data['isDisable'] = false;
                        }
                    }
                    this.checkedMy = !this.checkedMy;
                    this.dispatch('RadioGroup', 'check', this.value)
                }
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.initCheck();
                this.singleCheck();
            })

        }
    }
</script>

<style scoped>
    @import "//at.alicdn.com/t/font_1536357_ga2thqgaupa.css";
    .hRadioWrap{
        float: left;
        margin-right: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .hRadioCheck{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 1px solid #dcdee2;
        background-color: #fff;
        position: relative;
        float: left;
        margin-right: 5px;
        margin-top: 1px;
        cursor: pointer;
        transition: all .2s linear;
    }
    .hRadioCheck::after{
        content:'';
        width: 0px;
        height: 0px;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        border-radius: 50%;
        transition: all .2s linear;
    }
    .hRadioWrapDisable .hRadioCheck{
        border-color: #dcdee2;
        background-color: #f3f3f3;
        cursor: not-allowed;
    }
    .hRadioWrapDisable .hRadioCheck::after{
        background-color: #ccc;
        cursor: not-allowed;
        width: 0;
        height: 0;
    }
    .hRadioWrapDisable .hRadioCheckActive{
        position: relative;
    }
    .hRadioWrapDisable .hRadioCheckActive::after{
        background-color: #ccc;
        cursor: not-allowed;
        width: 7px;
        height: 7px;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .hRadioWrapCheck .hRadioCheck{
        border: 1px solid #2d7bf4;
    }
    .hRadioWrapCheck .hRadioCheck::after{
        background-color: #2d7bf4;
        width: 7px;
        height: 7px;
    }
</style>
