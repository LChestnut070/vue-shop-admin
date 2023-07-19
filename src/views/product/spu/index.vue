<template>
  <div>
    <el-card style="margin:20px 0">
      <CategorySelect :isShowList="scene===0" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <!--展示spu列表-->
      <div v-show="scene===0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!cate3Id" @click="addSpu">添加SPU</el-button>
        <el-table style="width: 100%" border :data="spuList">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width"></el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width"></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index}">
              <HintButton type="success" icon="el-icon-plus" title="添加SKU" @click="addSku(row)"></HintButton>
              <HintButton type="warning" icon="el-icon-edit" title="修改SPU" @click="updateSpu(row)"></HintButton>
              <HintButton title="查看当前SPU所有Sku列表" icon="el-icon-info" type="info" @click="lookSku(row)"></HintButton>
              <el-popconfirm title="要删除吗" @onConfirm="deleteSpu(row)">
                <el-button type="danger" icon="el-icon-delete" title="删除SPU" slot="reference"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="text-align: center" :current-page="page" :page-sizes="[3,5,10]" :page-size="limit" layout="prev,pager,next,jumper,->,total,sizes" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
      </div>
      <!--添加|修改spu-->
      <SpuForm v-show="scene===1" ref="spu" @changeScene="changeScene"></SpuForm>
      <!--添加sku-->
      <SkuForm v-show="scene===2" ref="sku" @changeScene="changeScene"></SkuForm>
    </el-card>
    <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close="closeDialog">
      <el-table v-loading="loading" :data="skuList" border>
        <el-table-column prop="skuName" label="名称"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="weight" label="重量"></el-table-column>
        <el-table-column prop="prop" label="默认图片">
          <template v-slot="{row,$index}">
            <img :src="row.skuDefaultImg" alt="" style="width: 100px;height: 100px">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import getCategoryInfo from '@/mixin/getCategoryInfo'
import SkuForm from '@/views/product/spu/SkuForm/index.vue'
import SpuForm from '@/views/product/spu/SpuForm/index.vue'
export default {
  name: 'Spu',
  components: {
    SpuForm,
    SkuForm
  },
  mixins: [getCategoryInfo],
  data() {
    return {
      // 第几页
      page: 1,
      // 每页个数
      limit: 3,
      // spu列表
      spuList: [],
      // 列表总数
      total: 0,
      // 控制显示,0为spu列表,1为添加|修改spu,2为添加sku
      scene: 0,
      dialogTableVisible: false,
      // spu信息
      spu: {},
      // sku列表
      skuList: [],
      // 加载动画
      loading: true
    }
  },
  methods: {
    async getSpuList() {
      const { page, limit, cate3Id } = this
      const res = await this.$API.spu.reqGetSpuList(page, limit, cate3Id)
      if (res.code === 200) {
        this.spuList = res.data.records
        this.total = res.data.total
      }
    },
    // 当前页发生变化
    handleCurrentChange(page) {
      this.page = page
      this.getSpuList()
    },
    // 每页个数发生变化
    handleSizeChange(limit) {
      this.limit = limit
      this.getSpuList()
    },
    // 添加spu
    addSpu() {
      this.scene = 1
      this.$refs.spu.addSpu(this.cate3Id)
    },
    // 修改spu
    updateSpu(row) {
      this.scene = 1
      this.$refs.spu.initSpuData(row)
    },
    // 改变列表显示与表单显示
    changeScene({ scene, flag }) {
      this.scene = scene
      if (flag === '添加') {
        this.page = 1
        this.getSpuList()
      } else {
        this.getSpuList()
      }
    },
    // 删除spu
    async deleteSpu(row) {
      const res = await this.$API.spu.reqDeleteSpu(row.id)
      if (res.code === 200) {
        this.$message.success('删除成功')
        console.log(this.spuList.length,this.page)
        if (this.spuList.length < 2 && this.page > 1) {
          // 如果当前列表总数只有一条那么删除后返回上一页
          this.page -= 1
        }
        this.getSpuList()
      }
    },
    // 添加sku
    addSku(row) {
      this.scene = 2
      this.$refs.sku.getData(row, this.cate1Id, this.cate2Id)
    },
    // 查看sku列表
    async lookSku(row) {
      this.dialogTableVisible = true
      this.spu = row
      const res = await this.$API.spu.reqSkuList(row.id)
      console.log(res)
      if (res.code === 200) {
        this.loading = false
        this.skuList = res.data
      }
    },
    closeDialog(done) {
      this.loading = true
      this.skuList = []
      // 用于关闭对话框
      done()
    }
  }
}
</script>

<style scoped>

</style>
