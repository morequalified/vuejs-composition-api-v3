<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>

ScriptCompileContext
<template>
  <div class="section">
    <div class="container">
      <Navbar />
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css";
@import "highlight.js/styles/atom-one-dark.css";
</style>
