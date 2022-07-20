<script setup lang='ts'>
import { PropType } from 'vue';
import { Plan } from '../../types/plan';


enum CounterBorderColor {
   'Active' = '#4caf50',
   'Inactive' = '#1e88e5'
}

const props = defineProps({
   plans: {
      type: Object as PropType<Plan[]>,
      required: true,
      default: []
   }
})

const planStates = ref({
   active: 0,
   inactive: 0
})


watchEffect(
   () => {
      planStates.value.active = props.plans.filter(plan => plan.status === 'Active').length
   }
)
</script>

<template>
   <div class='left-filter__wrapper'>
      <div class='left-filter__item--active'>
         <h4>ACTIVE</h4>
         <div
            class='counter'
            :style="{ border: `2px solid ${CounterBorderColor.Active}`}"
         >
            <span>{{ planStates.active }}</span>
         </div>
      </div>
      <div class='left-filter__item--inactive'>
         <h4>INACTIVE</h4>
         <div
            class='counter'
            :style="{ border: `2px solid ${CounterBorderColor.Inactive}`}"
         >
            <span>{{ plans.length - planStates.active }}</span>
         </div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.left-filter__wrapper {
   background: var(--background-white);
   height: 100%;
   display: flex;
   flex-direction: column;

   .left-filter__item--active,
   .left-filter__item--inactive {
      width: 120px;
      height: 150px;
      box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
      margin-bottom: 30px;
   }

   h4 {
      margin: 20px auto;
      text-align: center;
      font-family: 'Rubik-Medium';
      font-size: 0.8em;
   }

   .left-filter__item--active {
      color: var(--green6);
   }

   .left-filter__item--inactive {
      color: var(--blue7);
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
      }
   }
}  
</style>
