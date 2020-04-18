<template>
  <div class="home">
    <el-container class="el-container">
      <el-aside width="200px" class="el-aside">
        <div class="logo"></div>
        <el-menu
          :router="true"
          :unique-opened="true"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu :index="first.id+''" v-for="first in leftmeuscaidan" :key="first.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{first.authName}}</span>
            </template>
            <el-menu-item :index='"/index/"+second.path' v-for="second in first.children" :key="second.id" >
              <i class="el-icon-location"></i>
              <span>{{second.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="el-header">
            <span class="myicon myicon-menu toggle-btn"></span>
            <h1 class="system-title">电商后台管理系统</h1>
            <div class="welcome">
              <span>欢迎你：{{$store.getters.getUsernamess}}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="javascript:;">退出</a>
            </div>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { leftmeus } from '@/api/rightlist_api.js'
export default {
  data () {
    return {
      leftmeuscaidan: []
    }
  },
  mounted () {
    leftmeus()
      .then((res) => {
        if (res.data.meta.status === 200) {
          this.leftmeuscaidan = res.data.data
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
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
