<!--suppress ALL -->
<!--<template>
    <div class="overall">
        <div
             class="box"
             ref="box"
        >
            <div
                class="dot"
                ref="dot"
            >
            </div>
            <div class="line" ref="line"></div>
        </div>
        <span class="title">{{plan}}%</span>
    </div>
</template>

<script>
    export default {
        name:'hSlider',
        data() {
            return {
                plan:0, //进度滑块
                initStart:0
            };
        },
        props:['value','max'],
        mounted(){
            this.init();
            this.getZoom('box','dot')
        },
        methods: {
            init(){
                var widthWrap = this.$refs['box'].offsetWidth;
                this.$refs.line.style.width = parseInt((this.value/this.max)*widthWrap)+'px';
                this.initStart = parseInt((this.value/this.max)*widthWrap);
                this.$refs.dot.style.left = this.initStart+'px'
                this.plan = ((this.value / this.max)*100).toFixed(0)
            },
            getZoom(d1, d2) {
                var _this = this
                var oDiv1 = this.$refs[d1];
                var oDiv2 = this.$refs[d2];
                oDiv2.onmousedown = function(ev) {
                    ev.preventDefault();
                    //鼠标按下位置
                    var oEvent = ev || event;
                    var disX = oEvent.clientX ;

                    document.onmousemove = function(ev) {
                        var oEvent = ev || event;
                        var l = oEvent.clientX - disX;
                        var newWidth = _this.initStart +l;
                        if (l < 0) {
                            l = 0;
                        }
                        if (l > oDiv1.offsetWidth - oDiv2.offsetWidth) {
                            l = oDiv1.offsetWidth - oDiv2.offsetWidth;
                        }
                        if(_this.initStart +l > oDiv1.offsetWidth){
                            newWidth  = oDiv1.offsetWidth
                        }
                        console.log(l-5,newWidth)
                        _this.$refs.line.style.width = newWidth+'px'
                        _this.plan = (((l-5)/oDiv1.offsetWidth+(_this.value / _this.max))*100).toFixed(0)
                        oDiv2.style.left = l +10 + "px"; //l范围：[0,580]
                    };
                    document.onmouseup = function() {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            },
        }
    };
</script>

<style lang="less" scoped>
    .overall {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .box {
        width: 400px;
        height: 7px;
        box-shadow: 0 0 5px #ccc;
        background-color: #cccccc;
        position: relative;
        border-radius: 7px;

    }
    .dot {
        width: 20px;
        height: 20px;
        background: #37b383;
        cursor: pointer;
        position: absolute;
        top: -7px;
        border-radius: 50%;
        z-index: 1;
    }
    .line{
        width:0px;
        height: 7px;
        border-radius: 7px;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #2d7bf4;
        z-index: 0;
    }
    .title{
        font-weight: bold;
        width: 100px;
        height: 30px;
        position: absolute;
        left: calc(50% - 50px);
        top: calc(50% - 50px);

    }
</style>-->
<template>
    <div class="slider" ref="slider">
        <div class="processRange1" :style="{width1}" v-if="range"></div>
        <div class="processRange2" :style="{width1}" v-if="range"></div>
        <div class="process" :style="{width}" v-if="!range || typeof (range) == 'undefined'"></div>


        <div v-if="!range || typeof (range) == 'undefined'" class="thunk" ref="trunk" :style="{left}">
            <div class="block"></div>
            <div class="tips">
                <span>{{per}}</span>
                <i class="fas fa-caret-down" ></i>
            </div>
        </div>
        <div v-if="range" class="thunk" ref="trunk1" :style="{left1}">
            <div class="block"></div>
            <div class="tips">
                <span>{{per1}}</span>
                <i class="fas fa-caret-down" ></i>
            </div>
        </div>
        <div v-if="range" class="thunk" ref="trunk2" :style="{left2}">
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
                slider:null,  //滚动条DOM元素
                thunk:null,   //拖拽DOM元素
                per:this.value,  //当前值
                per1:this.value[0],
                per2:this.value[1],
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
                }
                document.onmouseup = function(){
                    document.onmousemove = document.onmouseup = null;
                }
                return false;
            }
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
                }
                document.onmouseup = function(){
                    document.onmousemove = document.onmouseup = null;
                }
                return false;
            }
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

                    _this.per1 = Math.ceil((_this.max - _this.min) * scale + _this.min);
                    _this.per1 = Math.max(_this.per1,_this.min); // 左侧限制
                    _this.per1 = Math.min(_this.per1,_this.max); // 右侧限制
                }
                document.onmouseup = function(){
                    document.onmousemove = document.onmouseup = null;
                }
                return false;
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
            }
        },
    }
</script>
<style>
    .box{margin:100px auto 0;width:80%}
    .clear:after{content:'';display:block;clear:both}
    .slider{position:relative;margin:20px 0;width:400px;height:10px;background:#e4e7ed;border-radius:5px;cursor:pointer}
    .slider .process{
        position:absolute;
        left:0;
        top:0;
        width:112px;
        height:10px;
        border-radius:5px;
        background:#409eff;
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
    }
    .slider .processRange2{
        position:absolute;
        left:0;
        top:0;
        width:112px;
        height:10px;
        border-radius:5px;
        background:#409eff;
    }
    .slider .block{
        width:20px;
        height:20px;
        border-radius:50%;
        border:2px solid #409eff;
        background:rgba(255,255,255,1);
        transition:.2s all
    }
    .slider .tips{position:absolute;left:-7px;bottom:30px;min-width:15px;text-align:center;padding:4px 8px;background:#000;border-radius:5px;height:24px;color:#fff}
    .slider .tips i{position:absolute;margin-left:-5px;left:50%;bottom:-9px;font-size:16px;color:#000}
    .slider .block:hover{transform:scale(1.1);opacity:.6}
</style>
