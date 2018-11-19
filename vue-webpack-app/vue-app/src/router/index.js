import Vue from 'vue'
import router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import HelloEarth from '../components/HelloEarth'

Vue.use(router)

// 配置路由
export default new router({
  routes: [{
    path: '/helloworld', //确定要跳转的路径
    component: HelloWorld, //指定要跳转的组件
  },{
    path: '/helloearth',
    component: HelloEarth
  }]
})
