// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false

// 创建状态仓库
// zz这个变量名最好是store，因为在注入到Vue实例中时可以使用ES6语法
// 就像是router一样
var zz = new Vuex.Store({
  state: {
    msg: '我是一个共享数据！'
  }
})

/* eslint-disable no-new */
// store、router等这些属性名可是固定的哈！
var o = new Vue({
  el: '#app',
  store: zz,
  router,
  components: { App },
  template: '<App/>'
})

console.log(o)