<template>
  <div>
    <el-card class="box-card" style="margin-top: 10px">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" class="tab">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visit"></el-tab-pane>
        </el-tabs>
        <!--右侧内容-->
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker v-model="date" class="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <div ref="charts" class="charts"></div>
          </el-col>
          <el-col :span="6">
            <h3>门店{{ title }}排名</h3>
            <ul>
              <li>
                <span class="rindex">0</span>
                <span>肯德基</span>
                <span class="rvalue">123456</span>
              </li>
              <li>
                <span class="rindex">1</span>
                <span>肯德基</span>
                <span class="rvalue">123456</span>
              </li>
              <li>
                <span class="rindex">3</span>
                <span>肯德基</span>
                <span class="rvalue">123456</span>
              </li>
              <li>
                <span class="rindex">4</span>
                <span>肯德基</span>
                <span class="rvalue">123456</span>
              </li>
              <li>
                <span class="rindex">5</span>
                <span>肯德基</span>
                <span class="rvalue">123456</span>
              </li>
              <li>
                <span class="rindex">6</span>
                <span>肯德基</span>
                <span class="rvalue">123456</span>
              </li>
              <li>
                <span class="rindex">7</span>
                <span>肯德基</span>
                <span class="rvalue">123456</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import dayjs from 'dayjs'
import { mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {
      activeName: 'sale',
      mycharts: null,
      date: []
    }
  },
  mounted() {
    this.mycharts = echarts.init(this.$refs.charts)
    this.mycharts.setOption({
      title: {
        text: this.title + '趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: [],
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [],
          type: 'bar',
          barWidth: '40%',
          color: 'pink'
        }
      ],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
    })
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapState('home',['list']),
    title() {
      return this.activeName === 'sale' ? '销售额' : '访问量'
    }
  },
  // eslint-disable-next-line vue/order-in-components
  watch: {
    title() {
      this.mycharts.setOption({
        title: {
          text: this.title
        },
        xAxis: {
          data: this.title === '销售额' ? this.list.orderFullYearAxis : this.list.userFullYearAxis
        },
        series: [
          {
            data: this.title === '销售额' ? this.list.userFullYear : this.list.orderFullYear
          }
        ]
      })
    },
    list() {
      this.mycharts.setOption({
        title: {
          text: this.title + '趋势'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: this.list.orderFullYearAxis,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.list.userFullYear,
            type: 'bar',
            barWidth: '40%',
            color: 'pink'
          }
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
      })
    }
  },
  methods: {
    setDay() {
      const day = dayjs().format('YYYY-MM-DD')
      this.date = [day,day]
    },
    setWeek() {
      const start = dayjs().day(1).format('')
      const end = dayjs().day(7).format('')
      this.date = [start, end]
    },
    setMonth() {
      const start = dayjs().startOf('month').format('')
      const end = dayjs().endOf('month').format('')
      this.date = [start, end]
    },
    setYear() {
      const start = dayjs().startOf('year').format('')
      const end = dayjs().endOf('year').format('')
      this.date = [start, end]
    }
  }
}
</script>

<style scoped>
.clearfix{
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  top: 0;
  right: 0;
}
.date {
  width: 250px;
  margin: 0 20px;
}
.right span {
  margin: 0 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 250px;
  padding: 0px;
}

ul li {
  height: 8%;
  margin: 10px 0px;
}
.rindex {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
}

.rvalue {
  float: right;
}
</style>
