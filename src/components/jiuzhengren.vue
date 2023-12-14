<script setup>
import { defineComponent } from "vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
const route = useRoute();

defineComponent({
  name: "MyComponent",
  // 组件的其他选项和逻辑
});

// 接收父组件传过来的值
const props = defineProps(["item", "activeIndex","index","isshow"]);
console.log(props.item);
const emits = defineEmits(["edit", "del"])

const change = () => {
  // 不同的路径 点击
  if (route.path === "/user/jiuzhengrenguanli") {
    emits("edit", props.item)
  } else {
    emits("edit", props.item)
  }

}
</script>

<template>
  <div class="box">
    <div class="shang">
      <div>
        <span>{{ props.item.isInsure === 1 ? "医保" : "自费" }}</span>
        <span>{{ props.item.name }}</span>
      </div>

      <div>
        <el-button type="primary" :icon="Edit" circle @click="change" />
      <el-button type="danger" :icon="Delete" circle v-if="props.isshow" @click="emits('del')"/>
      </div>

    </div>
    <div class="xia" :class="{ active: props.activeIndex === props.index }">
      <p>证件类型：{{ props.item.certificatesType }}</p>
      <p>证件号码：{{ props.item.certificatesNo }}</p>
      <p>用户心别：{{ props.item.sex === 0 ? "男" : "女" }}</p>
      <p>出生日期：{{ props.item.birthdate }}</p>
      <p>手机号码：{{ props.item.phone }}</p>
      <p>婚姻状况：{{ props.item.isMarry === 1 ? "已婚" : "未婚" }}</p>
      <p>当前主治：{{ props.item.param.cityString }}</p>
      <p>详细住址：{{ props.item.param.fullAddress }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  border-radius: 5px;
  border: 1px solid #ccc;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.6);
  margin: 20px 0;
  .shang {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: aqua;
    height: 60px;
    span:nth-child(1) {
      font-size: 14px;
      background-color: white;
      padding: 2px;
      margin-left: 10px;
    }
    .el-button.is-circle {
      margin-right: 20px;
    }
  }
  .xia {
    padding: 20px 40px;
    position: relative;
    min-height: 280px;
    p {
      font-size: 14px;
      margin-bottom: 10px;
    }
    &.active::after {
      content: "以选择";
    position: absolute;
    color: red;
    width: 200px;
    height: 200px;
    border: 1px dashed;
    text-align: center;
    line-height: 200px;
    font-size: 26px;
    border-radius: 50%;
    top: 10px;
    transform: rotate(45deg);
    opacity: .7;
    transition: all .5s;
    }
  }
}
</style>
