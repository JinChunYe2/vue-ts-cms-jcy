<template>
    <div class="role">
        <page-search :searchFormConfig="searchFormConfig"></page-search>
        <page-content
            :contentTableConfig="contentTableConfig"
            pageName="role"
        ></page-content>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
    name: 'role',
    components: {
        pageSearch,
        pageContent
    },
    setup() {
        return { contentTableConfig, searchFormConfig }
    }
})
</script>

<style scoped></style>
