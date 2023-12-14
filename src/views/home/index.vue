<script setup>
import { defineComponent } from "vue";
import swiper from "./components/swiper.vue";
import search from "./components/search.vue";
import level from "./components/level.vue";
import hospital from "./components/hospital.vue";
import tip from "./components/tip.vue";
import fenye from "./components/fenye.vue";


defineComponent({
  name: "MyComponent",
  // 组件的其他选项和逻辑
});
</script>

<template>
  <div>
    <!-- 轮播图 -->
    <swiper></swiper>
    <!-- 搜索 -->
    <search></search>
    <!-- 内容 -->
    <el-row :gutter="20">
      <el-col :span="20">
        <!-- 等级 -->
        <level></level>
        <!-- 医院内容 -->
        <hospital></hospital>
        <!-- 分页qi -->
        <fenye></fenye>
      </el-col>
      <el-col :span="4"> 
        <tip></tip>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped></style>
