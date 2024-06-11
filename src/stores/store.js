import { defineStore } from 'pinia'

export const useNoteStore = defineStore('note',{
  state: () => ({
    noteData: null

  }),
  actions: {
    setNoteData(noteData) {
      this.noteData = noteData
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
