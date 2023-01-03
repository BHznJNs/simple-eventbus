export default class EventBus {
    constructor() {
        this.events = new Map();
    }
    emit(name, ...args) {
        const targetEvent = this.events.get(name);
        if (targetEvent) {
            targetEvent.forEach((handler) => {
                handler.apply(null, args);
            });
        }
    }
    on(name, handler) {
        const targetEvent = this.events.get(name);
        if (targetEvent) {
            targetEvent.push(handler);
        }
        else {
            this.events.set(name, [handler]);
        }
    }
    off(name, handler) {
        const targetEvent = this.events.get(name);
        if (targetEvent) {
            if (targetEvent.length === 1) {
                this.events.delete(name);
            }
            else {
                const handlerIndex = targetEvent.indexOf(handler);
                targetEvent.splice(handlerIndex, 1);
            }
        }
    }
}
