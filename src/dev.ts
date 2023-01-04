import EventBus from "./index.js"
import { Event, EventHandler, WarnMessage } from "./types.js"

/**
 * * * * * Warning declare start * * * * *
 */
const unaddedEventNameWarning =
    (name: Event): WarnMessage => {
    return `Warning: unadded event name: "${name}"`
}
const unaddedEventHandlerWarning =
    (func: EventHandler): WarnMessage => {
    if (func.name) {
        // For named function
        return `Warning: unadded event handler: "${func.name}"`
    } else {
        // For anonymous function like
        // `() => {}` or `function() {}`
        return `Warning: unadded event handler`
    }
}
const wrongArgNumWarning =
    (expected: Number, actual: Number): WarnMessage => {
    return `Warning: expected argument number: ${expected}, actual argument number: ${actual}`
}
/**
 * * * * * Warning declare end * * * * *
 */

export default class EventBusDev extends EventBus {
    eventsArgNumMap: Map<Event, Number> = new Map()

    constructor() {
        super()
    }

    emit(...args: Array<Event | any>): Boolean {
        const event = args[0]
        const targetEvent: Array<EventHandler> | undefined =
            this.events.get(event)
        const targetEventArgNum: Number | undefined =
            this.eventsArgNumMap.get(event)
        const currentEventArgNum: Number = args.length - 1

        // When target event to emit is not exist, print warning message
        if (!targetEvent) {
            console.warn(
                unaddedEventNameWarning(event)
            )
            return false
        }
        // When the number of the given argument is wrong, print warning message
        if (currentEventArgNum !== targetEventArgNum) {
            console.warn(
                wrongArgNumWarning(targetEventArgNum, currentEventArgNum)
            )
            return false
        }
        
        super.emit.apply(this, args)
        return true
    }

    on(...args: Array<Event & EventHandler>): Boolean {
        const event = args[0]
        const targetEvent: Array<EventHandler> | undefined =
            this.events.get(event)
        const targetEventArgNum: Number | undefined =
            this.eventsArgNumMap.get(event)
        const currentEventArgNum: Number = args[1].length
        
        // When the target event is exist, check the number of arguments
        // the new handler with the current number
        if (targetEvent) {
            if (targetEventArgNum !== currentEventArgNum) {
                console.warn(
                    wrongArgNumWarning(targetEventArgNum, currentEventArgNum)
                )
                return false
            }
        } else {
            // If the target event is not exist, init the number of arguments
            // in the `eventsArgNumMap`
            this.eventsArgNumMap.set(event, currentEventArgNum)
        }

        super.on.apply(this, args)
        return true
    }

    off(...args: Array<Event & EventHandler>): Boolean {
        const event = args[0]
        const targetEvent: Array<EventHandler> | undefined =
            this.events.get(event)

        // When target event to off is exist,
        if (targetEvent) {
            // args[1] -> EventHandler
            if (targetEvent.indexOf(args[1]) === -1) {
                // but the given event handler is unadded
                console.warn(
                    unaddedEventHandlerWarning(args[1])
                )
                return false
            }
        } else {
            // When target event to off is not exist
            console.warn(
                unaddedEventNameWarning(event)
            )
            return false
        }

        super.off.apply(this, args)
        return true
    }
}
