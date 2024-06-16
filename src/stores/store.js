import { defineStore } from 'pinia'
import axios from 'axios'
export const useNoteStore = defineStore('note', {
  state: () => {
    return {
      noteData: null
    }
  },
  actions: {
    setNoteData(noteData) {
      this.noteData = noteData
    }
  },
  persist: true,
})

export const useCommentStore = defineStore('comment', {
  state: () => {
    return {
      commentData: null
    }
  },
  actions: {
    getCommentData(note_id) {
      axios.get(`/api/comment/commentList/${note_id}`)
        .then(res => {
          this.commentData = res.data
          console.log("res.data：",res.data);
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})

export const loginStateStore = defineStore('loginState', {
  state: () => ({
    isLogin: false
  }),
  actions: {
    setLoginState(isLogin) {
      this.isLogin = isLogin
    }
  }
})

export default useNoteStore
