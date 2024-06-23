import { makeAutoObservable } from "mobx"
import { persistStore } from "../Services/MobxService";
import ClothingItemModel from "../Models/ClothingItemModel";

class ClothingItemsStore {

    constructor() {
        makeAutoObservable(this)
    }

    clothingItems: ClothingItemModel[] = []

    async loadStoreData() {
        await persistStore(this, this.persist_data, "ClothingItemsStore");
    }
    
    persist_data = [
    ]

    get getClothingItems() {
        return this.clothingItems
    }

    setClothingItems(clothingItems: ClothingItemModel[]) {
        this.clothingItems = clothingItems;
    }
   
}

const clothingItemsStore = new ClothingItemsStore();
export default clothingItemsStore;