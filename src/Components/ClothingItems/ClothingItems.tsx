import { Col } from "react-bootstrap";
import RouteTitle from "../RouteTitle/RouteTitle";
import { RouteNames } from "../../Enums/Routes";

import { observer } from "mobx-react-lite";
import ClothingItemModel from "../../Models/ClothingItemModel";
import ClothingItemCard from "../ClothingItemCard/ClothingItemCard";
import { useNavigate, useParams } from "react-router-dom";
import { getItemsByType } from "../../Services/ClothingItemsService";
import clothingItemsStore from "../../Store/ClothingItemsStore";
import Form from "react-bootstrap/Form";
import { ClothingItemsTypes } from "../../Enums/ClothingItems";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import "./ClothingItems.css";

const ClothingItems: React.FC = () => {
    const { type } = useParams();
    const navigate = useNavigate();

    const [clothingItems, setClothingItems]: [ClothingItemModel[], Dispatch<SetStateAction<ClothingItemModel[]>>] = useState<ClothingItemModel[]>([]);
    const [colorValue, setColorValue] = useState("");
    const [sizeValue, setSizeValue] = useState("");
    useEffect(() => {
        initClothingItems();
    }, [clothingItemsStore.getClothingItems]);

    useEffect(() => {
        initClothingItems();
    }, [type]);

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
                            <ClothingItemCard clothingItem={clothingItem} key={clothingItem.id || index} />
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
