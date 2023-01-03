import EventBusDev from "../src/dev.js"

const ebd = new EventBusDev()

const unaddedEventHandler = () => {}

// ebd.on("test-event", (data) => {
//     // do something...
// })
// ebd.on("test-event", (data1, data2) => {
//     // do something...
// })

ebd.on("event-name", () => {})
ebd.off("event-name", unaddedEventHandler)
