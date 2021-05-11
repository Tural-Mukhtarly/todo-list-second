import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { v1 } from 'uuid'

export type TasksType = {
    id: string,
    title: string
    isDone: boolean
}
function App() {

    const tasks: Array<TasksType> = [
        { id: v1(), title: 'HTML', isDone: true },
        { id: v1(), title: 'CSS', isDone: false },
        { id: v1(), title: 'JS', isDone: true }
    ]

    return (
        <div className="App">
            <TodoList title={'What to LEARN'} tasks={tasks} />
        </div>
    );
}

export default App;
