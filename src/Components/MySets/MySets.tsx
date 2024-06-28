import { Button, Col } from "react-bootstrap";
import RouteTitle from "../RouteTitle/RouteTitle";
import { RouteNames } from "../../Enums/Routes";

import "./MySets.css";
import clothingItemsStore from "../../Store/ClothingItemsStore";
import ClothingItemSet from "../../Models/ClothingItemSetModel";
import ClothingItemCard from "../ClothingItemCard/ClothingItemCard";
import { observer } from "mobx-react-lite";
import ClothingItemModel from "../../Models/ClothingItemModel";

const MySets = () => {
    return (
        <Col>
            <RouteTitle title={RouteNames.MY_SETS} />
            {clothingItemsStore.getClothingSets?.map((set: ClothingItemSet, index: number) => {
                return (
                    <div className="set" key={index}>
                        <p>
                            Created Date: <b>{set.createdDate || ""}</b>
                        </p>
                        <p>
                            Set Creation Time: <b>{set.setCreationTime || ""}</b>
                        </p>
                        <div className="set-container">
                            {Object.values(set).map(
                                (setItem: ClothingItemModel) =>
                                    typeof setItem === "object" && <ClothingItemCard key={setItem.id} clothingItem={setItem} />
                            )}
                            <Button className="set-card-button" onClick={() => clothingItemsStore.deleteSet(set.id)}>
                                Remove Set
                            </Button>
                        </div>
                    </div>
                );
            })}
        </Col>
    );
};

export default observer(MySets);
