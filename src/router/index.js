import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/Login"
import Home from "@/components/Home"
import Welcome from "@/components/Welcome";
import Users from "@/components/user/Users";

Vue.use(VueRouter)

const routes = [
    {path:'/login',component:Login},
    {path: '/',redirect:'/login'},
    {path: '/home',redirect:'/welcome',component:Home,children:[
            {path:'/welcome',component:Welcome},
            {path:'/users',component:Users},
        ]},
]

const router = new VueRouter({
    routes
})

//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
    //to:将要访问的路径
    //from:从哪个路径跳转过来
    //next:函数，表示放行
    if(to.path === '/login')
        return next();
    //获取token
    const tokenstr = window.sessionStorage.getItem("token");
    if(!tokenstr)
        return next("/login");
    next();
})

export default router
