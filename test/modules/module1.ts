import EventBus from "../EventBus.js"

EventBus.on("test-module-event", (data: String) => {
    console.log("test event " + data)
})