import { defineStore } from 'pinia'

export const userIdStore = defineStore('user',{
  state: () => ({
    token:'',
    id: '444',
    // isLoggedIn: false, 
  }),
  actions: {

    setId(id) {
      this.id = id
      localStorage.setItem('user', id)
    },
    setToken(token) {  
      this.token = token  
      localStorage.setItem('user-token', token) // 保存到localStorage  
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
