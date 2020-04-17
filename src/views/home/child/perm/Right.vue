<template>
<div>
  <el-card>
    <crumbs left="权限管理" right="权限列表"></crumbs>
    <br/>
   <el-table
      :data="rightList"
      border
      height="400px"
      style="width: 100%">

      <el-table-column
        type="index"
        label="#"
        width="60">
      </el-table-column>

      <el-table-column
        prop="ps_name"
        label="权限名称"
        width="180">
      </el-table-column>

       <el-table-column
        prop="ps_c"
        label="路径">
      </el-table-column>

      <el-table-column
        prop="ps_level"
        label="层级">
      </el-table-column>
    </el-table>
  </el-card>
 </div> 
</template>

<script>
export default {
  name:'right',
  data(){
    return {
      rightList:[]
    }
  },
  created(){
    this.getRightList()
  },
  methods: {
    async getRightList(){
      const AUTH_TOKEN = localStorage.getItem('token')
       this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get('/right/list')
      res.data.data.forEach(item=>{
        switch(item.ps_level){
          case "0" :item.ps_level = '一级';
          break;
          case "1" :item.ps_level = '二级';
          break;
          case "2" :item.ps_level = '三级';
          break;
        }
      })
      console.log(res);
      this.rightList = res.data.data
    }
  }

}
</script>

<style scoped>

</style>
