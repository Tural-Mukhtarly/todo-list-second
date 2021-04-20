import { v1 } from "uuid"
import { TodolistType } from '../App'


type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}

type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
}

type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

type ChangeTodoListAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}


type AllActions = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT

export const todoListsReducer = (todoLists: Array<TodolistType>, action: AllActions): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodolistId = v1();
            const newTodolist: TodolistType = { id: newTodolistId, title: action.title, filter: 'all' };
            return [...todoLists, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            const todolist = todoLists.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...todoLists]
        default:
            return todoLists
    }
}