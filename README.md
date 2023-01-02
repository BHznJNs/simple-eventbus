# simple-eventbus

A simple implementation of TypeScript / JavaScript EventBus.

## Usage

Import package:

```JavaScript
import EventBus from "src/index.js"

const eventBus = new EventBus()
```

Add event listen:

```JavaScript
eventBus.on("event-name", eventHandler)
```

Emit event:

```JavaScript
eventBus.emit("event-name", someData)
```

Remove event listen:

```JavaScript
eventBus.off("event-name", eventHandler)
```