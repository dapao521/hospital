<script setup>
import { defineComponent, onMounted, ref } from "vue";
import { User } from "@element-plus/icons-vue";
import jiuzhengren from "@/components/jiuzhengren.vue";
import { getPatientapi, getHospitoldocapi,submitOrderapi } from "@/api/user";
import { useRoute} from "vue-router";
import router from "../../../router";
import { ElMessage } from "element-plus";

const route = useRoute();


defineComponent({
  name: "MyComponent",
  // 组件的其他选项和逻辑
});

//获取就诊人数据
let Patient = ref([]);
const getPatient = async () => {
  const { data } = await getPatientapi();
  // console.log(data);
  Patient.value = data;
};
onMounted(() => {
  getPatient();
});

//获取就诊医生数据
const id = ref(route.query.id);
let Hospitoldoc = ref([]);
const getHospitoldoc = async () => {
  const { data } = await getHospitoldocapi(id.value);
  // console.log(data);
  Hospitoldoc.value = data;
};
onMounted(() => {
  getHospitoldoc();
});

// 点击高亮
const activeIndex = ref(-1);
const onclick = (index) => {
  //点击设置高亮
  activeIndex.value = index;
};

// 提交挂号订单
const data1 = ref();
const guahao = async () => {
  try {
    const { data } = await submitOrderapi(Hospitoldoc.value.hoscode, id.value, Patient.value[activeIndex.value].id);
  // console.log(data);
  data1.value = data
  router.push({
    path: "/user/guahaodingdan",
    query: {
      id: data1.value
    }
  })
  }
  catch (error) {
    ElMessage({
      message: "挂号失败",
      type: "error",
    })
  }

}

// 添加纠正人
const tianjia = () => {
  router.push({
    path: "/user/jiuzhengrenguanli",
    query: {
      type:'add'
    }
  })
}

// 路由跳转
const edit = (item) => {
  router.push({
    path: "/user/jiuzhengrenguanli",
    query: {
      type: 'add',
      id: item.id
    }
  })
}
</script>

<template>
  <h1>确认挂号信息</h1>
  <div class="contianer">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>请点击选择纠正人</span>
          <el-button class="button" type="primary" :icon="User" @click="tianjia">
            添加纠正人
          </el-button>
        </div>
      </template>
      <div class="text">
        <jiuzhengren
          @click="onclick(index)"
          @edit="edit(item)"
          v-for="(item, index) in Patient"
          :key="item"
          class="jiuzhengren"
          :item="item"
            :index="index"
            :activeIndex="activeIndex"
        />
      </div>
    </el-card>

    <el-card class="box-card1">
      <template #header>
        <div class="card-header1">
          <span>挂号信息</span>
        </div>
      </template>
      <div class="text1">
        <el-descriptions class="margin-top" :column="2" border>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <user />
                </el-icon>
                就筝日期
              </div>
            </template>
            {{ Hospitoldoc?.updateTime }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">就真医院</div>
            </template>
            {{ Hospitoldoc.param?.hosname }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">就诊科室</div>
            </template>
            {{ Hospitoldoc.param?.depname }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">医生姓名</div>
            </template>
            {{ Hospitoldoc?.docname }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">医生卑职</div>
            </template>
            {{ Hospitoldoc?.title }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">医生专长</div>
            </template>
            {{ Hospitoldoc?.skill }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">医生服务费</div>
            </template>
            {{ Hospitoldoc?.amount }}人命币
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
  </div>

  <div class="queren">
    <el-button type="primary" :icon="User" class="queren" :disabled="activeIndex === -1" @click="guahao">确认挂号</el-button>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 40px;
  text-align: center;
  font-weight: bold;
}
.contianer {
  margin-top: 50px;
  margin-left: 50px;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .text {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .jiuzhengren {
      width: 32%;
    }
  }

  .box-card1 {
    margin-top: 30px;
    .card-header1 {
      font-size: 18px;
    }
  }
}
.queren {
  margin: 40px 0;
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
