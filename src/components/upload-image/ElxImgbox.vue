<template>
  <div class="elx-imgbox single-img">
    <div class="elx-images">
      <ul class="el-upload-list el-upload-list--picture-card">
        <li
          v-for="(img, imgIndex) in theImages"
          :key="imgIndex"
          :tabindex="imgIndex"
          class="el-upload-list__item"
        >
          <img :src="img.url" class="el-upload-list__item-thumbnail" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="onPreview(imgIndex)"
              ><i class="el-icon-zoom-in"></i
            ></span>
            <span
              class="el-upload-list__item-delete"
              @click="onRemove(imgIndex, img)"
              ><i class="el-icon-delete"></i
            ></span>
          </span>
        </li>
      </ul>
      <div
        v-if="theImages.length < limit"
        tabindex="0"
        class="el-upload el-upload--picture-card"
        @click="onUpload"
      >
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <image-viewer
      v-if="showViewer"
      :z-index="zIndex"
      :initial-index="imageIndex"
      :url-list="previewSrcList"
      :on-close="closeViewer"
    />
  </div>
</template>

<script type="text/babel">
import ImageViewer from "./image-viewer";
export default {
  name: "ImgUpload",
  components: {
    ImageViewer,
  },
  model: {
    prop: "images",
    event: "value",
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    // action: { type: String }, // 图片上传URL
    // eslint-disable-next-line vue/require-default-prop
    // listUrl: { type: String }, // 图片列表数据URL
    enableUpload: { type: Boolean, default: true }, // 是否启用图片上传
    limit: { type: Number, default: 10 }, // 最多可选择图片数量
    maxSize: { type: Number, default: 2 }, // 最大尺寸（M）
    images: {
      type: [Array, String],
      default: function () {
        return "";
      },
    }, // 已选图片
    activeTab: { type: String, default: "pick" },
  },

  data() {
    return {
      isLoading: true,
      theImages: [],
      uploadSuccessCount: 0,
      showViewer: false,
      zIndex: 999,
      imageIndex: 0,
      previewSrcList: [],
    };
  },
  watch: {
    theImages: function () {
      if (!this.images || (this.limit == 1 && typeof this.images == "string")) {
        if (this.theImages && this.theImages.length > 0) {
          this.$emit("value", this.theImages[0].url);
        } else {
          this.$emit("value", "");
        }
      } else {
        let urls = [];
        this.theImages.forEach((item) => {
          urls.push(item.url);
        });
        this.$emit("value", urls);
      }
      this.$emit("change", this.theImages);
    },
    images(val) {
      this.init(val);
    },
  },
  created() {
    this.init(this.images);
  },
  methods: {
    init(val) {
      if (val) {
        if (typeof val == "string") {
          this.theImages = [
            {
              url: val,
            },
          ];
        } else {
          let urls = [];
          val.forEach((item) => {
            urls.push({
              url: item.url,
            });
          });
          this.theImages = urls;
        }
      } else {
        this.theImages = [];
      }
    },
    onUpload() {
      this.$elxImgbox(
        {
          action: this.action,
          listUrl: this.listUrl, // 图片列表数据URL
          limit: this.limit, // 最多可选择图片数量
          maxSize: this.maxSize, // 最大尺寸（M）
          callback: (images) => {
            this.theImages = images;
          },
        },
        this.theImages
      );
    },
    onPreview(index) {
      let images = [];
      this.theImages.forEach((item) => {
        images.push(item.url);
      });
      this.previewSrcList = images;
      this.imageIndex = index;
      this.showViewer = true;
    },
    closeViewer() {
      this.showViewer = false;
    },
    onRemove(imgIndex) {
      this.theImages.splice(imgIndex, 1);
    },
  },
};
</script>

<style lang="scss">
.elx-imgbox .elx-images {
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
  .el-upload-list__item-thumbnail {
    object-fit: cover;
  }
}

.single-img .el-upload-list--picture-card .el-upload-list__item {
  margin: 0;
}
</style>
