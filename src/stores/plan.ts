import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import { getPlans } from '../api/plan'
import { Plan } from '../types/plan'


type State = {
   plans: Plan[]
}

const usePlanStore = defineStore('plan', () => {
   const state = reactive<State>({
      plans: []
   })

   const actions = {
      TestGetPlans: (plans: any[]) => {
         if (!state.plans.length) {
            plans.forEach(plan => {
               state.plans.push({
                  id: plan.id,
                  name: plan.name,
                  description: plan.description,
                  status: plan.status,
                  type: plan.type,
                  children: plan.children
               })
            })
         }
      },
      GetPlans: async() => {
         const { data: plans } = await getPlans({ })

         plans.forEach((plan: any) => {
            state.plans.push({
               id: plan.id,
               name: plan.name,
               description: plan.description,
               status: plan.status,
               type: plan.type,
               children: plan.children
            })
         })
      }
   }

   return {
      ...toRefs(state),
      ...actions
   }
})

export default usePlanStore
