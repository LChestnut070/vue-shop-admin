<template>
  <div>
    <el-form label-width="80px">
      <!--SPU名称-->
      <el-form-item label="SPU名称">
        {{ spu.spuName }}
      </el-form-item>
      <!--SKU名称-->
      <el-form-item label="SKU名称">
        <el-input placeholder="sku名称" v-model="skuinfo.skuName"></el-input>
      </el-form-item>
      <!--价格-->
      <el-form-item label="价格(元)">
        <el-input v-model="skuinfo.price" placeholder="价格(元)" type="number"></el-input>
      </el-form-item>
      <!--重量-->
      <el-form-item label="重量(kg)">
        <el-input v-model="skuinfo.weight" placeholder="重量(kg)"></el-input>
      </el-form-item>
      <!--规格描述-->
      <el-form-item label="规格描述">
        <el-input v-model="skuinfo.skuDesc" type="textarea" rows="4"></el-input>
      </el-form-item>
      <!--平台属性-->
      <el-form-item label="平台属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item v-for="attrinfo in attrInfoList" :key="attrinfo.id" :label="attrinfo.attrName">
            <el-select v-model="attrinfo.attrIdAndValueId" placeholder="请选择">
              <el-option v-for="attrinfovalue in attrinfo.attrValueList" :key="attrinfovalue.id" :label="attrinfovalue.valueName" :value="`${attrinfo.id}:${attrinfovalue.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!--销售属性-->
      <el-form-item label="销售属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item v-for="saleattr in spuSaleAttrList" :key="saleattr.id" :label="saleattr.saleAttrName">
            <el-select v-model="saleattr.attrIdAndValueId" placeholder="请选择">
              <el-option v-for="saleattrvalue in saleattr.spuSaleAttrValueList" :key="saleattrvalue.id" :label="saleattrvalue.saleAttrValueName" :value="`${saleattr.id}:${saleattrvalue.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!--图片列表-->
      <el-form-item label="图片列表">
        <el-table style="width: 100%" border :data="spuImgList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" prop="prop" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{row,$index}">
              <img :src="row.imgUrl" style="width:100px;height:100px" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" v-if="row.isDefault===0" @click="changeDefault(row)">设置默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>-
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import sku from '@/views/product/sku/index.vue'

export default {
  name: '',
  computed: {
    sku() {
      return sku
    }
  },
  data() {
    return {
      // 销售图片
      spuImgList: [],
      // 销售属性
      spuSaleAttrList: [],
      // 平台属性
      attrInfoList: [],
      // sku属性
      skuinfo: {
        category3Id: '',
        price: '',
        spuId: '',
        //
        tmId: '',
        // 重量
        weight: '',
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   attrName: '',
          //   id: 0,
          //   skuId: 0,
          //   valueId: 0,
          //   valueName: ''
          // }
        ],
        skuDefaultImg: '',
        skuDesc: '',
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: '',
          //   imgUrl: '',
          //   isDefault: '',
          //   skuId: 0,
          //   spuImgId: 0
          // }
        ],
        skuName: '',
        // 销售属性
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: '',
          //   saleAttrValueId: 0,
          //   saleAttrValueName: '',
          //   skuId: 0,
          //   spuId: 0
          // }
        ]
      },
      // 单个spu信息
      spu: {},
      // 表格被选中的图片
      checkedImgList: []
    }
  },
  methods: {
    // 获取初始数据
    async getData(spu, cate1Id, cate2Id) {
      this.skuinfo.category3Id = spu.category3Id
      this.skuinfo.spuId = spu.id
      this.skuinfo.tmId = spu.tmId
      this.spu = spu
      // 获取图片数据
      const imgRes = await this.$API.spu.reqGetSpuImgList(spu.id)
      if (imgRes.code === 200) {
        const list = imgRes.data
        list.forEach(item => {
          item.isDefault = 0
        })
        this.spuImgList = list
      }
      // 获取spu销售属性
      const attrRes = await this.$API.spu.reqGetSaleAttrList(spu.id)
      if (attrRes.code === 200) {
        this.spuSaleAttrList = attrRes.data
      }
      // 获取spu平台属性
      const infoRes = await this.$API.attr.reqGetAttrList(cate1Id, cate2Id, spu.category3Id)
      if (infoRes.code === 200) {
        this.attrInfoList = infoRes.data
      }
    },
    // 表格复选框
    handleSelectionChange(params) {
      // params缺少isdefault字段
      this.checkedImgList = params
    },
    changeDefault(row) {
      this.spuImgList.forEach(item => {
        item.isDefault = 0
      })
      row.isDefault = 1
      this.skuinfo.skuDefaultImg = row.imgUrl
    },
    // 保存
    async save() {
      const { attrInfoList, skuinfo, spuSaleAttrList, checkedImgList } = this
      // 平台属性
      skuinfo.skuAttrValueList = attrInfoList.reduce((prev,item) => {
        if (item.attrIdAndValueId) {
          // split返回的结果为数组
          const [attrId, valueId] = item.attrIdAndValueId.split(':')
          // 每次向prev push一个对象
          prev.push({ attrId, valueId })
          // 需要返回prev以供下次使用
        }
        return prev
      }, [])
      // 销售属性
      skuinfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev,item) => {
        if (item.attrIdAndValueId) {
          // split返回的结果为数组
          const [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(':')
          // 每次向prev push一个对象
          prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
      }, [])
      // 图片
      skuinfo.skuImageList = checkedImgList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      // 发送请求
      const res = await this.$API.spu.reqAddSku(skuinfo)
      if (res.code === 200) {
        this.$message.success('添加sku成功')
        this.$emit('changeScene',{ scene: 0, flag: '' })
      }
    },
    // 取消
    cancel() {
      this.$emit('changeScene',{ scene: 0, flag: '' })
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>

<style scoped>

</style>
