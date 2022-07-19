<script setup lang='ts'>

const props = defineProps({
   value: {
      type: [String, Number, Boolean],
      default: ''
   },
   label: {
      type: String,
      default: ''
   },
   width: {
      type: Number,
      default: 80
   }
})

const width = ref('')

watchEffect(() => {
   if (props.width)
      width.value = `${props.width}px`
})
</script>

<template>
   <div class='list-item__wrapper'>
      <dt class='list-item__label'>{{ props.label }}</dt> 
      <dd class='list-item__value'>{{ props.value }}</dd> 
   </div>
</template>

<style lang="scss" scoped>
@import './styles.scss';

.list-item__label {
   font-family: 'Rubik-Light';
   font-weight: lighter;
}

/*
@media screen and (min-width: $md) {
   .list-item__wrapper {
      width: v-bind(width);
   }
}
*/
</style>
