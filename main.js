import Vue from 'vue'
import App from './App.vue'
import h3 from './components'
import router from './../router/router'
import axios from 'axios'
// import monitorerror from 'monitorerror'

// import VueImageLazyload from './components/lazyLoad/index.js'
// // 此处设定全局参数
// Vue.use(VueImageLazyload, {
//     loading: 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXs7Oxc9QatAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==',
//     error: 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXs7Oxc9QatAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==',
//     try: 1
// })

import VueViewload from './components/lazyLoad/my.js'

//使用VueViewload
Vue.use(VueViewload,{
    defaultPic: 'http://img.zcool.cn/community/0161f656b0663e6ac7256cb052d31a.gif',
    errorPic: 'http://a0.att.hudong.com/77/31/20300542906611142174319458811.jpg',
    threshold: -200,
    effectFadeIn: true,
    callback: function(ele, src) {
        ele.style.border = '1px solid red';
        console.log(ele.nodeName + '...' + src);
    }
})

// import './assets/global.less'

import './assets/style.less'
Vue.use(h3)
Vue.use(router);

Vue.config.productionTip = false
Vue.config.performance = true
Vue.prototype.$axios = axios

// monitorerror(Vue, router, 'NwpFFXZSFZYSkGJB');

// router.beforeEach((to, from, next) => {
//     if(to.path != '/date'){
//         next('/date')
//     }
//     next()
// })

/*Vue.config.errorHandler = function(err,vm,info){
  console.log(err);
  console.log(vm);
  console.log(info)
}*/
/*window.onerror = function (errorMessage,scriptURI,lineNo,columnNo,error) {
    console.log('errorMessage：'+errorMessage); // 异常信息
    console.log('scriptURI：'+scriptURI); // 异常文件路径
    console.log('lineNo：'+lineNo); // 异常行号
    console.log('columnNo：'+columnNo); // 异常列号
    console.log('error：'+error); // 异常堆栈信息

    // 信息上报
}*/
// throw new Error('这是一个错误');






new Vue({
  el:"#app",
  router,
  render: h => h(App),
}).$mount('#app')
