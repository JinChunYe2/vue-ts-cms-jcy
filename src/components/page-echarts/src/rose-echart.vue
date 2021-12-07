<template>
    <div class="rose-echart">
        <base-echart :option="roseOption"></base-echart>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import BaseEchart from '@/base-ui/echart/index'
import IDataType from '../types/index'

const props = defineProps<{
    roseData: IDataType[]
}>()
const roseOption = computed(() => {
    return {
        legend: {
            top: 'bottom'
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [20, 100],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: props.roseData
            }
        ]
    }
})
</script>

<style lang="less" scoped></style>
