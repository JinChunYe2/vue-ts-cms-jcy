<template>
    <div class="bar-echart">
        <base-echart :option="option"></base-echart>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'
import * as echarts from 'echarts'
import baseEchart from '@/base-ui/echart/index'

const props = withDefaults(
    defineProps<{
        title?: string
        xLabels: string[]
        values: any[]
    }>(),
    {
        title: '这是一个柱状图'
    }
)

const option = computed(() => {
    return {
        title: {
            text: '特性示例：渐变色 阴影 点击缩放',
            subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
        },
        xAxis: {
            data: props.xLabels,
            axisLabel: {
                inside: true,
                color: '#fff'
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#999'
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            {
                type: 'bar',
                showBackground: true,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ])
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#2378f7' },
                            { offset: 0.7, color: '#2378f7' },
                            { offset: 1, color: '#83bff6' }
                        ])
                    }
                },
                data: props.values
            }
        ]
    }
})
</script>

<style lang="less" scoped></style>
