import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'



type State = {
   showCreatePopup: boolean
   filterType: 'Active' | 'Inactive'
}

const useAppStore = defineStore('app', () => {
   const state = reactive<State>({
      showCreatePopup: false,
      filterType: 'Active'
   })


   return {
      ...toRefs(state)
   }
})

export default useAppStore
