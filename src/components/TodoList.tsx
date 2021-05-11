import React, { FC, ReactElement } from 'react';
import { TasksType } from '../App'

type TodoListType = {
    title: string,
    tasks: Array<TasksType>
}

const TodoList: FC<TodoListType> = ({ tasks, title }): ReactElement => {

    const newElement = tasks.map((e) => {
        return <li key={e.id}><input type="checkbox" checked={e.isDone} /><span>{e.title}</span></li>
    })

    return (
        <div>
            <h3>{title}</h3>
            <input type="text" />
            <ul>
                {newElement}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}

export default TodoList
