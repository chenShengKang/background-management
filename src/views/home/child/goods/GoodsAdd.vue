<template>
  <el-card>
    <crumbs left="商品管理" right="商品列表"></crumbs>
    <br>
    <el-alert class="alert" title="添加商品信息" type="success" center show-icon></el-alert>
    <el-steps :active="active*1" finish-status="success" simple style="margin-top:20px">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <el-form label-position="top" label-width='80px' :model="formData" style="height: 400px;overflow:auto">
      <el-tabs @tab-click="tabChange" v-model="active" tab-position="left" >
        <el-tab-pane name="1" label="商品参数">
          <el-form-item label="商品名称">
            <el-input v-model="formData.goods_name"></el-input>
          </el-form-item>
           <el-form-item label="商品价格">
            <el-input v-model="formData.goods_price"></el-input>             
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="formData.goods_weight"></el-input>             
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="formData.goods_number"></el-input>             
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
            clearalbe
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions"
              @change='handleChange'
              :props="defaultProp"
            >

            </el-cascader>
          </el-form-item>   
        </el-tab-pane>
        <el-tab-pane name="2" label="基本信息" >
          <el-form-item :label="item.attr_name"  v-for="(item,i) of Dyparams" :key="i">
            <!-- 复选框 -->
            <el-checkbox-group v-model="checkList">
              <el-checkbox  border v-for="(item1,i) of item.attr_vals" :key="i" :label="item1"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">
          <el-form-item label="item.attr_name" v-for="(item,i) of staticParams" :key="i">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">
          <el-form-item>
            <el-upload
              action="/api/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品内容">
          <el-form-item >
            <el-button @click="addGoods" type="primary">添加商品</el-button>
            <quill-editor class="editor" v-model="formData.goods_introduce"></quill-editor>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name:'GoodsAdd',
  components:{
    quillEditor
  },
  data(){
    return {
      active:'1',
      formData:{
        goods_name:'',
        goods_cat:'',
        goods_price:'',
        goods_number:'',
        goods_weight:'', 
        goods_introduce:'',
        pics:[],
        attrs:[],
      },
      // 级联选择器绑定的数据
      options:[],
      selectedOptions:[1,3,6],
      defaultProp:{
        label:'cat_name',
        value:'cat_id',
        children:'children'
      },
      Dyparams:null,
      checkList:[],
      staticParams:null
    }
  },
  methods: {
    async addGoods(){
      // 在发起请求之前处理forrm中的数据
      this.formData.goods_cat = this.selectedOptions.join(',')
      //pics[] {pic:图片路径}

      //attrs [{attr_id:?,attr_vals:?}]

      let arr = this.Dyparams.map(item => {
        return {attr_id:item.attr_id,attr_value:item.attr_vals}
      })
      this.formData.attrs = [...arr]
      const res = await this.$http.post('/goods',this.formData)
      if(res.data.message === 'success'){
        this.$router.push('/home/goods')
      }
    },
    handlePreview(file){

    },
    handleRemove(file){
      console.log('移除');
      console.log(file);
      let index = this.formData.pisc.findIndex(item => {
        return item.pic === file.path
      })
      this.formData.pisc.splice(index,1)
    },
    handleSuccess(file){
      console.log('成功');
      console.log(file);
      this.formData.pics.push({
        pic:file.path
      })
    },
    async tabChange(){
      console.log(this.active);
      if(this.active === '2'){
        if(this.selectedOptions.length !== 3){
          this.$messgae.warning('请先选择数据')
          return 
        }
        const res = await this.$http.get(`category/${this.selectedOptions[2]}/attr?sel='manmy'`)
         res.data.data.forEach(item => {
          item.attr_vals = item.attr_vals.trim().split(',')
          item.attr_vals.forEach(item =>{
            this.checkList.push(item)
          })

        })
        this.Dyparams = res.data.data 
      }
      if(this.active == '3'){
        if(this.selectedOptions.length !== 3){
          this.$messgae.warning('请先选择数据')
          return 
        }
        const res = await this.$http.get(`category/${this.selectedOptions[2]}/attr?sel='only'`)
        this.staticParams = res.data.data
      }
    },
    // 级联选择器 change 触发的方法
    handleChange(){

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
  },
  created(){
    this.getGoodsList()
  }

}
</script>

<style scoped>
.editor /deep/ .ql-container{
  min-height: 200px;
}
</style>
