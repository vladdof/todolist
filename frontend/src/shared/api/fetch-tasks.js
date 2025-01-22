import { API_URL } from '../config'

export async function fetchTasks() {
    try {
        const response = await fetch(`${API_URL}/api/tasks`);
        return response.json();
    } catch (error) {
        console.error(error);
    }
}
