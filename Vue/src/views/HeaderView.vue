<template>
    <div>
        <div style="display:flex;line-height:60px">
            <div>
                <el-icon style="font-size: 20px;">
                    <Expand></Expand>
                </el-icon>
            </div>
            <div style="flex:1;text-align: center;font-size: 25px;">
                <span>欢迎来到仓库管理系统</span>
            </div>
            <el-dropdown>
                <div>
                    <span style="margin-right: 5px;">王小虎</span>
                    <el-icon style="margin-top: 20px">
                        <ArrowDown></ArrowDown>
                    </el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="toUser">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { ArrowDown, Expand } from '@element-plus/icons-vue';


export default {
    name: "HeaderView",

    components: {
        ArrowDown,
        Expand
    },

    method: {
        toUser() {
            console.log('to_user');
        },
        logout() {
            console.log('logout');
        }
    }
}
</script>

<style scoped>

</style>