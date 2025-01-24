<template>
  <component
    :is="tagName"
    class="t-button"
    v-bind="tagProps"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  link: {
    type: String,
    default: ''
  }
})

const tagName = computed(() => props.type === 'link' ? 'router-link' : 'button')
const tagProps = computed(() => props.type === 'link' ? { to: props.link, class: 't-button--link' } : {})
</script>

<style>
.t-button {
  width: 70%;
  padding: 12px;
  border-radius: 14px;
  color: white;
  transition: .2s linear;
  background: #0B63F6;
  border: 1px solid white !important;
  cursor: pointer;
  position: relative;
  top: 0;
  left: 0;

  &:hover {
    box-shadow: 2px 2px white, 4px 4px #FC63B5;
    top: -4px;
    left: -4px;
  }
}

.t-button--link {
  text-decoration: none;
}
</style>
