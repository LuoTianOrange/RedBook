import { defineStore } from 'pinia'

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
