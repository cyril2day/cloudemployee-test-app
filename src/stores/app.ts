import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'



type State = {
   showCreatePopup: boolean
}

const useAppStore = defineStore('app', () => {
   const state = reactive<State>({
      showCreatePopup: false
   })


   return {
      ...toRefs(state)
   }
})

export default useAppStore
