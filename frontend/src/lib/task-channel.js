class BroadcastService {
    constructor(name) {
        this.name = name
        this.channel = new BroadcastChannel(name)
    }

    postMessage(message) {
        this.channel.postMessage(message)
    }

    on(callback) {
        this.channel.onmessage = (event) => callback(event.data)
    }

    close() {
        if (this.channel) {
            this.channel.close();
            this.channel = null;
        }
    }
}

export const taskChannel = new BroadcastService('tasks')
