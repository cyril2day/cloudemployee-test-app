export type Plan = {
   id: string
   name: string
   description: string
   status: 'Active' | 'Inactive'
   type: 'Plan' | 'Sub Business Function' | 'Activity'
   children?: PlanChild[]
}

export type PlanChild = Pick<Plan, 'id' | 'name' | 'type' | 'children'>
