import Menu from "./Components/Menu/Menu";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./Layout.css";
import Home from "./Components/Home/Home";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import { Routes as RoutesEnum } from "./Enums/Routes";
import ClothingItems from "./Components/ClothingItems/ClothingItems";
import MySets from "./Components/MySets/MySets";
import { useEffect } from "react";
import clothingItemsStore from "./Store/ClothingItemsStore";
import { persistStore } from "./Services/MobxService";

const HandleHydrate = () => {
    return new Promise(async (resolve) => {
        await persistStore(clothingItemsStore, clothingItemsStore.persist_data, "ClothingItemsStore");
        resolve(true);
    });
};

function Layout() {
    useEffect(() => {
        HandleHydrate();
        getClothingItems();
    }, []);

    const getClothingItems = async () => {
        try {
            const res: any = await (await fetch("https://f32cf30e-6939-45f6-b650-40d5b43dc7f1.mock.pstmn.io/clothes")).json();
            res.length && clothingItemsStore.setClothingItems(res);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <BrowserRouter>
            <Menu />
            <div className="layout">
                <Routes>
                    <Route path={RoutesEnum.HOME} element={<Home />} />
                    <Route path={RoutesEnum.CLOTHING_ITEMS} element={<ClothingItems />}>
                        <Route path=":type" element={<ClothingItems />} />
                    </Route>
                    <Route path={RoutesEnum.MY_SETS} element={<MySets />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default Layout;
