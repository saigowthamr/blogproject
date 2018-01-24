import Blog from './components/Blog'
import Hello from './components/Hello'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import Display from './components/Display.vue'

const routes = [
        { path: '/', component: Blog, meta: { requiresAuth: true }},
        {path: '/display/:id', name: 'Display', component: Display, meta: { requiresAuth: true }},        
        { path: '/hello', component: Hello, meta: { requiresAuth: true }},
        { path: '/signup', component: Signup },
        { path: '/login', component: Login },
        { path: '*', redirect: '/login' }
]

export default routes

