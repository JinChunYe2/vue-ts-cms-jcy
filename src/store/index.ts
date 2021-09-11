import { createStore, Store, useStore as useVusexStore } from 'vuex'

import login from './login/login'

import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
    state: () => {
        return {
            name: '靳春野',
            age: 18
        }
    },
    mutations: {},
    getters: {},
    actions: {},
    modules: { login }
})

export function setupStore() {
    store.dispatch('login/locdLocalLogin')
}

export function useStore(): Store<IStoreType> {
    return useVusexStore()
}

export default store
