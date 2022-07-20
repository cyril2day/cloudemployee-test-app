import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import { getPlans } from '../api/plan'
import { Plan, PlanChild } from '../types/plan'
import { flatten } from '../utils/helpers'


export type PlanOrPlanChild = Array<Plan | PlanChild>

type State = {
   flattenedData: PlanOrPlanChild
   plans: Plan[]
   planChildren: PlanChild[]
}

const usePlanStore = defineStore('plan', () => {
   const state = reactive<State>({
      flattenedData: [],
      plans: [],
      planChildren: [],
   })

   const actions = {
      Fetch: async() => {
         const { data } = await getPlans({ })
         
         if (Array.isArray(data) && data.length) {
            state.flattenedData = flatten(data) as any[]
         } else {
            throw Error('invalid data')
         }
      },
      GetPlans: (items: PlanOrPlanChild) => {
         const plans = items.filter((item): item is Plan => item.type === 'Plan')

         state.plans = plans
      },
      GetPlanChildren: (items: PlanOrPlanChild) => {
         const planChildren = items.filter((item): item is PlanChild => (item.type === 'Activity' || item.type === 'Sub Business Function'))

         state.planChildren = planChildren
      }
   }

   return {
      ...toRefs(state),
      ...actions
   }
})

export default usePlanStore
