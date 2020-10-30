<template>
  <div class="roleManagement-container">
    <el-form :inline="true" :model="queryForm" @submit.native.prevent>
      <el-form-item v-if="check('add')">  
        <!-- check('add') 判断是否有添加权限 -->
        <el-button icon="el-icon-plus" type="primary" @click="onAddEdit"
          >添加</el-button
        >
      </el-form-item>
      <el-form-item v-if="check('articleGrab')">
        <el-button icon="el-icon-plus" type="primary" @click="onGrab"
          >抓取</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-input
          v-model.trim="queryForm.userId"
          type="number"
          placeholder="请输入发布人ID"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model.trim="queryForm.id"
          placeholder="请输入文章ID"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model.trim="queryForm.classifyId"
          placeholder="请输入分类ID"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="queryData"
          >查询
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      default-expand-all
      :element-loading-text="elementLoadingText"
    >
      <el-table-column prop="id" label="文章ID"></el-table-column>
      <el-table-column prop="userId" label="发布人ID"></el-table-column>
      <el-table-column prop="classifyId" label="分类ID"></el-table-column>
      <el-table-column prop="pageviews" label="浏览量"></el-table-column>
      <el-table-column prop="likes" label="点赞数"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column
        v-if="check(['modify', 'delete'])"
        fixed="right"
        label="操作"
        width="200"
      >
        <template v-slot="scope">
          <el-button
            v-if="check('modify')"
            type="text"
            @click="onAddEdit(scope.row)"
            >编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.pageNo"
      :page-size="queryForm.pageSize"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  data() {
    return {
      list: [{
          "id": 36,
          "title": "js 数据深度克隆",
          "type": 1000,
          "original": true,
          "reprintUrl": "https://blog.csdn.net/weixin_40614372/article/details/101283870",
          "pageviews": 73,
          "likes": 0,
          "classifyId": 12,
          "createdTime": "2020-08-05 15:13:01"
      }, {
          "id": 37,
          "title": "js 手动实现call、apply、bind",
          "type": 1000,
          "original": true,
          "reprintUrl": "https://blog.csdn.net/weixin_40614372/article/details/101282692",
          "pageviews": 53,
          "likes": 0,
          "classifyId": 12,
          "createdTime": "2020-08-05 15:13:01"
      }, {
          "id": 38,
          "title": "React Native入门篇—第二步创建APP项目",
          "type": 1000,
          "original": true,
          "reprintUrl": "https://blog.csdn.net/weixin_40614372/article/details/86220506",
          "pageviews": 108,
          "likes": 0,
          "classifyId": 12,
          "createdTime": "2020-08-05 15:13:01"
      }, {
          "id": 39,
          "title": "js 手动实现new、instanceof",
          "type": 1000,
          "original": true,
          "reprintUrl": "https://blog.csdn.net/weixin_40614372/article/details/101282984",
          "pageviews": 149,
          "likes": 0,
          "classifyId": 12,
          "createdTime": "2020-08-05 15:13:01"
      }],
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      selectRows: "",
      elementLoadingText: "正在加载...",
      queryForm: {
        pageNo: 1,
        pageSize: 10,
        id: "",
        classifyId: "",
        userId: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  twinShow(){
    console.log("页面显示");
    this.fetchData();
  },
  twinHide(){
    console.log("页面隐藏");
  },
  methods: {
    onAddEdit(row) {
      if (row.id) {
        // 双生布局路由跳转
        this.twin.$router.push({
          name: "ArticleAddModify", // 路由名称 --- 必填
          title: "修改文章", // 路由标题(不填将默认查询路由的title)
          reload: true,  // 路由是否重新加载（一般跳转修改需要）
          query: {  // 路由携带参数
            id: row.id
          }
        });
        // twin.$route 获取路由信息
        // 双生布局路由获取query参数
        // this.twin.$route.query.id

        // 关闭当前页面
        // this.twin.$router.close();

        // 刷新当前页面
        // this.twin.$router.reload();
        
        // 全局事件监听
        this.twin.$on("test", (data) => {
          console.log("收到数据=", data);
        });
        // 全局事件发送
        this.twin.$emit("test", {name: "我可以发送数据"});

        // 布局类型获取
        console.log("布局类型=",this.twin.$layoutType);

        // 获取传入的userInfo
        console.log("userInfo=",this.twin.$userInfo);

        // 获取窗口容器dom
        console.log("窗口容器dom=",this.twin.$element);

        // 获取窗口容器ID
        console.log("窗口容器ID=",this.twin.$el);

        // 

        // 全局方法---是否有权限
        // check('add')  判断是否有添加权限  返回true、false
        // check('delete')  判断是否有删除权限  返回true、false
        // check('modify') 判断是否有修改权限  返回true、false
        // check('view') 判断是否有查看权限  返回true、false
        // check(['add', 'modify']) 判断是否有添加或修改权限  返回true、false
      } else {
        this.twin.$router.push({
          name: "ArticleAddModify",
          title: "添加文章",
        });
      }
    },
    onGrab() {
      this.twin.$router.push({
          name: "ArticleGrab",
          title: "抓取文章",
      });
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.queryForm.pageNo = val;
      this.fetchData();
    },
    queryData() {
      this.queryForm.pageNo = 1;
      this.fetchData();
    },
    fetchData() {
      this.listLoading = true;
      // this.$api.articles.getArticlesList(this.queryForm).then((res) => {
      //   this.list = res.data.data;
      //   this.total = res.data.count;
      //   setTimeout(() => {
      //     this.listLoading = false;
      //   }, 300);
      // });
      setTimeout(() => {
        this.listLoading = false;
      }, 300);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
