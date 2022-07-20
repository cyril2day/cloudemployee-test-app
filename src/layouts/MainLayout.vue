<script setup lang='ts'>
import TopHeader from './TopHeader.vue'
import Sidebar from './Sidebar.vue'

const menuDisplayState = ref(false)

const handleShowMenuEvent = (event: boolean) => {
   menuDisplayState.value = event
}

const route = useRoute()

watch(
   () => route.name,
   () => {
      menuDisplayState.value = false
   }
)
</script>

<template>
   <div class='app__wrapper'>
      <!-- top nav --> 
      <TopHeader :menuDisplayState='menuDisplayState' @show-menu='handleShowMenuEvent' />

      <!-- left sidebar -->      
      <Sidebar :menu-state='menuDisplayState' />

      <!-- page container --> 
      <section class='page-container'><router-view /></section>
   </div>
</template>
