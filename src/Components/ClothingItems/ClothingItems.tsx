import { Col } from "react-bootstrap";
import RouteTitle from "../RouteTitle/RouteTitle";
import { RouteNames } from "../../Enums/Routes";

import { observer } from "mobx-react-lite";
import ClothingItemModel from "../../Models/ClothingItemModel";
import ClothingItemCard from "../ClothingItemCard/ClothingItemCard";

import "./ClothingItems.css";
interface ClothingItemsProps {
    clothingItemsList: ClothingItemModel[];
}

const ClothingItems: React.FC<ClothingItemsProps> = ({ clothingItemsList }) => {
    return (
        <Col>
            <RouteTitle title={RouteNames.CLOTHING_ITEMS} />
            <section className="clothing-items-container">
                {clothingItemsList.length ? (
                    clothingItemsList.map((clothingItem: ClothingItemModel, index: number) => (
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
