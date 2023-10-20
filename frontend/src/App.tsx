import './App.css'
import {Route, Routes} from "react-router-dom";
import LandingPage from "./Components/LandingPage.tsx";
import RoleInput from "./Components/RoleInput.tsx";

function App() {

  return (
    <Routes>
        <Route path={"/"} element={<LandingPage/>}/>
        <Route path={"/role"} element={<RoleInput/>}/>
    </Routes>
  )
}

export default App
