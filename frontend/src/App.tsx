import './App.css'
import {Route, Routes} from "react-router-dom";
import LandingPage from "./Components/LandingPage.tsx";
import NameInput from "./Components/FormularInputComponents/NameInput.tsx";
import Home from "./Components/Home/Home.tsx";
import MenuPaw from "./MenuPaw.tsx";

function App() {

  return (
      <>
      <MenuPaw/>
    <Routes>
        <Route path={"/"}         element={<LandingPage/>}/>
        <Route path={"/cat/name"} element={<NameInput/>}/>
        <Route path={"/home"} element={<Home/>}/>
    </Routes>
      </>
  )
}

export default App
