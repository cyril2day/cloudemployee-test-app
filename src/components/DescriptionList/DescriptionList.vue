<script setup lang='ts'>
import { PropType } from 'vue';
import { deletePlan } from '../../api/plan';
import usePlanStore from '../../stores/plan';
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
   await deletePlan(id)
   .then(res => {
      emit('itemDelete', true)
      console.log(res)
   })
   .catch(err => {
      console.log(err)
   })
}

function getNumOfChild(item: Plan) {
   return usePlanStore().planChildren.filter(child => child.parent === item._id).length 
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
            <div class='list__status-circle'>
               <span class='list__status-child-count'>{{ getNumOfChild(item) }}</span>
            </div>
      </div>
      <div class='list__actions'>
         <div class='list__actions--rest'>
            <button class='list__add-child'><i class="cil-plus"></i></button>
            <button class='list__edit' @click='editPlan(item._id)'><i class="cil-pencil"></i></button>
            <button class='list__delete' @click='removePlan(item._id)'><i class="cil-trash"></i></button>
         </div>
         <div class='list__actions--navigate'>
            <button
               v-if="getNumOfChild(item)"
               class='list__forward'
            >
               <i class="cil-caret-right"></i>
            </button>
         </div>
      </div>
   </dl>
</template>

<style lang='scss' scoped>
@import './styles.scss';

.list__status-circle {
   display: flex;
   align-content: center;
   justify-content: center;
   align-items: center;
   width: 1.1em;
   height: 1.1em;
   background: var(--blue8);
   border-radius: 40px;
   padding: 1px;
}

.list__status-child-count {
   color: var(--background-white);
   font-size: 0.6em;
   font-weight: 600;
   margin: 0;
   padding: 5px 2px;
}

.list__actions {
   button {
      padding: 6px;
      &:active {
         transform: translateY(2px);
         background: #cccdd2f6;
         border-radius: 3px;
      }
      align-self: center;
   }

   i {
      display: flex;
   }
}
</style>
