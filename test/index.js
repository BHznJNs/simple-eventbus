import EventBus from "../src/index.js";
import "./modules/module1.js";
import "./modules/module2.js";
const eventBus = new EventBus();
const testEvent1 = () => {
    console.log("test event 1");
};
const testEvent2 = () => {
    console.log("test event 2");
};
eventBus.on("test-event", testEvent1);
eventBus.on("test-event", testEvent2);
eventBus.emit("test-event", undefined);
console.log("- - - - - -");
eventBus.off("test-event", testEvent1);
eventBus.emit("test-event", undefined);
console.log("- - - - - -");
eventBus.off("test-event", testEvent2);
eventBus.emit("test-event", undefined);
