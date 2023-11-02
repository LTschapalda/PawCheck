import './App.css'
import {Route, Routes} from "react-router-dom";
import LandingPage from "./Components/LandingPage.tsx";
import NameInput from "./Components/FormularInputComponents/NameInput.tsx";
import Home from "./Components/Home/Home.tsx";
import MenuPaw from "./MenuPaw.tsx";
import CatDetailPage from "./Components/Home/CatDetailPage.tsx";
import {useEffect, useState} from "react";
import {Cat} from "./Components/assets/Cat.ts";
import SweetCheckup from "./Components/FormularInputComponents/SweetCheckup.tsx";
import FoodPage from "./Components/FormularInputComponents/FoodPage.tsx";
import axios from "axios";


function App() {

    const [editMode, setEditMode] = useState(false)
    const toggleEditMode = () => {
        setEditMode(!editMode);
    }
    const [catsOwned, setCatsOwned] = useState<Cat[]>([])
    const id : string = "123"

    useEffect(getCatsFromUser, []);
    function getCatsFromUser() {

        axios.get("/api/cats/" + id)
            .then(response => {
                const cats = response.data;
                setCatsOwned(cats);
            })
            .catch(reason => console.error(reason))
    }

    return (
        <>
            <MenuPaw/>
            <Routes>
                <Route index                     element={<LandingPage/>}/>
                <Route path={"/cat/name"}        element={<NameInput getCatsFromUser={getCatsFromUser}/>}/>
                <Route path={"/sweeet/:id"}      element={<SweetCheckup/>}/>
                <Route path={"/cat/food/:id"}    element={<FoodPage catsOwned={catsOwned} editMode={editMode} toggleEditMode={toggleEditMode}/>} />
                <Route path={"/home"}            element={<Home catsOwned={catsOwned} setCatsOwned={setCatsOwned} getCatsFromUser={getCatsFromUser}/>}/>
                <Route path={"/cat/details/:id"} element={<CatDetailPage catsOwned={catsOwned} toggleEditMode={toggleEditMode}/>} />
                <Route path={"/sweet"}           element={<SweetCheckup/>}/>
            </Routes>
        </>
    )
}

export default App
