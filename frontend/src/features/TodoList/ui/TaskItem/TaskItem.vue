<template>
  <li class="todo-item">
    <template v-if="isEditing">
      <input
        v-model="editingText"
        class="todo-item__edit"
        @keyup.enter="saveEditing"
      />
      <div class="todo-item__btns">
        <TButtonIcon @click="saveEditing">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg>
        </TButtonIcon>
        <TButtonIcon @click="cancelEditing">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
        </TButtonIcon>
      </div>
    </template>

    <template v-else>
      <div class="todo-text">
        {{ item.text }}
        <span class="todo-date">Обновлено: {{ formatDate(item.updatedAt) }}</span>
      </div>

      <div class="todo-item__btns">
        <TButtonIcon @click="editTodo">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
        </TButtonIcon>
        <TButtonIcon @click="removeTodo">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        </TButtonIcon>
      </div>
    </template>
  </li>
</template>

<script setup>
import { ref } from 'vue'
import { formatDate } from '@/shared/lib/format-date'
import { TButtonIcon } from '@/shared/ui'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update', 'remove'])

const isEditing = ref(false)
const editingText = ref(props.item.text)

const editTodo = () => {
  isEditing.value = true
}

const saveEditing = () => {
  console.log({ id: props.item.id, text: editingText.value });

  emit('update', { id: props.item.id, text: editingText.value })
  isEditing.value = false
}

const removeTodo = () => {
  emit('remove', props.item.id)
}

const cancelEditing = () => {
  isEditing.value = false
}
</script>

<style>
.todo-item {
  position: relative;
  top: 0;
  left: 0;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  border: 1px solid #ffffff4a;
  border-radius: 23px;
  transition: box-shadow 0.28s ease-in-out,
    top 0.28s ease-in-out,
    left 0.28s ease-in-out;

  &:hover {
    top: -4px;
    left: -4px;
    box-shadow: 2px 2px white, 4px 4px #FC63B5;
  }
}

.todo-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  text-align: start;
  overflow-wrap: anywhere;
}

.todo-date {
  font-size: 0.75rem;
  color: #e7e6e6;
}

.todo-item__edit {
  width: 70%;
  height: 30px;
  padding: 5px;
  color: #fff;
  background-color: transparent;
  outline: 2px solid #fff;
  border: none;
  border-radius: 12px;
  transition: outline 0.15s ease-in-out;
  box-sizing: border-box;

  &:focus-visible {
    outline: 2px solid #9999FF;
  }
}

.todo-item__btns {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
