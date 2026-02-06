<template>
    <view class="container">
        <!-- 搜索框 -->
        <view class="search-box">
            <input
                type="text"
                v-model="searchText"
                placeholder="搜索成员..."
                @input="onSearch"
                class="search-input"
            />
        </view>

        <!-- 地图 -->
        <map
            id="map"
            class="map"
            :latitude="centerLat"
            :longitude="centerLng"
            :scale="scale"
            :markers="markers"
            :show-location="true"
            @markertap="onMarkerTap"
        />

        <!-- 成员数量 -->
        <view class="stats-bar">
            <text class="stats-text">显示 {{ markers.length }} 位成员</text>
        </view>

        <!-- 定位按钮 -->
        <view class="locate-btn" @click="locateUser">
            <text>📍</text>
        </view>
    </view>
</template>

<script>
import contacts from '@/common/contacts.js'

export default {
    data() {
        return {
            contacts: contacts,
            searchText: '',
            centerLat: 22.72,
            centerLng: 114.13,
            scale: 11,
            markers: []
        }
    },
    onLoad() {
        this.initMarkers()
    },
    methods: {
        initMarkers() {
            this.markers = this.contacts.map((c, index) => ({
                id: c.id,
                latitude: c.latitude,
                longitude: c.longitude,
                title: c.name,
                iconPath: '/static/marker.png',
                width: 30,
                height: 30,
                callout: {
                    content: c.name,
                    color: '#e8edf2',
                    fontSize: 12,
                    borderRadius: 8,
                    bgColor: '#1a2736',
                    padding: 8,
                    display: 'BYCLICK'
                }
            }))
        },
        onSearch() {
            const term = this.searchText.toLowerCase().trim()
            if (!term) {
                this.initMarkers()
                return
            }
            const filtered = this.contacts.filter(c => {
                return c.name.toLowerCase().includes(term) ||
                    c.company.toLowerCase().includes(term) ||
                    c.industry.toLowerCase().includes(term)
            })
            this.markers = filtered.map(c => ({
                id: c.id,
                latitude: c.latitude,
                longitude: c.longitude,
                title: c.name,
                iconPath: '/static/marker.png',
                width: 30,
                height: 30,
                callout: {
                    content: c.name,
                    color: '#e8edf2',
                    fontSize: 12,
                    borderRadius: 8,
                    bgColor: '#1a2736',
                    padding: 8,
                    display: 'ALWAYS'
                }
            }))
            if (filtered.length > 0) {
                this.centerLat = filtered[0].latitude
                this.centerLng = filtered[0].longitude
                this.scale = 14
            }
        },
        onMarkerTap(e) {
            const markerId = e.markerId
            uni.navigateTo({
                url: `/pages/detail/detail?id=${markerId}`
            })
        },
        locateUser() {
            uni.getLocation({
                type: 'gcj02',
                success: (res) => {
                    this.centerLat = res.latitude
                    this.centerLng = res.longitude
                    this.scale = 14
                },
                fail: () => {
                    uni.showToast({
                        title: '无法获取位置',
                        icon: 'none'
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: relative;
}

.search-box {
    position: absolute;
    top: 20rpx;
    left: 20rpx;
    right: 20rpx;
    z-index: 100;
}

.search-input {
    width: 100%;
    padding: 20rpx 30rpx;
    border-radius: 20rpx;
    background: rgba(26, 39, 54, 0.95);
    color: #e8edf2;
    font-size: 28rpx;
    box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.3);
}

.map {
    width: 100%;
    height: 100%;
}

.stats-bar {
    position: absolute;
    bottom: 120rpx;
    left: 20rpx;
    background: rgba(26, 39, 54, 0.9);
    padding: 16rpx 24rpx;
    border-radius: 20rpx;
}

.stats-text {
    color: #7eb8e0;
    font-size: 24rpx;
}

.locate-btn {
    position: absolute;
    bottom: 120rpx;
    right: 20rpx;
    width: 80rpx;
    height: 80rpx;
    background: rgba(26, 39, 54, 0.95);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.3);
}

.locate-btn text {
    font-size: 36rpx;
}
</style>
