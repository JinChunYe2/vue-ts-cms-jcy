<template>
    <div class="user-info">
        <el-dropdown>
            <span class="el-dropdown-link">
                <el-avatar
                    class="user-img"
                    size="small"
                    src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                ></el-avatar>
                <span>{{ userName }}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item
                        icon="el-icon-switch-button"
                        @click="outLogin()"
                    >
                        退出登陆
                    </el-dropdown-item>
                    <el-dropdown-item divided>用户信息</el-dropdown-item>
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>我的权限</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import LocalCache from '@/utils/cache'
export default defineComponent({
    components: {},
    setup() {
        const stort = useStore()
        const userName = computed(() => stort.state.login.userInfo.name)
        const router = useRouter()
        const outLogin = () => {
            LocalCache.deleteCache('token')
            router.push('/main')
            // location.reload()
        }
        return { userName, outLogin }
    }
})
</script>

<style lang="less" scoped>
.el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
    .user-img {
        margin-right: 10px;
    }
}
</style>
