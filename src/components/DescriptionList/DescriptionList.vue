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
   <dl v-for="(item, index) in props.data" :key="index">
      <div class='list__actions'></div>
      <template v-if="item && typeof item === 'object'">
         <slot :val="item" />
      </template>
   </dl>
</template>

<style lang='scss' scoped>
@import './styles.scss';

.list__actions {
   width: 140px;
}
</style>
