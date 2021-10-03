import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ItemListContext } from '../context/TodoListContext';
import { IItemService } from '../service/IItemService';
import { IItem } from '../types/IItem';
import './Item.css'

export interface IItemProps {
    taskItem: IItem,
    itemService: IItemService;
    updateItem: (item: IItem) => void
    removeItem: (index: number) => void,
}

export const Item = ({ taskItem, updateItem, removeItem, itemService }: IItemProps) => {
    const [editable, setEditable] = useState<boolean>(taskItem.editable ?? false);
    const [completed, setCompleted] = useState<boolean>(!!taskItem.completed);

    const updateEditable = () => {
        setEditable(true);
    }

    const finishEdit = (e: any) => {
        e.preventDefault();
        const value = e.target.value
        if (value) {
            setEditable(false)
            updateItem({ ...taskItem, name: value, editable: false })
        }
    }

    const remove = () => {
        removeItem(taskItem.id)
    }

    const markComplete = (e: any) => {
        const complete = e.currentTarget.checked
        setCompleted(complete);
        itemService.updateItem({ ...taskItem, completed: complete })
    }

    return (
        <div className={completed ? 'item checked' : 'item'}>
            <input type="checkbox" className="checkbox" checked={completed} onChange={markComplete} />
            <div className="item-name">
                {editable ?
                    <input type='text' className="item-name-input" onBlurCapture={finishEdit} defaultValue={taskItem.name} autoFocus={true} /> :
                    <p onClick={updateEditable}>{taskItem.name}</p>}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 remove-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={remove}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </div>
    );
}