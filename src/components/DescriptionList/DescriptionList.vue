<script setup lang='ts'>
import { PropType } from 'vue';

const props = defineProps({
   data: {
      type: Array as PropType<Object>,
      default: []
   }
})
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
      <div class='list__actions'></div>
   </dl>
</template>

<style lang='scss' scoped>
@import './styles.scss';
</style>
