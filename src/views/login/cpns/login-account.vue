<template>
    <div class="login-account">
        <el-form label-width="60px" :rules="rulesAccount" :model="account">
            <el-form-item label="账号" prop="name">
                <el-input v-model="account.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="account.password"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

import { rulesAccount } from '../config/account-config'
export default defineComponent({
    components: {},
    setup() {
        const account = reactive({
            name: '',
            password: ''
        })

        const num = ref('ui')
        return {
            account,
            num,
            rulesAccount
        }
    }
})
</script>

<style lang="less" scoped></style>
