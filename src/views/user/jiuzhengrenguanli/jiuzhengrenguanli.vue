<script setup>
import { defineComponent, onMounted, ref,watch } from "vue";
import { CirclePlus } from "@element-plus/icons-vue";
import jiuzhengren from "@/components/jiuzhengren.vue";
import { getPatientListapi, getAreaapi, savePatientapi, deletePatientapi } from "@/api/user";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

defineComponent({
  name: "MyComponent",
  // 组件的其他选项和逻辑
});

// 获取数据
const PatientList = ref();
const getPatientList = async () => {
  const res = await getPatientListapi();
  // console.log(res.data);
  PatientList.value = res.data;
};
// 获取省市区
const props = {
  lazy: true,
  async lazyLoad(node, resolve) {
    // console.log(node);
    const { data } = await getAreaapi(node.data.value || '86');
    // console.log(data);
    const nodes = data.map((item) => ({
      value: item.value,
      label: item.name,
      leaf: !item.hasChildren,
    }));
    resolve(nodes);
  },
};

onMounted(() => {
  getPatientList();
  // 检查是否是其他页面跳转过来
  if (route.query.type === 'add') {
    isjiuzhen.value = false
  }
});

// 切换就诊人
const isjiuzhen = ref(true);
const isopen = (item) => {
  isjiuzhen.value = false;
  //子组件传过来的数据
  // console.log(item);
  patient.value = item
};

// 传入组件是否显示删除
const isshow = ref(true);

const patient = ref({
  address: "",
  addressSelected: "",
  birthdate: "",
  certificatesNo: "",
  certificatesType: "",
  contactsCertificatesNo: "",
  contactsCertificatesType: "",
  contactsName: "",
  contactsPhone: "",
  isInsure: "0",
  isMarry: "0",
  name: "",
  phone: "",
  sex: "0",

})

//清空数组
const clear = () => {
  patient.value = {
    // 防止有id
    id:null,
    address: "",
    addressSelected: "",
    birthdate: "",
    certificatesNo: "",
    certificatesType: "",
    contactsCertificatesNo: "",
    contactsCertificatesType: "",
    contactsName: "",
    contactsPhone: "",
    isInsure: 0,
    isMarry: 0,
    name: "",
    phone: "",
    sex: 0,
  }

}

// 添加就诊人
const savePatient = async () => {
  const res = await savePatientapi(patient.value)
  if (res.code === 200) {
    ElMessage.success('添加成功')
    isjiuzhen.value = true
    getPatientList()
    clear()
    // 如果是其他页面跳转过来 保存后返回
    if (route.query.type === 'add') {
      router.go(-1)
    }
  } else {
    ElMessage.error('添加失败')

  }
}

// 删除就诊人
const delPatient = async (id) => {
  await deletePatientapi(id)
  ElMessage.success('删除成功')
  getPatientList()
}

watch(() => PatientList.value, () => {
  if (route.query.id) {
    let value = PatientList.value.find(item => item.id == route.query.id)
    if (value) {
      patient.value = value
    }
    
  }
})
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>就诊人管理</span>
        <el-button type="primary" @click="isopen"><el-icon>
            <CirclePlus />
          </el-icon>添加就诊人</el-button>
      </div>
    </template>
    <!-- 就诊人预览 -->
    <div class="jiuzhenren" v-if="isjiuzhen">
      <jiuzhengren @edit="isopen" @del="delPatient(item.id)" class="item" v-for="(item, index) in PatientList"
        :key="item.id" :item="item" :index="index" :isshow="isshow"></jiuzhengren>
    </div>

    <!-- 添加就诊人 -->
    <div class="from" v-else>
      <el-form>
        <el-divider content-position="left">就诊人信息</el-divider>
        <el-form-item label="用户姓名" style="width: 60%; margin: 10px auto">
          <el-input placeholder="请输入用户姓名" v-model="patient.name"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" style="width: 60%; margin: 10px auto">
          <el-select style="width: 100%" v-model="patient.certificatesType">
            <el-option label="身份证" value="10"></el-option>
            <el-option label="户口本" value="20"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" style="width: 60%; margin: 10px auto">
          <el-input placeholder="请输入证件号码" v-model="patient.certificatesNo"></el-input>
        </el-form-item>
        <el-form-item label="性别" style="width: 60%; margin: 10px auto">
          <el-radio-group style="margin-left: 25px" v-model="patient.sex">
            <el-radio label="1">女</el-radio>
            <el-radio label="0">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期" style="width: 60%; margin: 10px auto">
          <el-date-picker type="date" placeholder="选择日期" style="width: 100%" v-model="patient.birthdate"
            value-format="YYYY-MM-DD">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" style="width: 60%; margin: 10px auto">
          <el-input placeholder="请输入手机号码" v-model="patient.phone"></el-input>
        </el-form-item>
        <el-divider content-position="left">建档信息</el-divider>
        <el-form-item label="婚姻状况" style="width: 60%; margin: 10px auto">
          <el-radio-group style="margin-left: 25px" v-model="patient.isMarry">
            <el-radio label="1">已婚</el-radio>
            <el-radio label="0">未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自费/医保" style="width: 60%; margin: 10px auto">
          <el-radio-group style="margin-left: 25px" v-model="patient.isInsure">
            <el-radio label="1">自费</el-radio>
            <el-radio label="0">医保</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前住址" style="width: 60%; margin: 10px auto">
          <el-cascader :props="props" style="width: 100%" v-model="patient.address" />
        </el-form-item>
        <el-form-item label="详细住址" style="width: 60%; margin: 10px auto">
          <el-input placeholder="请输入详细住址" v-model="patient.addressSelected"></el-input>
        </el-form-item>

        <el-divider content-position="left">联系人信息</el-divider>
        <el-form-item label="用户姓名" style="width: 60%; margin: 10px auto">
          <el-input placeholder="请输入用户姓名" v-model="patient.contactsName"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" style="width: 60%; margin: 10px auto">
          <el-select style="width: 100%" v-model="patient.contactsCertificatesType">
            <el-option label="身份证" value="10"></el-option>
            <el-option label="户口本" value="20"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份号码" style="width: 60%; margin: 10px auto">
          <el-input placeholder="请输入身份号码" v-model="patient.contactsCertificatesNo"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" style="width: 60%; margin: 10px auto">
          <el-input placeholder="请输入手机号码" v-model="patient.contactsPhone"></el-input>
        </el-form-item>
        <el-form-item style="width: 60%; margin: 40px 50%">
          <el-button type="primary" @click="savePatient">保存</el-button>
          <el-button @click="clear">重写</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.box-card {
  margin-left: 20px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .jiuzhenren {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    .item {
      width: 32%;
    }
  }
}
</style>
