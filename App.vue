<template>
  <div id="app">
    <h-select v-model='value1' placeholder="请选择语言" style="width: 300px;">
      <h-option value='1'>Javascript</h-option>
      <h-option value='2'>C++</h-option>
      <h-option value='3' disabled>PHP</h-option>
      <h-option value='4'>Java</h-option>
    </h-select>
    <!--<div>选中的值：{{value1}}</div>-->
    <!--<hInput type="text" v-model="value" style="width:300px" iconBefore="x-icon-navigation" :clearable="true" @on-input="changeInput" />
    <h-select v-model='value1' placeholder="请选择语言" style="width: 300px;">
      <h-option value='1'>Javascript</h-option>
      <h-option value='2'>C++</h-option>
      <h-option value='3' disabled>PHP</h-option>
      <h-option value='4'>Java</h-option>
    </h-select>
    <div>选中的值：{{value1}}</div>

    <h-select v-model='value2' :multiple="true" placeholder="请选择语言" style="width: 300px;">
      <h-option value='1'>Javascript</h-option>
      <h-option value='2'>C++</h-option>
      <h-option value='3' disabled>PHP</h-option>
      <h-option value='4'>Java</h-option>
      <h-option value='1'>Javascript</h-option>
      <h-option value='2'>C++</h-option>
      <h-option value='3' disabled>PHP</h-option>
      <h-option value='4'>Java</h-option>
      <h-option value='1'>Javascript</h-option>
      <h-option value='2'>C++</h-option>
      <h-option value='3' disabled>PHP</h-option>
      <h-option value='4'>Java</h-option>
    </h-select>
    <div>选中的值：{{value2}}</div>

      <h-select v-model='value3' multiple search="option" placeholder="请选择颜色" style="width: 300px;">
          <h-optionGroup label="Javascript" style="width: 300px;">
              <h-option value='JQuery'>JQuery</h-option>
              <h-option value='Vue'>Vue</h-option>
              <h-option value='React'>React</h-option>
          </h-optionGroup>
          <h-optionGroup label="CSS" style="width: 300px;">
              <h-option value='Less'>Less</h-option>
              <h-option value='Sass'>Sass</h-option>
              <h-option value='Scss' disabled>Scss</h-option>
          </h-optionGroup>
      </h-select>
      <div>选中的值：{{value3}}</div>
    <Parent/>-->
      <!--<Parent/>-->
    <!--<router-link to="/drop">上拉下拉</router-link>-->
      <router-view></router-view>
  </div>
</template>

<script>
// import Parent from './views/Parent'

export default {
  name: 'app',
  data(){
    return{
        value:'1',
        value1: '1',
        value2:'',
        value3:''
    }
  },
  // methods:{
  //     changeInput(val){
  //         console.log(val)
  //     }
  // },
  // components: {
  //     Parent
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
