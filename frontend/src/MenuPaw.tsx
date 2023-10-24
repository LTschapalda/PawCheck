import menuPaw from "../src/assets/menuPaw.svg";
import {Link} from "react-router-dom";

export default function MenuPaw() {
    return(
        <nav>
            <div className="navbar">
                <Link to="/home">
                    <img id="menuPaw" src={menuPaw} alt="menu Paw"/>
                </Link>
            </div>
        </nav>
    )
}