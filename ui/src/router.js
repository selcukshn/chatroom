import { createRouter, createWebHistory } from "vue-router"
import store from './store/store'

const routes = [
    {
        name: 'HomePage',
        path: '/',
        component: () => import('./views/HomePage.vue')
    },
    {
        name: 'LoginPage',
        path: '/login',
        component: () => import('./views/LoginPage.vue')
    },
    {
        name: 'RegisterPage',
        path: '/register',
        component: () => import('./views/RegisterPage.vue')
    },
    {
        name: 'ChatRooms',
        path: '/chat-rooms',
        component: () => import('./views/ChatRooms.vue')
    },
    {
        name: 'ActiveRooms',
        path: '/active-rooms',
        component: () => import('./views/ActiveRooms.vue')
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach((to, _, next) => {
    const authRequire = store.getters.authRequirePaths;
    const notAfterAuth = store.getters.notAfterAuthPaths;
    const isAuth = store.getters.userIsAuth;

    if (notAfterAuth.includes(to.name)) {
        if (isAuth) next(false)
        else next()
    }

    if (authRequire.includes(to.name)) {
        if (!isAuth) next({ name: "LoginPage" })
        else next()
    }
})

export default router;