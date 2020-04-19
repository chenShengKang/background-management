<template>
  <el-card>
    <crumbs left="订单管理" right="订单列表"></crumbs>
    <br>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="60">
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="order_price"        
        label="订单价格">
      </el-table-column>
        <el-table-column
        prop="is_send"                
        label="是否付款">
        <template slot-scope="tableData">
          <el-tag v-if="tableData.row.order_pay === '0'">已付款</el-tag>
          <el-tag type="danger" v-else>未付款</el-tag>
        </template>
      </el-table-column>
        <el-table-column
        prop="is_send"                        
        label="是否发货">
      </el-table-column>
        <el-table-column                       
        label="下单时间">
        <template slot-scope="tableData">
            {{tableData.row.create_time | fmtdate}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="tableData">
          <el-button @click="showEditMes(tableData.row.order_id)" type="primary" icon="el-icon-edit" circle size="mini" plain=""></el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="pagesize"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog title="修改订单地址" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item  label="省市区" label-width="100px">
           <el-cascader
              clearalbe
              expand-trigger="hover"
              :options="options"
              v-model="selectOptions"
              
              :props="defaultProp"
            >

            </el-cascader>
        </el-form-item>
          <el-form-item label="详细地址" label-width="100px">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addAddress">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
import catlist from '@/assets/js/city.js'
export default {
  name:'oder',
  data(){
    return {
      page:1,
      pagesize:10,
      tableData:[],
      total:120,
      dialogFormVisibleEdit: false,
      selectOptions:[],
      form:{
        address:''
      },
      options:[],
      defaultProp:{
        label:'text',
        value:'value',
        children:'children'
      },
    }
  },
  created(){
    this.getOderList()
    
  },
  methods: {
    addAddress(){

    },
    showEditMes(id){
      this.dialogFormVisibleEdit= true
      this.options = catlist
      console.log(this.options);
      
    },
    handleSizeChange(val){
      console.log(val);
      this.pagesize = val
      this.page = 1
      this.getOderList()
    },
    handleCurrentChange(val){
       this.page = val;
      this.getOderList();
    },
    async getOderList(){
      const res = await this.$http.get(`/oder?pagenum=${this.page}&pagesize=${this.pagesize}`)
      console.log(res);
      this.tableData = res.data.data
    }
  }

}
</script>

<style scoped>

</style>
