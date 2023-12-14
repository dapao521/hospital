<script setup>
import { defineComponent, onMounted, ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  MessageBox,
  QuestionFilled,
  Setting,
  ArrowRight,
} from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const idq = [
  {
    id: '/hospitol/yuyueguahao',
    name: "预约挂号",
  },
  {
    id:'/hospitol/yiyuanxiangqing',
    name: "医院详情",
  },
  {
    id: '/hospitol/yuyuetongzhi',
    name: "预约通知",
  },
  {
    id: '/hospitol/tingzhenxinxi',
    name: "停诊信息",
  },
  {
    id: '/hospitol/chaxun',
    name: "查询/取消",
  },
];
//点击菜单时，改变面包屑
const mianbao = ref()
const chushi = () => {
  let index = idq.findIndex((item) => item.id == route.path);
  mianbao.value = idq[index]?.name
};
const change = (e,route) => {
  // 点击跳转二级路由的时候携带主页带来的来参数
  // 或者直接把store里面的数据持久化
  router.push({ path: e ,query:{id:1,name:"北京医院"}});
 let index = idq.findIndex((item) => item.id == e);
  mianbao.value = idq[index].name
  
  console.log(route);
};


onMounted(() => {
  chushi();
});


defineComponent({
  name: "MyComponent",
  // 组件的其他选项和逻辑
});
</script>

<template>
  <div class="box">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/hospitol' }"
        >医院详情</el-breadcrumb-item
      >
      <el-breadcrumb-item>{{mianbao}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-row>
    <el-col :span="4">
      <el-menu
        :default-active="route.path"
        class="el-menu-vertical-demo"
        :router='true'
        @select="change"
      >
        <el-menu-item index="/hospitol/yuyueguahao">
          <el-icon><MessageBox /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/hospitol/yiyuanxiangqing">
          <el-icon><icon-menu /></el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/hospitol/yuyuetongzhi">
          <el-icon><QuestionFilled /></el-icon>
          <span>预约通知</span>
        </el-menu-item>
        <el-menu-item index="/hospitol/tingzhenxinxi">
          <el-icon><document /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item index="/hospitol/chaxun">
          <el-icon><setting /></el-icon>
          <span>查询/取消</span>
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
