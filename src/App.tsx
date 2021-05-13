import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { v1 } from 'uuid'

export type TasksType = {
    id: string,
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string,
    title: string
    filter: FilterValuesType

}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        { id: v1(), title: "What to learn", filter: "active" },
        { id: v1(), title: "What to buy", filter: "completed" },
        { id: v1(), title: "What to remember", filter: "active" }
    ])

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [tasksObj, setTasksObj] = useState({
        [todoListId1]: [
            { id: v1(), title: 'HTML', isDone: true },
            { id: v1(), title: 'CSS', isDone: false },
            { id: v1(), title: 'JS', isDone: true }
        ],
        [todoListId2]: [
            { id: v1(), title: 'Milk', isDone: true },
            { id: v1(), title: 'Bread', isDone: false },
            { id: v1(), title: 'Sugar', isDone: true }
        ],
    })

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        const todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }


    function removeTasks(id: string, todoListId: string) {
        let resultState = tasksObj[todoListId].filter(e => e.id !== id)
        tasksObj[todoListId] = resultState
        setTasksObj({ ...tasksObj })
    }

    function addTask(task: string, todoListId: string) {
        let newTask = {
            id: v1(),
            title: task,
            isDone: false
        }
        const tasks = tasksObj[todoListId]
        const newTasks = [...tasks, newTask]
        tasksObj[todoListId] = newTasks
        setTasksObj({ ...tasksObj })
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let task = tasksObj[todoListId].find(e => e.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({ ...tasksObj })
        }

    }

    // function removeTasksObj(id: string, todoListId: string) {
    //     let resultState = tasksObj[todoListId].filter(e => e.id !== id)
    //     tasksObj[todoListId] = resultState
    //     setTasksObj({ ...tasksObj })
    // }

    return (
        <div className="App">
            {
                todoLists.map((tl) => {
                    let filterValues = tasksObj[tl.id];

                    if (tl.filter === 'completed') {
                        filterValues = filterValues.filter(e => e.isDone === true)
                    }
                    if (tl.filter === 'active') {
                        filterValues = filterValues.filter(e => e.isDone === false)
                    }
                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={filterValues}
                        removeTasks={removeTasks}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter} />
                })
            }

        </div>
    );
}

export default App;
