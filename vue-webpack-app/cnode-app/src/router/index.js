import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'root',
      path: '/',
      components: {
        main: () => import('@/components/PostList')
      }
    },
    {
      name: 'post_content',
      path: '/topic/:id&author=:name',
      components: {
        main:() => import('@/components/Article'),
        slidebar: () => import('@/components/Slidebar')
      }
    },
    {
      name: 'user_info',
      path: '/userinfo/:name',
      components: {
        main: () => import('@/components/UserInfo')
      }
    }
  ]
})
