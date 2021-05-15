import React, { useReducer, useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { v1 } from 'uuid'
import AddItemForm from './components/AddItemForm';
import { Paper, AppBar, Button, Container, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import { MenuOpen } from '@material-ui/icons';

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

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

export type FilterValuesType = "all" | "active" | "completed"

function AppWithReducers() {

    const todoListId1 = v1()
    const todoListId2 = v1()
    const todoListId3 = v1()

    let [todoLists, setTodoLists] = useState([
        { id: todoListId1, title: "What to learn", filter: "all" },
        { id: todoListId2, title: "What to buy", filter: "all" },
        { id: todoListId3, title: "What to remember", filter: "all" }
    ])

    let [tasksObj, setTasksObj] = useState({
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
        [todoListId3]: [
            { id: v1(), title: 'Car', isDone: true },
            { id: v1(), title: 'Home', isDone: false },
            { id: v1(), title: 'Dog', isDone: true }
        ],
    })

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let todoList = todoLists.find(tl => tl.id === todoListId);
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

    function removeTasksObj(id: string) {
        let resultState = todoLists.filter(e => e.id !== id)
        todoLists = resultState
        setTodoLists([...todoLists])
    }

    function addTodoList(title: string) {
        let newTodoList: TodoListType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasksObj({
            ...tasksObj,
            [newTodoList.id]: []
        })
    }

    function changeTaskTitle(taskId: string, newValue: string, todoListId: string) {
        let task = tasksObj[todoListId].find(e => e.id === taskId)
        if (task) {
            task.title = newValue
            setTasksObj({ ...tasksObj })
        }
    }

    const onChangeTodoListTitle = (title: string, todoListId: string) => {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuOpen />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: "20px" }} >
                    <AddItemForm addTask={addTodoList} />
                </Grid>
                <Grid container spacing={10}>
                    {
                        todoLists.map((tl) => {

                            if (tl.filter === "active") {
                                tasksObj[tl.id] = tasksObj[tl.id].filter(e => e.isDone === false)
                            }
                            if (tl.filter === "completed") {
                                tasksObj[tl.id] = tasksObj[tl.id].filter(e => e.isDone === true)
                            }

                            return <Grid item>
                                <Paper style={{ padding: "20px" }}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        todoTitle={tl.title}
                                        tasks={tasksObj[tl.id]}
                                        removeTasks={removeTasks}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTasksObj={removeTasksObj}
                                        changeTaskTitle={changeTaskTitle}
                                        onChangeTodoListTitle={onChangeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
