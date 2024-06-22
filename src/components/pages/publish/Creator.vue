<template>
  <!--发布页面-->
  <div class="publish-flex">
    <div class="publish-main">
      <div style="height: 100%;padding:0 30px;max-width: calc(100% - 60px);width: 100%;">
        <div class="publish-header-title">发布图文</div>
        <div class="photo-upload">
          <div class="photo-upload-title">图片编辑</div>
          <el-upload v-model:file-list="pictureList" action="/api/upload/" list-type="picture-card"
            :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :auto-upload="false"
            :on-success="handleSuccess" :on-change="handleUpload" :before-upload="handleBeforeUpload">
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="预览图片" />
          </el-dialog>
        </div>
        <div class="info-input">
          <el-input class="input" v-model="title" maxlength="20" show-word-limit
            placeholder="填写标题，可能会有更多赞哦～"></el-input>
          <el-input class="input" v-model="content" maxlength="1000" show-word-limit placeholder="填写更全面的描述信息，让更多的人看到你吧！"
            :autosize="{ minRows: 2, maxRows: 4 }" warp="soft" type="textarea"></el-input>
          <div>
            <el-select v-model="selectValue" class="input" style="width: 200px;">
              <el-option v-for="i in typeStore" :key="i.id" :label="i.type" :value="i.type"></el-option>
            </el-select>
          </div>
          <div style="margin-top: 40px;">
            <el-button :disabled="!(selectValue && title && content)" @click="uploadFile" class="commit-btn"
              color="#ff2e4d">发布</el-button>
            <el-button style="width: 80px!important;">取消</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, reactive } from 'vue'
import {userIdStore} from '../../../stores/user'

const title = ref('')
const content = ref('')
const selectValue = ref('')
//话题下拉菜单
const typeStore = [
  {
    "id": 1,
    "type": "推荐"
  },
  {
    "id": 2,
    "type": "美食"
  },
  {
    "id": 3,
    "type": "穿搭"
  },
  {
    "id": 4,
    "type": "宠物"
  },
  {
    "id": 5,
    "type": "游戏"
  }
]
// 创建一个响应式的 user 引用  
const user = ref(null)
const files=ref('')
//图片上传
const handleSuccess = (file) => {
  console.log(file);
  files.push(pictureList);
}

function handleBeforeUpload(file) {
  files.push(file)
  return false
}

const pictureList = ref([])
const handleUpload = (file, filelist) => {
  pictureList.value = filelist
}

const uploadFile = (files) => {
  const storedUser = localStorage.getItem('user')
  user.value = JSON.parse(storedUser)

  const formData = new FormData()
  pictureList.value.forEach((file) => {
    formData.append('files', file.raw);
  });
  formData.append('user_id',user.value.userData.id)
  formData.append('title', title.value)
  formData.append('content', content.value)
  formData.append('type', selectValue.value)
  for (let pair of formData.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
  }
  axios.post('/api/note/addnote', formData)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

// ————————————————————————
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove = (uploadFile) => {
  console.log("uploadFile",uploadFile)
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
</script>

<style scoped>
/* publish */
.publish-flex {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 100%;
  flex-direction: column;
}

.publish-main {
  display: flex;
  align-items: flex-start;
  min-height: 400px;
  max-width: 1000px;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  flex-direction: column;
  justify-content: flex-start;
  padding: 30px 0;
  margin-top: 20px;
}

.info-input {
  max-width: 800px;
  margin-top: 30px;
}

:deep(.el-upload-list--picture-card) {
  --el-upload-list-picture-card-size: 120px !important;
}

:deep(.el-upload--picture-card) {
  --el-upload-picture-card-size: 120px !important;
}

.publish-header-title {
  margin-bottom: 20px;
  font-size: 20px;
}

.publish-header-title::before {
  content: '';
  display: inline-block;
  width: 5px;
  height: 20px;
  background-color: #ff2e4d;
  margin-right: 2px;
  top: 3px;
  position: relative;
  border-radius: 3px;
}

.photo-upload-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.input {
  margin-top: 10px;
}

:deep(.el-textarea__inner) {
  resize: none !important;
}

.commit-btn {
  color: white !important;
  border: none !important;
  width: 80px !important;
}

/* 背景 */

.bg {
  position: absolute;
  height: 100vh;
  background: #DCDFE6;
  z-index: -999;
  width: calc(100% - 220px);
}
</style>