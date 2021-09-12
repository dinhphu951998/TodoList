import React, { useState } from 'react';
import './Item.css'


export interface IItem {
    name: string,
    description?: string,
    completed?: boolean,
    editable?: boolean
}

export const Item = (props: IItem) => {
    const [checked, setChecked] = useState<boolean>(props.completed ?? false);
    const [editable, setEditable] = useState<boolean>(props.editable ?? false);
    const [name, setName] = useState<string>(props.name);

    function toggleEdit() {
        setEditable(true);
    }

    function finishEdit(e: any) {
        const value = e.target.value
        if (value && value != name) {
            setName(value)
        }
        setEditable(false)
    }

    return (
        <div className={checked && !editable ? 'item checked' : 'item'}>
            <input type="checkbox" className="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
            <div className="item-name">
                {editable ?
                    <input type='text' className="item-name-input" onBlurCapture={finishEdit} defaultValue={name} autoFocus={true} /> :
                    <p onClick={toggleEdit}>{name}</p>}
            </div>
            
        </div>
    );
}