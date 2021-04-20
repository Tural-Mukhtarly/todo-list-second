import { todoListsReducer } from './todo-list-reducer';
import { v1 } from 'uuid';
import { TodolistType } from '../App';

// test('correct todolist should be removed', () => {
//     let todolistId1 = v1();
//     let todolistId2 = v1();

//     const startState: Array<TodolistType> = [
//         { id: todolistId1, title: "What to learn", filter: "all" },
//         { id: todolistId2, title: "What to buy", filter: "all" }
//     ]

//     const endState = todoListsReducer(startState, { type: 'REMOVE-TODOLIST', todoListID: todolistId1 })

//     expect(endState.length).toBe(1);
//     expect(endState[0].id).toBe(todolistId2);
// });

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();



    const startState: Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]


    const action = {
        type: "ADD-TODOLIST" as const,
        title: '123',
    }

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
