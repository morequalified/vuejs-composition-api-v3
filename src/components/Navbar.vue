<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <RouterLink to="/posts/new" class="button">New Post</RouterLink>
      </div>
    </div>
  </div>
</template>