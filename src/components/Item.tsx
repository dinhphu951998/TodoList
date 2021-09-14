import React, { useContext, useState } from 'react';
import { ItemListContext } from '../context/TodoListContext';
import { IItem } from '../types/IItem';
import './Item.css'

export interface IItemProps {
    id: number,
    name: string,
    description?: string,
    completed?: boolean,
    editable?: boolean,
    // removeItem: (index: number) => void,
    // removeItemByName: (name: string) => void
}

export const Item = (props: IItemProps) => {
    const itemListContext = useContext(ItemListContext)
    const [editable, setEditable] = useState<boolean>(props.editable ?? false);

    const checked = !!props.completed
    const item: IItem = {
        id: props.id,
        name: props.name,
        completed: props.completed
    }

    const toggleEdit = () => {
        setEditable(true);
    }

    const finishEdit = (e: any) => {
        const value = e.target.value
        console.log(value)
        if (value) {
            itemListContext.saveItem({ ...item, name: value })
            // setEditable(false)
        } else {
            const confirmed = window.confirm('Do you want to remove this item?')
            if (confirmed) {
                remove()
            }
        }
    }

    const remove = () => {
        itemListContext.removeItem(item)
    }

    const markComplete = (e: any) => {
        const complete = e.currentTarget.checked
        itemListContext.saveItem({ ...item, completed: complete })
    }

    return (
        <div className={checked ? 'item checked' : 'item'}>
            <input type="checkbox" className="checkbox" checked={checked} onChange={markComplete} />
            <div className="item-name">
                {editable ?
                    <input type='text' className="item-name-input" onBlurCapture={finishEdit} defaultValue={props.name} autoFocus={true} /> :
                    <p onClick={toggleEdit}>{props.name}</p>}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 remove-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={remove}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </div>
    );
}