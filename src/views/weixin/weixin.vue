<script setup>
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

// 微信扫码登录以后 因为redirect_uri 重定向到这里  携带路由querry
// 所以在这里把获取的信息 本地储存起来
const route = useRoute();
// console.log(route.query);
localStorage.setItem('token', JSON.stringify(route.query))

//授权成功隐藏页面
const html = document.querySelector('html');
html.style.display = 'none';

defineComponent({
name: 'MyComponent',
// 组件的其他选项和逻辑
});

</script>


<template>
  <div></div>
</template>


<style lang='scss' scoped>

</style>
