import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'

import { getPageListData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
    // 作用于开启，否则追踪不到子模块
    namespaced: true,
    state() {
        return {
            userList: [],
            userCount: 0,
            roleList: [],
            roleCount: 0
        }
    },
    mutations: {
        changeUserList(state, userList: any[]) {
            state.userList = userList
        },
        changeUserCount(state, userCount: number) {
            state.userCount = userCount
        },
        changeRoleList(state, roleList: any[]) {
            state.roleList = roleList
        },
        changeRoleCount(state, roleCount: number) {
            state.roleCount = roleCount
        }
    },
    actions: {
        async getPageListAction({ commit }, payload: any) {
            // 获取页面名称,通过传输不同页面的名字来动态的获取对应信息
            const pageName = payload.pageName

            console.log(payload.pageUrl, pageName, 111)
            console.log(payload.queryInfo)

            let pageUrl = ''
            switch (pageName) {
                case 'user':
                    pageUrl = '/users/list'
                    break
                case 'role':
                    pageUrl = '/role/list'
                    break
            }

            // 1.对页面发送请求
            const pageResult = await getPageListData(pageUrl, payload.queryInfo)
            const { list, totalCount } = pageResult.data
            console.log(list)

            // 做拼接转换
            const toPageName =
                pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
            commit(`change${toPageName}List`, list)
            commit(`change${toPageName}Count`, totalCount)
        }
    }
}

export default systemModule
