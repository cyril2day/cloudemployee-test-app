import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'



type State = {
   showCreatePopup: boolean
   searchInput: string
   filterType: 'Active' | 'Inactive'
}

const useAppStore = defineStore('app', () => {
   const state = reactive<State>({
      showCreatePopup: false,
      searchInput: '',
      filterType: 'Active'
   })


   return {
      ...toRefs(state)
   }
})

export default useAppStore
