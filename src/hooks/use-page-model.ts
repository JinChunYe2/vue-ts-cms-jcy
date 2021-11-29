import { ref } from 'vue'
import pageModel from '@/components/page-modle/index'

type CallbackFn = (item?: any) => void

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
        console.log('点击了编辑按钮', item)
        editCb && editCb(item)
    }
    return [pageModalRef, defaultInfo, handleNewClick, handleEditClick]
}
