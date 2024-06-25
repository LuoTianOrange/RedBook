<template>
  <el-container v-if="!isLoading" v-loading="isloading">
    <el-main class="el-main-css">
      <div v-for="i in currentPageData" class="main-item">
        <div>
          <el-image :src="i.avatar" class="avatar">
            <template #error>
              <div class="image-slot">
                <el-icon><icon-picture /></el-icon>
              </div>
            </template>
          </el-image>
        </div>
        <div class="info">
          <div style="display: flex;justify-content: space-between;">
            <div style="display: flex;">
              <div style="color: #3d465a;">{{ i.username }}</div>点赞了你的评论
            </div>
            <div class="time">{{ formatDate(i.likeRecord.updateDate) }}</div>
          </div>
          <div class="content">
            {{ i.replyId }}
          </div>
        </div>
      </div>
      <div style="flex-grow: 1;"></div>
      <div class="pagination-container">
        <el-pagination class="note-pagin" background layout="prev, pager, next ,jumper" :total="noticeCount"
          :page-size="pageSize" @current-change="handleCurrentChange" />
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import { userIdStore } from '../../../stores/user'
import { User as IconPicture } from '@element-plus/icons-vue'

let isLoading = ref(true);
const store = ref([])
const user = reactive(userIdStore)
//通知数量
let noticeCount = ref(0)
// 当前页码，初始值为1
let currentPage = ref(1)
const pageSize = 10
const currentPageData = ref([])

onMounted(() => {
  try {
    const storedUser = localStorage.getItem('user')
    user.value = JSON.parse(storedUser)
    let user_id = user.value.userData.id;
    //获取点赞通知
    axios.get(`/api/like/getLikeInform/${user_id}`)
      .then((res) => {
        store.value = res.data.data;
        noticeCount.value = store.value.length;
        updateCurrentPageData();
        console.log("res:", res.data);
        console.log("store:", store.value);
      })
      .catch((err) => {
        console.log(err);
      })
    if (store.value.length > 0) {
      noticeCount.value = store.value.length;
    }
    //根据点赞id获取笔记标题

    isLoading.value = false;
  } catch (error) {
    console.log(error);
  }
})
//更新当前页数据
const updateCurrentPageData = () => {
  let start = (currentPage.value - 1) * pageSize;
  let end = start + pageSize;
  currentPageData.value = store.value.slice(start, end);
}

// 当前页码改变时的处理函数
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
  updateCurrentPageData();
}

//去除时间中间的T字符并替换成空格
const formatDate = (dateString) => {
  if (dateString === undefined) {
    return "";
  }
  return dateString.replace("T", " ");
}
</script>

<style scoped>
.main-item {
  display: flex;
  flex-direction: row;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
}

.main-item:hover {
  background-color: #f5f5f5;
}

.avatar {
  height: 50px;
  width: 50px;
  border: 1px solid #ebebeb;
  border-radius: 50%;
  margin-right: 10px;
}

.info {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  /* max-width: 1000px; */
}

.content {
  color: #555;
}

.note-pagin {
  /* margin-top: 20px; */
  margin-top: auto;
  display: flex;
  justify-content: center;
}

.pagination-container {
  margin-top: auto;
}

.time {
  font-size: 14px;
  color: #777;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
</style>