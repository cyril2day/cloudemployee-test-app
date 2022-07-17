<script setup lang='ts'>
import { storeToRefs } from 'pinia';
import usePlanStore from '../../stores/plan';
import { data } from '../../stores/sampleData'

const $plan = storeToRefs(usePlanStore())

onBeforeMount(() => {
   usePlanStore().TestGetPlans(data.plans)
})
</script>

<template>
   <div>
      <ul>
         <li v-for='plan in usePlanStore().plans' :key='plan.id'>
            <div>{{ plan.id }}</div>
            <div>{{ plan.name }}</div>
            <div>{{ plan.description }}</div>
            <div>{{ plan.type }}</div>
            <div>{{ plan.status }}</div>
            <ul>
               <li v-for='child in plan.children' :key='child.id'>
                  <div>{{ child.id }}</div>
                  <div>{{ child.name }}</div>
                  <div>{{ child.type }}</div>
                  <ul v-if='child.children'>
                     <li v-for='grandchild in child.children'>
                        <div>{{ grandchild.id }}</div>
                        <div>{{ grandchild.name }}</div>
                        <div>{{ grandchild.type }}</div>
                     </li>
                  </ul>
               </li>
            </ul>
         </li>
      </ul>
   </div>
</template>
