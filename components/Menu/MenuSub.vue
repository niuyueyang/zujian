<template>
    <div ref="sub">
        <div class="title" :class="className" @click="fnOpenMenu(Math.floor(Math.random() * 10000))">
            <span>{{name}}</span>
            <i class="icon iconfont icon-xiangxiajiantou" :class="[{'bottom':showMenu}]"></i>
        </div>
        <transition-group name="fade-up" tag="div">
            <ul  v-show="showMenu" v-bind:key="Math.floor(Math.random() * 10000)">
                <slot></slot>
            </ul>
        </transition-group>
    </div>
</template>

<script>
    import emit from './../../utils/emit'
    export default {
        name: "MenuSub",
        provide(){
          return {
              rootSub: this
          }
        },
        props:['name','className'],
        mixins:[emit],
        inject:['rootMenu'],
        data(){
            return{
                showMenu:false,
                itemFlag:Math.floor(Math.random() * 10000)
            }
        },
        mounted(){
            this.$on('on-menuclose', val =>{
                // var subChilds = this.rootMenu.$children;
                // for(let i = 0;i<subChilds.length; i++){
                //     if(this.itemFlag != subChilds[i].$data.itemFlag){
                //         subChilds[i].$data.showMenu = false
                //     }
                // }
                // var childs = this.$parent.$children;
                // console.log(this.$refs.sub)
                // if(childs.length > 0){
                //     for(let i = 0;i < childs.length; i++){
                //         var item = childs[i].$data
                //         if(val.$parent.$data.itemFlag != item.itemFlag && typeof(item.showMenu)!='undefined'){
                //             this.showMenu = false;
                //         }
                //     }
                // }
                // console.log(childs)
            })
        },
        methods:{
            /*
            * @desc 打开菜单
            * */
            fnOpenMenu(){
                var subChilds = this.rootMenu.$children;
                for(let i = 0;i<subChilds.length; i++){
                    if(typeof (this.$parent.$parent.$data.itemFlag) == 'undefined' && this.itemFlag != subChilds[i].$data.itemFlag){
                        subChilds[i].$data.showMenu = false
                    }
                }

                this.showMenu = !this.showMenu;
            }
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

    @font-face {font-family: "iconfont";
        src: url('//at.alicdn.com/t/font_1536357_por1pk7tqfk.eot?t=1575882007924'); /* IE9 */
        src: url('//at.alicdn.com/t/font_1536357_por1pk7tqfk.eot?t=1575882007924#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMkAAsAAAAABxQAAALWAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqBcIF0ATYCJAMMCwgABCAFhG0HQRtFBhEVlKFkH4txrIgvSBqJmeB5snv/3J1ZREKXL7uC2cHoQu0voTLo3tamHduoCMWSnAff5X/kJxAuhI7/uZzeXSU+P1Auaw6ag3oBxgEFtDeuJVwgCXrD2FVLeci7IYA38eQiAwaNmICDBg8SQFYsXTwXJ+dCo/Wog2DVzNTIcUwc44BRDhwLvy9/KRYHDEwFHjlm0cAF9PmR8WOs2u7ZzgyBwJ7PAOjzQAG5gAaZVWuagopDuSi8XYH2MsFCIxhzeT0eCFmewCJ/eGAgIBY43heATBQ24EcGY6XisZBz1zspACzABvoBK8Gy0LFnNcPF11eCZLWci4hYfG7H7YOhCxadfX7zctjCM9ciIjbV109oaJjY1DS5sXE9FUyKGFlGxdumbW+oaTjUVNe0o7G28WB9dT0hj+hbUtxrWEXq67SKhOyYHLfwtaooG3X7ybckEp7kv9LdXeoVUXR3c7/q6tavYKuuLp8rPW8q11U3AV0wUGma2nYwN2m0OzppCg24iaOnJEIkMSfRTRqdyxxwX7XSmAieD+qJKvjlv2HogI9FswN6dDg+GoDW0PyI0OH5oOkXCw4G9Gb/YHbPKu1xsVpph8VYQVSRg3n7DMgwrHjAtmC+j5eFvUREcAhLwcAmDhQOqagm5IKJD6Vg4dAbvMlh8HwfQliHQrQXkM0eAEIgD8DAnw+gCKQC1QQXTML5DxaBogDgzSQJWdGHdFl668+oBC3oP0RDk6NauUWJd/TroDjLDYlv5CV6oS6qYrTHCXmOMcvHNyIOHNMIHdgPh4FgZkpopAgic1uWru5GhaFxc6M/DKIQEAug+QNEDMSEE/WFW+nzdxDPyoCCWyq6tG8QZiE2D9QUVD3QXjT1qriXQxY+eBoEwQE4GGIE6IABGUiIAOb6bgnEIBSEEYGZlhLVcn1FxfqS8fs2AN7gMUoMUaIJWB/V5LkghZ2E1uM6ZSNtNgAA') format('woff2'),
        url('//at.alicdn.com/t/font_1536357_por1pk7tqfk.woff?t=1575882007924') format('woff'),
        url('//at.alicdn.com/t/font_1536357_por1pk7tqfk.ttf?t=1575882007924') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
        url('//at.alicdn.com/t/font_1536357_por1pk7tqfk.svg?t=1575882007924#iconfont') format('svg'); /* iOS 4.1- */
    }

    .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .icon-xiangxiajiantou:before {
        content: "\e651";
    }

    .title{
        width: 100%;
        text-align: left;
        padding-left: 10px;
        height: 50px;
        line-height: 50px;
        cursor: pointer;
    }

    .icon{
        float: right;
        margin-right: 10px;
        transition: all .5s linear;
    }

    .sub{
        padding-left: 25px;
    }

    .bottom{
        transform: rotate(180deg);
    }
    .fade-up-enter-active,.fade-up-leave-active{
        transition: all .2s;
    }
    .fade-up-enter,.fade-up-leave-to{
        height: 0;
        opacity: 0;
    }
</style>
