import { useState } from "react";
import { IItem } from "../types/IItem";
import { Item } from "./Item";
import './ItemList.css'

interface IList<T> {
    items: T[]
}

export const ItemList = function ({ items, ...props }: IList<IItem>) {
    const [itemList, setItems] = useState<IItem[]>(items)
    console.log('reload <ItemList>')
    console.log(itemList)

    const addItem = () => {
        setItems((previousState) => {
            const newItem: IItem = {
                name: '',
                editable: true
            }
            return [...previousState, newItem];
        })
    }


    const removeItem = (index: number) => {
        if (index >= 0 && index < itemList.length) {
            itemList.splice(index, 1)
            setItems([...itemList])
        }
    }

    const removeItemByName = (name: string) => {
        const newList = itemList.filter(i => i.name !== name)
        setItems([...newList])
    }

    return (
        <div className="card">
            <div className="card-body">
                {
                    itemList && itemList.length > 0 ?
                        itemList.map((item, i) => (<Item removeItemByName={removeItemByName} removeItem={removeItem} index={i} key={item.name} name={item.name} completed={item.completed} editable={item.editable} />)) :
                        (<p className='not-found'>Not found</p>)
                }
            </div>
            <button className="btn btn-new" onClick={addItem}>+ New task</button>
        </div>
    );
}