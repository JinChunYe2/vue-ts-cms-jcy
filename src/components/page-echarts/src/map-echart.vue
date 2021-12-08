<template>
    <div class="map-echart">
        <base-echart :option="option"></base-echart>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'
import BaseEchart from '@/base-ui/echart/index'

const props = withDefaults(
    defineProps<{
        title?: string
    }>(),
    { title: '绘制中国地图' }
)
const option = computed(() => {
    return {}
})
</script>

<style lang="less" scoped></style>
