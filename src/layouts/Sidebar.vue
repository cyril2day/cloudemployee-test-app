<script setup lang='ts'>
import ContinuityLogo from 'src/assets/svg/logo.svg'
const props = defineProps({
   menuState: {
      type: Boolean,
      default: false
   }
})

const show = ref(false)

watchEffect(
   () => {
      show.value = props.menuState
   }
)
</script>

<template>
   <section class='sidebar__main' :class="{ show: show }">
      <div class='sidebar__logo'>
         <img :src="ContinuityLogo">
         <h3>Donald Trump</h3>
      </div>

      <div class="sidebar__menu">
         <ul class='sidebar__menu--upper'>
            <label>Administrator</label>
            <li class='sidebar__menu-item'><router-link to='/'>Home</router-link></li>
            <li class='sidebar__menu-item'><router-link to='/plan'>Plans</router-link></li>
         </ul>

         <ul class='sidebar__menu--lower'>
            <li class='sidebar__menu-item'><a>Account</a></li>
         </ul>
      </div>
   </section>
</template>

<style lang='scss'>
.show {
   display: block!important;
}

.sidebar__main {
   background: #d8e8f4f0;
}

.sidebar__menu {
   display: flex;
   flex-direction: column;
   justify-content: space-between;

   ul {
      list-style-type: none;
   }
}

.sidebar__menu-item {
   cursor: pointer;

   a {
      display: block;
      text-decoration: none;
   }
}

.router-link-exact-active {
   background: var(--blue3);
   color: var(--white)!important;
}
</style>
