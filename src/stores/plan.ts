import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import { getPlans } from '../api/plan'
import { Plan, PlanChild } from '../types/plan'
import { flatten } from '../utils/helpers'


type PlanOrPlanChild = Array<Plan | PlanChild>

type State = {
   flattenedData: PlanOrPlanChild[]
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
      Fetch: async() => {
         const { data } = await getPlans({ })

         state.flattenedData = flatten(data) as any[]
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
