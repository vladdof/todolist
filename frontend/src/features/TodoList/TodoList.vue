<template>
  <div class="todos">
    <TaskForm @add-todo="addTodoHandler">
      <template #addInfo>
        <p>Всего задач: {{ formatNumber(todos.length) }}</p>
      </template>
    </TaskForm>

    <div v-if="isLoadingTask" class="loader-container">
      <div class="loader"></div>
    </div>

    <p v-else-if="todos.length === 0">
      Список задач пуст. Добавьте первую задачу
    </p>

    <ul
      v-else
      class="todo-list"
    >
      <TaskItem
        v-for="item in todos"
        :key="item.id"
        :item="item"
        @update="updateTodo"
        @remove="removeTodo"
      />
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { formatNumber } from '@/shared/lib/format-number'
import TaskForm from './ui/TaskForm/TaskForm.vue'
import TaskItem from './ui/TaskItem/TaskItem.vue'
import { useTodos } from './model/useTodos';

const { todos, isLoadingTask, fetchTodos, removeTodo, updateTodo, addTodo } = useTodos();

async function addTodoHandler(newTodo) {
  if (newTodo.trim() === '') return

  await addTodo(newTodo)
}

onMounted(async () => {
  await fetchTodos()
});
</script>

<style scoped>
.todos {
  width: 100%;
  margin: 0 auto;
}

.todo-list {
  padding: 0;
  list-style-type: none;
}
</style>
