<template>
    <div class="page-model">
        <el-dialog
            title="新建用户"
            v-model="dialogVisible"
            width="30%"
            center
            destroy-on-close
        >
            <hy-from v-bind="modalConfig" v-model="formData"></hy-from>
            <template #footer class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    确 定
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

import hyFrom from '@/base-ui/form'

export default defineComponent({
    components: { hyFrom },
    props: {
        modalConfig: {
            type: Object,
            required: true
        },
        defaultInfo: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props) {
        const dialogVisible = ref(false)
        const formData = ref<any>({})

        watch(
            () => props.defaultInfo,
            (newValue) => {
                for (const item of props.modalConfig.formItems) {
                    console.log(item)
                    formData.value[`${item.field}`] = newValue[`${item.field}`]
                }
            }
        )

        return { dialogVisible, formData }
    }
})
</script>

<style lang="less" scoped></style>
