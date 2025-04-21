<template>
    <p class="title"><strong>待办事件</strong></p>
    <hr>
    <p style="text-align:left">您有<span style="color:red">{{ orders.length }}</span>个订单未支付，请及时支付。</p>
    <p class="title"><strong>网站书籍销售排行榜</strong></p>
    <hr>
    <div style="width:800px;height:400px" ref="webSalesRank"></div>
    <p class="title"><strong>个人消费分析</strong></p>
    <hr>
    <el-row>
        <el-col :span="12">
            <div ref="personConsume2" style="height:400px"></div>
        </el-col>
        <el-col :span="12">
            <div ref="personConsume1" style="height:400px"></div>
        </el-col>
    </el-row>
    <br><br>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import echarts from 'echarts';
import axios from 'axios';


// 定义响应式数据
const orders = ref<any[]>([]);
const webSalesRank = ref<HTMLDivElement | null>(null);
const personConsume1 = ref<HTMLDivElement | null>(null);
const personConsume2 = ref<HTMLDivElement | null>(null);

// 获取用户 ID
const userId = ref<string | null>(localStorage.getItem('userId'));

// 生命周期钩子
onMounted(async () => {
    try {
        // 获取未支付订单
        const response = await axios.get(`orders?userId=${userId.value}&isPay=false`);
        orders.value = response.data;

        // 渲染图表
        showPersonConsumeByBookType();
        showPersonConsumeByMonth();
        showWebSaleRank();
    } catch (error) {
        console.error('请求失败:', error);
    }
});

// 个人偏好分析图表
const showPersonConsumeByBookType = () => {
    if (!personConsume1.value) return;
    const myChart = echarts.init(personConsume1.value);
    myChart.setOption({
        title: {
            text: '个人偏好分析',
            subtext: '上个月数据',
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: '小说' },
                    { value: 735, name: '童书' },
                    { value: 580, name: '教育' },
                    { value: 484, name: '期刊杂志' },
                    { value: 300, name: '科学' },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    });
};

// 个人月度消费分析图表
const showPersonConsumeByMonth = () => {
    if (!personConsume2.value) return;
    const myChart = echarts.init(personConsume2.value);
    myChart.setOption({
        title: [
            {
                text: '上半年消费金额统计',
            },
        ],
        xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
            },
        ],
    });
};

// 网站销售排行榜图表
const showWebSaleRank = () => {
    if (!webSalesRank.value) return;
    const myChart = echarts.init(webSalesRank.value);
    myChart.setOption({
        xAxis: {
            max: 'dataMax',
        },
        yAxis: {
            type: 'category',
            data: ['遗落的南境', '无人知晓', '证明三部曲', '鬼吹灯全八册', '平凡的世界', '世界地理', '考试脑科学'],
            inverse: true,
            max: 6, // 只显示最大的 6 条数据
        },
        series: [
            {
                name: 'X',
                type: 'bar',
                data: [503, 433, 402, 333, 233, 154, 12],
                label: {
                    show: true,
                    position: 'right',
                },
            },
        ],
        legend: {
            show: true,
        },
    });
};
</script>

<style scoped>
.title {
    font-size: 25px;
    text-align: left;
    margin-top: 20px;
}
</style>