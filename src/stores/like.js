import { defineStore } from 'pinia'

//我的所有笔记
export const LikeNoteStore = defineStore('likeNote', {
  state: () => {
    return {
        likeNoteData: []
    }
  },
  actions: {
    setNoteData(likeNoteData) {
      this.likeNoteData = likeNoteData
    }
  },
  persist: true,
})