import { Plan } from "../../types/plan"
import { getFormattedDate } from "../../utils/helpers"


export type NewPlan = Omit<Plan, '_id'> & { reviewDate?: any }

const today = ref(new Date())
export const newPlanDefaultValue: NewPlan = {
   name: '',
   description: '',
   type: 'Plan',
   status: 'Active',
   reviewDate: getFormattedDate(today.value)
}
