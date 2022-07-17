<script setup lang='ts'>
import ContinuityLogo from 'src/assets/svg/logo.svg'
const props = defineProps({
   menuState: {
      type: Boolean,
      default: false
   }
})
</script>

<template>
   <section class='sidebar__main' :class="{ show: props.menuState }">
      <div class='sidebar__logo'>
         <img :src="ContinuityLogo">
         <span>Donald Trump</span>
      </div>

      <ul class='sidebar__menu'>
         <li class='sidebar__menu-item'><a>Home</a></li>
         <li class='sidebar__menu-item'><a>Plans</a></li>
      </ul>
   </section>
</template>

<style lang='scss'>
.show {
   display: block;
}

.sidebar__main {
   background: #d8e8f4f0;
}

.sidebar__menu {
   list-style-type: none;
}

.sidebar__menu-item {
   cursor: pointer;
}
</style>
