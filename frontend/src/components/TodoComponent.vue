<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { apiService } from '@/api'
import { formatDate } from '@/lib/format-date'
import { formatNumber } from '@/lib/format-number'
import { taskChannel } from '@/lib/task-channel'

let id = 0
const newTodo = ref('')
const todos = ref([])
const isLoadingTask = ref(true)

taskChannel.on((data) => {
  todos.value.push(data)
})

onBeforeUnmount(() => {
  taskChannel.close()
})

async function addTodo() {
  if (newTodo.value.trim() === '') return

  const newTask = await apiService.createTask(newTodo.value)
  todos.value.push(newTask)

  taskChannel.postMessage(newTask)
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
  try {
    todos.value = await apiService.fetchTasks();
  } catch (error) {
    console.log('Ошибка при получении задач: ', error);
  } finally {
    isLoadingTask.value = false
  }
});

const editingTodo = ref(null);
const editTodo = (todo) => {
  editingTodo.value = { ...todo };
};

const saveEditing = async (todo) => {
  const updatedTodo = await apiService.updateTask(editingTodo.value.id, editingTodo.value.text);
  todos.value = todos.value.map((t) => (t.id === todo.id ? updatedTodo : t));
  editingTodo.value = null;
};

const cancelEditing = () => {
  editingTodo.value = null;
};
</script>

<template>
  <div class="wrapper">
    <form class="form" @submit.prevent="addTodo">
      <textarea autofocus rows="7" placeholder="Напиши свою заметку" class="todo" v-model="newTodo" />

      <div class="form-bottom">
        <button class="btn-new">Добавить заметку</button>
        <p>Всего задач: {{ formatNumber(todos.length) }}</p>
      </div>
    </form>

    <div v-if="isLoadingTask" class="loader-container">
      <div class="loader"></div>
    </div>

    <p v-else-if="todos.length === 0">
      Список задач пуст
    </p>
    <ul v-else class="todo-list">
      <li v-for="item in todos" :key="item.id" class="todo-item">
        <template v-if="editingTodo && editingTodo.id === item.id">
          <input
            v-model="editingTodo.text"
            class="edit-input"
            @keyup.enter="saveEditing(item)"
          />

          <div class="btns">
            <button class="btn-save" @click="saveEditing(item)">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg>
            </button>
            <button class="btn-cancel" @click="cancelEditing">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            </button>
          </div>
        </template>

        <template v-else>
          <div class="todo-text">
            {{ item.text }}
            <span class="updated-at">Обновлено: {{ formatDate(item.updatedAt) }}</span>
          </div>
          <div class="btns">
            <button class="btn-edit" @click="editTodo(item)">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
            </button>
            <button class="btn-remove" @click="removeTodo(item)">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </button>
          </div>
        </template>
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

.form {
  margin-bottom: 23px;
  padding: 34px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #fff;
  border-radius: 12px;
}

.form-bottom {
  width: 89%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.todo-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  text-align: start;
  overflow-wrap: anywhere;
}

.btn-new {
  width: fit-content;
}

.btns {
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
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
}

button:hover {
  background-color: #aaaaaa23;
}

.todo-list {
  height: 100%;
  padding: 0;
  list-style-type: none;
  overflow: auto;
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
  .btn-new,
  .form-bottom {
    width: 100%;
  }

  .form-bottom {
    flex-direction: column;
    gap: 10px;
  }
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
}

.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.edit-input {
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
}

.edit-input:focus-visible {
  outline: 2px solid #9999FF;
}

.updated-at {
  font-size: 0.875rem;
  color: #e7e6e6;
}
</style>
