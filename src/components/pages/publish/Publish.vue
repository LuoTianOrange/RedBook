<template>
  <div class="main-container">
    <el-container style="height: 100vh;">
      <!--头部导航栏-->
      <el-header class="header">
        <div class="header-logo-small">
          <img style="width: 80px;" src="/images/小红书logo.png" />
        </div>
        <div style="flex-grow: 1;"></div>
        <el-menu mode="horizontal" class="el-menu-demo" style="width: 320px;">
          <el-sub-menu index="1">
            <template #title>创作中心</template>
            <el-menu-item index="1-1">创作服务</el-menu-item>
            <el-menu-item index="1-2">直播管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>业务合作</template>
            <el-menu-item index="2-1">
              业务合作
            </el-menu-item>
            <el-menu-item index="2-2">
              专业号
            </el-menu-item>
            <el-menu-item index="2-3">
              推广合作
            </el-menu-item>
            <el-menu-item index="2-4">
              蒲公英
            </el-menu-item>
            <el-menu-item index="2-5">
              商家入驻
            </el-menu-item>
            <el-menu-item index="2-6">
              MCN入驻
            </el-menu-item>

          </el-sub-menu>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="220px" class="menu">
          <router-link :to="{ name: 'Creator' }" class="menu-publish-btn">
            <div class="menu-item-box">
              <div>发布笔记</div>
            </div>
          </router-link>
          <router-link :to="{ name: i.name }" class="menu-item" @click="ChangePublishMenuColor(index + 1)"
            :class="{ 'isSelect': selected === index + 1 }" v-for="(i, index) in publishMenu" :key="i.no">
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
  <div class="bg">

  </div>
</template>

<script setup>
import { ref } from 'vue'
const publishMenu = [{
  id: 1,
  title: '管理笔记',
  icon: 'Edit',
  name: 'Manage'
},
]
//菜单点中时变背景色
const selected = ref(1)
const ChangePublishMenuColor = (index) => {
  selected.value = index
}
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

.menu-publish-btn{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 10px 5px 10px;
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

.menu-item-box{
  display: flex;
  align-items: center;
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

.header-logo-small {
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-right: 30px;
}
</style>