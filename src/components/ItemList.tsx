import { useContext, useEffect, useMemo, useState } from "react";
import { ItemListContext, ItemListProvider } from "../context/TodoListContext";
import { IItemService } from "../service/IItemService";
import { LocalStorageItemService } from "../service/LocalStorageItemService";
import { IItem } from "../types/IItem";
import { Item } from "./Item";
import './ItemList.css'

interface IList<T> {
    // data: T[]
}

export const ItemList = () => {
    const [items, setItems] = useState([] as IItem[]);
    const itemService: IItemService = useMemo(() => new LocalStorageItemService(), []);

    useEffect(() => {
        const data = itemService.getItemFromStorage();
        setItems(data)
    }, [])

    const addNewItem = () => {
        if (!items[items.length - 1]?.init) {
            const newItem = {
                name: "",
                editable: true
            } as IItem;
            itemService.addItemToStorage(newItem);
            setItems([...items, newItem]);
        }
    }

    const updateItem = (newItem: IItem) => {
        const foundIdx = items.findIndex(i => i.id == newItem.id)
        if (foundIdx >= 0) {
            const foundItem = items[foundIdx];
            newItem = {
                ...foundItem,
                ...newItem
            }
            items[foundIdx] = newItem;
            itemService.updateItem(newItem);
            setItems([...items]);
        }
    }

    const removeItem = (id: number) => {
        const newItems = items.filter(i => i.id != id);
        itemService.removeItem({ id: id } as IItem);
        setItems(newItems);
    }

    return (
        <div className="card">
            <div className="card-body">
                {
                    items && items.length > 0 ?
                        items.map((item, i) => (<Item key={item.id} taskItem={item} updateItem={updateItem} removeItem={removeItem} itemService={itemService} />)) :
                        (<p className='not-found'>Not found</p>)
                }
            </div>
            <button className="btn btn-new" onClick={addNewItem}>+ New task</button>
        </div>
    );
}