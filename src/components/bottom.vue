<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "MyComponent",
  // 组件的其他选项和逻辑
});
</script>

<template>

  <div class="buttom">
    <div class="content">
      <div class="left">fiuabiu封闭u阿爸父i唯一保存viufcfiuebasfiue</div>
      <div class="right">
        <span> 联系我们</span>
        <span>和欧伙伴</span>
        <span>用户协议</span>
        <span>隐私政策</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.buttom {
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  border-top: 1px solid #ccc;
  .content {
    width: 1200px;
    height: 100%;
    // background-color: aqua;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
        font-size: 16px;
    }
    .right{
        span{
            font-size: small;
            margin: 0 5px;
            cursor: pointer;
            &:hover{
                color: red;
                text-decoration: underline;

            }
        }
    }
  }
}
</style>
