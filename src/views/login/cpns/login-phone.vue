<template>
    <div class="login-phone">
        <el-form
            label-width="70px"
            :rules="rulesPhone"
            :model="phone"
            ref="formRefs"
        >
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
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { rulesPhone } from '../config/account-config'
export default defineComponent({
    components: {},
    setup() {
        const phone = reactive({
            number: '',
            code: ''
        })

        const formRefs = ref<InstanceType<typeof ElForm>>()

        const loginActives = () => {
            // console.log('手机')
            // 验证操作,会返回一个布尔，判断是否验证通过，element自带
            formRefs.value?.validate((valid) => {
                // 如果为true执行登录逻辑
                if (valid) {
                    // console.log('手机号成功登陆啦～')
                }
            })
        }

        return { phone, rulesPhone, formRefs, loginActives }
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
