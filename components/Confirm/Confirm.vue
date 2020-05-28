<template>
    <transition name="confirm-fade" v-on:after-leave="close" appear>
        <div>
            <div class="confirmBanner" @click="closeModal" v-show="state"></div>
            <div class="confirmWrap" v-show="state" id="confirmWrap">
                <div class="confirmTitle">{{typeof obj.title == 'undefined' ? '标题' : obj.title}}</div>
                <div class="confirmContent">{{typeof obj.content == 'undefined' ? '内容' : obj.content}}</div>
                <div class="confirmBtn">
                    <button type="button" class="confirmOk" @click="fnOk">{{typeof obj.confirmButtonText == 'undefined' ? '确定' : obj.confirmButtonText}}</button>
                    <button type="button" class="confirmCancel" @click="cancel">{{typeof obj.cancelButtonText == 'undefined' ? '取消' : obj.cancelButtonText}}</button>
                </div>
            </div>
        </div>

    </transition>
</template>

<script>
    import { clickoutside } from "./../../directive";
    export default {
        name: "Confirm",
        directives: { clickoutside },
        props:{
            content: String,
            title: String,
            obj: Object,
        },
        data(){
          return{
              state: true
          }
        },
        mounted(){
        },
        methods:{
            hide(){
              this.state = false;
            },
            close() {
                if (!this.state) {
                    this.$emit("onClose");
                }
            },
            cancel(){
                this.obj.onCancel()
                this.hide();
                this.close();
            },
            closeModal(){
                this.hide();
                this.close();
            },
            fnOk(){
                this.obj.onOk();
                this.hide();
                this.close();
            }
        }
    }
</script>

<style scoped>
    .confirmBanner{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .4);
    }
    .confirmWrap{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: inline-block;
        width: 420px;
        padding-bottom: 10px;
        vertical-align: middle;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #ebeef5;
        font-size: 18px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        text-align: left;
        overflow: hidden;
        backface-visibility: hidden;
    }
    .confirm-fade-enter-active,.confirm-fade-leave-active{
        transition: all .2s ease;
        transform-origin: center top;
    }
    .confirm-fade-enter,.confirm-fade-leave-to{
        opacity: 0;
    }
    .confirmTitle{
        margin-bottom: 0;
        font-size: 18px;
        line-height: 1;
        color: #303133;
        padding: 15px 15px 10px
    }
    .confirmContent{
        padding: 10px 15px;
        color: #606266;
        font-size: 14px;
    }
    .confirmBtn{
        padding: 5px 15px 0;
        text-align: right;
    }
    .confirmOk{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        padding: 9px 15px;
        font-size: 12px;
        border-radius: 3px;
        color: #fff;
        background-color: #409eff;
        border: 1px solid #409eff;
        margin-right: 10px;
    }
    .confirmOk:hover{
        background-color: #5eaaf8;
    }
    .confirmCancel{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        padding: 9px 15px;
        font-size: 12px;
        border-radius: 3px;
        background-color: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
    }
    .confirmCancel:hover{
        color: #5d8ff4;
        background-color: #d7e7ff;
        border: 1px solid #99b5f6;
    }
</style>
