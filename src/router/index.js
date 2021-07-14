import Vue from 'vue'
//import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import Router from 'vue-router'
//页面
import index from '../views/index.vue'
import Login from '../views/Login.vue'
import user from '../views/user.vue'
import edit from '../components/edit.vue'
import movieInfo from '../views/movieInfo.vue'
import movieInfo1 from '../views/movieInfo1.vue'
import movieList from '../views/movieList.vue'
import search from '../views/search.vue'
import coming from '../views/coming.vue'
import popular from '../views/popular.vue'
import tags from '../views/tags.vue'
import routerpage from '../components/routerpage.vue'

//局部控件
import mym from '../components/mymovie.vue'
import myw from '../components/mywords.vue'
//import footer1 from '../components/footer1.vue'

//测试
import test from '../views/test.vue'
//export default router
Vue.use(Router)



 const router = new Router({
  routes:[
  //  { path:'/',redirect:'/Login'},
  //  设置登录注册
    { name:'login',path:'/login',component:Login},
    { name:'login1',path:'/login/signup',component:Login},
    { name:'index',path:'/index',component:index},
    { path:'/user',component:user,
      children:[
        {path:'myw',name:'myw',component:myw},
        {path:'mym',name:'mym',component:mym},
      ]        
    },
    { name:"tags",path:'/tags',component:tags},
    { path:'/test',component:test},
    { path:'/edit',component:edit},
    { path:'/search',component:search},
    { path:'/coming',component:coming},
    { path:'/popular',component:popular},
    { name:"movieInfo",path:'/movieInfo',component:movieInfo},
    { name:"movieInfo1",path:'/movieInfo1',component:movieInfo1},
    { name:"movieList",path:'/movieList',component:movieList},
    { name:"routerpage",path:'/routerpage',component:routerpage}
   // { path:'/myw',component:myw},
   // { path:'/mym',component:mym},
   // { path:'/mso',component:menu_t2}
  ]
})

export default router
/*
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about"  '../views/About.vue')
  //}
//]

/**const router = new VueRouter({
  routes
})


**/