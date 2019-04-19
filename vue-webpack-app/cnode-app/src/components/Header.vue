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
            <li><a href="#">新手入门</a></li>
            <li><a href="#">API</a></li>
            <li><a href="#">关于</a></li>
            <li><a href="#">注册</a></li>
            <li><a href="#">登录</a></li>
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
//   methods: {
//       backIndex() {
//           alert(1)
//           window.location.hash = "?page=1"
//       }
//   }
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
