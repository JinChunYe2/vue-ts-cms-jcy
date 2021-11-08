import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'

import { getPageListData, deletePageData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
    // 作用于开启，否则追踪不到子模块
    namespaced: true,
    state() {
        return {
            usersList: [],
            usersCount: 0,
            roleList: [],
            roleCount: 0,
            goodsList: [],
            goodsCount: 0,
            menuList: [],
            menuCount: 0
        }
    },
    mutations: {
        changeUsersList(state, usersList: any[]) {
            state.usersList = usersList
        },
        changeUsersCount(state, usersCount: number) {
            state.usersCount = usersCount
        },
        changeRoleList(state, roleList: any[]) {
            state.roleList = roleList
        },
        changeRoleCount(state, roleCount: number) {
            state.roleCount = roleCount
        },
        changeGoodsList(state, goodsList: any[]) {
            state.goodsList = goodsList
        },
        changeGoodsCount(state, goodsCount: number) {
            state.goodsCount = goodsCount
        },
        changeMenuList(state, menuList: any[]) {
            state.menuList = menuList
        },
        changeMenuCount(state, menuCount: number) {
            state.menuCount = menuCount
        }
    },
    getters: {
        pageListDate(state) {
            return (pageName: string) => {
                //  做拼接
                return (state as any)[`${pageName}List`]
                // switch (pageName) {
                //     case 'users':
                //         return state.usersList
                //         break
                //     case 'role':
                //         return state.roleList
                //         break
                // }
            }
        },
        pageListCount(state) {
            return (pageName: string) => {
                //  做拼接
                return (state as any)[`${pageName}Count`]
            }
        }
    },
    actions: {
        async getPageListAction({ commit }, payload: any) {
            // 获取页面名称,通过传输不同页面的名字来动态的获取对应信息
            const pageName = payload.pageName
            // (1)做拼接，简洁
            const pageUrl = `/${pageName}/list`

            // (2)不做拼接，对于项目接口格式不统一可以这么做，简单易懂
            // let pageUrl = ''
            // switch (pageName) {
            //     case 'users':
            //         pageUrl = '/users/list'
            //         break
            //     case 'role':
            //         pageUrl = '/role/list'
            //         break
            // }

            // 1.对页面发送请求
            const pageResult = await getPageListData(pageUrl, payload.queryInfo)
            const { list, totalCount } = pageResult.data
            console.log(list)

            // 2.做拼接转换
            const toPageName =
                pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
            commit(`change${toPageName}List`, list)
            commit(`change${toPageName}Count`, totalCount)
        },

        async deletePageDataAction({ dispatch }, payload: any) {
            // 1.获取pageName和id
            // pageName -> /users
            // id -> /users/id
            const { pageName, id } = payload
            const pageUrl = `/${pageName}/${id}`

            // 2.调用删除网络请求
            await deletePageData(pageUrl)

            // 3.重新请求最新的数据
            dispatch('getPageListAction', {
                pageName,
                queryInfo: {
                    offset: 0,
                    size: 10
                }
            })
        }
    }
}

export default systemModule
