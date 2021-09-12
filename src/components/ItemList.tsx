import { useState } from "react";
import { IItem, Item } from "./Item";
import './ItemList.css'

interface IList<T> {
    items: T[]
}

export const ItemList = function ({ items, ...props }: IList<IItem>) {
    const [itemList, setItems] = useState<IItem[]>(items)


    const addItem = () => {
        setItems((previousState) => [...previousState, { name: '', editable: true }])
    }

    const updateItem = (index: number, newItem: IItem) => {
        if (index >= 0 && index < itemList.length) {
            itemList[index] = newItem
        }
        setItems([...itemList])
    }

    const deleteItem = (index: number) => {
        if (index >= 0 && index < itemList.length) {
            const newList = itemList.splice(index, 1)
            setItems([...newList])
        }
    }

    return (
        <div className="card">
            <div className="card-body">
                {
                    itemList && itemList.length > 0 ?
                        itemList.map((item, i) => <Item name={item.name} completed={item.completed} editable={item.editable} key={i} />) :
                        (<p className='not-found'>Not found</p>)
                }
            </div>
            <button className="btn btn-new" onClick={addItem}>+ New task</button>
        </div>
    );
}