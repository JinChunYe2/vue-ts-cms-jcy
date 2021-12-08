<template>
    <div class="line-echart">
        <base-echart :option="option"></base-echart>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'
import baseEchart from '@/base-ui/echart/index'
import * as echarts from 'echarts'

const props = withDefaults(
    defineProps<{
        title: string
        xLabels: string[]
        values: any[]
    }>(),
    {
        title: '折线图数据'
    }
)

const option = computed(() => {
    return {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        title: {
            text: props.title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {},
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: props.xLabels
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '分别销量',
                type: 'line',
                stack: '总量',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(128, 255, 165)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(1, 191, 236)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: props.values
            }
        ]
    }
})
</script>

<style lang="less" scoped></style>
