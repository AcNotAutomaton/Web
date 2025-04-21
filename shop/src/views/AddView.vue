<template>
  <div class="cartoon-page">
    <div class="title">新增玩具</div>
    <el-row>
      <el-col :span="20" :offset="2">
        <el-form :model="goods" label-width="120px" class="form-container">
          <el-form-item label="名称">
            <el-input v-model="goods.name" placeholder="请输入玩具名称" />
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model.number="goods.price" placeholder="请输入玩具价格" />
          </el-form-item>
          <el-form-item label="图片">
            <div class="image-container">
              <img :src="imgurl + goods.thumbnail" class="goods-image" />
            </div>
          </el-form-item>
          <el-form-item label="选择图片">
            <input type="file" @change="uploadFile($event)" accept="image/*" class="file-input" />
          </el-form-item>
          <div class="editor-container">
            <div class="editor-header">
              <span class="editor-title">玩具详情</span>
            </div>
            <div class="editor-content">
              <QuillEditor v-model:content="goods.content" class="editor" />
            </div>
          </div>
          <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import axios from 'axios'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const { proxy } = getCurrentInstance()
const imgurl = proxy.$imageUrl

const goods = ref({
  id: null,
  name: '',
  thumbnail: 'placeholder.png',
  content: '',
  price: 0
})

let quill = null

const save = () => {
  if (goods.value.name === '') {
    alert('名称不能为空!')
    return
  }
  axios
    .post('goods/', goods.value)
    .then((response) => {
      goods.value = {
        id: null,
        name: '',
        thumbnail: 'placeholder.png',
        content: '',
        price: 0
      }
      quill.setText('')
    })
    .catch((error) => console.log(error))
}

const uploadFile = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      goods.value.thumbnail = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const onReady = (event) => {
  quill = event
}
</script>

<style scoped>
.cartoon-page {
  padding: 20px;
  background-color: #f7f7f7;
}

.title {
  font-size: 24px;
  text-align: center;
  padding: 10px;
  background-color: #86859e;
  border-radius: 10px;
  margin-bottom: 20px;
}

.form-container {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.image-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.goods-image {
  max-width: 200px;
  max-height: 200px;
  border-radius: 5px;
}

.file-input {
  margin-top: 5px;
}

.editor-container {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.editor-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.editor-title {
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
}

.editor-content {
  border: 1px solid #ebeef5;
  border-radius: 5px;
}

.editor {
  height: 300px;
}
</style>