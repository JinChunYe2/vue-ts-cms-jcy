<template>
    <div class="login">
        <login-panel />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import loginPanel from './cpns/login-panel.vue'

export default defineComponent({
    components: {
        loginPanel
    },
    setup() {
        return {}
    }
})
</script>

<style lang="less" scoped>
.login {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: url(../../assets/image/login-bg.svg);
}
</style>
