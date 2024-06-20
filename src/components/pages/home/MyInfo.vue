<template>
    <el-container class="el-container-css">
        <el-main class="el-main-css">
            <div class="user">
                <div class="user-header">
                    <img :src="avatar" style="width: 100%;">
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
                <!-- 内容展示部分 -->
                <div class="main-container">
                    <div class="main-container-flex">
                        <div class="note-item" v-for="i in displayedNotes" :key="i.id">
                            <img :src="i.noteCover" class="note-img">
                            <div>{{ i.title }}</div>
                            <div>
                                <img src="" alt="userheader">
                                <div>{{ 用户名 }}</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="isLastPage" class="note-end">
                        - 没有更多笔记了 -
                    </div>
                    <el-pagination class="note-pagin" background layout="prev, pager, next ,jumper" :total="notecount"
                        :page-size="pageSize" @current-change="handleCurrentChange" />
                </div>
            </div>

        </el-main>
    </el-container>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { userNoteStore } from '../../../stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

const noteStore = userNoteStore()

let avatar = ref('')
// 创建一个响应式的 user 引用  
const user = ref(null)

// 在组件挂载后从 localStorage 获取用户信息  
onMounted(async () => {
    try {
        // 假设 localStorage 中存储的用户信息是一个 JSON 字符串  
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            // 将 JSON 字符串解析为对象并赋值给 user 引用  
            user.value = JSON.parse(storedUser)
            console.log(user.value)
            userInfoStore.value[0].username = user.value.userData.username
            userInfoStore.value[0].usercontent = user.value.userData.id
            userInfoStore.value[0].userdesc = user.value.userData.description
            const newUserInteractions = [
                { show: "关注", count: user.value.userData.followerCount },
                { show: "粉丝", count: user.value.userData.fans },
                { show: "获赞与收藏", count: 999 }
            ]

            // 更新 userInfoStore 中第一个对象的 userInteractions  
            userInfoStore.value[0].userinteractions = newUserInteractions
            avatar = user.value.userData.avatar

            //获取个人笔记信息
            axios.get(`/api/note/notes/${user.value.userData.id}`)
                .then((response) => {
                    noteStore.setNoteData(response.data.data)
                }).catch((error) => {
                    console.error(error)
                })
        }
    } catch (error) {
        console.error('获取用户信息时发生错误:', error)
    }
})

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

const userInfoStore = ref([{
    username: "username",
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
}])
console.log(userInfoStore);


//用于接收笔记的响应式数组
const MynoteStore = ref([
    {
        "id": 2046975644,
        "user_id": 906190192,
        "title": "春",
        "content": "cillum ut",
        "noteCover": "/images/39eb38.jpg",
        "type": "ut dolor L",
        "urls": "consequat commodo velit do Excepteur",
        "picture_count": 863963589,
        "like_count": -1953051395,
        "like_status": true,
        "collection_status": true,
        "collection_count": 1130386215,
        "comment_count": 673008498
    },
    {
        "id": 2046975644,
        "user_id": 906190192,
        "title": "夏",
        "content": "cillum ut",
        "noteCover": "/images/20240415_112933.jpg",
        "type": "ut dolor L",
        "urls": "consequat commodo velit do Excepteur",
        "picture_count": 863963589,
        "like_count": -1953051395,
        "like_status": true,
        "collection_status": true,
        "collection_count": 1130386215,
        "comment_count": 673008498
    },
    {
        "id": 2046975644,
        "user_id": 906190192,
        "title": "夏",
        "content": "cillum ut",
        "noteCover": "/images/20240415_112933.jpg",
        "type": "ut dolor L",
        "urls": "consequat commodo velit do Excepteur",
        "picture_count": 863963589,
        "like_count": -1953051395,
        "like_status": true,
        "collection_status": true,
        "collection_count": 1130386215,
        "comment_count": 673008498
    },
    {
        "id": 2046975644,
        "user_id": 906190192,
        "title": "Miku",
        "content": "cillum ut",
        "noteCover": "/images/20240312_192636.jpg",
        "type": "ut dolor L",
        "urls": "consequat commodo velit do Excepteur",
        "picture_count": 863963589,
        "like_count": -1953051395,
        "like_status": true,
        "collection_status": true,
        "collection_count": 1130386215,
        "comment_count": 673008498
    },
    {
        "id": 2046975644,
        "user_id": 906190192,
        "title": "Miku",
        "content": "cillum ut",
        "noteCover": "/images/20240312_192636.jpg",
        "type": "ut dolor L",
        "urls": "consequat commodo velit do Excepteur",
        "picture_count": 863963589,
        "like_count": -1953051395,
        "like_status": true,
        "collection_status": true,
        "collection_count": 1130386215,
        "comment_count": 673008498
    },
    {
        "id": 2046975644,
        "user_id": 906190192,
        "title": "Miku",
        "content": "cillum ut",
        "noteCover": "/images/20240312_192636.jpg",
        "type": "ut dolor L",
        "urls": "consequat commodo velit do Excepteur",
        "picture_count": 863963589,
        "like_count": -1953051395,
        "like_status": true,
        "collection_status": true,
        "collection_count": 1130386215,
        "comment_count": 673008498
    },
    {
        "id": 2046975644,
        "user_id": 906190192,
        "title": "夏",
        "content": "cillum ut",
        "noteCover": "/images/20240415_112933.jpg",
        "type": "ut dolor L",
        "urls": "consequat commodo velit do Excepteur",
        "picture_count": 863963589,
        "like_count": -1953051395,
        "like_status": true,
        "collection_status": true,
        "collection_count": 1130386215,
        "comment_count": 673008498
    },
])
//笔记数量，用onMounted是为了在页面加载前就获取笔记数量
const notecount = ref(0)
/**
 * 当组件被挂载到 DOM 后，计算 noteStore 中元素的个数，并将结果存储到 notecount 中。
 * @returns {Ref<number>} 返回一个响应式引用，他的值是 noteStore 中元素的个数。
 */
onMounted(() => {
    notecount.value = MynoteStore.value.length
    console.log(notecount)
    return notecount
})

// 存储页当前页码
const currentPage = ref(1)
// 每页的笔记数量
const pageSize = 6

// 计算属性，根据当前页码和每页的文章数量来过滤 noteStore 数组
const displayedNotes = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    const end = start + pageSize
    return MynoteStore.value.slice(start, end)
})

// 当前页码改变时的处理函数
const handleCurrentChange = (newPage) => {
    currentPage.value = newPage
}
/**
 * 计算属性，判断当前页是否是最后一页
 * @returns {Ref<boolean>} 返回一个响应式引用，值是当前页是否是最后一页。
 
 */
const isLastPage = computed(() => {
    return currentPage.value * pageSize >= MynoteStore.value.length
})
</script>

<style scoped>
@media screen and (min-width: 960px) {
    .el-container-css {
        max-width: calc(100vw - 240px);
    }
}

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
    height: 160px;
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
    flex-direction: column;
}
.main-container{
    width: 100%;
    max-height: calc(-290px + 100vh);
    display: flex;
    flex-direction: column;
    align-items: center;
}
.main-container-flex {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.note-item {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 10px;
    object-fit: cover;
    height: 180px;
    max-width: 200px;
    flex-direction: column;
}

.note-img {
    overflow: hidden;
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: top;
    border-radius: 12px;
}
.note-end{
    padding: 10px 0;
}
.note-pagin{
    padding-bottom: 20px;
}
</style>