<template>
    <div class="toolbar">
        <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 25px">
                <Setting></Setting>
            </el-icon>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <span>Tom</span>
    </div>
</template>

<script>

export default {
    name: "HeaderView",

    components: {
    }
}
</script>

<style scoped>

</style>