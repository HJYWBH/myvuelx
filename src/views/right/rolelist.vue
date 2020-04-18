<template>
  <div class="rolelist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="success" round style="margin-bottom:15px" @click="addjuese">添加角色</el-button>
    <!-- 展开行 -->
    <el-table :data="rolelist" border style="width: 100%">
      <el-table-column type="expand">
        <!-- slot-scope="props" -->
        <template slot-scope="scope">
          <el-row
            v-for="first in scope.row.children"
            :key="first.id"
            style="border-bottom:1px dashed #ccc;margin-bottom:12px"
          >
            <el-col :span="4">
              <el-tag closable type="success">{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20" style="margin-bottom:6px">
              <el-row v-for="second in first.children" :key="second.id">
                <el-col :span="4" style="margin-bottom:6px">
                  <el-tag closable type>{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    @close="delquanxian(scope.row,third.id)"
                    style="margin-left:6px;margin-bottom:6px"
                    v-for="third in second.children"
                    :key="third.id"
                    closable
                    type="warning"
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-show="scope.row.children.length===0">
            <el-col>没有任何权限，请先去分配</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50" label="#"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="描述"></el-table-column>
      <el-table-column label="操作">
        <!-- slot-scope="scope" -->
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle @click="editShowDialog(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配权限" placement="top">
            <el-button type="success" icon="el-icon-check" circle @click="fenpjuese(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteroleDialog(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配权限对话框 -->
    <el-dialog title="授权角色" :visible.sync="fenpeijuesedialogFormVisible">
      <!-- <el-form :model="form">
      </el-form>-->
      <el-tree
        ref='mytree'
        :data="rightlists"
        :show-checkbox="true"
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="checkedArr"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fenpeijuesedialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="fenpeiwancheng">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="addform11dialogFormVisible">
  <el-form :model="addform11" :label-width="'120px'">
    <el-form-item label="角色名称" >
      <el-input v-model="addform11.roleName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" >
      <el-input v-model="addform11.roleDesc" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addform11dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addroles">确 定</el-button>
  </div>
</el-dialog>
    <!-- 添加编辑对话框 -->
    <el-dialog title="编辑角色" :visible.sync="editform11dialogFormVisible">
  <el-form :model="editform11" :label-width="'120px'">
    <el-form-item label="角色名称" >
      <el-input v-model="editform11.roleName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" >
      <el-input v-model="editform11.roleDesc" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editform11dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="editgenggai">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
import { roleAllList, addrole, editroles, deleterole } from '@/api/role_api.js'
import {
  getAllRightlist,
  delzhidingquanxian,
  fenpeiquanxian
} from '@/api/rightlist_api.js'

export default {
  data () {
    return {
      editform11dialogFormVisible: false,
      editform11: {
        id: '',
        roleName: '',
        roleDesc: ''
      },
      addform11: {
        roleName: '',
        roleDesc: ''
      },
      addform11dialogFormVisible: false,
      roleid: '',
      checkedArr: [],
      rightlists: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      fenpeijuesedialogFormVisible: false,
      tableData: [],
      rolelist: []
    }
  },
  methods: {
    // 删除角色对话框
    deleteroleDialog (id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleterole(id)
          .then((res) => {
            if (res.data.meta.status === 200) {
              this.$message({
                type: 'success',
                message: res.data.meta.msg
              })
              this.init()
            } else {
              this.$message({
                type: 'error',
                message: res.data.meta.msg
              })
            }
          })
          .catch((err1) => {
            console.log(err1)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑更改
    editgenggai () {
      editroles(this.editform11)
        .then((res) => {
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
            this.editform11dialogFormVisible = false
            this.init()
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
    },
    // 编辑对话框展示
    editShowDialog (row) {
      this.editform11dialogFormVisible = true
      this.editform11.id = row.id
      this.editform11.roleName = row.roleName
      this.editform11.roleDesc = row.roleDesc
      console.log(this.editform11)
    },
    // 添加角色
    addroles () {
      addrole(this.addform11)
        .then((res) => {
          if (res.data.meta.status === 201) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
            this.addform11dialogFormVisible = false
            this.init()
            this.addform11 = {}
            // this.addform11.roleName = ''
            // this.addform11.roleDesc = ''
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
    },
    // 添加角色对话框
    addjuese () {
      this.addform11dialogFormVisible = true
    },
    // 确定分配
    fenpeiwancheng () {
      var arr = this.$refs.mytree.getCheckedNodes()
      var temp = arr.map((val, index) => {
        return val.id + ',' + val.pid
      })
      var str = temp.join(',')
      var arr1 = str.split(',')
      var arr2 = [...new Set(arr1)]
      fenpeiquanxian(this.roleid, arr2.join(','))
        .then((res) => {
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
            this.fenpeijuesedialogFormVisible = false
            this.init()
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
    },
    // 分配权限
    fenpjuese (row) {
      this.fenpeijuesedialogFormVisible = true
      this.roleid = row.id
      getAllRightlist('tree')
        .then(res => {
          if (res.data.meta.status === 200) {
            this.rightlists = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.checkedArr.length = 0
      row.children.forEach(first => {
        if (first.children && first.children.length > 0) {
          first.children.forEach(second => {
            if (second.children && second.children.length > 0) {
              second.children.forEach(third => {
                this.checkedArr.push(third.id)
              })
            }
          })
        }
      })
    },
    // 删除指定权限
    delquanxian (row, rid) {
      delzhidingquanxian(row.id, rid)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
            row.children = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    init () {
      roleAllList('list')
        .then(res => {
          if (res.data.meta.status === 200) {
            this.rolelist = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
</style>
