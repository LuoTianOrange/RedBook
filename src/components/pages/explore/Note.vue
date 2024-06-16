<template>
    <div class="note-flex" v-if="!isLoading">
        <div class="note-main">
            <div class="note-left">
                <!-- <div class="note-image" :style="{ backgroundImage: `url(${i.noteCover})` }"></div> -->
                <el-image class="note-image" :src="noteData.noteCover" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                    :preview-src-list="srcList" :initial-index="1" fit="contain" />
            </div>
            <div class="note-right">
                <div class="note-right-main">
                    <div class="note-userinfo">
                        <img class="note-useravater" :src="noteData.avatar" />
                        <div class="note-username">{{ noteData.username }}</div>
                    </div>
                    <div class="note-title">{{ noteData.title }}</div>
                    <div class="note-content">{{ noteData.content }}</div>
                    <div class="note-date">{{ noteData.update_date }}</div>
                </div>
                <div style="margin-left: 15px;margin-bottom: 5px;">共{{ commentStorelenth }}条评论</div>
                <div class="comments">
                    <div v-for="i in CSData" :key="i.index" class="comment-item">
                        <div style="display: flex;">
                            <img class="comment-avater" :src="i.comment.avatar" />
                            <div class="comment-userinfo">
                                <div class="comment-username">{{ i.comment.username }}</div>
                                <div class="comment-content">{{ i.comment.content }}</div>
                                <div class="comment-date">{{ i.comment.create_date }}</div>
                                <div class="comment-interactions">
                                    <div class="like">
                                        <i-like style="margin-right: 5px;" theme="outline" size="16" fill="#333" />
                                        {{ i.comment.like_count }}
                                    </div>
                                    <div class="collection">
                                        <i-comment style="margin-right: 5px;" theme="outline" size="16" fill="#333" />
                                        {{ i.comment.comment_twocount }}
                                    </div>
                                </div>
                                <!--回复-->
                                <div class="reply-item">
                                    <div v-for=" (k, index) in i.sub_reply" :key="index" class="comment-reply">
                                        <img class="comment-avater" :src="k.avatar" style="width: 30px;height: 30px;" />
                                        <div class="comment-userinfo">
                                            <div class="comment-username">{{ k.username }}</div>
                                            <div class="comment-content">{{ k.content }}</div>
                                            <div class="comment-date">{{ k.create_date }}</div>
                                            <div class="comment-interactions rl-center">
                                                <div class="like">
                                                    <i-like style="margin-right: 5px;" theme="outline" size="16"
                                                        fill="#333" />
                                                    <div>{{ k.like_count }}</div>
                                                </div>
                                                <div class="collection">
                                                    <i-comment style="margin-right: 5px;" theme="outline" size="16"
                                                        fill="#333" />
                                                    <div>回复</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="replybox">
                    <el-input v-model="replyinput"></el-input>
                    <div style="display: flex;flex-direction: row-reverse;margin-top: 10px;">
                        <el-button @click="replyinput = ''" round class="button">取消</el-button>
                        <el-button :disabled="!replyinput" type="primary" :icon="Edit" round>发送</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useCommentStore, useNoteStore } from '../../../stores/store'
import { storeToRefs } from 'pinia'
import { Edit } from '@element-plus/icons-vue'
import axios from 'axios'
const noteStore = useNoteStore()
const noteData = ref(null);
let commentStore;
const tempStore = ref([{
    "id": -458280468,
    "user_id": -165623116,
    "title": "我是标题",
    "content": "文字是人类用符号记录表达信息以传之久远的方式和工具。现代文字大多是记录语言的工具。人类往往先有口头的语言后产生书面文字，很多小语种，有语言但没有文字。文字的不同体现了国家和民族的书面表达的方式和思维不同。文字使人类进入有历史记录的文明社会。",
    "noteCover": "/images/20231029_124802_waifu2x_2x_2n_jpg.png",
    "type": "id ea tempor reprehenderit do",
    "urls": "Excepteur laborum enim dolore",
    "picture_count": -253759575,
    "like_count": 587561824,
    "like_status": false,
    "collection_status": true,
    "collection_count": -1308163117,
    "comment_count": -401467102,
    "update_date": "2021-09-29",
    "avatar": "/images/userheader.png",
    "username": "小红薯664D4ED4"
},])


