<template>
    <div class="header">
        <router-link  :to="{name:'root'}">
            <img src="../assets/cnodejs_light.svg" alt="" width="120" height="28">
        </router-link>
        <ul>
            <li>
                <router-link  :to="{name:'root'}">
                    <a>首页</a>
                </router-link>
            </li>
            <li><a @click="undo">新手入门</a></li>
            <li><a @click="undo">API</a></li>
            <li><a @click="undo">关于</a></li>
            <li><a @click="undo">注册</a></li>
            <li><a @click="undo">登录</a></li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
     undo() {
         alert('待完成的任务：新手入门、API、关于、注册、登录等……')
     }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        background: #444;
    }
    .header > a {
        display: inline-block;
        margin-left: 67px;
        margin-bottom: 6px;
    }
    ul {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 100%;
        width: 356px;
        margin-right: 67px;
    }
    ul > li {
        margin-bottom: 4px;
        cursor: pointer;
    }
    ul > li a {
        display: inline-block;
        color: #ccc;
        font-size: 13px;
    }
    ul > li a:hover {
        text-decoration: none;
        color: #fff;
    }
</style>
