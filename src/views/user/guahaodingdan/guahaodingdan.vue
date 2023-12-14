<script setup>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import guahaodingdan from "./components/guahaodingdan.vue";
import dingdanguanli from "./components/dingdanguanli.vue";


const route = useRoute();
defineComponent({
  name: "MyComponent",
  // 组件的其他选项和逻辑
});
</script>

<template>
  <div v-if="route.query.id">
    <guahaodingdan></guahaodingdan>
  </div>
  <div v-else>
    <dingdanguanli></dingdanguanli>
  </div>
</template>

<style lang="scss" scoped></style>
