<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <!-- 面包屑 -->
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
      {{left}}
    </el-breadcrumb-item>
    <el-breadcrumb-item>
      {{right}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name:'crumbs',
  props:['left','right']

}
</script>

<style scoped>

</style>
