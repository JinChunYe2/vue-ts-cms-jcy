<template>
    <div class="base-echart">
        <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
    </div>
</template>

<script lang="ts" setup>
// 使用setup最新版
import { ref, onMounted, withDefaults, defineProps, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'

// 定义prpos
const props = withDefaults(
    defineProps<{
        option: EChartsOption
        width?: string
        height?: string
    }>(),
    {
        width: '100%',
        height: '360px'
    }
)

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
    const { setOption } = useEchart(echartDivRef.value!)
    watchEffect(() => {
        setOption(props.option)
    })
    // const echartInstance = echarts.init(echartDivRef.value!)
    // echartInstance.setOption(props.option)
})
</script>

<style lang="less" scoped></style>
