<template>
  <div class="userIndex">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 15px;margin-bottom:15px">
      <el-input
        v-model="chakan.query"
        placeholder="请输入内容"
        class="input-with-select"
        style="width:300px;margin-right:15px"
        @keydown.enter.native="seach"
      >
        <el-button slot="append" icon="el-icon-search" @click="seach"></el-button>
      </el-input>
      <el-button type="primary" round @click="dialogFormVisible = true">添加用户</el-button>
    </div>
    <el-table :data="formData" border style="width: 100%">
      <el-table-column type="index" width="50" label="#"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="zhuajngtai" label="用户状态" width="180">
        <!-- slot-scope="scope" -->
        <template slot-scope="scope">
          <el-switch
            @change="xiugaizhuangtai(scope.row.id,scope.row.mg_state)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!-- slot-scope="scope" -->
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle @click="showEditDialog(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
            <el-button
              type="success"
              icon="el-icon-check"
              circle
              @click="showFenpeiDialog(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:15px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="chakan.pagenum"
      :page-sizes="[1, 2, 3, 4, 5]"
      :page-size="chakan.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 弹框添加表单 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="addform" :rules="rules" ref="addform">
        <el-form-item label="用户名" :label-width="'80px'" prop="username">
          <el-input v-model="addform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="'80px'" prop="password">
          <el-input v-model="addform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="'80px'" prop="email">
          <el-input v-model="addform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="'80px'" prop="mobile">
          <el-input v-model="addform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button type="primary" @click="addqueding">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisible1">
      <el-form :model="fenpeiform" :label-width="'80px'">
        <el-form-item label="用户名">
          <el-input v-model="fenpeiform.username" autocomplete="off" disabled style="width:100px"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="fenpeiform.rid" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="fenpeijuese">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible2">
      <el-form :model="editform" :label-width="'80px'" :rules="rules" ref="editform">
        <el-form-item label="用户名">
          <el-input v-model="editform.username" autocomplete="off" disabled style="width:100px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="editbianji">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  usersList,
  addusers,
  delusers,
  statususers,
  fenpeiuser,
  edittijiao
} from '@/api/user_api.js'
import { roleAllList } from '@/api/role_api.js'
export default {
  data () {
    return {
      dialogFormVisible2: false,
      editform: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      value: '',
      options: [],
      fenpeiform: {
        username: '',
        id: '',
        rid: ''
      },
      dialogFormVisible1: false,
      total: 0,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ]
      },
      addform: {
        username: '',
        password: '',
        email: 'a@b.com',
        mobile: '13535353535'
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      chakan: {
        query: '',
        pagenum: 1,
        pagesize: 3
      },
      value2: true,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      formData: []
    }
  },
  methods: {
    // 编辑
    editbianji () {
      this.$refs.editform.validate(valid => {
        if (valid) {
          edittijiao(this.editform)
            .then(res => {
              if (res.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: res.data.meta.msg
                })
                this.init()
                this.dialogFormVisible2 = false
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.meta.msg
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({
            type: 'worning',
            message: '用户输入不合法'
          })
          return false
        }
      })
    },
    // 显示编辑对话框
    showEditDialog (row) {
      this.dialogFormVisible2 = true
      this.editform.username = row.username
      this.editform.email = row.email
      this.editform.mobile = row.mobile
      this.editform.id = row.id
    },
    // 分配角色
    fenpeijuese () {
      if (!this.fenpeiform.rid) {
        this.$message({
          type: 'worning',
          message: '请选择角色'
        })
        return false
      }
      fenpeiuser(this.fenpeiform.id, this.fenpeiform.rid)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
            this.dialogFormVisible1 = false
            this.init()
          } else {
            this.$message({
              type: 'error',
              message: res.data.meta.msg
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 分配角色展示对话框
    showFenpeiDialog (row) {
      console.log(row)
      this.dialogFormVisible1 = true
      this.fenpeiform.username = row.username
      this.fenpeiform.id = row.id
      this.fenpeiform.rid = row.rid
    },
    // 修改状态
    xiugaizhuangtai (id, sta) {
      statususers(id, sta)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.meta.msg
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    del (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delusers(id)
            .then(res => {
              if (res.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: res.data.meta.msg
                })
                this.chakan.pagenum =
                  Math.ceil((this.total - 1) / this.chakan.pagesize) <
                  this.chakan.pagenum
                    ? --this.chakan.pagenum
                    : this.chakan.pagenum
                this.init()
              } else {
                this.$message({
                  type: 'info',
                  message: res.data.meta.msg
                })
              }
            })
            .catch(err1 => {
              console.log(err1)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    seach () {
      this.chakan.pagenum = 1
      this.init()
    },
    init () {
      usersList(this.chakan)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.formData = res.data.data.users
            this.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    addqueding () {
      this.$refs.addform.validate(valid => {
        if (valid) {
          addusers(this.addform)
            .then(res => {
              if (res.data.meta.status === 201) {
                this.$message({
                  type: 'success',
                  message: res.data.meta.msg
                })
                this.init()
                this.dialogFormVisible = false
                this.$refs.addform.resetFields()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.meta.msg
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          return false
        }
      })
    },
    quxiao () {
      this.dialogFormVisible = false
      this.$refs.addform.resetFields()
    },
    handleSizeChange (val) {
      this.chakan.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.chakan.pagenum = val
      this.init()
    }
  },
  mounted () {
    this.init()

    roleAllList().then(res => {
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.options = res.data.data
      }
    })
  }
}
</script>
<style lang="less" scoped></style>
