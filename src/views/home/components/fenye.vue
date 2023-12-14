<script setup>
import { defineComponent ,ref} from "vue";

defineComponent({
  name: "MyComponent",
  // 组件的其他选项和逻辑
});
const currentPage = ref(1)
const pageSize = ref(10)
</script>

<template>
  <div class="fenye">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 15, 20, 30]"
      :small="false"
      :background="true"
      layout="total,jumper,prev, pager, next,sizes"
      :total="100"

    />
  </div>
</template>

<style lang="scss" scoped>
.fenye {
    margin: 20px 100px;
}
</style>
