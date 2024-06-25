<template>
  <p style="padding: 10px;text-align: center;">
    修改玩具商品
  </p>
  <el-row>
    <el-col :span="20" :offset="1">
      <el-form :model="goods" label-width="120px">
        <el-form-item label="名称：">
          <el-input v-model="goods.name" />
        </el-form-item>
        <el-form-item label="价格：">
          <el-input v-model="goods.price" />
        </el-form-item>
        <el-form-item label="图片：">
          <img :src="imgurl + goods.thumbnail" />
        </el-form-item>
        <el-form-item label="选择图片：">
          <input type="file" @change="uploadFile($event)" />
        </el-form-item>
      </el-form>
      <QuillEditor theme="snow" toolbar="full" v-model:content="goods.content" contentType="html" style="height: 100px"
        @ready="onReady($event)" /><br>
      <el-button type="primary" @click="Save">保存</el-button>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

// 实例化useRouter,useRoute

const route = useRoute()
// onMounted()生命周期
onMounted(() => {
  // 发送get请求
  axios
    .get('goods/' + route.params.i)
    .then((response) => {
      // console.log(response);
      goods.value = response.data
      // 初始化富文本编辑器内容
      quill.clipboard.dangerouslyPasteHTML(0, goods.value.content)
    })
    .catch((error) => console.log(error)) // 请求失败处理
})

const { proxy } = getCurrentInstance()
const imgurl = proxy.$imageUrl

const goods = ref({
  id: null,
  name: '',
  thumbnail: 'placeholder.png',
  content: '',
  price: 0
})
let quill = ''
// 保存
const Save = () => {
  if (goods.value.name === '') {
    alert('名称不能为空!')
    return
  }
  axios
    .put('goods/' + route.params.i, goods.value)
    .then((response) => {
      // console.log(response.data);
    })
    .catch((error) => console.log(error)) // 请求失败处理
}
const uploadFile = (event) => {
  goods.value.thumbnail = event.target.files[0].name // 获取input的图片file值
}
const onReady = (event) => {
  // debugger
  quill = event // 获取quill
}

</script>
