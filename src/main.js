// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import routes from './routes'
import Header from './Header.vue'
import firebase from 'firebase'
import fire from './firebase'

Vue.use(VueResource)
Vue.use(VueRouter)

Vue.filter('uppercase', function (value) {
  return value.toUpperCase()
})

const router = new VueRouter({
  mode: 'history',
  routes // short for routes: routes
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    // this route requires auth, check if logged in
    // if not, redirect to login page.

    firebase.auth().onAuthStateChanged( function (user) {
      if (user && !requiresAuth) {
        next({path: '/home'})
      } else if(requiresAuth && !user) {
        next({path: '/login'})
      }
      else {
        next() 
      }
    })
  
})


new Vue({
  el: '#app',
  router,
  fire,
  render: h => h(Header)
})

