<template>
  <div class="hello">
      <Parent/>
      <hr>
      <Outter/>
  </div>
</template>

<script>
import Parent from './Parent'
import Outter from './Outter'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Parent,
    Outter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
    border: 3px solid red;
  }
</style>
