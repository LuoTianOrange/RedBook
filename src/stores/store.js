import { defineStore } from 'pinia'
import axios from 'axios'

export const useNoteStore = defineStore('note', {
  state: () => {
    return {
      noteData: []
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
      commentData: []
    }
  },
  actions: {
    // getCommentData(note_id) {
    //   console.log("note_id:",note_id);
    //   axios.get(`/api/comment/commentList/${note_id}`)
    //     .then(res => {
    //       this.commentData = res.data
    //       console.log("commentData:",this.commentData);
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
    setCommentData(commentData) {
      this.commentData = commentData
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
