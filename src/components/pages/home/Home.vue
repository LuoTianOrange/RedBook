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
        <!-- <div class="main-container-flex">
          <div class="main-container" v-for="list in groupedItems">
            <div class="main-item" v-for="info in list" :key="info.id" v-if="!isLoading">
              <el-image style="object-fit: cover;width: 100%;" :src="info.note.noteCover" @click="goToNote(info)"
                class="main-item-top">
                <template #error>
                  <div class="image-slot2">
                    <el-icon><icon-picture /></el-icon>
                  </div>
                </template>
              </el-image>
              <div class="main-item-bottom">
                <span style="margin-bottom: 8px;">{{ info.note.title }}</span>
                <div style="display: flex;justify-content: space-between;margin-top: 8px;">
                  <div style="display: flex;align-items: center;">
                    <el-image style="margin-right: 5px;border-radius: 50%;width: 25px;height: 25px;overflow: hidden;"
                      :src="info.avatar">
                      <template #error>
                        <div class="image-slot">
                          <el-icon><icon-picture /></el-icon>
                        </div>
                      </template>
                    </el-image>
                    <span>{{ info.username }}</span>
                  </div>
                  <div style="display: flex;align-items: center;">
                    <div style="margin-right: 5px;"><i-like theme="outline" size="20" fill="#333" />
                    </div>
                    <div>{{ info.note.likeCount }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <VueFlexWaterfall
          align-content="center"
          col="4"
          col-spacing="20"
          :break-at="{ 900: 3, 600: 2, 300: 1 }"
        >
        <div class="main-item" v-for="i in groupedItems" :key="i.id" v-if="!isLoading">
              <el-image style="object-fit: cover;width: 100%;" :src="i.note.noteCover" @click="goToNote(i)"
                class="main-item-top">
                <template #error>
                  <div class="image-slot2">
                    <el-icon><icon-picture /></el-icon>
                  </div>
                </template>
              </el-image>
              <div class="main-item-bottom">
                <span style="margin-bottom: 8px;">{{ i.note.title }}</span>
                <div style="display: flex;justify-content: space-between;margin-top: 8px;">
                  <div style="display: flex;align-items: center;">
                    <el-image style="margin-right: 5px;border-radius: 50%;width: 25px;height: 25px;overflow: hidden;"
                      :src="i.avatar">
                      <template #error>
                        <div class="image-slot">
                          <el-icon><icon-picture /></el-icon>
                        </div>
                      </template>
                    </el-image>
                    <span>{{ i.username }}</span>
                  </div>
                  <div style="display: flex;align-items: center;">
                    <div style="margin-right: 5px;"><i-like theme="outline" size="20" fill="#333" />
                    </div>
                    <div>{{ i.note.likeCount }}</div>
                  </div>
                </div>
              </div>
            </div>
        </VueFlexWaterfall>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { computed, ref, onMounted, watchEffect, onUnmounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import useNoteStore from '../../../stores/store'
import { User as IconPicture } from '@element-plus/icons-vue'
import { VueFlexWaterfall } from 'vue-flex-waterfall';

let isLoading = ref(true)

// 用来存储当前窗口宽度的引用  
const windowWidth = ref(window.innerWidth);

// 监听窗口大小变化  
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

// 组件挂载时添加事件监听器  
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

// 组件卸载时移除事件监听器  
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// 计算属性，根据窗口宽度计算每行显示的元素数量
const groupSize = computed(() => {
  if (windowWidth.value >= 1200) {
    return 6; // 宽屏显示时，每行4个元素  
  } else if (windowWidth.value >= 900) {
    return 5; // 中屏显示时，每行3个元素  
  } else {
    return 4; // 窄屏显示时，每行2个元素  
  }
});

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
  },
  {
    no: 3,
    name: '宠物'
  },
  {
    no: 4,
    name: '影视'
  },
  {
    no: 5,
    name: '旅行'
  },
  {
    no: 6,
    name: '游戏'
  },
  {
    no: 7,
    name: '壁纸'
  },]

//存放笔记的数组
let noteStore = ref([])

axios.get('/api/note/notes').then((response) => {
  noteStore.value = response.data.data
  isLoading = false
}).catch((error) => {
  console.error(error)
})

const groupedItems = computed(() => {
  let groups = [];

  // 根据userLikeSel过滤笔记  
  const filteredNotes = noteStore.value.filter(note => {
    const noteType = note.note.type; // 假设笔记的类型存储在note.note.type中  
    switch (userLikeSel.value) {
      case 1:
        // '推荐'类型包含所有笔记  
        return true;
      case 2:
        // '美食'类型  
        return noteType === '美食';
      case 3:
        // '宠物'类型  
        return noteType === '宠物';
      case 4:
        // '影视'类型  
        return noteType === '影视';
      case 5:
        // '旅行'类型  
        return noteType === '旅行';
      case 6:
        // '游戏'类型  
        return noteType === '游戏';
      case 7:
        // '壁纸'类型  
        return noteType === '壁纸';
      // ... 可以继续添加其他类型的处理  
      default:
        // 如果userLikeSel.value不是一个有效的选项，则返回false  
        return false;
    }
  });

  // 每组元素数
  let groupSize = 10;

  if (groups.length % 2 == 0 && groups.length % 3 == 0) {
    groupSize = 3;
  } else if (groups.length % 2 == 0 && groups.length % 3 != 0) {
    groupSize = 2;
  }
  for (let i = 0; i < noteStore.value.length; i += groupSize) {
    groups.push(filteredNotes.slice(i, i + groupSize));
  }
  return groups;


})

//跳转笔记页面
const noteList = useNoteStore()
const router = useRouter()
const goToNote = (noteData) => {
  noteList.setNoteData(noteData)
  router.push(`note/${noteData.note.id}`)
}
</script>

<style scoped>
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

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
}

.image-slot2 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
}
</style>