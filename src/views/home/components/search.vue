<script setup>
import { defineComponent, ref } from "vue";
import { Search } from "@element-plus/icons-vue";

defineComponent({
  name: "MyComponent",
  // 组件的其他选项和逻辑
});
const search = ref();
</script>

<template>
  <div class="search">
    <el-autocomplete v-model="search" clearable placeholder="请输入搜索内容" />
    <el-button type="primary" :icon="Search">搜索</el-button>
  </div>
</template>

<style lang="scss" scoped>
.search {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  //   深度选择器 ：：v-deep(){}
  ::v-deep(.el-input__inner) {
    width: 500px;
    height: 40px;
  }
  ::v-deep(.el-button--primary) {
    height: 40px;
  }
}
</style>
