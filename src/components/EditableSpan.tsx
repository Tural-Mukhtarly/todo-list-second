import React, { ChangeEvent, useState } from 'react'


type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}

function EditableSpan(props: EditableSpanType) {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("")

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value) }
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    return editMode ?
        <input onBlur={activateViewMode} value={title} autoFocus onChange={onChangeTitle} />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}



export default EditableSpan
