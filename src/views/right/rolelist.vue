<template>
  <div class="rolelist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="success" round style="margin-bottom:15px">添加角色</el-button>

    <el-table :data="rolelist" border style="width: 100%">
      <el-table-column type="expand">
          <!-- slot-scope="props" -->
        <template >

        </template>
      </el-table-column>
      <el-table-column type="index" width="50" label="#"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="描述"></el-table-column>
      <el-table-column label="操作">
        <!-- slot-scope="scope" -->
        <template>
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
            <el-button type="success" icon="el-icon-check" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { roleAllList } from '@/api/role_api.js'
export default {
  data () {
    return {
      tableData: [],
      rolelist: []
    }
  },
  mounted () {
    roleAllList()
      .then(res => {
        if (res.data.meta.status === 200) {
          this.rolelist = res.data.data
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
