import './App.css'
import {Route, Routes} from "react-router-dom";
import LandingPage from "./Components/LandingPage.tsx";
import NameInput from "./Components/NameInput.tsx";
import RoleInput from "./Components/RoleInput.tsx";

function App() {

  return (
    <Routes>
        <Route path={"/"}         element={<LandingPage/>}/>
        <Route path={"/cat/name"} element={<NameInput/>}/>
        <Route path={"/cat/role"} element={<RoleInput/>}/>
    </Routes>
  )
}

export default App
