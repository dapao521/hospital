<script setup>
import { defineComponent } from "vue";
import top from "@/components/top.vue";
import bottom from "@/components/bottom.vue";
import login from "@/views/login/index.vue";

defineComponent({
  name: "MyComponent",
  // 组件的其他选项和逻辑
});
</script>

<template>
  <div class="contianer">
    <!-- 顶部组件 -->
    <top></top>
    <!-- 内容组件 -->
    <div class="content">
      <!-- 路由展示 -->
      <router-view></router-view>
    </div>
    <!-- 底部组件 -->
    <bottom></bottom>
  </div>
  <login></login>
</template>

<style lang="scss" scoped>
.contianer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    margin-top: 70px;
    width: 1200px;
    min-height: 700px;
  }
}
</style>
