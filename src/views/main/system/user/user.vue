<template>
    <div class="user">
        <page-search :searchFormConfig="searchFormConfig" />
        <page-content :contentTableConfig="contentTableConfig"></page-content>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import pageSearch from '@/components/page-search/index'
import pageContent from '@/components/page-content/index'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
    name: 'user',
    components: {
        pageSearch,
        pageContent
    },
    setup() {
        return {
            searchFormConfig,
            contentTableConfig
        }
    }
})
</script>

<style scoped></style>
