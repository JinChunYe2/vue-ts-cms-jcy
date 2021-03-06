import { createStore, Store, useStore as useVusexStore } from 'vuex'

import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'

import { getPageListData } from '@/service/main/system/system'

import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
    state: () => {
        return {
            name: '靳春野',
            age: 18,
            // 全部部门
            entireDepartment: [],
            // 全部角色
            entireRole: [],
            entireMenu: []
        }
    },
    mutations: {
        changeDepartmentList(state, departmentList) {
            state.entireDepartment = departmentList
        },
        changeRoleList(state, roleList) {
            state.entireRole = roleList
        },
        changeEntireMenu(state, list) {
            state.entireMenu = list
        }
    },
    getters: {},
    actions: {
        async getInitialDataAction({ commit }) {
            // 1.请求部门数据
            const departmentResult = await getPageListData('/department/list', {
                offset: 0,
                size: 1000
            })
            const { list: departmentList } = departmentResult.data

            // 增加权限完整数据
            const menuResult = await getPageListData('/menu/list', {})
            const { list: menuList } = menuResult.data

            // 2.请求角色数据
            const roleResult = await getPageListData('/role/list', {
                offset: 0,
                size: 1000
            })
            const { list: roleList } = roleResult.data
            // 3.保存数据
            commit('changeDepartmentList', departmentList)
            commit('changeRoleList', roleList)
            commit('changeEntireMenu', menuList)
        }
    },
    modules: {
        login,
        system,
        dashboard
    }
})

export function setupStore() {
    store.dispatch('login/locdLocalLogin')
    // store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
    return useVusexStore()
}

export default store
