<template>
  <div class="UserInfo">
    <div class="loading" v-if="isLoading">
      <i class="iconfont icon-Loading"></i>
    </div>
    <div class="userInfomation" v-else>
      <section>
        <!-- 用户头像 -->
        <img :src="userinfo.avatar_url" :title="userinfo.loginname">
        <!-- 用户名字 -->
        <span>{{userinfo.loginname}}</span>
        <!-- 积分 -->
        <p>{{userinfo.score}} 积分</p>
        <!-- github 用户名 -->
        <span class="iconfont icon-github"></span>
        <a :href="`//github.com/${userinfo.githubUsername}`" target="_blank">{{`@${userinfo.githubUsername}`}}</a>
        <!-- 注册时间 -->
        <p>注册时间：{{userinfo.create_at | formatDate}}</p>
      </section>
      <div class="replies">
        <p>最近创建的话题</p>
        <ul>
          <li v-for="item in userinfo.recent_topics" :key="item.id">
            <img :src="item.author.avatar_url" :title="item.author.loginname">
            <!-- <span>{{post.reply_count}}</span>
            <span>/{{post.visit_count}}</span>-->
            <router-link
              :to="{
              name: 'post_content',
              params: {
                id:item.id
              }
            }"
            >
              <a>{{item.title}}</a>
            </router-link>
            <!-- 他人最近对作者这个话题的回复，不过提供的这个api并没有他人的头像 -->
            <span>{{item.last_reply_at | formatDate}}</span>
          </li>
        </ul>
        <!-- <p>查看更多»</p> -->
      </div>
      <div class="topics">
        <p>最近参与的话题</p>
        <ul>
          <li v-for="item in userinfo.recent_replies" :key="item.id">
            <img :src="item.author.avatar_url" :title="item.author.loginname">
            <!-- <span>{{post.reply_count}}</span>
            <span>/{{post.visit_count}}</span>-->
            <router-link
              :to="{
              name: 'post_content',
              params: {
                id:item.id
              }
            }"
            >
              <a>{{item.title}}</a>
            </router-link>
            <span>{{item.last_reply_at | formatDate}}</span>
          </li>
        </ul>
        <!-- <p>查看更多»</p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      isLoading: false,
      userinfo: {}
    };
  },
  methods: {
    getData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          this.isLoading = false;
          this.userinfo = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('//at.alicdn.com/t/font_1141112_09qz5ue8hh6c.css');

.userInfomation {
  background: white;
  width: 75%;
  margin: 10px auto;
  font-size: 0.9rem;
}
.userInfomation section {
  padding: 12px 12px 0 12px;
}
.userInfomation img {
  width: 30px;
}
.userInfomation span {
  color: #778087;
}
.userInfomation p {
  margin-top: 10px;
  margin-bottom: 10px;
}
.userInfomation p:last-child {
  color: #778087;
} 
.userInfomation li {
  list-style: none;
}
.userInfomation .replies,
.userInfomation .topics {
  font-size: 0.9rem;
  border-top: 10px #dddddd solid;
  padding-bottom: 10px;
}
.userInfomation > div > p {
  padding: 12px 0 12px 12px;
  background-color: rgba(212, 205, 205, 0.17);
  font-size: 0.8rem;
  margin: 0;
}
.userInfomation > div > ul > li {
  padding: 4px 0 4px 12px;
  white-space: nowrap;
  font-size: 0.8rem;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 30px;
  vertical-align: middle;
}
.userInfomation > div > ul > li > a {
  color: #094e99;
  text-decoration: none;
}
</style>
