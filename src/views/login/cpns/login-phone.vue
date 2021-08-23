<template>
    <div class="login-phone">
        <el-form label-width="70px" :rules="rulesPhone" :model="phone">
            <el-form-item label="手机号" prop="number">
                <el-input v-model="phone.number"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <div class="login-code">
                    <el-input v-model="phone.code"></el-input>
                    <el-button type="primary" class="set-btn">
                        获取验证码
                    </el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rulesPhone } from '../config/account-config'
export default defineComponent({
    components: {},
    setup() {
        const phone = reactive({
            number: '',
            code: ''
        })
        return { phone, rulesPhone }
    }
})
</script>

<style lang="less" scoped>
.login-phone {
    .login-code {
        display: flex;
    }
    .set-btn {
        margin-left: 8px;
    }
}
</style>
