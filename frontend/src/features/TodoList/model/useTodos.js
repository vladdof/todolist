import { ref } from 'vue';
import { apiService } from '@/shared/api';
import { taskChannel } from '@/shared/lib/task-channel'

export function useTodos() {
    const todos = ref([]);
    const isLoadingTask = ref(true);

    taskChannel.on((data) => {
        todos.value.push(data)
    })

    async function fetchTodos() {
        try {
            todos.value = await apiService.fetchTasks();
        } catch (error) {
            console.error('Ошибка при загрузке задач: ', error);
        } finally {
            isLoadingTask.value = false
        }
    }

    async function removeTodo(id) {
        try {
            const response = await apiService.deleteTask(id);

            if (response.success) {
                todos.value = todos.value.filter(todo => todo.id !== id);
            }
        } catch (error) {
            console.error('Ошибка при удалении задачи: ', error);
        }
    }

    async function addTodo(newTodo) {
        try {
            const newTask = await apiService.createTask(newTodo);
            todos.value.push(newTask);

            taskChannel.postMessage(newTodo)
        } catch (error) {
            console.error('Ошибка при создании задачи: ', error);
        }
    }

    async function updateTodo({ id, text }) {
        try {
            const updatedTask = await apiService.updateTask(id, text);
            const index = todos.value.findIndex(todo => todo.id === id);
            todos.value[index] = updatedTask;
        } catch (error) {
            console.error('Ошибка при обновлении задачи: ', error);
        }
    }

    return {
        todos,
        isLoadingTask,
        fetchTodos,
        addTodo,
        removeTodo,
        updateTodo,
    };
}
