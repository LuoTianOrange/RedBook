<template>
    <div class="note-flex">
        <div class="note-main">
            <div class="note-image" :style="{backgroundImage:`url(${noteCover})`}"></div>
            <div class="note-main">
                <div class="note-userinfo">
                    <div class="note-useravater"></div>
                    <div class="note-username"></div>
                </div>
                <div class="note-title"></div>
                <div class="note-content"></div>
                <div class="note-date"></div>
            </div>
            <div class="comments">
                <div>共{{ 1 }}条评论</div>
                <div class="comment-item">
                    <div class="comment-avater"></div>
                    <div class="comment-userinfo">
                        <div class="comment-username"></div>
                        <div class="comment-content"></div>
                        <div class="comment-date"></div>
                        <div class="comment-interactions">
                            <div class="like"></div>
                            <div class="collection"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { useNoteStore } from '../../../stores/store'
import { storeToRefs } from 'pinia'
const noteStore = useNoteStore()
const info = ref(null)
onMounted(() => {
    console.log(noteStore.noteData)
    info.value = storeToRefs(noteStore.noteData)
    console.log(info);
})
</script>

<style scoped>
/**笔记 */
@media screen and (max-width: 950px){
    
}
@media screen and (min-width: 950px){
    
}
.note-flex{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.note-main{
    max-width: 1728px;
    min-width: 320px;
    margin: 0 auto;
}

/**评论 */
@media screen and (max-width: 950px){
    
}
@media screen and (min-width: 950px){
    
}

</style>