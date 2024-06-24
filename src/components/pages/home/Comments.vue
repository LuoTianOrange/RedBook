<template>
  <el-container>
    <el-main class="el-main-css">
      <div v-for="i in store" class="main-item">
        <div>
          <img :src="i.avatar" class="avatar">
        </div>
        <div class="info">
          <div style="display: flex;justify-content: space-between;">
            <div style="display: flex;">
              <div style="color: #3d465a;">{{ i.username }}</div>评论了你
            </div>
            <div>{{ formatDate(i.updateDate) }}</div>
          </div>
          <div class="content">
            {{ i.replyId }}
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from "vue";

const store = ref([
  {
    "id": -2147483648,
    "note_id": -2147483648,
    "note_uid": -2147483648,
    "user_id": -2147483648,
    "reply_uid": -2147483648,
    "replyId": "请根据该id去请求对应的评论数据",
    "content": "string",
    "comment_twocount": -2147483648,
    "like_count": -2147483648,
    "updateDate": "2019-08-24T14:15:22",
    "username": "名字",
    "avatar": "string",
    "note_cover": "string"
  },
  {
    "id": -2147483648,
    "note_id": -2147483648,
    "note_uid": -2147483648,
    "user_id": -2147483648,
    "reply_uid": -2147483648,
    "replyId": "请根据该id去请求对应的评论数据",
    "content": "string",
    "comment_twocount": -2147483648,
    "like_count": -2147483648,
    "updateDate": "2019-08-24T14:15:22",
    "username": "名字",
    "avatar": "string",
    "note_cover": "string"
  },
])

//用于分离点赞和评论的函数

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

.main-item:hover{
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

.content{
  color: #555;
}
</style>