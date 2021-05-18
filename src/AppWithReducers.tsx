import React, { useReducer } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { v1 } from 'uuid'
import AddItemForm from './components/AddItemForm';
import { Paper, AppBar, Button, Container, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import { MenuOpen } from '@material-ui/icons';
import { addTodolistAC, changeTodolistFilterAC, removeTodolistAC, todolistsReducer, changeTodolistTitleAC } from './state/todolists-reducer';
import { removeTaskAC, tasksReducer, addTaskAC, changeTaskStatusAC, changeTaskTitleAC } from './state/tasks-reducer';

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

    let [todoLists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        { id: todoListId1, title: "What to learn", filter: "all" },
        { id: todoListId2, title: "What to buy", filter: "all" },
        { id: todoListId3, title: "What to remember", filter: "all" }
    ])

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
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

    function removeTasks(id: string, todoListId: string) {
        const action = removeTaskAC(id, todoListId)
        dispatchToTasksReducer(action)
    }

    function addTask(task: string, todoListId: string) {
        const action = addTaskAC(task, todoListId)
        dispatchToTasksReducer(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todoListId)
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(taskId: string, newValue: string, todoListId: string) {
        const action = changeTaskTitleAC(taskId, newValue, todoListId)
        dispatchToTasksReducer(action)
    }

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        const action = changeTodolistFilterAC(value, todoListId)
        dispatchToTodolistsReducer(action)
    }

    function removeTasksObj(id: string) {
        const action = removeTodolistAC(id)
        dispatchToTodolistsReducer(action)
    }

    function addTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodolistsReducer(action)
    }

    const onChangeTodoListTitle = (title: string, todoListId: string) => {
        const action = changeTodolistTitleAC(title, todoListId)
        dispatchToTodolistsReducer(action)
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

                            let taskObjNew = tasksObj[tl.id]
                            if (tl.filter === "active") {
                                taskObjNew = taskObjNew.filter(e => e.isDone === false)
                            }
                            if (tl.filter === "completed") {
                                taskObjNew = taskObjNew.filter(e => e.isDone === true)
                            }


                            return <Grid item>
                                <Paper style={{ padding: "20px" }}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        todoTitle={tl.title}
                                        tasks={taskObjNew}
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
