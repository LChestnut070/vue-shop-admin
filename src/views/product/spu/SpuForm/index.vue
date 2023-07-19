<template>
  <div>
    <el-form label-width="80px" :model="spuInfo">
      <!--SPU名称-->
      <el-form-item label="SPU名称">
        <el-input v-model="spuInfo.spuName" placeholder="请输入spu名称" />
      </el-form-item>
      <!--品牌-->
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spuInfo.tmId">
          <el-option v-for="(trademark,index) in trademarkList" :key="trademark.id" :value="trademark.id" :label="trademark.tmName"/>
        </el-select>
      </el-form-item>
      <!--spu描述-->
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" placeholder="描述" v-model="spuInfo.description"/>
      </el-form-item>
      <!--spu图片-->
      <el-form-item label="SPU图片">
        <el-upload action="/dev-api/admin/product/fileUpload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess" :file-list="spuImgList">
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <!--销售属性-->
      <el-form-item label="销售属性">
        <el-select v-model="attrIdAndName" :placeholder="`还有${unselectSaleAttr.length}种属性未选择`">
          <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="unselect in unselectSaleAttr" :key="unselect.id"/>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndName" @click="addSaleAttr">添加销售属性</el-button>
        <el-table border :data="spuInfo.spuSaleAttrList">
          <el-table-column label="序号" type="index" width="80" align="center" />
          <el-table-column label="属性名" width="width" prop="saleAttrName" />
          <el-table-column label="属性值" width="width" prop="prop">
            <template v-slot="{row,$index}">
              <el-tag v-for="(tag,index) in row.spuSaleAttrValueList" :key="tag.id" closable :disable-transitions="false" @close="handleClose(row,index)">{{ tag.saleAttrValueName }}</el-tag>
              <el-input v-if="row.inputVisible" ref="saveTagInput" v-model="row.inputValue" class="input-new-tag" size="small" @keyup.enter.native="$event.target.blur" @blur="handleInputConfirm(row)"></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">+ 新增</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width" prop="prop">
            <template v-slot="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete($index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!--保存取消操作-->
      <el-form-item>
        <el-button type="primary" @click="addOrUpdate">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      // spu基本信息
      spuInfo: {
        // 三级分类id
        category3Id: 0,
        // 描述
        description: '',
        // spu名称
        spuName: '',
        // spu图片
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: '',
          //   imgUrl: '',
          //   spuId: 0
          // }
        ],
        // spu属性与属性值信息
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: '',
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: '',
          //       saleAttrName: '',
          //       saleAttrValueName: '',
          //       spuId: 0
          //     }
          //   ]
          // }
        ],
        // 平台id
        tmId: ''
      },
      // spu分类
      trademarkList: [],
      // spu图片
      spuImgList: [],
      // 全部销售属性
      saleAttrList: [],
      // 未选择的销售属性id
      attrIdAndName: ''
    }
  },
  computed: {
    unselectSaleAttr() {
      return this.saleAttrList.filter(item => {
        return this.spuInfo.spuSaleAttrList.every(item1 => {
          // item1的每个值的name与item的当前name是否都不相等,如果都不相等返回true,则代表这个item的name不与item1的每个name值重复,表示需要他
          return item.name !== item1.saleAttrName
        })
      })
    }
  },
  methods: {
    //
    handleRemove(file, fileList) {
      this.spuImgList = fileList
    },
    // 查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 添加图片成功回调
    handleSuccess(response, file, fileList) {
      this.spuImgList = fileList
      this.spuInfo.spuImageList = this.spuImgList.map(item => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url
        }
      })
    },
    // 初始化spu
    async initSpuData(row) {
      // 获取spu信息
      const spuRes = await this.$API.spu.reqGetSpuById(row.id)
      if (spuRes.code === 200) {
        this.spuInfo = spuRes.data
      }
      // 获取品牌的信息
      const trademarkRes = await this.$API.spu.reqGetTrademarkList()
      if (trademarkRes.code === 200) {
        this.trademarkList = trademarkRes.data
      }
      // 获取spu图片的地址
      const ImgRes = await this.$API.spu.reqGetSpuImgList(row.id)
      if (ImgRes.code === 200) {
        const images = ImgRes.data
        images.forEach(item => {
          // elementui展示图片需要有固定字段name和url
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImgList = images
      }
      //   获取平台全部的销售属性
      const saleRes = await this.$API.spu.reqBaseSaveAttrList()
      if (saleRes.code === 200) {
        this.saleAttrList = saleRes.data
      }
    },
    // 添加spu
    async addSpu(cate3Id) {
      this.spuInfo.category3Id = cate3Id
      // 获取品牌的信息
      const trademarkRes = await this.$API.spu.reqGetTrademarkList()
      if (trademarkRes.code === 200) {
        this.trademarkList = trademarkRes.data
      }
      //   获取平台全部的销售属性
      const saleRes = await this.$API.spu.reqBaseSaveAttrList()
      if (saleRes.code === 200) {
        this.saleAttrList = saleRes.data
      }
    },
    // 表格新增属性值
    addSaleAttrValue(row) {
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
    },
    // 新增属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(':')
      const newAttrObj = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
      this.spuInfo.spuSaleAttrList.push(newAttrObj)
      this.attrIdAndName = ''
    },
    // 表格input失焦
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row
      if (inputValue.trim() === '') {
        this.$message.error('属性值不能为空')
        return
      }
      const result = row.spuSaleAttrValueList.some(item => {
        // 如果输入的值与现有值有相同的,则返回false,some也返回false,如果值没有一个与现有值相同的,则返回全返回true,some返回true(只要some的值返回一个true,后面的都不再执行)
        console.log('12333我')
        return item.saleAttrValueName === inputValue
      })
      if (result) return
      const newAttrValueObj = { baseSaleAttrId , saleAttrValueName: inputValue }
      row.spuSaleAttrValueList.push(newAttrValueObj)
      row.inputVisible = false
    },
    // 表格tag删除
    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index,1)
    },
    // 表格删除按钮
    handleDelete(index) {
      this.spuInfo.spuSaleAttrList.splice(index, 1)
    },
    // 保存
    async addOrUpdate() {
      const res = await this.$API.spu.reqAddOrUpdateSpu(this.spuInfo)
      if (res.code === 200) {
        this.$message.success('保存成功')
        this.$emit('changeScene', { scene: 0, flag: this.spuInfo.id ? '修改' : '添加' })
      }
      Object.assign(this._data, this.$options.data())
    },
    //   取消
    cancel() {
      this.$emit('changeScene', { scene: 0, flag: '' })

      // this._data为已经渲染的响应式data数据,this.$options.data()为原始声明的对象:data(){return{......}},使用object.assign将后者与前者进行数据融合回复到初始值
      Object.assign(this._data, this.$options.data())
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
