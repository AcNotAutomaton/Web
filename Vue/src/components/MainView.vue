<template>
    <el-scrollbar>
        <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="address" label="Address" />
        </el-table>
    </el-scrollbar>
</template>

<script>

export default {
    name: "MainView",

    data() {
        const item = {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        };
        return {
            tableData: Array(10).fill(item)
        }
    }
}
</script>

<style scoped>

</style>