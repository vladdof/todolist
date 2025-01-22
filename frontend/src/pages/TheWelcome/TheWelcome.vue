<template>
  <div class="welcome">
    <DescriptionWelcome />

    <TButton
      class="welcome-btn"
      type="link"
      link="/todo-app"
    >
      Посмотреть
    </TButton>
  </div>
</template>


<script setup>
import { TButton } from '@/shared/ui'
import DescriptionWelcome from './ui/DescriptionWelcome.vue'
</script>

<style scoped>
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.welcome-btn {
  margin-top: 20px;
}
</style>
