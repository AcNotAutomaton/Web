<template>
    <div class="bookInfo" style="height:110px">
        <div>
            <label>书名:</label>
            <input type="text" v-model="newBook.bookName" />
        </div>
        <div>
            <label>图片:</label>
            <input type="text" v-model="newBook.bookUrl" />
        </div>
        <div>
            <label>价格:</label>
            <input type="text" v-model="newBook.price" />
        </div>
        <div>
            <label>数量:</label>
            <input type="text" v-model="newBook.count" />
        </div>
        <div>
            <label>作者:</label>
            <input type="text" v-model="newBook.author" />
        </div>
        <div>
            <label>类型:</label>
            <select v-model="newBook.type" style="width:175px;height:27px">
                <option v-for="(item, index) in types" :key="index" :value="item.tname">{{ item.title }}</option>
            </select>
        </div>
    </div>
    <button v-on:click="addOrEditBook()">确定</button>&nbsp;&nbsp;&nbsp;<button v-on:click="reset()">重置</button>
    <br>
    <hr>
    <br />
    书名：<input v-model="searchContent">&nbsp;<button v-on:click="search()">搜索
    </button>&nbsp;<button v-on:click="cancelSearch()">取消搜索</button>
    <br />
    <br />
    <table class="table table-bordered table-striped">
        <thead>
            <tr>
                <th>图片</th>
                <th>书名</th>
                <th>作者</th>
                <th>价格</th>
                <th>库存</th>
                <th>类型</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in books" :key="index">
                <td><img style="width:40px;height:50px" :src="item.bookUrl"></td>
                <td>{{ item.bookName }}</td>
                <td>{{ item.author }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.count }}</td>
                <td>{{ item.type }}</td>
                <td><button v-on:click="deleteBook(item)">删除</button><button v-on:click="editBook(item)">编辑</button>
                </td>
            </tr>
        </tbody>
    </table>
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
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
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
            searchBook: [],
            oldBook: [],
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
                data.searchBook = data.books.filter((item) => {
                    var index = item.bookName.indexOf(data.searchContent);
                    if (index >= 0) {
                        return true;
                    } else {
                        return false;
                    }
                });
                data.oldBook = data.books;
                data.books = data.searchBook;
            },
            cancelSearch: () => {
                data.books = data.oldBook;
            },
            showCurrentBookPage: () => {
                axios
                    .get("books?_page=" + data.currentPage + "&_limit=" + data.pageSize + "&_order=asc"
                    )
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