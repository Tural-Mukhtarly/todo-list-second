import { IconButton, TextField } from '@material-ui/core'
import { ControlPoint } from '@material-ui/icons'
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
    return (
        <div>
            <TextField value={title}
                label="Type value"
                variant="outlined"
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton color="secondary" onClick={() => addItem(title)}>
                <ControlPoint />
            </IconButton>
        </div>
    )
}

export default AddItemForm
