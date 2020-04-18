<template>
  <div class="addlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-steps :active="active-0" finish-status="success" style="margin-bottom:15px">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <el-form ref="addgoodsform" :model="addgoodsform" label-width="90px">
      <el-tabs v-model="active" @tab-click="handleClick" :tab-position="'left'">
        <el-tab-pane label="基本信息" name="0">
          <el-form-item label="商品名称">
            <el-input v-model="addgoodsform.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="addgoodsform.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="addgoodsform.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="addgoodsform.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader @change="xuanzhongid" :options="options" :props="getProps" clearable></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <el-upload
            class="upload-demo"
            :before-upload="pdgs"
            :on-success="getIMGid"
            :headers="setToken()"
            action="http://localhost:8888/api/private/v1/upload"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">
          <quill-editor
            v-model="addgoodsform.goods_introduce"
            ref="myQuillEditor"
            :options="editorOption"
            style='height:400px;border-bottom:1px solid #ccc'>
        </quill-editor>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:30px;margin-left:400px">
        <el-button type="primary" @click="addgoodss">添加商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getCateAllList, addGoodsp } from '@/api/good_api.js'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      editorOption: {},
      fileList: [],
      getProps: {
        checkStrictly: true,
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      options: [],
      addgoodsform: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: '',
        pics: [],
        goods_introduce: '',
        attrs: [],
        goods_state: 1
      },
      active: 0
    }
  },
  methods: {
    addgoodss () {
      console.log(this.addgoodsform.goods_introduce)
      addGoodsp(this.addgoodsform)
        .then((res) => {
          if (res.data.meta.status === 201) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
            this.$router.push({ name: 'lists' })
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
    pdgs (file) {
      if (file.type.indexOf('image/') === -1) {
        this.$message({
          type: 'warning',
          message: '请添加正确图片格式'
        })
        return false
      }
    },
    getIMGid (response) {
      this.addgoodsform.pics.push({ pic: response.data.tmp_path })
    },
    setToken () {
      var token = localStorage.getItem('getToken')
      return { Authorization: token }
    },
    handleRemove (file) {
      if (!file.response) {
        return
      }
      for (var i = 0; i < this.addgoodsform.pics.length; i++) {
        if (this.addgoodsform.pics[i].pic === file.response.data.tmp_path) {
          this.addgoodsform.pics.splice(i, 1)
        }
      }
    },
    xuanzhongid (xzid) {
      console.log(xzid)
      this.addgoodsform.goods_cat = xzid.join(',')
    },
    handleClick (tab) {
      this.active = tab.index
    }
  },
  mounted () {
    getCateAllList(3)
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.options = res.data.data
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
  }
}
</script>
<style lang="less" scoped>
</style>
