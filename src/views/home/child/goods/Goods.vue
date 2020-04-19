<template>
  <div>
    <el-card>
        <crumbs left="权限管理" right="权限列表"></crumbs>
      <br />
      <el-row>
        <el-col class="inputSerch">
            <el-input clearable placeholder="请输入内容" v-model="query" >
              <el-button @click="searchGoods" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button @click="showAddGoodsDia" type="success">添加</el-button>
        </el-col>
      </el-row>
       <el-table
          :data="goodsList"
          border
          max-height="400px"
          style="width: 100%">
          <el-table-column
            label="#"
            width="60"
            type="index">
          </el-table-column>

          <el-table-column
            prop="goods_name"
            width="auto"
            label="商品名称"
         >
          </el-table-column>

          <el-table-column
            prop="goods_price"
            label="商品价格"
            width="100">
          </el-table-column>

          <el-table-column
            prop="goods_weight"
            label="商品重量"
            width="100">
          </el-table-column>

          <el-table-column
            label="创建日期"
            width="100">
            <template slot-scope="goodsList">
              {{goodsList.row.add_time | fmtdate}}
            </template>
          </el-table-column>

            <el-table-column
              label="操作"
              width="100">
               <template slot-scope="goodsList">
                <el-button @click="showEditMsBox(tableData.row)" type="primary" icon="el-icon-edit" circle size="mini" plain=""></el-button>
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
    </el-card>
  </div>
</template>

<script>
export default {
  name:'goods',
  data(){
    return {
      goodsList:[],
      query:null,
      pagenum: 1,
      pagesize:10,
      total:100,
    }
  },
  created(){
    this.getGoods()
  },
  methods: {
    async getGoods(){
      // const res = await this.$http.get(`/goods?query='${this.query}'&page='${this.page}'&size='${this.size}'`)
       const res = await this.$http.get(`goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      // console.log(res);
      this.goodsList = res.data.data
    },
    async searchGoods(){
      const res = await this.$http.get(`/search?quert=${query}`)
      this.goodsList = res.data.data
      
    },
  
    showAddGoodsDia(){
      this.$router.push('/home/good/add')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val
      this.pagenum = 1
      this.getGoods()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getGoods();
    },
  }

}
</script>

<style scoped>
.inputSerch{
  display: flex;
}
</style>
