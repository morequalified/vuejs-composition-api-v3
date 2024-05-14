<script setup lang="ts">
import { DateTime } from 'luxon'
import PostWriter from '../components/PostWriter.vue'
import { TimelinePost } from '../posts'

const post: TimelinePost = {
  id: "-1",
  title: "title",
  created: DateTime.now()
}
</script>

<template>
  New Post
  <PostWriter :post="post" />
</template>