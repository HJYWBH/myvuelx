<template>
  <div class="list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 15px;margin-bottom:15px">

      <el-input
        v-model="fenye.query"
        placeholder="请输入搜索内容"
        class="input-with-select"
        style="width:300px;margin-right:15px"
        @keydown.enter.native="each"
      >
        <el-button slot="append" icon="el-icon-search" @click="each"></el-button>
      </el-input>
      <el-button type="primary" round @click="$router.push({name:'add'})">添加商品</el-button>
      <!-- @click="dialogFormVisible = true" -->
    </div>
    <el-table :data="goodsListData" border style="width: 100%">
      <el-table-column type="index" width="50" label="#"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="450"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="120"></el-table-column>
      <el-table-column prop="goods_state" label="商品状态" width="80"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="100"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="180"></el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:15px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="fenye.pagenum"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="fenye.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totals">
    </el-pagination>
  </div>
</template>
<script>
import { getAllgoodsList } from '@/api/good_api.js'
export default {
  data () {
    return {
      totals: 0,
      // 分页
      fenye: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      //   表格
      goodsListData: []
    }
  },
  methods: {
    //   筛选
    each () {
      this.init()
    },
    //   分页
    handleSizeChange (val) {
      this.fenye.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.fenye.pagenum = val
      this.init()
    },
    // 操作
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    init () {
      getAllgoodsList(this.fenye)
        .then((res) => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.goodsListData = res.data.data.goods
            this.totals = res.data.data.total
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
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
</style>
