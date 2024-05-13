<script setup>
import { onMounted, ref } from 'vue'
import { API_URL } from '../config'
import { fetchTasks } from '../api/fetch-tasks'
import { deleteTask } from '../api/delete-task'
import { createTask } from '../api/create-task'

let id = 0
const newTodo = ref('')
const todos = ref([])

async function addTodo() {
  const newTask = await createTask(newTodo.value)
  todos.value.push(newTask)
  newTodo.value = ''
}

async function removeTodo(todo) {
  const response = await deleteTask(todo.id);
  if (response.ok) {
    todos.value = todos.value.filter((t) => t.id !== id);
  } else {
    console.error("Ошибка при удалении задачи:", response.statusText);
  }

  todos.value = todos.value.filter((t) => t.id !== todo.id);
}

onMounted(async () => {
  todos.value = await fetchTasks();
});
</script>

<template>
  <div class="container">
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
  .container {
    width: 49%;
    display: inline-block;
    text-align: center;
  }

  form {
    padding: 34px 12px;
    margin-bottom: 23px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #fff;
    border-radius: 12px;
  }

  .todo {
    height: 59px;
    width: 89%;
    margin-bottom: 5%;
    padding: 10px;
    color: #fff;
    background-color: transparent;
    outline: 2px solid #fff;
    border: none;
    border-radius: 23px;
    transition: outline 0.15s ease-in-out;
  }

  .todo::placeholder {
    color: #fff;
  }

  .todo:focus-visible {
    outline: 2px solid #9999FF;
  }

  .btn-new {
    width: fit-content;
    padding-inline-start: 16px;
    padding-inline-end: 16px;
  }

  button {
    padding: 10px;
    background-color: transparent;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 12px;
    cursor: pointer;
  }

  button:hover {
    background-color: #aaaaaa23;
  }

  .btn-remove {
    border-radius: 23px;
    height: 39px;
    width: 39px;
    background-color: transparent;
    color: white;
    cursor: pointer;
  }

  .todo-list {
    list-style-type: none;
    padding: 0;
  }

  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ffffff4a;
    border-radius: 23px;
    background-color: #fff;
    color: rgb(255, 255, 255);
    background-color: transparent;

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
    .btn-new {
      width: 70%;
    }
  }
</style>
