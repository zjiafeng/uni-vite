<template>
	<view class="uni-margin-wrap">
		<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
			<swiper-item v-for="(item, index) in state.banner" :key="index">
				<image class="swiper-image" :src="item.path" mode="scaleToFill" @click="handleLink(item.link)"></image>
			</swiper-item>
		</swiper>
	</view>
	<uni-card :is-shadow="true">
		<view class="notice-header"><text class="x-icon-notice"></text> 公告</view>
		<view class="notice-content">
			<rich-text :nodes="state.notice"></rich-text>
		</view>
	</uni-card>
	<article-list :is-load-more="state.isLoadMore" :is-reload="state.isReloadList" @loaded="updateLoadMoreState">
	</article-list>
</template>

<script setup lang="ts">
import uniCard from "@/components/uni-card/uni-card.vue"
import articleList from "@/components/article-list/article-list.vue";
import API from '@/api/index'
import { onLoad, onReachBottom, onPullDownRefresh } from "@dcloudio/uni-app";
import { reactive } from 'vue'
import useStore from '@/store/index'
const store = useStore()

interface state {
	banner: any[]
	notice: string
	isLoadMore: boolean
	isReloadList: boolean
}
const state = reactive<state>({
	banner: [],
	notice: '',
	isLoadMore: false,
	isReloadList: false
})
onLoad(() => {
	uni.showLoading({
		title: '加载中...',
		mask: false
	})
	getGlobalInfo()
});

// 获取基本信息
const getGlobalInfo = () => {
	API.getGlobalData().then((res: any) => {
		store.setInfo(res.data)
		state.banner = res.data.banner.list
		state.notice = res.data.notice
	})
}

const handleLink = (url: string) => {
	const id = url.split('/')[url.split('/').length - 1]
	typeof parseInt(id) === 'number' && uni.navigateTo({url: '/pages/detail/index?id='+parseInt(id)});
}

onReachBottom(() => {
	state.isLoadMore = true
})

onPullDownRefresh(() => {
	state.isReloadList = true
})

const updateLoadMoreState = () => {
	state.isLoadMore = false
	state.isReloadList = false
	uni.stopPullDownRefresh();
}
</script>

<style lang="scss">
@import "@/style/uni.scss";

.uni-margin-wrap {
	width: calc(100% - 30px);
	margin: 4px auto;
}

.notice-header {
	margin-bottom: 10rpx;
	padding-bottom: 10rpx;
	border-bottom: 1px solid $uni-border-color;
}

.uni-card {
	margin-top: 20rpx !important;
}

.swiper-image {
	border-radius: $uni-border-radius-lg;
	width: 100%;
	height: 100%;
}
</style>
