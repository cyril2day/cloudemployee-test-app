<script setup lang='ts'>
const src = 'https://continuity2.com'
</script>

<template>
   <iframe :src='src' />
</template>

<style lang="scss" scoped>
iframe {
   display: grid;
   grid-template-columns: repeat(12, 1fr);
   grid-template-rows: repeat(10, 1fr);
   height: 95vh;
   width: 100%;
   gap: 2px;
   background: var(--background-white);
} 
</style>
