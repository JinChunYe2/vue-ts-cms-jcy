<template>
    <div class="dashboard">
        <!-- 1.顶部数据统计 -->
        <el-row :gutter="10">
            <template v-for="item in topPanelData" :key="item.title">
                <el-col :md="12" :lg="6" :xl="6">
                    <statistical-panel :panelData="item" />
                </el-col>
            </template>
        </el-row>

        <!-- 2.中间图表 -->
        <el-row :gutter="10">
            <el-col :span="7">
                <hy-card title="分类商品数量(饼图)">
                    <pie-echart :pieData="categoryGoodsCount"></pie-echart>
                </hy-card>
            </el-col>
            <el-col :span="10">
                <hy-card title="不同城市商品销量">
                    <map-echart :mapData="addressGoodsSale"></map-echart>
                </hy-card>
            </el-col>
            <el-col :span="7">
                <hy-card title="分类商品数量(玫瑰图)">
                    <rose-echart :roseData="categoryGoodsCount"></rose-echart>
                </hy-card>
            </el-col>
        </el-row>

        <!-- 3.底部图表 -->
        <el-row :gutter="10" class="content-row">
            <el-col :span="12">
                <hy-card title="分类商品的销量">
                    <line-echart v-bind="categoryGoodsSale"></line-echart>
                </hy-card>
            </el-col>
            <el-col :span="12">
                <hy-card title="分类商品的收藏">
                    <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
                </hy-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useStore } from '@/store'

import {
    PieEchart,
    roseEchart,
    lineEchart,
    barEchart,
    mapEchart
} from '@/components/page-echarts'

import HyCard from '@/base-ui/card/index'

import StatisticalPanel from '@/components/statistical-panel'

export default defineComponent({
    name: 'dashboard',
    components: {
        HyCard,
        StatisticalPanel,
        PieEchart,
        roseEchart,
        lineEchart,
        barEchart,
        mapEchart
    },
    setup() {
        // 1.发起数据统计的网络请求
        const store = useStore()
        store.dispatch('dashboard/getDashboardDataAction')

        // 2.获取顶部PanelData
        const topPanelData = computed(() => store.state.dashboard.topPanelDatas)

        // 3.获取图表的数据
        // 饼图
        const categoryGoodsCount = computed(() => {
            return store.state.dashboard.categoryGoodsCount.map((item: any) => {
                return { name: item.name, value: item.goodsCount }
            })
        })
        // 折线图
        const categoryGoodsSale = computed(() => {
            const xLabels: string[] = []
            const values: any[] = []
            const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
            for (const item of categoryGoodsSale) {
                xLabels.push(item.name)
                values.push(item.goodsCount)
            }
            return { xLabels, values }
        })
        // 柱形图数据
        const categoryGoodsFavor = computed(() => {
            const xLabels: string[] = []
            const values: any[] = []
            const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
            for (const item of categoryGoodsFavor) {
                xLabels.push(item.name)
                values.push(item.goodsFavor)
            }
            return { xLabels, values }
        })

        const addressGoodsSale = computed(() => {
            return store.state.dashboard.addressGoodsSale.map((item: any) => {
                return { name: item.address, value: item.count }
            })
        })
        return {
            topPanelData,
            categoryGoodsCount,
            categoryGoodsSale,
            categoryGoodsFavor,
            addressGoodsSale
        }
    }
})
</script>

<style scoped lang="less">
.dashboard {
    background-color: #f5f5f5;
    .row {
        margin-top: 20px;
    }
}
</style>
