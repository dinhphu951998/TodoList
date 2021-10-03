import { IItem } from "./../types/IItem";

export interface IItemService {
  addItemToStorage: (item: IItem) => IItem;
  getItemFromStorage: () => IItem[];
  updateItem: (item: IItem) => void;
  removeItem: (item: IItem) => void;
}
