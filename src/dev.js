import EventBus from "./index.js";
const unaddedEventNameWarning = (name) => {
    return `Warning: unadded event name: "${name}"`;
};
const unaddedEventHandlerWarning = (func) => {
    if (func.name) {
        return `Warning: unadded event handler: "${func.name}"`;
    }
    else {
        return `Warning: unadded event handler`;
    }
};
const wrongArgNumWarning = (expected, actual) => {
    return `Warning: expected argument number: ${expected}, actual argument number: ${actual}`;
};
export default class EventBusDev extends EventBus {
    constructor() {
        super();
        this.eventsArgNumMap = new Map();
    }
    emit(...args) {
        const event = args[0];
        const targetEvent = this.events.get(event);
        const targetEventArgNum = this.eventsArgNumMap.get(event);
        const currentEventArgNum = args.length - 1;
        if (!targetEvent) {
            console.warn(unaddedEventNameWarning(event));
        }
        if (currentEventArgNum !== targetEventArgNum) {
            console.warn(wrongArgNumWarning(targetEventArgNum, currentEventArgNum));
        }
        super.emit.apply(this, args);
    }
    on(...args) {
        const event = args[0];
        const targetEvent = this.events.get(event);
        const targetEventArgNum = this.eventsArgNumMap.get(event);
        const currentEventArgNum = args[1].length;
        if (targetEvent) {
            if (targetEventArgNum !== currentEventArgNum) {
                console.warn(wrongArgNumWarning(targetEventArgNum, currentEventArgNum));
            }
        }
        else {
            this.eventsArgNumMap.set(event, currentEventArgNum);
        }
        super.on.apply(this, args);
    }
    off(...args) {
        const event = args[0];
        const targetEvent = this.events.get(event);
        if (targetEvent) {
            if (targetEvent.indexOf(args[1]) === -1) {
                console.warn(unaddedEventHandlerWarning(args[1]));
            }
        }
        else {
            console.warn(unaddedEventNameWarning(event));
        }
        super.off.apply(this, args);
    }
}
