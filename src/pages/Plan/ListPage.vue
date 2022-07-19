<script setup lang='ts'>
import { storeToRefs } from 'pinia';
import DescriptionList from '../../components/DescriptionList/DescriptionList.vue';
import DescriptionListItem from '../../components/DescriptionList/DescriptionListItem.vue';
import usePlanStore from '../../stores/plan';


const { plans, flattenedData } = storeToRefs(usePlanStore())
const plansData = computed(() => plans.value)

onBeforeMount(async() => {
   await usePlanStore().Fetch()
   .then(() => {
      usePlanStore().GetPlans(flattenedData.value)
      usePlanStore().GetPlanChildren(flattenedData.value)
   })
})
</script>

<template>
   <div class='plan-list__wrapper'>
      <section class='plan-list__header'>
         <div class='plan-list__header-label'>
            <h3>Plan</h3>
            <p>Active Plans</p>
         </div>
         <div class='plan-list__search-wrapper'>
            <input />
         </div>
      </section>

      <section class='plan-list__left-section'>LEFT FILTER</section>

      <section class='plan-list__content'>
         <description-list :data='plansData'>
            <template v-slot="{ val }">
               <description-list-item label='ID' :value="val['_id']" :width="220"/>
               <description-list-item label='Name' :value="val['name']" />
               <description-list-item label='Description' :value="val['description']" :width="240" />
               <description-list-item label='Type' :value="val['type']" />
               <description-list-item label='Status' :value="val['status']" />
            </template>
         </description-list>
      </section>
   </div>
</template>

<style lang="scss" scoped>
.plan-list__wrapper {
   display: grid;
   grid-template-columns: repeat(12, 1fr);
   grid-template-rows: repeat(10, 1fr);
   height: 92vh;
   gap: 2px;
   background: var(--background-white);
   overflow-x: auto;
}

.plan-list__header {
   grid-column: span 13;
   display: flex;
   height: 80px;
   justify-content: space-between;
   margin: 10px 20px;
}

.plan-list__header-label {
   display: flex; 
   flex-direction: column;
   justify-content: space-evenly;

   * {
      margin: 0;
      padding: 0;
   }

   p {
      font-size: 0.9em;
   }
}

.plan-list__search-wrapper {
   display: flex;

   input {
      align-self: center;
      height: 30px;
   }
}

.plan-list__left-section {
   display: none;
} 

.plan-list__content {
   grid-column: span 13;
   margin: 10px 20px;
}

@media screen and (min-width: $sm) {
   .plan-list__left-section {
      display: block;
      grid-column: 1/3;
      grid-row: 1/10;
   }

   .plan-list__content {
      grid-column: 3/13;
      grid-row: 2/10;
      margin-right: 40px;
   }

   .plan-list__header {
      grid-column: 3/13;
      grid-row: 1/2;
      margin-right: 40px;
   }

   .plan-list__header-label {
      p {
         font-size: 1em;
      }
   }
}
</style>
