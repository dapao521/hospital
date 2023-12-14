<script setup>
import { defineComponent, onMounted, ref } from "vue";
import { getHospitalguahaoapi, getHospitoldocapi } from "@/api/hospital";
import { useRouter } from "vue-router";

const router = useRouter();

defineComponent({
  name: "MyComponent",
  // 组件的其他选项和逻辑
});

const page = ref(1); //当前第几页
const limit = ref(6); //每页多少条
const hoscode = ref("1000_11"); //医院编号
const depcode = ref("200040878_11"); //科室编号
const workDate = ref(""); //挂号日期

//获取数据
const list = ref([]);
onMounted(() => {
  getHospitalguahaoapi(
    page.value,
    limit.value,
    hoscode.value,
    depcode.value
  ).then((res) => {
    list.value = res.data;
    // console.log(res.data);
  });
});

let total = ref(0);
// 分页切换重新获取数据
const handleSizeChange = () => {
  getHospitalguahaoapi(
    page.value,
    limit.value,
    hoscode.value,
    depcode.value
  ).then((res) => {
    list.value = res.data;
  });
};

// 获取点击的挂号日期
const workdoc = ref([]);
// 过滤出上午和下午
const shangwu = ref([]);
const xiawu = ref([]);

const onclick = async (item) => {
    workDate.value = item
    const { data } = await getHospitoldocapi(hoscode.value, depcode.value, workDate.value)
    workdoc.value = data
    // 过滤出上午和下午
    shangwu.value = workdoc.value.filter((item) => item.workTime == 0)
    xiawu.value = workdoc.value.filter((item) => item.workTime == 1)

}

// 挂号下单
const xiadan = (item) => {
    console.log(item);
  router.push({
      path: "/hospitol/querenxinxi",
      query: {
          id: item,
      }
  })
}
</script>

