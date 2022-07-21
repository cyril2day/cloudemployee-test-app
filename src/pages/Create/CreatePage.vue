<script setup lang='ts'>
import { createPlan } from '../../api/plan';
import CreateForm from '../../components/CreateForm/CreateForm.vue'
import { Plan } from '../../types/plan';
import { getFormattedDate } from '../../utils/helpers';


type NewPlan = Omit<Plan, '_id'> & { reviewDate?: any }

const breakpoints = useBreakpoints({ laptop: 1024 })
const router = useRouter()

const today = ref(new Date())
const newPlan = ref<NewPlan>({
   name: '',
   description: '',
   type: 'Plan',
   status: 'Active',
   reviewDate: getFormattedDate(today.value)
})

async function onFormSubmit(event: Pick<Plan, 'name' | 'type'>) {
   newPlan.value = { ...newPlan.value, name: event.name, type: event.type }

   await createPlan(newPlan.value)
   .then(res => {
      console.log(res)
   })
   .catch(err => {
      console.error(err)
   })
}

function handleOnNameChanged(name: string) {
   newPlan.value.name = name
}

onMounted(() => {
   if (breakpoints.greater('laptop').value) {
      router.push('PlanList')
   }
})
</script>

<template>
   <div class='create-form__wrapper'>
      <create-form @formSubmit='onFormSubmit' @on-name-changed='handleOnNameChanged'>
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
