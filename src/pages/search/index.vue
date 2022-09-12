<template>
    <view class="input-wrapper">
        <input :maxlength="30" v-model="state.keywords" class="uni-input ^m-t-10px" confirm-type="search"
            placeholder="输入关键字查询" @confirm="search" />
    </view>
    <article-list class="article-list" :margin-top="110" :auto-request="false" :is-load-more="state.isLoadMore"
        :is-reload="state.isSearch" @loaded="onLoaded" :query-keywords="state.keywords">
    </article-list>
</template>

<script setup lang="ts">
import articleList from "@/components/article-list/article-list.vue";
import { reactive } from 'vue'
import { onReachBottom } from "@dcloudio/uni-app";

interface state {
    keywords: string
    isSearch: boolean
    isLoadMore: boolean
}
const state = reactive({
    keywords: '',
    isSearch: false,
    isLoadMore: false
})

onReachBottom(() => {
    if(state.keywords.trim().length > 0){
        state.isLoadMore = true
    }
})

const search = () => {
    uni.showLoading({
        title: '搜索中...',
    })
    state.isSearch = true
}

const onLoaded = () => {
    uni.hideLoading()
    state.isSearch = false
    state.isLoadMore = false
}
</script>

<style lang="scss">
@import "@/style/uni.scss";

.input-wrapper {
    width: 100%;
    position: fixed;
    top: 0;
    left: 50%;
    z-index: 9;
    padding-top: 20rpx;
    background: $uni-bg-color-grey;
    transform: translateX(-50%);

    input {
        width: 90%;
        margin: 0 auto;
    }
}

.uni-input {
    // width: calc(90% - 20rpx);
    padding: 10rpx 16rpx;
    background: #fff;
    border-radius: $uni-border-radius-base;
    box-shadow: 0 0 20px rgba(0, 0, 0, .1);
}
</style>