import Menu from "./Components/Menu/Menu";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./Layout.css";
import Home from "./Components/Home/Home";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import { Routes as RoutesEnum } from "./Enums/Routes";
import ClothingItems from "./Components/ClothingItems/ClothingItems";
import MySets from "./Components/MySets/MySets";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import clothingItemsStore from "./Store/ClothingItemsStore";
import { persistStore } from "./Services/MobxService";
import ClothingItemModel from "./Models/ClothingItemModel";

const HandleHydrate = () => {
    return new Promise(async (resolve) => {
        await persistStore(clothingItemsStore, clothingItemsStore.persist_data, "ClothingItemsStore");
        resolve(true);
    });
};

function Layout() {
    const [clothingItemsList, setClothingItemsList]: [ClothingItemModel[], Dispatch<SetStateAction<ClothingItemModel[]>>] = useState<
        ClothingItemModel[]
    >([]);

    useEffect(() => {
        HandleHydrate();
        getClothingItems();
    }, []);

    const getClothingItems = async () => {
        try {
            const res: any = (await fetch("https://f32cf30e-6939-45f6-b650-40d5b43dc7f1.mock.pstmn.io/clothes")).json();
            const clothingItems = await res;
            clothingItems.length && setClothingItemsList(clothingItems);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path={RoutesEnum.HOME} element={<Home />} />
                    <Route path={RoutesEnum.CLOTHING_ITEMS} element={<ClothingItems clothingItemsList={clothingItemsList} />} />
                    <Route path={RoutesEnum.MY_SETS} element={<MySets />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Layout;
