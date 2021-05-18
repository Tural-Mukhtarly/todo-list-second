import { Button, Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent, FC, ReactElement } from 'react';
import { FilterValuesType, TasksType } from '../App'
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

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
    changeTaskTitle: (id: string, newValue: string, todoListId: string) => void
    onChangeTodoListTitle: (title: string, todoListId: string) => void
}

const TodoList: FC<TodoListType> = ({
    tasks,
    todoTitle,
    removeTasks,
    changeFilter,
    addTask,
    changeStatus,
    filter, id,
    removeTasksObj,
    changeTaskTitle,
    onChangeTodoListTitle

}): ReactElement => {

    const onAllChangeFilter = () => changeFilter("all", id)
    const onActiveChangeFilter = () => changeFilter("active", id)
    const onCompletedChangeFilter = () => changeFilter("completed", id)

    console.log(tasks);

    function addItem(title: string) {
        addTask(title, id)
    }
    const OnChangeTodoTitleHandler = (newValue: string) => {
        onChangeTodoListTitle(newValue, id)
    }

    return (
        <div className="todoList">
            <h3><EditableSpan title={todoTitle} onChange={OnChangeTodoTitleHandler} />
                <IconButton onClick={() => removeTasksObj(id)}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addTask={addItem} />
            <ul>
                {
                    tasks.map((t) => {

                        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            changeStatus(t.id, e.currentTarget.checked, id)
                        }

                        const OnChangeEditableTitleHandler = (newValue: string) => {
                            changeTaskTitle(t.id, newValue, id)
                        }


                        return <li key={t.id}><Checkbox onChange={onChangeStatus} checked={t.isDone} />
                            <EditableSpan title={t.title} onChange={OnChangeEditableTitleHandler} />
                            <Button onClick={() => { removeTasks(t.id, id) }}>
                                <Delete />
                            </Button>
                        </li>
                    })
                }
            </ul>
            <div>
                <Button color="primary" variant={filter === "all" ? "contained" : "text"} onClick={onAllChangeFilter}>All</Button>
                <Button color="primary" variant={filter === "active" ? "contained" : "text"} onClick={onActiveChangeFilter}>Active</Button>
                <Button color="primary" variant={filter === "completed" ? "contained" : "text"} onClick={onCompletedChangeFilter}>Completed</Button>
            </div>
        </div >
    )
}

export default TodoList
