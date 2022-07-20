<script setup lang='ts'>
import { PropType } from 'vue';
import { deletePlan } from '../../api/plan';
import { Plan } from '../../types/plan';

const props = defineProps({
   data: {
      type: Array as PropType<Plan[]>,
      default: []
   }
})

async function removePlan(id: string) {
   await deletePlan(id)
   .then(res => {
      console.log(res)
   })
   .catch(err => {
      console.log(err)
   })
}
</script>

<template>
   <dl
      class="list__wrapper"
      v-for="(item, index) in props.data"
      :key="index"
   >
      <div class='list__items'>
         <template v-if="item && typeof item === 'object'">
            <slot :val="item" />
         </template>
      </div>

      <div class='list__status-indicator'>
         <div>
            <i class="cib-discover"></i>
         </div>
      </div>
      <div class='list__actions'>
         <button class='list__delete' @click='removePlan(item._id)'>Delete</button>
      </div>
   </dl>
</template>

<style lang='scss' scoped>
@import './styles.scss';
</style>
