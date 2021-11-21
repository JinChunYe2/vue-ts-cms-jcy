<template>
    <div class="user">
        <page-search
            :searchFormConfig="searchFormConfig"
            @resetBthClick="handleResetClick"
            @queryBthClick="handleQueryClick"
        />
        <page-content
            ref="pageContentRef"
            :contentTableConfig="contentTableConfig"
            pageName="users"
            @editBtnClick="handleEditClick"
            @newBtnClick="handleNewClick"
        ></page-content>

        <!-- 分页 + content-title动态 + 按钮功能添加 -->
        <!-- 是ref的时候，命名的时候有个Ref -->
        <page-model
            ref="pageModalRef"
            pageName="users"
            :modalConfig="modalConfigRef"
            :defaultInfo="defaultInfo"
        ></page-model>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'

import pageSearch from '@/components/page-search/index'
import pageContent from '@/components/page-content/index'
import pageModel from '@/components/page-modle/index'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModel } from '@/hooks/use-page-model'

export default defineComponent({
    name: 'user',
    components: {
        pageSearch,
        pageContent,
        pageModel
    },
    setup() {
        const [pageContentRef, handleResetClick, handleQueryClick] =
            usePageSearch()

        // pageModel的hooks逻辑
        // 1.处理密码的逻辑
        const newCallback = () => {
            const passwordItem = modalConfig.formItems.find(
                (item) => item.field === 'password'
            )
            passwordItem!.isHidden = false
            console.log(passwordItem!.isHidden)
        }
        const editCallback = () => {
            const passwordItem = modalConfig.formItems.find(
                (item) => item.field === 'password'
            )
            passwordItem!.isHidden = true
            console.log(passwordItem!.isHidden)
        }

        // 2.动态添加部门和角色列表
        const store = useStore()
        const modalConfigRef = computed(() => {
            const departmentItem = modalConfig.formItems.find(
                (item) => item.field === 'departmentId'
            )
            departmentItem!.options = store.state.entireDepartment.map(
                (item) => {
                    return { title: item.name, value: item.id }
                }
            )
            const roleItem = modalConfig.formItems.find(
                (item) => item.field === 'roleId'
            )
            roleItem!.options = store.state.entireRole.map((item) => {
                return { title: item.name, value: item.id }
            })
            return modalConfig
        })

        // 3.调用hook获取公共变量和函数
        const [pageModalRef, defaultInfo, handleNewClick, handleEditClick] =
            usePageModel(newCallback, editCallback)
        return {
            searchFormConfig,
            contentTableConfig,
            pageContentRef,
            handleResetClick,
            handleQueryClick,
            modalConfigRef,
            pageModalRef,
            defaultInfo,
            handleNewClick,
            handleEditClick
        }
    }
})
</script>

<style scoped></style>
