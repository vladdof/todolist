import { API_URL } from '../config';

export async function createTask(text) {
    try {
        const response = await fetch(`${API_URL}/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        return response.json();
    } catch (error) {
        console.error('Не удалось создать задачу: ', error);
    }
}
