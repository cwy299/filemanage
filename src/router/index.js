import Vue from 'vue'
import ElementUI from 'element-ui';
import Router from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css';
import Login from '../components/login/login.vue'

Vue.use(Router)
Vue.use(ElementUI);

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login

    }
  ]
})
