<template>
    <div class="login-account">
        <el-form
            label-width="60px"
            :rules="rulesAccount"
            :model="account"
            ref="formRef"
        >
            <el-form-item label="账号" prop="name">
                <el-input
                    placeholder="游客账号：coderwhy"
                    v-model="account.name"
                ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                    placeholder="游客密码：123456"
                    v-model="account.password"
                    show-password
                ></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'

import { rulesAccount } from '../config/account-config'
import localCache from '@/utils/cache'

import { useStore } from 'vuex'

export default defineComponent({
    components: {},
    setup() {
        const store = useStore()

        const account = reactive({
            name: localCache.getCache('name') ?? '',
            password: localCache.getCache('password') ?? ''
        })

        const formRef = ref<InstanceType<typeof ElForm>>()

        const loginActive = (isKeepPassword: boolean) => {
            // 验证操作,会返回一个布尔，判断是否验证通过，element自带
            formRef.value?.validate((valid) => {
                // 如果为true执行登录逻辑
                if (valid) {
                    // 判断时候需要记住密码
                    if (isKeepPassword) {
                        // 本地缓存
                        localCache.setCache('name', account.name)
                        localCache.setCache('password', account.password)
                    } else {
                        localCache.deleteCache('name')
                        localCache.deleteCache('password')
                    }
                    // console.log('账号密码正式登陆啦～')

                    // 开启登录验证
                    store.dispatch('login/accountLoginAction', { ...account })
                }
            })
        }
        return {
            account,
            rulesAccount,
            loginActive,
            formRef
        }
    }
})
</script>

<style lang="less" scoped></style>
