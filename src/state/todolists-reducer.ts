import { v1 } from 'uuid';
import { TodoListType } from './../AppWithReducers';

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id != action.id)
        }
        case "ADD-TODOLIST": {
            return [...state, {
                id: v1(),
                title: action.title,
                filter: "all"
            }]
        }
        case "CHANGE-TODOLIST-TITLE": {
            let todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title
            }
        }
        case "CHANGE-TODOLIST-FILTER": {
            let todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter
            }
        }
            return [...state]
    }
}
