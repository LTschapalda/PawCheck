import './App.css'
import {Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import NameInput from "./pages/formularInputPages/NameInput.tsx";
import Home from "./pages/home/Home.tsx";
import MenuPaw from "./MenuPaw.tsx";
import CatDetailPage from "./pages/home/CatDetailPage.tsx";
import {useEffect, useState} from "react";
import SweetCheckup from "./pages/formularInputPages/SweetCheckup.tsx";
import FoodPage from "./pages/formularInputPages/FoodPage.tsx";
import axios from "axios";
import TreatPage from "./pages/formularInputPages/TreatPage.tsx";
import {Cat} from "./pages/assets/Cat.ts";
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {

    const [editMode, setEditMode] = useState(false)
    const toggleEditMode = () => {
        setEditMode(!editMode);
    }
    const [catsOwned, setCatsOwned] = useState<Cat[]>([])
    const [cat, setCat] = useState<Cat | undefined>();
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

    const getCatById = (id: string) => {
        if (!id) {
            return undefined;
        }
        axios.get("/api/cat/" + id)
            .then((response: {
                data: Cat;
            }) => {setCat(response.data);})
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <>
            <GoogleOAuthProvider clientId="95911181275-54fl7u3pcg5l39cpn7pf6qp6e2c98rcp.apps.googleusercontent.com">
                <MenuPaw editMode={editMode} toggleEditMode={toggleEditMode}/>
                <Routes>
                    <Route index                     element={<LandingPage/>}/>
                    <Route path={"/cat/name"}        element={<NameInput getCatsFromUser={getCatsFromUser}/>}/>
                    <Route path={"/sweeet/:id"}      element={<SweetCheckup/>}/>
                    <Route path={"/cat/food/:id"}    element={<FoodPage editMode={editMode} toggleEditMode={toggleEditMode} getCatsFromUser={getCatsFromUser} cat={cat} setCat={setCat} getCatById={getCatById}/>} />
                    <Route path={"/cat/treats/:id"}  element={<TreatPage editMode={editMode} toggleEditMode={toggleEditMode} getCatsFromUser={getCatsFromUser} cat={cat} setCat={setCat} getCatById={getCatById}/> }/>
                    <Route path={"/home"}            element={<Home catsOwned={catsOwned} getCatsFromUser={getCatsFromUser}/>}/>
                    <Route path={"/cat/details/:id"} element={<CatDetailPage catsOwned={catsOwned} toggleEditMode={toggleEditMode}/>} />
                </Routes>
            </GoogleOAuthProvider>;
        </>
    )
}

export default App
