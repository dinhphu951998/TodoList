import { useContext, useState } from "react";
import { ItemListContext, ItemListProvider } from "../context/TodoListContext";
import { IItem } from "../types/IItem";
import { Item } from "./Item";
import './ItemList.css'

interface IList<T> {
    // items: T[]
}

export const ItemList = () => {
    const [items, setItems] = useState([] as IItem[]);


    const addNewItem = () => {
        if (!items[items.length - 1]?.init) {
            const newItem: IItem = {
                id: items.length + 1,
                name: "",
                editable: true
            }
            setItems([...items, newItem]);
        }
    }

    const updateItem = (newItem: IItem) => {
        const foundIdx = items.findIndex(i => i.id == newItem.id)
        if (foundIdx >= 0) {
            const foundItem = items[foundIdx];
            newItem = {
                ...foundItem,
                name: newItem.name
            }
            items[foundIdx] = newItem;
            setItems([...items]);
        }
    }

    const removeItem = (id: number) => {
        const newItems = items.filter(i => i.id != id)
        setItems(newItems)
    }

    return (
        <div className="card">
            <div className="card-body">
                {
                    items && items.length > 0 ?
                        items.map((item, i) => (<Item key={item.id} taskItem={item} updateItem={updateItem} removeItem={removeItem} />)) :
                        (<p className='not-found'>Not found</p>)
                }
            </div>
            <button className="btn btn-new" onClick={addNewItem}>+ New task</button>
        </div>
    );
}