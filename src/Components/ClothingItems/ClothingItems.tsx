import { Col } from "react-bootstrap";
import RouteTitle from "../RouteTitle/RouteTitle";
import { RouteNames, Routes } from "../../Enums/Routes";

import { observer } from "mobx-react-lite";
import ClothingItemModel from "../../Models/ClothingItemModel";
import ClothingItemCard from "../ClothingItemCard/ClothingItemCard";
import { useNavigate, useParams } from "react-router-dom";
import { getItemsByType } from "../../Services/ClothingItemsService";
import clothingItemsStore from "../../Store/ClothingItemsStore";
import Form from "react-bootstrap/Form";
import { ClothingItemsTypes } from "../../Enums/ClothingItems";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DateTime } from "luxon";
import ClothingItemSet from "../../Models/ClothingItemSetModel";

import "./ClothingItems.css";

const ClothingItems: React.FC = () => {
    const { type } = useParams();
    const navigate = useNavigate();

    const [clothingItems, setClothingItems]: [ClothingItemModel[], Dispatch<SetStateAction<ClothingItemModel[]>>] = useState<ClothingItemModel[]>([]);
    const [clothingSetItem, setClothingSetItem]: [ClothingItemSet | null, Dispatch<SetStateAction<ClothingItemSet | null>>] =
        useState<ClothingItemSet | null>(null);

    const [colorValue, setColorValue] = useState("");
    const [sizeValue, setSizeValue] = useState("");

    const [firstItemTime, setFirstItemTime]: [DateTime<any> | null, Dispatch<SetStateAction<DateTime<any> | null>>] = useState<DateTime<any> | null>(
        null
    );

    useEffect(() => {
        clothingItemsStore.getClothingItems.length && initClothingItems();
    }, [type, clothingItemsStore.getClothingItems]);

    const initClothingItems = () => {
        const filteredClothingItems = getAllFilteredItems();

        setClothingItems(filteredClothingItems);
    };
    const getAllFilteredItems = () => {
        const clothingItemsByType = getItemsByType(type || "");
        return clothingItemsByType.length ? clothingItemsByType : clothingItemsStore.getClothingItems;
    };

    const onChangeValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target?.value;
        value && navigate(value);
        sizeValue && setSizeValue("");
        colorValue && setColorValue("");
    };

    const onChangeColorValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const color = event.target?.value;
        const filteredClothingItems = [...getAllFilteredItems()].filter((item: ClothingItemModel) => item.color == color);
        setClothingItems(color ? filteredClothingItems : getAllFilteredItems());
        setColorValue(color);
        sizeValue && setSizeValue("");
    };

    const onChangeSizesValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const size = event.target?.value;
        const filteredClothingItems = [...getAllFilteredItems()].filter((item: ClothingItemModel) => item.size == size);
        setClothingItems(size ? filteredClothingItems : getAllFilteredItems());
        setSizeValue(size);
        colorValue && setColorValue("");
    };

    const onClickItem = (clothingItem: ClothingItemModel) => {
        const clothingSetItemCopy: any = { ...clothingSetItem };

        if (!clothingSetItem) {
            setFirstItemTime(DateTime.now());
        }

        clothingSetItemCopy[clothingItem.type] = clothingItem;
        const isCompletedSet = clothingSetItemCopy.shirt && clothingSetItemCopy.pants && clothingSetItemCopy.shoes;
        if (isCompletedSet) {
            onComplete(clothingSetItemCopy);
        } else {
            navigateToNextItem(clothingItem);
            setClothingSetItem(clothingSetItemCopy);
        }
    };

    const navigateToNextItem = (clothingItem: ClothingItemModel) => {
        const nextClothingItem = Object.values({ ...ClothingItemsTypes }).find((set) => {
            const isItemExist = clothingSetItem && Object.values(clothingSetItem).find((item) => item.type == set);
            return !isItemExist && set !== clothingItem.type;
        });
        nextClothingItem && navigate(nextClothingItem);
    };

    const onComplete = (clothingSetItemCopy: ClothingItemSet) => {
        const dateNow = DateTime.now();
        if (firstItemTime) {
            const setCreationTime = dateNow.diff(firstItemTime);
            clothingSetItemCopy.setCreationTime = setCreationTime.toFormat("h:m:s");
        }
        clothingSetItemCopy.createdDate = dateNow.toISODate();
        clothingSetItemCopy.id = Math.floor(Math.random() * 99999);

        clothingItemsStore.setClothingSets(clothingItemsStore.getClothingSets.concat([clothingSetItemCopy]));
        alert("The set was built successfully!");
        navigate(Routes.HOME);
    };

    return (
        <Col>
            <RouteTitle title={RouteNames.CLOTHING_ITEMS} />
            <section className="clothing-items-container">
                {clothingItems.length ? (
                    <>
                        <Form.Select aria-label="Filter items" onChange={onChangeValue} value={type}>
                            <option value=" ">All Items</option>
                            <option value={ClothingItemsTypes.PANTS}>{ClothingItemsTypes.PANTS}</option>
                            <option value={ClothingItemsTypes.SHOES}>{ClothingItemsTypes.SHOES}</option>
                            <option value={ClothingItemsTypes.SHIRT}>{ClothingItemsTypes.SHIRT}</option>
                        </Form.Select>

                        <Form.Select aria-label="Filter By Sizes" onChange={onChangeSizesValue} value={sizeValue}>
                            <option value="">All Sizes</option>
                            {[...new Set(getAllFilteredItems()?.map((item: ClothingItemModel) => item.size))].map((item: any, index: number) => (
                                <option key={index}>{item || ""}</option>
                            ))}
                        </Form.Select>

                        <Form.Select aria-label="Filter By Color" onChange={onChangeColorValue} value={colorValue}>
                            <option value="">All Colors</option>
                            {[...new Set(getAllFilteredItems()?.map((item: ClothingItemModel) => item.color))].map((item: any, index: number) => (
                                <option key={index}>{item || ""}</option>
                            ))}
                        </Form.Select>

                        {clothingItems.map((clothingItem: ClothingItemModel, index: number) => (
                            <ClothingItemCard
                                clothingItem={clothingItem}
                                key={clothingItem.id || index}
                                onClickItem={(clothingItem: ClothingItemModel) => onClickItem(clothingItem)}
                                buttonLabel="Add Item"
                            />
                        ))}
                    </>
                ) : (
                    <p>Loading items...</p>
                )}
            </section>
        </Col>
    );
};

export default observer(ClothingItems);
