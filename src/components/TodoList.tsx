import React, { FC, ReactElement, useState } from 'react';
import { FilterValuesType, TasksType } from '../App'

type TodoListType = {
    title: string
    tasks: Array<TasksType>
    removeTasks: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
}

const TodoList: FC<TodoListType> = ({ tasks, title, removeTasks, changeFilter }): ReactElement => {

    return (
        <div>
            <h3>{title}</h3>
            <input type="text" />
            <ul>
                {

                    tasks.map((e) => {
                        return <li key={e.id}><input type="checkbox" checked={e.isDone} />
                            <span>{e.title}</span>
                            <button onClick={() => { removeTasks(e.id) }}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={() => changeFilter("all")}>All</button>
                <button onClick={() => changeFilter("active")}>Active</button>
                <button onClick={() => changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList
