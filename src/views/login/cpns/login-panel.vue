<template>
    <div class="login-panel">
        <h1 class="title">后台管理系统</h1>
        <!-- S 选项卡or输入框 -->
        <el-tabs type="border-card" stretch v-model="currentTab">
            <el-tab-pane name="account">
                <template #label>
                    <span>
                        <i class="el-icon-user-solid"></i>
                        账号登陆
                    </span>
                </template>
                <login-account ref="accountRef" />
            </el-tab-pane>
            <el-tab-pane name="phone">
                <template #label>
                    <span>
                        <i class="el-icon-mobile-phone"></i>
                        手机登录
                    </span>
                </template>
                <login-phone ref="phoneRef" />
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
        // 定义属性
        // 布尔类型的习惯，一般用is来开头
        const isKeepPassword = ref(true)
        // 引用了一些组件，以Ref为结尾,ts获取组件的类型
        // InstanceType构造一个实例类型，typeof定义一个空间，把这个组件里的值得总览的类型给拿出来
        const accountRef = ref<InstanceType<typeof loginAccount>>()
        const phoneRef = ref<InstanceType<typeof loginPhone>>()
        // 取到tab选项
        const currentTab = ref('account')
        // 定义方法
        // 点击登录按钮
        const handleLoginClick = () => {
            if (currentTab.value == 'account') {
                // 运用可选链，value有值的时候调用，定义类型的好处就是严谨性，当那边不对应的时候会报错
                accountRef.value?.loginActive(isKeepPassword.value)
            } else {
                // console.log('手机号码登陆')
                phoneRef.value?.loginActives()
            }
        }
        return {
            isKeepPassword,
            accountRef,
            phoneRef,
            currentTab,
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
