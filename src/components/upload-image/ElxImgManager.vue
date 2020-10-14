<template>
  <div class="elx-imgbox">
    <el-dialog
      title="图片管理器"
      :visible.sync="visible"
      class="elx-imgbox-dialog"
      top="5vh"
    >
      <el-tabs
        v-model="options.activeTab"
        tab-position="left"
        @change="getUploadTips"
      >
        <el-tab-pane label="选择图片" name="pick" class="pick-block">
          <div v-if="isLoading" class="elx-img-list-loading">
            <div class="el-icon-loading"></div>
          </div>

          <div class="elx-main elx-img-list">
            <div
              v-for="(img, itemIndex) in imageList"
              :key="itemIndex"
              class="img-item"
              @click="onClickListImage(img)"
            >
              <div class="thumb-wp">
                <img :src="img.url" />
              </div>
              <div v-if="img.label" class="title">{{ img.name }}</div>
              <div v-if="img.label" class="label">{{ img.label }}</div>
              <span v-if="img.selected" class="selected"
                ><span class="icon el-icon-check"></span
              ></span>
            </div>
          </div>

          <el-pagination
            layout="total, prev, pager, next"
            :page-count="imagePages"
            @current-change="onPageNumChange"
          ></el-pagination>
          <div class="elx-foot">
            <el-badge :value="images.length || ''" class="item">
              <el-button
                type="primary"
                size="medium"
                :disabled="images.length == 0"
                @click="onConfirm"
                >确定</el-button
              >
            </el-badge>
            <el-badge :value="uploadFileNum || ''" class="item">
              <el-button
                type="primary"
                size="medium"
                plain
                @click="options.activeTab = 'upload'"
                >上传图片</el-button
              >
            </el-badge>
          </div>
        </el-tab-pane>

        <el-tab-pane label="上传图片" name="upload" class="upload-block">
          <div class="elx-main">
            <div class="upload-title">请选择本地图片上传：</div>
            <z-upload
              ref="upload"
              class="upload-img-preview"
              :length="uploadNumberLimit()"
              @change="getUploadTips"
              @success="onUploadSuccess"
            ></z-upload>
            <div class="upload-tip">{{ uploadTips }}</div>
            <div class="elx-foot">
              <el-badge :value="uploadFileNum || ''" class="item">
                <el-button type="primary" size="medium" @click="onUploadConfirm"
                  >确定上传</el-button
                >
              </el-badge>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
import zUpload from "@/components/upload-image/upload";
export default {
  name: "ElxImgbox",
  components: {
    zUpload,
  },
  model: {
    prop: "images",
    event: "change",
  },

  data() {
    return {
      images: [], // 已选图片

      options: {
        limit: 10, // 最多可选择图片数量
        maxSize: 2,
        activeTab: "pick",
        callback: null,
      },
      isLoading: true,
      visible: false,
      imageList: [],
      imagePages: 1,
      uploadFileNum: 0,
      uploadTips: "",
    };
  },
  computed: {},

  mounted() {
    this.loadListImage();
  },

  methods: {
    setOptions(options) {
      Object.assign(this.options, options);
    },
    show() {
      this.visible = true;
    },

    hide() {
      this.visible = false;
    },

    onConfirm() {
      this.hide();
      if (typeof this.options.callback === "function") {
        this.options.callback(this.images);
      }
    },

    /**
     * 点击图片时选中或取消选中图片
     * @param img object
     */
    onClickListImage(img) {
      let imgIndex = this.selectedImageIndex(img);

      if (imgIndex >= 0) {
        // 取消图片已选状态
        img.selected = false;
        this.images.splice(imgIndex, 1);
        return;
      }

      if (this.options.limit == 1) {
        // 单选时，先取消已选
        this.images = [];
        this.clearListSelected();
      } else if (
        this.images.length + this.uploadFileNum >=
        this.options.limit
      ) {
        this.$baseMessage(
          "最多只能选择" + this.options.limit + "张图片",
          "error"
        );
        return;
      }
      img.selected = true;
      this.images.push(JSON.parse(JSON.stringify(img)));
      this.getUploadTips();
    },

    clearListSelected(img) {
      for (let i = 0; i < this.imageList.length; i++) {
        if (img) {
          if (img.url === this.imageList[i].url) {
            this.imageList[i].selected = false;
            break;
          }
        } else if (this.imageList[i].selected) {
          this.imageList[i].selected = false;
        }
      }
    },

    /**
     * 加载图片列表数据
     * @param page
     */
    loadListImage(page = 1) {
      this.isLoading = true;

      /**
       * result = {
       *     "items": [{"url": "img_url", "name": "img_name", "thumb": "img_thumb_url" ...}, ...],
       *     "total": number
       * }
       */
      this.$api.admin
        .getQiniuImagesList({
          pageNo: page,
          pageSize: 15,
        })
        .then((res) => {
          this.imagePages = res.data.pages;
          let imageList = [];
          res.data.data.forEach((item) => {
            item.selected = false;
            // 图片名
            if (!item.name) {
              item.name = item.url.substr(item.url.lastIndexOf("/") + 1);
            }
            // 图片其他信息
            if (typeof item.label === "undefined") {
              item.label = "";
            }
            imageList.push(item);
          });
          this.imageList = imageList;
          setTimeout(() => {
            this.isLoading = false;
          }, 300);
        });
    },

    /**
     * 图片已选则返回下标，未选则返回-1
     */
    selectedImageIndex(img) {
      for (let i = 0; i < this.images.length; i++) {
        var selectedImg = this.images[i];

        if (selectedImg.url === img.url) {
          return i;
        }
      }
      return -1;
    },

    /**
     * 分页页面变化时刷新数据
     * @param page
     */
    onPageNumChange(page) {
      this.loadListImage(page);
    },

    /**
     * 提交上传图片
     */
    onUploadConfirm() {
      this.$refs.upload.submit();
    },
    uploadNumberLimit() {
      return this.options.limit - this.images.length;
    },

    uploadTypeTip() {
      return "仅支持 jpg/png/gif 图片";
    },

    uploadSizeTip() {
      return "大小不能超过 " + this.options.maxSize + "M";
    },

    getUploadTips(files) {
      if (files) {
        this.uploadFileNum = files.length;
      }
      let tips = [this.uploadTypeTip(), this.uploadSizeTip()];
      if (this.images.length > 0) {
        tips.push("已有" + this.images.length + "张图片");
      }
      if (this.uploadFileNum > 0) {
        tips.push("即将上传" + this.uploadFileNum + "张图片");
      }

      tips.push(
        "还可以选择" +
          (this.options.limit - this.images.length - this.uploadFileNum) +
          "张图片上传"
      );
      this.uploadTips = tips.join("，");
    },
    /**
     * 上传成功处理
     * @param response
     * @param file
     * @param fileList
     * @returns {boolean}
     */
    onUploadSuccess(fileList) {
      this.images = this.images.concat(fileList);
      this.onConfirm();
      // this.$refs.upload.clearFiles();
    },
  },
};
</script>

