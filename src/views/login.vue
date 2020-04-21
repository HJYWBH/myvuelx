<template>
  <div class="login">
    <div class="container">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
      >
        <img src="../assets/logo.png" alt="" class="avatar" />
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="myicon myicon-user"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="myicon myicon-key"
            @keydown.enter.native="loginla"
            type="password"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click='loginla'>登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import { login } from '@/api/user_api.js'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginla () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$axios({
            url: 'login',
            method: 'post',
            data: this.loginForm
          }).then((res) => {
            if (res.data.meta.status === 200) {
              this.$store.dispatch('getUsernameactions', res.data.data.username)
              localStorage.setItem('getToken', res.data.data.token)
              this.$router.push({ name: 'index' })
            } else {
              this.$message({
                type: 'error',
                message: res.data.meta.msg
              })
            }
          })
            .catch((err) => {
              console.log(err)
            })
          // login(this.loginForm)
          //   .then((res) => {
          //     if (res.data.meta.status === 200) {
          //       this.$store.dispatch('getUsernameactions', res.data.data.username)
          //       localStorage.setItem('getToken', res.data.data.token)
          //       this.$router.push({ name: 'index' })
          //     } else {
          //       this.$message({
          //         type: 'error',
          //         message: res.data.meta.msg
          //       })
          //     }
          //   })
          //   .catch((err) => {
          //     console.log(err)
          //   })
        } else {
          this.$message({
            type: 'error',
            message: '数据输入错误，请重新输入'
          })
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    margin: 200px auto;
    width: 400px;
    // height: 270px;
    padding: 0 40px 15px 40px;
    background-color: #fff;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
