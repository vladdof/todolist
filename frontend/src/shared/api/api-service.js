import { API_URL } from '../config';

const clientIdStorageKey = 'todo-client-id';

const createClientId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        const randomBytes = new Uint8Array(16);
        crypto.getRandomValues(randomBytes);
        const randomHex = Array.from(randomBytes, byte => byte.toString(16).padStart(2, '0')).join('');
        return `anon-${randomHex}`;
    }

    const entropy = `${Date.now()}-${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}-${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
    return `anon-${encodeURIComponent(entropy).replace(/[^a-zA-Z0-9-]/g, '').slice(0, 64)}`;
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
