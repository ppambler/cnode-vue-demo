<template>
  <div class="hello">
    <hr>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <h3>我是传递过来的参数→☞→☞→☞{{$route.params.worldmsg}}</h3>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello World!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  color: yellow;
}
</style>
