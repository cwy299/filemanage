import Vue from 'vue'
import ElementUI from 'element-ui';
import Router from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css';
import Login from '../components/login/login.vue'
import Register from '../components/login/register.vue'
import Home from '../components/home/home.vue'
Vue.use(Router)
Vue.use(ElementUI);

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login

    },
    {
      name: 'home',
      path: '/',
      component: Home

    },
    {
      name: 'register',
      path: '/register',
      component: Register

    }
  ]
})
