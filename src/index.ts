type Event = String | Symbol

const unknownEventNameError = (name) => {
    return "Unknown event name: '" + name + "'"
}

export default class EventBus {
    events = new Map<Event, Array<Function>>()

    /**
     * @name emit
     * @description to trigger the handlers for the given event name
     * @param { String | Symbol } name event name
     * @param { Array<any> }      args use `...` to support multi-args
     */
    emit(name: Event, ...args: Array<any>) {
        const targetEvent: Array<Function> | undefined =
            this.events.get(name)

        if (targetEvent) {
            targetEvent.forEach((handler: Function) => {
                handler.apply(null, args)
            })
        } else {
            throw new Error(unknownEventNameError(name))
        }
    }

    /**
     * @name on
     * @description to add event listener & register the given event handler
     * @param { String | Symbol } name event name
     * @param { Function } handler given handler to given event
     */
    on(name: Event, handler: Function) {
        const targetEvent: Array<Function> | undefined =
            this.events.get(name)

        if (targetEvent) {
            targetEvent.push(handler)
        } else {
            this.events.set(name, [handler])
        }
    }

    /**
     * @name off
     * @description remove the given handler to the given event
     * @param { String | Symbol } name event name
     * @param { Function } handler given handler to given event
     */
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