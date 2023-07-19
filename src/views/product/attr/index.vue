<template>
  <div>
    <el-card style="margin:20px 0">
      <CategorySelect :isShowList="isShowList" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <!--列表展示-->
      <div v-show="isShowList">
        <el-button type="primary" icon="el-icon-plus" :disabled="!cate3Id" @click="addAttr">添加属性</el-button>
        <!--属性列表展示-->
        <el-table border :data="attrList">
          <el-table-column type="index" width="80" label="序号" align="center" />
          <!--属性名称-->
          <el-table-column prop="attrName" width="150" label="属性名称" />
          <!--属性值-->
          <el-table-column width="width" label="属性值列表">
            <template v-slot="{row,$index}">
              <el-tag v-for="attrValue in row.attrValueList" :key="attrValue.id" type="success" style="margin: 0 20px">{{ attrValue.valueName }}</el-tag>
            </template>
          </el-table-column>
          <!--操作-->
          <el-table-column prop="prop" width="200" label="操作">
            <template v-slot="{row,$index}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)">修改</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--添加|修改属性-->
      <div v-show="!isShowList">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item label="属性名">
            <el-input v-model="newAttr.attrName" placeholder="请输入属性名"></el-input>
          </el-form-item>
        </el-form>
        <!--添加按钮-->
        <el-button type="primary" icon="el-icon-plus" :disabled="!newAttr.attrName||newAttr.attrName.trim()===''" @click="addAttrValue">添加属性值</el-button>
        <el-button @click="isShowList=true">取消</el-button>
        <!--新增属性值表格-->
        <el-table style="width: 100%;margin: 20px 0" border :data="newAttr.attrValueList">
          <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template v-slot="{row, $index}">
              <el-input v-if="row.flag" :ref="$index" v-model="row.valueName" placeholder="请输入属性值名称" @keyup.native.enter="toLook(row)" @blur="toLook(row)"></el-input>
              <span v-else style="display: block" @click="toEdit(row,$index)">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template v-slot="{row,$index}">
              <el-popconfirm :title="`确定删除${row.valueName}吗?`" @onConfirm="deleteAttrValue($index)">
                <el-button type="danger" slot="reference" icon="el-icon-delete">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!--新增确认按钮-->
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="newAttr.attrValueList.length<1">保存</el-button>
        <el-button @click="toEdit(row)">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import getCategoryInfo from '@/mixin/getCategoryInfo'
export default {
  name: 'Attr',
  mixins: [getCategoryInfo],
  data() {
    return {
      // 属性值列表
      attrList: [],
      // 是否展示列表
      isShowList: true,
      // 收集新增的属性
      newAttr: {
        attrName: '',
        attrValueList: [
        ],
        categoryId: 0,
        categoryLevel: 3,
        id: 0
      },
      // 新增|修改后是否显示span
      showInput: true
    }
  },
  methods: {
    // 获取属性列表
    async getAttrList() {
      const res = await this.$API.attr.reqGetAttrList(this.cate1Id, this.cate2Id, this.cate3Id)
      if (res.code === 200) {
        this.attrList = res.data
      }
    },
    // 新增属性
    addAttr() {
      this.isShowList = false
      this.newAttr = {
        attrName: '',
        attrValueList: [
        ],
        categoryId: this.cate3Id,
        categoryLevel: 3
      }
    },
    // 修改属性值
    updateAttr(row) {
      this.isShowList = false
      // 浅拷贝无法解决嵌套,需要深拷贝
      this.newAttr = cloneDeep(row)
      this.newAttr.attrValueList.forEach(item => {
        // item.flag = true这样添加的并非响应式,vue2特有
        // vue2提供$set方法使其添加一个响应式数据
        this.$set(item, 'flag')
      })
    },
    // 新增属性值
    addAttrValue() {
      this.newAttr.attrValueList.push({
        // 如果是修改,代表有attrid传入新属性列表,如果是新增,代表没有值传入则是undefined
        attrId: this.newAttr.id,
        valueName: '',
        // push一个控制查看与编辑模式的参数
        flag: true
      })
      this.$nextTick(() => {
        this.$refs[this.newAttr.attrValueList.length - 1].focus()
      })
    },
    // span查看模式
    toLook(row) {
      console.log()
      if (row.valueName.trim().length === 0) {
        this.$message.error('不能输入空值')
        return
      }
      // console.log(row)
      // console.log(this.newAttr.attrValueList)
      const isRepat = this.newAttr.attrValueList.some(item => {
        // 需要排除自身(当row与每个item判断时,正常情况下都不应该完全相等(比如id),如果完全相等则row即为item本身)
        if (row !== item) {
          return item.valueName === row.valueName
        }
      })
      if (isRepat) {
        this.$message.error('您输入的值与其他值重复了噢')
      }
      row.flag = false
    },
    // input编辑模式
    toEdit(row, index) {
      row.flag = true
      // 因为点击后v-if无法快速进行切换,导致无法获取input,使用$nextTick让元素加载完毕后再执行
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    // 删除attr的值
    deleteAttrValue(index) {
      console.log(23)
      this.newAttr.attrValueList.splice(index, 1)
    },
    // 新增或修改attr0
    async addOrUpdateAttr() {
      this.newAttr.attrValueList = this.newAttr.attrValueList.filter(item => {
        if (item.valueName.trim() !== '') {
          delete item.flag
          return true
        }
      })
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.newAttr)
        this.$message.success('保存成功')
        this.getAttrList()
        this.isShowList = true
      } catch (error) {
        this.$message.error('保存失败')
      }
    }
  },
}
</script>

<style scoped>

</style>
