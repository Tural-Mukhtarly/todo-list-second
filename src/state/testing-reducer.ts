type StateType = {
    id: number
    name: string
    age: number
    count: number
}

type ActionType = {
    type: string
    payload: any
}

export const testingReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, age: state.age + 1 }
        case "NEW-NAME":
            return { ...state, name: action.payload }
        case "NEW-COUNT":
            return { ...state, count: state.count + action.payload }
        default:
            return state;
    }
}