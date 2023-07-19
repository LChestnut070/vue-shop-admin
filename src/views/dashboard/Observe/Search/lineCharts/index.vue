<template>
  <div>
    <div class="header">
      <span class="search-header">搜索用户数</span>
      <svg t="1689580635970" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1451" width="16" height="16"><path d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z" fill="#8a8a8a" p-id="1452"></path></svg>
    </div>
    <div class="main">
      <span class="main-title">12231</span>
      <span class="main-content">12.5</span>
      <svg t="1689581887874" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4674" width="16" height="16"><path d="M512 1024a42.666667 42.666667 0 0 1-42.666667-42.666667V256a42.666667 42.666667 0 0 1 85.333334 0v725.333333a42.666667 42.666667 0 0 1-42.666667 42.666667z" fill="#0B70DD" p-id="4675"></path><path d="M512 213.333333a42.666667 42.666667 0 0 0-42.666667 42.666667v181.333333h85.333334V256a42.666667 42.666667 0 0 0-42.666667-42.666667z" fill="#0B66B7" p-id="4676"></path><path d="M848.213333 416H175.786667a21.333333 21.333333 0 0 1-15.786667-35.413333L495.786667 7.253333a21.333333 21.333333 0 0 1 31.573333 0l336.213333 373.333334a21.333333 21.333333 0 0 1-15.36 35.413333z" fill="#3395FF" p-id="4677"></path></svg>
      <svg t="1689581996011" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6660" width="16" height="16"><path d="M512 0a42.666667 42.666667 0 0 1 42.666667 42.666667v725.333333a42.666667 42.666667 0 1 1-85.333334 0V42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z" fill="#0B70DD" p-id="6661"></path><path d="M175.786667 608h672.426666a21.333333 21.333333 0 0 1 15.786667 35.413333l-336.213333 373.333334a21.333333 21.333333 0 0 1-31.573334 0L160 643.413333a21.333333 21.333333 0 0 1 15.786667-35.413333z" fill="#3395FF" p-id="6662"></path></svg>
    </div>
    <div class="footer">
      <div ref="charts" class="charts">
      </div>
    </div>
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
          color: 'blue'
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
                color: 'blue'
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
.header{
  display: flex;
  align-items: center;
}
.search-header{
  margin-right: 20px;
}
.main{
  margin: 10px 0px ;
}
.main-title{
  margin-right: 30px;
}
.main-content{
  margin-right: 10px;
}
.charts{
  width: 100%;
  height: 50px;
}
</style>
