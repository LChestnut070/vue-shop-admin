<template>
  <div class="dashboard-container">
    <Card></Card>
    <Sale></Sale>
    <Observe></Observe>
  </div>
</template>

<script>
import Card from '@/views/dashboard/Card/index.vue'
import Sale from '@/views/dashboard/Sale/index.vue'
import Observe from '@/views/dashboard/Observe/index.vue'
export default {
  name: 'Dashboard',
  components: {
    Card,
    Sale,
    Observe
  },
  data() {
    return {
      page: 1,
      limit: 3
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
