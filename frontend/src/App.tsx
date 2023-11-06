import './App.css'
import {Route, Routes} from "react-router-dom";
import LandingPage from "./Pages/LandingPage.tsx";
import NameInput from "./Pages/FormularInputPages/NameInput.tsx";
import Home from "./Pages/Home/Home.tsx";
import MenuPaw from "./MenuPaw.tsx";
import CatDetailPage from "./Pages/Home/CatDetailPage.tsx";
import {useEffect, useState} from "react";
import {Cat} from "./Pages/assets/Cat.ts";
import SweetCheckup from "./Pages/FormularInputPages/SweetCheckup.tsx";
import FoodPage from "./Pages/FormularInputPages/FoodPage.tsx";
import axios from "axios";
import TreatPage from "./Pages/FormularInputPages/TreatPage.tsx";


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
            <MenuPaw editMode={editMode} toggleEditMode={toggleEditMode}/>
            <Routes>
                <Route index                     element={<LandingPage/>}/>
                <Route path={"/cat/name"}        element={<NameInput getCatsFromUser={getCatsFromUser}/>}/>
                <Route path={"/sweeet/:id"}      element={<SweetCheckup/>}/>
                <Route path={"/cat/food/:id"}    element={<FoodPage catsOwned={catsOwned} editMode={editMode} toggleEditMode={toggleEditMode} getCatsFromUser={getCatsFromUser}/>} />
                <Route path={"/cat/treats/:id"}  element={<TreatPage catsOwned={catsOwned} toggleEditMode={toggleEditMode} editMode={editMode} getCatsFromUser={getCatsFromUser}/>}/>
                <Route path={"/home"}            element={<Home catsOwned={catsOwned} getCatsFromUser={getCatsFromUser}/>}/>
                <Route path={"/cat/details/:id"} element={<CatDetailPage catsOwned={catsOwned} toggleEditMode={toggleEditMode}/>} />
            </Routes>
        </>
    )
}

export default App
