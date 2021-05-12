import React, { ChangeEvent, FC, ReactElement, useState, KeyboardEvent } from 'react';
import { FilterValuesType, TasksType } from '../App'

type TodoListType = {
    title: string
    tasks: Array<TasksType>
    removeTasks: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (task: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}

const TodoList: FC<TodoListType> = ({ tasks, title, removeTasks, changeFilter, addTask, changeStatus }): ReactElement => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setTask(e.currentTarget.value) }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => { if (e.charCode === 13) { addItem(taske) } }
    const onAllChangeFilter = () => changeFilter("all")
    const onActiveChangeFilter = () => changeFilter("active")
    const onCompletedChangeFilter = () => changeFilter("completed")



    const [taske, setTask] = useState('')

    function addItem(value: string) {
        if (value.trim() !== "") {
            addTask(value.trim())
            setTask('')
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
                <button onClick={onAllChangeFilter}>All</button>
                <button onClick={onActiveChangeFilter}>Active</button>
                <button onClick={onCompletedChangeFilter}>Completed</button>
            </div>
        </div >
    )
}

export default TodoList
