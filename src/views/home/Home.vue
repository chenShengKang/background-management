<template>
 <el-container class="container">
  <el-header class="header">
    <el-row>
      <el-col :span='4' class="left">
        <div class="grid-content bg-purple">
          <img src="~@/assets/img/default.png" alt="">
        </div>
      </el-col>
      <el-col :span='18' class="center">
        <div class="grid-content bg-purple-light">
          <h3>后台管理系统</h3>
        </div>
      </el-col>
      <el-col :span='2' class="right">
        <div class="grid-content bg-purple">
          <p @click.prevent='handleLogout'>退出</p>
          </div>
      </el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside class="aside" width="200px">
      <el-menu
        :unique-opened='true'
        :router='true'
      >
        <!-- 1 -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/home/user">
            <i class="el-icon-circle-check"></i>
            <span>用户列表</span>            
          </el-menu-item>
        </el-submenu>
         <!-- 2 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item index="/home/perm">
            <i class="el-icon-s-grid"></i>
            <span>角色列表</span>            
          </el-menu-item>
          <el-menu-item index="/home/right">
            <i class="el-icon-s-grid"></i>
            <span>权限列表</span>            
          </el-menu-item>
        </el-submenu>
         <!-- 3 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="3-1">
            <i class="el-icon-box"></i>
            <span>商品列表</span>            
          </el-menu-item>
          <el-menu-item index="3-2">
            <i class="el-icon-box"></i>
            <span>分页列表</span>            
          </el-menu-item>
          <el-menu-item index="3-3">
            <i class="el-icon-box"></i>
            <span>商品分类</span>            
          </el-menu-item>
        </el-submenu>
         <!-- 4 -->
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-position"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item index="4-1">
            <i class="el-icon-position"></i>
            <span>选项一</span>            
          </el-menu-item>
        </el-submenu>
         <!-- 5 -->
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>数据统计</span>
          </template>
          <el-menu-item index="5-1">
            <i class="el-icon-location"></i>
            <span>选项一</span>            
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: "home",
  beforeCreate(){
    const token = localStorage.getItem('token')
    if(!token){
      this.$router.push({name:'login'})
    }
  },
  methods: {
    handleLogout(){
      localStorage.removeItem('token')
      this.$message.success('退出成功')
      this.$router.push({name:'login'})
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  .header {
    background-color: #b3c0d1;
    .center {
      text-align: center;
      color: #fff;
    }
  }
  .aside {
    background-color: #d3dce6;
  }
  .main {
    background-color: #e9eef3;
  }
}
.left{
  line-height: 60px;
  text-align: center;
  img{
    width: 50px;
    height: 50px;
    border-radius: 10px;
    margin-top: 5px;
 
  }
}
</style>
