<template>
    <el-container class="layout-container">
        <el-aside :style="{ height: defaultHeight + 'px' }" style="{padding-bottom:4rem;}" :width="asideWidth">
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
                <template v-for="item in showMenus" :key="item">
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
                            <Timer />
                        </el-icon>
                        <span style="padding-right: 2rem;vertical-align: middle;">{{ nowTimes }}</span>
                    </div>
                    <div style="padding-right:0.4rem;">
                        <el-dropdown style="line-height: 60px;">
                            <span class="el-dropdown-link" style="color:var(--theme);">
                                <span style="cursor:pointer;vertical-align: middle;">{{ userName }} 欢迎您</span>
                                <el-icon style="vertical-align: middle;">
                                    <arrow-down />
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
<script>
import { reactive, toRefs, onMounted, onBeforeMount, computed } from "vue";
import { timeFormate } from '../utils/utils.js'
import Submenu from "../components/Submenu.vue"
import { useRouter } from "vue-router"
export default {
    components: {
        //引入组件
        Submenu
    },
    setup() {
        //实例化userouter
        const router = useRouter();
        onBeforeMount(() => {
            data.defaultHeight = (document.body.clientHeight || document.documentElement.clientHeight);
        });

        //onMounted()生命周期
        onMounted(() => {
            data.onNowTimes();
            window.addEventListener('resize', data.onDefaultHeight);
            data.userName = localStorage.getItem("userName");
            data.userType = localStorage.getItem("userType");
        });
        const data = reactive({
            nowTimes: "",
            isCollapse: false,
            asideWidth: '240px',
            defaultHeight: null,
            userName: "",
            userType: "",
            menus: [
                {
                    icon: "HomeFilled",
                    chineseName: "首页",
                    path: "/home",
                    menuUser: "all",
                },
                {
                    icon: "Grid",
                    chineseName: "工作台",
                    path: "/workBench",
                    menuUser: "all",
                },
                {
                    icon: "Tools",
                    chineseName: "系统管理",
                    path: "",
                    menuUser: "admin",
                    children: [
                        {
                            chineseName: "用户管理",
                            path: "/userManage"
                        },
                        {
                            chineseName: "图书管理",
                            path: "/bookManage"
                        }
                    ]
                },
                {
                    icon: "GoodsFilled",
                    chineseName: "购物车",
                    menuUser: "all",
                    path: "/shoppingCart"
                },
                {
                    icon: "List",
                    chineseName: "我的订单",
                    menuUser: "all",
                    path: "/buyRecord"
                },
                {
                    icon: "UserFilled",
                    chineseName: "个人中心",
                    menuUser: "all",
                    path: "/personalCenter"
                }
            ],
            showMenus: computed(() => {
                return data.menus.filter((item) => {
                    return (data.userType == "admin" || (data.userType == "common" && item.menuUser == "all"));
                })
            }),
            onNowTimes: () => {
                setInterval(() => {
                    data.nowTimes = timeFormate(new Date());
                }, 1000);
            },
            onCollapse: () => {
                if (data.isCollapse) {
                    data.asideWidth = '240px'
                    data.isCollapse = false
                } else {
                    data.isCollapse = true
                    data.asideWidth = '64px'
                }
            },
            onDefaultHeight: () => {
                data.defaultHeight = window.innerHeight
            },
            onLogout: () => {
                localStorage.removeItem("userId");
                localStorage.removeItem("userName");
                router.push({ path: 'login' });
            }
        });
        return {
            ...toRefs(data)
        };
    }
};
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
            // border:1px transparent solid;
            // border-image:linear-gradient(to right,var(--bg1),#DCDFE6,var(--bg1)) 1 10;
            // box-shadow: 0 4px 8px 0 rgba(36,46,66,.06)!important;
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