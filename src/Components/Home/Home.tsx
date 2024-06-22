import { Col } from "react-bootstrap";
import { RouteNames } from "../../Enums/Routes";
import RouteTitle from "../RouteTitle/RouteTitle";

const Home = () => {
    return (
        <Col>
            <RouteTitle title={RouteNames.HOME} />
        </Col>
    );
};

export default Home;
