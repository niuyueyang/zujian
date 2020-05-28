<!--suppress ALL -->
<template>
    <li :class="['liItem',nameItem == name ? 'active' : '',className]"  v-bind:key="name" @click="liChange(name)">
        <slot></slot>
    </li>
</template>

<script>
    import emit from './../../utils/emit'
    export default {
        name: "MenuItem",
        props:['name','className'],
        mixins:[emit],
        inject:['rootSub','rootMenu'],
        data(){
          return{
              nameItem:''
          }
        },
        methods:{
            liChange(name){
                //清除其他菜单样式
                var subChilds = this.rootMenu.$children;
                for(let i = 0;i<subChilds.length; i++){
                    if(this.rootSub.$data.itemFlag == subChilds[i].$data.itemFlag){
                        this.dispatch('MenuSub','on-menuclose',this.$parent)
                    }
                }



                //同级菜单清除样式
                var childs = this.$parent.$children;
                var childsSecond = [];
                if(childs.length > 0){
                    for(let i = 0;i < childs.length; i++){
                        var itemData = childs[i].$data;
                        if(typeof(itemData.nameItem)!='undefined'){
                            itemData.nameItem = ''
                        }
                        if(typeof(itemData.nameItem)=='undefined'){
                          var childItem = childs[i];
                          childsSecond = childItem.$children[0].$children;
                        }
                    }
                }

                if(childsSecond.length > 0){
                    for(let i = 0;i < childsSecond.length; i++){
                        let itemData = childsSecond[i].$data;
                        if(typeof(itemData.nameItem)!='undefined'){
                            itemData.nameItem = '';
                        }
                    }
                }

                var grandParentChild = this.$parent.$parent.$parent.$children
                if(grandParentChild.length > 0){
                    for(let i = 0;i < grandParentChild.length; i++){
                        var itemData = grandParentChild[i].$data;
                        if(typeof(itemData.nameItem)!='undefined'){
                            itemData.nameItem = ''
                        }
                    }
                }


                // var childs = this.rootMenu.$children;
                // for(let i=0; i<childs.length; i++){
                //     var item = childs[i];
                //     for(let m =0; m<item.$children[0].$children.length; m++){
                //         var newItem = item.$children[0].$children[m];
                //         console.log(item.$children[0].$children)
                //         //typeof (newItem[m].$data['nameItem'])!='undefined' && newItem[m].$data['nameItem'] = '';
                //     }
                // }
                //
                // var secondChilds= this.$parent.$parent.$parent.$children;
                // for(let j=0; j<secondChilds.length; j++){
                //     secondChilds[j].$data['nameItem'] = ''
                // }
               this.nameItem = name;
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

    .liItem{
        width: 100%;
        text-align: left;
        height: 50px;
        line-height: 50px;
        cursor: pointer;
        padding-left: 25px;
        font-size: 14px;
    }
    .subItem{
        padding-left: 45px;
    }
    .active{
        color: #cc9905;
        background-color: #2B2B2B;
    }
</style>
