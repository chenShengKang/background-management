<template>
  <el-card>
    <crumbs left="权限管理" right="权限列表"></crumbs>
      <br />
     <el-button @click="showAddBox" type="primary" plain>添加角色</el-button>
     <br />
     <el-table
      :data="permList"
      style="width: 100%">

      <el-table-column
       type="expand"
        width="60">
        <template slot-scope="permList">
          <el-row v-for="(item1,index) of roleList" :key="index">
            <el-col :span='4' class="flex">
              <el-tag type="success">{{item1.name}} </el-tag> 
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span='20' >
              <el-row v-for="(item2,index) of item1.child " :key="index"> 
                <el-col :span='4' class="flex">
                  <el-tag type="info">{{item2.name}}</el-tag> 
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span='20'  class="flex">
                  <el-tag closable type="warning" v-for="(item3,index) of item2.child " :key="index">{{item3.name}}</el-tag>                  
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column
        prop="role_name"
        label="角色名称"
        width="180">
      </el-table-column>

       <el-table-column
        prop="role_desc"
        label="角色描述">
      </el-table-column>

      <el-table-column
        label="操作">
        <template slot-scope="permList">
          <el-button @click="showEditBox(permList.row)"  type="primary" icon="el-icon-edit" circle size="mini" plain=""></el-button>
          <el-button @click="showPro()" type="success" icon="el-icon-check" circle size="mini" plain=""></el-button>
          <el-button @click="deleteMes(permList.row.role_id)" type="danger" icon="el-icon-delete" circle size="mini" plain=""></el-button>
            
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form">
          <el-form-item  label="角色名称" label-width="100px">
            <el-input  v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="角色描述" label-width="100px">
            <el-input v-model="form.userdesc" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="addRole">确 定</el-button>
        </div>
      </el-dialog>

       <!-- 编辑用户对话框 -->
      <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="form">
          <el-form-item label="角色名称" label-width="100px">
            <el-select v-model="form.role_name" placeholder="请选择活动区域">
              <el-option label="请选择" :value="-1"></el-option>
              <el-option  v-for="(item,index) of permList" :key="index" :label="item.role_name" :value="item.role_name"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="角色描述" label-width="100px">
            <el-input v-model="form.role_desc" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="eidtRole(form.role_id)">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 数组件结构 -->

      <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
        <el-tree
          :data="roleList"
          show-checkbox
          node-key="name"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps">
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
  </el-card>
</template>

<script>

export default {
  name:'perm',
  data(){
    return {
      permList:[],
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRight: false,
      form:{
        username:'',
        userdesc:''
      },
      currentAdminId:-1,
      roleList:[
        {
          name:'商品管理',
          child:[
            {
              name:'商品列表',
              child:[
                {name:'添加商品'},
                {name:'商品修改'},
                {name:'商品怎加'},
              ]
              },
            {name:'分类参数',child:[
                {name:'添加商品'},
                {name:'商品修改'},
                {name:'商品怎加'},
              ]},
            {name:'商品分类',child:[
                {name:'添加商品'},
                {name:'商品修改'},
                {name:'商品怎加'},
              ]},
            ]
        },
        {
          name:'订单管理',
           child:[
            {name:'订单列表',child:[
                {name:'添加商品'},
                {name:'商品修改'},
                {name:'商品怎加'},
              ]},
            ]
          },
        {
          name:'权限管理',
          child:[
            {name:'角色列表',child:[
                {name:'添加商品'},
                {name:'商品修改'},
                {name:'商品怎加'},
              ]},
            {name:'权限列表',child:[
                {name:'添加商品'},
                {name:'商品修改'},
                {name:'商品怎加'},
              ]},
            ]
          },
        {
          name:'用户管理',
          child:[
            {name:'用户列表',child:[
                {name:'添加商品'},
                {name:'商品修改'},
                {name:'商品怎加'},
              ]},
            ]
           
          },
        {
          name:'数据统计',
           child:[
            {name:'数据列表',child:[
                {name:'添加商品'},
                {name:'商品修改'},
                {name:'商品怎加'},
              ]},
            ]
          },
      ],
       defaultProps: {
          children: 'child',
          label: 'name'
        }
    }
  },
  created(){
    this.getPermList()

  },
  methods: {
    async getPermList(){
      const res = await this.$http.get('/perm')
      console.log(res);
      this.permList = res.data.data
    },
    
    showAddBox(){
      this.dialogFormVisibleAdd = true
    },
    async addRole(){
      const res = await this.$http.post('/perm',this.form)
      if(res.data.message === 'success'){
        this.form = {}
        this.dialogFormVisibleAdd = false
        this.getPermList()
      }
    },
    showEditBox(user){
      this.form = user
      this.currentAdminId = user.role_id
      console.log(user);
      this.dialogFormVisibleEdit = true
    },
    async eidtRole(roleId){
      console.log(this.form);
      const res = await this.$http.put(`/perm/${roleId}`,this.form)
      console.log(res);
      if(res.message = 'success'){
        this.dialogFormVisibleEdit = false
        this.form = {}
        this.getPermList()
      }
    },
    deleteMes(roleId){
       this.$confirm('删除用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`perm/${roleId}`)
          console.log(res);
          if(res.data.message = 'success'){
             this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getPermList()
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    showPro(){
      this.dialogFormVisibleRight = true
    }
  }


}
</script>

<style scoped>
.flex{
  display: flex;
  
}
.flex i{
  margin-right: 10px;
  vertical-align: middle;
  margin-top: 10px;
}
</style>
