<template>
  <div>
    <div class="select_icon_box">
      <i v-if="value" class="iconfont" :class="value"></i>
      <el-button type="primary" @click="dialogVisible = true"
        >选择图标</el-button
      >
    </div>
    <el-dialog
      title="图标选择"
      custom-class="dialog_icon_select"
      :visible.sync="dialogVisible"
      append-to-body
      @close="close"
    >
      <div class="search_box">
        <el-input v-model="queryForm.title"></el-input>
        <el-button
          icon="el-icon-search"
          native-type="submit"
          type="primary"
          @click="queryData"
          >搜索
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="onClear"
          >清除</el-button
        >
      </div>
      <ul class="icon-list">
        <li
          v-for="(item, index) of queryIcon"
          :key="index"
          :class="{
            active: item == value,
            'el-button--primary': item == value,
          }"
          @click="onSelect(item)"
        >
          <i class="iconfont" :class="item"></i>
          <span>{{ item }}</span>
        </li>
      </ul>
      <el-pagination
        :background="background"
        :current-page="queryForm.pageNo"
        :page-size="queryForm.pageSize"
        :layout="layout"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "IconSelect",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      dialogVisible: false,
      copyText: "",
      layout: "prev, pager, next",
      total: 0,
      background: true,
      height: 0,
      selectRows: "",
      elementLoadingText: "正在加载...",
      queryIcon: [],
      queryForm: {
        pageNo: 1,
        pageSize: 12,
        title: "",
      },
      iconList: [
        "icon-zhuye",
        "icon-mima",
        "icon-zhuce-mimaxianshi",
        "icon-rightarrow",
        "icon-mimayincang1",
        "icon-yonghu",
        "icon-guanliyuan",
        "icon-fenlei1",
        "icon-wenzhang-copy",
        "icon-user",
        "icon-fuwuqi",
        "icon-drxx05",
        "icon-role",
        "icon-wenjian",
        "icon-zhuashou_",
        "icon-icon--quanxian",
        "icon-rizhi",
        "icon-caidan",
        "icon-rizhi1",
        "icon-guanliyuan1",
        "icon-wenzhangfenlei",
        "icon-shouye",
        "icon-xitongguanli",
        "icon-xitong",
        "icon-rizhi2",
        "icon-rizhiguanli",
        "icon-baidu",
        "icon-tuichu",
        "icon-shenfen",
        "icon-shouji",
      ],
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {},
  methods: {
    close() {
      this.dialogVisible = false;
    },
    onSelect(item) {
      console.log(item);
      this.$emit("input", item);
      this.dialogVisible = false;
    },
    handleCurrentChange(val) {
      this.queryForm.pageNo = val;
      this.fetchData();
    },
    queryData() {
      this.queryForm.pageNo = 1;
      this.fetchData();
    },
    onClear() {
      this.$emit("input", "");
    },
    async fetchData() {
      // 模拟接口
      let { pageNo, pageSize, title } = this.queryForm;
      let dataList = [];
      if (title) {
        let queryList = [];
        this.iconList.forEach((item) => {
          if (item.indexOf(title) >= 0) {
            queryList.push(item);
          }
        });
        this.total = queryList.length;
        dataList = queryList.slice((pageNo - 1) * pageSize, pageNo * pageSize);
      } else {
        dataList = this.iconList.slice(
          (pageNo - 1) * pageSize,
          pageNo * pageSize
        );
        this.total = this.iconList.length;
      }
      this.queryIcon = dataList;
    },
  },
};
</script>
<style lang="scss">
@import "@/styles/variable.scss";
.dialog_icon_select {
  z-index: 9;
  width: 100%;
  max-width: 700px;

  .el-dialog__body {
    max-height: 70vh;
    padding: 0;
    overflow-y: auto;
  }
}

.search_box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
}

.icon-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  li {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 145px;
    height: 120px;
    cursor: pointer;
    border-top: 1px solid #f1f1f1;
    border-right: 1px solid #f1f1f1;

    &.active {
      color: #fff;

      span {
        color: #fff;
      }
    }

    i {
      font-size: 28px;
      font-weight: bold;
      color: #666;
      text-align: center;
      vertical-align: middle;
      pointer-events: none;
      cursor: pointer;
    }

    span {
      margin-top: 20px;
      font-size: 14px;
      color: #666;
    }
  }
}

.select_icon_box {
  display: flex;
  align-items: center;
  i {
    margin-right: 20px;
    font-size: 28px;
    font-weight: bold;
    color: #666;
    text-align: center;
    vertical-align: middle;
    pointer-events: none;
  }
}
</style>
