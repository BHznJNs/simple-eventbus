# simple-eventbus

A simple implementation of TypeScript / JavaScript EventBus, which has dev version for argument / event checking.

* * *

## Usage

Import package:

```shell
npm i -s @bhznjns/simple-eventbus
```

```JavaScript
// For common version:
import EventBus from "@bhznjns/simple-eventbus"
// For dev version,
// dev version has more error messages and the usage are the same
import EventBusDev from "@bhznjns/simple-eventbus/src/dev.js"

const eventBus = new EventBus()
const eventBusDev = new EventBusDev()
```

Add event:

```JavaScript
eventBus.on("event-name", eventHandler)
eventBusDev.on("event-name", eventHandler)

// Support multi-arg
eventBus.on("multi-arg-event", (data1, data2) => {
    // do something...
})
eventBusDev.on("multi-arg-event", (data1, data2) => {
    // do something...
})
```

Emit event:

```JavaScript
eventBus.emit("event-name", someData)
eventBusDev.emit("event-name", someData)

// Support multi-arg
eventBus.emit("multi-arg-event", data1, data2)
eventBusDev.emit("multi-arg-event", data1, data2)
```

Remove event:

```JavaScript
eventBus.off("event-name", eventHandler)
eventBusDev.off("event-name", eventHandler)
```

* * *

## Error messages for dev version

When you emitted an event that is unadded:

```JavaScript
eventBusDev.emit("unadded-event", someData)
// Warning: unadded event name: "unadded-event"
```

When you emitted an event with wrong argument number:

```JavaScript
eventBusDev.on("test-event", (data) => {
    // do something...
})
eventBusDev.emit("test-event", data1, data2)
// Warning: expected argument number: 1, actual argument number: 2
```

When you added an event handler whose number of arguments is not equal to the existing event handler for the existing event:

```JavaScript
eventBusDev.on("test-event", (data) => {
    // do something...
})
eventBusDev.on("test-event", (data1, data2) => {
    // do something...
})
// Warning: expected argument number: 1, actual argument number: 2
```

When you removed an event handler that is unadded:

```JavaScript
eventBusDev.off("event-name", unaddedEventHandler)
// Warning: unadded event handler: "unaddedEventHandler"
```

When you removed an event that is unadded

```JavaScript
eventBusDev.off("unadded-event", eventHandler)
// Warning: unadded event name: "unadded-event"
```

## TODO

- Add test codes
- Type check feature