let commentStorelenth = ref(0)


let info = ref(null)
let isLoading = ref(true)

let CSData = ref([])

//图片预览
const srcList = ref([])

onMounted(() => {

    //获取数据
    noteData.value = noteStore.noteData;
    commentStore = useCommentStore(noteData.id)
    console.log("commentStore:", commentStore);
    console.log("noteData:", noteData)
    console.log("noteData.value.id:", noteData.value.id)
    info.value = storeToRefs(noteStore.noteData)
    isLoading.value = false
    
    if (noteData.value.id) {
        commentStore.getCommentData(noteData.value.id);
    }

    commentStorelenth.value = commentStore.length
    //将封面数据传入图片预览数值
    srcList.value.push(noteData.value.noteCover)

    // CSData.value = commentStore.value.map(item => {
    //     if (item.reply_id <= 0) {
    //         return {
    //             comment: item,
    //             sub_reply: commentStore.value.filter(subItem => subItem.reply_id === item.id)
    //         };
    //     }
    // }).filter(item => item !== undefined);

})

//回复框
const replyinput = ref('')

</script>

<style scoped>
/**笔记 */
@media screen and (max-width: 950px) {
    .note-main {}
}

@media screen and (min-width: 950px) {
    .note-main {
        max-height: calc(100vh - 100px);
    }
}

.note-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.note-main {
    max-width: 1728px;
    min-width: 320px;
    height: 100%;
    margin: auto;
    display: flex;
    padding: 0 30px;

}

.note-left {
    max-width: 1000px;
    border-radius: 12px 0 0 12px;
    overflow: hidden;
    background: #f7f7f7;
    padding: 30px 0;
    border: 1px solid #ebebeb;
}

.note-right {
    min-width: 300px;
    max-width: 420px;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 0 12px 12px 0;
    border: 1px;
    border-style: solid solid solid none;
    border-color: #ebebeb;
}

.note-right-main {
    display: flex;
    flex-direction: column;
    padding: 15px;
}

.note-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    position: relative;
}

.note-useravater,
.comment-avater {
    height: 50px;
    width: 50px;
    border: 1px solid #ebebeb;
    border-radius: 50%;
    margin-right: 10px;
}

.note-userinfo,
.comment-userinfo {
    display: flex;
    align-items: center;
    flex-direction: row;
}

.note-username,
.comment-username {}

.note-title {
    margin-top: 20px;
    font-weight: bolder;
}

.note-content {
    margin-top: 10px;
}

.note-date,
.comment-date {
    padding: 8px 0;
    color: #999;
    font-size: 14px;
    border-bottom: 1px solid #ebebeb;
}

/**评论 */
@media screen and (max-width: 950px) {
    .note-flex {
        height: calc(100vh - 110px);
    }
}

@media screen and (min-width: 950px) {}

.comments {
    margin: 15px;
    overflow: overlay;
}

.comment-item,
.comment-reply {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
}

.comment-userinfo {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-left: 10px;
}

.comment-date {
    border-bottom: none !important;
}

.like,
.collection {
    font-size: 16px;
    color: #333;
    display: flex;
    align-items: center;
    margin-right: 10px;
}

.comment-interactions {
    display: flex;
}

.reply-item {
    display: flex;
    flex-direction: column;
}

.replybox {
    border: 1px solid #ebebeb;
    padding: 10px;
    background: #f7f7f7;
}

:deep(.el-button) {
    height: 40px !important;
    width: 64px !important;
}

.button {
    margin-left: 10px;
}
</style>