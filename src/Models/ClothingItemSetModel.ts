import ClothingItemModel from "./ClothingItemModel";

interface ClothingItemSet {
    id: number;
    createdDate: string;
    setCreationTime: string;
    shirt: ClothingItemModel;
    pants: ClothingItemModel;
    shoes: ClothingItemModel;
}

export default ClothingItemSet