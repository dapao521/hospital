import { ref } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const token = ref(JSON.parse(localStorage.getItem("token")) || []);

  // 获取token
  const getToken = (item) => {
    token.value = item;
  };

  // 清空token
  const clearToken = () => {
    token.value = "";
    localStorage.removeItem("token");
  }

  //控制登录框显示与关闭
  const centerDialogVisible = ref();
  //所有科室数据
  const keshi = ref([
    {
      names: "科室",
      id: 1,
      childred: [
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
      ],
    },
    {
      names: "父室",
      id: 2,
      childred: [
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
      ],
    },
    {
      names: "肿瘤室",
      id: 3,
      childred: [
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
      ],
    },
    {
      names: "脑袋是",
      id: 4,
      childred: [
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
      ],
    },
    {
      names: "科室",
      id: 5,
      childred: [
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
      ],
    },
    {
      names: "科室",
      id: 6,
      childred: [
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
      ],
    },
    {
      names: "完蛋快乐",
      id: 7,
      childred: [
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
      ],
    },
    {
      names: "神经科",
      id: 8,
      childred: [
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
      ],
    },
    {
      names: "文文静静科",
      id: 9,
      childred: [
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
      ],
    },
    {
      names: "国会议员科",
      id: 10,
      childred: [
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
      ],
    },
    {
      names: "父份额科",
      id: 11,
      childred: [
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
      ],
    },
    {
      names: "杀害科",
      id: 12,
      childred: [
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
      ],
    },
    {
      names: "地动山摇可科",
      id: 13,
      childred: [
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
      ],
    },
    {
      names: "如来神掌科",
      id: 14,
      childred: [
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
      ],
    },
    {
      names: "神的方法可",
      id: 15,
      childred: [
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
      ],
    },
    {
      names: "上平克",
      id: 16,
      childred: [
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
      ],
    },
    {
      names: "支行可",
      id: 17,
      childred: [
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
      ],
    },
    {
      names: "哈勃望远镜科",
      id: 18,
      childred: [
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
        { names: "科室1" },
        { names: "科室2" },
        { names: "科室3" },
        { names: "科室4" },
      ],
    },
  ]);

  //控制登录框显示与关闭
  const kaiguan = () => {
    if (centerDialogVisible.value) {
      centerDialogVisible.value = !centerDialogVisible.value;
    } else {
      centerDialogVisible.value = true;
    }
  };

  // 检测微信扫码登录 关闭与存储
  const saomacunchu = () => {

   let timer = setInterval(() => {
      const e = JSON.parse(localStorage.getItem("token")).token;

      if (e) {
        getToken(JSON.parse(localStorage.getItem("token")));
        centerDialogVisible.value = false;
        clearInterval(timer);
       
  }


    }, 1000);
  }
  return { token, getToken, keshi, centerDialogVisible, kaiguan, clearToken,saomacunchu };
}
  , {
    persist: {

      key: 'token',
      paths: ['token'],
    },
});