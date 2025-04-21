<template>
  <el-row :gutter="20" class="cartoon-page">
    <el-col v-for="item in goods" :key="item.id" :span="6">
      <el-card @click="selectGood(item.id)" :body-style="{ padding: '10px' }" class="cartoon-card">
        <div class="cartoon-image-container">
          <img :src="imgurl + item.thumbnail" class="cartoon-image" />
        </div>
        <div class="cartoon-content">
          <span class="cartoon-goods-name">{{ item.name }}</span>
          <div class="cartoon-bottom">
            <time class="cartoon-goods-price">{{ item.price }}元</time>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const { proxy } = getCurrentInstance()
const imgurl = proxy.$imageUrl

const goods = ref([])

const router = useRouter()

onMounted(() => {
  axios
    .get('goods')
    .then((response) => {
      goods.value = response.data
    })
    .catch((error) => console.log(error))
})

const selectGood = (id) => {
  router.push({
    name: 'Detail',
    params: { i: id }
  })
}
</script>

<style scoped>
.cartoon-page {
  padding: 20px;
}

.cartoon-card {
  background-color: #ffedcc;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.cartoon-image-container {
  display: flex;
  justify-content: center;
}

.cartoon-image {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ff7f00;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.cartoon-content {
  padding: 14px;
  text-align: center;
}

.cartoon-goods-name {
  font-size: 20px;
  font-weight: bold;
  color: #ff7f00;
}

.cartoon-bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cartoon-goods-price {
  font-size: 16px;
  color: #ff7f00;
}

.el-col {
  margin-bottom: 20px;
}
</style>