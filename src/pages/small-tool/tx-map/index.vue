<template>
    <p>当前城市：{{ address.city }} - {{ address.district }}</p>
    <p>码值：{{ address.adcode }}</p>
    <p>经纬度：{{ address.location }}</p>
</template>

<script setup lang="ts">
import { jsonp } from 'vue-jsonp'
import md5 from 'js-md5'
import { onMounted, reactive } from 'vue';

interface address {
    adcode: string
    city: string
    district: string
    location: string
}

const address = reactive<address>({
    adcode: '',
    city: '',
    district: '',
    location: ''
})
onMounted(() => {
    // 获取当前城市信息
    let sig = md5(
        '/ws/location/v1/ip?callback=jsonpCallback&key=VVYBZ-FA3KX-QBS45-75XHQ-5APM6-T2FEX&output=jsonpxKXuapKtTvXqPq5QMXCymrQP9DD04T78'
    )
    sig = encodeURI(sig) //url化一下
    jsonp('https://apis.map.qq.com/ws/location/v1/ip', {
        callbackQuery: 'callback', // 设置callback参数的key  不设置的话callback参数会自动被赋予一个随机值  md5校验无法通过
        callbackName: 'jsonpCallback', // 设置callback 参数的值
        key: 'VVYBZ-FA3KX-QBS45-75XHQ-5APM6-T2FEX',
        output: 'jsonp',
        sig: sig
    })
        .then(res => {
            console.log(res)
            try {
                const { city, adcode, district } = res.result.ad_info
                address.adcode = adcode.toString()
                address.city = city
                address.district = district
                address.location = JSON.stringify(res.result.location)
            } catch (e) {
                //TODO handle the exception
            }
        })
})
</script>