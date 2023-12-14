<script setup>
import { defineComponent } from "vue";
import {
  UserFilled,
  Memo,
  TurnOff,
  Checked,
    Microphone,
    ArrowRight
} from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
// import { useRouter } from "vue-router";

const route = useRoute();
// const router = useRouter();

defineComponent({
  name: "MyComponent",
  // 组件的其他选项和逻辑
});
</script>

<template>
  <div class="box">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }"
        >个人中心</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
  <el-row>
    <el-col :span="4">
      <el-menu
        :default-active="route.path"
        class="el-menu-vertical-demo"
        :router="true"
        
      >
        <el-menu-item index="/user/shimingrenzheng">
          <el-icon><UserFilled /></el-icon>
          <span>实名认证</span>
        </el-menu-item>
        <el-menu-item index="/user/guahaodingdan">
          <el-icon><Memo /></el-icon>
          <span>挂号订单</span>
        </el-menu-item>
        <el-menu-item index="/user/jiuzhengrenguanli">
          <el-icon><TurnOff /></el-icon>
          <span>就证人管理</span>
        </el-menu-item>
        <el-menu-item index="/user/zhanghaoxinxi">
          <el-icon><Checked /></el-icon>
          <span>账号信息</span>
        </el-menu-item>
        <el-menu-item index="/user/yijianfankui">
          <el-icon><Microphone /></el-icon>
          <span>意见反馈</span>
        </el-menu-item>
      </el-menu></el-col
    >
    <el-col :span="20">
      <!-- 路由 -->
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.box {
  margin: 20px 0;
}
</style>
