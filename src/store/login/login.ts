import { Module } from 'vuex'

import router from '@/router'

import {
    accountLoginRequest,
    requesUserInfoById,
    requestUserMenusByRoleId
} from '@/service/login/login'
import LocalCache from '@/utils/cache'

import { IAccount } from '@/service/login/type'
import { ILoginState } from './types'
import { IRootState } from '../types'

import { mapMenusToRoutes } from '@/utils/map-menus'

const loginModule: Module<ILoginState, IRootState> = {
    namespaced: true,
    state() {
        return {
            token: '',
            userInfo: {},
            userMenus: []
        }
    },
    mutations: {
        changeToken(state, token: string) {
            state.token = token
        },
        changeUserInfo(state, userInfo: any) {
            state.userInfo = userInfo
        },
        changeUserMenus(state, userMenus: any) {
            state.userMenus = userMenus

            console.log('注册动态路由')

            // userMenus => routes
            const routes = mapMenusToRoutes(userMenus)

            // 将routes => router.main.children
            routes.forEach((route) => {
                router.addRoute('main', route)
            })
        }
    },
    getters: {},
    actions: {
        async accountLoginAction({ commit }, payload: IAccount) {
            // 1. 实现登录逻辑
            const loginResult = await accountLoginRequest(payload)
            const { id, token } = loginResult.data
            commit('changeToken', token)
            LocalCache.setCache('token', token)
            // console.log(loginResult, id, token)

            // 2.请求用户信息
            const userInfoResult = await requesUserInfoById(id)
            const userInfo = userInfoResult.data
            commit('changeUserInfo', userInfo)
            LocalCache.setCache('userInfo', userInfo)
            // console.log(userInfo)

            // 3.请求用户菜单
            const userMenusResult = await requestUserMenusByRoleId(
                userInfo.role.id
            )
            const userMenus = userMenusResult.data
            commit('changeUserMenus', userMenus)
            LocalCache.setCache('userMenus', userMenus)
            console.log(userMenus)

            // 4.跳到首页
            router.push('/main')
        },
        // 5.如果页面重新进入或刷新的情况下，依旧从本地存储里获取数据
        locdLocalLogin({ commit }) {
            const token = LocalCache.getCache('token')
            if (token) {
                commit('changeToken', token)
            }
            const userInfo = LocalCache.getCache('userInfo')
            if (userInfo) {
                commit('changeUserInfo', userInfo)
            }
            const userMenus = LocalCache.getCache('userMenus')
            if (userMenus) {
                commit('changeUserMenus', userMenus)
            }
        }
    }
}

export default loginModule
