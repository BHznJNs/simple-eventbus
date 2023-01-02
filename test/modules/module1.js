import EventBus from "../EventBus.js";
EventBus.on("test-module-event", (data) => {
    console.log("test event " + data);
});
