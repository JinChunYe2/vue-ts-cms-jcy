<template>
    <div class="user">
        <page-search :searchFormConfig="searchFormConfig" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageSearch from '@/components/page-search/index'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
    name: 'user',
    components: {
        pageSearch
    },
    setup() {
        return { searchFormConfig }
    }
})
</script>

<style scoped></style>
