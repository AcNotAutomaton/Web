<template>
    <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in types" :label="item.title" :name="item.tname" :key="index">
            <div class="bookItem" v-for="(item, index) in showBooks" @click="showDetail(item.id)">
                <img :src="item.bookUrl">
                <p>{{ item.bookName }}</p>
                <p class="author">{{ item.author }}</p>
                <p class="price"><small>￥</small>{{ item.price }}</p>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import { computed, reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
    setup() {
        //实例化userouter
        const router = useRouter();
        //onMounted()生命周期
        onMounted(() => {
            axios.get("types?_order=asc")
                .then((response) => {
                    data.types = response.data;
                }).catch((error) => console.log(error)); // 请求失败处理
            axios.get("books?_order=asc")
                .then((response) => {
                    data.books = response.data;
                }).catch((error) => console.log(error)); // 请求失败处理
        });
        const data = reactive({
            types: [],
            books: [],
            activeName: "story",
            showBooks: computed(() => {
                return data.books.filter((item) => {
                    if (item.type == data.activeName) {
                        return true;
                    } else {
                        return false;
                    }
                })
            }),
            showDetail: (id) => {
                router.push({
                    path: "bookDetail",
                    query: { "bookId": id },
                });
            }
        });
        return {
            ...toRefs(data),
        };
    },
}
</script>

<style lang="scss" scoped>
.bookItem {
    widows: 150px;
    height: 250px;
    float: left;
    margin-right: 45px;

    img {
        width: 150px;
        height: 150px;
    }

    p {
        height: 25px;
        line-height: 25px;
        overflow: hidden;
        margin: 0;
    }

    .author {
        color: #aaa;
    }

    .price {
        color: red;
        font-weight: bold;
        font-family: Arial;
    }
}
</style>