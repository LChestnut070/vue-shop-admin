export default {
  data() {
    return {
      // 一级分类id
      cate1Id: '',
      // 二级分类id
      cate2Id: '',
      // 三级分类id
      cate3Id: ''
    }
  },
  methods: {
    // 获取分类id
    getCategoryId({ cate1Id, cate2Id, cate3Id }) {
      this.cate1Id = cate1Id
      this.cate2Id = cate2Id
      this.cate3Id = cate3Id
      if (cate3Id) {
        if (this.$route.name === 'Attr') {
          // Attr
          this.getAttrList()
        } else if (this.$route.name === 'Spu') {
          // Spu
          this.getSpuList()
        }
      }
    }
  }
}
