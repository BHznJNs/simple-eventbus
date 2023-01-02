type Event = String | Symbol

const unknownEventNameError = (name) => {
    return "Unknown event name: '" + name + "'"
}

export default class EventBus {
    events = new Map<Event, Array<Function>>()

    emit(name: Event, value: any) {
        const targetEvent: Array<Function> | undefined =
            this.events.get(name)

        if (targetEvent) {
            targetEvent.forEach((func: Function) => {
                func(value)
            })
        } else {
            throw new Error(unknownEventNameError(name))
        }
    }

    on(name: Event, handler: Function) {
        const targetEvent: Array<Function> | undefined =
            this.events.get(name)

        if (targetEvent) {
            targetEvent.push(handler)
        } else {
            this.events.set(name, [handler])
        }
    }

    off(name: Event, handler: Function) {
        const targetEvent: Array<Function> | undefined =
            this.events.get(name)

        if (targetEvent) {
            if (targetEvent.length === 1) {
                this.events.delete(name)
            } else {
                const handlerIndex = targetEvent.indexOf(handler)
                targetEvent.splice(handlerIndex, 1)
            }
        } else {
            throw new Error(unknownEventNameError(name))
        }
    }
}