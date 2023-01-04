import assert from "node:assert/strict"
import EventBusDev from "../src/dev.js"
import { hasProperty, checkType } from "./util.js"

describe("EventBusDev", () => {
    it("export should be a class", () => {
        const typeIsClass = EventBusDev.toString().startsWith("class")
        assert.equal(typeIsClass, true)
    })
})