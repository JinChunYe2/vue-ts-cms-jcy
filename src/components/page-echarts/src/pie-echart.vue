<template>
    <div class="pie-echart">
        <base-echart :option="option"></base-echart>
    </div>
</template>

<script lang="ts" setup>
import BaseEchart from '@/base-ui/echart'
import { defineProps, computed } from 'vue'
import IDataType from '../types/index'

const props = defineProps<{
    pieData: IDataType[]
}>()

console.log(props.pieData)
const option = computed(() => {
    return {
        title: {
            text: 'Referer of a Website',
            subtext: 'Fake Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '分类数据',
                type: 'pie',
                radius: '50%',
                data: props.pieData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
})
</script>

<style lang="less" scoped></style>
