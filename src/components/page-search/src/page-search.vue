<template>
    <div class="page-search">
        <!-- 直接v-bind是把所有属性一起绑定过去 -->
        <hy-form v-bind="searchFormConfig" v-model="formData">
            <template #header>
                <h2>高级检索</h2>
            </template>
            <template #footer>
                <div class="handle-btns">
                    <el-button icon="el-icon-refresh">重置</el-button>
                    <el-button type="primary" icon="el-icon-search">
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
    setup() {
        // reactive进行双向绑定会有一些问题
        const formData = ref({
            id: '',
            name: '',
            password: '',
            sport: '',
            createTime: ''
        })
        return { formData }
    }
})
</script>

<style lang="less" scoped>
.handle-btns {
    padding: 20px;
    text-align: right;
}
</style>
