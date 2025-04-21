<template>
  <div class="cartoon-page">
    <div class="title">玩具商品详情</div>
    <el-row class="details-row" :gutter="20">
      <el-col :span="8" :offset="4">
        <div class="image-container">
          <img :src="imgurl + goods.thumbnail" class="goods-image" alt="商品图片" />
        </div>
      </el-col>
      <el-col :span="10">
        <p class="goods-name">玩具商品：{{ goods.name }}</p>
        <p class="goods-price">价格：{{ goods.price }}元</p>
        <el-button type="primary" @click="addGoods">加入购物车</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="1">
        <div class="goods-content" v-html="goods.content"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

const { proxy } = getCurrentInstance()
const imgurl = proxy.$imageUrl

const goods = ref({
  id: null,
  name: '',
  thumbnail: 'placeholder.png',
  content: '',
  price: ''
})

const router = useRouter()
const route = useRoute()

onMounted(() => {
  axios
    .get('goods/' + route.params.i)
    .then((response) => {
      goods.value = response.data
    })
    .catch((error) => console.log(error))
})

const addGoods = () => {
  const cart = {
    userId: 'user1',
    goodsId: route.params.i,
    num: 1
  }

  axios
    .post('cart', cart)
    .then((response) => {
      alert('添加成功！')
    })
    .catch((error) => console.log(error))
}
</script>

<style scoped>
.cartoon-page {
  padding: 20px;
  background-color: #f7f7f7;
}

.title {
  font-size: 40px;
  text-align: center;
  padding: 20px;
  background-color: #867e95;
  border-radius: 20px;
  margin-bottom: 30px;
  color: #f00;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.details-row {
  margin-top: 30px;
}

.image-container {
  display: flex;
  justify-content: center;
}

.goods-image {
  max-width: 400px;
  max-height: 400px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.goods-name {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #f00;
}

.goods-price {
  font-size: 24px;
  margin-bottom: 30px;
}

.goods-content {
  margin-top: 40px;
  font-size: 20px;
  line-height: 1.6;
  color: #333;
  text-align: justify;
}

.el-button {
  margin-top: 30px;
  font-size: 24px;
  background-color: #f00;
  border-color: #f00;
  border-radius: 10px;
}

.el-button:hover {
  background-color: #f00;
  border-color: #f00;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>