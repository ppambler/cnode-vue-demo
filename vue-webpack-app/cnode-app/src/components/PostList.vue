<template>
  <div class="post-list">
    <!-- 帖子导航栏 -->
    <div class="post-list-header">
      <ul>
        <!-- 当我传参数时，需要拿到事件对象 -->
        <li class="current-tab all" @click="switchTab('all',$event)">
          全部
        </li>
        <li  class="good" @click="switchTab('good',$event)">
          精华
        </li>
        <li class="share" @click="switchTab('share',$event)"> 
          分享
        </li>
        <li class="ask" @click="switchTab('ask',$event)">
          问答
        </li>
        <li class="job" @click="switchTab('job',$event)">
          招聘
        </li>
        <li class="dev" @click="switchTab('dev',$event)">
          客户端测试
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
    <ul v-else >
      <li v-for="post in posts" :key="post.id" :class="{'click-fadeout': hasClick,'disabled':isDisabled}" class="hover-list li-fadeout trans-fadeout">
        <!-- 头像 -->
        <router-link :to="{
          name: 'user_info',
          params: {
            name: post.author.loginname
          }
        }">
        <img class="child" :src="post.author.avatar_url" :title="post.author.loginname">
        </router-link>
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
            id: post.id,
            name: post.author.loginname
          }
        }">
          <a class="child">{{post.title}}</a>
        </router-link>
        <!-- 最后一个人回复的图片 -->
        <img class="child" src alt>
        <!-- 最终回复时间 -->
        <span class="child" >{{post.last_reply_at | formatDate}}有人回复</span>
      </li>
      <li>
        <!-- 分页组件 -->
        <Pagination @handleList="renderList" :msg="toson"></Pagination>
      </li>
    </ul>
  </div>
</template>

<script>
import Pagination from './Pagination'
import $ from 'jquery'
export default {
  name: "PostList",
  data() {
    return {
        isLoading: false,
        posts: [],
        postpage: 1,
        hasClick: false,
        isDisabled: false,
        selectTab: 'all',
        toson: 1,
        isWatchString: false,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getData() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
           params: {
               tab: this.selectTab,
               page: this.postpage,
               limit: '20'    
           }
        })
        .then(res => {
            // 加载成功，去除动画
            this.isLoading = false
            // console.log(res)
            this.posts = res.data.data
            this.hasClick = false
            this.isDisabled = false
        }).catch((e)=> {
            console.log(e)
        }) ;
    },
    renderList(value,isFade){
      this.postpage = value
      this.hasClick = isFade
      this.isDisabled = isFade
      window.location.hash = `?tab=${this.selectTab}&page=${value}`
    },
    switchTab(tab,event) {
      // console.log(arguments)
      // console.log(event)
      this.hasClick = true
      this.isDisabled = true
      $(event.target).addClass('current-tab').siblings().removeClass('current-tab')
      this.selectTab = tab
      this.postpage = 1
      window.location.hash = `?tab=${this.selectTab}&page=${this.postpage}`
      // 当我点击tab时，tabChange先与hashChange执行
      // alert('tabChange')
      console.log('tabChange')
      if(!this.isWatchString) {
        this.toson = '1'
        this.isWatchString = true
      } else {
        this.toson = 1
        this.isWatchString = false
      }
    }
  },
  beforeMount() {
    const _this = this
    window.onhashchange = function() {
      // console.log(this)
      _this.getData()
      // alert('hashChange')
      console.log('hashchange')
      // console.log(/\d/.exec(window.location.hash))
      // console.log(_this.toson)
    }
    // 在数据加载成功之前显示加载动画
    this.isLoading = true
    // 在页面载入前执行这个getData方法
    console.log(window.location.hash)
    if(/\d/.exec(window.location.hash)) {
      const page = +(/\d/.exec(window.location.hash)[0])
      // 拿到hash的tab值，此时还未加载dom元素，所以你是找不到有含有tab这个变量值得class的！
      const tab = /tab=(\w+)&/.exec(window.location.hash)[1]
      // console.log(tab)
      // console.log($)
      // $('good').addClass('current-tab').siblings().removeClass('current-tab')
      this.postpage = page
      this.selectTab = tab
    } else {
    }
    this.getData()
  },
  mounted() {
    console.log(this.selectTab)
    // 我无法明白这个这样做为啥拿不到这个class
    // console.log($(this.selectTab))
    console.log(document.getElementsByClassName(this.selectTab))
    $(document.getElementsByClassName(this.selectTab)[0]).addClass('current-tab').siblings().removeClass('current-tab')
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hover-list:hover {
  background: #f6f6f6;
  color: #333;
}
.trans-fadeout{
   transition:all 0.5s linear;
}

.li-fadeout{visibility:visible; opacity:1;}
.click-fadeout.li-fadeout {
  opacity:0.3;
}
.click-fadeout.disabled {
  pointer-events: none;
  cursor: default;
}

.post-list {
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
  cursor: pointer;
}
.post-list-header > ul > li  {
  font-size: 14px;
  color: #80bd01;
}
.post-list-header > ul > li:hover {
  text-decoration: none;
  color: #005580;
}
.post-list-header li.current-tab {
  background-color: #80bd01;
  color: #fff;
  padding: 3px 4px;
  border-radius: 3px;
}
.post-list-header li.current-tab:hover {
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
    width: 70px;
    text-align: center;
    color: #b4b4b4;
    margin-right: 10px;
    margin-left: 10px;
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
    margin-left: 5px;
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
    margin-left: 5px;
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
