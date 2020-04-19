<template>
  <el-card>
    <crumbs left="商品管理" right="分类参数"></crumbs> 
    <br>   
    <el-alert title="只允许为三级分类设置参数" type="error"></el-alert>
    <!-- 级联选择器 -->
    <br>
    <el-form label-postion='left' label-width='80'>
      <el-form-item>
        <el-cascader
          clearable
          expand-trigger="hover"
          :options="options"
          v-model="selectOptions"
          :props="defaultProp"
          @change="handleChange"
          :show-all-levels='false'
        ></el-cascader>
      </el-form-item>
      <el-tabs v-model="active" @tab-click='handleClick'>
        <el-tab-pane label='静态参数' name='1'>
          <el-button type='danger'>设置参数</el-button>
          <el-table :data='arrParams' style="width: 100%">
            <el-table-column type='expand' label="#">
            </el-table-column>
            <el-table-column  label="属性名称" prop='attr_name'> </el-table-column>
            <el-table-column  label="属性值" prop='attr_vals'> </el-table-column>
            <el-table-column  label="操作">
              <template>
                <el-button @click="showEditMsBox(tableData.row)" type="primary" icon="el-icon-edit" circle size="mini" plain=""></el-button>
                <el-button @click="showAddAdminBox(tableData.row)" type="danger" icon="el-icon-check" circle size="mini" plain=""></el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name:'categoryParmas',
  data(){
    return {
      options:[],
      selectOptions:[],
      defaultProp:{
        label:'cat_name',
        value:'cat_id',
        children:'children'
      },
      arrParams:[],
      checkList:[],
      active:'1',
      tableData:null,
      inputValue:[]
    }
  },
  created(){
    this.getGoodsList()
  },
  methods: {
    handleInputConfirm(){

    },
    handleInputConfirm(){

    },
    handleClose(){

    },
    showAddAdminBox(){

    },
    showEditMsBox(){

    },
    handleClick(){

    },
    async handleChange(){
      const res = await this.$http.get(`category/${this.selectOptions[2]}/attr?sel='manmy'`)
       res.data.data.forEach(item => {
        item.attr_vals = item.attr_vals.trim().split(',')
        item.attr_vals.forEach(item =>{
          this.checkList.push(item)
        })

      })
      this.arrParams = res.data.data
      console.log(this.arrParams);
      
    },
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
  }

}
</script>

<style scoped>

</style>
