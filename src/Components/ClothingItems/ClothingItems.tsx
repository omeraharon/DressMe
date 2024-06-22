import { Col } from "react-bootstrap";
import RouteTitle from "../RouteTitle/RouteTitle";
import { RouteNames } from "../../Enums/Routes";

import "./ClothingItems.css";

const ClothingItems = () => {
    return (
        <Col>
            <RouteTitle title={RouteNames.CLOTHING_ITEMS} />
        </Col>
    );
};

export default ClothingItems;
