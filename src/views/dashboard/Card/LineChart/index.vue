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
        type: 'line',
        data: [10, 4, 2, 5, 7, 8, 15, 5],
        itemStyle: {
          opacity: 0
        },
        lineStyle: {
          color: 'purple'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'purple'
              }, {
                offset: 1,
                color: '#fff'
              }
            ],
            global: false
          }
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
