<template>
  <div class=".pagination">
    <button @click="changeBtn">首页</button>
    <button @click="changeBtn">上一页</button>
    <button v-if="judge" class="pagebtn">……</button>
    <button
      v-for="btn in pagebtns"
      :key="btn"
      :class="[{'currentPage': btn == currentPage},'pagebtn']"
      @click="changeBtn(btn)"
    >{{btn}}</button>
    <button @click="changeBtn">下一页</button>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: "Pagination",
  data() {
    return {
      pagebtns: [1, 2, 3, 4, 5, "……"],
      currentPage: 1,
      judge: false,
    };
  },
  methods: {
    changeBtn(page) {
      // 如果用户点了最右边的「……」则什么也不做
      // console.log(typeof page)
      if (page == '……') {
        return
      }
      // 如果用户点的是数值按钮，且大于4的话，即从开始，那么就会在左侧添加个「……」，需要注意的是用户传过来的page终究是字符串
      // 至此我需要隐式转换一下类型！额……好像不是啊！我测试了一下，确实传的是数值
      if (typeof +page == 'number' && page > 4) {
        this.judge = true
      } else if(typeof +page == 'number' && page < 5){
        this.judge = false
        this.pagebtns = [1, 2, 3, 4, 5, "……"]
      }
      
      if (typeof page != "number") {
        switch (page.target.innerText) {
          case "上一页":
            $("button.currentPage")
              .prev()
              .click();
            break;
          case "下一页":
            $("button.currentPage")
              .next()
              .click();
            break;
          case "首页":
            this.pagebtns = [1, 2, 3, 4, 5, "......"];
            this.changeBtn(1);
            break;
          default:
            break;
        }
        return;
      }
      this.currentPage = page;
      if (page == this.pagebtns[4]) {
        // 顺着来
        this.pagebtns.shift(); //把第一个元素给GG了
        this.pagebtns.splice(4, 0, this.pagebtns[3] + 1); //退一步，进一步
      } else if (page == this.pagebtns[0] && page != 1) {
        // 倒着来
        this.pagebtns.unshift(this.pagebtns[0] - 1); //如果你点的是第一个元素，那么久移除最后一个元素，并把第一个元素替换成减一的结果
        this.pagebtns.splice(5, 1); //最后一个元素可以GG了
      }
      this.$emit('handleList',this.currentPage,true)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pagination {
  margin-top: 5px;
  margin-bottom: 20px;
  background-color: white;
  padding: 6px 20px;
  border-radius: 5px;
  /*box-shadow: 0px 2px 9px #888888;*/
  border: 1px solid #888888;
}

button {
  background-color: #fff;
  border: 1px solid #ddd;
  color: #778087;
  border-radius: 3px;
  outline: none;
  height: 21px;
  cursor: pointer;
  padding: 0 2px;
  width: 55px;
  height: 29px;
}

.pagebtn {
  position: relative;
  bottom: 1px;
  width: 40px;
  margin: 0 4px;
}

.currentPage {
  color: white;
  background-color: #1f1b1b;
}
</style>
