<template>
  <!-- 这个template里边只能有一个根元素，不然它编译就会不通过！-->
  <div class="hello">
    <h3>我是axios-app，用来发送请求，拦截响应！</h3>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
