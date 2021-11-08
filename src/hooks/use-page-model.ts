import { ref } from 'vue'
import pageModel from '@/components/page-modle/index'

type CallbackFn = () => void

export function usePageModel(newCb?: CallbackFn, editCb?: CallbackFn) {
    const pageModalRef = ref<InstanceType<typeof pageModel>>()
    const defaultInfo = ref({})
    // 新建用户
    const handleNewClick = () => {
        defaultInfo.value = {}
        if (pageModalRef.value) {
            pageModalRef.value.dialogVisible = true
        }
        newCb && newCb()
    }
    // 编辑用户
    const handleEditClick = (item: any) => {
        defaultInfo.value = { ...item }
        if (pageModalRef.value) {
            pageModalRef.value.dialogVisible = true
        }
        editCb && editCb()
    }
    return [pageModalRef, defaultInfo, handleNewClick, handleEditClick]
}
