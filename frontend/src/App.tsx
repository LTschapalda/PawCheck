import './App.css'
import {Route, Routes} from "react-router-dom";
import LandingPage from "./Components/LandingPage.tsx";
import NameInput from "./Components/NameInput.tsx";
import Home from "./Components/Home.tsx";

function App() {

  return (
    <Routes>
        <Route path={"/"}         element={<LandingPage/>}/>
        <Route path={"/cat/name"} element={<NameInput/>}/>
        <Route path={"/home"} element={<Home/>}/>
    </Routes>
  )
}

export default App
