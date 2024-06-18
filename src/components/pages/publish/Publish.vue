<template>
  <div class="main-container">
    <!--头部导航栏-->
    <Header></Header>
    <el-container style="height:calc(100vh - 60px);">
      <el-container>
        <el-aside width="220px" class="menu">
          <router-link :to="{ name: 'Creator' }" class="menu-publish-btn">
            <div class="menu-item-box">
              <div>发布笔记</div>
            </div>
          </router-link>
          <router-link :to="{ name: i.name }" v-for="(i, index) in publishMenu" :key="i.no" class="menu-item"
            @click="ChangePublishMenuColor(index + 1)" :class="{ 'isSelect': publishSelected === index + 1 }">
            <div class="menu-item-box">
              <el-icon style="margin: 0 15px;" :size="20" color="#3964FF">
                <component :is="i.icon"></component>
              </el-icon>
              <div>{{ i.title }}</div>
            </div>
          </router-link>
        </el-aside>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import Header from '../../tools/Header.vue'
const publishMenu = [
  {
    id: 1,
    title: '返回首页',
    icon: 'House',
    name: 'Home'
  },
  {
    id: 2,
    title: '管理笔记',
    icon: 'Edit',
    name: 'Manage'
  },
]
//菜单点中时变背景色
const publishSelected = ref(1)
const ChangePublishMenuColor = (index) => {
  publishSelected.value = index
  console.log(publishSelected);
}
onUnmounted(() => {
  publishSelected.value = 1
})
</script>

<style scoped>
/*main */
.main-container {
  min-height: 100vh;
}

.menu {
  flex-direction: column;
  z-index: 1;
}

.menu-publish-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 20px;
  padding: 4px 0;
  cursor: pointer;
  height: 35px;
  border-radius: 4px;
  background-color: #FF2442;
  color: #fff;
}

.menu-item {
  display: flex;
  align-items: center;
  margin: 5px 10px 5px 10px;
  padding: 4px 0;
  cursor: pointer;
  height: 35px;
  border-radius: 4px;
  color: #3964FF;
  font-size: 15px;
}

.menu-item:hover {
  background-color: #F2F7FF;
}

.menu-item-box {
  display: flex;
  align-items: center;
}

/*header*/
.header {
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 0px 20px 0px;
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

.header-logo-small {
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-right: 30px;
}

.isSelect {
  background-color: #F2F7FF;
}
</style>