import { useContext, useState } from "react";
import { ItemListContext, ItemListProvider } from "../context/TodoListContext";
import { IItem } from "../types/IItem";
import { Item } from "./Item";
import './ItemList.css'

interface IList<T> {
    // items: T[]
}

export const ItemList = () => {
    const itemListContext = useContext(ItemListContext)
    const itemList = itemListContext.data

    const addItem = () => {

    }

    const removeItem = (index: number) => {

    }

    return (
        <div className="card">
            <div className="card-body">
                <ItemListContext.Consumer>
                    {
                        value => (
                            value.data && value.data.length > 0 ?
                                value.data.map((item, i) => (<Item id={item.id} key={item.id} name={item.name} completed={item.completed} editable={item.editable} />)) :
                                (<p className='not-found'>Not found</p>)
                        )
                    }
                </ItemListContext.Consumer>
            </div>
            <button className="btn btn-new" onClick={addItem}>+ New task</button>
        </div>
    );
}