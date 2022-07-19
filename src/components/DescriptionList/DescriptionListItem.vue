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
   },
   trim: {
      type: Number,
      default: 0
   },
   grow: {
      type: Number,
      default: 0
   }
})

const width = ref('')
const grow = ref(0)

const trim = (word: unknown) => {
   if (typeof word === 'string')
      return word.slice(0, props.trim) + '...'
}

watchEffect(() => {
   if (props.width)
      width.value = `${props.width}px`

   if (props.grow)
      grow.value = props.grow
})
</script>

<template>
   <div class='list-item__wrapper'>
      <dt class='list-item__label'>{{ props.label }}</dt> 
      <dd class='list-item__value'>{{ props.trim ? trim(props.value) : props.value }}</dd> 
   </div>
</template>

<style lang="scss" scoped>
@import './styles.scss';

.list-item__label {
   font-family: 'Rubik-Light';
   font-weight: lighter;
}

.list-item__wrapper {
   flex-grow: v-bind(grow);
}

@media screen and (min-width: $sm) {
   .list-item__wrapper {
      width: v-bind(width);
   }
}

</style>
