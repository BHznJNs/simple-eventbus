# simple-eventbus

A simple implementation of TypeScript / JavaScript EventBus.

## Usage

Import package:

```shell
npm i -s @bhznjns/simple-eventbus
```

```JavaScript
import EventBus from "@bhznjns/simple-eventbus"

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