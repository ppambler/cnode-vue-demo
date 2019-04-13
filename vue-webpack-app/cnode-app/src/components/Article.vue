<template>
  <div class="article">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>
    <div v-else>
      <div class="topic_header">
        <div class="topic_title">{{post.title}}</div>
        <ul>
          <!-- 可以见到有个Z，因此拿到的是UTC格式的日期字符串， -->
          <li>• 发布于 {{post.create_at | formatDate}} </li>
          <li>• 作者 {{post.author.loginname}} </li>
          <li>• {{post.visit_count}} 次浏览 </li>
          <li>• 最后一次编辑是 {{post.last_reply_at | formatDate}}</li>
          <li>• 来自 {{post.tab | tabFormatter}} </li>
        </ul>
        <div v-html="post.content" class="topic_content"></div>
      </div>
      <div v-if="post.reply_count > 0" id="reply">
        <div class="topbar">{{post.reply_count}} 回复</div>
        <div v-for="(reply,index) in post.replies" :key="reply.id" class="replySec">
          <div class="replyUp">
            <img :src="reply.author.avatar_url" alt="">
            <span>{{reply.author.loginname}}</span>
            <span>{{index+1}}楼</span>
            <span>• {{reply.create_at | formatDate}}</span>
            <span v-if="post.author.loginname == reply.author.loginname">作者</span>
            <span v-if="reply.ups.length > 0">
              ☝ {{reply.ups.length}}
            </span>
            <span v-else>
            </span>
          </div>
          <p v-html="reply.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Article",
    data() {
      return {
        isLoading: false,
        // 代表当前文章页的所有内容，所有属性
        post: {

        }
      }
    },
    methods: {
      getArticleData() {
        this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
          .then(res=>{
            // 虽然请求和响应成功了，但是数据是否真正拿到了，还需要做个判断！
            if(res.data.success == true) {
              this.isLoading = false
              console.log(res)
              // 第一个data是响应回来的数据的一个data属性
              // 把 「&lt;br /&gt;」搞成是<br />
              res.data.data.content = res.data.data.content.replace(/&lt;br \/&gt;/g, '<br/>')
              console.log(res)
              this.post = res.data.data
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    beforeMount() {
      this.isLoading = true
      this.getArticleData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* 引入这个CSSs的时候记住一定要把那个默认的scoped属性给去掉*/
@import url('../assets/markdown-github.css');
.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  height: 16px;
  font-size: 12px;
  margin-top: 10px;
}

.article {
  margin-right: 340px;
  margin-top: 15px;
}

#reply,
.topic_header {
  background-color: #fff;
}

#reply {
  margin-top: 15px;
}

#reply img {
  width: 30px;
  height: 30px;
  position: relative;
  bottom: -9px;
}

#reply a,
#reply span {
  font-size: 13px;
  color: #666;
  text-decoration: none;
}
.replySec {
  border-bottom: 1px solid #e5e5e5;
  padding: 0 10px;
}

.loading {
  text-align: center;
  padding-top: 300px;
}

.replyUp a:nth-of-type(2) {
  margin-left: 0px;
  display: inline-block;
}

.topic_header {
  padding: 10px;
}

.topic_title {
  font-size: 20px;
  font-weight: bold;
  padding-top: 8px;
}

.topic_header ul {
  list-style: none;
  padding: 0px 0px;
  margin: 6px 0px;
}

.topic_header li {
  display: inline-block;
  font-size: 12px;
  color: #838383;
}

.topic_content {
  border-top: 1px solid #e5e5e5;
  padding: 0 10px;
  /* 这个css很关键，没有这个的话，把内容表现为markdown样式的话，标题和p会挨在一起 */
  white-space: pre-wrap;
}

.markdown-text img {
  width: 92% !important;
}

h1,h2,h3,h4,h5,h6 {
  margin-top: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
</style>
