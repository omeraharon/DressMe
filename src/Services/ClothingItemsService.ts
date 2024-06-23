import ClothingItemModel from "../Models/ClothingItemModel";
import clothingItemsStore from "../Store/ClothingItemsStore";

export const getItemsByType = (type: string) => {
    return clothingItemsStore.getClothingItems?.filter((item: ClothingItemModel) => item.type === type)
}