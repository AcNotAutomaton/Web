<template>
  <div class="cartoon-page">
    <br />
    <el-row>
      <el-col :span="20" :offset="2">
        <el-table :data="goods">
          <el-table-column label="LoGo">
            <template #default="scope">
              <div class="cartoon-image-container">
                <img :src="imgurl + scope.row.thumbnail" class="cartoon-image" alt="商品图片" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="玩具商品">
            <template #default="scope">
              <div class="cartoon-goods-info">
                <p class="cartoon-goods-name">{{ scope.row.name }}</p>
                <p class="cartoon-goods-price">{{ scope.row.price }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <div class="cartoon-action-buttons">
                <el-button link type="primary" size="small" @click="selectItem(scope.row.id)">详情</el-button>
                <el-button link type="primary" size="small" @click="update(scope.row.id)">修改</el-button>
                <el-button link type="primary" size="small" @click="deleteItem(scope.$index)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
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

const selectItem = (id) => {
  router.push({
    name: 'Detail',
    params: { i: id }
  })
}

const update = (id) => {
  router.push({
    name: 'Update',
    params: { i: id }
  })
}

const deleteItem = (index) => {
  axios
    .delete('goods/' + goods.value[index].id)
    .then((response) => {
      console.log(response.data)
      goods.value.splice(index, 1)
    })
    .catch((error) => console.log(error))
}
</script>

<style scoped>
.cartoon-page {
  padding: 20px;
}

.cartoon-image-container {
  display: flex;
  justify-content: center;
}

.cartoon-image {
  max-width: 100px;
  max-height: 100px;
  border-radius: 50%;
  border: 2px solid #f2d6a5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.cartoon-goods-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.cartoon-goods-name {
  font-size: 18px;
  font-weight: bold;
  color: #ff7f50;
  margin-bottom: 5px;
}

.cartoon-goods-price {
  font-size: 16px;
  color: #00bfff;
  margin-bottom: 10px;
}

.cartoon-action-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
}

.cartoon-action-buttons>.el-button {
  margin-left: 10px;
  background-color: #ff7f50;
  border-color: #ff7f50;
  color: #fff;
}

.cartoon-action-buttons>.el-button:hover {
  background-color: #ff6347;
  border-color: #ff6347;
}
</style>