<template>
    <div class="outter">
        <p>我是吃瓜群众Outter，试试我是否能拿到$store中的数据：</p>
        {{msg}}
    </div>
</template>


<script>
export default {
    name: 'Outter',
    data: function() {
        return {
            // 没有用计算属性，导致更改了状态也不会发生变化！
            msg: this.$store.state.msg
        }
    }
}
</script>

<style scoped>
    .outter {
        border: 2px solid blue;
    }
</style>
