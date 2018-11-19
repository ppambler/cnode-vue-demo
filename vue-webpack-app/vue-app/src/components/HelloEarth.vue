<template>
  <div class="hello">
    <hr>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'HelloEarth',
  data () {
    return {
      msg: 'Hello Earth!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  color: blue;
}
</style>
