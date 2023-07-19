<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cateIdForm">
      <el-form-item label="一级分类">
        <!--收集的数据是value,显示的是label,v-model为了保存收集的数据-->
        <el-select v-model="cateIdForm.cate1Id" placeholder="请选择" :disabled="!isShowList" @change="handle1">
          <el-option v-for="cate1 in category1List" :key="cate1.id" :label="cate1.name" :value="cate1.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="cateIdForm.cate2Id" placeholder="请选择" :disabled="!isShowList" @change="handle2">
          <el-option v-for="cate2 in category2List" :key="cate2.id" :label="cate2.name" :value="cate2.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="cateIdForm.cate3Id" placeholder="请选择" :disabled="!isShowList" @change="handle3">
          <el-option v-for="cate3 in category3List" :key="cate3.id" :label="cate3.name" :value="cate3.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: ['isShowList'],
  data() {
    return {
      // 一级分类列表
      category1List: [],
      // 二级分类列表
      category2List: [],
      // 三级分类列表
      category3List: [],
      // 分类id
      cateIdForm: {
        cate1Id: '',
        cate2Id: '',
        cate3Id: ''
      }
    }
  },
  mounted() {
    this.getCategoryList1()
  },
  methods: {
    async getCategoryList1() {
      const res = await this.$API.attr.reqGetCategory1()
      if (res.code === 200) {
        this.category1List = res.data
      }
    },
    // 一级分类发生变化
    async handle1() {
      // 选择一级分类之前需要全部清除其他级分类
      this.category2List = []
      this.category3List = []
      this.cateIdForm.cate2Id = ''
      this.cateIdForm.cate3Id = ''
      const { cate1Id } = this.cateIdForm
      const res = await this.$API.attr.reqGetCategory2(cate1Id)
      if (res.code === 200) {
        this.category2List = res.data
      }
    },
    // 二级分类发生变化
    async handle2() {
      this.category3List = []
      this.cateIdForm.cate3Id = ''
      const { cate2Id } = this.cateIdForm
      const res = await this.$API.attr.reqGetCategory2(cate2Id)
      if (res.code === 200) {
        this.category3List = res.data
      }
    },
    // 三级分类发生变化
    async handle3() {
      this.$emit('getCategoryId', this.cateIdForm)
      // const res = await this.$API.attr.reqGetCategory2(cate2Id)
      // if (res.code === 200) {
      //   this.category3List = res.data
      // }
    }
  }
}
</script>

<style scoped>

</style>
