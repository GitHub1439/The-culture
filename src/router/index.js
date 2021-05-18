import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import store from '../store/index';

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Index",
        component: () =>
            import ("@/views/Index.vue"),
        meta: { requiresAuth: false, keepAlive: false, title: "首页" }
    },
    {
        path: "/about",
        name: "about",
        component: () =>
            import ("../views/About.vue"),
        meta: { requiresAuth: false, keepAlive: true, title: "关于" }
    },
    {
        path: "/News-details",
        name: "News-details",
        component: () =>
            import("../views/News-details.vue"),
        meta: { requiresAuth: true, title: "公告详情" }
    },
    {
        path: "/Information-details",
        name: "Information-details",
        component: () =>
            import("../views/Information-details.vue"),
        meta: { requiresAuth: true, title: "公告资讯列表" }
    },
    {
        path: "/TheResearchResources",
        name: "TheResearchResources",
        component: () =>
            import("../views/TheResearchResources.vue"),
        meta: { requiresAuth: true, title: "教研资源" }
    },
    {
        path: "/resourceBundle",
        name: "resourceBundle",
        component: () =>
            import("../views/resourceBundle.vue"),
        meta: { requiresAuth: true, title: "资源包" }
    },

    
    {
        path: "/Live-class",
        name: "Live-class",
        component: () =>
            import("../views/Live-class.vue"),
        meta: { requiresAuth: true, title: "直播课堂" }
    },
    {
        path: "/Personal-Center",
        name: "Personal-Center",
        component: () =>
            import("../views/Personal-Center.vue"),
        meta: { requiresAuth: true, title: "个人中心" }
    },
    {
        path: "/Training-Feedback",
        name: "Training-Feedback",
        component: () =>
            import("../views/Training-Feedback.vue"),
        meta: { requiresAuth: true, title: "培训反馈" }
    },
    {
        path: "/Resource-result",
        name: "Resource-result",
        component: () =>
            import("../views/Resource-result.vue"),
        meta: { requiresAuth: true, title: "教研成果" }
    },
    {
        path: "/CourseDetails",
        name: "CourseDetails",
        component: () =>
            import("../views/Course-details.vue"),
        meta: { requiresAuth: true, title: "课程详情" }
    },
    {
        path: "/Works",
        name: "Works",
        component: () =>
            import("../views/Works.vue"),
        meta: { requiresAuth: true, title: "工作坊" }
    },
    {
        path: "/Map",
        name: "Map",
        component: () =>
            import("../views/Map.vue"),
        meta: { requiresAuth: true, title: "地图" }
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import("../views/Login.vue"),
        meta: { requiresAuth: false, title: "登录", header: 'none', footer: 'none' }
    },
    {
        path: "/Change-Password",
        name: "Change-Password",
        component: () =>
            import("../views/Change-Password.vue"),
        meta: { requiresAuth: false, title: "修改密码", header: 'none', footer: 'none' }
    },
    {
        path: "/Code-Login",
        name: "Code-Login",
        component: () =>
            import("../views/Code-Login.vue"),
        meta: { requiresAuth: false, title: "扫码登录", header: 'none', footer: 'none' }
    },
    {
        path: "/WorksInfo",
        name: "WorksInfo",
        component: () =>
            import("../views/WorksInfo.vue"),
        meta: { requiresAuth: true, title: "教师二级页" }
    },
    {
        path: "/Workspace-resource",
        name: "Workspace-resource",
        component: () =>
            import("../views/Workspace-resource.vue"),
        meta: { requiresAuth: true, title: "工作坊资源详情" }
    },
    
    
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, form, savedPosition) {
        return { x: 0, y: 0 }
    }
});

// // 页面刷新时，重新赋值有没登录
// if (window.localStorage.getItem('isLogin')) {
//     store.commit('setIsLogin', window.localStorage.getItem('isLogin'));
// }





router.beforeEach((to, from, next) => {
    console.log(to,from)
    if(to.query.navName){
        next({
            path: `/${to.query.navName}`
        })
    }
    if (to.matched.some(r => r.meta.requiresAuth)) { // 判断该路由是否需要登录权限
        if (store.getters.isLogin) { // 通过vuex 如果当前有登录
            next();
        } else {
            console.log("没有登录吖")
            // localStorage.setItem("preRoute", to.fullPath)
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next();
    }
});


export default router;