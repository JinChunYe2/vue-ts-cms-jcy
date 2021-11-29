<template>
    <div class="dashboard"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
    name: 'dashboard',
    setup() {
        const store = useStore()
        // 请求数据
        store.dispatch('dashboard/getDashboardDataAction')
        return {}
    }
})
</script>

<style scoped></style>
