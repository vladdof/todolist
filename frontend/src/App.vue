<template>
  <main class="container">
    <router-view />
  </main>
</template>

<script setup>
  import { onBeforeUnmount } from 'vue'
  import { taskChannel } from '@/lib/task-channel'

  onBeforeUnmount(() => {
    taskChannel.close()
  })
</script>
