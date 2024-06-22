import Menu from "./Components/Menu/Menu";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./Layout.css";
import Home from "./Components/Home/Home";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import { Routes as RoutesEnum } from "./Enums/Routes";
import ClothingItems from "./Components/ClothingItems/ClothingItems";
import MySets from "./Components/MySets/MySets";

function Layout() {
    return (
        <>
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path={RoutesEnum.HOME} element={<Home />} />
                    <Route path={RoutesEnum.CLOTHING_ITEMS} element={<ClothingItems />} />
                    <Route path={RoutesEnum.MY_SETS} element={<MySets />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Layout;
