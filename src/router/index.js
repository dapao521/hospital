import { createRouter, createWebHistory } from "vue-router";
import { useCounterStore } from "@/stores/counter.js"
//  他妈的  store要在 路由守卫里面引入   浪费老子半天时间找原因

const router = createRouter({
  //路由的模式设置
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      component: () => import("@/views/home/index.vue"),
      meta: {
        title: "首页",
      }
    },
    {
      path: "/hospitol",
      component: () => import("@/views/hospitol/index.vue"),
      redirect: "/hospitol/yuyuetongzhi",
      children: [
        {
          path: "yuyuetongzhi",
          component: () =>
            import("@/views/hospitol/yuyuetongzhi/yuyuetongzhi.vue"),
            meta: {
              title: "预约通知",
            },
        },
        {
          path: "yuyueguahao",
          component: () =>
            import("@/views/hospitol/yuyueguahao/yuyueguahao.vue"),
            meta: {
              title: "预约挂号",
            },
        },
        {
          path: "yiyuanxiangqing",
          component: () =>
            import("@/views/hospitol/yiyuanxiangqing/yiyuanxiangqing.vue"),
            meta: {
              title: "医院详情",
            },
        },
        {
          path: "tingzhenxinxi",
          component: () =>
            import("@/views/hospitol/tingzhenxinxi/tingzhenxinxi.vue"),
            meta: {
              title: "停诊信息",
            },
        },
        {
          path: "chaxun",
          component: () => import("@/views/hospitol/chaxun/chaxun.vue"),
          meta: {
            title: "查询信息",
          },
        },
        {
          path: "guahao",
          component: () => import("@/views/hospitol/yuyueguahao/guahao.vue"),
          meta: {
            title: "挂号",
          },
        },
        {
          path: "querenxinxi",
          component: () =>
            import("@/views/hospitol/yuyueguahao/querenxinxi.vue"),
            meta: {
              title: "确认信息",
            },
        },
      ],
    },
    {
      path: "/weixin",
      component: () => import("@/views/weixin/weixin.vue"),
    },
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/user",
      component: () => import("@/views/user/index.vue"),
      redirect: "/user/shimingrenzheng",
      children: [
        {
          path: "shimingrenzheng",
          component: () =>
            import("@/views/user/shimingrenzheng/shimingrenzheng.vue"),
        },
        {
          path: "guahaodingdan",
          component: () =>
            import("@/views/user/guahaodingdan/guahaodingdan.vue"),
        },
        {
          path: "jiuzhengrenguanli",
          component: () =>
            import("@/views/user/jiuzhengrenguanli/jiuzhengrenguanli.vue"),
        },
        {
          path: "zhanghaoxinxi",
          component: () =>
            import("@/views/user/zhanghaoxinxi/zhanghaoxinxi.vue"),
        },
        {
          path: "yijianfankui",
          component: () => import("@/views/user/yijianfankui/yijianfankui.vue"),
        },
      ],
    },
  ],
  // 滚动行为  控制每次跳转滚动到顶部
  // scrollBehavior 方法接收 to 和 from 路由对象。
  // 第三个参数 savedPosition 当且仅当 popstate 导航(通过浏览器的 前进/ 后退 按钮触发) 时才可用。
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

  // 路由守卫


router.beforeEach((to, from, next) => {
  const CounterStore = useCounterStore();
  const fangxing = [
    "/home",
    "/hospitol/yuyuetongzhi",
    "/hospitol/yuyueguahao",
    "/hospitol/tingzhenxinxi",
    "/hospitol/chaxun",
    "/hospitol/yiyuanxiangqing",
  ];

  // 设置动态网页标题
  if (to.meta.title) {
    document.title = `上一桶-${to.meta.title}`;
  }

  // 登录拦截
  if (CounterStore.token.token) {
    next();
  } else {
    if (fangxing.includes(to.path)) {
      next();
    } else {
      next({path: "/home" , query: { redirect: to.path }});
      // 打开登录弹窗
      CounterStore.kaiguan()

    }
  }

});
  // 后置守卫
//  router.afterEach((to, from, next) => {})

export default router;
