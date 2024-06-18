<template>
    <div class="note-flex" v-if="!isLoading">
        <div class="note-main">
            <div class="note-image" :style="{backgroundImage:`url(${noteData.noteCover})`}"></div>
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
import { useRoute } from 'vue-router'

const noteStore = useNoteStore()
const noteData = ref(null)
const route = useRoute()

let isLoading = ref(true)

onMounted(async () => {
    const id = route.params.id
    noteData.value = await noteStore.getNoteData(id)
    isLoading = false
    console.log("noteData:", noteData.value)
})
</script>