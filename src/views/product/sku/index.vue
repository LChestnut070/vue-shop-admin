<template>
  <div>
    <el-table border :data="skuList">
      <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
      <el-table-column prop="skuName" label="名称"></el-table-column>
      <el-table-column prop="skuDesc" label="描述"></el-table-column>
      <el-table-column label="默认图片" width="110">
        <template v-slot="{row,$index}">
          <img :src="row.skuDefaultImg" alt="" style="width: 100px;height: 100px">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"></el-table-column>
      <el-table-column prop="price" label="价格" width="80"></el-table-column>
      <el-table-column prop="prop" label="操作">
        <template v-slot="{row,$index}">
          <el-button v-if="row.isSale===1" type="success" icon="el-icon-sort-down" size="mini" title="点击进行下架" @click="cancelSale(row)"></el-button>
          <el-button v-else type="success" icon="el-icon-sort-up" size="mini" title="点击进行上架" @click="onSale(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="$message('正在开发中')"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini" @click="getSkuinfo(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页器-->
    <el-pagination style="text-align: center" :page-size="limit" :page-sizes="[3,5,10]" :current-page="page" :total="total" layout="prev,pager,next,jumper,->,sizes,total" @current-change="changeCurrent" @size-change="changeSize"></el-pagination>
    <!--抽屉-->
    <el-drawer :visible.sync="drawerShow" :show-close="false" :before-close="handleClose" size="40%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuinfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuinfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格(元)</el-col>
        <el-col :span="16">{{ skuinfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag v-for="attrvalue in skuinfo.skuAttrValueList" :key="attrvalue.id" style="margin-right: 10px;">{{ attrvalue.valueName }}</el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <template>
            <el-carousel height="150px">
              <el-carousel-item v-for="item in skuinfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" alt="">
              </el-carousel-item>
            </el-carousel>
          </template>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      skuList: [],
      skuinfo: {},
      drawerShow: false
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    // 获取sku列表
    async getSkuList() {
      const res = await this.$API.sku.reqGetSkuList(this.page,this.limit)
      if (res.code === 200) {
        this.total = res.data.total
        this.skuList = res.data.records
      }
    },
    // 当前页数发生变化
    changeCurrent(page) {
      this.page = page
      this.getSkuList()
    },
    // 每页个数发生变化
    changeSize(limit) {
      this.limit = limit
      this.getSkuList()
    },
    // 下架
    async cancelSale(row) {
      const res = await this.$API.sku.reqCancelSale(row.id)
      if (res.code === 200) {
        row.isSale = 0
        this.$message.success('下架成功')
      }
    },
    // 上架
    async onSale(row) {
      const res = await this.$API.sku.reqOnSale(row.id)
      if (res.code === 200) {
        row.isSale = 1
        this.$message.success('上架成功')
      }
    },
    // 获取sku信息
    async getSkuinfo(row) {
      this.drawerShow = true
      const res = await this.$API.sku.reqGetSkuInfo(row.id)
      if (res.code === 200) {
        this.skuinfo = res.data
      }
    },
    handleClose(done) {
      done()
    }
  }
}
</script>

<style scoped>
.el-row .el-col-5{
  font-size:18px;
  text-align:right;
}
.el-col{
  margin:10px 10px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
<style>
//如果需要在加了scope的css内影响子组件需要使用样式穿透,原生:>>>,less:/deep/,scss:  ::v-deep
.el-carousel__button {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #d55f1e;
}
</style>
