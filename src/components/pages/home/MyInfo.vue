<template>
    <el-container>
        <el-main class="el-main-css">
            <div class="user">
                <div class="user-header">
                    <img src="/images/userheader.png" style="width: 100%;">
                </div>
                <div class="user-info" v-for="user in userInfoStore">
                    <div class="username">{{ user.username }}</div>
                    <div class="user-content">小红书号:{{ user.usercontent }}</div>
                    <div class="user-desc">{{ user.userdesc }}</div>
                    <div class="user-interactions rl-center">
                        <div class="user-inter-item rl-center" v-for="info in user.userinteractions">
                            <div class="user-count">{{ info.count }}</div>
                            <div class="user-show">{{ info.show }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="note rl-center">
                <div class="user-nav">
                    <div v-for="(item, index) in userInfoNav" :key="item.no" class="user-nav-item"
                        @click="ChangeuserInfoNav(index + 1)" :class="{ 'isSelect': userInfoSel === index + 1 }">
                        {{ item.name }}</div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script setup>
import { computed, ref } from 'vue'

//导航点中时变背景色
const userInfoSel = ref(1)
const ChangeuserInfoNav = (index) => {
    userInfoSel.value = index
    console.log(index);
}
const userInfoNav = [
    {
        no: 1,
        name: '笔记'
    },
    {
        no: 2,
        name: '收藏'
    },
    {
        no: 3,
        name: '点赞'
    }
]

const userInfoStore = [{
    username: "小红薯664D6ED4",
    usercontent: "144141415",
    userdesc: "还没有简介",
    userinteractions: [{
        show: "关注",
        count: 0
    }, {
        show: "粉丝",
        count: 0
    }, {
        show: "获赞与收藏",
        count: 0
    }]
}]
console.log(userInfoStore);
</script>

<style scoped>
/*usermain*/
.user-nav {
    display: flex;
    margin: 6px 0;
}

.user-nav-item {
    min-width: 64px;
    height: 40px;
    text-align: center;
    /* background-color: #7f7; */
    border-radius: 20px;
    line-height: 40px;
    margin: 10px 0;
    cursor: pointer;
}

.isSelect {
    background-color: #f0f0f0;
}

/*userInfo*/

.user-header {
    width: 160px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 1px rgb(141, 141, 141);
}

.user {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 32px 0;
}

.username {
    font-size: 24px;
    font-weight: bolder;
}

.user-info {
    margin-left: 32px;
    width: calc(-33.6px + 40vw);
}

.user-content {
    font-size: 12px;
    color: #999;
    margin-top: 8px;
}

.user-desc {
    font-size: 14px;
    margin-top: 16px;
}

.user-interactions {
    margin-top: 16px;
}

.user-inter-item {
    display: flex;
    margin-right: 16px;
    font-size: 14px;
}

.user-show {
    color: #999;
}

.user-count {
    margin-right: 8px;
}

/*note*/
.note {
    display: flex;
    justify-content: center;
}
</style>