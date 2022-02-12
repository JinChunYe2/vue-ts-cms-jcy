<template>
    <div class="role">
        <page-search :searchFormConfig="searchFormConfig"></page-search>
        <page-content
            :contentTableConfig="contentTableConfig"
            pageName="role"
            @newBtnClick="handleNewClick"
            @editBtnClick="handleEditClick"
        ></page-content>

        <page-model
            ref="pageModalRef"
            :defaultInfo="defaultInfo"
            :modalConfig="modalConfig"
            :otherInfo="otherInfo"
            pageName="role"
        >
            <!-- :default-checked-keys="leafKeysList" -->
            <div class="menu-tree">
                <el-tree
                    ref="elTreeRef"
                    :data="roleEntireMenu"
                    show-checkbox
                    node-key="id"
                    :props="{ children: 'children', label: 'name' }"
                    @check="handleCheckChange"
                ></el-tree>
            </div>
        </page-model>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from 'vuex'

import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import pageModel from '@/components/page-modle'

import { ElTree } from 'element-plus'
import { menuMapLeafKeys } from '@/utils/map-menus'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { usePageModel } from '@/hooks/use-page-model'

export default defineComponent({
    name: 'role',
    components: {
        pageSearch,
        pageContent,
        pageModel
    },
    setup() {
        // 1.处理pageModal的hook
        // const leafKeysList = ref()
        const elTreeRef = ref<InstanceType<typeof ElTree>>()
        const editCallback = (item: any) => {
            // 第一种办法=>直接使用elment原生方法，把我的key传进去
            const leafKeys = menuMapLeafKeys(item.menuList)
            // leafKeysList.value = [...leafKeys]

            // 第二种老师视频中的方法
            nextTick(() => {
                console.log(elTreeRef.value, 111)
                elTreeRef.value?.setCheckedKeys(leafKeys, false)
            })
        }

        const [pageModalRef, defaultInfo, handleNewClick, handleEditClick] =
            usePageModel(undefined, editCallback)
        const store = useStore()
        const roleEntireMenu = computed(() => store.state.entireMenu)

        const otherInfo = ref({})

        const handleCheckChange = (data1: any, data2: any) => {
            console.log(data1, 'data1')
            console.log(data2, 'data2')
            const checkdKeys = data2.checkedKeys
            const halfCheckedKeys = data2.halfCheckedKeys
            const menuList = [...checkdKeys, ...halfCheckedKeys]
            otherInfo.value = { menuList }
        }
        console.log(contentTableConfig, 'contentTableConfig')
        return {
            contentTableConfig,
            searchFormConfig,
            modalConfig,
            pageModalRef,
            defaultInfo,
            handleNewClick,
            handleEditClick,
            roleEntireMenu,
            otherInfo,
            handleCheckChange,
            // leafKeysList
            elTreeRef
        }
    }
})
</script>

<style scoped lang="less">
.menu-tree {
    margin-left: 30px;
}
</style>
