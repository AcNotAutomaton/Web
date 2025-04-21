<template>
    <div class="container mt-3">
        <div v-if="carts.length">
            <el-table :data="carts" style="width: 90%">
                <el-table-column prop=type align="center">
                    <template #default="scope">
                        <el-checkbox v-model="scope.row.selected" />
                    </template>
                </el-table-column>
                <el-table-column prop="bookUrl" label="商品" align="center">
                    <template #default="scope">
                        <el-image style="width: 40px; height: 50px" :src="scope.row.bookUrl" class="head_pic" />
                    </template>
                </el-table-column>
                <el-table-column prop=bookName label="商品名称" align="center">
                </el-table-column>
                <el-table-column prop=price align="center" label="商品单价">
                </el-table-column>
                <el-table-column prop=count align="center" label="购买数量">
                    <template #default="scope">
                        <el-button @click="scope.row.count++" icon="Plus" size="small" />{{ scope.row.count }}
                        <el-button @click="scope.row.count > 1 ? scope.row.count-- : ''" icon="Minus" size="small" />
                    </template>
                </el-table-column>
                <el-table-column align="center" label="金额">
                    <template #default="scope">
                        {{ Number((scope.row.price * scope.row.count).toFixed(2)) }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template #default="scope">
                        <el-button type="danger" icon="delete" v-on:click="deleteItem(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            <div style="text-align:left">总价：¥{{ totalPrice }}&nbsp;&nbsp;&nbsp;&nbsp;<el-button type="success"
                    @click="buyBooks()">下单购买</el-button>
            </div>
        </div>
        <div v-else>
            购物车为空
        </div>
    </div>
</template>
<script>
import { reactive, toRefs, computed, onMounted } from "vue";
import axios from "axios";
export default {
    setup() {
        onMounted(() => {
            data.userId = localStorage.getItem("userId");
            axios
                .get("carts?userId=" + data.userId + "&_order=asc")
                .then((response) => {
                    debugger;
                    data.carts = response.data;
                })
                .catch((error) => console.log(error)); // 请求失败处理
        });
        const data = reactive({
            carts: [],
            userId: "",
            deleteItem: (item) => {
                axios.delete("carts/" + item.id)
                    .then((response) => {
                        data.carts.splice(data.carts.indexOf(item), 1);
                    }).catch((error) => console.log(error)); // 请求失败处理
            },
            totalPrice: computed(() => {
                var total = 0;
                for (var i = 0; i < data.carts.length; i++) {
                    var good = data.carts[i]
                    if (good.selected) {
                        total += Number((good.price * good.count).toFixed(2));
                    }
                }
                return total;
            }),
            buyBooks: () => {
                debugger;
                var buyInfo = "";
                for (var i = 0; i < data.carts.length; i++) {
                    var good = data.carts[i];
                    if (good.selected) {
                        buyInfo = buyInfo + good.bookName + "*" + good.count + ";";
                    }
                }
                var order = {
                    userId: data.userId,
                    info: buyInfo,
                    totalPrice: data.totalPrice,
                    isPay: false
                }
                axios
                    .post("orders", order)
                    .then((response) => {
                        debugger;
                        for (var i = data.carts.length - 1; i >= 0; i--) {
                            var good = data.carts[i]
                            if (good.selected) {
                                data.carts.splice(i, 1);
                            }
                        }
                        alert("下单成功");
                    }).catch((error) => console.log(error)); // 请求失败处理
            }
        });
        return {
            ...toRefs(data)
        };
    }
};
</script>