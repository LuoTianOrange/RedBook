<template>
  <div class="manage-main">
    <div class="manage-box">
      <div class="manage-box-padding">
        <div class="manage-title">笔记管理</div>
        <div class="menu-container">
          <!--菜单-->
          <el-menu mode="horizontal" :default-active="activeIndex" @select="handleSelect" class="manage-nav">
            <el-menu-item index="1" @click="">全部笔记</el-menu-item>
            <el-menu-item index="2">已发布</el-menu-item>
            <el-menu-item index="3">审核中</el-menu-item>
            <el-menu-item index="4">未通过</el-menu-item>
          </el-menu>
          <span class="note-count">共{{ notecount }}篇笔记</span>
        </div>
        <!--笔记-->
        <div class="note-flex">
          <div v-for="i in displayedNotes" :key="i.id" class="note-item">
            <div :style="{ backgroundImage: `url(${i.note.noteCover})` }" class="note-image"  @click="goToNote(i)"></div>
            <div class="note-content">
              <div class="note-title">{{ i.note.title }}</div>
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
import { onMounted, ref, computed, watchEffect } from 'vue'
import { Comment, Like, Star } from '@icon-park/vue-next'
import { managerAllStore, managerPassStore, managerNowStore, managerNoPassStore } from '../../../stores/manager'
import axios from 'axios'
import { useRouter } from 'vue-router'
import useNoteStore from '../../../stores/store'


//跳转笔记页面
const noteList = useNoteStore()
const router = useRouter()
const goToNote = (noteData) => {
  noteList.setNoteData(noteData)
  router.push(`note/${noteData.note.id}`)
}

const activeIndex = ref(1)

const manageMenu = [{
  id: 1,
  title: '笔记管理',
  icon: 'Edit',
  name: 'Manage'
},
]
//用于接收笔记的响应式数组
const ManagerallStore = ref([])
const ManagerpassStore = ref([])
const ManagernowStore = ref([])
const ManagernoPassStore = ref([])

let notes = ref([])

function handleSelect(index) {
  // 在这里，你可以根据 index 更新其他状态或执行其他操作  
  switch (index) {
    case '1': // 全部 
      notecount.value = ManagerallStore.value.length
      notes.value = ManagerallStore.value
      break;
    case '2': // 已通过  
      notecount.value = ManagerpassStore.value.length
      notes.value = ManagerpassStore.value
      break;
    case '3': // 审核中  
      notecount.value = ManagernowStore.value.length
      notes.value = ManagernowStore.value
      break;
    case '4': // 未通过  
      notecount.value = ManagernoPassStore.value.length
      notes.value = ManagernoPassStore.value
      break;
  }
  console.log("notes:",notes)
  return notecount,notes;
}

//笔记数量，用onMounted是为了在页面加载前就获取笔记数量
let notecount = ref(0)
/**
 * 当组件被挂载到 DOM 后，计算 noteStore 中元素的个数，并将结果存储到 notecount 中。
 * @returns {Ref<number>} 返回一个响应式引用，他的值是 noteStore 中元素的个数。
 */

const test = (e) => {
  console.log("activeIndex:", e);
  console.log("ManagerallStore.lenth", ManagerallStore.value.length);
}

// 创建一个响应式的 user 引用  
const user = ref(null)
const managerallStore = managerAllStore()
const managerpassStore = managerPassStore()
const managernowStore = managerNowStore()
const managernoPassStore = managerNoPassStore()

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  user.value = JSON.parse(storedUser)
  console.log(user.value.userData.id)
  //获取个人笔记信息
  axios.get(`/api/note/allNotes/${user.value.userData.id}`)
    .then((response) => {
      managerallStore.setNoteData(response.data.data)
      ManagerallStore.value = response.data.data
      console.log(ManagerallStore.value)
    }).catch((error) => {
      console.error(error)
    })

  //获取已通过笔记信息
  axios.get(`/api/note/selectNotes/${user.value.userData.id}/approved`)
    .then((response) => {
      managerpassStore.setNoteData(response.data.data)
      ManagerpassStore.value = response.data.data
      console.log(ManagerpassStore.value)
    }).catch((error) => {
      console.error(error)
    })

  //获取审核中笔记信息
  axios.get(`/api/note/selectNotes/${user.value.userData.id}/under_review`)
    .then((response) => {
      managernowStore.setNoteData(response.data.data)
      ManagernowStore.value = response.data.data
      console.log(ManagernowStore.value)
    }).catch((error) => {
      console.error(error)
    })

  //获取未通过笔记信息
  axios.get(`/api/note/selectNotes/${user.value.userData.id}/rejected`)
    .then((response) => {
      managernoPassStore.setNoteData(response.data.data)
      ManagernoPassStore.value = response.data.data
      console.log(ManagernoPassStore.value)
    }).catch((error) => {
      console.error(error)
    })
})

// 存储页当前页码
const currentPage = ref(1)
// 每页的文章数量
const pageSize = 3

// 计算属性，根据当前页码和每页的文章数量来过滤 noteStore 数组
const displayedNotes = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  console.log(notes)
  return notes.value.slice(start,end)
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
  switch (activeIndex.value) {
    case 1: // 全部 
      currentPage.value * pageSize >= ManagerallStore.value.length
      break;
    case 2: // 已通过  
      currentPage.value * pageSize >= ManagerpassStore.value.length
      break;
    case 3: // 审核中  
      currentPage.value * pageSize >= ManagernowStore.value.length
      break;
    case 4: // 未通过  
      currentPage.value * pageSize >= ManagernoPassStore.value.length
      break;
  }return currentPage.value
})

</script>

<style scoped>
/* 背景 */
.bg {
  position: absolute;
  height: 100%;
  background: #DCDFE6;
  z-index: -999;
  width: 100%;
  top: 0;
  right: 0;
}

/* main */

.manage-main {
  position: relative;
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

.manage-box {
  background-color: #fff;
  height: 800px;
  margin: 20px;
  border-radius: 6px;
}

.manage-box-padding {
  padding: 20px;
  /* height: 92%; */
  height: calc(100% - 40px);
}

/**笔记 */
.note-flex {
  display: flex;
  flex-direction: column;
  /* height: 85%; */
  height: calc(100% - 140px);
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
  /* margin-top: 20px; */
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

.note-end {
  text-align: center;
  margin-top: 10px;
  color: #999;
}
</style>