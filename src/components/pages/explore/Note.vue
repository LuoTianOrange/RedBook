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
                        <div class="rl-center">
                            <img class="note-useravater" :src="noteStore.noteData.avatar" />
                            <div class="note-username">{{ noteStore.noteData.username }}</div>
                        </div>
                        <el-button id="follow-btn" color="#ff2e4d" round>关注</el-button>
                    </div>
                    <div class="note-title">{{ noteData.title }}</div>
                    <div class="note-content">{{ noteData.content }}</div>
                    <div class="note-date">{{ noteData.update_date }}</div>
                </div>
                <div style="margin-left: 15px;margin-bottom: 5px;">共{{ commentStorelenth }}条评论</div>
                <div id="comments">
                    <div v-if="commentStorelenth == 0" style="width: 100%;height: 100%;display: flex;">
                        <div style="margin: auto;color: #999;">这里什么也没有</div>
                    </div>
                    <!--主评论-->
                    <div v-for="i in CSData" :key="i.index" class="comment-item">
                        <div style="display: flex;">
                            <img class="comment-avater" :src="i.comment.avatar" />
                            <div class="comment-userinfo">
                                <div class="comment-username">{{ i.comment.username }}</div>
                                <div class="comment-content">{{ i.comment.comment.content }}</div>
                                <div class="comment-date">{{ formatDate(i.comment.comment.createDate) }}</div>
                                <div class="comment-interactions">
                                    <div class="like">
                                        <i-like style="margin-right: 5px;" theme="outline" size="16" fill="#333" />
                                        {{ i.comment.comment.likeCount }}
                                    </div>
                                    <div class="collection">
                                        <i-comment style="margin-right: 5px;" theme="outline" size="16" fill="#333" />
                                        {{ i.comment.comment.commentTwocount }}
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
                    <div
                        style="display: flex;flex-direction: row-reverse;justify-content: space-between;margin-top: 10px;">
                        <div>
                            <el-button @click="replyinput = ''" round class="button">取消</el-button>
                            <el-button :disabled="!replyinput" type="primary" round @click="send">发送</el-button>
                        </div>
                        <div class="rl-center" style="color: #333;">
                            <div class="rl-center" style="margin-right: 10px;">
                                <i-like style="margin-right: 5px;" theme="outline" size="22" :fill="getFillColor()"  @click="Like"/>
                                {{ noteData.likeCount }}
                            </div>
                            <div class="rl-center">
                                <i-star style="margin-right: 5px;" theme="outline" size="22" :fill="getFillColor2()"  @click="Collect"/>
                                {{ noteData.collectionCount }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue';
import { useCommentStore, useNoteStore } from '../../../stores/store'
import { LikeNoteStore } from '../../../stores/like';
import { storeToRefs } from 'pinia'
import axios from 'axios'

const user = ref(null)
const likeNoteStore = LikeNoteStore()
const likeNoteData = ref([])
const likeStatus =ref(false)
const note = ref(null)
const storedUser = localStorage.getItem('note')
note.value = JSON.parse(storedUser)
// likeStatus.value = note.value.


const likenote = ref(null)
const storedNote = localStorage.getItem('likeNote')
likenote.value = JSON.parse(storedNote)


function getFillColor(likeStatus) {
    if (likeStatus === true) {
        return 'red';
    } else {
        return 'red';
    }
}

function getFillColor2() {
    return 'yellow';
}

const like_id = ref()

function Like() {
        likeStatus === true;
        axios.post(`/api/like/addLikeWithNote/${user.value.userData.id}/${noteData.value.id}`)
            .then((response) => {
                if (response.status == 200) {
                    axios.get(`/api/note/noteDetail/${noteData.value.id}`)
                        .then((response) => {
                            noteStore.setNoteData(response.data.data)
                        }).catch((error) => {
                            console.error(error)
                        })
                }
            }).catch((error) => {
                console.error(error)
            }) 
}

const noteStore = useNoteStore()
const noteData = ref([]);

const commentStore = useCommentStore()
const commentData = ref([])
let commentStorelenth = ref(0)


let info = ref(null)
let isLoading = ref(true)

let CSData = ref([])

//图片预览
const srcList = ref([])
//发送请求

onMounted(async () => {

    //获取笔记数据
    noteData.value = noteStore.noteData.note;
    info.value = storeToRefs(noteStore.noteData.note)
    likeStatus.value = storeToRefs(noteStore.noteData.note.likeStatus)
    //获取评论数据
  
    //处理评论时间

    axios.get(`/api/comment/commentList/${noteData.value.id}`)
        .then((response) => {
            commentData.value = response.data.data
        }).catch((error) => {
            console.error(error)
        })
    //获取评论长度
    watchEffect(() => {
        commentStorelenth.value = commentData.value.length;
    });
    //将封面数据传入图片预览数值
    srcList.value.push(noteData.value.noteCover)

    //处理评论数据，分离主评论和回复评论
    watchEffect(() => {
        let convertedCommentData = commentData.value.map(item => {
            return {
                ...item,
                comment: {
                    ...item.comment,
                    noteId: parseInt(item.comment.noteId),
                    replyUid: parseInt(item.comment.replyUid)
                }
            };
        });
        let mainComments = convertedCommentData.filter(item => item.comment.replyUid <= 0);
        let replyComments = convertedCommentData.filter(item => item.comment.replyUid > 0);
        console.log("mainComments:", mainComments, "replyComments:", replyComments);
        CSData.value = mainComments.map(mainComment => {
            return {
                comment: mainComment,
                sub_reply: replyComments.filter(replyComment => replyComment.comment.replyUid === mainComment.comment.noteId)
            };
        });
    });


    
    const storedNote = localStorage.getItem('user')
    user.value = JSON.parse(storedNote)
    axios.get(`/api/like/getLikeInform/${user.value.userData.id}`)
        .then((response) => {
            likeNoteStore.setNoteData(response.data.data)
            const likes = response.data.data; 
            const filteredLikes = likes.filter(like => like.value.likeRecord.dzId === noteData.value.id); 
            likeNoteData.value = filteredLikes
        }).catch((error) => {
            console.error(error)
        })

    isLoading.value = false
})
//去除时间中间的T字符并替换成空格
const formatDate = (dateString) => {
  if (dateString === undefined) {
    return "";
  }
  return dateString.replace("T", " ");
}
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
    min-width: 400px;
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
    justify-content: space-between;
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

#comments {
    /* margin: 15px; */
    margin: 10px 15px auto 15px;
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

#follow-btn {
    width: 96px !important;
    font-weight: bolder !important;
}
</style>