<template>
    <div class="app">
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// defineComponent 函数可以帮我们做类型推导，使我们的代码更加的严谨
export default defineComponent({
    name: 'App',
    components: {}
})
</script>

<style lang="less">
.app {
    height: 100%;
}
</style>
