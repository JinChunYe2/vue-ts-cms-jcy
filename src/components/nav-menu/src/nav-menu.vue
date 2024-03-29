<template>
    <div class="nav-menu">
        <div class="logo">
            <img class="img" src="~@/assets/image/logo.svg" alt="logo" />
            <span v-if="!isCollapse" class="title">Shopping-CMS</span>
        </div>
        <el-menu
            :default-active="defaultValue"
            :collapse="isCollapse"
            class="el-menu-vertical"
            background-color="#0c2135"
            text-color="#b7bdc3"
            active-text-color="#0a60bd"
        >
            <!-- 二级菜单 -->
            <template v-for="item in userMenus" :key="item.id">
                <!-- 二级菜单可展开的标题 -->
                <template v-if="item.type === 1">
                    <el-submenu :index="item.id + ''">
                        <template #title>
                            <i v-if="item.icon" :class="item.icon"></i>
                            <span>{{ item.name }}</span>
                        </template>
                        <!-- 二级菜单展开的内容 -->
                        <template
                            v-for="subitem in item.children"
                            :key="subitem.id"
                        >
                            <el-menu-item
                                :index="subitem.id + ''"
                                @click="handleMenuItemClick(subitem)"
                            >
                                <i
                                    v-if="subitem.icon"
                                    :class="subitem.icon"
                                ></i>
                                <span>{{ subitem.name }}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <!-- 只有一级菜单的情况下 -->
                <template v-else-if="item.type === 2">
                    <el-menu-item :index="item.id + ''">
                        <i v-if="item.icon" :class="item.icon"></i>
                        <span>{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
// 获取useStore类型的思路 => 1.store里创建方法，方法里面写入在types.ts里创建的联合类型（包含login的）
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'

import { pathMapToMenu } from '@/utils/map-menus'
export default defineComponent({
    components: {},
    props: {
        isCollapse: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        // store
        const store = useStore()
        const userMenus = computed(() => store.state.login.userMenus)

        // router
        const router = useRouter()
        const route = useRoute()
        const currentPath = route.path

        // data
        const menu = pathMapToMenu(userMenus.value, currentPath)
        const defaultValue = ref(menu.id + '')

        const handleMenuItemClick = (item: any) => {
            console.log('--------', item)
            router.push({
                path: item.url ?? '/not-found'
            })
        }
        return {
            defaultValue,
            userMenus,
            handleMenuItemClick
        }
    }
})
</script>

<style lang="less" scoped>
.nav-menu {
    height: 100%;
    background-color: #001529;

    .logo {
        display: flex;
        height: 28px;
        padding: 12px 10px 8px 10px;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        .img {
            height: 100%;
            margin: 0 10px;
        }

        .title {
            font-size: 16px;
            font-weight: 700;
            color: white;
            line-height: 100%;
            display: block;
        }
    }

    .el-menu {
        border-right: none;
    }

    // 目录
    .el-submenu {
        background-color: #001529 !important;
        // 二级菜单 ( 默认背景 )
        .el-menu-item {
            padding-left: 50px !important;
            background-color: #0c2135 !important;
        }
    }

    ::v-deep .el-submenu__title {
        background-color: #001529 !important;
    }

    // hover 高亮
    .el-menu-item:hover {
        color: #fff !important; // 菜单
    }

    .el-menu-item.is-active {
        color: #fff !important;
        background-color: #0a60bd !important;
    }
}

.el-menu-vertical:not(.el-menu--collapse) {
    width: 100%;
    height: calc(100% - 48px);
}
</style>
