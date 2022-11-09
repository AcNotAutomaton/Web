<template>
    <el-scrollbar>
        <el-menu active-text-color="#ffd04b" background-color="#545c64" text-color="#fff" style="height: 100vh;"
            default-active="/Home">
            <el-menu-item index="/Home">
                <el-icon>
                    <HomeFilled></HomeFilled>
                </el-icon>
                <span>首页</span>
            </el-menu-item>

            <el-menu-item index="/One">
                <el-icon>
                    <HomeFilled></HomeFilled>
                </el-icon>
                <span>导航1</span>
            </el-menu-item>

            <el-menu-item index="/Two">
                <el-icon>
                    <HomeFilled></HomeFilled>
                </el-icon>
                <span>导航2</span>
            </el-menu-item>
        </el-menu>
    </el-scrollbar>
</template>

<script>


export default {
    name: "AsideView",

    components: {
    }
}
</script>

<style scoped>
.el-aside {
    color: black;
}
</style>