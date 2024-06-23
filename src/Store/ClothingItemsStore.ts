import { makeAutoObservable } from "mobx"
import { persistStore } from "../Services/MobxService";
import ClothingItemModel from "../Models/ClothingItemModel";

class ClothingItemsStore {

    constructor() {
        makeAutoObservable(this)
    }

    clothingItems: ClothingItemModel[] = []
    clothingSets: ClothingItemModel[] = [];

    async loadStoreData() {
        await persistStore(this, this.persist_data, "ClothingItemsStore");
    }
    
    persist_data = ["clothingSets"]

    get getClothingItems() {
        return this.clothingItems
    }

    get getClothingSets() {
        return this.clothingSets
    }

    setClothingItems(clothingItems: ClothingItemModel[]) {
        this.clothingItems = clothingItems;
    }

    setClothingSets(clothingSets: ClothingItemModel[]) {
        this.clothingSets = clothingSets;
    }
   
}

const clothingItemsStore = new ClothingItemsStore();
export default clothingItemsStore;