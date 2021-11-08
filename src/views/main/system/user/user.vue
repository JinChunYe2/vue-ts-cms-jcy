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
            :modalConfig="modalConfig"
            :defaultInfo="defaultInfo"
        ></page-model>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

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

        const [pageModalRef, defaultInfo, handleNewClick, handleEditClick] =
            usePageModel(newCallback, editCallback)
        return {
            searchFormConfig,
            contentTableConfig,
            pageContentRef,
            handleResetClick,
            handleQueryClick,
            modalConfig,
            pageModalRef,
            defaultInfo,
            handleNewClick,
            handleEditClick
        }
    }
})
</script>

<style scoped></style>
