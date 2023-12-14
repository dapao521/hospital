<script setup>
import { defineComponent, ref, onMounted } from 'vue';
import { getOrderListapi,getPatientListapi } from '@/api/user'
import { useRouter } from 'vue-router';

const router = useRouter()
defineComponent({
  name: 'MyComponent',
  // 组件的其他选项和逻辑
});
const page = ref(1)
const pageSize = ref(10)
// 订单状态
const status = [
  {
    compent: '预约成功，带支付',
    status: '0'
  },
  {
    compent: '已支付',
    status: '1'
  },
  {
    compent: '已取消',
    status: '2'
  },
  {
    compent: '取消预约',
    status: '-1'
  },
]
const zhuangtai = ref()
const patient = ref()

// 就诊人改变时触发
const changePatient = async () => {
  const { data } = await getOrderListapi(page.value, pageSize.value, patient.value)
  console.log(data);
  list.value = data
}

// 订单状态改变时触发
const changestatus = async () => {
  const { data } = await getOrderListapi(page.value, pageSize.value,patient.value, zhuangtai.value)
  console.log(data);
  list.value = data

}

// 获取全部就诊人名单
const patientList = ref([])
const getPatient = async () => {
  const res = await getPatientListapi()
  // console.log(res.data);
  patientList.value = res.data.map(item => {
    return {
      id: item.id,
      name: item.name
    }
  })
}

// 获取数据
const list = ref([])
const getlist = async () => {
  const res = await getOrderListapi(
    page.value,
    pageSize.value
  )
  // console.log(res.data);
  list.value = res.data
}
onMounted(() => {
  getlist()
  getPatient()
})

// 分页器 页数改变时 触发
const handleSizeChange = () => {
  getlist()
}

//分页器 条数改变时触发
const handleCurrentChange = () => {
  getlist()
}

// 点击详情进入详情页面 并带id
const xiangqing = (row) => {
  router.push({ path: '/user/guahaodingdan', query: { id: row.id } })
}
</script>


<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>挂号订单</span>

      </div>
    </template>

    <div class="top">
      <el-form :inline="true">
        <el-form-item label="就诊人">
          <el-select placeholder="请选择患者" v-model="patient" @change="changePatient">
            <el-option :label="item.name" :value="item.id" v-for="item in patientList" :key="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select placeholder="请选择订单状态" v-model="zhuangtai" @change="changestatus">
            <el-option :label="item.compent" :value="item.status" v-for="item in status" :key="item.status" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-table style="width: 100%" border :data="list?.records">
        <el-table-column label="就诊时间" prop="reserveDate" />
        <el-table-column label="医院" prop="hosname" />
        <el-table-column label="科室" prop="depname" />
        <el-table-column label="医生" prop="title" />
        <el-table-column label="服务费" prop="amount" />
        <el-table-column label="就诊人" prop="patientName" />
        <el-table-column label="订单状态" prop="param.orderStatusString" />
        <el-table-column label="操作" align="center">
          <template #="{ row }">
            <el-button link type="primary" @click="xiangqing(row)">详情</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-pagination style="margin: 20px 10px" v-model:current-page="page" v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]" :background="true" layout=" prev, pager, next, jumper, ->,total, sizes"
        :total="list?.total || 0" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </el-card>
</template>


<style lang='scss' scoped>
.box-card {
  margin-left: 20px;
}
</style>
