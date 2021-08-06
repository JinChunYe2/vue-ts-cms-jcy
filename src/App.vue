<template>
    <div>
        <h2>{{ $store.state.name }}</h2>
        <router-link to="/">登陆</router-link>
        <router-link to="main">首页</router-link>
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'App',
    components: {}
})
</script>

<style lang="less"></style>
