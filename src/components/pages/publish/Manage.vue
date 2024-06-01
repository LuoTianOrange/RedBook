<template>
  <div class="manage-main">
    <div style="background-color: #fff;height: 95%;margin: 20px;border-radius: 6px;">
      <div style="padding:20px;height: 92%;">
        <div class="manage-title">笔记管理</div>
        <div class="menu-container">
          <!--菜单-->
          <el-menu mode="horizontal" :default-active="activeIndex" class="manage-nav">
            <el-menu-item index="1">全部笔记</el-menu-item>
            <el-menu-item index="2">已发布</el-menu-item>
            <el-menu-item index="3">审核中</el-menu-item>
            <el-menu-item index="4">未通过</el-menu-item>
          </el-menu>
          <span class="note-count">共{{ notecount }}篇笔记</span>
        </div>
        <!--笔记-->
        <div class="note-flex">
          <div v-for="i in displayedNotes" :key="i.id" class="note-item">
            <div :style="{ backgroundImage: `url(${i.noteCover})` }" class="note-image"></div>
            <div class="note-content">
              <div class="note-title">{{ i.title }}</div>
              <div class="note-count-box">
                <div class="note-count-flex">
                  <comment theme="filled" size="16" fill="#999" />
                  <div class="note-number">{{ i.comment_count }}</div>
                </div>
                <div class="note-count-flex">
                  <like theme="filled" size="16" fill="#999" />
                  <div class="note-number">{{ i.like_count }}</div>
                </div>
                <div class="note-count-flex">
                  <star theme="filled" size="16" fill="#999" />
                  <div class="note-number">{{ i.collection_count }}</div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div v-if="isLastPage" class="note-end">
            - 没有更多笔记了 -
          </div>
          <el-pagination class="note-pagin" background layout="prev, pager, next ,jumper" :total="notecount"
            :page-size="pageSize" @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { Comment, Like, Star } from '@icon-park/vue-next'
const activeIndex = ref('1')

const manageMenu = [{
  id: 1,
  title: '笔记管理',
  icon: 'Edit',
  name: 'Manage'
},
]
//用于接收笔记的响应式数组
const noteStore = ref([
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
  notecount.value = noteStore.value.length
  console.log(notecount)
  return notecount
})

// 存储页当前页码
const currentPage = ref(1)
// 每页的文章数量
const pageSize = 3

// 计算属性，根据当前页码和每页的文章数量来过滤 noteStore 数组
const displayedNotes = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return noteStore.value.slice(start, end)
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
  return currentPage.value * pageSize >= noteStore.value.length
})

</script>

<style scoped>
/* 背景 */

.bg {
  position: absolute;
  min-height: 100vh;
  background: #DCDFE6;
  z-index: -999;
  width: calc(100% - 220px);
  top: 0;
}

/* main */

.manage-main {
  min-height: calc(100vh - 60px);
  min-width: calc(100% - 220px);
}

.manage-title {
  font-size: 25px;
}

.manage-title::before {
  content: '';
  display: inline-block;
  width: 5px;
  height: 25px;
  background-color: #3A64FF;
  margin-right: 2px;
  top: 3px;
  position: relative;
  border-radius: 3px;
}

.manage-nav {
  margin: 20px 0;
}

/**笔记 */
.note-flex {
  display: flex;
  flex-direction: column;
  height: 85%;
}

.note-image {
  width: 120px;
  height: 160px;
  overflow: hidden;
  background-size: cover;
  background-position: left;
  border-radius: 6px;
  position: relative;
  margin-right: 20px;
}

/**图片的半透明遮罩 */
.note-image::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}

.note-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 10px;
  padding: 10px;
}

.note-item:hover {
  background-color: #efefef;
}

.note-pagin {
  margin-top: auto;
  display: flex;
  justify-content: center;
}

.menu-container {
  position: relative;
}

.note-title {
  margin-bottom: 10px;
}

.note-count {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #999;
}

.note-count-box {
  display: flex;
  flex-direction: row;
}

.note-count-flex {
  display: flex;
  align-items: center;
  margin-right: 10px;
  font-size: 14px;
  color: #999;
}

.note-number {
  margin-left: 5px;
}

.note-end{
  text-align: center;
  margin-top: 10px;
  color: #999;
}
</style>