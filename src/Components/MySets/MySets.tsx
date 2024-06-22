import { Col } from "react-bootstrap";
import RouteTitle from "../RouteTitle/RouteTitle";
import { RouteNames } from "../../Enums/Routes";

import "./MySets.css";

const MySets = () => {
    return (
        <Col>
            <RouteTitle title={RouteNames.MY_SETS} />
        </Col>
    );
};

export default MySets;
