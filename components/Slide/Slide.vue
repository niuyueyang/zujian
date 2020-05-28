<template>
    <div class="slider" ref="slider">
        <div class="process" :style="{width}" v-if="!range || typeof (range) == 'undefined'"></div>
        <div class="processRange1" :style="{width:width1}" v-if="range"></div>
        <div class="processRange2" :style="{width:width2}" v-if="range"></div>

        <div v-if="!range || typeof (range) == 'undefined'" class="thunk" ref="trunk" :style="{left}">
            <div class="block"></div>
            <div class="tips">
                <span>{{scale*100}}</span>
                <i class="fas fa-caret-down" ></i>
            </div>
        </div>
        <div v-if="range" class="thunk thunk1" ref="trunk1" :style="{'left':left1}">
            <div class="block"></div>
            <div class="tips">
                <span>{{per1}}</span>
                <i class="fas fa-caret-down" ></i>
            </div>
        </div>
        <div v-if="range" class="thunk thunk2" ref="trunk2" :style="{'left':left2}">
            <div class="block"></div>
            <div class="tips">
                <span>{{per2}}</span>
                <i class="fas fa-caret-down" ></i>
            </div>
        </div>
    </div>
</template>
<script>
    /*
    * min 进度条最小值
    * max 进度条最大值
    * v-model 对当前值进行双向绑定实时显示拖拽进度
    * */
    export default{
        name:'hSlider',
        props:['min','max','value','range'],
        data(){
            return{
                slider:null,        //滚动条DOM元素
                thunk:null,         //拖拽DOM元素
                per:this.value,     //当前值
                per1:this.value instanceof Array && this.value.length>1 && this.value[0] || 0,
                per2:this.value instanceof Array && this.value.length>1 && this.value[1] || 0,
                thunk1:null,
                thunk2:null
            }
        },
        //渲染到页面的时候
        mounted () {
            this.slider = this.$refs.slider;
            this.thunk = this.$refs.trunk;
            this.thunk1 = this.$refs.trunk1;
            this.thunk2 = this.$refs.trunk2;
            var _this = this;
            if(this.thunk){
                this.thunk.onmousedown = function (e) {
                    var width = parseInt(_this.width);
                    var disX = e.clientX;
                    document.onmousemove = function(e){
                        // value, left, width
                        // 当value变化的时候，会通过计算属性修改left，width

                        // 拖拽的时候获取的新width
                        var newWidth = e.clientX - disX + width;
                        // 拖拽的时候得到新的百分比
                        var scale = newWidth / _this.slider.offsetWidth;
                        _this.per = Math.ceil((_this.max - _this.min) * scale + _this.min);
                        _this.per = Math.max(_this.per,_this.min); // 左侧限制
                        _this.per = Math.min(_this.per,_this.max); // 右侧限制
                        _this.$emit('on-change',_this.per)
                    }
                    document.onmouseup = function(){
                        document.onmousemove = document.onmouseup = null;
                    }
                    return false;
                }
            }
            if(this.thunk1){
                this.thunk1.onmousedown = function (e) {
                    var width = parseInt(_this.width1);
                    var disX = e.clientX;
                    document.onmousemove = function(e){
                        // value, left, width
                        // 当value变化的时候，会通过计算属性修改left，width

                        // 拖拽的时候获取的新width
                        var newWidth = e.clientX - disX + width;
                        // 拖拽的时候得到新的百分比
                        var scale = newWidth / _this.slider.offsetWidth;

                        _this.per1 = Math.ceil((_this.max - _this.min) * scale + _this.min);
                        _this.per1 = Math.max(_this.per1,_this.min); // 左侧限制
                        _this.per1 = Math.min(_this.per1,_this.max); // 右侧限制
                        _this.$emit('on-change',[_this.per1,_this.per2])
                    }
                    document.onmouseup = function(){
                        document.onmousemove = document.onmouseup = null;
                    }
                    return false;
                }
            }
            if(this.thunk2){
                this.thunk2.onmousedown = function (e) {
                    var width = parseInt(_this.width2);
                    var disX = e.clientX;
                    document.onmousemove = function(e){
                        // value, left, width
                        // 当value变化的时候，会通过计算属性修改left，width

                        // 拖拽的时候获取的新width
                        var newWidth = e.clientX - disX + width;
                        // 拖拽的时候得到新的百分比
                        var scale = newWidth / _this.slider.offsetWidth;

                        _this.per2 = Math.ceil((_this.max - _this.min) * scale + _this.min);
                        _this.per2 = Math.max(_this.per2,_this.min); // 左侧限制
                        _this.per2 = Math.min(_this.per2,_this.max); // 右侧限制
                        _this.$emit('on-change',[_this.per1,_this.per2])
                    }
                    document.onmouseup = function(){
                        document.onmousemove = document.onmouseup = null;
                    }
                    return false;
                }
            }

        },
        computed:{
            // 设置一个百分比，提供计算slider进度宽度和trunk的left值
            // 对应公式为 当前值-最小值/最大值-最小值 = slider进度width / slider总width
            // trunk left = slider进度width + trunk宽度/2
            scale(){
                return this.per / this.max ;
            },
            scale1(){
                return this.per1 / this.max ;
            },
            scale2(){
                return this.per2 / this.max ;
            },
            width(){
                if(this.slider){
                    return this.slider.offsetWidth * this.scale + 'px'; // 进度条长度
                }else{
                    return 0 + 'px'
                }
            },
            width1(){
                if(this.slider){
                    return this.slider.offsetWidth * this.scale1 + 'px'; // 进度条长度
                }else{
                    return 0 + 'px'
                }
            },
            width2(){
                if(this.slider){
                    return this.slider.offsetWidth * this.scale2 + 'px'; // 进度条长度
                }else{
                    return 0 + 'px'
                }
            },
            left(){
                if(this.slider){
                    return this.slider.offsetWidth * this.scale - this.thunk.offsetWidth/2 + 'px';
                }else{
                    return 0 + 'px'
                }
            },
            left1(){
                if(this.slider){
                    return this.slider.offsetWidth * this.scale1 - this.thunk1.offsetWidth/2 + 'px';
                }else{
                    return 0 + 'px'
                }
            },
            left2(){
                if(this.slider){
                    return this.slider.offsetWidth * this.scale2 - this.thunk2.offsetWidth/2 + 'px';
                }else{
                    return 0 + 'px'
                }
            }
        },
    }
