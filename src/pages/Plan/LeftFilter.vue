<script setup lang='ts'>
import { PropType } from 'vue';
import { Plan } from '../../types/plan';


const emit = defineEmits(['filterType'])

enum CounterBorderColor {
   'Active' = '#4caf50',
   'Inactive' = '#1e88e5'
}

enum PlanStatus {
   'Active' = 'Active',
   'Inactive' = 'Inactive'
}

const props = defineProps({
   plans: {
      type: Object as PropType<Plan[]>,
      required: true,
      default: []
   }
})

const filter = ref({ active: true, inactive: false })

const planStates = ref({ active: 0, inactive: 0 })


function handleSelectedFilterType(type: string) {

   if (type === PlanStatus.Active)
      filter.value.active = true, filter.value.inactive = false
   else
      filter.value.inactive = true, filter.value.active = false

   emit('filterType', type)
}

watchEffect(
   () => {
      planStates.value.active = props.plans.filter(plan => plan.status === 'Active').length
   }
)
</script>

<template>
   <div class='left-filter__wrapper'>
      <div
         class='left-filter__item--active'
         :class="{ active: filter.active }"
         @click='handleSelectedFilterType(PlanStatus.Active)'
      >
         <h4>ACTIVE</h4>
         <div class='counter'>
            <span>{{ planStates.active }}</span>
         </div>
      </div>
      <div
         class='left-filter__item--inactive'
         :class="{ active: filter.inactive }"
         @click="handleSelectedFilterType(PlanStatus.Inactive)"
      >
         <h4>INACTIVE</h4>
         <div class='counter'>
            <span>{{ plans.length - planStates.active }}</span>
         </div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.active {
   background: #fff; 
}

.left-filter__wrapper {
   display: flex;
   justify-content: flex-end;
   font-size: 0.8em;
}

.left-filter__item--inactive,
.left-filter__item--active {
   cursor: pointer;
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 120px; 
   border: 1px solid #fff;
   border-radius: 5px;

   h4, div {
      display: inline-block;
      margin: 5px;
   }

   div {
      border: none;
      width: 10px;
      height: 14px;
      border-radius: 20px;
      padding: 2px;
   }
   span {
      font-size: 0.8em;
   }
}

@media screen and (min-width: $sm) {
   .left-filter__wrapper {
      background: var(--background-white);
      height: 100%;
      display: flex;
      flex-direction: column;

      .left-filter__item--active,
      .left-filter__item--inactive {
         flex-direction: column;
         align-items: center;
         justify-content: center;
         width: 120px;
         height: 150px;
         box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
         margin-bottom: 18px;
      }

      h4 {
         margin: 20px auto;
         text-align: center;
         font-family: 'Rubik-Medium';
         font-size: 0.8em;
      }

      .counter {
         display: flex;
         width: 40px;
         height: 40px;
         margin: 0px auto;
         border-radius: 40px;

         justify-content: center;
         align-items: center;

         span {
            color: var(--dark);
            font-family: 'Rubik-Light';
            font-size: 0.8em;
            font-weight: 600;
         }
      }
   }  
}
</style>
