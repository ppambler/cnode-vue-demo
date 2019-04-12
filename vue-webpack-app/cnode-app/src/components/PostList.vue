<template>
  <div class="post-list">
    <!-- 帖子导航栏 -->
    <div class="post-list-header">
      <ul>
        <li>
          <a href="#" class="current-tab">全部</a>
        </li>
        <li>
          <a href="#">精华</a>
        </li>
        <li>
          <a href="#">分享</a>
        </li>
        <li>
          <a href="#">问答</a>
        </li>
        <li>
          <a href="#">招聘</a>
        </li>
        <li>
          <a href="#">客户端测试</a>
        </li>
      </ul>
    </div>
    <!-- 过渡动画 -->
    <div class="loader" v-if="isLoading">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
    <!-- 主题帖子列表 -->
    <ul v-else>
      <li v-for="post in posts" :key="post.id">
        <!-- 头像 -->
        <img class="child" :src="post.author.avatar_url" alt>
        <!-- 回复/浏览 -->
        <span class="child">
          <span>{{post.reply_count}}</span><span>/{{post.visit_count}}</span>
        </span>
        <!-- 帖子分类 -->
        <span :class="[{put_good:(post.good == true),put_top:(post.top == true),
        'topiclist-tab':(post.good != true && post.top != true)}]">
            <span>{{post | tabFormatter}}</span>
        </span>
        <!-- 标题 -->
        <router-link :to="{
          name:'post_content',
          params: {
            id: post.id
          }
        }">
          <a class="child">{{post.title}}</a>
        </router-link>
        <!-- 最后一个人回复的图片 -->
        <img class="child" src alt>
        <!-- 最终回复时间 -->
        <span class="child" >{{post.last_reply_at | formatDate}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PostList",
  data() {
    return {
        isLoading: false,
        posts: []
    };
  },
  methods: {
    getData() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
           params: {
               page: 1,
               limit: '20'    
           }
        })
        .then(res => {
            // 加载成功，去除动画
            this.isLoading = false
            console.log(res)
            this.posts = res.data.data
        }).catch((e)=> {
            console.log(e)
        }) ;
    }
  },
  beforeMount() {
    // 在数据加载成功之前显示加载动画
    this.isLoading = true
    // 在页面载入前执行这个getData方法
    this.getData()
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.post-list {
  width: 90%;
  margin: 0 auto;
  margin-top: 15px;
}
.post-list-header {
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
}
.post-list-header > ul {
  display: flex;
  height: 40px;
  align-items: center;
}
.post-list-header > ul > li {
  margin: 0 10px;
}
.post-list-header > ul > li a {
  font-size: 14px;
  color: #80bd01;
}
.post-list-header > ul > li a:hover {
  text-decoration: none;
  color: #005580;
}
.post-list-header a.current-tab {
  background-color: #80bd01;
  color: #fff;
  padding: 3px 4px;
  border-radius: 3px;
}
.post-list-header a.current-tab:hover {
  color: #fff;
}
.post-list > ul li {
  height: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 1px;
  background-color: #fff;
  padding: 10px 10px;
}
.post-list > ul li img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
}
.child {
    margin: 0 5px;
}
.child:nth-child(2) {
    width: 50px;
    text-align: center;
    color: #b4b4b4;
}
.child:nth-child(2),.child:nth-child(3) {
    font-size: 12px;
}
.child:nth-child(2) span:first-child {
    font-size: 14px;
    color: #9e78c0;
}
.child:nth-child(4) {
    flex-grow: 1;
    text-decoration: none;
}
.child:nth-child(4):hover {
    text-decoration: underline;
    color: #2d374b;
}
.child:nth-child(6) {
    font-size: 12px;
    color: #778087;
}
/* 帖子分类样式-start */
.put_good, .put_top {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin-right: 10px;
  }

  .topiclist-tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
    margin-right: 10px;
  }
/* 帖子分类样式-end */
/* loading-start */
.loader {
  position: absolute;
  top: 50%;
  left: 40%;
  margin-left: 10%;
  transform: translate3d(-50%, -50%, 0);
}
.dot {
  width: 24px;
  height: 24px;
  background: #3ac;
  border-radius: 100%;
  display: inline-block;
  animation: slide 1s infinite;
}
.dot:nth-child(1) {
  animation-delay: 0.1s;
  background: #32aacc;
}
.dot:nth-child(2) {
  animation-delay: 0.2s;
  background: #64aacc;
}
.dot:nth-child(3) {
  animation-delay: 0.3s;
  background: #96aacc;
}
.dot:nth-child(4) {
  animation-delay: 0.4s;
  background: #c8aacc;
}
.dot:nth-child(5) {
  animation-delay: 0.5s;
  background: #faaacc;
}
@-moz-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@-o-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
/* loading-end*/
</style>
