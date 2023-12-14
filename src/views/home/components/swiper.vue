<script setup>
import { defineComponent } from 'vue';

defineComponent({
name: 'MyComponent',
// 组件的其他选项和逻辑
});

</script>


<template>
    <!-- 轮播图 -->
    <el-carousel height="450px" indicator-position="outside">
      <!-- v-for="item in 4" :key="item" -->
      <el-carousel-item >
        <img src="@/assets/qww471.png" alt="">
      </el-carousel-item>
      <el-carousel-item >
        <img src="@/assets/qww472.png" alt="">
      </el-carousel-item>
      <el-carousel-item >
        <img src="@/assets/qww470.png" alt="">
      </el-carousel-item>
      <el-carousel-item >
        <img src="@/assets/qww469.png" alt="">
      </el-carousel-item>
    </el-carousel>
</template>


<style lang='scss' scoped>
img{
  width: 100%;
  height: 100%;
  // 图片覆盖
  object-fit: cover;
}
</style>
