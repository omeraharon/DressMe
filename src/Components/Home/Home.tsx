import { Button, Col } from "react-bootstrap";
import { RouteNames, Routes } from "../../Enums/Routes";
import RouteTitle from "../RouteTitle/RouteTitle";
import clothingItemsStore from "../../Store/ClothingItemsStore";
import { Link } from "react-router-dom";
import { ClothingItemsTypes } from "../../Enums/ClothingItems";

import "./Home.css";
import { getItemsByType } from "../../Services/ClothingItemsService";
import { observer } from "mobx-react-lite";

const Home = () => {
    return (
        <Col>
            <RouteTitle title={RouteNames.HOME} />
            <h2 className="completed-sets">Completed Sets: {clothingItemsStore.getClothingSets.length}</h2>
            <Link to={Routes.MY_SETS} className="completed-sets-link">
                Go to my completed sets
            </Link>
            <hr />
            <h3>Items in stock:</h3>
            <div className="clothing-items-count">
                <span className="clothing-item-count">
                    {ClothingItemsTypes.PANTS} <b>{getItemsByType(ClothingItemsTypes.PANTS)?.length || 0}</b>
                    <Button className="clothing-item-button">
                        {" "}
                        <Link className="clothing-item-link" to={`${Routes.CLOTHING_ITEMS}/${ClothingItemsTypes.PANTS}`}>
                            Add Pants
                        </Link>
                    </Button>
                </span>
                <span className="clothing-item-count">
                    {ClothingItemsTypes.SHOES} <b>{getItemsByType(ClothingItemsTypes.SHOES)?.length || 0}</b>
                    <Button className="clothing-item-button">
                        {" "}
                        <Link className="clothing-item-link" to={`${Routes.CLOTHING_ITEMS}/${ClothingItemsTypes.SHOES}`}>
                            Add Shoes
                        </Link>
                    </Button>
                </span>
                <span className="clothing-item-count">
                    {ClothingItemsTypes.SHIRT} <b>{getItemsByType(ClothingItemsTypes.SHIRT)?.length || 0}</b>
                    <Button className="clothing-item-button">
                        <Link className="clothing-item-link" to={`${Routes.CLOTHING_ITEMS}/${ClothingItemsTypes.SHIRT}`}>
                            Add Shirts
                        </Link>
                    </Button>
                </span>
            </div>
            <hr />
        </Col>
    );
};

export default observer(Home);
