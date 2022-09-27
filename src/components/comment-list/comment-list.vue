<template>
    <view class="comment-wrapper">
        <view v-for="(item,index) in list" :key="index" class="comment-item ^m-t-20px ^flex">
            <view class="comment-item__author-pic ^m-r-10px">
                <view v-if="store.info.isTextThumbnail" class="^w100 ^h100 text-thumbnail"
                    :style="{background: `${item.userAgentInfo.background}`}">{{item.firstName}}</view>
                <image v-else class="^w100 ^h100" mode="widthFix" :src="item.userAgentInfo.author_avatar_urls" />
            </view>
            <uni-card :margin="0" :is-shadow="true" class="comment-item__container">
                <view class="^flex comment-item__header">
                    <view class="^m-r-5px comment-item__author">
                        {{item.author_name}}
                        <image v-if="item.userAgentInfo.vipStyle.admin" class="comment-item__vip ^m-r-3px"
                            mode="widthFix" src="../../static/image/default/icon-admin.png"></image>
                        <image class="comment-item__vip" mode="widthFix"
                            :src="`../../static/image/default/${item.userAgentInfo.vipStyle.level}.png`"></image>
                    </view>
                    <view class="comment-item__time">{{item.date}}</view>
                </view>

                <view class="comment-item__content ^m-t-10px">
                    <rich-text :nodes="item.content"></rich-text>
                </view>
            </uni-card>
        </view>
    </view>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useStore from '@/store/index'
import uniCard from "@/components/uni-card/uni-card.vue"
const store = useStore()
const list = ref()
const props = defineProps(['data'])

watch(()=>props.data, (val: any[]) => {
    list.value = [
        ...val.map(item => {
            item.firstName = item.author_name.substr(0, 1)
            item.date = item.date.replace('T', ' ')
            item.content = item.content.rendered
                .replace(/(src=['"])\/wp-content\/uploads/gi, (match: any, $1: any) => `${$1}${store.info.domain}/wp-content/uploads`)
            return item
        })
    ]
})

</script>

<style lang="scss">
    @import "@/style/uni.scss";
.comment-item__container {
  flex: 1;
//   padding: 20rpx;
//   box-shadow: $box-shadow;
  border-radius: $uni-border-radius-base;
  word-break: break-all;
}
.comment-item__header {
  justify-content: space-between;
}

.comment-item__author-pic {
  width: 90rpx;
  height: 90rpx;
  border-radius: $uni-border-radius-base;
  overflow: hidden;
}
.comment-item__vip {
  width: 34rpx;
}
.comment-item__time {
  color: $uni-text-color-grey;
  font-size: $uni-font-size-sm;
}
.text-thumbnail {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34rpx;
  color: #fff;
}

</style>