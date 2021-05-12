import React, { ChangeEvent, FC, ReactElement, useState, KeyboardEvent } from 'react';
import { FilterValuesType, TasksType } from '../App'

type TodoListType = {
    title: string
    tasks: Array<TasksType>
    removeTasks: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (task: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: string
}

const TodoList: FC<TodoListType> = ({ tasks, title, removeTasks, changeFilter, addTask, changeStatus, filter }): ReactElement => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setTask(e.currentTarget.value) }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) { addItem(taske) }
    }

    const onAllChangeFilter = () => changeFilter("all")
    const onActiveChangeFilter = () => changeFilter("active")
    const onCompletedChangeFilter = () => changeFilter("completed")



    const [taske, setTask] = useState('')
    const [error, setError] = useState<string | null>(null)

    function addItem(value: string) {
        if (value.trim() !== "") {
            addTask(value.trim())
            setTask('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <input value={taske}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={() => addItem(taske)}>+</button>
            {error && <div className="error">{error}</div>}
            <ul>
                {
                    tasks.map((t) => {

                        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            changeStatus(t.id, e.currentTarget.checked)
                        }
                        return <li key={t.id}><input onChange={onChangeStatus} type="checkbox" checked={t.isDone} />
                            <span>{t.title}</span>
                            <button onClick={() => { removeTasks(t.id) }}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={filter === "all" ? "active-filter" : ""} onClick={onAllChangeFilter}>All</button>
                <button className={filter === "active" ? "active-filter" : ""} onClick={onActiveChangeFilter}>Active</button>
                <button className={filter === "completed" ? "active-filter" : ""} onClick={onCompletedChangeFilter}>Completed</button>
            </div>
        </div >
    )
}

export default TodoList
