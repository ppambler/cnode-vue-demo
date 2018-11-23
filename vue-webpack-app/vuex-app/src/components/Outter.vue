<template>
    <div class="outter">
        <p>我是吃瓜群众Outter，试试我是否能拿到$store中的数据：</p>
        {{msg}} <br>
        <span>使用getters拿到当前吃瓜群众的余额：{{getNum}}</span><br>
        <button @click="cStateWithGetters">点击我就拿吃瓜群众的瓜子费100元</button>
    </div>
</template>


<script>
export default {
    name: 'Outter',
    data: function() {
        return {
            // 没有用计算属性，导致更改了状态也不会发生变化！
            msg: this.$store.state.msg,
        }
    },
    computed: {
        getNum() {
            return this.$store.getters.getNum
        }
    },
    methods: {
        cStateWithGetters() {
            this.$store.commit('zzz')
        }
    }
}
</script>

<style scoped>
    .outter {
        border: 2px solid blue;
    }
</style>
