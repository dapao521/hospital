<script setup>
import { computed, defineComponent, ref, watch } from "vue";
import { useCounterStore } from "@/stores/counter";
import { loginapi, dengluapi, weixinloginapi } from "@/api/login";
import { Search, Lock } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const store = useCounterStore();

defineComponent({
  name: "MyComponent",
  // 组件的其他选项和逻辑
});

const ruleFormRef = ref();
const ruleForm = ref({
  mobile: "",
  yanzhengma: "",
});
const rules = ref({
  mobile: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: "请输入正确的11w手机号",
      trigger: "change",
    },
    { min: 11, max: 11, message: "请输入11位手机号", trigger: "blur" },
  ],
  yanzhengma: [
    { required: true, message: "请输入验证码", trigger: "change" },
    { min: 6, max: 6, message: "请输入6位验证码", trigger: "change" },
  ],
});
// 计算输入的手机号是否符合手机号
const isphone = computed(() => {
  return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
    ruleForm.value.mobile
  );
});

// 发送请求获取验证码
const huoquyanzhengma = async () => {
  const res = await loginapi(ruleForm.value.mobile);
  ruleForm.value.yanzhengma = res.data;
};

// 登录
const login = async () => {
  // 再次校验表单
  // console.log(ruleFormRef.value.validate());
  if (ruleFormRef.value.validate()) {
    const { data } = await dengluapi(
      ruleForm.value.mobile,
      ruleForm.value.yanzhengma
    );
    store.getToken(data);
    store.kaiguan();
    if (route.query.redirect) {
      router.replace({ path: route.query.redirect });
    } else {
      router.replace({ path: "/" });
      
    }
  }
};

const weixin = ref(true);
// 切换登录方式
const qiehuan = async () => {
  weixin.value = !weixin.value;
  if (!weixin.value) {
    // 切换到微信登录时 向服务器发送微信登录请求
    // 获取redirect_uri
    const redirect_uri = encodeURIComponent(window.location.origin + "/weixin");
    const { data } = await weixinloginapi(redirect_uri);
    //@ts-ignore
    new WxLogin({
      //找了半天 老子也不知道为啥报错
      self_redirect: true, //true：手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
      id: "login_container", // 第三方页面显示二维码的容器id
      appid: data.appid, //应用唯一标识，在微信开放平台提交应用审核通过后获得
      scope: "snsapi_login", //直接写snsapi_login
      redirect_uri: data.redirectUri, //重定向地址，需要进行UrlEncode
      state: data.state, //自己服务器重定向的地址携带用户信息
      style: "black", //提供"black"、"white"可选，默认为黑色
      href: "", //自定义样式链接，第三方可根据实际需求覆盖默认样式
    });
  }
};
// 对话框关闭时清空 input
const close = () => {
  // 清空input数据
  Object.assign(ruleForm.value, {
    mobile: "",
    yanzhengma: "",
  });
  // 清空上次表单校验结果
  // 切换到微信登录时 有bug   才加了这个if
  if (weixin.value) {
    ruleFormRef.value.resetFields();
  }
};

// 监听点击微信登录事件
watch(()=> weixin.value, ()=>{
  if(!weixin.value){
    store.saomacunchu()
    
  }
})
</script>

<template>
  <div class="login">
    <el-dialog
      v-model="store.centerDialogVisible"
      title="用户登录"
      width="50%"
      align-center
      @close="close"
    >
      <el-row>
        <el-col :span="12">
          <el-form
            class="demo-form-inline"
            v-if="weixin"
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
          >
            <el-form-item prop="mobile">
              <el-input
                :prefix-icon="Search"
                v-model="ruleForm.mobile"
                placeholder="请输入手机号"
              />
            </el-form-item>
            <el-form-item prop="yanzhengma">
              <el-input
                :prefix-icon="Lock"
                v-model="ruleForm.yanzhengma"
                placeholder="请输入手机验证码"
              />
            </el-form-item>
            <el-button :disabled="!isphone" @click="huoquyanzhengma"
              >获取验证码</el-button
            >
            <el-button
              type="primary"
              style="width: 60%"
              @click="login"
              :disabled="!isphone"
              >登录</el-button
            >
            <div class="weixin" @click="qiehuan">
              <span>微信扫码登录</span>
              <svg
                t="1701089916868"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="7405"
                width="32"
                height="32"
              >
                <path
                  d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z"
                  fill="#1afa29"
                  p-id="7406"
                ></path>
              </svg>
            </div>
          </el-form>
          <div class="saoma" v-else>
            <!-- 二维码登录 容器-->
            <div id="login_container"></div>
            <div class="shouji" @click="qiehuan">
              <span>手机验证码登录</span>
              <svg
                t="1701090923736"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8721"
                width="32"
                height="32"
              >
                <path
                  d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                  p-id="8722"
                  fill="#d81e06"
                ></path>
              </svg>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="right">
            <div class="right1">
              <img src="@/assets/下载.png" alt="" />
              <svg
                t="1701089916868"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="7405"
                width="16"
                height="16"
              >
                <path
                  d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z"
                  fill="#8a8a8a"
                  p-id="7406"
                ></path>
              </svg>
              <p>微信扫一扫关注</p>
              <p>“快速预约挂号”</p>
            </div>
            <div class="right2">
              <img src="@/assets/下载.png" alt="" />
              <svg
                t="1701090923736"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8721"
                width="16"
                height="16"
              >
                <path
                  d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                  p-id="8722"
                ></path>
              </svg>
              <p>扫一扫下载</p>
              <p>“预约挂号”APP</p>
            </div>
          </div>
          <h1>xxxxxxx官方指定平台</h1>
          <h1>快速挂号 安全放心</h1>
        </el-col>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="store.kaiguan">取消登录</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.login {
  ::v-deep(.el-dialog__header) {
    border-bottom: 2px solid #7f7f7f;
  }
  .demo-form-inline {
    border: 2px solid #7f7f7f;
    padding: 20px;

    .weixin {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .right {
    margin-left: 30px;
    display: flex;
    justify-content: space-between;
    .right1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        margin: 10px 0;
      }
    }
    .right2 {
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        margin: 10px 0;
      }
    }
  }
  h1 {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin: 20px 0 0 0;
  }

  // 扫码
  .saoma {
    border: 2px solid #7f7f7f;
    display: flex;
    flex-direction: column;
    align-items: center;
    .ma {
      border: 1px solid #7f7f7f;
      padding: 10px;
      margin: 20px 0;
    }
    .shouji {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        margin-top: 30px;
      }
    }
  }
}
</style>
