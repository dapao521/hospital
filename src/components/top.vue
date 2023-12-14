<script setup>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useCounterStore } from "@/stores/counter";
import { ArrowDown } from "@element-plus/icons-vue";

const router = useRouter();
const store = useCounterStore();

const shouye = () => {
  router.push("/");
};

const denglu = () => {
  store.kaiguan();
};

defineComponent({
  name: "MyComponent",
  // 组件的其他选项和逻辑
});

// 退出登录
const tuichu = () => {
  store.clearToken();

  router.push("/home");

}
</script>

<template>
  <div class="top">
    <div class="contant">
      <div class="left" @click="shouye">
        <img src="@/assets/qww474.png" alt="" />
        <p>上一桶 医院挂号平台</p>
      </div>
      <div class="right">
        <p>帮助中心</p>
        <p v-if="!store.token" @click="denglu">登陆/立即注册</p>
        <el-dropdown v-else>
          <span class="el-dropdown-link">
            <span>
            <img src="@/assets/qww472.png" alt="">
          </span>
            {{ store.token?.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="router.push('/user/shimingrenzheng')">实名认证</el-dropdown-item>
              <el-dropdown-item @click="router.push('/user/guahaodingdan')">挂号订单</el-dropdown-item>
              <el-dropdown-item @click="router.push('/user/jiuzhengrenguanli')">就证人管理</el-dropdown-item>
              <el-dropdown-item @click="tuichu">退出登录</el-dropdown-item>

            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 70px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  .contant {
    width: 1200px;
    height: 70px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      img {
        height: 50px;
        width: 50px;
        border-radius: 20px;
        margin-right: 20px;
      }
      p {
        font-size: 20px;
        color: rgb(25, 216, 230);
      }
    }
    .right {
      display: flex;
      align-items: center;
      p {
        margin-left: 20px;
        font-size: 20px;
        // 鼠标经过小手
        cursor: pointer;
        &:hover {
          color: aquamarine;
        }
      }
      .el-dropdown-link{
        font-size: 20px;
        cursor: pointer;
        // 鼠标经过小手
        display: flex;
        align-items: center;

        &:hover {
          color: aquamarine;
        }
        margin-left: 20px;
      }
      img{
        height: 50px;
        border-radius: 50%;
      }
    }
  }
}
</style>
