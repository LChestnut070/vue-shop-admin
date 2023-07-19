<template>
  <div style="margin-top: 20px">
    <el-row :gutter="20">
      <el-col :span="12">
        <Search></Search>
      </el-col>
      <el-col :span="12">
        <Category></Category>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from '@/views/dashboard/Observe/Search/index.vue'
import Category from '@/views/dashboard/Observe/Category/index.vue'
export default {
  name: '',
  components: {
    Category,
    Search
  },
  mounted() {
    this.$store.dispatch('home/getData')
  }
}
</script>

<style scoped>

</style>