<style lang="scss">
.elx-images {
  .el-upload-list__item,
  .el-upload--picture-card {
    width: 78px;
    height: 78px;
    line-height: 82px;
    border-radius: 5px;
  }
}

.elx-imgbox-dialog {
  $bg: #f6f6f6;

  .el-badge {
    vertical-align: bottom;
  }

  .el-dialog {
    width: 720px;

    .el-dialog__header {
      border-bottom: 1px solid #e8e8e8;
    }

    .el-dialog__body {
      padding: 0;
      background: $bg;
    }
  }

  .el-tabs {
    .el-tabs__header {
      margin-top: 5px;
      margin-right: 0;

      .el-tabs__nav-wrap::after {
        background: $bg;
      }
    }

    .el-tabs__item.is-active {
      background: #fff;
    }

    .el-tabs--left .el-tabs__nav-wrap {
      padding-top: 15px;
    }

    .el-tabs__content {
      height: 510px;
      background: #fff;
    }
  }

  .elx-foot {
    padding: 15px 0 0 10px;

    .el-button {
      margin: 0 0 0 10px;
    }
  }

  .pick-block {
    position: relative;

    .elx-img-list-loading {
      position: absolute;
      right: 0;
      left: 0;
      z-index: 9;
      width: 100%;
      height: 380px;
      text-align: center;
      background: #fff;

      .el-icon-loading {
        font-size: 50px;
        line-height: 250px;
        color: #409eff;
      }
    }

    .elx-img-list {
      height: 380px;
      padding: 10px;

      .img-item {
        $imgSize: 100px;

        position: relative;
        float: left;
        width: $imgSize;
        margin: 10px;
        font-size: 12px;
        cursor: pointer;

        img {
          display: block;
          width: $imgSize;
          height: $imgSize;
        }

        .title {
          display: block;
          height: 24px;
          padding: 0 5px;
          overflow: hidden;
          line-height: 24px;
          background: $bg;
        }

        .label {
          position: absolute;
          bottom: 24px;
          left: 0;
          z-index: 9;
          width: 100%;
          height: 21px;
          line-height: 21px;
          color: #fff;
          text-align: center;

          &::after {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 21px;
            content: " ";
            background: #000;
            opacity: 0.3;
          }
        }

        .selected {
          position: absolute;
          top: -3px;
          right: -3px;
          bottom: -3px;
          left: -3px;
          text-align: right;
          border: 3px solid #409eff;
          border-radius: 3px;

          .icon {
            position: absolute;
            top: 0;
            right: 0;
            display: inline-block;
            width: 24px;
            height: 24px;
            font-size: 16px;
            line-height: 24px;
            color: #fff;
            text-align: center;
            background: #409eff;
            border-radius: 0 0 0 3px;
          }
        }
      }

      &::after {
        display: table;
        height: 0;
        clear: both;
        visibility: hidden;
        content: " ";
      }
    }

    .el-pagination {
      position: relative;
      float: none;
      padding: 5px;
      margin: 0 24px 0 20px;
      text-align: right;
      background: #f9f9f9;

      * {
        background: none;
      }
    }
  }

  .upload-block {
    .upload-img-preview {
      padding: 20px;

      /* 上传图片预览改为使用背景图片按比例缩放方式 */
      .el-upload--picture-card,
      .el-upload-list--picture-card .el-upload-list__item,
      .el-upload-list--picture-card .el-upload-list__item .wp {
        width: 90px;
        height: 90px;
        line-height: 98px;
        background-position: 50% 50%;
        background-size: cover;
      }

      .el-upload-list--picture-card .el-upload-list__item-status-label i {
        margin-top: 12px;
        vertical-align: top;
      }
    }

    .upload-tip {
      padding: 0 20px;
      font-size: 13px;
      color: #999;
    }

    .upload-title {
      padding: 20px 0 0 20px;
      font-size: 16px;
      color: #666;
    }
  }
}

.el-upload-list__item-actions {
  a {
    i {
      color: #fff;
    }
  }
}
</style>
