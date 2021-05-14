import React, { ChangeEvent, FC, KeyboardEvent, ReactElement, useState } from 'react'

type AddItemFormType = {
    addTask: (title: string) => void
}

const AddItemForm: FC<AddItemFormType> = ({ addTask }): ReactElement => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value) }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) { addItem(title) }
    }
    function addItem(value: string) {
        if (value.trim() !== "") {
            addTask(value.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    // const [todoListses, settodoListses] = useState('')

    // const onChangeTodoHandler = (e: ChangeEvent<HTMLInputElement>) => { settodoListses(e.currentTarget.value) }
    // const onKeyPressTodoHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.charCode === 13) { addItemTask(todoListses) }
    // }
    // function addItemTask(value: string) {
    //     if (value.trim() !== "") {
    //         addTodoList(value.trim(),)
    //         settodoListses('')
    //     }
    // }


    return (
        <div>
            {/* <input value={todoListses}
                onChange={onChangeTodoHandler}
                onKeyPress={onKeyPressTodoHandler} />
            <button onClick={() => addItemTask(todoListses)}>+</button> */}
            <input value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={() => addItem(title)}>+</button>
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default AddItemForm
