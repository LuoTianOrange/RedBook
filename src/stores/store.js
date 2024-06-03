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

export default useNoteStore
