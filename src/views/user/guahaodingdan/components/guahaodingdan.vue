<script setup>
import { defineComponent, onMounted, ref } from "vue";
import { getOrderapi,cancelOrderapi,createNativeapi,queryPayStatusapi } from '@/api/user'
import { useRoute } from "vue-router";
// 引入qrcode 把请求到的支付数据  转成二维码
import QRCode from 'qrcode'
import { ElMessage } from "element-plus";

const route = useRoute();
let timer = null
defineComponent({
  name: "MyComponent",
  // 组件的其他选项和逻辑
});

// 获取订单数据
const id = route.query.id
const order = ref({})
const getOrder = async () => {
  const res = await getOrderapi(id)
  order.value = res.data
  // console.log(order.value);
}

onMounted(() => {
  getOrder()
})

// 取消订单
const queding = async () => {
  try {
    await cancelOrderapi(id)
    getOrder()
  } catch (error) {
    console.log(error);
  }
}

// 立即支付
const erweima = ref('')
const dialogTableVisible = ref(false)
const openDialog = async () => {
  dialogTableVisible.value = true
  const { data } = await createNativeapi(id)
  // 把请求到的支付数据  转成二维码
  QRCode.toDataURL(data.codeUrl)
  .then(url => {
    erweima.value = url
  })
  // 每隔几秒向服务器询问 支付状态
   timer =  setInterval(async () => {
    const { data } = await queryPayStatusapi(id)
    console.log(data);
    if (data) {
      clearInterval(timer)
      dialogTableVisible.value = false
      ElMessage.success('支付成功')
      getOrder()
    }
  },2000)
}

// 关闭时 清除定时器
const closeDialog = () => {
  dialogTableVisible.value = false
  clearInterval(timer)
}
// 关闭时  清除定时器
const close = () => {
  clearInterval(timer)
}
</script>

<template>
  <div class="box">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>挂号详情</span>
        </div>
      </template>
      <div class="zhongjian">
        <div class="yuyue">
          <el-tag class="ml-2" type="success">
            <svg t="1701688550688" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="14610" width="16" height="16">
              <path
                d="M825.768 376.016 825.768 376.016 475.889 731.658l0 0c-8.265 8.395-19.68 13.595-32.287 13.595-12.607 0-24.022-5.2-32.29-13.595l0 0L213.584 530.629l0 0c-8.26-8.355-13.372-19.96-13.372-32.775 0-25.63 20.442-46.372 45.617-46.372 12.607 0 24.027 5.195 32.292 13.592l0 0 165.48 168.17 317.637-322.864 0 0c8.265-8.355 19.68-13.552 32.285-13.552 25.17 0 45.625 20.78 45.625 46.367C839.148 356.012 834.033 367.619 825.768 376.016L825.768 376.016 825.768 376.016z"
                fill="#272636" p-id="14611"></path>
            </svg>{{ order.param?.orderStatusString }}</el-tag>
        </div>
        <div class="tubiao">
          <img src="@/assets/qww474.png" alt="" />
          <p>微信关注，预约挂号</p>
          <p>“快速预约挂号”</p>
        </div>
      </div>

      <div class="bottom">
        <div class="left">
          <el-descriptions class="margin-top" :column="1" border>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊人信息</div>
              </template>
              {{ order?.patientName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊日期</div>
              </template>
              {{ order?.reserveDate }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊医院</div>
              </template>
              {{ order?.hosname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊科室</div>
              </template>
              {{ order?.depname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">医生职称</div>
              </template>
              {{ order?.title }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">医生服务费</div>
              </template>
              {{ order?.amount }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">挂号单号</div>
              </template>
              kooriookami
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">挂号时间</div>
              </template>
              {{ order?.createTime }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="right">
          <el-card class="box-card1">
            <template #header>
              <div class="card-header1">
                <span>注意事项</span>

              </div>
            </template>
            <p>1.asbifuasuifhuiashdfiuasbfiubasiubcihasdbchisbdichbsdihvbdsbvuhsbvuchvvsebvchudsbcsdbcsbs</p>
            <p style="color: red;">2.cbiuysdgbcvuysdkagjbcvuysdfgbfuvyjrdfsfv</p>
            <p>3.dsnviubsdfuycyejrsfvr</p>
            <p>4.fuewiufbciuywed</p>
            <p>5.fehiuwdsvghbeuwiygfiyewgsdiuhbuihbiu</p>
          </el-card>
        </div>
      </div>

      <div class="botton" v-if="order?.orderStatus === 0 || order?.orderStatus === 1">
        <el-popconfirm title="确定删除吗" @confirm="queding">
          <template #reference>
            <el-button>取消预约</el-button>
          </template>
        </el-popconfirm>
        <el-button type="primary" v-if="order?.orderStatus !== -1" @click="openDialog">立即支付</el-button>
      </div>
    </el-card>
  </div>

    <!-- 二维码支付结构 -->
  <el-dialog v-model="dialogTableVisible" title="微信支付" width="400">
   <div class="qrcode">
    <img :src="erweima" alt="">
    <p>请使用微信扫一扫</p>
    <p>扫描二维码完成支付</p>
   </div>
    <template #footer>
      <el-button type="primary" @click="closeDialog" @close="close">关闭窗口</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.box {
  margin-left: 20px;

  .box-card {
    .card-header {
      // 字体大小
      font-size: 20px;
      height: 40px;
      line-height: 40px;
    }

    .zhongjian {
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;

      .yuyue {
        .ml-2 {
          display: inline;
        }
      }

      .tubiao {
        display: flex;

        img {
          width: 50px;
          border-radius: 50%;
        }

        p {
          // 换行
          line-height: 50px;
          margin-left: 20px;
        }
      }
    }

    .bottom {
      display: flex;
      // justify-content: space-between;
      padding: 20px 0;

      .left {
        // flex: 3;
        min-width: 350px;
      }

      .right {
        // flex: 1;
        max-width: 550px;
        margin-left: 25px;

        .box-card1 {
          min-height: 321px;

          p {
            word-break: normal;
            word-wrap: break-word;
            line-height: 30px;
          }
        }
      }
    }

    .botton {
      margin: 20px 20px 0;
    }
  }
}
.qrcode{
  display: flex;
  flex-direction: column;
  align-items: center;
  img{
    width: 200px;
  }
  p{
    margin-top: 20px;
    line-height: 30px;
  }
}
</style>
