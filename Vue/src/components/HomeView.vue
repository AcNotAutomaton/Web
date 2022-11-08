<template>
    <el-container class="layout-container-demo" style="height: 500px">
        <el-aside width="200px">
            <AsideView></AsideView>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 15px;">
                <HeaderView></HeaderView>
            </el-header>

            <el-main>
                <MainView></MainView>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

import AsideView from './AsideView.vue';
import HeaderView from './HeaderView.vue';
import MainView from './MainView.vue';

export default {
    name: "HomeView",

    components: {
        AsideView,
        HeaderView,
        MainView
    },

}
</script>

<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}
</style>