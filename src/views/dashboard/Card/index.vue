<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售量" count="¥2332">
            <template slot="charts">
              <span>周同比&nbsp;&nbsp;56.56%<svg t="1689581887874" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4674" width="16" height="16"><path d="M512 1024a42.666667 42.666667 0 0 1-42.666667-42.666667V256a42.666667 42.666667 0 0 1 85.333334 0v725.333333a42.666667 42.666667 0 0 1-42.666667 42.666667z" fill="#0B70DD" p-id="4675"></path><path d="M512 213.333333a42.666667 42.666667 0 0 0-42.666667 42.666667v181.333333h85.333334V256a42.666667 42.666667 0 0 0-42.666667-42.666667z" fill="#0B66B7" p-id="4676"></path><path d="M848.213333 416H175.786667a21.333333 21.333333 0 0 1-15.786667-35.413333L495.786667 7.253333a21.333333 21.333333 0 0 1 31.573333 0l336.213333 373.333334a21.333333 21.333333 0 0 1-15.36 35.413333z" fill="#3395FF" p-id="4677"></path></svg></span>
              <span>日同比&nbsp;&nbsp;19.22%<svg t="1689581996011" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6660" width="16" height="16"><path d="M512 0a42.666667 42.666667 0 0 1 42.666667 42.666667v725.333333a42.666667 42.666667 0 1 1-85.333334 0V42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z" fill="#0B70DD" p-id="6661"></path><path d="M175.786667 608h672.426666a21.333333 21.333333 0 0 1 15.786667 35.413333l-336.213333 373.333334a21.333333 21.333333 0 0 1-31.573334 0L160 643.413333a21.333333 21.333333 0 0 1 15.786667-35.413333z" fill="#3395FF" p-id="6662"></path></svg></span>
            </template>
            <template slot="footer">
              <span>日销售额¥3222</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="10029">
            <template slot="charts">
              <lineChart></lineChart>
            </template>
            <template slot="footer">
              <span>日销售额¥3222</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="444">
            <template slot="charts">
              <barChart></barChart>
            </template>
            <template slot="footer">
              <span>日销售额¥3222</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <progressChart></progressChart>
            </template>
            <template slot="footer">
              <span>日销售额¥3222</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from '@/views/dashboard/Card/Detail/index.vue'
import lineChart from '@/views/dashboard/Card/LineChart/index.vue'
import barChart from '@/views/dashboard/Card/BarChart/index.vue'
import progressChart from '@/views/dashboard/Card/ProgressChart/index.vue'
export default {
  name: '',
  components: {
    Detail,
    lineChart,
    barChart,
    progressChart
  }
}
</script>

<style scoped>

</style>
