<template>
  <div ref="charts" class="charts">

  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: '',
  mounted() {
    const lineChart = echarts.init(this.$refs.charts)
    lineChart.setOption({
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [{
        type: 'bar',
        data: [10, 4, 2, 5, 7, 8, 15, 5, 8, 5]
      }],
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      tooltip:{}
    })
  }
}
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
