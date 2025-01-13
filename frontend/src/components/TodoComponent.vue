<script setup>
import { onMounted, ref } from 'vue'
import { apiService } from '@/api'

let id = 0
const newTodo = ref('')
const todos = ref([])

async function addTodo() {
  const newTask = await apiService.createTask(newTodo.value)
  todos.value.push(newTask)
  newTodo.value = ''
}

async function removeTodo(todo) {
  const response = await apiService.deleteTask(todo.id);
  if (response.success) {
    todos.value = todos.value.filter((t) => t.id !== id);
  } else {
    console.error("Ошибка при удалении задачи: ", response.statusText);
  }

  todos.value = todos.value.filter((t) => t.id !== todo.id);
}

onMounted(async () => {
  todos.value = await apiService.fetchTasks();
});
</script>

<template>
  <div class="wrapper">
    <form @submit.prevent="addTodo">
      <input autofocus placeholder="Напиши свою заметку" class="todo" v-model="newTodo">
      <button class="btn-new">Добавить заметку</button>
    </form>

    <ul class="todo-list">
      <li v-for="item in todos" :key="item.id" class="todo-item">
        {{ item.text }}
        <button class="btn-remove" @click="removeTodo(item)">X</button>
      </li>
    </ul>

    <router-link to="/">
      <button style="width: 157px;">Вернуться</button>
    </router-link>
  </div>
</template>


<style scoped>
.wrapper {
  width: clamp(4rem, 100vw, 42rem);
}

form {
  margin-bottom: 23px;
  padding: 34px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #fff;
  border-radius: 12px;
}

.todo {
  width: 89%;
  height: 59px;
  margin-bottom: 5%;
  padding: 10px;
  color: #fff;
  background-color: transparent;
  outline: 2px solid #fff;
  border: none;
  border-radius: 12px;
  transition: outline 0.15s ease-in-out;
  box-sizing: border-box;
}

.todo::placeholder {
  color: #fff;
}

.todo:focus-visible {
  outline: 2px solid #9999FF;
}

.btn-new {
  width: fit-content;
}

button {
  padding: 12px;
  color: #fff;
  background-color: transparent;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}

button:hover {
  background-color: #aaaaaa23;
}

.btn-remove {
  width: 39px;
  height: 39px;
  color: #fff;
  background-color: transparent;
  border-radius: 23px;
  cursor: pointer;
}

.todo-list {
  padding: 0;
  list-style-type: none;
}

.todo-item {
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  border: 1px solid #ffffff4a;
  border-radius: 23px;

  position: relative;
  top: 0;
  left: 0;
  transition: box-shadow 0.28s ease-in-out, top 0.28s ease-in-out, left 0.28s ease-in-out;
}

.todo-item:hover {
  box-shadow: 2px 2px white, 4px 4px #FC63B5;
  top: -4px;
  left: -4px;
}


@media (max-width: 600px) {

  .todo,
  .btn-new {
    width: 100%;
  }
}
</style>
