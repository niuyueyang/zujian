<template>
    <div>
        <button @click="changeUrl">点击date</button>
        <button @click="change">点击验证</button>
        <div class="topbar">
            <!--<img src="http://phpdiamnsang.top/1.jpg"/>-->
            <div class="page-title-box">
                <h4 class="page-title">DatePicer 日期选择器</h4>
                <p class="page-title-decs">用于选择一个日期</p>
            </div>
        </div>
        <x-datepicker
                placeholder='选择日期'
                v-model="value"
        />
        <p>选择的值：{{value?value:'暂时没有选择日期'}}</p>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data(){
            return {
                value:'2019-11-12'
            }
        },
        mounted(){
            this.change()
            // axios.get('http://localhost:7001/testError').then(res=>{
            //     console.log(res)
            // }).catch(err => null)
        },
        methods:{
            changeUrl(){
                this.$router.push({path:'/card'})
            },
            change(){
                axios.get('http://39.106.10.163:7001/errui').catch(err => null)
                console.log(12345678)
            }
        }
    }
</script>

