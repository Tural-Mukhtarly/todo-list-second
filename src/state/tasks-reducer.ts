import { TasksStateType } from "../App";
import { v1 } from "uuid";

type FirstAT = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}
type SecondAT = {
    type: "CHANGE-TASK"
    title: string
}


type ActionType = FirstAT | SecondAT

export const tasksReducer = (todoLists: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const copyState = { ...todoLists }
            copyState[action.todolistId] = copyState[action.todolistId].filter(tasks => tasks.id !== action.taskId)
            return copyState
        }
        case "CHANGE-TASK": {
            const newTask: SecondAT = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return [...todoLists, newTask]
        }
        default:
            return todoLists
    }

}
export const removeTaskAC = (taskId: string, todolistId: string): FirstAT => {
    return {
        type: "REMOVE-TASK",
        taskId,
        todolistId
    }
}

export const addTaskAC = (title: string): SecondAT => {
    return {
        type: "CHANGE-TASK",
        title
    }
}
