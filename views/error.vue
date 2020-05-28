<template>
    <div>
        <!--<img src="http://phpdiamnsang.top/1.jpg"/>-->
        <div class="a">111</div>
        <!--<button @click="add">{{count1}} 加1</button>-->
        <!--<button @click="minus">{{count2}} 减1</button>-->
        <button @click="init">点击验证ajax</button>
        <button @click="add">点击</button>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
          return{
              count1:1,
              count2:1
          }
        },
        mounted(){
            this.init()
        },
        methods:{
            add(){
              this.count1++;
            },
            minus(){
              this.count2--;
            },
            init(){
              axios.get('http://localhost:7001/testError').then(res=>{
                  console.log(res)
              }).catch(err => null)
            },
            handleError(){
                console.log('img error')
            }
        }
    }
</script>

<style scoped>
    @import './a.css';
</style>
