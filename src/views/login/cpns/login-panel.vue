<template>
    <div class="login-panel">
        <h1 class="title">后台管理系统</h1>
        <!-- S 选项卡or输入框 -->
        <el-tabs type="border-card" stretch>
            <el-tab-pane>
                <template #label>
                    <span>
                        <i class="el-icon-user-solid"></i>
                        账号登陆
                    </span>
                </template>
                <login-account />
            </el-tab-pane>
            <el-tab-pane>
                <template #label>
                    <span>
                        <i class="el-icon-mobile-phone"></i>
                        手机登录
                    </span>
                </template>
                <login-phone />
            </el-tab-pane>
        </el-tabs>
        <!-- E 选项卡or输入框 -->
        <div class="account-control">
            <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
            <el-link type="primary">忘记密码</el-link>
        </div>
        <el-button
            type="primary"
            class="login-button"
            @click="handleLoginClick()"
        >
            立即登录
        </el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'

export default defineComponent({
    components: {
        loginAccount,
        loginPhone
    },
    setup() {
        // 布尔类型的习惯，一般用is来开头
        const isKeepPassword = ref(true)
        // 点击登录按钮
        const handleLoginClick = () => {
            console.log('立即登陆')
        }
        return {
            isKeepPassword,
            handleLoginClick
        }
    }
})
</script>

<style lang="less" scoped>
.login-panel {
    width: 320px;
    margin-top: -150px;
    .title {
        text-align: center;
    }
    .account-control {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }
    .login-button {
        width: 100%;
        margin-top: 10px;
    }
}
</style>
