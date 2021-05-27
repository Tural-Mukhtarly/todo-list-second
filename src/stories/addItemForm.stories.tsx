import React from 'react'
import { AddItemForm } from '../AddItemForm'
import {action} from "@storybook/addon-actions"

export default {
    title: "AddItemFormComponent",
    component: AddItemForm
}

const callback = action('hello')

export const AddItemFormBaseExample = (props: any) => {
    return <t callback/>
}