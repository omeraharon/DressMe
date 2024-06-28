import "./Menu.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { RouteNames, Routes } from "../../Enums/Routes";

const Menu = () => {
    return (
        <div id="menu">
            <Navbar expand="sm" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>Dress Me</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="menu-link" to={Routes.HOME}>
                                {RouteNames.HOME}
                            </Link>
                            <Link className="menu-link" to={Routes.CLOTHING_ITEMS}>
                                {RouteNames.CLOTHING_ITEMS}
                            </Link>
                            <Link className="menu-link" to={Routes.MY_SETS}>
                                {RouteNames.MY_SETS}
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Menu;
