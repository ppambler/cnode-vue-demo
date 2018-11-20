<template>
  <!-- 这个template里边只能有一个根元素，不然它编译就会不通过！-->
  <div class="hello">
    <h3>我是axios-app，用来发送请求，拦截响应！</h3>
    <button @click="getData">发送无参数请求</button>
    <button @click="getDataWithParams">发送带参数请求</button>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{item.title}}
      </li>
    </ul>
    <hr>
    <ul>
      <li v-for="item in xxx" :key="item.id">
        {{item.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
// 我在想这个可以针对所有组件的vue实例吗？我是否可以理解为，由于这个是单页应用，显然全局只有一个Vue构造函数？
// 所以其它组件也可以使用这个$http咯？还是说一个组件一个Vue构造器呢？
Vue.prototype.$http = axios

export default {
  name: 'HelloWorld',
  data () {
    return {
      items: [],
      xxx: []
    }
  },
  methods: {
    getData() {
      this.$http.get('https://cnodejs.org/api/v1/topics').then((res) => {
        // 打印拿到的40条数据
        console.log(res.data.data)
        this.items = res.data.data
      }).catch(function(err) {
        console.log(err)
      }) 
    },
    getDataWithParams() {
      // 这个参数是固定的，必须是params，添加2个参数page(页码)和limit（每页显示的数量）
      this.$http.get('https://cnodejs.org/api/v1/topics',{
        params: {
          // Number还是String都行
          page: 1,
          limit: '5'
        }
      }).then((res) => {
        console.log(res.data.data)
        this.xxx = res.data.data
      }).catch(function(err) {
        console.log(err)
      }) 
    }
  }
}
// 查看这个this是什么，什么鬼东西哈！
console.log(this) //{a: {name: "HelloWorld", data: ƒ, …},……}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
