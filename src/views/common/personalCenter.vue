<template>
  <div class="personalCenter-container">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="个人简介">
        <div class="user_avatar_nickname_info">
          <el-image
            class="user_avatar"
            :src="userInfo.avatar"
            :preview-src-list="[userInfo.avatar]"
          >
          </el-image>
          <div class="user_nickname">{{ userInfo.nickname }}</div>
        </div>
        <div class="user_info_box">
          <div class="info">
            <i class="iconfont icon-shouji"></i>
            <span>{{ userInfo.phone }}</span>
          </div>
          <div class="info">
            <i class="iconfont icon-shenfen"></i>
            <span>{{ userInfo.roleName }}</span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="基本设置">
        <el-form ref="form" :model="baseForm" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model.trim="baseForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model.trim="baseForm.phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input
              v-model.trim="baseForm.nickname"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <!-- <image-upload v-model="baseForm.avatar" :limit="1"></image-upload> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onModify('base')">修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="安全设置">
        <el-form ref="form" :rules="rules" label-width="80px">
          <el-form-item label="密码" prop="password">
            <el-input
              v-model.trim="password"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onModify('password')"
              >修改</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- <el-tab-pane label="账户绑定">安全设置</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PersonalCenter",
  data() {
    return {
      tabPosition: "left",
      baseForm: {
        nickname: "",
        username: "",
        avatar: "",
        phone: "",
      },
      password: "",
      rules: {
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
    this.baseForm = {
      nickname: this.userInfo.nickname,
      username: this.userInfo.username,
      avatar: this.userInfo.avatar,
      phone: this.userInfo.phone,
    };
  },
  methods: {
    onModify(type) {
      let httpData = {};
      if (type == "base") {
        httpData = this.baseForm;
      } else if (type == "password") {
        httpData.password = this.password;
      }
      this.$api.admin.modifyPersonalInfo(httpData).then((res) => {
        this.$baseMessage(res.msg, "success");
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.user_avatar_nickname_info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;

  .user_avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .user_nickname {
    margin-top: 15px;
    font-size: 18px;
  }
}

.user_info_box {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 500px;
  margin-top: 10px;

  .info {
    display: flex;
    align-items: center;
    padding: 10px 20px;

    .iconfont {
      margin-right: 10px;
      color: #333;
    }
  }
}
</style>
