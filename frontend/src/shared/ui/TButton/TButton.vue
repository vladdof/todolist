<template>
  <tagName
    class="t-button"
    v-bind="tagProps"
  >
    <slot />
  </tagName>
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

const tagName = computed(() => props.type === 'link' ? 'a' : 'button')
const tagProps = computed(() => props.type === 'link' ? { href: props.link, class: 't-button--link' } : {})
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

  &--link {
    text-decoration: none;
  }
}
</style>
