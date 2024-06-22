import { defineStore } from 'pinia'

//我的所有笔记
export const managerAllStore = defineStore('managerAll', {
  state: () => {
    return {
        managerAllData: []
    }
  },
  actions: {
    setNoteData(managerAllData) {
      this.managerAllData = managerAllData
    }
  },
  persist: true,
})

//我的已通过笔记
export const managerPassStore = defineStore('managerPass', {
    state: () => {
      return {
          managerPassData: []
      }
    },
    actions: {
      setNoteData(managerPassData) {
        this.managerPassData = managerPassData
      }
    },
    persist: true,
  })


  //我的审核中笔记
export const managerNowStore = defineStore('managerNow', {
    state: () => {
      return {
          managerNowData: []
      }
    },
    actions: {
      setNoteData(managerNowData) {
        this.managerNowData = managerNowData
      }
    },
    persist: true,
  })


  //我的未通过笔记
export const managerNoPassStore = defineStore('managerNoPass', {
    state: () => {
      return {
          managerNoPassData: []
      }
    },
    actions: {
      setNoteData(managerNoPassData) {
        this.managerNoPassData = managerNoPassData
      }
    },
    persist: true,
  })