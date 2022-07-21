<script setup lang='ts'>
import { storeToRefs } from 'pinia';
import DescriptionList from '../../components/DescriptionList/DescriptionList.vue';
import DescriptionListItem from '../../components/DescriptionList/DescriptionListItem.vue';
import CreatePopup from '../Create/CreatePopup.vue'
import LeftFilter from './LeftFilter.vue'
import usePlanStore from '../../stores/plan';
import { Plan } from '../../types/plan';
import useAppStore from '../../stores/app';


const { plans, flattenedData, planChildren } = storeToRefs(usePlanStore())
const { showCreatePopup } = storeToRefs(useAppStore())

const filteredPlans = ref<Plan[]>([]),
   filterType = ref('Active')

const searchText = ref('')

const searchInputEl = ref<HTMLInputElement | null>(null)

async function onSearch() {
   filteredPlans.value = 
      plans.value.filter(plan => {
         return plan.status === filterType.value &&
            plan.name.toLowerCase().includes(searchText.value.toLowerCase())
      })
}

async function onItemDelete(event: boolean) {
   if (event) {
      await Fetch()

      filteredPlans.value = plans.value
   }
}

async function Fetch() {
   try {
      await usePlanStore().Fetch()

      usePlanStore().GetPlans(flattenedData.value)
      usePlanStore().GetPlanChildren(flattenedData.value)
   } catch {
   }

}

function handleFilterType(type: string) {
   filterType.value = type
}

function onCreateSuccess(event: any) {
   if (event.errors) return

   const { children, ...restOfProps } = event

   if (event.type === 'Plan') {
      plans.value.push(restOfProps) 
   } else {
      planChildren.value.push(restOfProps)
   }

   showCreatePopup.value = false
}

onBeforeMount(async() => { await Fetch() })


watchEffect(
   () => {
      if (plans.value.length)
         filteredPlans.value = plans.value.filter(plan => plan.status === filterType.value)
   }
)

watch(
   () => filterType.value,
   () => {
      searchText.value = ''
      if (searchInputEl.value)
         searchInputEl.value.focus()
   }
)
</script>

<template>
   <div class='plan-list__wrapper'>
      <section class='plan-list__header'>
         <div class='plan-list__header-label'>
            <h3>Plan</h3>
            <p>{{ filterType }} Plans</p>
         </div>
         <div class='plan-list__search-wrapper'>
            <input
               v-model='searchText'
               ref='searchInputEl'
               autofocus
               class='plan-list__search-input'
               placeholder='Search Plan Name'
               @keyup="onSearch"
            />
         </div>
      </section>

      <section class='plan-list__left-section'>
         <left-filter :plans='plans' @filter-type='handleFilterType' />
      </section>

      <section v-if="filteredPlans.length" class='plan-list__content'>
         <description-list :data='filteredPlans' @item-delete='onItemDelete'>
            <template v-slot="{ val }">
               <description-list-item label='ID' :value="val['_id']" :width="80" :trim="6" />
               <description-list-item label='Name' :value="val['name']" :width="90" />
               <description-list-item label='Description' :value="val['description']" :grow="0.8" />
               <description-list-item label='Type' :value="val['type']" :width="90" />
               <description-list-item label='Status' :value="val['status']" :width="90" />
            </template>
         </description-list>
      </section>
      <section v-else class="plan-list__no-content">
         <p class='plan-list__no-content-text'>{{ 'No Data' }}</p>
      </section>
   </div>

   <create-popup :show="showCreatePopup" @create-success='onCreateSuccess' />
</template>

<style lang="scss" scoped>
.plan-list__wrapper {
   display: grid;
   grid-template-columns: repeat(12, 1fr);
   grid-template-rows: repeat(10, 1fr);
   height: 90vh;
   gap: 2px;
   background: var(--background-white);
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
   min-width: 100px;

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
   width: 350px;

   input {
      align-self: center;
      height: 30px;
      width: 100%;
      font-size: 0.8em;
      text-align: right;
   }
}

.plan-list__search-input {
   padding: 0 20px;
}

.plan-list__left-section {
   grid-column: 1/13;
   grid-row: 2;
} 

.left-filter__wrapper {
   flex-direction: row;
   margin: 0 20px;
}

.left-filter__item--active,
.left-filter__item--inactive {
   flex-shrink: 1;
}

.plan-list__no-content,
.plan-list__content {
   grid-column: span 13;
   margin: 10px 20px;
}

@media screen and (min-width: $sm) {
   .left-filter__wrapper {
      display: block;
      margin: 0;
   }

   .plan-list__left-section {
      display: block;
      grid-column: 1/3;
      grid-row: 1/10;
   }

   .plan-list__no-content,
   .plan-list__content {
      grid-column: 3/13;
      grid-row: 2/10;
      margin-right: 40px;
      padding: 20px;
      overflow-y: scroll;
      max-height: 90vh;
   }

   .plan-list__no-content {
      display: flex;
      width: 100%;
      margin: 20px auto;
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

   .plan-list__search-wrapper {
      width: 250px;       
   }
}
</style>
