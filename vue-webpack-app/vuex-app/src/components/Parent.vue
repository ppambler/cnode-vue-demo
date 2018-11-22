<template>
    <div class="parent">
        <div>我是父组件</div>
        <!-- 注意把这个@xxx写在子组件标签身上，而不是其下面的那个div，其实很好理解，子组件标签既是入口也是出口哈！ -->
        <!-- 希望这个msg是动态的所有用了v-bind的语法糖 -->
        <Son :msg="toSonMsg" @xxx="getSonMsg" />
        <div>让儿子给回个信哈！不然这钱也不知道打过去没有！</div>
        <p>信箱：{{fromSonMsg}}</p>
    </div>
</template>


<script>
import Son from './Son'
export default {
    name: 'Parent',
    components: {
        Son,
    },
    data: function() {
        return {
            toSonMsg: '这是爸爸给你的零花钱',
            fromSonMsg: '等待儿子的回信……'
        }
    },
    methods: {
        getSonMsg(value) {
            console.log(1)
            this.fromSonMsg = value
        }
    }
}
</script>

<style scoped>
    .parent {
        border: 2px solid yellow;
    }
</style>