</script>
<style>
    .slider{
        position:relative;
        margin:20px 0;
        width:400px;
        height:10px;
        background:#e4e7ed;
        border-radius:5px;
        cursor:pointer;
    }
    .slider .process{
        position:absolute;
        left:0;
        top:0;
        width:112px;
        height:10px;
        border-radius:5px;
        background:#409eff;
    }
    .slider .processRange1{
        position:absolute;
        left:0;
        top:0;
        width:112px;
        height:10px;
        border-radius:5px;
        background:#e4e7ed;
        z-index: 11;
    }
    .slider .processRange2{
        position:absolute;
        left:0;
        top:0;
        width:112px;
        height:10px;
        border-radius:5px;
        background:#409eff;
        z-index: 10;
    }
    .slider .thunk{
        position:absolute;
        left:0px;
        top:-7px;
        width:20px;
        height:20px;
        z-index: 12;
    }
    .slider .block{
        width:20px;
        height:20px;
        border-radius:50%;
        border:2px solid #409eff;
        background:rgba(255,255,255,1);
        transition:.2s all;
    }
    .slider .tips{
        position:absolute;
        left:-7px;
        bottom:30px;
        min-width:15px;
        text-align:center;
        padding:4px 8px;
        background:#000;
        border-radius:5px;
        height:24px;
        color:#fff;
    }
    .slider .tips i{
        position:absolute;
        margin-left:-5px;
        left:50%;
        bottom:-9px;
        font-size:16px;
        color:#000;
    }
    .slider .block:hover{
        transform:scale(1.1);
        opacity:.6;
    }
</style>
