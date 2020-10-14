<template>
  <div>
    <div v-if="showButton" class="select_icon_box">
      <el-button type="primary" @click="dialogVisible = true"
        >点击查看</el-button
      >
    </div>
    <el-dialog
      title="代码预览"
      custom-class="dialog_code_prettify"
      :visible.sync="dialogVisible"
      append-to-body
      @close="close"
    >
      <div v-html="prettifyContent"></div>
    </el-dialog>
  </div>
</template>
<script>
import { js } from "js-beautify";
export default {
  name: "CodePrettify",
  // model: {
  //   prop: "show",
  //   event: "change",
  // },
  props: {
    content: {
      type: String,
      default: "",
    },
    showButton: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      prettifyContent: "",
    };
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
    content(val) {
      this.prettifyContent =
        '<pre class="prettyprint linenums:1">' + js(val) + "</pre>";
      this.$nextTick(function () {
        window.PR.prettyPrint();
      });
    },
    dialogVisible(val) {
      this.$emit("input", val);
    },
  },
  created() {
    if (this.value) {
      this.dialogVisible = js(this.value);
    }
    if (this.content) {
      this.prettifyContent =
        '<pre class="prettyprint linenums:1">' + js(this.content) + "</pre>";
      this.$nextTick(function () {
        window.PR.prettyPrint();
      });
    }
  },
  mounted() {},
  methods: {
    close() {
      this.dialogVisible = false;
    },
  },
};
</script>
<style lang="scss">
@import "./theme7";

.dialog_code_prettify {
  z-index: 9;
  width: 100%;
  max-width: 700px;

  .el-dialog__body {
    max-height: 70vh;
    padding: 0;
    overflow-y: auto;

    .prettyprint {
      min-height: 300px;
      padding: 10px 0;
      margin: 0;
      border: 0;
    }
  }
}
</style>
