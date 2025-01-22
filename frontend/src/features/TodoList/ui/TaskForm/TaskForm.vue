<template>
  <form class="task-form" @submit.prevent="submit">
    <textarea
      v-model="newTodo"
      class="task-form__todo"
      placeholder="Напиши свою заметку"
      :autofocus="true"
      :rows="7"
    />

    <div class="task-form__bottom">
      <TButton class="task-form__btn">
        Добавить заметку
      </TButton>

      <slot name="addInfo" />
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { TButton } from '@/shared/ui'

const emit = defineEmits(['add-todo'])

const newTodo = ref('')
const submit = () => {
  emit('add-todo', newTodo.value)
  newTodo.value = ''
}
</script>

<style>
.task-form {
  position: sticky;
  top: 12px;
  margin-bottom: 23px;
  padding: 34px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;
  border: 1px solid #fff;
  border-radius: 12px;
}

.task-form__todo {
  width: 89%;
  height: 59px;
  padding: 10px;
  color: #fff;
  background-color: transparent;
  outline: 2px solid #fff;
  border: none;
  border-radius: 12px;
  transition: outline 0.15s ease-in-out;
  box-sizing: border-box;

  &::placeholder {
    color: #fff;
  }

  &:focus-visible {
    outline: 2px solid #9999ff;
  }
}

.task-form__bottom {
  width: 89%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  row-gap: 16px;
}

.task-form__btn {
  width: fit-content;
}

@media (max-width: 600px) {
  .task-form__todo,
  .task-form__bottom,
  .task-form__btn {
    width: 100%;
  }

  .task-form__bottom {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
