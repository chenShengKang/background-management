<template>
  <div>
    <el-card class="box-card">
       <crumbs left="用户管理" right="用户列表"></crumbs>
      
      
      <!-- 搜索框 -->
      <el-row>
        <el-col class="inputSerch">
            <el-input clearable placeholder="请输入内容" v-model="query" >
              <el-button @click="searchUser" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button @click="showAddUserDia" type="success">添加</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 表格 -->
      <el-table
        :data="tableData"
        style="width: 100%"
       >
       <!--  :row-class-name="tableRowClassName" -->
        <el-table-column
          type="index"
          label="#"
          width="60">
        </el-table-column>

        <el-table-column
          prop="mg_name"
          label="姓名"
          width="80">
        </el-table-column>

        <el-table-column
          prop="mg_email"
          label="邮箱">
        </el-table-column>

         <el-table-column
          prop="mg_mobile"
          label="电话">
        </el-table-column>
        <!-- prop="mg_time" -->
         <el-table-column
          
          label="创建时间">
          <template slot-scope="tableData">
            {{tableData.row.mg_time | fmtdate}}
          </template>
        </el-table-column>

         <el-table-column
          prop="mg_email"
          label="邮箱">
        </el-table-column>
        <!--  -->
         <el-table-column
          
          label="用户状态" >
          <template slot-scope="tableData">
            <el-switch
              @change="userStatus(tableData.row.mg_id,tableData.row.mg_state)"
              v-model="tableData.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
         <el-table-column
          label="操作"
          width="160"
          >
            <template slot-scope="tableData">
              <el-button @click="showEditMsBox(tableData.row)" type="primary" icon="el-icon-edit" circle size="mini" plain=""></el-button>
              <el-button @click="showAddAdminBox(tableData.row)" type="success" icon="el-icon-check" circle size="mini" plain=""></el-button>
              <el-button @click="showDeleteMsBox(tableData.row.mg_id)" type="danger" icon="el-icon-delete" circle size="mini" plain=""></el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>


      <!-- 对话框 -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户名" label-width="100px">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="密码" label-width="100px">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>

           <el-form-item label="邮箱" label-width="100px">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>

           <el-form-item label="电话" label-width="100px">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑用户对话框 -->
      <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="form">
          <el-form-item  label="用户名" label-width="100px">
            <el-input disabled v-model="form.mg_name" autocomplete="off"></el-input>
          </el-form-item>

           <el-form-item label="邮箱" label-width="100px">
            <el-input v-model="form.mg_email" autocomplete="off"></el-input>
          </el-form-item>

           <el-form-item label="电话" label-width="100px">
            <el-input v-model="form.mg_mobile" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="eidtUser(form.mg_id)">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 用户权限设置 -->
       <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleAdmin">
        <el-form :model="form">
          <el-form-item  label="用户名" label-width="100px">
           {{form.mg_name}}
          </el-form-item>
          <el-form-item label="用户权限" label-width="100px">
            <el-select v-model="currentAdminId" placeholder="请选择活动区域">
              <el-option label="请选择" :value="-1"></el-option>
              <el-option  v-for="(item,index) of role" :key="index" :label="item.role_name" :value="item.role_id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdmin = false">取 消</el-button>
          <el-button type="primary" @click="eidtRole(form.mg_id,currentAdminId)">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>


export default {
  name:'user',
  data(){
    return {
      query:'',
      pagenum:1,
      pagesize:2,
      total:null,
       tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogFormVisible: false,
        dialogFormVisibleEdit: false,
        dialogFormVisibleAdmin: false,
        form:{
          username:'',
          password:'',
          email:'',
          mobile:''
        },
        currentAdminId:-1,
        role:[]
    }
  },
  created(){
    this.getUserList()
    this.getAdminRid()
  },
  methods: {
    //获取用户列表
    // 需要 token 授权，设置请求头
    async getUserList(){
      const AUTH_TOKEN = localStorage.getItem('token')
      // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      
      const res = await this.$http.get(`users?query="${this.query}"&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      this.total = res.data.total
      res.data.data.forEach(item=>{
        if(item.mg_state === 0){
          item.mg_state = false
        } else{
          item.mg_state = true
        }
      })
      this.tableData = res.data.data
      console.log(this.tableData);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val
      this.pagenum = 1
      this.getUserList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getUserList();
    },
    searchUser(){
      console.log(this.query);

      this.getUserList()
    },
    showAddUserDia(){
      this.form = {}
      this.dialogFormVisible = true
    },
    async addUser(){
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.post('users',this.form)
      if(res.data.message === 'success'){
          this.$message.success('成功')
          this.dialogFormVisible = false
          this.getUserList()
          this.form = {}
      }else{
        this.$message.warning('失败')
      }
    },
    showDeleteMsBox(userId) {
       this.$confirm('删除用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`users/${userId}`)
          console.log(res);
          if(res.data.message = 'success'){
            this.pagenum = 1
             this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getUserList()
          }
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
    showEditMsBox(user){
      console.log(user);
      this.form = user

      this.dialogFormVisibleEdit = true
    },
    async eidtUser(userId){
      const res = await this.$http.put(`/users/${userId}`,this.form)
        console.log(res);
      if(res.data.message === 'success'){
        this.$message.success('编辑成功')
        this.dialogFormVisibleEdit = false
      }
    },
    async userStatus(id,type){
      const res = await this.$http.put(`users/${id}/${type}`)
      console.log(res);
    },
    showAddAdminBox(user){
      this.form = user
      this.currentAdminId = user.role_id
      this.dialogFormVisibleAdmin = true
    },
    async getAdminRid(){
      const res = await this.$http.post('/role')
      this.role = res.data.data
      
      console.log(this.role);
    },
    async eidtRole(userId,RoleId){
      const res = await this.$http.put(`/role/${RoleId}/user/${userId}`)
      if(res.data.message === 'success'){
        this.$message.success('编辑成功')
        this.dialogFormVisibleAdmin = false
      }
    }
    
  }
 

}
</script>

<style lang="scss" scoped>
.inputSerch{
  display: flex;
  margin-top: 30px;
}

</style>

