<template>
    <div class="son">
        <div>我是子组件</div>
        <p>来自老爸的信：{{msg}}</p>
        <button @click="toMsgForFather">我要给老爸回个信！</button>
        <p>这是使用vuex后，拿到的数据，即我是全局状态（/数据）：{{getMsgFromStore}}</p>
    </div>
</template>


<script>
export default {
  name: "Son",
  props: {
      msg: {
          type: String,
          default: '说好的零花钱呢？老爸……'
      }
  },
  data: function() {
      return {
          toMsg: '收到了，老爸'
      }
  },
  methods: {
      toMsgForFather() {
          console.log('gg')
          console.log(this)
          this.$emit('xxx',this.toMsg)
      }
  },
  computed: {
      getMsgFromStore() {
          return this.$store.state.msg
      }
  }
};
</script>

<style scoped>
    .son {
        border: 1px solid #41b883;
    }
</style>
