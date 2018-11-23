<template>
    <div class="son">
        <div>我是子组件</div>
        <p>来自老爸的信：{{msg}}</p>
        <button @click="toMsgForFather">我要给老爸回个信！</button>
        <p>这是使用vuex后，拿到的数据，即我是全局状态（/数据）：{{getMsgFromStore}}</p>
        <hr>
        <button @click="cStateWithActions">点击我使用actions间接改变全局状态！</button>
        <button @click="cStateWithActionsAsync">点击我使用actions异步间接改变全局状态！</button>
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
      },
      cStateWithActions() {
          this.$store.dispatch('changeState')
      },
      cStateWithActionsAsync() {
          this.$store.dispatch('asyncChangeState')          
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
