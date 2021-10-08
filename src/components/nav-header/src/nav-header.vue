<template>
    <div class="nav-header">
        <i
            class="fold-menu"
            :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
            @click="handleFoldClick()"
        ></i>
        <div class="content">
            <div>
                <hy-bread-crumb :breadcrumb="breadcrumb"></hy-bread-crumb>
            </div>
            <div><user-info></user-info></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import HyBreadCrumb from '@/base-ui/breadcrumb/index'
import userInfo from './user-info.vue'

import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
    components: {
        HyBreadCrumb,
        userInfo
    },
    emits: ['foldChange'],
    setup(props, { emit }) {
        const isFold = ref(false)
        const handleFoldClick = () => {
            isFold.value = !isFold.value
            emit('foldChange', isFold.value)
        }

        // 面包屑的数据
        const store = useStore()
        const breadcrumb = computed(() => {
            const route = useRoute()
            const userMenu = store.state.login.userMenus
            const currentPath = route.path
            return pathMapBreadcrumbs(userMenu, currentPath)
        })

        return {
            isFold,
            handleFoldClick,
            breadcrumb
        }
    }
})
</script>

<style lang="less" scoped>
.nav-header {
    display: flex;
    width: 100%;
    .fold-menu {
        font-size: 30px;
        cursor: pointer;
    }
    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        padding: 0 15px;
    }
}
</style>
