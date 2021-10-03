import React, { PropsWithChildren, useState } from "react";
import { IItem } from "../types/IItem";


export interface IItemListContext {
    data: IItem[];
    total: number;
    saveItem: (item: IItem) => void;
    removeItem: (item: IItem) => void;
}

export const ItemListContext = React.createContext<IItemListContext>({
    data: [],
    total: 0,
    saveItem: () => { },
    removeItem: () => { }
})

interface IState {
    data: IItem[],
    total: number
}

const defaultValue: IItem[] = [
    {
        id: 1,
        name: 'Complete website',
        completed: true
    }, {
        id: 2,
        name: 'Go to sleep'
    }, {
        id: 3,
        name: 'Create TodoList website',
        completed: true
    }, {
        id: 4,
        name: 'Learn ReactJS',
    }
]

export const ItemListProvider = (props: PropsWithChildren<{}>) => {

    const [globalData, setGlobalData] = useState<IState>({
        data: defaultValue,
        total: 0
    })

    const addNewItem = () => {
        const items = globalData.data;
        if(items[items.length - 1]?.name){
            
        }
    }

    const saveItem = (item: IItem) => {
        const found = globalData.data.filter(d => d.id === item.id)
        let newData: IItem[] = []
        if (!found) {
            item.id = globalData.total ? globalData.total + 1 : 1
            globalData.data.push(item)
        } else {
            newData = globalData.data.map(d => {
                if (d.id === item.id) {
                    return item
                }
                return d
            })
        }
        //    ...global, data: [...data, item]
        setGlobalData({ ...globalData, data: [...newData] })
    }

    const removeItem = (item: IItem) => {
        const newData = globalData.data.filter(d => d.id !== item.id)
        setGlobalData({ ...globalData, data: newData })
    }

    return (<ItemListContext.Provider value={{
        ...globalData,
        saveItem: saveItem,
        removeItem: removeItem
    }}>
        {props.children}
    </ItemListContext.Provider>)


}
