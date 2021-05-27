import { testingReducer } from './testing-reducer';

test("Testing", () => {
    const startState = { id: 1, name: "tural", age: 26, count: 1 }

    const endState = testingReducer(startState, { type: "INCREMENT", payload: 2 })

    expect(endState.age).toBe(27)
})

test("Testing NAME", () => {
    const startState = { id: 1, name: "tural", age: 26, count: 1 }
    const endState = testingReducer(startState, { type: "NEW-NAME", payload: "Hasan" })
    expect(endState.name).toBe("Hasan")
})

test("Testing Count", () => {
    const startState = { id: 1, name: "tural", age: 26, count: 1 }
    const endState = testingReducer(startState, { type: "NEW-COUNT", payload: 2 })
    expect(endState.count).toBe(3)
})