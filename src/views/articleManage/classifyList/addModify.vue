<template>
  <el-dialog
    :title="title"
    custom-class="dialog_addModify"
    append-to-body
    :visible.sync="dialogFormVisible"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="父分类" prop="parentId">
        <el-cascader
          v-model="form.parentId"
          :props="props"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="分类名称" prop="name">
        <el-input v-model.trim="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="分类图标" prop="icon">
        <!-- <image-upload v-model="form.icon" :limit="1"></image-upload> -->
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "AddModify",
  data() {
    let _this = this;
    return {
      form: {
        parentId: 0,
        name: "",
        icon: "",
      },
      rules: {
        name: [{ required: true, trigger: "blur", message: "请输入分类名称" }],
      },
      props: {
        value: "id",
        label: "name",
        checkStrictly: true,
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
      title: "",
      dialogFormVisible: false,
      roleList: [],
    };
  },
  methods: {
    show(row) {
      if (row) {
        this.title = "编辑文章分类";
        console.log(row);
        this.form = Object.assign(this.form, {
          icon: row.icon,
          id: row.id,
          parentId: row.parentId,
          name: row.name,
        });
      } else {
        this.title = "添加文章分类";
      }
      this.dialogFormVisible = true;
    },
    close() {
      this.$refs["form"].resetFields();
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
    },
    save() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.parentId && Array.isArray(this.form.parentId)) {
            this.form.parentId = this.form.parentId[
              this.form.parentId.length - 1
            ];
          }
          // this.$api.articles
          //   .addModifyArticleClassifys(this.form)
          //   .then((res) => {
          //     this.$baseMessage(res.msg, "success");
          //     this.$emit("fetchData");
          //     this.twin.$router.close();
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
</style>
