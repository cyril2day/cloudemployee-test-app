export type Plan = {
   id: string
   name: string
   description: string
   status: 'Active' | 'Inactive'
   type: 'Plan'
   children?: SubBusinessFunction[]
}

export type PlanChild = Pick<Plan, 'id' | 'name'> & 
   {
      parentId: string
      type: 'Sub Business Function' | 'Activity'
   }
