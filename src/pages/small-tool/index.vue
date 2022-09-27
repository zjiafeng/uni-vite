<template>
    <uni-card :is-shadow="true" v-for="item in toolList" :key="item.link" :title="item.title" :sub-title="item.subTitle"
        extra="点击体验" :thumbnail="item.image" @click="handleLink(item.link)">
    </uni-card>
</template>

<script setup lang="ts">
import uniCard from "@/components/uni-card/uni-card.vue"
import { ref } from 'vue'

const toolList = ref([
    {
        title: '国庆头像生成',
        subTitle: '迎国庆 换新颜',
        image: '/static/image/national-day/share.jpg',
        link: '/pages/small-tool/national-day/index'
    }
])
const handleLink = (url: string) => {
    uni.navigateTo({ url });
}
</script>