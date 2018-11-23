// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import zz from './store'

Vue.config.productionTip = false


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