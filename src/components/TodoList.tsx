import React, { ChangeEvent, FC, ReactElement } from 'react';
import { FilterValuesType, TasksType } from '../App'
import AddItemForm from './AddItemForm';

type TodoListType = {
    id: string
    todoTitle: string
    tasks: Array<TasksType>
    removeTasks: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (task: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTasksObj: (id: string) => void
    filter: string
}

const TodoList: FC<TodoListType> = ({ tasks, todoTitle, removeTasks, changeFilter, addTask, changeStatus, filter, id, removeTasksObj }): ReactElement => {


    const onAllChangeFilter = () => changeFilter("all", id)
    const onActiveChangeFilter = () => changeFilter("active", id)
    const onCompletedChangeFilter = () => changeFilter("completed", id)


    function addItem(title: string) {
        addTask(title, id)
    }


    return (
        <div className="todoList">
            <h3>{todoTitle}<button onClick={() => removeTasksObj(id)}>x</button></h3>
            <AddItemForm addTask={addItem} />
            <ul>
                {
                    tasks.map((t) => {

                        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            changeStatus(t.id, e.currentTarget.checked, id)
                        }
                        return <li key={t.id}><input onChange={onChangeStatus} type="checkbox" checked={t.isDone} />
                            <span>{t.title}</span>
                            <button onClick={() => { removeTasks(t.id, id) }}>x</button>
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
