<template>
  <div class="login" :style="loginStyle">
    <el-card shadow="always" style="margin-top:50px">
      <div class="login-main">
        <div class="login-logo">
          <el-image src="https://img2.baidu.com/it/u=1845445362,511278023&fm=253&fmt=auto&app=138&f=JPEG?w=334&h=500"
            style="width: 100%; height: 100%;"></el-image>
        </div>
        <div class="login-form">
          <el-form>
            <div class="login-form-title">欢迎登录</div>
            <el-form-item>
              <el-input v-model="user.name" prefix-icon="Avatar" placeholder="请输入用户名称" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input type="password" v-model="user.password" prefix-icon="Lock" show-password placeholder="请输入密码"
                style="width:100%"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="login_1" style="width:100%">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { computed, reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  props: {
    //入口参数
  },

  setup() {
    //实例化userouter
    const router = useRouter();
    //onMounted()生命周期
    onMounted(() => {

    });
    const data = reactive({
      loginStyle: {
        height: '',
      },
      user: {
        name: "",
        password: "",
        userType: ""
      },

      returnMsg: "",
      login_1: () => {
        var flag = false;
        axios
          .get("users?userName=" + data.user.name + "&userPassword=" + data.user.password)
          .then((response) => {
            var selectUsers = response.data;
            if (selectUsers && selectUsers.length > 0) {
              localStorage.setItem("userName", selectUsers[0].userName);
              localStorage.setItem("userType", selectUsers[0].userType);
              localStorage.setItem("userId", selectUsers[0].id);
              router.push({ path: 'home' });
            } else {
              data.returnMsg = "您的用户名密码不正确，请确认后再登录。"
            }
          })
          .catch((error) => console.log(error)); // 请求失败处理
      },


      reg: () => {
        router.push({
          path: "register"
        });
      }
    });

    return {
      ...toRefs(data)
    };
  }
};
</script>
<style lang="scss" scoped="scoped">
.login {
  background-image: url('../../assets/image/login-bg.svg');
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  .el-card__body {
    padding: 0;
  }

  .login-main {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .login-logo {
      width: 30rem;
      height: 500px;
      margin-right: 20px;
    }

    .login-form {
      width: 30rem;
      height: 500px;

      .login-form-title {
        margin-top: 100px;
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        padding-bottom: 2rem;
      }
    }
  }
}
</style>
