<template>
    <el-container>
        <el-main class="el-main-css">
            <div class="main-nav">
                <router-link v-for="(item, index) in MenuSelectedNav" :key="item.no" 
                :to="{name: item.router }"
                class="main-nav-item"
                    @click="ChangeMenuSelected(index + 1)" :class="{ 'isSelect': menuSelected === index + 1 }">
                    {{ item.name }}</router-link>
            </div>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script setup>
import { ref } from 'vue'
//导航点中时变背景色
const menuSelected = ref(1)
const ChangeMenuSelected = (index) => {
    menuSelected.value = index
    console.log(index);
}
const MenuSelectedNav = [
    {
        no: 1,
        name: '评论和@',
        router: 'Comments'
    },
    {
        no: 2,
        name: '赞和收藏',
        router: 'Collections'
    },
    {
        no: 3,
        name: '新增关注',
        router: 'Follows'
    }]
</script>

<style scoped>
/*Main*/
.el-main-css {
    max-width: 1728px;
    min-width: 320px;
    margin: 0 auto;
}

.main-nav {
    display: flex;
    margin: 6px 0;
}

.main-nav-item {
    min-width: 100px;
    height: 40px;
    text-align: center;
    /* background-color: #7f7; */
    border-radius: 20px;
    line-height: 40px;
    margin: 10px 0;
    cursor: pointer;
}

.isSelect {
    background-color: #f0f0f0;
}
</style>