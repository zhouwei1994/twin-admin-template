<template>
  <div class="home_page">
    <el-carousel
      indicator-position="none"
      class="carousel_tip"
      height="30px"
      direction="vertical"
    >
      <el-carousel-item class="carousel_item twin_layout_content_color ">
        此项目后端是用egg.js框架搭建，暂未开源，客户端的代码<a
          class="twin_layout_content_color"
          href="https://ext.dcloud.net.cn/plugin?id=2009"
          target="_blank"
          >点击这里</a
        >
      </el-carousel-item>
      <el-carousel-item class="carousel_item twin_layout_content_color">
        此框架UI即将开源，请耐心等待
      </el-carousel-item>
    </el-carousel>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card shadow="never">
          <div slot="header">
            <span>总用户量</span>
          </div>
          <div class="statistics_number">
            {{ statisticsInfo.totalUserCount }}
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card shadow="never">
          <div slot="header">
            <span>总收益</span>
          </div>
          <div class="statistics_number">0</div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>昨日新增用户量</span>
          </div>
          <div class="statistics_number">
            {{ statisticsInfo.yesterdayNewAdd }}
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card shadow="never">
          <div slot="header">
            <span>昨日在线用户量</span>
          </div>
          <div class="statistics_number">
            {{ statisticsInfo.yesterdayActive }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card shadow="never">
          <div slot="header">
            <span>用户新增统计图</span>
          </div>
          <v-chart
            class=""
            theme="echarts-theme"
            :autoresize="true"
            :options="userNew"
          />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card shadow="never">
          <div slot="header">
            <span>用户活跃统计图</span>
          </div>
          <v-chart :autoresize="true" :options="userActive" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echarts from "@/plugins/echarts";
export default {
  name: "Index",
  components: {
    "v-chart": echarts
  },
  data() {
    return {
      statisticsInfo: {},
      userNew: {
        grid: {
          top: "4%",
          left: "2%",
          right: "0%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100,
          },
          {
            start: 0,
            end: 100,
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            handleStyle: {
              color: "#fff",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
          },
        ],
        series: [
          {
            name: "新增量",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              color: "rgb(255, 70, 131)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 158, 68)",
                },
                {
                  offset: 1,
                  color: "rgb(255, 70, 131)",
                },
              ]),
            },
            data: [],
          },
        ],
      },
      userActive: {
        grid: {
          top: "4%",
          left: "2%",
          right: "0%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100,
          },
          {
            start: 0,
            end: 100,
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            handleStyle: {
              color: "#fff",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
          },
        ],
        series: [
          {
            name: "活跃量",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              color: "rgb(255, 70, 131)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 158, 68)",
                },
                {
                  offset: 1,
                  color: "rgb(255, 70, 131)",
                },
              ]),
            },
            data: [],
          },
        ],
      },
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      // this.$api.statistical.getUserNewActiveLogs(this.queryForm).then((res) => {
        let data = {
            "newData": [8, 9, 0, 0, 0, 3, 10, 5, 12, 4, 4, 2, 4, 5, 3, 4, 3, 1, 1, 4, 5, 3, 6, 6, 5, 3, 2, 5, 5, 5, 4, 1, 2, 4,
                6, 26, 31, 15, 3, 7, 12, 8, 8, 10, 7, 5, 0, 6, 9, 2, 7, 1, 2, 1, 2, 9, 3, 9, 5, 3, 4, 8, 4, 5, 5, 5, 3, 1,
                5, 10, 8, 12, 3, 1, 4, 10, 6, 7, 1, 1, 2, 2, 0, 1, 3, 3, 6, 4, 6, 6, 24
            ],
            "newTime": ["2020-07-15", "2020-07-16", "2020-07-17", "2020-07-18", "2020-07-19", "2020-07-20", "2020-07-21",
                "2020-07-22", "2020-07-23", "2020-07-24", "2020-07-25", "2020-07-26", "2020-07-27", "2020-07-28",
                "2020-07-29", "2020-07-30", "2020-07-31", "2020-08-01", "2020-08-02", "2020-08-03", "2020-08-04",
                "2020-08-05", "2020-08-06", "2020-08-07", "2020-08-08", "2020-08-09", "2020-08-10", "2020-08-11",
                "2020-08-12", "2020-08-13", "2020-08-14", "2020-08-15", "2020-08-16", "2020-08-17", "2020-08-18",
                "2020-08-19", "2020-08-20", "2020-08-21", "2020-08-22", "2020-08-23", "2020-08-24", "2020-08-25",
                "2020-08-26", "2020-08-27", "2020-08-28", "2020-08-29", "2020-08-30", "2020-08-31", "2020-09-01",
                "2020-09-02", "2020-09-03", "2020-09-04", "2020-09-05", "2020-09-06", "2020-09-07", "2020-09-08",
                "2020-09-09", "2020-09-10", "2020-09-11", "2020-09-12", "2020-09-13", "2020-09-14", "2020-09-15",
                "2020-09-16", "2020-09-17", "2020-09-18", "2020-09-19", "2020-09-20", "2020-09-21", "2020-09-22",
                "2020-09-23", "2020-09-24", "2020-09-25", "2020-09-26", "2020-09-27", "2020-09-28", "2020-09-29",
                "2020-09-30", "2020-10-01", "2020-10-02", "2020-10-03", "2020-10-04", "2020-10-05", "2020-10-06",
                "2020-10-07", "2020-10-08", "2020-10-09", "2020-10-10", "2020-10-11", "2020-10-12", "2020-10-13"
            ],
            "activeData": [8, 10, 0, 0, 0, 5, 9, 7, 14, 6, 4, 3, 7, 11, 6, 4, 7, 3, 3, 6, 8, 5, 8, 6, 5, 7, 8, 7, 9, 6, 9, 4, 5,
                10, 13, 35, 42, 20, 7, 9, 23, 13, 13, 14, 11, 6, 1, 12, 13, 11, 12, 4, 6, 2, 6, 10, 5, 11, 11, 7, 5, 10, 6,
                9, 11, 7, 4, 2, 6, 14, 7, 17, 7, 5, 7, 13, 10, 7, 1, 1, 5, 2, 0, 1, 4, 3, 8, 7, 7, 9, 30
            ],
            "activeTime": ["2020-07-15", "2020-07-16", "2020-07-17", "2020-07-18", "2020-07-19", "2020-07-20", "2020-07-21",
                "2020-07-22", "2020-07-23", "2020-07-24", "2020-07-25", "2020-07-26", "2020-07-27", "2020-07-28",
                "2020-07-29", "2020-07-30", "2020-07-31", "2020-08-01", "2020-08-02", "2020-08-03", "2020-08-04",
                "2020-08-05", "2020-08-06", "2020-08-07", "2020-08-08", "2020-08-09", "2020-08-10", "2020-08-11",
                "2020-08-12", "2020-08-13", "2020-08-14", "2020-08-15", "2020-08-16", "2020-08-17", "2020-08-18",
                "2020-08-19", "2020-08-20", "2020-08-21", "2020-08-22", "2020-08-23", "2020-08-24", "2020-08-25",
                "2020-08-26", "2020-08-27", "2020-08-28", "2020-08-29", "2020-08-30", "2020-08-31", "2020-09-01",
                "2020-09-02", "2020-09-03", "2020-09-04", "2020-09-05", "2020-09-06", "2020-09-07", "2020-09-08",
                "2020-09-09", "2020-09-10", "2020-09-11", "2020-09-12", "2020-09-13", "2020-09-14", "2020-09-15",
                "2020-09-16", "2020-09-17", "2020-09-18", "2020-09-19", "2020-09-20", "2020-09-21", "2020-09-22",
                "2020-09-23", "2020-09-24", "2020-09-25", "2020-09-26", "2020-09-27", "2020-09-28", "2020-09-29",
                "2020-09-30", "2020-10-01", "2020-10-02", "2020-10-03", "2020-10-04", "2020-10-05", "2020-10-06",
                "2020-10-07", "2020-10-08", "2020-10-09", "2020-10-10", "2020-10-11", "2020-10-12", "2020-10-13"
            ],
            "yesterdayNewAdd": 24,
            "yesterdayActive": 30,
            "totalUserCount": 733
        }
        this.userNew.xAxis.data = data.newTime;
        this.userNew.series[0].data = data.newData;
        this.userActive.xAxis.data = data.activeTime;
        this.userActive.series[0].data = data.activeData;
        this.statisticsInfo = data;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.home_page {
  background-color: transparent;
  margin: 0;
  .el-card__body .echarts {
    width: 100%;
    height: 300px;
  }
  .card {
    margin-bottom: 20px;
  }
  .carousel_tip {
    margin-bottom: 15px;
  }

  .statistics_number {
    font-size: 32px;
    font-weight: bold;
    color: #666;
  }

  .carousel_item {
    height: 30px;
    line-height: 30px;
    a {
      text-decoration: underline;
    }
  }
}
</style>
