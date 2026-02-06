<template>
    <view class="container">
        <!-- 搜索框 -->
        <view class="search-box">
            <input
                type="text"
                v-model="searchText"
                placeholder="搜索姓名、公司、行业..."
                @input="onSearch"
                class="search-input"
            />
        </view>

        <!-- 统计信息 -->
        <view class="stats-bar">
            <text class="stats-text">共 {{ filteredContacts.length }} 位成员</text>
        </view>

        <!-- 联系人列表 -->
        <scroll-view scroll-y class="contact-list">
            <view
                v-for="contact in filteredContacts"
                :key="contact.id"
                class="contact-card"
                @click="goToDetail(contact)"
            >
                <view class="contact-header">
                    <text class="contact-name">{{ contact.name }}</text>
                    <text v-if="contact.industry" class="contact-industry">{{ contact.industry }}</text>
                </view>
                <text class="contact-company">{{ contact.company }}</text>
                <text class="contact-address">{{ contact.address }}</text>
            </view>

            <view v-if="filteredContacts.length === 0" class="empty-state">
                <text class="empty-icon">🔍</text>
                <text class="empty-text">没有找到匹配的联系人</text>
            </view>
        </scroll-view>
    </view>
</template>

<script>
import contacts from '@/common/contacts.js'

export default {
    data() {
        return {
            contacts: contacts,
            searchText: '',
            filteredContacts: contacts
        }
    },
    methods: {
        onSearch() {
            const term = this.searchText.toLowerCase().trim()
            if (!term) {
                this.filteredContacts = this.contacts
                return
            }
            this.filteredContacts = this.contacts.filter(c => {
                return c.name.toLowerCase().includes(term) ||
                    c.company.toLowerCase().includes(term) ||
                    c.industry.toLowerCase().includes(term) ||
                    c.address.toLowerCase().includes(term)
            })
        },
        goToDetail(contact) {
            uni.navigateTo({
                url: `/pages/detail/detail?id=${contact.id}`
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
    background: #0f1923;
}

.search-box {
    padding: 20rpx;
    background: #141e2b;
}

.search-input {
    width: 100%;
    padding: 20rpx 30rpx;
    border-radius: 20rpx;
    border: 1px solid rgba(255,255,255,0.08);
    background: #1a2736;
    color: #e8edf2;
    font-size: 28rpx;
}

.stats-bar {
    padding: 16rpx 20rpx;
    background: #141e2b;
    border-bottom: 1px solid rgba(255,255,255,0.06);
}

.stats-text {
    color: #7eb8e0;
    font-size: 24rpx;
}

.contact-list {
    flex: 1;
    padding: 20rpx;
}

.contact-card {
    background: linear-gradient(135deg, #1a2736 0%, #1e3045 100%);
    border-radius: 20rpx;
    padding: 28rpx;
    margin-bottom: 20rpx;
    border: 1px solid rgba(255,255,255,0.06);
}

.contact-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12rpx;
}

.contact-name {
    font-size: 32rpx;
    font-weight: 600;
    color: #e8edf2;
}

.contact-industry {
    font-size: 22rpx;
    color: #4da8da;
    background: rgba(77,168,218,0.15);
    padding: 6rpx 16rpx;
    border-radius: 20rpx;
}

.contact-company {
    font-size: 26rpx;
    color: #a0b4c4;
    margin-bottom: 8rpx;
    display: block;
}

.contact-address {
    font-size: 24rpx;
    color: #6a8a9a;
    display: block;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100rpx 0;
}

.empty-icon {
    font-size: 80rpx;
    margin-bottom: 20rpx;
}

.empty-text {
    color: #6a8a9a;
    font-size: 28rpx;
}
</style>
