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
            <slot></slot>
            <template #footer class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirmClick">
                    确 定
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

import { useStore } from 'vuex'

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
        },
        otherInfo: {
            type: Object,
            default: () => ({})
        },
        pageName: {
            type: String,
            required: true
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
        // 确定按钮的逻辑
        const store = useStore()
        const handleConfirmClick = () => {
            console.log(123)
            dialogVisible.value = false
            if (Object.keys(props.defaultInfo).length) {
                // 编辑
                console.log('编辑用户', props.pageName)
                store.dispatch('system/editPageDataAction', {
                    pageName: props.pageName,
                    editData: { ...formData.value, ...props.otherInfo },
                    id: props.defaultInfo.id
                })
            } else {
                // 新建
                console.log('新建用户')
                store.dispatch('system/createPageDataAction', {
                    pageName: props.pageName,
                    newData: { ...formData.value, ...props.otherInfo }
                })
            }
        }

        return { dialogVisible, formData, handleConfirmClick }
    }
})
</script>

<style lang="less" scoped></style>
