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
            <div style="max-height: calc(100vh - 200px);overflow: auto;">
                <div class="main-container-flex">
                    <div class="main-container" v-for="list in groupedItems">
                        <div class="main-item" v-for="info in list">
                            <div class="main-item-top">
                                <img style="object-fit: cover;width: 100%;" :src="info.note_cover">
                            </div>
                            <div class="main-item-bottom">
                                <span style="margin-bottom: 8px;">{{ info.title }}</span>
                                <div style="display: flex;justify-content: space-between;margin-top: 8px;">
                                    <div style="display: flex;align-items: center;">
                                        <img style="margin-right: 5px;border-radius: 50%;width: 25px;height: 25px;overflow: hidden;"
                                            src="/images/imageMogr2.png" />
                                        <span>杰瑞</span>
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
import { computed, ref } from 'vue'

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

const item_group = ref([
    {
        id: 1,
        title: "大家有没有烧钱且小众的爱好😱",
        note_cover: "/images/imageMogr1.png",
    },
    {
        id: 2,
        title: "大家有没有烧钱且小",
        note_cover: "/images/imageMogr4.png",
    },
    {
        id: 1,
        title: "大家有没有烧钱且小众的爱好😱",
        note_cover: "/images/imageMogr1.png",
    },
    {
        id: 2,
        title: "大家有没有烧钱且小",
        note_cover: "/images/imageMogr4.png",
    },
    {
        id: 1,
        title: "大家有没有烧钱且小众的爱好😱",
        note_cover: "/images/imageMogr1.png",
    },
    {
        id: 2,
        title: "大家有没有烧钱且小",
        note_cover: "/images/imageMogr4.png",
    },
    {
        id: 1,
        title: "大家有没有烧钱且小众的爱好😱",
        note_cover: "/images/imageMogr1.png",
    },
    {
        id: 2,
        title: "大家有没有烧钱且小",
        note_cover: "/images/imageMogr4.png",
    },
    {
        id: 1,
        title: "大家有没有烧钱且小众的爱好😱",
        note_cover: "/images/imageMogr1.png",
    },
    {
        id: 2,
        title: "大家有没有烧钱且小",
        note_cover: "/images/imageMogr4.png",
    },
    {
        id: 1,
        title: "大家有没有烧钱且小众的爱好😱",
        note_cover: "/images/imageMogr1.png",
    },
    {
        id: 2,
        title: "大家有没有烧钱且小",
        note_cover: "/images/imageMogr4.png",
    },
    {
        id: 1,
        title: "大家有没有烧钱且小众的爱好😱",
        note_cover: "/images/imageMogr1.png",
    },
    {
        id: 2,
        title: "大家有没有烧钱且小",
        note_cover: "/images/imageMogr4.png",
    },
    {
        id: 1,
        title: "大家有没有烧钱且小众的爱好😱",
        note_cover: "/images/imageMogr1.png",
    },
    {
        id: 2,
        title: "大家有没有烧钱且小",
        note_cover: "/images/imageMogr4.png",
    },
    {
        id: 1,
        title: "大家有没有烧钱且小众的爱好😱",
        note_cover: "/images/imageMogr1.png",
    },
    {
        id: 2,
        title: "大家有没有烧钱且小",
        note_cover: "/images/imageMogr4.png",
    },
])

const groupedItems = computed(() => {
    let groups = [];

    // 每组元素数
    let groupSize = 3;

    if (groups.length % 2 == 0 && groups.length % 3 == 0) {
        groupSize = 3;
    } else if (groups.length % 2 == 0 && groups.length % 3 != 0) {
        groupSize = 2;
    }
    for (let i = 0; i < item_group.value.length; i += groupSize) {
        groups.push(item_group.value.slice(i, i + groupSize));
    }
    return groups;
})
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

/* 菜单*/
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