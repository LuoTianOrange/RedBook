<template>
  <!--发布页面-->
  <div class="publish-flex">
    <div class="publish-main">
      <div style="height: 100%;padding:0 30px;max-width: calc(100% - 60px);width: 100%;">
        <div class="publish-header-title">发布图文</div>
        <div class="photo-upload">
          <div class="photo-upload-title">图片编辑</div>
          <el-upload v-model:file-list="pictureList"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
            :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
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
            <el-select class="input" style="width: 200px;">
              <el-option v-for="i in topicStore" :key="i.id" :label="i.topic" :value="i.topic"></el-option>
            </el-select>
          </div>
          <div style="margin-top: 40px;">
            <el-button class="commit-btn">发布</el-button>
            <el-button style="width: 80px!important;">取消</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const title = ref('')
const content = ref('')
//话题下拉菜单
const topicStore = [
  {
    "id": 1,
    "topic": "推荐"
  },
  {
    "id": 2,
    "topic": "美食"
  },
  {
    "id": 3,
    "topic": "穿搭"
  },
  {
    "id": 4,
    "topic": "宠物"
  },
  {
    "id": 5,
    "topic": "游戏"
  }
]

//图片上传
const pictureList = ref([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'imageMogr4',
    url: '/images/imageMogr4.png',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'imageMogr4',
    url: '/images/imageMogr4.png',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'imageMogr4.png',
    url: '/images/imageMogr4.png',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'imageMogr4.png',
    url: '/images/imageMogr4.png',
  },])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
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
  background-color: #ff2e4d !important;
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