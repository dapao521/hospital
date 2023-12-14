<script setup>
import { defineComponent, onMounted, ref } from 'vue';
import { getUserapi, userAuthapi} from '@/api/user'
import { ElMessage } from 'element-plus'

defineComponent({
  name: 'MyComponent',
  // 组件的其他选项和逻辑
})

const form=ref()
// 收集数据
const formitem = ref({
  certificatesNo: "",
  certificatesType: "",
  certificatesUrl: "",
  name: ""
})
const upload = ref()
const dialogVisible = ref(false)

// 数据校验
const rules = ref({
  certificatesNo: [
    { required: true, message: '请输入证件号', trigger: 'blur' },
  ],
  certificatesType: [
    { required: true, message: '请选择证件类型', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' },
  ],
  certificatesUrl: [
    { required: true, message: '请上传证件照', trigger: 'blur' },
    {validate: (callback) => {
      if (!formitem.value.certificatesUrl) {
        callback(new Error('请上传证件照'))
      }
    }}
  ]
})

// 获取用户信息
const user = ref()
const getUser = async () => {
  const res = await getUserapi()
  // console.log(res.data);
  user.value = res.data
}
onMounted(() => {
  getUser()
})

// 实名认证
const shimingrenzheng = async () => {
  await form.value.validate()
  const res = await userAuthapi(formitem.value)
  // console.log(res.data);
  if (res.code === 200) {
    ElMessage.success('实名认证成功')
    getUser()
  }
}

// 超出限制
const handleExceed = () => {
  ElMessage.error('超出限制')
}

// 上传成功
const handleSuccess = (res) => {
  ElMessage.success('上传成功')
  // console.log(res);
  // 收集图片上传成功的地址
  formitem.value.certificatesUrl = res.data
}

// 图片预览
const handlePreview = () => {
  dialogVisible.value = true
}

// 重写
const resetForm = () => {
  formitem.value = {
    certificatesNo: "",
    certificatesType: "",
    name: ""
  }
  upload.value.clearFiles()
}

</script>


<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>实名信息</span>
      </div>
    </template>
    <p>
      <svg t="1701784069947" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="15705" width="16" height="16">
        <path
          d="M512 85.333333c235.637333 0 426.666667 191.029333 426.666667 426.666667S747.637333 938.666667 512 938.666667 85.333333 747.637333 85.333333 512 276.362667 85.333333 512 85.333333z m0 544a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z m0-362.666666a42.666667 42.666667 0 0 0-42.666667 42.666666v234.666667a42.666667 42.666667 0 1 0 85.333334 0V309.333333a42.666667 42.666667 0 0 0-42.666667-42.666666z"
          fill="#d81e06" p-id="15706"></path>
      </svg>完成实名认证后才能添加就诊人，正常进行挂号，为了不印象后续步骤，建议提前进行实名认真
    </p>

    <el-descriptions class="margin-top" :column="1" border v-if="user?.authStatus === 1">
      <el-descriptions-item label-align="center" :width="10">
        <template #label>
          <div class="cell-item">
            用户姓名
          </div>
        </template>
        {{ user?.name }}
      </el-descriptions-item>
      <el-descriptions-item label-align="center" :width="10">
        <template #label>
          <div class="cell-item">
            证件类型
          </div>
        </template>
        {{ user?.certificatesType == 10 ? '身份证' : '户口本' }}
      </el-descriptions-item>
      <el-descriptions-item label-align="center" :width="10">
        <template #label>
          <div class="cell-item">
            证件号码
          </div>
        </template>
        {{ user?.certificatesNo }}
      </el-descriptions-item>

    </el-descriptions>

    <el-form style="margin: 20px auto;width: 60%;" label-width="80px" ref="form" :rules="rules" :model="formitem"  v-else>
      <el-form-item label="用户姓名" prop="name">
        <el-input style="width: 300px" placeholder="请输入用户姓名" v-model="formitem.name"></el-input>
      </el-form-item>
      <el-form-item label="证件类型" prop="certificatesType">
        <el-select style="width: 300px" placeholder="请选择证件类型" v-model="formitem.certificatesType">
          <el-option value="10" label="身份证">身份证</el-option>
          <el-option value="20" label="户口本">户口本</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="certificatesNo">
        <el-input style="width: 300px" placeholder="请输入证件号码" v-model="formitem.certificatesNo"></el-input>
      </el-form-item>
      <el-form-item label="上传证件" prop="certificatesUrl">
        <el-upload list-type="picture-card" action="/api/oss/file/fileUpload?fileHost=userAuah" :limit="1"
          :on-exceed="handleExceed" :on-success="handleSuccess" :on-preview="handlePreview" ref="upload">
          <img src="@/assets/qww471.png" style="width: 100px ;height: 100px" alt="">
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="formitem.certificatesUrl" alt="Preview Image" style="width: 100%" />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="shimingrenzheng">提交</el-button>
        <el-button @click="resetForm">重写</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>


<style lang='scss' scoped>
.box-card {
  margin-left: 20px;

  p {
    font-size: 14px;
    color: #7f7f77;
    margin-top: 20px;
    margin-left: 50px;

  }

  .margin-top {
    margin-top: 20px;

    ::v-deep(.el-descriptions__cell) {
      width: 100px;
    }
  }
}
</style>
