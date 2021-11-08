<template>
    <div class="page-search">
        <!-- 直接v-bind是把所有属性一起绑定过去 -->
        <hy-form v-bind="searchFormConfig" v-model="formData">
            <template #header>
                <h2>高级检索</h2>
            </template>
            <template #footer>
                <div class="handle-btns">
                    <el-button icon="el-icon-refresh" @click="handleRestClick">
                        重置
                    </el-button>
                    <el-button
                        type="primary"
                        icon="el-icon-search"
                        @click="handleQueryClick()"
                    >
                        搜索
                    </el-button>
                </div>
            </template>
        </hy-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'
export default defineComponent({
    components: { HyForm },
    props: {
        searchFormConfig: {
            type: Object,
            reuqired: true
        }
    },
    emits: ['resetBthClick', 'queryBthClick'],
    setup(props, { emit }) {
        // 第一个优化，双向绑定的属性应该有配置文件的field来决定
        // 1.优化一：formdata中的属性应该动态来改变
        const formItems = props.searchFormConfig?.formItems ?? []
        const formOriginData: any = []
        for (const item of formItems) {
            formOriginData[item.field] = ''
        }
        const formData = ref(formOriginData)
        // reactive进行双向绑定会有一些问题
        // const formData = ref({
        //     id: '',
        //     name: '',
        //     password: '',
        //     sport: '',‘
        //     createTime: ''
        // })
        // 优化二：重制按钮,当用户点击
        const handleRestClick = () => {
            for (const key in formOriginData) {
                formData.value[`${key}`] = formOriginData[key]
            }
            emit('resetBthClick')
        }

        // 优化三：当用户点击搜索
        const handleQueryClick = () => {
            console.log('点击了搜索')
            emit('queryBthClick', formData.value)
        }

        return { formData, handleRestClick, handleQueryClick }
    }
})
</script>

<style lang="less" scoped>
.handle-btns {
    padding: 20px;
    text-align: right;
}
</style>
