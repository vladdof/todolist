import { API_URL } from '../config';

const clientIdStorageKey = 'todo-client-id';

const createClientId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return `anon-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const getOrCreateClientId = () => {
    const storedClientId = localStorage.getItem(clientIdStorageKey);

    if (storedClientId) {
        return storedClientId;
    }

    const clientId = createClientId();
    localStorage.setItem(clientIdStorageKey, clientId);
    return clientId;
};

class ApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async request(url, options = {}) {
        try {
            const response = await fetch(`${this.baseUrl}${url}`, {
                ...options,
                headers: {
                    ...options.headers,
                    'x-client-id': getOrCreateClientId(),
                },
            });

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

    async updateTask(id, text) {
        return this.request(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });
    }
}

export const apiService = new ApiService(API_URL);
