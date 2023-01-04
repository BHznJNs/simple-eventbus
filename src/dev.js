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
            return false;
        }
        if (currentEventArgNum !== targetEventArgNum) {
            console.warn(wrongArgNumWarning(targetEventArgNum, currentEventArgNum));
            return false;
        }
        super.emit.apply(this, args);
        return true;
    }
    on(...args) {
        const event = args[0];
        const targetEvent = this.events.get(event);
        const targetEventArgNum = this.eventsArgNumMap.get(event);
        const currentEventArgNum = args[1].length;
        if (targetEvent) {
            if (targetEventArgNum !== currentEventArgNum) {
                console.warn(wrongArgNumWarning(targetEventArgNum, currentEventArgNum));
                return false;
            }
        }
        else {
            this.eventsArgNumMap.set(event, currentEventArgNum);
        }
        super.on.apply(this, args);
        return true;
    }
    off(...args) {
        const event = args[0];
        const targetEvent = this.events.get(event);
        if (targetEvent) {
            if (targetEvent.indexOf(args[1]) === -1) {
                console.warn(unaddedEventHandlerWarning(args[1]));
                return false;
            }
        }
        else {
            console.warn(unaddedEventNameWarning(event));
            return false;
        }
        super.off.apply(this, args);
        return true;
    }
}
