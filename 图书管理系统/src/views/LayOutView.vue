<template>
    <el-container class="layout-container">
        <el-aside 
            :style="{ 
                height: defaultHeight + 'px',
                paddingBottom: '4rem'
            }" 
            :width="asideWidth"
        >
            <el-card v-show="!isCollapse" shadow="always">
                <div>
                    <el-icon :size="26" style="vertical-align: middle;">
                        <OfficeBuilding />
                    </el-icon>
                    <span style="vertical-align: middle;padding-left:1rem;">BOOKSTORE</span>
                </div>
            </el-card>
            <el-menu router :default-active="$route.path" :collapse="isCollapse" text-color="#242e42"
                active-text-color="#2F9688" background-color="var(--bg1)">
                <template v-for="item in showMenus" :key="item.path">
                    <el-menu-item v-if="!item.children || item.children.length == 0" :index="item.path">
                        <el-icon v-if="item.icon" style="vertical-align: middle;">
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span style="vertical-align: middle;">{{ item.chineseName }}</span>
                    </el-menu-item>
                    <Submenu v-else :data="item"></Submenu>
                </template>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <div class="header" height="50">
                    <div style="padding-left: 0.4rem;">
                        <el-icon @click="onCollapse" :size="20" style="vertical-align: middle; cursor: pointer;">
                            <component :is="isCollapse ? 'Expand' : 'Fold'"></component>
                        </el-icon>
                        <el-icon :size="16" color="#55bc8a" style="vertical-align: middle;padding-left:2rem;">
                            <Timer></Timer>
                        </el-icon>
                        <span style="padding-right: 2rem;vertical-align: middle;">{{ nowTimes }}</span>
                    </div>
                    <div style="padding-right:0.4rem;">
                        <el-dropdown style="line-height: 60px;">
                            <span class="el-dropdown-link" style="color:var(--theme);">
                                <span style="cursor:pointer;vertical-align: middle;">{{ userName }} 欢迎您</span>
                                <el-icon style="vertical-align: middle;">
                                    <arrow-down></arrow-down>
                                </el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="onLogout" icon="SwitchButton">退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
            </el-header>
            <el-main :style="{ height: defaultHeight + 'px' }">
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, onBeforeMount } from 'vue';
import type { Ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { timeFormate } from '../utils/utils';
import Submenu from '../components/Submenu.vue';
import { Timer, OfficeBuilding, Expand, Fold, ArrowDown, SwitchButton } from '@element-plus/icons-vue';

// 实例化 useRouter 和 useRoute
const router = useRouter();
const route = useRoute();

// 导出 MenuItem 类型以便其他组件使用
export interface MenuItem {
    icon?: string;
    chineseName: string;
    path: string;
    menuUser: string;
    children?: MenuItem[];
}

// 定义响应式数据的类型
const nowTimes: Ref<string> = ref('');
const isCollapse: Ref<boolean> = ref(false);
const asideWidth: Ref<string> = ref('240px');
const defaultHeight: Ref<number | null> = ref(null);
const userName: Ref<string> = ref(localStorage.getItem('userName') || '');
const userType: Ref<string> = ref(localStorage.getItem('userType') || '');

// 菜单数据
const menus = reactive<MenuItem[]>([
    {
        icon: 'HomeFilled',
        chineseName: '首页',
        path: '/home',
        menuUser: 'all',
    },
    {
        icon: 'Grid',
        chineseName: '工作台',
        path: '/workBench',
        menuUser: 'all',
    },
    {
        icon: 'Tools',
        chineseName: '系统管理',
        path: '',
        menuUser: 'admin',
        children: [
            {
                chineseName: '用户管理',
                path: '/userManage',
                menuUser: 'admin'
            },
            {
                chineseName: '图书管理',
                path: '/bookManage',
                menuUser: 'admin'
            },
        ],
    },
    {
        icon: 'GoodsFilled',
        chineseName: '购物车',
        menuUser: 'all',
        path: '/shoppingCart',
    },
    {
        icon: 'List',
        chineseName: '我的订单',
        menuUser: 'all',
        path: '/buyRecord',
    },
    {
        icon: 'UserFilled',
        chineseName: '个人中心',
        menuUser: 'all',
        path: '/personalCenter',
    },
]);

// 计算属性：根据用户类型过滤菜单
const showMenus = computed<MenuItem[]>(() => {
    return menus.filter((item) => {
        return userType.value === 'admin' || (userType.value === 'common' && item.menuUser === 'all');
    });
});

// 更新时间函数
const onNowTimes = () => {
    setInterval(() => {
        nowTimes.value = timeFormate(new Date());
    }, 1000);
};

// 切换侧边栏折叠状态
const onCollapse = () => {
    isCollapse.value = !isCollapse.value;
    asideWidth.value = isCollapse.value ? '64px' : '240px';
};

// 更新默认高度
const onDefaultHeight = () => {
    defaultHeight.value = window.innerHeight;
};

// 登出函数
const onLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    router.push({ path: 'login' });
};

// 生命周期钩子
onBeforeMount(() => {
    defaultHeight.value = document.body.clientHeight || document.documentElement.clientHeight;
});

onMounted(() => {
    onNowTimes();
    window.addEventListener('resize', onDefaultHeight);
    userName.value = localStorage.getItem('userName') || '';
    userType.value = localStorage.getItem('userType') || '';
});
</script>

<style lang="scss">
.layout-container {
    .el-header {
        padding: 0;
        background: var(--bg1);

        .header {
            display: flex;
            justify-content: space-between;
            line-height: 50px;
            color: var(--theme);
            padding-right: 0.4rem;

            .el-dialog__header {
                background: var(--theme);
                padding: 0 10px;

                .el-dialog__title {
                    color: var(--theme);
                }
            }
        }
    }

    .el-aside {
        height: 100%;
        transition: all .5s;
        background: var(--bg1);
        overflow-y: auto;
        overflow-x: hidden;

        .el-menu {
            border: none;

            .el-menu-item,
            .el-sub-menu__title {
                height: 40px;
                line-height: 40px;
            }

            .el-sub-menu__title:hover {
                background: var(--bg1) !important;
            }

            .el-menu-item:hover {
                background: var(--bg1) !important;
            }
        }

        .el-card {
            margin: 0.4rem 0.6rem;
            background-color: var(--theme);
            color: #fff;

            .el-card__body {
                padding: 1rem 2rem;
            }
        }
    }

    .el-aside::-webkit-scrollbar {
        width: 0px;
    }

    .el-main {
        padding: 0;
        overflow-x: hidden;
        overflow-y: auto;
        background: var(--bg1);

        .el-dialog__header {
            background: var(--theme);
            padding: 10px;

            .el-dialog__title {
                color: #fff;
            }
        }
    }

    .el-main::-webkit-scrollbar {
        width: 0px;
    }
}
</style>