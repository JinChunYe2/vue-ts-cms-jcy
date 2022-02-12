<template>
    <div class="hy-table">
        <div class="header">
            <slot name="header">
                <div class="title">{{ title }}</div>
            </slot>
            <div class="handler">
                <slot name="headerHandler"></slot>
            </div>
        </div>

        <el-table
            :data="listData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
            v-bind="childrenProps"
        >
            <!-- 是否选中 -->
            <el-table-column
                v-if="showSelectColumn"
                type="selection"
                align="center"
                width="60"
            ></el-table-column>
            <!-- 序号 -->
            <el-table-column
                v-if="showIndexColumn"
                type="index"
                label="序号"
                align="center"
                width="80"
            ></el-table-column>
            <template v-for="propItem in propList" :key="propItem.prop">
                <!-- v-bind=propItem也可以，高级写法 -->
                <el-table-column
                    :prop="propItem.prop"
                    :label="propItem.label"
                    :min-width="propItem.minWidth"
                    align="center"
                    show-overflow-tooltip
                >
                    <!-- scope返回的值是slot标签上返回的所有属性值 -->
                    <template #default="scope">
                        <!-- 改写个别插槽，修改某一个数据需求 -->
                        <slot :name="propItem.slotname" :row="scope.row">
                            {{ scope.row[propItem.prop] }}
                        </slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <div class="footer" v-if="showFooter">
            <slot name="footer">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.currentPage"
                    :page-sizes="[10, 20, 30]"
                    :page-size="page.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="listCount"
                ></el-pagination>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    components: {},
    props: {
        title: {
            type: String,
            default: ''
        },
        listData: {
            type: Array,
            required: true
        },
        listCount: {
            type: Number,
            default: 0
        },
        propList: {
            type: Array,
            required: true
        },
        // 是否显示序号
        showIndexColumn: {
            type: Boolean,
            default: false
        },
        showSelectColumn: {
            type: Boolean,
            default: false
        },
        page: {
            type: Object,
            default: () => ({ currentPage: 0, pageSize: 10 })
        },
        childrenProps: {
            type: Object,
            default: () => ({})
        },
        showFooter: {
            type: Boolean,
            default: true
        }
    },
    emits: ['selectionChange', 'update:page'],
    setup(props, { emit }) {
        const handleSelectionChange = (value: any) => {
            console.log(value)
            emit('selectionChange', value)
        }
        const handleSizeChange = (pageSize: number) => {
            console.log('ceshi')
            emit('update:page', {
                ...props.page,
                pageSize
            })
        }
        const handleCurrentChange = (currentPage: number) => {
            emit('update:page', { ...props.page, currentPage })
        }
        return { handleSelectionChange, handleSizeChange, handleCurrentChange }
    }
})
</script>

<style lang="less" scoped>
.header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;

    .title {
        font-size: 20px;
        font-weight: 700;
    }

    .handler {
        align-items: center;
    }
}

.footer {
    margin-top: 15px;

    .el-pagination {
        text-align: right;
    }
}
</style>
