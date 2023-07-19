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
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      series: [{
        type: 'bar',
        data: [64],
        color: 'cyan',
        barWidth: 15,
        showBackground: true,
        backgroundStyle: {
          color: '#eee'
        },
        label: {
          show: true,
          formatter: '|',
          position: 'right'
        }
      }],
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
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
