<template>
  <div class="rightlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="AllRightlist" border style="width: 100%">
      <el-table-column label="#" type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">{{scope.row.level|cengji}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllRightlist } from '@/api/rightlist_api.js'
export default {
  data () {
    return {
      AllRightlist: []
    }
  },
  filters: {
    cengji (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
    }
  },
  mounted () {
    getAllRightlist('list')
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.AllRightlist = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="less" scoped>
</style>
