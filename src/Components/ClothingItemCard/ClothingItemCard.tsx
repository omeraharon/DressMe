import ClothingItemModel from "../../Models/ClothingItemModel";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./ClothingItemCard.css";
import { ClothingItemsTypes } from "../../Enums/ClothingItems";
import { Images } from "../../Services/Images";

interface ClothingItemCardProps {
    clothingItem: ClothingItemModel;
}

const ClothingItemCard: React.FC<ClothingItemCardProps> = ({ clothingItem }) => {
    const getSvgByType = (type: string) => {
        let cardIconSvg = "";
        switch (type) {
            case ClothingItemsTypes.PANTS:
                cardIconSvg = Images.pants;
                break;
            case ClothingItemsTypes.SHIRT:
                cardIconSvg = Images.shirt;
                break;
            case ClothingItemsTypes.SHOES:
                cardIconSvg = Images.shoes;
                break;
        }
        return cardIconSvg;
    };
    return (
        <Card className="clothing-item-card">
            <div dangerouslySetInnerHTML={{ __html: getSvgByType(clothingItem.type || "") }} className="clothing-item-card-svg" />
            <Card.Body>
                <Card.Title>{clothingItem.type || ""}</Card.Title>
                <Card.Text>
                    <b>Brand:</b> {clothingItem.brand || ""}
                </Card.Text>
                <Card.Text>
                    <b>Color:</b> {clothingItem.color || ""} <span className="square" style={{ backgroundColor: clothingItem.color || "" }}></span>
                </Card.Text>
                <Card.Text>
                    <b>Size:</b> {clothingItem.size || ""}
                </Card.Text>
                <Button className="clothing-item-card-button">Add Item</Button>
            </Card.Body>
        </Card>
    );
};

export default ClothingItemCard;
