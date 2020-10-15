<template>
  <div v-loading="loading" class="qiniu-files-list-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="文章类型" prop="type">
        <el-radio v-model="form.type" :label="1000" size="small" border
          >博客</el-radio
        >
        <el-radio v-model="form.type" :label="2000" size="small" border
          >问答</el-radio
        >
      </el-form-item>
      <el-form-item label="文章分类" prop="classifyId">
        <el-cascader
          v-model="form.classifyId"
          :props="props"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="文章名称" prop="title">
        <el-input v-model.trim="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入文章内容"
          v-model="content">
        </el-input>
      </el-form-item>
      <el-form-item label="是否原创" prop="original">
        <el-switch
          v-model="form.original"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>
      <el-form-item v-if="!form.original" label="转载地址" prop="reprintUrl">
        <el-input v-model.trim="form.reprintUrl" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ArticleAddModify",
  components: {
  },
  data() {
    let _this = this;
    return {
      form: {
        title: "",
        content: "",
        type: 1000,
        original: true,
        reprintUrl: "",
        classifyId: "",
      },
      rules: {
        classifyId: [
          { required: true, trigger: "blur", message: "请选择文章分类" },
        ],
        title: [{ required: true, trigger: "blur", message: "请输入文章名称" }],
        content: [
          { required: true, trigger: "blur", message: "请输入文章内容" },
        ],
      },
      props: {
        value: "id",
        label: "name",
        lazy: true,
        lazyLoad(node, resolve) {
          let httpData = {
            parentId: 0,
          };
          if (node.data && node.data.id) {
            httpData.parentId = node.data.id;
          }
          // _this.$api.articles.getArticleClassifys(httpData).then((res) => {
          //   resolve(res.data);
          // });
        },
      },
      loading: false,
    };
  },
  created() {
    if (this.route.query.id) {
      this.form.id = this.route.query.id;
      this.fetchData();
    }
  },
  activated() {
    // if (this.route.query.id) {
    //   this.form.id = this.route.query.id;
    //   this.fetchData();
    // }
  },
  methods: {
    fetchData() {
      this.loading = true;
      // this.$api.articles
      //   .getArticleInfo({
      //     id: this.route.query.id,
      //   })
      //   .then((res) => {
      //     this.form.title = res.data.title;
      //     this.form.content = res.data.content;
      //     this.form.type = res.data.type;
      //     this.form.original = res.data.original;
      //     this.form.reprintUrl = res.data.reprintUrl;
      //     this.form.classifyId = res.data.classifyId;
      //     setTimeout(() => {
      //       this.loading = false;
      //     }, 300);
      //   });
      setTimeout(() => {
        this.loading = false;
      }, 300);
    },
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let classifyId = this.form.classifyId;
          if (this.form.classifyId && typeof this.form.classifyId == "object") {
            classifyId = this.form.classifyId[this.form.classifyId.length - 1];
          }
          // this.$api.articles
          //   .addModifyArticles({
          //     ...this.form,
          //     classifyId,
          //   })
          //   .then((res) => {
          //     this.$alert(res.msg, {
          //       confirmButtonText: "确定",
          //       callback: () => {
          //         this.router.close();
          //       },
          //     });
          //   });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.dialog_addModify {
  width: 100%;
  max-width: 700px;
}

.submit_btn {
  padding-left: 80px;
  margin-top: 30px;
}
</style>
