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

    let tasks: Array<TasksType> = [
        { id: v1(), title: 'HTML', isDone: true },
        { id: v1(), title: 'CSS', isDone: false },
        { id: v1(), title: 'JS', isDone: true }
    ]

    const [state, setstate] = useState(tasks)

    const [filter, setfilter] = useState<FilterValuesType>('completed')

    const changeFilter = (value: FilterValuesType) => {
        setfilter(value)
    }

    let filterValues = state;

    if (filter === 'completed') {
        filterValues = tasks.filter(e => e.isDone === true)
    }
    if (filter === 'active') {
        filterValues = tasks.filter(e => e.isDone === false)
    }


    function removeTasks(id: string) {
        let resultState = state.filter(e => e.id !== id)
        setstate(resultState)
    }


    return (
        <div className="App">
            <TodoList title={'What to Learn'} tasks={filterValues} removeTasks={removeTasks} changeFilter={changeFilter} />
        </div>
    );
}

export default App;
