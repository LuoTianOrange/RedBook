<template>
    <div>
        <div class="common-layout">
            <el-container style="min-height: 100vh;">
                <el-aside width="220px" class="menu">
                    <div
                        style="height: 60px;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;">
                        <img style="width: 80px;margin-left: 30px;" src="/images/小红书logo.png" />
                    </div>
                    <div class="menu-item" @click="ChangeColor(1)" :class="{ 'isSelect': selected === 1 }">
                        <div class="menu-item-box">
                            <el-icon style="margin-right: 15px;">
                                <House />
                            </el-icon>
                            <div>发现</div>
                        </div>
                    </div>
                    <div class="menu-item" @click="ChangeColor(2)" :class="{ 'isSelect': selected === 2 }">
                        <div class="menu-item-box">
                            <el-icon style="margin-right: 15px;">
                                <Plus />
                            </el-icon>
                            <div>发布</div>
                        </div>
                    </div>
                    <div class="menu-item" @click="ChangeColor(3)" :class="{ 'isSelect': selected === 3 }">
                        <div class="menu-item-box">
                            <el-icon style="margin-right: 15px;">
                                <Bell />
                            </el-icon>
                            <div>通知</div>
                        </div>
                    </div>
                    <div class="menu-item" @click="ChangeColor(4)" :class="{ 'isSelect': selected === 4 }">
                        <div class="menu-item-box">
                            <div style="margin-right: 15px;">🦆</div>
                            <div>我</div>
                        </div>
                    </div>
                    <div style="margin-top: auto;"></div>
                    <div class="menu-item" @click="ChangeColor(5)" :class="{ 'isSelect': selected === 5 }">
                        <div class="menu-item-box">
                            <el-icon style="margin-right: 15px;">
                                <MoreFilled />
                            </el-icon>
                            <div>更多</div>
                        </div>
                    </div>
                </el-aside>
                <el-container class="c">
                    <el-header class="header">
                        <div style="flex-grow: 1;"></div>
                        <el-input v-model="searchbox" style="width: 500px;height: 40px;" size="large"
                            placeholder="搜索小红书" :suffix-icon="Search" />
                        <div style="flex-grow: 1;"></div>
                        <el-menu :default-active="activeIndex" mode="horizontal" class="el-menu-demo"
                            style="width: 320px;">
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
                    <el-main class="c">
                        <!--内容导航栏-->
                        <div class="main-nav">
                            <div v-for="(item, index) in userLikeNav" :key="item.no" class="main-nav-item"
                                @click="ChangeUserLike(index + 1)" :class="{ 'isSelect': userLikeSel === index + 1 }">
                                {{ item.name }}</div>
                        </div>
                        <!--内容展示部分-->
                        <div class="main-container">
                            <!-- <div class="main-item" v-for="i in 15">
                                <div class="main-item-top">
                                    <img style="object-fit: cover;width: 100%;" src="/images/141414.png">
                                </div>
                                <div class="main-item-bottom">
                                    <span style="margin-bottom: 8px;">大家有没有烧钱且小众的爱好😱</span>
                                    <div style="display: flex;justify-content: space-between;margin-top: 8px;">
                                        <div style="display: flex;align-items: center;">
                                            <img style="margin-right: 5px;border-radius: 50%;width: 25px;height: 25px;overflow: hidden;"
                                                src="/images/imageMogr2.jpg" />
                                            <span>杰瑞</span>
                                        </div>
                                        <div style="display: flex;align-items: center;">
                                            <div style="margin-right: 5px;"><i-like theme="outline" size="20"
                                                    fill="#333" /></div>
                                            <div>1234</div>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                            <div class="column-flex" style="display: flex;">
                                <div class="main-item" v-for="i in 15">
                                    <div class="main-item-top">
                                        <img style="object-fit: cover;width: 100%;" src="/images/141414.png">
                                    </div>
                                    <div class="main-item-bottom">
                                        <span style="margin-bottom: 8px;">大家有没有烧钱且小众的爱好😱</span>
                                        <div style="display: flex;justify-content: space-between;margin-top: 8px;">
                                            <div style="display: flex;align-items: center;">
                                                <img style="margin-right: 5px;border-radius: 50%;width: 25px;height: 25px;overflow: hidden;"
                                                    src="/images/imageMogr2.jpg" />
                                                <span>杰瑞</span>
                                            </div>
                                            <div style="display: flex;align-items: center;">
                                                <div style="margin-right: 5px;"><i-like theme="outline" size="20"
                                                        fill="#333" /></div>
                                                <div>1234</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column-flex" style="display: flex;">
                                <div class="main-item" v-for="i in 15">
                                    <div class="main-item-top">
                                        <img style="object-fit: cover;width: 100%;" src="/images/141414.png">
                                    </div>
                                    <div class="main-item-bottom">
                                        <span style="margin-bottom: 8px;">大家有没有烧钱且小众的爱好😱</span>
                                        <div style="display: flex;justify-content: space-between;margin-top: 8px;">
                                            <div style="display: flex;align-items: center;">
                                                <img style="margin-right: 5px;border-radius: 50%;width: 25px;height: 25px;overflow: hidden;"
                                                    src="/images/imageMogr2.jpg" />
                                                <span>杰瑞</span>
                                            </div>
                                            <div style="display: flex;align-items: center;">
                                                <div style="margin-right: 5px;"><i-like theme="outline" size="20"
                                                        fill="#333" /></div>
                                                <div>1234</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column-flex" style="display: flex;">
                                <div class="main-item" v-for="i in 15">
                                    <div class="main-item-top">
                                        <img style="object-fit: cover;width: 100%;" src="/images/141414.png">
                                    </div>
                                    <div class="main-item-bottom">
                                        <span style="margin-bottom: 8px;">大家有没有烧钱且小众的爱好😱</span>
                                        <div style="display: flex;justify-content: space-between;margin-top: 8px;">
                                            <div style="display: flex;align-items: center;">
                                                <img style="margin-right: 5px;border-radius: 50%;width: 25px;height: 25px;overflow: hidden;"
                                                    src="/images/imageMogr2.jpg" />
                                                <span>杰瑞</span>
                                            </div>
                                            <div style="display: flex;align-items: center;">
                                                <div style="margin-right: 5px;"><i-like theme="outline" size="20"
                                                        fill="#333" /></div>
                                                <div>44</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column-flex" style="display: flex;">
                                <div class="main-item" v-for="i in 15">
                                    <div class="main-item-top">
                                        <img style="object-fit: cover;width: 100%;" src="/images/141414.png">
                                    </div>
                                    <div class="main-item-bottom">
                                        <span style="margin-bottom: 8px;">大家有没有烧钱且小众的爱好😱</span>
                                        <div style="display: flex;justify-content: space-between;margin-top: 8px;">
                                            <div style="display: flex;align-items: center;">
                                                <img style="margin-right: 5px;border-radius: 50%;width: 25px;height: 25px;overflow: hidden;"
                                                    src="/images/imageMogr2.jpg" />
                                                <span>杰瑞</span>
                                            </div>
                                            <div style="display: flex;align-items: center;">
                                                <div style="margin-right: 5px;"><i-like theme="outline" size="20"
                                                        fill="#333" /></div>
                                                <div>1234</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

let imgsrc = new URL(`../../assets/images/${name}.png`, import.meta.url).href
const searchbox = ref('')
//菜单点中时变背景色
const selected = ref(1)
const ChangeColor = (index) => {
    selected.value = index
}

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
</script>

<style>
/*屏幕大小检测*/
/* @media screen and (max-width: 950px) {
    .menu {
        display: none;
    }
} */

@media screen and (min-width: 950px) {
    .menu {
        display: flex;
    }
}

.menu {
    flex-direction: column;
}

.menu-item {
    display: flex;
    align-items: center;
    margin: 5px 10px 5px 10px;
    padding: 4px 0;
    cursor: pointer;
    height: 40px;
    border-radius: 20px;
}

.menu-item:hover {
    background-color: #f5f5f5;

}

.isSelect {
    background-color: #f0f0f0;
}

.menu-item-box {
    padding: 0 20px;
    display: flex;
    align-items: center;
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

.c {
    /* border: 1px solid #000; */
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

.main-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20px;
    max-height: calc(100% - 72px);
    height: 100%;
    overflow: auto;
    padding-right: 40px;
}

.main-container .main-item {
    flex: 0 0 20%;
    max-width: calc(20% - 10px);
    padding: 0 5px;
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
}
</style>