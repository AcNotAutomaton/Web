<template>
    <el-tabs v-model="activeName" type="card" class="demo-tabs">
        <el-tab-pane v-for="(item, index) in types" :label="item.title" :name="item.tname">
            <div class="bookitem" v-for="(item, index) in showBooks">
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
import axios from "axios";

export default {
    setup() {
        //onMounted()生命周期
        onMounted(() => {
            axios.get("types?_order=asc")
                .then((response) => {
                    data.types = response.data;
                }).catch((error) => console.log(error));

            axios.get("books?_order=asc")
                .then((response) => {
                    data.books = response.data;
                }).catch((error) => console.log(error));
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
            })
        });

        return {
            ...toRefs(data),
        };
    },
}
</script>

<style lang="scss" scoped>
.bookitem {
    width: 150px;
    height: 250px;
    margin-right: 45px;
    float: left;

    img {
        width: 150px;
        height: 150px;
    }

    p {
        height: 25px;
        line-height: 25px;
        margin: 0;
        overflow: hidden;
    }

    .author {
        color: #aaa;
    }

    .price {
        color: #c30;
        font-family: "Arial";
        font-weight: bold;
    }
}
</style>