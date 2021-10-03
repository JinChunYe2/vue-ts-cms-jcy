<template>
    <div class="user">
        <page-search :searchFormConfig="searchFormConfig" />
    </div>
    <div class="content">
        <hy-table :listData="userList" :propList="propList">
            <template #status="scope">
                <el-button>{{ scope.row.enable ? '启用' : '禁用' }}</el-button>
            </template>
            <!-- scope返回的值是slot标签上返回的所有属性值 -->
            <template #createAt="scope">
                <strong>{{ scope.row.createAt }}</strong>
            </template>
        </hy-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useStore } from '@/store'

import pageSearch from '@/components/page-search/index'
import HyTable from '@/base-ui/table/index'

import { searchFormConfig } from './config/search.config'

export default defineComponent({
    name: 'user',
    components: {
        pageSearch,
        HyTable
    },
    setup() {
        const store = useStore()
        store.dispatch('system/getPageListAction', {
            pageUrl: '/users/list',
            queryInfo: {
                offset: 0,
                size: 10
            }
        })
        const userList = computed(() => store.state.system.userList)
        const userCount = computed(() => store.state.system.userCount)

        const propList = [
            { prop: 'name', label: '用户名', minWidth: '100' },
            { prop: 'realname', label: '真实姓名', minWidth: '100' },
            { prop: 'cellphone', label: '手机号码', minWidth: '100' },
            {
                prop: 'enable',
                label: '状态',
                minWidth: '100',
                slotname: 'status'
            },
            {
                prop: 'createAt',
                label: '创建时间',
                minWidth: '250',
                slotname: 'createAt'
            },
            {
                prop: 'updateAt',
                label: '更新时间',
                minWidth: '250',
                slotname: 'updateAt'
            }
        ]
        return { searchFormConfig, userList, userCount, propList }
    }
})
</script>

<style scoped>
.content {
    padding: 20px;
    border-top: 20px solid #f5f5f5;
}
</style>
