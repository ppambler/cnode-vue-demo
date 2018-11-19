<template>
  <ul>
      <li>
          <router-link to="/helloworld">Hello World</router-link>
      </li>
      <li>
          <router-link to="/helloearth">Hello Earth</router-link>
      </li>
  </ul>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      msg: "Hello Earth"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  color: red;
}
</style>
