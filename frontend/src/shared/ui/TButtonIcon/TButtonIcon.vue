<template>
  <button
    class="t-button-icon"
  >
    <slot />
  </button>
</template>

<style>
.t-button-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 39px;
  height: 39px;
  padding: 12px;
  color: #fff;
  background-color: transparent;
  border-radius: 23px;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: #aaaaaa23;
  }
}
</style>
