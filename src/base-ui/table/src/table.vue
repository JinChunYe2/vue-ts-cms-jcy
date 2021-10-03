<template>
    <div class="hy-table">
        <el-table :data="listData" border style="width: 100%">
            <template v-for="propItem in propList" :key="propItem.prop">
                <!-- v-bind=propItem也可以，高级写法 -->
                <el-table-column
                    :prop="propItem.prop"
                    :label="propItem.label"
                    :min-width="propItem.minWidth"
                    align="center"
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
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    components: {},
    props: {
        listData: {
            type: Array,
            required: true
        },
        propList: {
            type: Array,
            required: true
        }
    },
    setup() {
        return {}
    }
})
</script>

<style lang="less" scoped></style>
