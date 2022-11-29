<template>
    <el-table :data="orders" style="width: 100%">
        <el-table-column prop=id label="订单编号" align="center">
        </el-table-column>
        <el-table-column prop=info align="center" label="购买信息">
        </el-table-column>
        <el-table-column prop=totalPrice align="center" label="付款金额">
        </el-table-column>
        <el-table-column align="center" label="操作">
            <template #default="scope">
                <el-button type="primary" v-on:click="toPay(scope.row)" v-if="!scope.row.isPay">去支付</el-button>
                <el-button type="primary" disabled="true" v-if="scope.row.isPay">已支付</el-button>
                &nbsp;<el-button type="danger" icon="delete" v-on:click="deleteOrder(scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
import { reactive, toRefs, onMounted } from "vue";
import axios from "axios";
export default {
    setup() {
        //onMounted()生命周期
        onMounted(() => {
            debugger;
            data.userId = localStorage.getItem("userId");
            axios
                .get("orders?userId=" + data.userId + "&_order=asc")
                .then((response) => {
                    data.orders = response.data;
                })
                .catch((error) => console.log(error)); // 请求失败处理
        })
        const data = reactive({
            userId: "",
            orders: [],
            deleteOrder: (item) => {
                axios.delete("orders/" + item.id)
                    .then((response) => {
                        data.orders.splice(data.orders.indexOf(item), 1);
                    }).catch((error) => console.log(error)); // 请求失败处理
            },
            toPay: (item) => {
                item.isPay = "true";
                axios
                    .patch("orders/" + item.id, item)
                    .then((response) => {
                        alert("支付成功！");
                    }).catch((error) => console.log(error)); // 请求失败处理
            }
        })
        return {
            ...toRefs(data)
        };
    }
}
</script>
<style scoped>

</style>