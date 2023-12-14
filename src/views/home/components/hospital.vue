<script setup>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const go = () => {
  // 跳转时传递参数
  router.push({ path: "/hospitol" ,query:{id:1,name:"北京医院"}});
};

defineComponent({
  name: "MyComponent",
  // 组件的其他选项和逻辑
});
</script>

<template>
  <div class="hospitao" @click="go">
    <el-card class="box-card" shadow="hover" v-for="item in 10" :key="item">
      <div class="content">
        <div class="left">
          <div class="hospitol-name">北京医院</div>
          <div class="tip">
            <div class="level">
              <svg
                t="1700569502852"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4341"
                width="32"
                height="32"
              >
                <path
                  d="M481.3 494.7h61.4v64.6h-61.4zM481.8 627.3h61.9v63.3h-61.9zM480.8 362.6h61.8v61.2h-61.8zM348.1 363.2h59.8v62.1h-59.8zM612.6 362.1H673v62.7h-60.4zM347.2 494.9h62v63.5h-62zM612.5 495h62v63.3h-62zM346.9 627.6h61.5v63.7h-61.5zM613.2 627h61.2v63.6h-61.2z"
                  fill="#E60012"
                  p-id="4342"
                ></path>
                <path
                  d="M897.3 893.9V594.4c0-49-39.7-88.7-88.7-88.7H784V339.4c0-49.1-39.8-88.8-88.8-88.8H529.9v-72.4h89.8v-43.3h-89.8v-73h-46.6v72.8h-89.8V178h89.8v72.4H318.2c-49.1 0-88.8 39.8-88.8 88.8v166.3h-19.8c-49 0-88.7 39.7-88.7 88.7v299.5H59.1v44.4h900v-44.4h-61.8z m-730.6 0V594.4c0-24.5 19.9-44.4 44.4-44.4h18.3v343.8h-62.7z m107 0V339.3c0-24.5 19.9-44.4 44.4-44.4h377.1c24.5 0 44.4 19.9 44.4 44.4v554.6H273.7z m580.7 0h-70.5V550H810c24.5 0 44.4 19.9 44.4 44.4v299.5z"
                  fill="#E60012"
                  p-id="4343"
                ></path>
              </svg>
              三级甲等
            </div>
            <div class="time">
              <svg
                t="1700569632886"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5405"
                width="32"
                height="32"
              >
                <path
                  d="M827.871087 196.128913C743.498468 111.756293 631.321596 65.290005 512 65.290005c-119.319549 0-231.499491 46.465265-315.871087 130.837884S65.290005 392.680451 65.290005 512s46.465265 231.499491 130.837884 315.871087 196.551538 130.837884 315.871087 130.837884c119.321596 0 231.499491-46.465265 315.871087-130.837884S958.708971 631.319549 958.708971 512 912.243707 280.500509 827.871087 196.128913zM531.556405 917.246651l0-74.145697c0-11.31572-9.174963-20.491707-20.491707-20.491707-11.316743 0-20.491707 9.174963-20.491707 20.491707l0 74.059739C283.276738 906.322857 116.693746 739.164766 106.755396 531.634176l72.351841 0c11.31572 0 20.491707-9.174963 20.491707-20.491707 0-11.31572-9.174963-20.491707-20.491707-20.491707l-72.273047 0c10.769274-206.737528 177.01253-373.005342 383.740848-383.813502l0 72.346725c0 11.316743 9.174963 20.491707 20.491707 20.491707 11.31572 0 20.491707-9.17394 20.491707-20.491707L531.558451 106.752326c207.593012 9.901511 374.807385 176.539762 385.609405 383.89946l-74.142627 0c-11.316743 0-20.491707 9.174963-20.491707 20.491707 0 11.316743 9.174963 20.491707 20.491707 20.491707l74.220399 0C907.275555 739.78796 739.720422 907.317511 531.556405 917.246651z"
                  fill="#272636"
                  p-id="5406"
                ></path>
                <path
                  d="M532.098757 503.118726 532.098757 258.240529c0-11.316743-9.174963-20.491707-20.491707-20.491707-11.31572 0-20.491707 9.17394-20.491707 20.491707l0 254.66612c0 7.858992 4.429893 14.677281 10.924817 18.114566L693.447539 722.42757c4.002151 4.000104 9.245572 6.001691 14.490016 6.001691s10.487865-2.001587 14.490016-6.001691c8.002254-8.002254 8.002254-20.977777 0-28.980032L532.098757 503.118726z"
                  fill="#272636"
                  p-id="5407"
                ></path>
              </svg>
              10:00
            </div>
          </div>
        </div>
        <div class="right">
          <img src="@/assets/qww471.png" alt="" />
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.hospitao {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .box-card {
    width: 48%;
    margin: 10px 0;
  }
  .content {
    display: flex;
    justify-content: space-between;
    .left {
      width: 60%;
      display: flex;
      flex-direction: column;
      .hospitol-name {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
        margin-left: 20px;
      }
      .tip {
        margin-top: 20px;
        margin-left: 20px;
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        color: #7f7f7f;
        .level {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .time {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .right {
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
  }
}
</style>
