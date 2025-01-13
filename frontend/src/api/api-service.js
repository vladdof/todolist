import { API_URL } from '../config';

class ApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async request(url, options = {}) {
        try {
            const response = await fetch(`${this.baseUrl}${url}`, options);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        } catch (error) {
            console.error(`Ошибка при запросе ${url}: `, error);
            throw error;
        }
    }

    async fetchTasks() {
        return this.request('/api/tasks');
    }

    async createTask(text) {
        return this.request('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });
    }

    async deleteTask(id) {
        return this.request(`/api/tasks/${id}`, {
            method: 'DELETE',
        });
    }
}

export const apiService = new ApiService(API_URL);
