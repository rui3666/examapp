import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from "@/views/HomeView";
import manage from "@/views/manage";
import TiKuView from "@/views/TiKuView";
import AboutView from "@/views/AboutView";

Vue.use(VueRouter)

const routes = [
   {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/manage',
    name:'manage',
    component: manage,
    children:[
      {
        path:'/home',
        component:HomeView,
        meta:[]
      },
      {
        path: '/tiku',
        component: TiKuView,
        meta: ['题库管理','题目列表']
      },
      {
        path: '/news',
        component: AboutView,
        meta: ['资讯管理','资讯列表']
      }
    ]
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
