<template>
  <div class="login-wrapper">
    <el-form class="login-from" label-position="top" label-width="80px" :model="formdata">
      <h2 class="login-title">用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button :plain="true" @click.prevent="handleLogin" class="login-btn" type="primary">登录</el-button>
  </el-form>
  </div>
</template>

<script>
export default {
  name:'login',
  data(){
    return {
      formdata:{
        username:'',
        password:''

      }
    }
  },
  methods:{
    //登录
    // handleLogin(){
    //   this.$http.post('login',this.formdata)
    //     .then(res => {
    //       const { data,message } = res.data
    //       if(message === 'success'){
    //         this.$router.push({name:'home'})
    //         this.$message({
    //           message:'登录成功',
    //           type:'success'
    //         })
    //       }else{
    //         this.$message({
    //           message:'账号或密码错误',
    //           type:'error'
    //         })
    //       }
    //     })
    // },
   async handleLogin(){
      const res = await this.$http.post('login', this.formdata)
      const {data, message} = res.data
      console.log(res);
      if(message === 'success'){
          localStorage.setItem('token',res.data.token)
          
          this.$router.push({name:'home'})
          this.$message({
            message:'登录成功',
            type:'success'
          })
      }else{
        this.$message({
          message:'账号或密码错误',
          type:'error'
        })
      }
    },
  },
  

}
</script>

<style lang='scss' scoped>
.login-wrapper{
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-from{
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 30px;
    .login-btn{
      width: 100%;
    }
  }
}
</style>
