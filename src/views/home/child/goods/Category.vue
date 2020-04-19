<template>
  <el-card>
    <crumbs left="商品管理" right="商品分类"></crumbs>
    <br>
    <el-button type="success">添加分类</el-button>
    <el-table
      :data="options"
      style="width: 100%">
      <!-- <el-table-column
        width="160"
        prop="cat_name"
        label="分类名称">
        
      </el-table-column> -->
      <el-tree-grid 
        class="tree-grid"
        label="分类名称" 
        prop="cat_name"
        treeKey='cat_id'
        parentKey='cat_pid'
        levelKey='cat_level'
        childKey='children'
      >

      </el-tree-grid>

      <el-table-column
        label="级别"
        width="180">
        <template slot-scope="options">
          {{options.row.cat_level |level }}
        </template>
      </el-table-column>

       <el-table-column
        prop="cat_deleted"
        label="是否有效">
      </el-table-column>

      <el-table-column
        label="操作">
        <template slot-scope="permList">
          <el-button @click="showEditBox(permList.row)"  type="primary" icon="el-icon-edit" circle size="mini" plain=""></el-button>
          <el-button @click="showPro(permList.row)" type="success" icon="el-icon-check" circle size="mini" plain=""></el-button>
          <el-button @click="deleteMes(permList.row.role_id)" type="danger" icon="el-icon-delete" circle size="mini" plain=""></el-button>
            
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
// element tree grid
import elTreeGrid from 'element-tree-grid'
export default {
  name:'category',
  components:{
    elTreeGrid
  },
  data(){
    return {
      options:[],
      selectOptions:[],
      defaultProp:{
        label:'cat_name',
        value:'cat_id',
        children:'children'
      },
    }
  },
  created(){
    this.getGoodsList()
  },
  methods: {
     async getGoodsList(){
      const res = await this.$http.get('/goodsList')
      let arr = []
      res.data.data.forEach(item => {
        if(item.cat_level === 0){
          item.children = []
          arr.push(item)
        }
      })
      arr.forEach(item=>{
        res.data.data.forEach(item2=>{
          if(item.cat_id === item2.cat_pid){
            item2.children = []
            item.children.push(item2)
            res.data.data.forEach(item3=>{
              if(item2.cat_id === item3.cat_pid){
                item2.children.push(item3)
              }
            })
          }
        })
      })
      this.options = arr
     console.log(arr); 
    }
  },
  filters:{
    level(value){
      let level = null
      switch(value){
        case 0 :level='一级';
        break;
        case 1 :level='二级';
        break;
        case 2 :level='三级';
        break;
        case 3 :level='四级';
        break;
      }
      return level
    }
  }

}
</script>

<style scoped>
.tree-grid /deep/ .el-icon-folder{
  display: none;
}
</style>
