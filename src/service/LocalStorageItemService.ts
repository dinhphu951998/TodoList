import { IItem } from "../types/IItem";
import { IItemService } from "./IItemService";

const STORAGE_NAME = "data";
export class LocalStorageItemService implements IItemService {
  removeItem = (item: IItem) => {
    const allItems = this.getItemFromStorage();
    const newList = allItems.filter((i) => i.id !== item.id);
    this.saveAllItems(newList);
  };

  updateItem = (item: IItem) => {
    const items = this.getItemFromStorage();
    const idx = items.findIndex((i) => i.id === item.id);
    if (idx >= 0) {
      items[idx] = item;
      this.saveAllItems(items);
    }
  };

  getItemFromStorage = () => {
    return JSON.parse(localStorage.getItem(STORAGE_NAME) ?? "[]") as IItem[];
  };

  addItemToStorage = (item: IItem) => {
    const allItems = this.getItemFromStorage();
    item.id = allItems.length + 1;
    allItems.push(item);
    this.saveAllItems(allItems);
    return item;
  };
  private saveAllItems = (items: IItem[]) => {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(items));
  };
}
