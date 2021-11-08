<template>
    <div class="page-content">
        <hy-table
            :listData="dateList"
            :listCount="dateCount"
            v-bind="contentTableConfig"
            v-model:page="pageInfo"
        >
            <!-- 1.header中的插槽 -->
            <template #header></template>
            <template #headerHandler>
                <el-button
                    type="primary"
                    size="medium"
                    v-if="isCreate"
                    @click="handleNewClick()"
                >
                    {{ contentTableConfig.newtitle }}
                </el-button>
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
            <template #handler="scope">
                <div class="handle-btns">
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        v-if="isUpdate"
                        @click="handleEditClick(scope.row)"
                    >
                        编辑
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        v-if="isDelete"
                        @click="handleDeleteClick(scope.row)"
                    >
                        删除
                    </el-button>
                </div>
            </template>

            <!-- 在page-content中动态插入剩余的插槽 -->
            <template
                v-for="item in otherPropSlots"
                :key="item.prop"
                #[item.slotname]="scope"
            >
                <template v-if="item.slotname">
                    <slot :name="item.slotname" :row="scope.row"></slot>
                </template>
            </template>
        </hy-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'

import HyTable from '@/base-ui/table/index'

import { usePermission } from '@/hooks/use-permission'
export default defineComponent({
    props: {
        contentTableConfig: {
            type: Object,
            redirect: true
        },
        pageName: {
            type: String,
            redirect: true
        }
    },
    components: { HyTable },
    emits: ['newBtnClick', 'editBtnClick'],
    setup(props, { emit }) {
        console.log(props.pageName)
        const store = useStore()

        // 获取操作的权限
        const isCreate = usePermission(props.pageName ?? '', 'create')
        const isUpdate = usePermission(props.pageName ?? '', 'update')
        const isDelete = usePermission(props.pageName ?? '', 'delete')
        const isQuery = usePermission(props.pageName ?? '', 'query')

        // 双向绑定pageInfo
        const pageInfo = ref({ currentPage: 0, pageSize: 10 })

        watch(pageInfo, () => {
            getPageData()
        })

        // 发送网络请求
        const getPageData = (queryInfo: any = {}) => {
            if (!isQuery) return false
            store.dispatch('system/getPageListAction', {
                pageName: props.pageName,
                queryInfo: {
                    offset:
                        pageInfo.value.currentPage !== 0
                            ? (pageInfo.value.currentPage - 1) *
                              pageInfo.value.pageSize
                            : pageInfo.value.currentPage *
                              pageInfo.value.pageSize,
                    size: pageInfo.value.pageSize,
                    ...queryInfo
                }
            })
        }
        getPageData()

        const dateList = computed(() =>
            store.getters[`system/pageListDate`](props.pageName)
        )
        const dateCount = computed(() =>
            store.getters[`system/pageListCount`](props.pageName)
        )

        // 获取其他的动态插槽名称
        const otherPropSlots = props.contentTableConfig?.propList.filter(
            (item: any) => {
                const condition = ['status', 'createAt', 'updateAt', 'handler']
                if (condition.includes(item.slotname)) return false
                return true
            }
        )

        // 删除/编辑/新建操作
        const handleDeleteClick = (item: any) => {
            console.log(item)
            store.dispatch('system/deletePageDataAction', {
                pageName: props.pageName,
                id: item.id
            })
        }

        const handleNewClick = () => {
            emit('newBtnClick')
        }
        const handleEditClick = (item: any) => {
            emit('editBtnClick', item)
        }

        return {
            dateList,
            getPageData,
            dateCount,
            pageInfo,
            otherPropSlots,
            isCreate,
            isUpdate,
            isDelete,
            isQuery,
            handleDeleteClick,
            handleEditClick,
            handleNewClick
        }
    }
})
</script>

<style lang="less" scoped>
.page-content {
    padding: 20px;
    border-top: 20px solid #f5f5f5;
}
</style>
