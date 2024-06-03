<template>
  <el-container>
    <el-main class="el-main-css">
      <!--内容导航栏-->
      <div class="main-nav">
        <div v-for="(item, index) in userLikeNav" :key="item.no" class="main-nav-item"
          @click="ChangeUserLike(index + 1)" :class="{ 'isSelect': userLikeSel === index + 1 }">
          {{ item.name }}</div>
      </div>
      <!--内容展示部分-->
      <div style="max-height: calc(100vh - 190px);overflow: auto;">
        <div class="main-container-flex">
          <div class="main-container" v-for="list in groupedItems">
            <div class="main-item" v-for="info in list" :key="info.id" v-if="!isLoading">
              <div @click="goToNote(info.note)" class="main-item-top">
                <img style="object-fit: cover;width: 100%;" :src="info.note.noteCover">
              </div>
              <div class="main-item-bottom">
                <span style="margin-bottom: 8px;">{{ info.note.title }}</span>
                <div style="display: flex;justify-content: space-between;margin-top: 8px;">
                  <div style="display: flex;align-items: center;">
                    <img style="margin-right: 5px;border-radius: 50%;width: 25px;height: 25px;overflow: hidden;"
                      :src="info.avatar" />
                    <span>{{ info.username }}</span>
                  </div>
                  <div style="display: flex;align-items: center;">
                    <div style="margin-right: 5px;"><i-like theme="outline" size="20" fill="#333" />
                    </div>
                    <div>34</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import useNoteStore from '../../../stores/store'

let isLoading = ref(true)

//导航点中时变背景色
const userLikeSel = ref(1)
const ChangeUserLike = (index) => {
  userLikeSel.value = index
  console.log(index);
}
const userLikeNav = [
  {
    no: 1,
    name: '推荐'
  }, {
    no: 2,
    name: '美食'
  }]

//存放笔记的数组
let noteStore = ref([])

const LoadingData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/note/notes')
    noteStore.value = response.data.data
    console.log("response.data:", response.data.data);
    isLoading = false
  } catch (error) {
    console.error(error)
  }
}
LoadingData()

const groupedItems = computed(() => {
  let groups = [];

  // 每组元素数
  let groupSize = 3;

  if (groups.length % 2 == 0 && groups.length % 3 == 0) {
    groupSize = 3;
  } else if (groups.length % 2 == 0 && groups.length % 3 != 0) {
    groupSize = 2;
  }
  for (let i = 0; i < noteStore.value.length; i += groupSize) {
    groups.push(noteStore.value.slice(i, i + groupSize));
  }
  return groups;
})

//跳转笔记页面
const noteList = useNoteStore()
const router = useRouter()
const goToNote = (noteData) => {
  noteList.setNoteData(noteData)
  router.push(`note/${noteData.id}`)
}
</script>

<style scoped>
/*滚动条隐藏*/
::-webkit-scrollbar {
  display: none;
}

/*Main*/
.el-main-css {
  max-width: 1728px;
  min-width: 320px;
  margin: 0 auto;
}

.menu {
  flex-direction: column;
}

.isSelect {
  background-color: #f0f0f0;
}


/*搜索框input */
.el-input__wrapper {
  --cat-input: 20px;
  border-radius: var(--cat-input, 20px) !important;
  background-color: #f7f7f7 !important;
  color: #333 !important;
  font-size: 15px !important;
  box-shadow: none !important;
}

/*header*/
.header {
  display: flex;
  align-items: center;
  background: #fff;
  /* border-bottom: 1px solid var(--el-menu-border-color); */
}

.el-menu--horizontal.el-menu {
  border-bottom: none !important;
  ;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-left-item {
  margin: 0 15px;
}

.el-menu--horizontal {
  flex-direction: row-reverse !important;
}

/*main*/
.main-nav {
  display: flex;
  margin: 6px 0;
}

.main-nav-item {
  min-width: 64px;
  height: 40px;
  text-align: center;
  /* background-color: #7f7; */
  border-radius: 20px;
  line-height: 40px;
  margin: 10px 0;
  cursor: pointer;
}

.main-container-flex {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.main-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0 20px;
  max-height: calc(100% - 72px);
  height: 100%;
  overflow: auto;
}

.main-item {
  min-height: 220px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.main-item-top {
  max-height: 290px;
  max-width: 220px;
  border-radius: 20px;
  overflow: hidden;
}

.main-item-bottom {
  padding: 10px;
  width: 200px;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>