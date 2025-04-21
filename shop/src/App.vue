<template>
  <div>
  <el-menu :default-active="1" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">玩具列表</el-menu-item>
    <el-menu-item index="2">购物车</el-menu-item>
    <el-menu-item index="3">新增</el-menu-item>
    <el-menu-item index="4">管理</el-menu-item>
  </el-menu>
   <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// 实例化useRouter
const router = useRouter()

const handleSelect = (key) => {
  switch (key) {
    case '1':
      router.push({
        name: 'Home'
      })
      break
    case '2':
      router.push({
        name: 'MyCart'
      })
      break
    case '3':
      router.push({
        name: 'Add'
      })
      break
    case '4':
      router.push({
        name: 'Edit'
      })
      break
  }
}
</script>

