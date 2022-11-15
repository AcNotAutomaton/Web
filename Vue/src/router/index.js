import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: "/login",
        name: "Login",
        meta: { title: "登录" },
        component: () => import('views/login/LoginView.vue')
    },
    {
        path: '/layOut',
        name: 'LayOut',
        meta: { title: "布局" },
        component: () => import('views/LayOutView.vue'),
        children: [
            {
                path: "/home",
                name: "Home",
                meta: { title: "首页" },
                component: () => import('views/home/HomeView.vue')
            },
            {
                path: "/workBench",
                name: "WorkBench",
                meta: { title: "工作台" },
                component: () => import('views/work/WorkBench.vue')
            },
            {
                path: "/userManage",
                name: "UserManage",
                meta: { title: "用户管理" },
                component: () => import('views/systemManage/UserManage.vue')
            },
            {
                path: "/bookManage",
                name: "BookManage",
                meta: { title: "图书管理" },
                component: () => import('views/systemManage/BookManage.vue')
            },
            {
                path: "/shoppingCart",
                name: "ShoppingCart",
                meta: { title: "购物车" },
                component: () => import('views/cart/ShoppingCart.vue')
            },
            {
                path: "/buyRecord",
                name: "BuyRecord",
                meta: { title: "我的订单" },
                component: () => import('views/order/MyOrder.vue')
            },
            {
                path: "/personalCenter",
                name: "PersonalCenter",
                meta: { title: "个人中心" },
                component: () => import('views/my/PersonCenter.vue')
            },
            {
                path: "/bookDetail",
                name: "BookDetail",
                meta: { title: "图书详情" },
                component: () => import('views/home/BookDetail.vue')
            },
            {
                path: "/hello",
                name: "HelloWorld",
                component: () => import('../components/HelloWorld.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    var id = localStorage.getItem("userId");
    if (to.path != "/login" && !id) {
        alert("请先登录，再访问页面！");
        router.push({ path: 'login' });
    } else {
        next();
    }
})

export default router
