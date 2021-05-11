import React, { ChangeEvent, FC, ReactElement, useState, KeyboardEvent } from 'react';
import { FilterValuesType, TasksType } from '../App'

type TodoListType = {
    title: string
    tasks: Array<TasksType>
    removeTasks: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (task: string) => void
}

const TodoList: FC<TodoListType> = ({ tasks, title, removeTasks, changeFilter, addTask }): ReactElement => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setTask(e.currentTarget.value) }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => { if (e.charCode === 13) { addItem(taske) } }
    const onAllChangeFilter = () => changeFilter("all")
    const onActiveChangeFilter = () => changeFilter("active")
    const onCompletedChangeFilter = () => changeFilter("completed")


    const [taske, setTask] = useState('')

    function addItem(value: string) {
        addTask(value)
        setTask('')
    }

    return (
        <div>
            <h3>{title}</h3>
            <input value={taske}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={() => addItem(taske)}>+</button>
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
                <button onClick={onAllChangeFilter}>All</button>
                <button onClick={onActiveChangeFilter}>Active</button>
                <button onClick={onCompletedChangeFilter}>Completed</button>
            </div>
        </div >
    )
}

export default TodoList
