import './App.css'
import {Route, Routes} from "react-router-dom";
import LandingPage from "./Components/LandingPage.tsx";
import NameInput from "./Components/FormularInputComponents/NameInput.tsx";
import Home from "./Components/Home/Home.tsx";
import MenuPaw from "./MenuPaw.tsx";
import CatDetailPage from "./Components/Home/CatDetailPage.tsx";
import {useState} from "react";
import {Cat} from "./Components/assets/Cat.ts";
import SweetCheckup from "./Components/FormularInputComponents/SweetCheckup.tsx";
import FoodInput from "./Components/FormularInputComponents/FoodInput.tsx";

function App() {
    const [catsOwned, setCatsOwned] = useState<Cat[]>([])

    return (
        <>
            <MenuPaw/>
            <Routes>
                <Route index                  element={<LandingPage/>}/>
                <Route path={"/cat/name"}     element={<NameInput />}/>
                <Route path={"/home"}         element={<Home setCatsOwned={setCatsOwned}/>}/>
                <Route path={"/cat/details/:id"} element={<CatDetailPage catsOwned={catsOwned}/>} />
                <Route path={"/sweet"}        element={<SweetCheckup/>}/>
                <Route path={"/cat/food"} element={<FoodInput catsOwned={catsOwned}/>}/>
            </Routes>
        </>
    )
}

export default App
