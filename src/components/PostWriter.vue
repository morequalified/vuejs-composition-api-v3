<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { TimelinePost } from '../posts'
import { marked } from 'marked'
import highlightjs from 'highlight.js'
import debounce from 'lodash/debounce'

const props = defineProps<{
  post: TimelinePost
}>()

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const contentEditable = ref<HTMLDivElement>()
const html = ref('')

function parseHtml (markdown: string) {
  marked.parse(markdown, {
    gfm: true,
    breaks: true,
    highlight: (code) => {
      return highlightjs.highlightAuto(code).value
    }
  }, (_err, parseResult) => {
    html.value = parseResult
  })
}

watch(content, debounce((newContent) => {
  parseHtml(newContent)
}, 250), {
  immediate: true
})

onMounted(() => {
  if (!contentEditable.value) {
    throw new Error('contentEditable DOM node was not found')
  }
  contentEditable.value.innerHTML = content.value
})

function handleInput() {
  if (!contentEditable.value) {
    throw new Error('contentEditable DOM node was not found')
  }
  content.value = contentEditable.value.innerHTML
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post title</div>
        <input type="text" class="input" v-model="title">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable" @input="handleInput" />
    </div>
    <div class="column">
      <div v-html="html" />
    </div>
  </div>
</template>