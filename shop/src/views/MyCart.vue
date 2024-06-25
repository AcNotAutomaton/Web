<template>
  <div>
    <p style="padding: 10px;text-align:center">
      购物车
    </p>
    <div v-if="carts.length">
      <el-row v-for="(item, index) in carts" :key="item.id">
        <el-col :span="4" :offset="2" @click="selectgood(item.goodsId)">
          <img :src="imgurl + goods.find((i) => {
            return i.id == item.goodsId;
          }).thumbnail" style="width: 200px" />
        </el-col>
        <el-col :span="12">
          <p>{{
            goods.find((i) => {
              return i.id == item.goodsId;
            }).name
          }}</p>
          <p>单价：{{
            goods.find((i) => {
              return i.id == item.goodsId;
            }).price
          }}</p>
          <p>金额：{{
            item.num *
            goods.find((i) => {
              return i.id == item.goodsId;
            }).price
          }}</p>
          <el-button @click="countReduce(index)">-</el-button>
          {{ item.num }}
          <el-button @click="countAdd(index)">+</el-button>
          <el-button @click="remove(index)" style="margin-left: 30px">移除</el-button>
        </el-col>
      </el-row>
      <h3 style="margin-left: 100px">
        总金额：¥{{ totalPrice }}
      </h3>
      <br /><br />
    </div>
    <div v-else>购物车为空</div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// 实例化useRouter
const router = useRouter()
// onMounted()生命周期
onMounted(() => {
  axios
    .get('goods')
    .then((response) => {
      goods.value = response.data
      // console.log(this.goods)
    })
    .catch((error) => console.log(error)) // 请求失败处理
  // 发送get请求
  axios
    .get('cart')
    .then((response) => {
      // console.log(response);
      carts.value = response.data
    })
    .catch((error) => console.log(error)) // 请求失败处理
})

const { proxy } = getCurrentInstance()
const imgurl = proxy.$imageUrl

const goods = ref([])
const carts = ref([])

const countReduce = (index) => {
  if (carts.value[index].num === 1) return
  carts.value[index].num--
  updateNum(index)
}
const countAdd = (index) => {
  carts.value[index].num++
  updateNum(index)
}
const updateNum = (index) => {
  axios
    .put('cart/' + carts.value[index].id, carts.value[index])
    .then((response) => {
      console.log(response)
    })
    .catch((error) => console.log(error)) // 请求失败处理
}
const remove = (index) => {
  axios
    .delete('cart/' + carts.value[index].id)
    .then((response) => {
      // console.log(response.data);
      carts.value.splice(index, 1) // 从下标i开始删除1个元素：删除下标为i的元素
    })
    .catch((error) => console.log(error)) // 请求失败处理
}
const selectgood = (id) => {
  router.push({
    path: '/detail',
    query: { id: id }
  })
}
const totalPrice = computed(() => {
  let total = 0
  for (let i = 0, len = carts.value.length; i < len; i++) {
    total += goods.value.find((item) => {
      return item.id == carts.value[i].goodsId
    }).price * carts.value[i].num
  }
  return total.toString()
})

</script>
