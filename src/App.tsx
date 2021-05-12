import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { v1 } from 'uuid'

export type TasksType = {
    id: string,
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const [state, setstate] = useState<Array<TasksType>>([
        { id: v1(), title: 'HTML', isDone: true },
        { id: v1(), title: 'CSS', isDone: false },
        { id: v1(), title: 'JS', isDone: true }
    ])
    const [filter, setfilter] = useState<FilterValuesType>('all')

    const changeFilter = (value: FilterValuesType) => {
        setfilter(value)
    }


    let filterValues = state;

    if (filter === 'completed') {
        filterValues = state.filter(e => e.isDone === true)
    }
    if (filter === 'active') {
        filterValues = state.filter(e => e.isDone === false)
    }

    function removeTasks(id: string) {
        let resultState = state.filter(e => e.id !== id)
        setstate(resultState)
    }

    function addTask(task: string) {
        let newTask = {
            id: v1(),
            title: task,
            isDone: false
        }
        setstate([...state, newTask])
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = state.find(e => e.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setstate([...state])
    }

    return (
        <div className="App">
            <TodoList
                title={'What to Learn'}
                tasks={filterValues}
                removeTasks={removeTasks}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus} />
        </div>
    );
}

export default App;
