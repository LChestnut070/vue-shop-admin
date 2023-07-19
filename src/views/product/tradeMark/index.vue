<template>
  <div>
    <!--添加按钮-->
    <el-button type="primary" icon="el-icon-plus" style="margin-top: 20px" @click="showDialog">添加</el-button>
    <!--表格区域-->
    <el-table style="width: 100%;margin-top: 20px" border :data="tradeMarkList">
      <el-table-column type="index" label="序号" width="width" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width"></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <!--用{}解构后可以直接使用数据,如果没有解构,v-slot是插槽名字,使用数据需要加上插槽名字-->
        <template v-slot="{row, $index}">
          <img :src="row.logoUrl" style="width: 100px;height: 100px" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template v-slot="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器-->
    <el-pagination style="text-align: center;margin-top: 20px" :current-page="page" :total="total" :page-size="limit" :page-sizes="[3,5,10]" :pager-count="7" layout="prev,pager,next,jumper,->,total,sizes" @current-change="getPageList" @size-change="handleSizeChange"></el-pagination>
    <!--弹出层对话框-->
    <!--:visible.sync控制对话框显示与隐藏-->
    <el-dialog :title="trademarkForm.id? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
      <el-form style="width: 80%" :model="trademarkForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="trademarkForm.tmName" ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/dev-api/admin/product/fileUpload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="trademarkForm.logoUrl" :src="trademarkForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    // 自定义校验规则
    var validatePass = (rule, value, callback) => {
      console.log(value)
      if (value.trim().length < 2 || value.trim().length > 10) {
        callback(new Error('输入的品牌名称必须是2-10位'))
      } else {
        callback()
      }
    }
    return {
      page: 1,
      limit: 3,
      total: 0,
      // 品牌列表
      tradeMarkList: [],
      // 对话框显示与隐藏
      dialogFormVisible: false,
      // 品牌属性
      trademarkForm: {
        tmName: '',
        logoUrl: ''
      },
      // 表单验证规则
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { validator: validatePass, trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请选择品牌LOGO', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.getPageList()
  },
  methods: {
    // 获取商品属性列表
    async getPageList(pager = 1) {
      // 如果不传值就为默认值,而分页器会默认传递当前页的值
      this.page = pager
      const { page, limit } = this
      const res = await this.$API.tradeMark.reqGetTradeMarkList(page, limit)
      if (res.code === 200) {
        this.total = res.data.total
        this.tradeMarkList = res.data.records
      }
    },
    // 改变分页器每页数量
    handleSizeChange(limit) {
      this.limit = limit
      this.getPageList()
    },
    // 显示对话框
    showDialog() {
      this.dialogFormVisible = true
      this.trademarkForm = {
        tmName: '',
        logoUrl: ''
      }
    },
    // 图片上传成功
    handleAvatarSuccess(res) {
      this.trademarkForm.logoUrl = res.data
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 对话框添加更新确认按钮
    addOrUpdateTradeMark() {
      this.$refs.ruleForm.validate(async(success) => {
        if (success) {
          const res = await this.$API.tradeMark.reqAddOrUpdateTradeMark(this.trademarkForm)
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: this.trademarkForm.id ? '修改品牌成功' : '上传品牌成功' })
            this.dialogFormVisible = false
            // 如果是修改则停留在当前页,是新增则跳到最后一页
            this.getPageList(this.trademarkForm.id ? this.page : Math.ceil(this.total / this.limit))
          } else {
            this.$message.error('更新失败')
          }
        } else {
          console.log('error submit')
          return false
        }
      })
    },
    // 修改品牌
    updateTradeMark(row) {
      this.dialogFormVisible = true
      // 因为row的数据是从列表里拿的,且使用的是双向绑定,如果将对话框的数据与row绑定那么相当于对话框的数据与列表数据同步
      this.trademarkForm = { ...row }
    },
    // 删除品牌
    deleteTradeMark(row){
      this.$confirm('确定要删除品牌吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await this.$API.tradeMark.reqDeleteTradeMark(row.id)
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getPageList(this.tradeMarkList.length > 1 ? this.page : this.page - 1)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
