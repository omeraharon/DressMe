import { Col } from "react-bootstrap";
import RouteTitle from "../RouteTitle/RouteTitle";
import { RouteNames } from "../../Enums/Routes";

import { observer } from "mobx-react-lite";
import ClothingItemModel from "../../Models/ClothingItemModel";
import ClothingItemCard from "../ClothingItemCard/ClothingItemCard";

import "./ClothingItems.css";
import { useParams } from "react-router-dom";
import { getItemsByType } from "../../Services/ClothingItemsService";
import clothingItemsStore from "../../Store/ClothingItemsStore";

const ClothingItems: React.FC = () => {
    const { type } = useParams();
    const clothingItemsByType = getItemsByType(type || "");
    const clothingItems = clothingItemsByType.length ? clothingItemsByType : clothingItemsStore.getClothingItems;
    return (
        <Col>
            <RouteTitle title={RouteNames.CLOTHING_ITEMS} />
            <section className="clothing-items-container">
                {clothingItems.length ? (
                    clothingItems.map((clothingItem: ClothingItemModel, index: number) => (
                        <ClothingItemCard clothingItem={clothingItem} key={clothingItem.id || index} />
                    ))
                ) : (
                    <p>Loading items...</p>
                )}
            </section>
        </Col>
    );
};

export default observer(ClothingItems);
