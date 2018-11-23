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
  },
  // 改变全局状态的第一种姿势——直接改变
  mutations: {
    // 定义我们的状态改变函数
    // 这个state形参是可以改的哈，这是常识，vuejs内部会默认吧state这个选项给传进去，但你在其它组件使用
    // this.$store.commit('changeState')的时候
    changeState(state) {
      state.msg = '这是用mutations改变msg状态'
    },
    xxx(state) {
      state.msg = '这是用actions间接改变msg状态'
    },
    yyy(state) {
      state.msg = '这是在actions中异步间接改变msg状态，此技能mutations可不行哈！'
    }
  },
  // 改变全局状态的另一种姿势——间接改变
  actions: {
    // context为上下文对象
    changeState(context) {
      // actions中只能对mutation进行操作
      context.commit('xxx')
    },
    asyncChangeState(context) {
      setTimeout(()=> {
        context.commit('yyy')
      }, 2000)
    }
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