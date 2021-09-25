import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import LocalCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue')
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('@/views/main/main.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('@/components/not-found/not-found.vue')
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

router.beforeEach((to) => {
    if (to.path !== '/login') {
        const token = LocalCache.getCache('token')
        if (!token) {
            return '/login'
        }
    }
    // 如果跳转到/main的话，就会到列表第一个
    if (to.path === '/main') {
        return firstMenu.url
    }
    // if (to.path.indexOf('/main') !== -1) {
    //     if (to.name === 'notFound') {
    //         to.name = 'user'
    //     }
    // }
})

export default router
