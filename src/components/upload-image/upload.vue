<template>
  <div class="index-container">
    <div class="elx-images">
      <ul class="el-upload-list el-upload-list--picture-card">
        <li
          v-for="(item, index) in uploadFiles"
          :key="index"
          :tabindex="index"
          class="el-upload-list__item"
        >
          <img :src="item.url" alt="" class="el-upload-list__item-thumbnail" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-delete"
              @click="onRemove(index, item)"
              ><i class="el-icon-delete"></i
            ></span>
          </span>
          <div v-if="!allowUpload" class="el-upload-progress">
            <el-progress
              class="progress"
              type="circle"
              :width="60"
              :stroke-width="4"
              :percentage="item.progress"
            ></el-progress>
          </div>
        </li>
      </ul>
      <div
        v-if="uploadFiles.length < length"
        tabindex="0"
        class="el-upload el-upload--picture-card"
      >
        <i class="el-icon-plus"></i>
        <input
          class="el-upload-input"
          type="file"
          :multiple="length > 1"
          accept="image/*"
          @change="uploadFile($event)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import qiniuUpload from "@/components/qiniuUpload.js";
export default {
  name: "MenuList",
  props: {
    //当前值
    value: {
      type: String,
      default: "",
    },
    //上传数量
    length: {
      type: [Number, String],
      default: 1,
    },
    //是否获取图片高宽
    wh: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      uploadFiles: [],
      allowUpload: true,
    };
  },
  created() {},
  mounted() {},
  methods: {
    onRemove(index) {
      this.uploadFiles.splice(index, 1);
      this.$emit("change", this.uploadFiles);
    },
    getImageUrl(file) {
      const _this = this;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        file.url = e.target.result;
        file.progress = 0;
        _this.uploadFiles.push(file);
        _this.$emit("change", _this.uploadFiles);
      };
    },
    uploadFile(event) {
      //文件数据体
      const files = event.target.files;
      let surplus = this.length - this.uploadFiles.length;
      files.forEach((item, index) => {
        if (index < surplus) {
          this.getImageUrl(item);
        }
      });
    },
    submit() {
      qiniuUpload({
        files: this.uploadFiles,
        success: (res) => {
          this.$emit("success", res);
          this.allowUpload = true;
        },
        progress: (res) => {
          this.$set(this.uploadFiles, res.index, res);
        },
        uploadStart: () => {
          this.allowUpload = false;
        },
      });
    },
  },
};
</script>
<style lang="scss">
.progress {
  .el-progress__text {
    color: #fff;
  }
}
</style>
<style lang="scss" scoped>
.elx-images {
  line-height: 0;

  .el-upload-list__item,
  .el-upload--picture-card {
    width: 78px;
    height: 78px;
    line-height: 82px;
    border-radius: 5px;
  }

  .el-upload-list__item-actions {
    a {
      i {
        color: #fff;
      }
    }
  }
}

.single-img .el-upload-list--picture-card .el-upload-list__item {
  margin: 0;
}

.el-upload {
  position: relative;
  overflow: hidden;
}

.el-upload-input {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
}

.el-upload-progress {
  position: absolute;
  top: 0%;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);

  .progress {
    width: 60px;
    color: #fff;

    .el-progress__text {
      color: #fff;
    }
  }
}
</style>
