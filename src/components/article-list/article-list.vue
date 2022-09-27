<template>
    <view :style="{'margin-top': `${marginTop}rpx`}">
        <uni-card :is-shadow="true" v-for="item in state.articleList" :key="item.id">
            <view>
                <image v-if="item.articleInfor.thumbnail" @click="handleLink(item.id)" mode="scaleToFill" :src="item.articleInfor.thumbnail"></image>
                <view class="content" @click="handleLink(item.id)">
                    <uni-title type="h3" :title="item.title.rendered"></uni-title>
                    <text class="summary-text">{{item.articleInfor.summary}}</text>
                </view>
                <view slot="actions" class="card-actions">
                    <view class="article-item__category ^m-r-5px">
                        <uniTag class="^m-r-10px" v-if="Array.isArray(item.articleInfor.classify)"
                            v-for="(tag, index) in item.articleInfor.classify.slice(0, 2)" :key="index"
                            :text="tag.name" type="success">
                        </uniTag>
                    </view>
                    <view class="article-item__info ^flex">
                        <view class="^m-r-10px">
                            <text class="^x-icon-eye ^m-r-5px"></text>
                            <text>{{item.articleInfor.viewCount}}</text>
                        </view>
                        <view class="^m-r-10px">
                            <text class="^x-icon-zan ^m-r-5px"></text>
                            <text>{{item.articleInfor.xmLike.very_good}}</text>
                        </view>
                        <view>
                            <text class="^x-icon-comment ^m-r-5px"></text>
                            <text>{{item.articleInfor.commentCount}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </uni-card>
        <view v-if="state.loadingMore" class="load-more ^align-center no-more">
            <text class="x-icon-loading v-middle"></text>
            <text class="v-middle"> Loading...</text>
        </view>
        <view v-if="state.noMore" class="^align-center no-more">已经到底啦~</view>
    </view>
</template>

<script lang="ts" setup>
import uniCard from "@/components/uni-card/uni-card.vue"
import uniTitle from "@/components/uni-title/uni-title.vue"
import uniTag from "@/components/uni-tag/uni-tag.vue"
import { reactive, onMounted, watch } from 'vue'
import API from '@/api/index'

const emits = defineEmits(['loaded'])
const props = defineProps({
    marginTop: {
        type: Number,
        default: 0,
    },
    autoRequest: {
        type: Boolean,
        default: true
    },
    isLoadMore: {
        type: Boolean,
        default: false
    },
    isReload: {
        type: Boolean,
        default: false
    },
    queryKeywords: {
        type: String,
        default: ''
    }
})

const initState = () => {
    return {
        articleList: [],
        currentPage: 1,
        totalPage: null,
        noMore: false,
        loadingMore: false
    }
}
interface state {
    articleList: any[]
    currentPage: number
    totalPage: any
    noMore: boolean
    loadingMore: boolean
}
const state = reactive<state>(initState())

watch([() => props.isLoadMore, () => props.isReload], (value) => {
    if (value[0]) {
        state.loadingMore = true
        getArticleList(true)
    }
    if (value[1]) {
        Object.assign(state, initState())
        getArticleList()
    }
})
const handleLink = (id: Number|String) => {
    uni.navigateTo({url: '/pages/detail/index?id='+id});
}
// 获取文章列表
const getArticleList = (isLoadMore = false) => {
    if (isLoadMore) {
        state.currentPage++
    }

    // 是否为最后一页
    
    if (state.totalPage && state.currentPage > state.totalPage) {
        state.loadingMore = false
        state.noMore = true
        return
    }

    API.getArticleList({ page: state.currentPage, search: props.queryKeywords }).then((res: any) => {
        uni.hideLoading()
        
        let { data, header } = res
        state.loadingMore = false
        state.articleList = [...state.articleList, ...data]
        console.log(state.articleList);
        
        state.totalPage = header['X-WP-TotalPages']
        emits('loaded')
    })
}
onMounted(() => {
    props.autoRequest && getArticleList()
})
</script>

<style lang="scss">
@import "@/style/uni.scss";

image{
    width: 100%;
    height: 320rpx;
}
.summary-text {
    @include ellipsisMultiline(3);
}

.card-actions {
    border-top: 1px solid $uni-border-color;
    display: flex;
    justify-content: space-between;
    margin-top: 10rpx;
    padding-top: 10rpx;
}

.no-more{
    padding-bottom: 30rpx;
    color: $uni-text-color-grey;
}
</style>