<template>
  <div class="box">
    <div class="top">
      <span>{{ list.baseMap?.hosname }}</span>
      <span>{{ list.baseMap?.bigname }}</span>
      <span>{{ list.baseMap?.depname }}</span>
    </div>
    <div class="content">
      <h1>{{ list.baseMap?.workDateString }}</h1>
      <div class="yuyue">
        <ul>
          <li
            :class="{ active: i.status >= 0 }"
            v-for="i in list?.bookingScheduleList"
            :key="i"
            @click="onclick(i.workDate)"
          >
            <div class="shangmian">{{ i.workDate }} {{ i.dayOfWeek }}</div>
            <div class="xiamian" v-if="i.status == -1">停止挂号</div>
            <div class="xiamian" v-if="i.status == 0">
              {{
                i.availableNumber == -1
                  ? "已满"
                  : ` 有号（${i?.availableNumber}）`
              }}
            </div>
            <div class="xiamian" v-if="i.status == 1">即将放号</div>
          </li>
        </ul>
        <el-pagination
          v-model:current-page="page"
          @current-change="handleSizeChange"
          layout="prev, pager, next"
          :total="list.total || total"
        />
      </div>
    </div>

    <div class="down" v-if="true">
      <div class="shangwu">
        <div class="biaoti">
          <svg
            t="1701267598430"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="11329"
            width="32"
            height="32"
          >
            <path
              d="M944.83968 673.2288 114.51392 673.2288c-16.37888 0-29.64992-13.36832-29.64992-29.88032 0-16.51712 13.26592-29.90592 29.64992-29.90592l830.32576 0c16.3584 0 29.64992 13.3888 29.64992 29.90592C974.4896 659.86048 961.19808 673.2288 944.83968 673.2288zM885.52448 326.89152c-11.58144 11.67872-30.35136 11.67872-41.94304 0-11.58144-11.67872-11.58144-30.60224 0-42.28096l41.94304-42.28096c11.58144-11.67872 30.35136-11.67872 41.92768 0 11.5968 11.66336 11.5968 30.60224 0 42.28096L885.52448 326.89152zM819.7376 553.66656c-27.50976-136.36096-146.58048-239.15008-290.05824-239.15008-143.49824 0-262.56384 102.79424-290.06848 239.15008L177.18784 553.66656c22.80448-168.61696 171.72992-298.95168 352.49152-298.95168 180.75136 0 329.68704 130.33472 352.46592 298.95168L819.7376 553.66656zM529.664 194.91328c-16.36352 0-29.6448-13.38368-29.6448-29.88032l0-59.8016c0-16.512 13.28128-29.89568 29.6448-29.89568 16.384 0 29.6704 13.3888 29.6704 29.89568l0 59.8016C559.3344 181.5296 546.048 194.91328 529.664 194.91328zM173.824 326.89152l-41.94304-42.28096c-11.57632-11.67872-11.57632-30.6176 0-42.28096 11.5968-11.67872 30.36672-11.67872 41.94304 0l41.92768 42.28096c11.5968 11.67872 11.5968 30.60224 0 42.28096C204.17536 338.56512 185.40544 338.56512 173.824 326.89152zM144.1792 733.02528l771.00032 0c16.37376 0 29.66016 13.38368 29.66016 29.90592 0 16.512-13.2864 29.89568-29.66016 29.89568L144.1792 792.82688c-16.384 0-29.66528-13.38368-29.66528-29.89568C114.51392 746.40896 127.7952 733.02528 144.1792 733.02528zM233.1392 852.608 826.2144 852.608c16.37376 0 29.66528 13.38368 29.66528 29.89568 0 16.51712-13.29152 29.9008-29.66528 29.9008L233.1392 912.40448c-16.37888 0-29.66016-13.38368-29.66016-29.9008C203.47392 865.9968 216.7552 852.608 233.1392 852.608z"
              fill="#E83828"
              p-id="11330"
            ></path>
          </svg>
          <h1>上午号源</h1>
        </div>
        <div class="shenti">
          <div class="item" v-for="item in shangwu" :key="item.id">
            <div class="zuobian">
              <div class="shang">
                <span>{{item?.title}}</span>
                <span>|</span>
                <span>{{item?.docname}}</span>
              </div>
              <div class="xia">
                <span>{{item?.skill}}</span>
              </div>
            </div>
            <div class="youbian">
              <span>¥{{item?.amount}}</span>
              <div class="anniu">
                <el-button type="primary" @click="xiadan(item.id)">剩余：{{item?.availableNumber}}</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="xiawu">
        <div class="biaoti">
          <svg
            t="1701267628338"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="13479"
            width="32"
            height="32"
          >
            <path
              d="M512 213.333333c12.8 0 21.333333-8.533333 21.333333-21.333333L533.333333 64c0-12.8-8.533333-21.333333-21.333333-21.333333s-21.333333 8.533333-21.333333 21.333333l0 128C490.666667 204.8 499.2 213.333333 512 213.333333zM640 810.666667l-42.666667 0 0-106.666667c0-12.8-8.533333-21.333333-21.333333-21.333333l-128 0c-12.8 0-21.333333 8.533333-21.333333 21.333333l0 106.666667-42.666667 0c-12.8 0-21.333333 8.533333-21.333333 21.333333 0 6.4 2.133333 10.666667 6.4 14.933333l128 128c4.266667 4.266667 8.533333 6.4 14.933333 6.4 6.4 0 10.666667-2.133333 14.933333-6.4l128-128c4.266667-4.266667 6.4-8.533333 6.4-14.933333C661.333333 819.2 652.8 810.666667 640 810.666667zM512 930.133333 435.2 853.333333 448 853.333333c12.8 0 21.333333-8.533333 21.333333-21.333333l0-106.666667 85.333333 0 0 106.666667c0 12.8 8.533333 21.333333 21.333333 21.333333l12.8 0L512 930.133333zM753.066667 300.8l89.6-89.6c8.533333-8.533333 8.533333-21.333333 0-29.866667-8.533333-8.533333-21.333333-8.533333-29.866667 0l-89.6 89.6c-8.533333 8.533333-8.533333 21.333333 0 29.866667C731.733333 309.333333 744.533333 309.333333 753.066667 300.8zM960 512l-192 0c0-140.8-115.2-256-256-256-140.8 0-256 115.2-256 256L64 512c-12.8 0-21.333333 8.533333-21.333333 21.333333s8.533333 21.333333 21.333333 21.333333l896 0c12.8 0 21.333333-8.533333 21.333333-21.333333S972.8 512 960 512zM298.666667 512c0-117.333333 96-213.333333 213.333333-213.333333s213.333333 96 213.333333 213.333333L298.666667 512zM270.933333 300.8c8.533333 8.533333 21.333333 8.533333 29.866667 0 8.533333-8.533333 8.533333-21.333333 0-29.866667L211.2 179.2c-8.533333-8.533333-21.333333-8.533333-29.866667 0-8.533333 8.533333-8.533333 21.333333 0 29.866667L270.933333 300.8z"
              fill="#1296db"
              p-id="13480"
            ></path>
          </svg>
          <h1>下午号源</h1>
        </div>
        <div class="shenti">
          <div class="item" v-for="item in xiawu" :key="item.id">
            <div class="zuobian">
              <div class="shang">
                <span>{{item?.title}}</span>
                <span>|</span>
                <span>{{item?.docname}}</span>
              </div>
              <div class="xia">
                <span>{{item?.skill}}</span>
              </div>
            </div>
            <div class="youbian">
              <span>¥{{item?.amount}}</span>
              <div class="anniu">
                <el-button type="primary" @click="onclick(item.id)">剩余：{{item?.availableNumber}}</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fanghao" v-else>
      <h1 class="big">2022把那是否i呢你啊十分艰难</h1>
      <h1>放号</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  margin-top: 50px;
  margin-left: 30px;
  .top {
    display: flex;
    color: #7f7f7f;
    span {
      margin-right: 20px;
    }
    span:nth-child(2) {
      &::before {
        content: "|";
        margin-right: 20px;
        color: #7f7f7f;
      }
    }
  }
  .content {
    margin-top: 50px;
    h1 {
      text-align: center;
    }
    .yuyue {
      margin-top: 30px;
      ul {
        display: flex;
        justify-content: space-between;
        li {
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #7f7f7f;
          color: black;
          transition: all 1s;
          &.active {
            &:hover {
              transform: scale(1.1);
            }

            border: 1px solid rgb(0, 255, 225);
            .shangmian {
              background-color: rgb(0, 255, 225);
            }
            .xiamian {
              color: rgb(255, 89, 0);
            }
          }
          .shangmian {
            margin-bottom: 10px;
            padding: 5px 10px;
            background-color: #c8bbbb;
          }
          .xiamian {
            color: #7f7f7f;
            padding: 10px 20px;
            text-align: center;
            line-height: 30px;
          }
        }
      }
      .el-pagination {
        margin: 10px;
        display: flex;
        justify-content: center;
      }
    }
  }

  .down {
    .shangwu {
      margin: 50px 0;
      .biaoti {
        display: flex;
        align-items: center;
      }
      .shenti {
        .item {
          padding-bottom: 10px;
          border-bottom: 1px solid #7f7f7f;
          display: flex;
          justify-content: space-between;
          .shang {
            margin: 20px 0;
            display: flex;
            color: aqua;
            span:nth-child(2) {
              margin: 0 10px;
            }
          }
          .youbian {
            color: #7f7f7f;
            display: flex;
            align-items: center;
            span {
              margin: 0 20px;
            }
          }
        }
      }
    }
    .xiawu {
      margin-bottom: 50px;
      .biaoti {
        display: flex;
        align-items: center;
      }
      .shenti {
        .item {
          padding-bottom: 10px;
          border-bottom: 1px solid #7f7f7f;
          display: flex;
          justify-content: space-between;
          .shang {
            margin: 20px 0;
            display: flex;
            color: aqua;
            span:nth-child(2) {
              margin: 0 10px;
            }
          }
          .youbian {
            color: #7f7f7f;
            display: flex;
            align-items: center;
            span {
              margin: 0 20px;
            }
          }
        }
      }
    }
  }

  .fanghao {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    h1 {
      font-size: 30px;
      font-weight: bold;
      margin-right: 20px;
    }
    .big {
      color: red;
    }
  }
}
</style>
