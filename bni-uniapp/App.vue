<template>
    <view id="app">
        <router-view />
    </view>
</template>

<script>
export default {
    onLaunch: function() {
        console.log('App Launch')
    },
    onShow: function() {
        console.log('App Show')
    },
    onHide: function() {
        console.log('App Hide')
    }
}
</script>

<style>
page {
    background-color: #0f1923;
    color: #e8edf2;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.container {
    padding: 20rpx;
}
</style>
