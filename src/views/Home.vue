<script setup lang="ts">
import TimeLine from '../components/TimeLine.vue'
</script>

<template>
  <Suspense>
    <template #default>
      <TimeLine />
    </template>
    <template #fallback>
      <progress class="progress is-small is-primary" max="100" />
    </template>
  </Suspense>
</template>