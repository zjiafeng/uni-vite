<template>
    <uni-list>
        <uni-list-item :title="state.article.title.rendered" :note="state.article.date" :thumb="state.article.authorPic"
            thumb-size="lg">
            <template v-slot:body>
                <view class="slot-box">
                    <text class="slot-text">{{state.article.title.rendered}}</text>
                    <view class="slot-footer">
                        <text class="slot-date">{{state.article.date}}</text>
                        <view class="^flex">
                            <view class="m-r-10px">
                                <text class="x-icon-eye m-r-5px"></text>
                                <text>{{state.viewCount}}</text>
                            </view>
                            <view class="m-r-10px" @click="handlerLikes">
                                <text v-if="state.showLikeLoading" class="x-icon-loading m-r-5px"></text>
                                <text v-else
                                    :class="[state.liked ? 'x-icon-zan-h c-liked m-r-5px' : 'x-icon-zan m-r-5px']"></text>
                                <text>{{state.article.goodCount}}</text>
                            </view>
                            <view>
                                <text class="x-icon-comment m-r-5px"></text>
                                <text>{{state.article.commentCount}}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </template>
        </uni-list-item>
    </uni-list>
    <view class="content">
        <view>
            <rich-text :nodes="state.article.content"></rich-text>
        </view>
        <view class="operation">
            <view @click="handlerLikes">
                <text v-if="state.showLikeLoading" class="x-icon-loading m-r-5px"></text>
                <text v-else :class="[state.liked ? 'x-icon-zan-h c-liked m-r-5px' : 'x-icon-zan m-r-5px']"></text>
                <text>{{state.article.goodCount}}</text>
            </view>
        </view>

        <view class="comment-count" v-if="state.total>0">
            <text class="m-r-10px">评论</text>
            <text>{{state.total}}条</text>
        </view>
        <comment-list :data="state.commentList"></comment-list>

        <view v-if="state.loadingMore" class="load-more align-center m-t-20px">
            <text class="x-icon-loading v-middle"></text>
            <text class="v-middle"> Loading...</text>
        </view>
        <view v-if="state.noMore" class="align-center m-t-20px no-more">已经到底啦~</view>

    </view>
</template>

<script setup lang="ts">
import { onLoad, onReachBottom, onPullDownRefresh } from "@dcloudio/uni-app";
import { reactive, onMounted, watch } from 'vue'
import API from '@/api/index'

import uniList from "@/components/uni-list/uni-list.vue"
import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
import commentList from "@/components/comment-list/comment-list.vue"

interface state {
    article: any
    articleId: string,
    viewCount: number,

    currentPage: number,
    totalPage: number,
    total: number,
    commentList: any[],
    noMore: boolean,
    loadingMore: boolean,

    showLikeLoading: boolean,
    liked: boolean | number
}
const state = reactive({
    article: {
        title: { rendered: '' },
        goodCount: '',
        author: '',
        date: '',
        commentCount: '',
        authorPic: '',
        content: ''
    },
    articleId: '',
    viewCount: 0,

    currentPage: 1,
    totalPage: 0,
    total: 0,
    commentList: [],
    noMore: false,
    loadingMore: false,

    showLikeLoading: false,
    liked: 0
})

onLoad(async ({ id }) => {
    // 获取当前文章是否已经点赞
    uni.getStorage({
        key: `like_${id}`,
        success: function (res) {
            state.liked = +res.data
        },
        fail: function (res) {
            state.liked = 0
        }
    });
    uni.showShareMenu({ withShareTicket: true })
    // this.setData({
    //   articleId: id
    // })
    state.articleId = id || ''
    uni.showLoading({
        title: '加载中...'
    })
    await getDetail(id)
    await getCommentList(id)
    await updateViewCount(id)
    uni.hideLoading()
})

onReachBottom(async () => {
    state.currentPage++
    state.loadingMore = true
    await getCommentList(state.articleId)
    state.loadingMore = false
})

const getDetail = async (id: string | undefined) => {
    let res: any = await API.getArticleDetail(id)
    const content = res.data.content.rendered
        .replace(/<img/gi, '<img style="max-width:100%;height:auto;"')
        .replace(/<code/gi, '<code class="code"')
        .replace(/<pre/gi, '<pre style="overflow:scroll;margin: 10px 0;padding: 10px;background: #f8f8f8;border-radius: 5px;"')
        .replace(/<blockquote/gi, '<blockquote class="blockquote"')
        .replace(/<h2/gi, '<h2 class="content-title"')
        .replace(/<a/gi, '<a bindtap="test"')
    let article = {
        ...res.data,
        date: res.data.date.replace('T', ' '),
        author: res.data.articleInfor.author,
        authorPic: res.data.articleInfor.other.authorPic,
        commentCount: res.data.articleInfor.commentCount,
        goodCount: res.data.articleInfor.xmLike.very_good,
        content
    }
    state.article = article
}
const getCommentList = async (id: string | undefined) => {
    if (state.totalPage && state.currentPage > state.totalPage) {
        state.noMore = true
        return
    }
    let res: any = await API.getCommentList({
        post: id,
        page: state.currentPage
    })
    state.commentList = res.data
    state.total = res.header['X-WP-Total']
    state.totalPage = res.header['X-WP-TotalPages']
}
const updateViewCount = async (id: string | undefined) => {
    let res: any = await API.updateViewCount(id)
    state.viewCount = res.data
}

const handlerLikes = async () => {
    if (state.liked) return
    uni.vibrateShort({})
    state.showLikeLoading = true
    let res: any = await API.handlerLikes(state.articleId)
    state.showLikeLoading = false
    state.article = { ...state.article, goodCount: res.data.very_good }
    state.liked = 1
    uni.setStorage({
        key: `like_${state.articleId}`,
        data: 1,
    });
}
</script>

<style lang="scss">
@import "@/style/uni.scss";

.c-liked {
    color: #FF656C;
}

.title {
    padding: 40rpx 0;
    font-size: 36rpx;
    font-weight: bold;
}

.author-pic {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
}

.info {
    align-items: center;
    justify-content: space-between;

    [class^="x-icon"] {
        font-size: 32rpx;
    }
}

.content-wrapper {
    line-height: 1.8;
    word-break: break-all;
}

.operation {
    display: flex;
    justify-content: center;
    margin: 40rpx 0;

    [class^="x-icon"] {
        font-size: 60rpx;
    }
}

.code {
    padding: 2px 5px;
    background: #f7f7f9;
    border: 1px solid #e3edf3;
    border-radius: 3px;
    color: #d14;
}

.blockquote {
    margin: 20rpx 0;
    padding: 20rpx;
    background: #f8f8f8;
    border-radius: 5px;
}

.content-title {
    margin: 20px 0;
    padding-left: 10px;
    border-left: 5px solid $uni-border-color;
    background: #f0f2f7;
    font-size: $uni-font-size-base;
}

.comment-count {
    margin-top: 20rpx;
    padding-top: 20rpx;
    border-top: 1px solid $uni-border-color;
}

.content {
    background-color: #fff;
    padding: 30rpx;
}

.no-more {
    padding-bottom: 30rpx;
    color: $uni-text-color-grey;
}

.slot-box{
    width: 100%;
    .slot-text{
        font-size: $uni-font-size-base;
    }
    .slot-footer{
        width: 100%;
        margin-top: 10rpx;
        display: flex;
        justify-content: space-between;
        color: $uni-text-color-grey;
        font-size: $uni-font-size-sm;
    }
}
</style>