<template>
    <div class="header">
        <a href="#">
            <img src="../assets/cnodejs_light.svg" alt="" width="120" height="28">
        </a>
        <ul>
            <li><a href="#">首页</a></li>
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
        margin-right: 84px;
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
