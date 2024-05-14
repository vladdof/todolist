<template>
  <div>
    <HeaderComponent />

    <router-link to="/todo-app">
      <button class="btn-new">
        Посмотреть
      </button>
    </router-link>
  </div>
</template>

<script setup>
import HeaderComponent from './HeaderComponent.vue'
</script>

<style>
.btn-new {
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
}

.btn-new:hover {
  box-shadow: 2px 2px white, 4px 4px #FC63B5;
  top: -4px;
  left: -4px;
}

@media (max-width: 600px) {
  .btn-new {
    width: 70%;
  }
}
</style>
