import {Route, Routes, useNavigate} from "react-router-dom";
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
import {User} from "./pages/assets/User.ts";
import WaterPage from "./pages/formularInputPages/WaterPage.tsx";
import ToiletPage from "./pages/formularInputPages/ToiletPage.tsx";
import './styling/Preset.css'
import './styling/Landingpage.css'
import './styling/Home.css'
import './styling/Input.css'
import './styling/CatDetails.css'

function App() {

    const [editMode, setEditMode] = useState(false)
    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    const [user, setUser] = useState<User>()
    const [catsOwned, setCatsOwned] = useState<Cat[]>([])
    const [cat, setCat] = useState<Cat | undefined>();

    const navigate = useNavigate();

    useEffect(() => {getCatsFromUser()
        getUser()}, []);

    useEffect(() => {
        if (user) {
            navigate(`/home`);
        } else {
            getCatsFromUser();
        }
    }, [user]);


    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
        window.open(host + '/oauth2/authorization/google',
            '_self');
    }

    function getCatsFromUser() {
        if (user) {
        axios.get("/api/cats/" + user.id)
            .then(response => {
                const cats = response.data;
                setCatsOwned(cats);
            })
            .catch(reason => console.error(reason))
        }
    }

    function getUser () {
        axios.get("/api/user")
            .then(response => {
                setUser(response.data)})
            .catch(error => {
                console.error('Fehler beim Abrufen des Benutzerprofils:', error);
            })
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

    const updateCat = async (id: string | undefined, cat: Cat | undefined, getCatsFromUser: () => void):Promise<void> => {
        if (!id) {
            console.error('ID is undefined');
        }
        if(!cat) {
            console.error('cat is undefined');
        }
        try {
            const response = await axios.put("/api/cat/" + id, cat);
            getCatsFromUser();
            setCat(response.data)
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <>
                <MenuPaw editMode={editMode} toggleEditMode={toggleEditMode}/>
                <Routes>
                    <Route index                     element={<LandingPage login={login}/>}/>
                    <Route path={"/home"}            element={<Home catsOwned={catsOwned} getCatsFromUser={getCatsFromUser} user={user} login={login}/>}/>
                    <Route path={"/cat/details/:id"} element={<CatDetailPage catsOwned={catsOwned} toggleEditMode={toggleEditMode}/>} />
                    <Route path={"/cat/name"}        element={<NameInput getCatsFromUser={getCatsFromUser} user={user}/>}/>
                    <Route path={"/sweeet/:id"}      element={<SweetCheckup/>}/>
                    <Route path={"/cat/food/:id"}    element={<FoodPage editMode={editMode} toggleEditMode={toggleEditMode} getCatsFromUser={getCatsFromUser} cat={cat} setCat={setCat} getCatById={getCatById} updateCat={updateCat}/>} />
                    <Route path={"/cat/treats/:id"}  element={<TreatPage editMode={editMode} toggleEditMode={toggleEditMode} getCatsFromUser={getCatsFromUser} cat={cat} setCat={setCat} getCatById={getCatById} updateCat={updateCat}/>}/>
                    <Route path={"/cat/water/:id"}  element={<WaterPage editMode={editMode} toggleEditMode={toggleEditMode} getCatsFromUser={getCatsFromUser} cat={cat} setCat={setCat} getCatById={getCatById} updateCat={updateCat}/>}/>
                    <Route path={"/cat/litterbox/:id"}  element={<ToiletPage editMode={editMode} toggleEditMode={toggleEditMode} getCatsFromUser={getCatsFromUser} cat={cat} setCat={setCat} getCatById={getCatById} updateCat={updateCat}/>}/>
                </Routes>
        </>
    )
}

export default App
