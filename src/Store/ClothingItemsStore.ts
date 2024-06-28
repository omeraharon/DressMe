import { makeAutoObservable } from "mobx"
import { persistStore } from "../Services/MobxService";
import ClothingItemModel from "../Models/ClothingItemModel";
import ClothingItemSet from "../Models/ClothingItemSetModel";

class ClothingItemsStore {

    constructor() {
        makeAutoObservable(this)
    }

    clothingItems: ClothingItemModel[] = []
    clothingSets: ClothingItemSet[] = [];

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

    setClothingSets(clothingSets: ClothingItemSet[]) {
        this.clothingSets = clothingSets;
    }

    deleteSet(id: number) {
        this.clothingSets = this.clothingSets.filter(set => set.id !== id)
    }
   
}

const clothingItemsStore = new ClothingItemsStore();
export default clothingItemsStore;