<script setup lang='ts'>
import { PropType } from 'vue';
import { deletePlan } from '../../api/plan';
import { Plan } from '../../types/plan';

const emit = defineEmits(['itemDelete'])
const props = defineProps({
   data: {
      type: Array as PropType<Plan[]>,
      default: []
   }
})


async function editPlan(id: string) {
   console.log(id)
}

async function removePlan(id: string) {
   /*
   await deletePlan(id)
   .then(res => {
      emit('itemDelete', true)
      console.log(res)
   })
   .catch(err => {
      console.log(err)
   })
   */
}

function colorInactive(item: any) {
   if (item.status === 'Inactive')
      return 'var(--error)'
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
            <i class="cib-discover" :style="{ color: colorInactive(item) }"></i>
         </div>
      </div>
      <div class='list__actions'>
         <button class='list__edit' @click='editPlan(item._id)'><i class="cil-pencil"></i></button>
         <button class='list__delete' @click='removePlan(item._id)'><i class="cil-trash"></i></button>
      </div>
   </dl>
</template>

<style lang='scss' scoped>
@import './styles.scss';
</style>
