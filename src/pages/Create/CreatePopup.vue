<script setup lang='ts'>
import { createPlan } from '../../api/plan';
import CreateForm from '../../components/CreateForm/CreateForm.vue';
import useAppStore from '../../stores/app';
import { Plan } from '../../types/plan';
import { NewPlan, newPlanDefaultValue } from './create'


const emit = defineEmits(['createSuccess'])
const props = defineProps({
   show: {
      type: Boolean,
      default: false
   }
})

const shown = ref(false)
const data = ref<NewPlan>({ ...newPlanDefaultValue })


function handleClose() {
   shown.value = false
   useAppStore().showCreatePopup = false
}

function handleOnNameChanged(name: string) {
   data.value.name = name
}

onKeyStroke('Escape', () => { handleClose() })

async function onFormSubmit(event: Pick<Plan, 'name' | 'type'>) {
   data.value = { ...data.value, name: event.name, type: event.type }

   await createPlan(data.value)
   .then(res => {
      console.log(res)
      emit('createSuccess', res.data)
   })
   .catch(err => {
      console.error(err)
   })
}

watch(
   () => props.show,
   () => { shown.value = props.show }
)
</script>

<template>
   <div v-if='shown' class='create__popup'>
      <div class='create__popup--close'>
         <button @click='handleClose'><i class='cil-x'></i></button>
      </div>

      <div class='create__form'>

         <create-form
            form-type='Plan'
            @formSubmit='onFormSubmit'
            @on-name-changed='handleOnNameChanged'
         >
            <div class='form-item'>
               <label for='description'>Description</label>
               <input
                  v-model='data.description'
                  type='text'
                  name='description'
                  id='description'
               />
            </div>

            <div class='form-item'>
               <label for='status'>Status</label>
               <select v-model='data.status' name='status' id='status'>
                  <option value='Active'>Active</option>
                  <option value='Inactive'>Inactive</option>
               </select>
            </div>

            <div v-if="data.name.length > 5" class='form-item'>
               <label for='review-date'>Review Date</label>
               <input
                  v-model='data.reviewDate'
                  type='date'
                  id='review-date'
                  name='review-date'
               />
            </div>
         </create-form>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.create__popup {
   position: absolute;
   z-index: 999;
   background: rgba(black, 0.5);
   height: 100%;
   width: 100%;
   top: 0;
   left: 0;
} 

.create__form {
   z-index: 999;
   width: 60vw;
   height: 50vh;
   margin: 50px auto;
   background: var(--white);
   padding: 24px;
   border-radius: 10px;
   margin-top: 10px;
}

.create__popup--close {
   display: flex;
   justify-content: flex-end;

   button {
      background: rgba(black, 0.3);
      color: var(--white);
      display: flex;
      align-content: center;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border: none;
      font-size: 1.5em;
      border-radius: 25px;
      width: 50px;
      height: 50px;
      padding: 0;
      margin: 8px;
      

      &:hover {
         background: #d1d4daef;
         color: var(--dark);
      }
   }
}
</style>
