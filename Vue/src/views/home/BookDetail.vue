<template>
    <div class="bookInfo">
        <div class="left">
            <!-- 图书图片 -->
            <a href="#">
                <img :src="book.bookUrl" height="200">
            </a>
        </div>
        <div class="right">
            <!-- 电影的基本信息 -->
            <p>书名:<strong>{{ book.bookName }}</strong></p>
            <p>作者:{{ book.author }}</p>
            <p>价格:{{ book.price }}</p>
            <p>库存:{{ book.count }}</p>
            <p>类型:{{ book.type }}</p>
            <el-button type="primary" @click="addBookToCart()">加入购物车</el-button>
            <el-button @click="addBookToOrder()" type="success">下单直接购买</el-button>
        </div>
    </div>
    <div class="comments">
        共{{ comments.length }}条评论
        <hr />
        <div class="m-3" v-for="item in comments" :key="item.id">
            <p><span style="color:blue">{{ item.author }}:</span> {{ item.cdate }}</p>
            <p v-html="item.content"></p>
        </div>
        <br />
        <QuillEditor theme="snow" toolbar="full" v-model:content="comment.content" contentType="html" />
        <br /><button type="button" class="btn-block btn-primary" v-on:click="SaveComment">
            发布评论
        </button>
        <br><br><br><br><br><br>
    </div>
</template>
<script>
import { computed, reactive, toRefs, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
    components: {
        //引入组件
        QuillEditor
    },
    setup() {
        //实例化 useRouter,useRoute
        const router = useRouter();
        const route = useRoute();
        //onMounted()生命周期
        onMounted(() => {
            data.userName = localStorage.getItem("userName");
            data.userId = localStorage.getItem("userId");
            //发送 get 请求
            axios
                .get("books/" + route.query.bookId)
                .then((response) => {
                    data.book = response.data
                })
                .catch((error) => console.log(error)); // 请求失败处理
            //发送 get 请求
            axios
                .get("comments?articleId=" + route.query.bookId)
                .then((response) => {
                    data.comments = response.data
                })
                .catch((error) => console.log(error)); // 请求失败处理
        });
        const data = reactive({
            userName: "",
            userId: "",
            comments: [],
            comment: {
                id: "",
                articleId: "",
                content: "",
                cdate: "",
                author: ""
            },
            book: {
                id: "",
                bookName: "",
                bookUrl: "",
                price: 0,
                count: 0,
                author: "",
                type: ""
            },
            SaveComment: () => {
                if (data.comment.content == "") {
                    alert("评论内容不能为空!");
                    return;
                }
                //添加日期
                debugger;
                var date = new Date();
                data.comment.cdate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                data.comment.articleId = route.query.bookId;
                data.comment.author = data.userName;
                //提交
                axios
                    .post("comments", data.comment)
                    .then((response) => {
                        console.log(response.data);
                        data.comments.push(response.data);
                        data.comment.content = "";
                    })
                    .catch((error) => console.log(error)); // 请求失败处理
            },
            addBookToCart: () => {
                debugger;
                var cart = {
                    selected: true,
                    userId: data.userId,
                    bookId: route.query.bookId,
                    bookName: data.book.bookName,
                    bookUrl: data.book.bookUrl,
                    price: data.book.price,
                    count: 1
                };
                axios
                    .get("carts?bookId=" + route.query.bookId + "&userId=" + data.userId)
                    .then((response) => {
                        debugger;
                        //判断是否加入过购物车，如果加入过则修改数量加 1，否则添加到购物车
                        if (response.data && response.data.length > 0) {
                            response.data[0].count++;
                            axios
                                .patch("carts/" + response.data[0].id, response.data[0])
                                .then((response) => {
                                    alert("添加购物车成功！");
                                }).catch((error) => console.log(error)); // 请求失败处理
                        } else {
                            axios
                                .post("carts", cart)
                                .then((response) => {
                                    alert("添加购物车成功！");
                                }).catch((error) => console.log(error)); // 请求失败处理
                        }
                    }).catch((error) => console.log(error)); // 请求失败处理
            },
            addBookToOrder: () => {
                var buyInfo = data.book.bookName + "*" + data.book.count;
                var order = {
                    userId: data.userId,
                    info: buyInfo,
                    totalPrice: data.book.price,
                    isPay: false
                }
                axios
                    .post("orders", order)
                    .then((response) => {
                        alert("下单成功");
                    }).catch((error) => console.log(error)); // 请求失败处理
            }
        });
        return {
            ...toRefs(data)
        };
    }
}
</script>
<style>
.bookInfo {
    overflow: hidden;
    text-align: left;
}

.left {
    float: left;
    margin: 20px 15px 5px 10px;
}

.right {
    float: left;
    margin: 20px 0px 5px 5px;
}

.right p {
    margin-bottom: 13px;
}

.comments {
    margin-top: 10px;
    text-align: left;
}
</style>