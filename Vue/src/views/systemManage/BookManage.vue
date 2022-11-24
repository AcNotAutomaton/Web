<template>
    <el-form :inline="true" :model="newBook" label-width="120px">
        <el-row>
            <el-col :span="7">
                <el-form-item label="书名：">
                    <el-input v-model="newBook.bookName" />
                </el-form-item>
            </el-col>
            <el-col :span="7">
                <el-form-item label="图片：">
                    <el-input v-model="newBook.bookUrl" />
                </el-form-item>
            </el-col>
            <el-col :span="7">
                <el-form-item label="价格：">
                    <el-input v-model="newBook.price" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="7">
                <el-form-item label="数量：">
                    <el-input v-model="newBook.count" />
                </el-form-item>
            </el-col>
            <el-col :span="7">
                <el-form-item label="作者：">
                    <el-input v-model="newBook.author" />
                </el-form-item>
            </el-col>
            <el-col :span="7">
                <el-form-item label="类型：">
                    <el-select v-model="newBook.type" placeholder="请选择图书类型">
                        <el-option v-for="(item, index) in types" :key="index" :value="item.tname"
                            :label="item.title" />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <el-button type="primary" v-on:click="addOrEditBook()">确定</el-button>&nbsp;&nbsp;&nbsp;<el-button type="info"
        v-on:click="reset()">重置</el-button>
    <br>
    <hr>
    <br />
    <el-row justify="center">
        <el-form-item label="关键字：">
            <el-input v-model="searchContent" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :icon="Search" v-on:click="search()">搜索</el-button>
            <el-button type="info" v-on:click="cancelSearch()">取消搜索</el-button>
        </el-form-item>
    </el-row>
    <br />
    <br />
    <el-table :data="books" style="width: 100%">
        <el-table-column prop="bookUrl" label="图片" align="center">
            <template #default="scope">
                <el-image style="width: 40px; height: 50px" :src="scope.row.bookUrl" class="head_pic" />
            </template>
        </el-table-column>
        <el-table-column prop=bookName label="书名" align="center">
        </el-table-column>
        <el-table-column prop=author align="center" label="作者">
        </el-table-column>
        <el-table-column prop=price align="center" label="价格">
        </el-table-column>
        <el-table-column prop=count align="center" label="库存">
        </el-table-column>
        <el-table-column prop=type align="center" label="类型">
        </el-table-column>
        <el-table-column align="center" label="操作">
            <template #default="scope">
                <el-button type="primary" icon="delete" v-on:click="deleteBook(scope.row)"></el-button>
                <el-button type="danger" icon="edit" v-on:click="editBook(scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination :page-size="pageSize" :pager-count="pageCount" layout="prev, pager, next"
        v-model:current-page="currentPage" @current-change="showCurrentBookPage()" :total="pageTotal" />
    <br /> <br /> <br /> <br />
</template>
<style scoped>
.bookInfo>div {
    width: 33%;
    float: left;
    margin-bottom: 20px;
}
</style>
<script>
import { reactive, toRefs, onMounted } from "vue";
import axios from "axios";
export default {
    props: {
        //入口参数
    },
    components: {
        //引入组件
    },
    setup() {
        //onMounted()生命周期
        onMounted(() => {
            axios
                .get("types?_order=asc")
                .then((response) => {
                    data.types = response.data
                })
                .catch((error) => console.log(error)); // 请求失败处理
            data.showCurrentBookPage();
        });
        const data = reactive({
            newBook: {
                id: "",
                bookName: "",
                bookUrl: "",
                price: 0,
                count: 0,
                author: "",
                type: ""
            },
            types: [],
            books: [],
            searchContent: "",
            flag: "0",//0 代表添加状态 1 代表编辑状态
            editIndex: 0,//如果是编辑状态，被编辑的书籍的 index
            pageSize: 5,
            pageCount: 7,
            pageTotal: 0,
            currentPage: 1,
            reset: () => {
                data.newBook = { bookName: "", bookUrl: "", price: 0, count: 0, author: "", type: "" };
            },
            addOrEditBook: () => {
                debugger;
                if (data.flag == 1) {
                    //修改
                    axios
                        .patch("books/" + data.newBook.id, data.newBook)
                        .then((response) => {
                            alert("修改成功！");
                            data.flag = 0;
                            data.newBook = {
                                bookName: "", bookUrl: "", price: 0, count: 0, author: "", type: ""
                            };
                        }).catch((error) => console.log(error)); // 请求失败处理
                } else {
                    //新增
                    axios
                        .post("books", data.newBook)
                        .then((response) => {
                            alert("添加成功！");
                            data.showCurrentBookPage()
                            data.newBook = {
                                bookName: "", bookUrl: "", price: 0, count: 0, author: "", type: ""
                            };
                        }).catch((error) => console.log(error)); // 请求失败处理
                }
            },
            deleteBook: (item) => {
                debugger;
                axios.delete("books/" + item.id)
                    .then((response) => {
                        data.showCurrentBookPage();
                    }).catch((error) => console.log(error)); // 请求失败处理
            },
            editBook: (item) => {
                data.flag = 1;
                data.newBook = item;
            },
            search: () => {
                data.showCurrentBookPage();
            },
            cancelSearch: () => {
                data.searchContent = "";
                data.showCurrentBookPage();
            },
            showCurrentBookPage: () => {
                axios
                    .get("books?_page=" + data.currentPage + "&_limit=" + data.pageSize + "&_order=asc"
                        + "&q=" + data.searchContent)
                    .then((response) => {
                        debugger;
                        data.books = response.data;
                        data.pageTotal = Number(response.headers['x-total-count']);
                    })
                    .catch((error) => console.log(error)); // 请求失败处理
            }
        });
        return {
            ...toRefs(data),
        };
    },
};
</script>