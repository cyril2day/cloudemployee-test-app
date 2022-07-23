<script setup lang='ts'>
import useAppStore from '../stores/app';

const props = defineProps({
   menuDisplayState: {
      type: Boolean,
      default: false
   }
})
const emit = defineEmits(['showMenu'])

const showMenu = () => {
   emit('showMenu', !props.menuDisplayState)
}

const route = useRoute()
const router = useRouter()
const breakpoints = useBreakpoints({ laptop: 1024 })


function createNewPlan() {
   if (breakpoints.smaller('laptop').value)
      router.push({ name: 'Create' })
   else
      useAppStore().showCreatePopup = true
}
</script>

<template>
   <header class='header__main'>
      <nav class='header__nav'>
         <h4 class='header__nav-brand'>{{ route.name }}</h4>

         <div class='header__nav-actions'>
            <button
               v-if="route.name === 'Plan List'"
               class="header__create-plan"
               @click='createNewPlan'
            >New Plan</button>
            <button class='header__menu-toggler' @click='showMenu'>
               <i v-if='!props.menuDisplayState' class='cil-hamburger-menu'></i>
               <i v-else class='cil-x'></i>
            </button>
         </div>
      </nav>
   </header>
</template>

<style lang='scss'>
.header__nav-brand {
   color: var(--white);
   padding: 0 8px;
}
.header__nav {
   background: var(--blue1);
   display: flex;
   justify-content: space-between;
   padding: 0 10px;
}

.header__nav-actions {
   display: flex;

   button {
      background: transparent;
      border: none;
      color: var(--white);
      cursor: pointer;
      margin: 8px;
      padding: 10px;
      border-radius: 2px;
   }

   .header__menu-toggler {
      margin: 8px 0;

      &:active {
         color: var(--blue1);
      }
   }

   button:hover {
      background: var(--blue4);
   }

   .header__create-plan:hover {
      background: var(--green6);

      &:active {
         transform: translateY(1px);
      }
   }
}

</style>
