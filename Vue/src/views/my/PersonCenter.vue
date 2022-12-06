<template>
    <el-form :model="user" label-width="120px" v-if="state=='edit'" label-position=left style="width:90%">
        <el-form-item label="头像:">
            <el-input v-model="user.img" />
        </el-form-item>
        <el-form-item label="账号:">
            <el-input v-model="user.userName" />
        </el-form-item>
        <el-form-item label="密码:">
            <el-input v-model="user.userPassword" />
        </el-form-item>
        <el-form-item label="年龄:">
            <el-input v-model="user.age" />
        </el-form-item>
        <el-form-item label="性别:">
            <el-input v-model="user.sex" />
        </el-form-item>
        <el-form-item label="账号类型：">
            <el-select v-model="user.userType" placeholder="请选择用户类型">
                <el-option key="0" value="admin" label="管理员" />
                <el-option key="1" value="common" label="普通用户" />
            </el-select>
        </el-form-item>
    </el-form>
    <el-row justify="left">
        <el-button type="primary" @click="editPerson()" v-if="state == 'show'">修改个人信息</el-button>
        <el-button type="primary" @click="confirmEditPerson()" v-if="state == 'edit'">确认修改</el-button>
    </el-row>
    <div class="personInfo" v-if="state == 'show'">
        <div class="left">
            <!-- 图书图片 -->
            <a href="#">
                <img :src="user.img" height="200">
            </a>
        </div>
        <div class="right">
            <!-- 电影的基本信息 -->
            <p>账号:<strong>{{ user.userName }}</strong></p>
            <p>密码:{{ user.userPassword }}</p>
            <p>年龄:{{ user.age }}</p>
            <p>性别:{{ user.sex }}</p>
            <p v-if="user.userType == 'admin'">账号类型:管理员</p>
            <p v-if="user.userType == 'common'">账号类型:普通用户</p>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import axios from "axios";
export default {
    setup() {
        onMounted(() => {
            data.userName = localStorage.getItem("userName");
            data.userId = localStorage.getItem("userId");
            //发送get请求
            axios
                .get("users/" + data.userId)
                .then((response) => {
                    data.user = response.data
                })
                .catch((error) => console.log(error)); // 请求失败处理
        });
        const data = reactive({
            user: {
                id: "",
                userName: "",
                userPassword: "",
                userType: "",
                age: 0,
                sex: "",
                img: ""
            },
            state: "show",
            editPerson: () => {
                data.state = "edit";
            },
            confirmEditPerson: () => {
                axios
                    .patch("users/" + data.userId, data.user)
                    .then((response) => {
                        data.state = "show";
                    })
                    .catch((error) => console.log(error)); // 请求失败处理
            }
        });
        return {
            ...toRefs(data)
        };
    }
}
</script>

<style scoped>
.editPersonInfo>div {
    margin-bottom: 20px;
}

.editPersonInfo>div>label {
    width: 70px;
}

.left {
    float: left;
    margin: 20px 15px 5px 10px;
}

.right {
    float: left;
    margin: 20px 0px 5px 5px;

}

.right p {
    margin-bottom: 20px;
}
</style>