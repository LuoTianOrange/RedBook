import { defineStore } from 'pinia'

//我的笔记
export const myNoteStore = defineStore('mynote', {
  state: () => {
    return {
      myNoteData: []
    }
  },
  actions: {
    setNoteData(myNoteData) {
      this.myNoteData = myNoteData
    }
  },
  persist: true,
})

//我收藏的笔记
export const myCollectNoteStore = defineStore('myCollectNote', {
  state: () => {
    return {
      myCollectNoteData: []
    }
  },
  actions: {
    setNoteData(myCollectNoteData) {
      this.myCollectNoteData = myCollectNoteData
    }
  },
  persist: true,
})

//我点赞的笔记
export const myLikeNoteStore = defineStore('myLikeNote', {
  state: () => {
    return {
      myLikeNoteData: []
    }
  },
  actions: {
    setNoteData(myLikeNoteData) {
      this.myLikeNoteData = myLikeNoteData
    }
  },
  persist: true,
})


export const userIdStore = defineStore('user',{
  state: () => ({
    userData:[]
  }),
  actions: {

    setUserData(userData) {
      this.userData = userData
      localStorage.setItem('user', userData)
    }, 
  },
  persist:true,
  // setup() {  
  //   // 尝试从localStorage恢复令牌  
  //   const token = localStorage.getItem('user-token')  
  //   if (token) {  
  //     this.token = token  
  //     // 你可以在这里添加逻辑来从服务器获取用户信息（如果需要的话）  
  //   }  
  // },
})

export default userIdStore
