<template>
    <view class="wrapper">
        <view class="align-center">
            <!-- <view class="app-name f-s-bold">{{store.info.blogName}}</view> -->
            <uni-title type="h2" align="center" :title="store.info.blogName"></uni-title>
            <!-- <uni-title type="h4" align="center" :title="`Version ${appVersion}`"></uni-title> -->
            <view class="version c-sub-text">Version {{appVersion}}</view>
        </view>

        <view class="count-container m-t-20px">
            <view class="count-item">
                <view class="count-item__number c-article">{{store.info.getAllCountArticle}}</view>
                <view class="align-center">
                    <image src="../../static/image/icon-article.png" mode="widthFix"></image>
                    <text class="v-middle">文章</text>
                </view>
            </view>

            <view class="count-item">
                <view class="count-item__number c-archive">{{store.info.getAllCountCat}}</view>
                <view class="align-center">
                    <image src="../../static/image/icon-archive.png" mode="widthFix"></image>
                    <text class="v-middle">分类</text>
                </view>
            </view>

            <view class="count-item">
                <view class="count-item__number c-tag">{{store.info.getAllCountTag}}</view>
                <view class="align-center">
                    <image src="../../static/image/icon-tag.png" mode="widthFix"></image>
                    <text class="v-middle">标签</text>
                </view>
            </view>

            <view class="count-item">
                <view class="count-item__number c-comment">{{store.info.getAllCountComment}}</view>
                <view class="align-center">
                    <image src="../../static/image/icon-comment.png" mode="widthFix"></image>
                    <text class="v-middle">评论</text>
                </view>
            </view>
        </view>

        <uni-card class="contact-container">
            <view class="title-tips">联系方式</view>
            <view class="contact">
                <view class="contact-item m-t-15px">
                    <image src="../../static/image/icon-link.png" mode="widthFix" class="m-r-5px"></image>
                    <text @click="copyText(store.info.domain)">{{store.info.domain}}</text>
                </view>

                <view class="contact-item m-t-15px">
                    <image src="../../static/image/icon-github.png" mode="widthFix" class="m-r-5px"></image>
                    <text @click="copyText('https://github.com/zjiafeng')">https://github.com/zjiafeng</text>
                </view>

                <view class="contact-item m-t-15px">
                    <image src="../../static/image/icon-qq.png" mode="widthFix" class="m-r-5px"></image>
                    <text @click="copyText('2621275142')">2621275142</text>
                </view>

                <view class="contact-item m-t-15px">
                    <image src="../../static/image/icon-email.png" mode="widthFix" class="m-r-5px"></image>
                    <text @click="copyText('jiafeng_0912@qq.com')">jiafeng_0912@qq.com</text>
                </view>
            </view>
        </uni-card>
    </view>

</template>

<script setup lang="ts">
import useStore from '@/store/index'
import uniTitle from "@/components/uni-title/uni-title.vue"
import uniCard from "@/components/uni-card/uni-card.vue"
const store = useStore()
const accountInfo = uni.getAccountInfoSync();

const appVersion = accountInfo?.miniProgram?.version || '1.0.0'
const copyText = (text: string) => {
    uni.setClipboardData({
        data: text
    })
}

</script>

<style lang="scss">
@import "@/style/uni.scss";

.logo {
    margin-top: 50rpx;
    width: 280rpx;
}

.version {
    font-size: $uni-font-size-base;
}

.count-container {
    display: flex;
    justify-content: space-between;

    .count-item {
        width: 25%;
        padding: 0 20rpx;
        box-sizing: border-box;

        &:not(:last-of-type) {
            border-right: 1px solid $uni-border-color;
        }
    }

    .count-item__number {
        font-size: 36rpx;
        font-weight: bold;
        text-align: center;

        &.c-article {
            color: #E85056;
        }

        &.c-archive {
            color: #2D73C0;
        }

        &.c-comment {
            color: #664119;
        }

        &.c-tag {
            color: #DE5EBC;
        }

        &.c-link {
            color: #F09D3E;
        }
    }

    image {
        width: 30rpx;
        margin-right: 10rpx;
        vertical-align: middle;
    }
}

.contact-container {

    .title-tips {
        font-size: $uni-font-size-base;
        color: $uni-color-primary;
    }

    .contact {
        image {
            width: 40rpx;
            vertical-align: bottom;
        }
    }
}
</style>