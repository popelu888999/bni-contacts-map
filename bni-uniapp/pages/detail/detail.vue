<template>
    <view class="container" v-if="contact">
        <!-- 头部信息 -->
        <view class="header">
            <view class="avatar">
                <text class="avatar-text">{{ contact.name.charAt(0) }}</text>
            </view>
            <text class="name">{{ contact.name }}</text>
            <text v-if="contact.industry" class="industry">{{ contact.industry }}</text>
        </view>

        <!-- 详情信息 -->
        <view class="detail-section">
            <view class="detail-item">
                <text class="detail-icon">🏢</text>
                <view class="detail-content">
                    <text class="detail-label">公司</text>
                    <text class="detail-value">{{ contact.company }}</text>
                </view>
            </view>

            <view class="detail-item" v-if="contact.phone" @click="callPhone">
                <text class="detail-icon">📞</text>
                <view class="detail-content">
                    <text class="detail-label">电话</text>
                    <text class="detail-value phone">{{ contact.phone }}</text>
                </view>
            </view>

            <view class="detail-item">
                <text class="detail-icon">📍</text>
                <view class="detail-content">
                    <text class="detail-label">地址</text>
                    <text class="detail-value">{{ contact.address }}</text>
                </view>
            </view>
        </view>

        <!-- 操作按钮 -->
        <view class="action-section">
            <button class="action-btn btn-call" v-if="contact.phone" @click="callPhone">
                <text>📞 拨打电话</text>
            </button>
            <button class="action-btn btn-nav" @click="openNavigation">
                <text>🧭 导航前往</text>
            </button>
        </view>

        <!-- 小地图 -->
        <view class="map-section">
            <map
                class="mini-map"
                :latitude="contact.latitude"
                :longitude="contact.longitude"
                :scale="15"
                :markers="[{
                    id: 1,
                    latitude: contact.latitude,
                    longitude: contact.longitude,
                    iconPath: '/static/marker.png',
                    width: 30,
                    height: 30
                }]"
                @click="openNavigation"
            />
        </view>
    </view>
</template>

<script>
import contacts from '@/common/contacts.js'

export default {
    data() {
        return {
            contact: null
        }
    },
    onLoad(options) {
        const id = parseInt(options.id)
        this.contact = contacts.find(c => c.id === id)
        if (this.contact) {
            uni.setNavigationBarTitle({
                title: this.contact.name
            })
        }
    },
    methods: {
        callPhone() {
            if (this.contact.phone) {
                uni.makePhoneCall({
                    phoneNumber: this.contact.phone
                })
            }
        },
        openNavigation() {
            uni.openLocation({
                latitude: this.contact.latitude,
                longitude: this.contact.longitude,
                name: this.contact.name,
                address: this.contact.address,
                scale: 15
            })
        }
    }
}
</script>

<style scoped>
.container {
    min-height: 100vh;
    background: #0f1923;
    padding-bottom: 40rpx;
}

.header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60rpx 40rpx;
    background: linear-gradient(180deg, #1a2736 0%, #0f1923 100%);
}

.avatar {
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
    background: linear-gradient(135deg, #4da8da, #2e86c1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24rpx;
}

.avatar-text {
    font-size: 56rpx;
    color: #fff;
    font-weight: 600;
}

.name {
    font-size: 40rpx;
    font-weight: 600;
    color: #e8edf2;
    margin-bottom: 12rpx;
}

.industry {
    font-size: 26rpx;
    color: #4da8da;
    background: rgba(77,168,218,0.15);
    padding: 8rpx 24rpx;
    border-radius: 30rpx;
}

.detail-section {
    margin: 30rpx 20rpx;
    background: #1a2736;
    border-radius: 24rpx;
    overflow: hidden;
}

.detail-item {
    display: flex;
    padding: 30rpx;
    border-bottom: 1px solid rgba(255,255,255,0.06);
}

.detail-item:last-child {
    border-bottom: none;
}

.detail-icon {
    font-size: 40rpx;
    margin-right: 24rpx;
}

.detail-content {
    flex: 1;
}

.detail-label {
    font-size: 24rpx;
    color: #6a8a9a;
    display: block;
    margin-bottom: 8rpx;
}

.detail-value {
    font-size: 30rpx;
    color: #e8edf2;
    display: block;
}

.detail-value.phone {
    color: #4da8da;
}

.action-section {
    display: flex;
    gap: 20rpx;
    padding: 0 20rpx;
    margin-bottom: 30rpx;
}

.action-btn {
    flex: 1;
    height: 88rpx;
    border-radius: 44rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30rpx;
    border: none;
}

.btn-call {
    background: linear-gradient(135deg, #27ae60, #2ecc71);
    color: #fff;
}

.btn-nav {
    background: linear-gradient(135deg, #2e86c1, #4da8da);
    color: #fff;
}

.map-section {
    margin: 0 20rpx;
    border-radius: 24rpx;
    overflow: hidden;
}

.mini-map {
    width: 100%;
    height: 400rpx;
}
</style>
