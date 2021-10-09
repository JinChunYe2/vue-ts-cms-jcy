<template>
    <div class="page-content">
        <hy-table :listData="userList" v-bind="contentTableConfig">
            <!-- 1.header中的插槽 -->
            <template #header></template>
            <template #headerHandler>
                <el-button type="primary" size="medium">新建用户</el-button>
            </template>

            <!-- 2.列中的插槽 -->
            <template #status="scope">
                <el-button
                    plain
                    size="mini"
                    :type="scope.row.enable ? 'success' : 'danger'"
                >
                    {{ scope.row.enable ? '启用' : '禁用' }}
                </el-button>
            </template>
            <!-- scope返回的值是slot标签上返回的所有属性值 -->
            <template #createAt="scope">
                <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
            </template>
            <template #updateAt="scope">
                <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
            </template>
            <template #handler>
                <div class="handle-btns">
                    <el-button size="mini" type="text" icon="el-icon-edit">
                        编辑
                    </el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete">
                        删除
                    </el-button>
                </div>
            </template>
        </hy-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import HyTable from '@/base-ui/table/index'
export default defineComponent({
    props: {
        contentTableConfig: {
            type: Object,
            redirect: true
        }
    },
    components: { HyTable },
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
        return { userList, userCount }
    }
})
</script>

<style lang="less" scoped>
.page-content {
    padding: 20px;
    border-top: 20px solid #f5f5f5;
}
</style>
