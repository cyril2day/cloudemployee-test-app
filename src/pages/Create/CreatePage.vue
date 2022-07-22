<script setup lang='ts'>
import { storeToRefs } from 'pinia';
import { createPlan } from '../../api/plan';
import CreateForm from '../../components/CreateForm/CreateForm.vue'
import usePlanStore from '../../stores/plan';
import { Plan } from '../../types/plan';
import { NewPlan, newPlanDefaultValue } from './create'


const MIN_DESKTOP_WIDTH = 1024
const router = useRouter()
const { plans } = storeToRefs(usePlanStore())

const newPlan = ref<NewPlan>({ ...newPlanDefaultValue })
const { width } = useWindowSize()

async function onFormSubmit(event: Pick<Plan, 'name' | 'type'>) {
   newPlan.value = { ...newPlan.value, name: event.name, type: event.type }

   await createPlan(newPlan.value)
   .then(res => {
      plans.value = res.data

      newPlan.value = { ...newPlanDefaultValue }
   })
   .catch(err => {
      console.error(err)
   })

   router.push({ name: 'PlanList' })
}

function handleOnNameChanged(name: string) {
   newPlan.value.name = name
}

watchEffect(() => {
   if (width.value > MIN_DESKTOP_WIDTH)
      router.push({ name: 'PlanList' })
})
</script>

<template>
   <div class='create-form__wrapper'>
      <create-form form-type='Plan' @formSubmit='onFormSubmit' @on-name-changed='handleOnNameChanged'>
         <!-- Form Header -->
         <template #form-header>
            <h3>Create Plan</h3>
         </template>

         <!-- Form Contents -->
         <div class='form-item'>
            <label for='description'>Description</label>
            <input v-model='newPlan.description' type='text' name='description' id='description'/>
         </div>

         <div class='form-item'>
            <label for='status'>Status</label>
            <select v-model='newPlan.status' name='status' id='status'>
               <option value='Active'>Active</option>
               <option value='Inactive'>Inactive</option>
            </select>
         </div>

         <div v-if="newPlan.name.length > 5" class='form-item'>
            <label for='review-date'>Review Date</label>
            <input
               v-model='newPlan.reviewDate'
               type='date'
               id='review-date'
               name='review-date'
            />
         </div>

         <!-- Form Actions -->
         <template #form-actions></template>
      </create-form>
   </div>
</template>

<style lang="scss" scoped>
.create-form__wrapper {
   display: block;
   height: 90vh;
   background: var(--background-white);
} 
</style>
