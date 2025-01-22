import { API_URL } from '../config'

export async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/api/tasks/${id}`, {
            method: 'DELETE',
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}
